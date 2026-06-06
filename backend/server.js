const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(__dirname, "data");
const UPLOAD_DIR = path.join(__dirname, "uploads");
const PORT = Number(process.env.PORT || 3000);
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const TOKEN_SECRET = process.env.TOKEN_SECRET || crypto.randomBytes(32).toString("hex");
const DB_DRIVER = String(process.env.DB_DRIVER || (process.env.DATABASE_URL ? "mysql" : "json")).toLowerCase();
const CORS_ALLOWED_ORIGINS = String(process.env.CORS_ALLOWED_ORIGINS || process.env.APP_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const SESSION_TTL_MS = Number(process.env.SESSION_TTL_MS || 24 * 60 * 60 * 1000);
const LOGIN_RATE_LIMIT_WINDOW_MS = Number(process.env.LOGIN_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
const LOGIN_RATE_LIMIT_MAX_ATTEMPTS = Number(process.env.LOGIN_RATE_LIMIT_MAX_ATTEMPTS || 5);
const LOGIN_RATE_LIMIT_LOCK_MS = Number(process.env.LOGIN_RATE_LIMIT_LOCK_MS || 15 * 60 * 1000);
const AI_PROVIDER = String(process.env.AI_PROVIDER || (process.env.DEEPSEEK_API_KEY ? "deepseek" : "rules")).toLowerCase();
const AI_CHAT_RATE_LIMIT_WINDOW_MS = Number(process.env.AI_CHAT_RATE_LIMIT_WINDOW_MS || 60 * 1000);
const AI_CHAT_RATE_LIMIT_MAX_REQUESTS = Number(process.env.AI_CHAT_RATE_LIMIT_MAX_REQUESTS || 20);
const DEEPSEEK_API_KEY = String(process.env.DEEPSEEK_API_KEY || "");
const DEEPSEEK_BASE_URL = String(process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com");
const DEEPSEEK_MODEL = String(process.env.DEEPSEEK_MODEL || "deepseek-v4-flash");
const DEEPSEEK_THINKING = String(process.env.DEEPSEEK_THINKING || "disabled").toLowerCase() === "enabled" ? "enabled" : "disabled";
const DEEPSEEK_TIMEOUT_MS = Number(process.env.DEEPSEEK_TIMEOUT_MS || 8000);
const DEEPSEEK_MAX_TOKENS = Number(process.env.DEEPSEEK_MAX_TOKENS || 800);

const sessions = new Map();
const loginAttempts = new Map();
const aiChatAttempts = new Map();
let mysqlPool = null;

const dictionaryTypes = new Set([
  "brands",
  "models",
  "colors",
  "energy_types",
  "vehicle_types",
  "stock_statuses",
  "part_categories",
  "currencies",
  "export_ports",
]);

const stores = {
  vehicles: {
    file: path.join(DATA_DIR, "vehicles.json"),
    required: ["sku", "brand", "model", "year", "condition", "vehicle_type", "energy_type", "stock_status", "currency"],
    numeric: ["year", "seats", "range_km", "battery_kwh", "mileage", "price_min", "price_max"],
  },
  parts: {
    file: path.join(DATA_DIR, "parts.json"),
    required: ["sku", "category", "name", "oe_numbers", "moq", "stock_status", "currency"],
    numeric: ["lead_time_days", "price_min", "price_max"],
  },
  inquiries: {
    file: path.join(DATA_DIR, "inquiries.json"),
    required: ["name", "message"],
    numeric: [],
  },
  aiSessions: {
    file: path.join(DATA_DIR, "ai-sessions.json"),
    required: ["session_id", "status"],
    numeric: [],
  },
  dictionaries: {
    file: path.join(DATA_DIR, "dictionaries.json"),
    required: ["type", "code", "name_en", "name_zh"],
    numeric: ["sort_order"],
  },
  aiLogs: {
    file: path.join(DATA_DIR, "ai-logs.json"),
    required: ["category", "module", "action", "status"],
    numeric: [],
  },
  adminUsers: {
    file: path.join(DATA_DIR, "admin-users.json"),
    required: ["username", "name", "status"],
    numeric: [],
  },
  adminRoles: {
    file: path.join(DATA_DIR, "admin-roles.json"),
    required: ["code", "name_en", "name_zh", "status"],
    numeric: [],
  },
};

const permissionCatalog = [
  {
    group: "dashboard",
    label_en: "Dashboard",
    label_zh: "工作台",
    permissions: [{ code: "dashboard:view", label_en: "View dashboard", label_zh: "查看工作台" }],
  },
  {
    group: "vehicles",
    label_en: "Vehicles",
    label_zh: "整车管理",
    permissions: [
      { code: "vehicles:view", label_en: "View vehicles", label_zh: "查看整车" },
      { code: "vehicles:create", label_en: "Create vehicles", label_zh: "新增整车" },
      { code: "vehicles:update", label_en: "Update vehicles", label_zh: "编辑整车" },
      { code: "vehicles:delete", label_en: "Delete vehicles", label_zh: "删除整车" },
      { code: "vehicles:import", label_en: "Import vehicles", label_zh: "导入整车" },
      { code: "vehicles:export", label_en: "Export vehicles", label_zh: "导出整车" },
    ],
  },
  {
    group: "parts",
    label_en: "Parts",
    label_zh: "零配件管理",
    permissions: [
      { code: "parts:view", label_en: "View parts", label_zh: "查看零配件" },
      { code: "parts:create", label_en: "Create parts", label_zh: "新增零配件" },
      { code: "parts:update", label_en: "Update parts", label_zh: "编辑零配件" },
      { code: "parts:delete", label_en: "Delete parts", label_zh: "删除零配件" },
      { code: "parts:import", label_en: "Import parts", label_zh: "导入零配件" },
      { code: "parts:export", label_en: "Export parts", label_zh: "导出零配件" },
    ],
  },
  {
    group: "inquiries",
    label_en: "Inquiries",
    label_zh: "询盘管理",
    permissions: [
      { code: "inquiries:view", label_en: "View inquiries", label_zh: "查看询盘" },
      { code: "inquiries:update", label_en: "Update inquiries", label_zh: "处理询盘" },
    ],
  },
  {
    group: "dictionaries",
    label_en: "Dictionaries",
    label_zh: "字典设置",
    permissions: [
      { code: "dictionaries:view", label_en: "View dictionaries", label_zh: "查看字典" },
      { code: "dictionaries:create", label_en: "Create dictionaries", label_zh: "新增字典" },
      { code: "dictionaries:update", label_en: "Update dictionaries", label_zh: "编辑字典" },
      { code: "dictionaries:delete", label_en: "Delete dictionaries", label_zh: "删除字典" },
      { code: "dictionaries:import", label_en: "Import dictionaries", label_zh: "导入字典" },
    ],
  },
  {
    group: "users",
    label_en: "Users",
    label_zh: "用户管理",
    permissions: [
      { code: "users:view", label_en: "View users", label_zh: "查看用户" },
      { code: "users:create", label_en: "Create users", label_zh: "新增用户" },
      { code: "users:update", label_en: "Update users", label_zh: "编辑用户" },
      { code: "users:disable", label_en: "Enable or disable users", label_zh: "启用/停用用户" },
      { code: "users:reset_password", label_en: "Reset passwords", label_zh: "重置密码" },
    ],
  },
  {
    group: "roles",
    label_en: "Roles",
    label_zh: "权限角色",
    permissions: [
      { code: "roles:view", label_en: "View roles", label_zh: "查看角色" },
      { code: "roles:create", label_en: "Create roles", label_zh: "新增角色" },
      { code: "roles:update", label_en: "Update roles", label_zh: "编辑角色" },
      { code: "roles:delete", label_en: "Delete roles", label_zh: "删除角色" },
    ],
  },
  {
    group: "ai_logs",
    label_en: "AI Logs",
    label_zh: "AI日志",
    permissions: [{ code: "ai_logs:view", label_en: "View AI logs", label_zh: "查看AI日志" }],
  },
  {
    group: "ai_maintenance",
    label_en: "AI Maintenance",
    label_zh: "AI维护",
    permissions: [{ code: "ai_maintenance:manage", label_en: "Manage data with AI", label_zh: "使用AI维护数据" }],
  },
];

const allPermissionCodes = permissionCatalog.flatMap((group) => group.permissions.map((permission) => permission.code));

const defaultRoleSeeds = [
  {
    id: "role_super_admin",
    code: "super_admin",
    name_en: "Super Administrator",
    name_zh: "超级管理员",
    description_en: "Full system access.",
    description_zh: "拥有系统全部权限。",
    status: "active",
    permissions: allPermissionCodes,
    system: true,
  },
  {
    id: "role_manager",
    code: "manager",
    name_en: "Operations Manager",
    name_zh: "运营经理",
    description_en: "Manage catalog, inquiries, dictionaries and logs.",
    description_zh: "管理商品、询盘、字典和日志。",
    status: "active",
    permissions: allPermissionCodes.filter((code) => !code.startsWith("users:") && !code.startsWith("roles:")),
    system: true,
  },
  {
    id: "role_editor",
    code: "editor",
    name_en: "Catalog Editor",
    name_zh: "商品编辑",
    description_en: "Maintain vehicles, parts and dictionaries.",
    description_zh: "维护整车、零配件和字典。",
    status: "active",
    permissions: allPermissionCodes.filter((code) => code.startsWith("vehicles:") || code.startsWith("parts:") || code.startsWith("dictionaries:") || code === "dashboard:view"),
    system: true,
  },
  {
    id: "role_sales",
    code: "sales",
    name_en: "Sales",
    name_zh: "销售",
    description_en: "View products and process inquiries.",
    description_zh: "查看商品并处理询盘。",
    status: "active",
    permissions: ["dashboard:view", "vehicles:view", "parts:view", "inquiries:view", "inquiries:update"],
    system: true,
  },
  {
    id: "role_viewer",
    code: "viewer",
    name_en: "Viewer",
    name_zh: "只读用户",
    description_en: "Read-only access.",
    description_zh: "只读访问。",
    status: "active",
    permissions: ["dashboard:view", "vehicles:view", "parts:view", "inquiries:view", "dictionaries:view"],
    system: true,
  },
];

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function isMysqlEnabled() {
  return DB_DRIVER === "mysql";
}

function getMysqlConfig() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  return {
    host: process.env.MYSQL_HOST || process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT || process.env.DB_PORT || 3306),
    user: process.env.MYSQL_USER || process.env.DB_USER || "vehicle_export",
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME || "vehicle_export",
    waitForConnections: true,
    connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 10),
    charset: "utf8mb4",
  };
}

function readJsonRows(type) {
  const file = stores[type].file;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return [];
  }
}

function writeJsonRows(type, rows) {
  fs.writeFileSync(stores[type].file, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
}

async function ensureMysqlStorage() {
  let mysql;
  try {
    mysql = require("mysql2/promise");
  } catch (error) {
    throw new Error("MySQL mode requires the mysql2 package. Run npm install before starting the server.");
  }

  mysqlPool = mysql.createPool(getMysqlConfig());
  await mysqlPool.execute(`
    CREATE TABLE IF NOT EXISTS app_records (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      store_type VARCHAR(32) NOT NULL,
      record_id VARCHAR(80) NOT NULL,
      sku VARCHAR(120) NULL,
      code VARCHAR(120) NULL,
      dictionary_type VARCHAR(80) NULL,
      row_order INT UNSIGNED NULL,
      payload JSON NOT NULL,
      created_at VARCHAR(40) NULL,
      updated_at VARCHAR(40) NULL,
      PRIMARY KEY (id),
      UNIQUE KEY uniq_store_record (store_type, record_id),
      KEY idx_store_type (store_type),
      KEY idx_store_sku (store_type, sku),
      KEY idx_dictionary (store_type, dictionary_type, code),
      KEY idx_store_order (store_type, row_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await ensureMysqlSchema();
  await seedMysqlFromJson();
}

async function ensureMysqlSchema() {
  const [columns] = await mysqlPool.execute("SHOW COLUMNS FROM app_records LIKE 'row_order'");
  if (!columns.length) {
    await mysqlPool.execute("ALTER TABLE app_records ADD COLUMN row_order INT UNSIGNED NULL AFTER dictionary_type");
  }

  const [indexes] = await mysqlPool.execute("SHOW INDEX FROM app_records WHERE Key_name = 'idx_store_order'");
  if (!indexes.length) {
    await mysqlPool.execute("CREATE INDEX idx_store_order ON app_records (store_type, row_order)");
  }
}

async function seedMysqlFromJson() {
  const [rows] = await mysqlPool.execute("SELECT COUNT(*) AS count FROM app_records");
  if (Number(rows[0]?.count || 0) > 0) {
    return;
  }

  for (const type of Object.keys(stores)) {
    const jsonRows = readJsonRows(type);
    if (jsonRows.length) {
      await writeMysqlRows(type, jsonRows);
    }
  }
}

async function ensureStorage() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  Object.values(stores).forEach((store) => {
    if (!fs.existsSync(store.file)) {
      fs.writeFileSync(store.file, "[]", "utf8");
    }
  });

  if (isMysqlEnabled()) {
    await ensureMysqlStorage();
  }

  await ensureAuthBootstrap();
}

async function readMysqlRows(type) {
  const [rows] = await mysqlPool.execute("SELECT payload FROM app_records WHERE store_type = ? ORDER BY COALESCE(row_order, id), id ASC", [type]);
  return rows.map((row) => {
    if (typeof row.payload === "string") {
      return JSON.parse(row.payload);
    }
    return row.payload || {};
  });
}

function chunkRows(rows, size = 500) {
  const chunks = [];
  for (let index = 0; index < rows.length; index += size) {
    chunks.push(rows.slice(index, index + size));
  }
  return chunks;
}

function mysqlRecordSnapshot(type, row, rowOrder) {
  const persisted = row.id ? row : normalizeRecord(type, row);
  return {
    persisted,
    recordId: persisted.id,
    sku: persisted.sku || null,
    code: persisted.code || null,
    dictionaryType: type === "dictionaries" ? persisted.type || null : null,
    payload: JSON.stringify(persisted),
    createdAt: persisted.created_at || null,
    updatedAt: persisted.updated_at || null,
    rowOrder,
  };
}

function mysqlRecordIdsToDelete(existingIds, nextRows) {
  const nextIds = new Set(nextRows.map((row) => row.recordId));
  return existingIds.filter((id) => !nextIds.has(id));
}

async function writeMysqlRows(type, rows) {
  const connection = await mysqlPool.getConnection();
  const nextRows = rows.map((row, index) => mysqlRecordSnapshot(type, row, index));
  try {
    await connection.beginTransaction();
    const [existingRows] = await connection.execute("SELECT record_id FROM app_records WHERE store_type = ?", [type]);
    const idsToDelete = mysqlRecordIdsToDelete(existingRows.map((row) => row.record_id), nextRows);
    for (const idChunk of chunkRows(idsToDelete)) {
      await connection.execute(
        `DELETE FROM app_records
          WHERE store_type = ?
            AND record_id IN (${idChunk.map(() => "?").join(",")})`,
        [type, ...idChunk],
      );
    }

    for (const row of nextRows) {
      await connection.execute(
        `INSERT INTO app_records
          (store_type, record_id, sku, code, dictionary_type, row_order, payload, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            sku = VALUES(sku),
            code = VALUES(code),
            dictionary_type = VALUES(dictionary_type),
            row_order = VALUES(row_order),
            payload = VALUES(payload),
            created_at = VALUES(created_at),
            updated_at = VALUES(updated_at)`,
        [
          type,
          row.recordId,
          row.sku,
          row.code,
          row.dictionaryType,
          row.rowOrder,
          row.payload,
          row.createdAt,
          row.updatedAt,
        ],
      );
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function readRows(type) {
  if (mysqlPool) {
    return readMysqlRows(type);
  }
  return readJsonRows(type);
}

async function writeRows(type, rows) {
  if (mysqlPool) {
    await writeMysqlRows(type, rows);
    return;
  }
  writeJsonRows(type, rows);
}

function normalizeStringList(value) {
  if (Array.isArray(value)) {
    return [...new Set(value.map((item) => String(item || "").trim()).filter(Boolean))];
  }
  if (typeof value === "string") {
    return normalizeStringList(value.split(","));
  }
  return [];
}

function normalizePermissions(value) {
  const allowed = new Set(allPermissionCodes);
  return normalizeStringList(value).filter((permission) => allowed.has(permission));
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(String(password || ""), salt, 120000, 32, "sha256").toString("hex");
  return `pbkdf2$sha256$120000$${salt}$${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash) {
    return false;
  }
  const [scheme, digest, iterations, salt, expected] = String(storedHash).split("$");
  if (scheme !== "pbkdf2" || digest !== "sha256" || !salt || !expected) {
    return false;
  }
  const actual = crypto
    .pbkdf2Sync(String(password || ""), salt, Number(iterations || 0), Buffer.from(expected, "hex").length, "sha256")
    .toString("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(actual, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

function signTokenPayload(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", TOKEN_SECRET).update(body).digest("base64url");
  return `${body}.${signature}`;
}

function parseSignedToken(token) {
  const [body, signature] = String(token || "").split(".");
  if (!body || !signature) {
    return null;
  }

  const expected = crypto.createHmac("sha256", TOKEN_SECRET).update(body).digest("base64url");
  try {
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      return null;
    }
  } catch {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload.expiresAt || Number(payload.expiresAt) < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

function createSessionToken(user) {
  return signTokenPayload({
    userId: user.id,
    username: user.username,
    sessionVersion: Number(user.session_version || 0),
    expiresAt: Date.now() + SESSION_TTL_MS,
  });
}

function bumpUserSessionVersion(user) {
  return {
    ...user,
    session_version: Number(user.session_version || 0) + 1,
  };
}

function sanitizeUser(user = {}) {
  const { password, password_hash, ...safe } = user;
  return {
    ...safe,
    role_ids: normalizeStringList(user.role_ids),
  };
}

function sanitizeRole(role = {}) {
  return {
    ...role,
    permissions: normalizePermissions(role.permissions),
  };
}

function getUserRoles(user, roles) {
  const roleIds = new Set(normalizeStringList(user.role_ids));
  return roles.filter((role) => role.status !== "disabled" && (roleIds.has(role.id) || roleIds.has(role.code)));
}

function getUserPermissions(user, roles) {
  const permissions = new Set();
  getUserRoles(user, roles).forEach((role) => {
    normalizePermissions(role.permissions).forEach((permission) => permissions.add(permission));
  });
  return [...permissions];
}

async function buildAuthPayload(user) {
  const roles = (await readRows("adminRoles")).map(sanitizeRole);
  const userRoles = getUserRoles(user, roles);
  const permissions = getUserPermissions(user, roles);
  return {
    user: {
      ...sanitizeUser(user),
      roles: userRoles.map((role) => ({ id: role.id, code: role.code, name_en: role.name_en, name_zh: role.name_zh })),
    },
    roles: userRoles,
    permissions,
  };
}

async function ensureAuthBootstrap() {
  const roles = await readRows("adminRoles");
  const byCode = new Map(roles.map((role) => [role.code, role]));
  let rolesChanged = false;

  defaultRoleSeeds.forEach((seed) => {
    const existing = byCode.get(seed.code);
    if (!existing) {
      roles.push(normalizeRecord("adminRoles", sanitizeRole(seed), { id: seed.id }));
      rolesChanged = true;
      return;
    }

    if (existing.system) {
      const mergedPermissions = normalizePermissions([...(existing.permissions || []), ...seed.permissions]);
      Object.assign(existing, {
        name_en: existing.name_en || seed.name_en,
        name_zh: existing.name_zh || seed.name_zh,
        description_en: existing.description_en || seed.description_en,
        description_zh: existing.description_zh || seed.description_zh,
        permissions: mergedPermissions,
        status: existing.status || "active",
        system: true,
      });
      rolesChanged = true;
    }
  });

  if (rolesChanged) {
    await writeRows("adminRoles", roles);
  }

  const users = await readRows("adminUsers");
  if (!users.length) {
    users.push(
      normalizeRecord("adminUsers", {
        username: ADMIN_USER,
        name: "Administrator",
        email: "",
        phone: "",
        status: "active",
        role_ids: ["role_super_admin"],
        password_hash: hashPassword(ADMIN_PASSWORD),
        session_version: 0,
        last_login_at: "",
        system: true,
      }, { id: "user_admin" }),
    );
    await writeRows("adminUsers", users);
  }
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function sendText(res, status, text) {
  res.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
  });
  res.end(text);
}

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 20 * 1024 * 1024) {
        reject(new Error("Request body is too large."));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function readJson(req) {
  const body = await getRequestBody(req);
  if (!body.trim()) {
    return {};
  }
  return JSON.parse(body);
}

function createId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${crypto.randomBytes(4).toString("hex")}`;
}

function now() {
  return new Date().toISOString();
}

function isOriginAllowed(origin) {
  if (!origin) {
    return true;
  }
  if (CORS_ALLOWED_ORIGINS.includes("*")) {
    return true;
  }
  return CORS_ALLOWED_ORIGINS.includes(origin);
}

function getRequestOrigin(req) {
  const host = String(req.headers["x-forwarded-host"] || req.headers.host || "").split(",")[0].trim();
  if (!host) {
    return "";
  }
  const forwardedProto = String(req.headers["x-forwarded-proto"] || "").split(",")[0].trim();
  const protocol = forwardedProto || (req.socket?.encrypted ? "https" : "http");
  return `${protocol}://${host}`;
}

function isSameRequestOrigin(req, origin) {
  const requestOrigin = getRequestOrigin(req);
  if (!requestOrigin || !origin) {
    return false;
  }
  try {
    return new URL(origin).origin === new URL(requestOrigin).origin;
  } catch {
    return false;
  }
}

function isRequestOriginAllowed(req) {
  const origin = String(req.headers.origin || "").trim();
  return !origin || isOriginAllowed(origin) || isSameRequestOrigin(req, origin);
}

function applyCorsHeaders(req, res) {
  const origin = String(req.headers.origin || "").trim();
  if (!origin || !isRequestOriginAllowed(req)) {
    return;
  }

  if (CORS_ALLOWED_ORIGINS.includes("*")) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  } else {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
}

function buildContentSecurityPolicy() {
  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' https: data:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

function applySecurityHeaders(res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "same-origin");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Content-Security-Policy", buildContentSecurityPolicy());
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Strict-Transport-Security", "max-age=15552000; includeSubDomains");
}

function normalizeRecord(type, input, existing = {}) {
  const timestamp = now();
  const prefixes = {
    vehicles: "veh",
    parts: "part",
    dictionaries: "dict",
    aiLogs: "log",
    aiSessions: "ai_session",
    adminUsers: "user",
    adminRoles: "role",
    inquiries: "inq",
  };
  return {
    ...existing,
    ...input,
    id: existing.id || input.id || createId(prefixes[type] || "rec"),
    created_at: existing.created_at || input.created_at || timestamp,
    updated_at: timestamp,
  };
}

function validateRecord(type, record) {
  const store = stores[type];
  const errors = [];

  store.required.forEach((field) => {
    if (!String(record[field] || "").trim()) {
      errors.push(`${field} is required`);
    }
  });

  store.numeric.forEach((field) => {
    const value = record[field];
    if (value !== undefined && value !== null && String(value).trim() !== "" && !Number.isFinite(Number(value))) {
      errors.push(`${field} must be a number`);
    }
  });

  return errors;
}

async function mergeBySku(type, rows) {
  const existing = await readRows(type);
  const bySku = new Map();
  existing.forEach((row) => {
    if (row.sku) {
      bySku.set(String(row.sku).trim(), row);
    }
  });

  const saved = [];
  const rejected = [];

  rows.forEach((row) => {
    const errors = validateRecord(type, row);
    if (errors.length) {
      rejected.push({ row, errors });
      return;
    }
    const key = String(row.sku).trim();
    const normalized = normalizeRecord(type, row, bySku.get(key) || {});
    bySku.set(key, normalized);
    saved.push(normalized);
  });

  await writeRows(type, [...bySku.values()]);
  return { saved, rejected, total: bySku.size };
}

function normalizeDictionaryImportRow(row = {}, forcedType = "") {
  const type = String(forcedType || row.type || "").trim();
  const code = String(row.code || row.brand_code || "").trim();
  const nameEn = String(row.name_en || row.name || row.brand || "").trim();
  const nameZh = String(row.name_zh || row.name_cn || row.name || row.brand || nameEn).trim();
  const status = String(row.status || "active").trim().toLowerCase() === "disabled" ? "disabled" : "active";
  const sortOrder = String(row.sort_order || row.sort || "").trim();

  return {
    ...row,
    type,
    code,
    name_en: nameEn,
    name_zh: nameZh,
    status,
    sort_order: sortOrder,
  };
}

async function mergeDictionaries(rows, forcedType = "") {
  const existing = await readRows("dictionaries");
  const byKey = new Map();
  existing.forEach((row) => {
    if (row.type && row.code) {
      byKey.set(`${row.type}:${row.code}`, row);
    }
  });

  const saved = [];
  const rejected = [];

  rows.forEach((row) => {
    const normalizedRow = normalizeDictionaryImportRow(row, forcedType);
    const errors = validateRecord("dictionaries", normalizedRow);
    if (normalizedRow.type && !dictionaryTypes.has(normalizedRow.type)) {
      errors.push("type is not supported");
    }
    if (errors.length) {
      rejected.push({ row, errors });
      return;
    }

    const key = `${normalizedRow.type}:${normalizedRow.code}`;
    const normalized = normalizeRecord("dictionaries", normalizedRow, byKey.get(key) || {});
    byKey.set(key, normalized);
    saved.push(normalized);
  });

  await writeRows("dictionaries", [...byKey.values()]);
  return { saved, rejected, total: byKey.size };
}

function getBearerToken(req) {
  const auth = req.headers.authorization || "";
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : "";
}

function getSession(req) {
  const token = getBearerToken(req);
  if (!token) {
    return null;
  }

  const legacySession = sessions.get(token);
  if (legacySession) {
    if (legacySession.expiresAt < Date.now()) {
      sessions.delete(token);
      return null;
    }
    return { token, ...legacySession };
  }

  const signedSession = parseSignedToken(token);
  return signedSession ? { token, ...signedSession } : null;
}

function isAuthorized(req) {
  return Boolean(getSession(req));
}

function getSessionUser(req) {
  const session = getSession(req);
  return session?.username || session?.user || "";
}

async function requirePermission(req, res, permission) {
  const session = getSession(req);
  if (!session) {
    sendJson(res, 401, { error: "Unauthorized" });
    return null;
  }

  const users = await readRows("adminUsers");
  const user = users.find((item) => item.id === session.userId || item.username === session.username);
  if (!user || user.status === "disabled") {
    sessions.delete(session.token);
    sendJson(res, 401, { error: "Unauthorized" });
    return null;
  }
  if (Number(session.sessionVersion || 0) !== Number(user.session_version || 0)) {
    sessions.delete(session.token);
    sendJson(res, 401, { error: "Unauthorized" });
    return null;
  }

  const roles = (await readRows("adminRoles")).map(sanitizeRole);
  const permissions = getUserPermissions(user, roles);
  if (permission && !permissions.includes(permission)) {
    sendJson(res, 403, { error: "Forbidden", permission });
    return null;
  }

  return { session, user, roles, permissions };
}

function invalidateUserSessions(userId) {
  sessions.forEach((session, token) => {
    if (session.userId === userId) {
      sessions.delete(token);
    }
  });
}

function mutationPermission(type, method) {
  const actions = {
    POST: "create",
    PUT: "update",
    DELETE: "delete",
  };
  const action = actions[method];
  return action ? `${type}:${action}` : "";
}

function sortByUpdated(rows) {
  return [...rows].sort((a, b) => String(b.updated_at || b.created_at || "").localeCompare(String(a.updated_at || a.created_at || "")));
}

function safeUserPayload(body = {}, existing = {}) {
  const password = String(body.password || "").trim();
  const next = {
    username: String(body.username || existing.username || "").trim(),
    name: String(body.name || existing.name || "").trim(),
    email: String(body.email || existing.email || "").trim(),
    phone: String(body.phone || existing.phone || "").trim(),
    status: body.status === "disabled" ? "disabled" : "active",
    role_ids: normalizeStringList(body.role_ids || existing.role_ids),
    session_version: Number(existing.session_version || 0),
    system: Boolean(existing.system),
  };

  if (password) {
    next.password_hash = hashPassword(password);
  } else if (existing.password_hash) {
    next.password_hash = existing.password_hash;
  }

  return next;
}

function safeRolePayload(body = {}, existing = {}) {
  const isSystemRole = Boolean(existing.system);
  return {
    code: String(isSystemRole ? existing.code : body.code || existing.code || "").trim(),
    name_en: String(body.name_en || existing.name_en || "").trim(),
    name_zh: String(body.name_zh || existing.name_zh || "").trim(),
    description_en: String(body.description_en || existing.description_en || "").trim(),
    description_zh: String(body.description_zh || existing.description_zh || "").trim(),
    status: isSystemRole && existing.code === "super_admin" ? "active" : body.status === "disabled" ? "disabled" : "active",
    permissions: isSystemRole && existing.code === "super_admin" ? allPermissionCodes : normalizePermissions(body.permissions || existing.permissions),
    system: isSystemRole,
  };
}

function getClientIp(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "")
    .split(",")[0]
    .trim();
  const realIp = String(req.headers["x-real-ip"] || "").trim();
  const rawIp = forwarded || realIp || req.socket?.remoteAddress || "";
  return rawIp.replace(/^::ffff:/, "").replace(/^::1$/, "127.0.0.1");
}

function loginAttemptKey(req, username) {
  return `${getClientIp(req)}:${String(username || "unknown").toLowerCase()}`;
}

function getLoginRateLimit(req, username) {
  const key = loginAttemptKey(req, username);
  const entry = loginAttempts.get(key);
  const timestamp = Date.now();
  if (!entry) {
    return { limited: false, key };
  }

  if (entry.lockedUntil && entry.lockedUntil > timestamp) {
    return {
      limited: true,
      key,
      retryAfterSeconds: Math.ceil((entry.lockedUntil - timestamp) / 1000),
    };
  }

  if (timestamp - entry.firstAttemptAt > LOGIN_RATE_LIMIT_WINDOW_MS) {
    loginAttempts.delete(key);
    return { limited: false, key };
  }

  return { limited: false, key };
}

function recordFailedLogin(req, username) {
  const key = loginAttemptKey(req, username);
  const timestamp = Date.now();
  const existing = loginAttempts.get(key);
  const entry =
    existing && timestamp - existing.firstAttemptAt <= LOGIN_RATE_LIMIT_WINDOW_MS
      ? existing
      : { count: 0, firstAttemptAt: timestamp, lockedUntil: 0 };

  entry.count += 1;
  if (entry.count >= LOGIN_RATE_LIMIT_MAX_ATTEMPTS) {
    entry.lockedUntil = timestamp + LOGIN_RATE_LIMIT_LOCK_MS;
  }
  loginAttempts.set(key, entry);
  return entry;
}

function clearLoginAttempts(req, username) {
  loginAttempts.delete(loginAttemptKey(req, username));
}

function recordAiChatRequest(req) {
  if (!Number.isFinite(AI_CHAT_RATE_LIMIT_MAX_REQUESTS) || AI_CHAT_RATE_LIMIT_MAX_REQUESTS <= 0) {
    return { limited: false };
  }

  const key = getClientIp(req);
  const timestamp = Date.now();
  const existing = aiChatAttempts.get(key);
  const entry =
    existing && timestamp - existing.firstRequestAt <= AI_CHAT_RATE_LIMIT_WINDOW_MS
      ? existing
      : { count: 0, firstRequestAt: timestamp };

  entry.count += 1;
  aiChatAttempts.set(key, entry);

  if (aiChatAttempts.size > 1000) {
    for (const [entryKey, value] of aiChatAttempts.entries()) {
      if (timestamp - value.firstRequestAt > AI_CHAT_RATE_LIMIT_WINDOW_MS) {
        aiChatAttempts.delete(entryKey);
      }
    }
  }

  if (entry.count > AI_CHAT_RATE_LIMIT_MAX_REQUESTS) {
    return {
      limited: true,
      retryAfterSeconds: Math.max(1, Math.ceil((AI_CHAT_RATE_LIMIT_WINDOW_MS - (timestamp - entry.firstRequestAt)) / 1000)),
    };
  }

  return { limited: false };
}

function targetLabel(record = {}) {
  return record.sku || record.name || record.name_en || record.name_zh || record.model || record.code || record.email || record.id || "";
}

async function appendAiLog(req, entry) {
  const logs = await readRows("aiLogs");
  const record = normalizeRecord("aiLogs", {
    category: "operation",
    module: "",
    action: "",
    status: "success",
    source: "admin",
    actor: getSessionUser(req) || "system",
    target_type: "",
    target_id: "",
    target_label: "",
    prompt: "",
    output: "",
    detail: "",
    ...entry,
  });
  logs.unshift(record);
  await writeRows("aiLogs", logs.slice(0, 500));
  return record;
}

function requireAuth(req, res) {
  if (!isAuthorized(req)) {
    sendJson(res, 401, { error: "Unauthorized" });
    return false;
  }
  return true;
}

function safeStaticPath(baseDir, requestPath) {
  const decoded = decodeURIComponent(requestPath.split("?")[0]);
  const normalized = decoded.replace(/^\/+/, "");
  const resolved = path.resolve(baseDir, normalized);
  if (!resolved.startsWith(path.resolve(baseDir))) {
    return null;
  }
  return resolved;
}

function cacheControlForFile(filePath) {
  const resolved = path.resolve(filePath);
  const ext = path.extname(resolved).toLowerCase();

  if (resolved.startsWith(path.resolve(UPLOAD_DIR))) {
    return "public, max-age=31536000, immutable";
  }
  if (ext === ".html") {
    return "no-store";
  }
  if ([".css", ".js", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".ico"].includes(ext)) {
    return "public, max-age=300";
  }
  return "no-store";
}

function serveFile(res, filePath) {
  fs.stat(filePath, (statError, stat) => {
    if (statError || !stat.isFile()) {
      sendText(res, 404, "Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Content-Length": stat.size,
      "Cache-Control": cacheControlForFile(filePath),
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

function serveStatic(req, res, pathname) {
  if (pathname === "/") {
    serveFile(res, path.join(ROOT, "prototype", "index.html"));
    return true;
  }

  if (pathname === "/admin" || pathname === "/admin/") {
    serveFile(res, path.join(ROOT, "admin-system", "index.html"));
    return true;
  }

  if (pathname.startsWith("/admin-system/")) {
    const filePath = safeStaticPath(path.join(ROOT, "admin-system"), pathname.replace(/^\/admin-system\//, ""));
    if (!filePath) {
      sendText(res, 403, "Forbidden");
      return true;
    }
    serveFile(res, filePath);
    return true;
  }

  if (pathname.startsWith("/uploads/")) {
    const filePath = safeStaticPath(UPLOAD_DIR, pathname.replace(/^\/uploads\//, ""));
    if (!filePath) {
      sendText(res, 403, "Forbidden");
      return true;
    }
    serveFile(res, filePath);
    return true;
  }

  const prototypeRoots = ["/assets/", "/data/", "/prototype/"];
  if (prototypeRoots.some((prefix) => pathname.startsWith(prefix)) || ["/app.js", "/styles.css", "/index.html"].includes(pathname)) {
    const cleanPath = pathname.replace(/^\/prototype\//, "");
    const filePath = safeStaticPath(path.join(ROOT, "prototype"), cleanPath);
    if (!filePath) {
      sendText(res, 403, "Forbidden");
      return true;
    }
    serveFile(res, filePath);
    return true;
  }

  return false;
}

async function handleLogin(req, res) {
  const body = await readJson(req);
  const username = String(body.username || "").trim();
  const rateLimit = getLoginRateLimit(req, username);
  if (rateLimit.limited) {
    res.setHeader("Retry-After", String(rateLimit.retryAfterSeconds));
    await appendAiLog(req, {
      category: "security",
      module: "auth",
      action: "login_rate_limited",
      status: "failed",
      source: "admin",
      actor: username || "unknown",
      target_label: username || "",
      detail: `Login temporarily blocked after repeated failures. Retry after ${rateLimit.retryAfterSeconds} seconds.`,
    });
    sendJson(res, 429, { error: "Too many failed login attempts. Please try again later.", retry_after_seconds: rateLimit.retryAfterSeconds });
    return;
  }

  const users = await readRows("adminUsers");
  const index = users.findIndex((user) => user.username === username);
  const user = index >= 0 ? users[index] : null;

  if (!user || user.status === "disabled" || !verifyPassword(body.password, user.password_hash)) {
    recordFailedLogin(req, username);
    await appendAiLog(req, {
      category: "security",
      module: "auth",
      action: "login_failed",
      status: "failed",
      source: "admin",
      actor: username || "unknown",
      target_label: username || "",
      detail: "Invalid username or password",
    });
    sendJson(res, 401, { error: "Invalid username or password" });
    return;
  }

  users[index] = normalizeRecord("adminUsers", { ...user, last_login_at: now() }, user);
  await writeRows("adminUsers", users);

  const authPayload = await buildAuthPayload(users[index]);
  const token = createSessionToken(users[index]);
  clearLoginAttempts(req, username);
  await appendAiLog(req, {
    category: "security",
    module: "auth",
    action: "login",
    status: "success",
    source: "admin",
    actor: user.username,
    target_label: user.username,
  });
  sendJson(res, 200, { token, ...authPayload, ip: getClientIp(req) });
}

async function handleAdminSession(req, res) {
  const auth = await requirePermission(req, res);
  if (!auth) {
    return;
  }
  const authPayload = await buildAuthPayload(auth.user);
  sendJson(res, 200, {
    ...authPayload,
    ip: getClientIp(req),
  });
}

async function handleCollection(req, res, type, id) {
  if (req.method === "GET") {
    const rows = await readRows(type);
    if (id) {
      const row = rows.find((item) => item.id === id || item.sku === id || item.code === id);
      sendJson(res, row ? 200 : 404, row || { error: "Not found" });
      return;
    }
    sendJson(res, 200, { items: rows });
    return;
  }

  if (!(await requirePermission(req, res, mutationPermission(type, req.method)))) {
    return;
  }

  if (req.method === "POST") {
    const body = await readJson(req);
    const errors = validateRecord(type, body);
    if (errors.length) {
      sendJson(res, 400, { errors });
      return;
    }
    const rows = await readRows(type);
    const duplicate = rows.some((row) => {
      if (body.sku) {
        return row.sku === body.sku;
      }
      if (type === "dictionaries") {
        return row.type === body.type && row.code === body.code;
      }
      return false;
    });
    if (duplicate) {
      sendJson(res, 409, { error: type === "dictionaries" ? "Dictionary code already exists for this type." : "SKU already exists. Use update or import to replace it." });
      return;
    }
    const record = normalizeRecord(type, body);
    rows.push(record);
    await writeRows(type, rows);
    await appendAiLog(req, {
      module: type,
      action: "create",
      target_type: type,
      target_id: record.id,
      target_label: targetLabel(record),
      detail: `Created ${type} record.`,
    });
    sendJson(res, 201, record);
    return;
  }

  if (!id) {
    sendJson(res, 400, { error: "Missing record id" });
    return;
  }

  const rows = await readRows(type);
  const index = rows.findIndex((row) => row.id === id || row.sku === id || row.code === id);
  if (index === -1) {
    sendJson(res, 404, { error: "Not found" });
    return;
  }

  if (req.method === "PUT") {
    const body = await readJson(req);
    const next = normalizeRecord(type, body, rows[index]);
    const errors = validateRecord(type, next);
    if (errors.length) {
      sendJson(res, 400, { errors });
      return;
    }
    const duplicate = rows.some((row, rowIndex) => {
      if (rowIndex === index) {
        return false;
      }
      if (type === "dictionaries") {
        return row.type === next.type && row.code === next.code;
      }
      if (next.sku) {
        return row.sku === next.sku;
      }
      return false;
    });
    if (duplicate) {
      sendJson(res, 409, { error: type === "dictionaries" ? "Dictionary code already exists for this type." : "SKU already exists. Use update or import to replace it." });
      return;
    }
    rows[index] = next;
    await writeRows(type, rows);
    await appendAiLog(req, {
      module: type,
      action: "update",
      target_type: type,
      target_id: next.id,
      target_label: targetLabel(next),
      detail: `Updated ${type} record.`,
    });
    sendJson(res, 200, next);
    return;
  }

  if (req.method === "DELETE") {
    const [removed] = rows.splice(index, 1);
    await writeRows(type, rows);
    await appendAiLog(req, {
      module: type,
      action: "delete",
      target_type: type,
      target_id: removed.id,
      target_label: targetLabel(removed),
      detail: `Deleted ${type} record.`,
    });
    sendJson(res, 200, { removed });
    return;
  }

  sendJson(res, 405, { error: "Method not allowed" });
}

async function handleImport(req, res, type) {
  if (!(await requirePermission(req, res, `${type}:import`))) {
    return;
  }
  const body = await readJson(req);
  const rows = Array.isArray(body.rows) ? body.rows : [];
  const result = await mergeBySku(type, rows);
  await appendAiLog(req, {
    module: type,
    action: "import",
    target_type: type,
    target_label: `${result.saved.length} saved, ${result.rejected.length} rejected`,
    detail: `Imported ${rows.length} ${type} row(s).`,
  });
  sendJson(res, result.rejected.length ? 207 : 200, result);
}

async function handleDictionaryImport(req, res, dictionaryType) {
  if (!(await requirePermission(req, res, "dictionaries:import"))) {
    return;
  }

  if (!dictionaryTypes.has(dictionaryType)) {
    sendJson(res, 400, { error: "Dictionary type is not supported." });
    return;
  }

  const body = await readJson(req);
  const rows = Array.isArray(body.rows) ? body.rows : [];
  const result = await mergeDictionaries(rows, dictionaryType);
  await appendAiLog(req, {
    module: "dictionaries",
    action: "import",
    target_type: "dictionaries",
    target_label: `${dictionaryType}: ${result.saved.length} saved, ${result.rejected.length} rejected`,
    detail: `Imported ${rows.length} ${dictionaryType} dictionary row(s).`,
  });
  sendJson(res, result.rejected.length ? 207 : 200, result);
}

function detectImageExtension(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 4) {
    return "";
  }

  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return ".png";
  }
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return ".jpg";
  }
  const header = buffer.subarray(0, 6).toString("ascii");
  if (header === "GIF87a" || header === "GIF89a") {
    return ".gif";
  }
  if (buffer.length >= 12 && buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") {
    return ".webp";
  }
  return "";
}

function isAllowedUploadedImage(ext, buffer) {
  const detected = detectImageExtension(buffer);
  if (!detected) {
    return false;
  }
  if (ext === ".jpeg") {
    return detected === ".jpg";
  }
  return ext === detected;
}

async function handleUpload(req, res) {
  if (!requireAuth(req, res)) {
    return;
  }
  const body = await readJson(req);
  const originalName = String(body.filename || "upload").replace(/[^\w.\-]+/g, "-");
  const ext = path.extname(originalName).toLowerCase();
  const allowed = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);
  if (!allowed.has(ext)) {
    sendJson(res, 400, { error: "Only png, jpg, jpeg, webp, and gif uploads are allowed." });
    return;
  }

  const raw = String(body.data || "").replace(/^data:[^;]+;base64,/, "");
  const buffer = Buffer.from(raw, "base64");
  if (!buffer.length || buffer.length > 10 * 1024 * 1024) {
    sendJson(res, 400, { error: "Image is empty or larger than 10MB." });
    return;
  }
  if (!isAllowedUploadedImage(ext, buffer)) {
    sendJson(res, 400, { error: "Uploaded file content does not match the image extension." });
    return;
  }

  const filename = `${Date.now().toString(36)}-${crypto.randomBytes(4).toString("hex")}${ext}`;
  const target = path.join(UPLOAD_DIR, filename);
  fs.writeFileSync(target, buffer);
  await appendAiLog(req, {
    module: "uploads",
    action: "upload_image",
    target_type: "upload",
    target_id: filename,
    target_label: originalName,
    detail: `Uploaded image ${originalName}.`,
  });
  sendJson(res, 201, {
    filename,
    url: `/uploads/${filename}`,
    originalName,
    size: buffer.length,
  });
}

function normalizeAiMessages(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((message) => ({
      role: message.role === "assistant" ? "assistant" : "user",
      content: String(message.content || "").trim().slice(0, 2000),
    }))
    .filter((message) => message.content);
}

function latestUserMessage(messages) {
  return [...messages].reverse().find((message) => message.role === "user")?.content || "";
}

function extractEmail(text) {
  return String(text || "").match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
}

function extractPhone(text) {
  const match = String(text || "").match(/(?:\+?\d[\d\s().-]{6,}\d)/);
  return match ? match[0].replace(/[^\d+]/g, "") : "";
}

function extractKeywordTokens(text) {
  return [
    ...new Set(
      String(text || "")
        .toLowerCase()
        .split(/[^a-z0-9]+/i)
        .map((token) => token.trim())
        .filter((token) => token.length >= 2),
    ),
  ];
}

function productSearchText(type, record = {}) {
  if (type === "parts") {
    return [
      record.sku,
      record.category,
      record.brand,
      record.name,
      record.title_en,
      record.title_zh,
      record.oe_numbers,
      record.part_number,
      record.applicable_brand,
      record.applicable_model,
      record.description_en,
      record.description_zh,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  return [
    record.sku,
    record.brand,
    record.model,
    record.title_en,
    record.title_zh,
    record.year,
    record.vehicle_type,
    record.energy_type,
    record.description_en,
    record.description_zh,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function scoreProduct(type, record, tokens) {
  const text = productSearchText(type, record);
  return tokens.reduce((score, token) => score + (text.includes(token) ? 1 : 0), 0);
}

function summarizeProduct(type, record = {}) {
  if (type === "parts") {
    return {
      id: record.id,
      sku: record.sku,
      kind: "Auto Part",
      name: record.title_en || record.name || record.sku || "Auto Part",
      meta: [record.oe_numbers, record.applicable_brand, record.applicable_model, record.stock_status].filter(Boolean).join(" | "),
    };
  }

  return {
    id: record.id,
    sku: record.sku,
    kind: "Vehicle",
    name: record.title_en || [record.brand, record.model].filter(Boolean).join(" ") || record.sku || "Vehicle",
    meta: [record.year, record.energy_type, record.vehicle_type, record.stock_status].filter(Boolean).join(" | "),
  };
}

async function findAiRecommendations(messages) {
  const query = messages.filter((message) => message.role === "user").map((message) => message.content).join(" ");
  const tokens = extractKeywordTokens(query);
  if (!tokens.length) {
    return [];
  }

  const [parts, vehicles] = await Promise.all([readRows("parts"), readRows("vehicles")]);
  const candidates = [
    ...parts.map((record) => ({ type: "parts", record, score: scoreProduct("parts", record, tokens) })),
    ...vehicles.map((record) => ({ type: "vehicles", record, score: scoreProduct("vehicles", record, tokens) })),
  ];

  return candidates
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((candidate) => summarizeProduct(candidate.type, candidate.record));
}

function buildAiReply({ messages, recommendations, email, phone, locale }) {
  const zh = locale === "zh";
  const latest = latestUserMessage(messages);
  const lower = latest.toLowerCase();
  const asksPrice = /price|quote|cost|报价|价格|多少钱/.test(lower);
  const asksShipping = /ship|shipping|delivery|freight|port|发货|运输|海运|港口/.test(lower);
  const needsContact = !email && !phone;

  const lines = [];
  if (recommendations.length) {
    lines.push(zh ? "我找到了一些可能匹配的产品：" : "I found a few possible matches:");
    recommendations.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.name}${item.meta ? ` - ${item.meta}` : ""}`);
    });
  } else {
    lines.push(
      zh
        ? "我可以先帮你收集需求并转给销售确认。请尽量提供配件名称、OE/OEM 号、适配车型/年份和数量。"
        : "I can collect your request and pass it to sales for confirmation. Please share the part name, OE/OEM number, vehicle model/year, and quantity.",
    );
  }

  if (asksPrice) {
    lines.push(zh ? "最终价格需要销售确认最新库存、MOQ、目的港和运费后回复。" : "Final pricing needs sales confirmation for stock, MOQ, destination port, and freight.");
  }

  if (asksShipping) {
    lines.push(zh ? "请补充目的国家或目的港，我会一起提交给销售。" : "Please share the destination country or port so I can include it for sales.");
  }

  if (needsContact) {
    lines.push(zh ? "请留下邮箱或 WhatsApp，销售可以继续跟进报价。" : "Please leave your email or WhatsApp so sales can follow up with a quote.");
  } else {
    lines.push(zh ? "我已记录联系方式，可以为你生成询盘并交给销售确认。" : "I have your contact details and can create an inquiry for sales confirmation.");
  }

  return lines.join("\n");
}

function redactAiContactText(text) {
  return String(text || "")
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email provided]")
    .replace(/(?:\+?\d[\d\s().-]{6,}\d)/g, (match) => {
      const digits = match.replace(/\D/g, "");
      return digits.length >= 9 ? "[phone provided]" : match;
    });
}

function buildDeepSeekSystemPrompt(locale) {
  const language = locale === "zh" ? "Chinese" : "English";
  return [
    "You are the AI sales receptionist for a vehicle export and auto parts supplier.",
    `Reply to the buyer in ${language}.`,
    "Your job is to collect inquiry details and route the request to human sales.",
    "You must not create orders, accept payment, promise final prices, guarantee stock, guarantee freight, or guarantee lead time.",
    "Use only the product candidates provided by the system. Do not invent SKUs, products, stock, prices, ports, or delivery promises.",
    "When the buyer asks for price, stock, freight, or lead time, explain that sales must confirm the latest details.",
    "If contact details are missing, ask for email or WhatsApp. If contact details are present, say sales can follow up.",
    "Return only valid json. Do not use markdown.",
    'JSON shape: {"reply":"buyer-facing message","intent":"part|vehicle|mixed|general","missing_fields":["quantity","destination","contact"],"handoff_reason":"short reason for sales follow-up","confidence":0.8}',
  ].join("\n");
}

function buildDeepSeekUserPrompt({ messages, recommendations, email, phone, locale }) {
  const conversation = messages.slice(-8).map((message) => ({
    role: message.role === "assistant" ? "assistant" : "user",
    content: redactAiContactText(message.content).slice(0, 1200),
  }));
  const productCandidates = recommendations.slice(0, 3).map((item) => ({
    kind: item.kind || "",
    sku: item.sku || "",
    name: item.name || "",
    meta: item.meta || "",
  }));

  return [
    "Please respond as strict json only.",
    `locale: ${locale === "zh" ? "zh" : "en"}`,
    `contact_status: email=${email ? "provided" : "missing"}, whatsapp=${phone ? "provided" : "missing"}`,
    `product_candidates_json: ${JSON.stringify(productCandidates)}`,
    `conversation_json: ${JSON.stringify(conversation)}`,
  ].join("\n");
}

function parseDeepSeekJsonReply(content) {
  const raw = String(content || "").trim();
  if (!raw) {
    return null;
  }

  const withoutFence = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  const firstBrace = withoutFence.indexOf("{");
  const lastBrace = withoutFence.lastIndexOf("}");
  const jsonText = firstBrace >= 0 && lastBrace > firstBrace ? withoutFence.slice(firstBrace, lastBrace + 1) : withoutFence;
  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return null;
  }

  const reply = String(parsed.reply || "").trim().slice(0, 1400);
  if (!reply) {
    return null;
  }

  const allowedIntents = new Set(["part", "vehicle", "mixed", "general"]);
  const confidence = Number(parsed.confidence);
  return {
    reply,
    intent: allowedIntents.has(parsed.intent) ? parsed.intent : "general",
    missing_fields: Array.isArray(parsed.missing_fields)
      ? parsed.missing_fields.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 8)
      : [],
    handoff_reason: String(parsed.handoff_reason || "").trim().slice(0, 400),
    confidence: Number.isFinite(confidence) ? Math.max(0, Math.min(1, confidence)) : 0,
  };
}

function enforceAiReceptionBoundary(reply, locale) {
  const text = String(reply || "").trim();
  if (!text) {
    return "";
  }
  const hasOrderBoundary = /不支持线上|只生成询盘|does not support online|only creates an inquiry|no online order|no payment/i.test(text);
  if (hasOrderBoundary) {
    return text;
  }

  const boundary =
    locale === "zh"
      ? "最终价格、库存、运费和交期需由销售确认；本窗口只生成询盘，不支持线上下单或付款。"
      : "Final price, stock, freight, and lead time must be confirmed by sales. This chat only creates an inquiry and does not support online ordering or payment.";
  return `${text}\n${boundary}`;
}

async function callDeepSeekReception(input, options = {}) {
  const provider = "deepseek";
  const model = options.model || DEEPSEEK_MODEL;
  const apiKey = options.apiKey ?? DEEPSEEK_API_KEY;
  const startedAt = Date.now();

  if (!apiKey) {
    return { ok: false, provider, model, error: "not_configured", latency_ms: 0 };
  }

  const fetchImpl = options.fetchImpl || globalThis.fetch;
  if (typeof fetchImpl !== "function") {
    return { ok: false, provider, model, error: "fetch_unavailable", latency_ms: 0 };
  }

  const timeoutMs = Number(options.timeoutMs || DEEPSEEK_TIMEOUT_MS);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const baseUrl = String(options.baseUrl || DEEPSEEK_BASE_URL).replace(/\/+$/, "");
  const thinking = options.thinking || DEEPSEEK_THINKING;
  const requestBody = {
    model,
    messages: [
      { role: "system", content: buildDeepSeekSystemPrompt(input.locale) },
      { role: "user", content: buildDeepSeekUserPrompt(input) },
    ],
    stream: false,
    max_tokens: Number(options.maxTokens || DEEPSEEK_MAX_TOKENS),
    response_format: { type: "json_object" },
    thinking: { type: thinking === "enabled" ? "enabled" : "disabled" },
  };

  try {
    const response = await fetchImpl(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });
    const responseText = await response.text();
    let payload = {};
    try {
      payload = responseText ? JSON.parse(responseText) : {};
    } catch {
      payload = { raw: responseText };
    }

    if (!response.ok) {
      return {
        ok: false,
        provider,
        model,
        error: `http_${response.status}`,
        detail: String(payload.error?.message || payload.message || responseText || "").slice(0, 300),
        latency_ms: Date.now() - startedAt,
      };
    }

    const content = payload.choices?.[0]?.message?.content || "";
    const parsed = parseDeepSeekJsonReply(content);
    if (!parsed) {
      return { ok: false, provider, model, error: "invalid_json", latency_ms: Date.now() - startedAt };
    }

    return {
      ok: true,
      provider,
      model,
      result: {
        ...parsed,
        reply: enforceAiReceptionBoundary(parsed.reply, input.locale),
      },
      usage: payload.usage || {},
      latency_ms: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      ok: false,
      provider,
      model,
      error: error.name === "AbortError" ? "timeout" : "request_failed",
      detail: String(error.message || "").slice(0, 300),
      latency_ms: Date.now() - startedAt,
    };
  } finally {
    clearTimeout(timer);
  }
}

const aiMaintenanceSchemas = {
  vehicles: {
    keyFields: ["sku"],
    label: "vehicles",
    fields: [
      "sku",
      "brand",
      "model",
      "title_en",
      "title_zh",
      "year",
      "trim",
      "condition",
      "vehicle_type",
      "energy_type",
      "steering",
      "seats",
      "transmission",
      "drive_type",
      "range_km",
      "battery_kwh",
      "engine_displacement",
      "mileage",
      "color",
      "stock_status",
      "price_min",
      "price_max",
      "currency",
      "export_port",
      "images",
      "description_en",
      "description_zh",
    ],
  },
  parts: {
    keyFields: ["sku"],
    label: "parts",
    fields: [
      "sku",
      "category",
      "brand",
      "name",
      "title_en",
      "title_zh",
      "oe_numbers",
      "part_number",
      "applicable_brand",
      "applicable_model",
      "applicable_year",
      "moq",
      "stock_status",
      "lead_time_days",
      "unit_weight",
      "package_size",
      "price_min",
      "price_max",
      "currency",
      "images",
      "description_en",
      "description_zh",
    ],
  },
  dictionaries: {
    keyFields: ["type", "code"],
    label: "dictionaries",
    fields: ["type", "code", "brand_code", "name_en", "name_zh", "vehicle_type", "energy_type", "status", "sort_order"],
  },
};

function normalizeAiMaintenanceTargetTypes(value) {
  const requested = Array.isArray(value) ? value : [];
  const targets = requested.map((item) => String(item || "").trim()).filter((item) => aiMaintenanceSchemas[item]);
  return targets.length ? [...new Set(targets)] : ["vehicles", "parts", "dictionaries"];
}

function compactAiMaintenanceRow(type, row = {}) {
  const schema = aiMaintenanceSchemas[type];
  if (!schema) {
    return {};
  }
  return Object.fromEntries(schema.fields.map((field) => [field, row[field]]).filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== ""));
}

async function buildAiMaintenanceContext(targetTypes) {
  const rowsByType = {};
  await Promise.all(
    targetTypes.map(async (type) => {
      rowsByType[type] = await readRows(type);
    }),
  );
  const dictionaries = await readRows("dictionaries");
  const dictionarySummary = {};
  for (const type of dictionaryTypes) {
    dictionarySummary[type] = dictionaries
      .filter((row) => row.type === type && row.status !== "disabled")
      .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0))
      .slice(0, 160)
      .map((row) => ({ code: row.code, name_en: row.name_en, name_zh: row.name_zh, brand_code: row.brand_code || "" }));
  }

  return {
    allowed_targets: targetTypes,
    schemas: Object.fromEntries(targetTypes.map((type) => [type, aiMaintenanceSchemas[type]])),
    counts: Object.fromEntries(targetTypes.map((type) => [type, rowsByType[type]?.length || 0])),
    samples: Object.fromEntries(targetTypes.map((type) => [type, (rowsByType[type] || []).slice(0, 20).map((row) => compactAiMaintenanceRow(type, row))])),
    dictionaries: dictionarySummary,
  };
}

function buildAiMaintenanceSystemPrompt() {
  return [
    "You are a database maintenance planner for a vehicle export and auto parts admin system.",
    "Generate a safe batch maintenance plan from the user's instruction and source text.",
    "Return only valid json. Do not use markdown.",
    "You may only generate upsert operations. Never generate delete, truncate, SQL, user, role, inquiry, or log operations.",
    "Allowed operation targets are vehicles, parts, and dictionaries only.",
    "Use the provided schemas exactly. Do not invent field names.",
    "For dictionaries, data.type must be one of brands, models, colors, energy_types, vehicle_types, stock_statuses, part_categories, currencies, export_ports.",
    "For dictionaries, the unique key is data.type + data.code. For vehicles and parts, the unique key is data.sku.",
    "Use stable lowercase kebab-case codes for dictionary codes, except currency codes should be uppercase ISO-style codes.",
    "Use existing dictionary codes when setting fields such as brand, model, category, vehicle_type, energy_type, stock_status, color, currency, and export_port.",
    "If a required field is missing for a new vehicle or part, still include the best operation but add a warning explaining what is missing.",
    'JSON shape: {"summary":"short summary","warnings":["risk or missing info"],"operations":[{"action":"upsert","type":"dictionaries|vehicles|parts","data":{},"reason":"why this change is needed"}]}',
  ].join("\n");
}

function buildAiMaintenanceUserPrompt({ instruction, sourceText, targetTypes, context }) {
  return [
    "Create a database maintenance plan as json only.",
    `target_types_json: ${JSON.stringify(targetTypes)}`,
    `instruction: ${String(instruction || "").trim().slice(0, 3000)}`,
    `source_text: ${String(sourceText || "").trim().slice(0, 12000)}`,
    `context_json: ${JSON.stringify(context).slice(0, 26000)}`,
  ].join("\n");
}

function parseAiMaintenanceJsonPlan(content) {
  const raw = String(content || "").trim();
  if (!raw) {
    return null;
  }
  const withoutFence = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  const firstBrace = withoutFence.indexOf("{");
  const lastBrace = withoutFence.lastIndexOf("}");
  const jsonText = firstBrace >= 0 && lastBrace > firstBrace ? withoutFence.slice(firstBrace, lastBrace + 1) : withoutFence;
  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return null;
  }
  const operations = Array.isArray(parsed.operations) ? parsed.operations : [];
  return {
    summary: String(parsed.summary || "").trim().slice(0, 800),
    warnings: Array.isArray(parsed.warnings) ? parsed.warnings.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 20) : [],
    operations,
  };
}

async function callDeepSeekMaintenancePlan(input, options = {}) {
  const provider = "deepseek";
  const model = options.model || DEEPSEEK_MODEL;
  const apiKey = options.apiKey ?? DEEPSEEK_API_KEY;
  const startedAt = Date.now();

  if (!apiKey) {
    return { ok: false, provider, model, error: "not_configured", latency_ms: 0 };
  }

  const fetchImpl = options.fetchImpl || globalThis.fetch;
  if (typeof fetchImpl !== "function") {
    return { ok: false, provider, model, error: "fetch_unavailable", latency_ms: 0 };
  }

  const timeoutMs = Number(options.timeoutMs || DEEPSEEK_TIMEOUT_MS);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const baseUrl = String(options.baseUrl || DEEPSEEK_BASE_URL).replace(/\/+$/, "");
  const requestBody = {
    model,
    messages: [
      { role: "system", content: buildAiMaintenanceSystemPrompt() },
      { role: "user", content: buildAiMaintenanceUserPrompt(input) },
    ],
    stream: false,
    max_tokens: Number(options.maxTokens || Math.max(DEEPSEEK_MAX_TOKENS, 1400)),
    response_format: { type: "json_object" },
    thinking: { type: DEEPSEEK_THINKING },
  };

  try {
    const response = await fetchImpl(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });
    const responseText = await response.text();
    let payload = {};
    try {
      payload = responseText ? JSON.parse(responseText) : {};
    } catch {
      payload = { raw: responseText };
    }

    if (!response.ok) {
      return {
        ok: false,
        provider,
        model,
        error: `http_${response.status}`,
        detail: String(payload.error?.message || payload.message || responseText || "").slice(0, 300),
        latency_ms: Date.now() - startedAt,
      };
    }

    const plan = parseAiMaintenanceJsonPlan(payload.choices?.[0]?.message?.content || "");
    if (!plan) {
      return { ok: false, provider, model, error: "invalid_json", latency_ms: Date.now() - startedAt };
    }

    return {
      ok: true,
      provider,
      model,
      plan,
      usage: payload.usage || {},
      latency_ms: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      ok: false,
      provider,
      model,
      error: error.name === "AbortError" ? "timeout" : "request_failed",
      detail: String(error.message || "").slice(0, 300),
      latency_ms: Date.now() - startedAt,
    };
  } finally {
    clearTimeout(timer);
  }
}

function cleanAiMaintenanceData(type, data = {}) {
  const schema = aiMaintenanceSchemas[type];
  if (!schema) {
    return {};
  }
  const cleaned = {};
  schema.fields.forEach((field) => {
    if (data[field] !== undefined && data[field] !== null) {
      cleaned[field] = String(data[field]).trim();
    }
  });
  if (type === "dictionaries") {
    return normalizeDictionaryImportRow(cleaned, cleaned.type);
  }
  return cleaned;
}

function normalizeAiMaintenanceOperation(operation = {}) {
  const action = String(operation.action || "upsert").trim().toLowerCase();
  const type = String(operation.type || "").trim();
  const data = cleanAiMaintenanceData(type, operation.data || {});
  return {
    action,
    type,
    data,
    reason: String(operation.reason || "").trim().slice(0, 500),
  };
}

function aiMaintenanceKey(type, data = {}) {
  if (type === "dictionaries") {
    return `${data.type || ""}:${data.code || ""}`;
  }
  return String(data.sku || "").trim();
}

function findAiMaintenanceExisting(rows, type, data) {
  if (type === "dictionaries") {
    return rows.find((row) => row.type === data.type && row.code === data.code);
  }
  return rows.find((row) => row.sku && row.sku === data.sku);
}

function previewAiMaintenanceOperation(operation, rowsByType) {
  const op = normalizeAiMaintenanceOperation(operation);
  const errors = [];
  if (op.action !== "upsert") {
    errors.push("Only upsert operations are allowed.");
  }
  if (!aiMaintenanceSchemas[op.type]) {
    errors.push("Target type is not supported.");
  }
  if (op.type === "dictionaries" && op.data.type && !dictionaryTypes.has(op.data.type)) {
    errors.push("Dictionary type is not supported.");
  }

  const rows = rowsByType[op.type] || [];
  const existing = errors.length ? null : findAiMaintenanceExisting(rows, op.type, op.data);
  const next = errors.length ? op.data : normalizeRecord(op.type, op.data, existing || {});
  if (!errors.length) {
    validateRecord(op.type, next).forEach((error) => errors.push(error));
    if (!aiMaintenanceKey(op.type, op.data)) {
      errors.push(op.type === "dictionaries" ? "type and code are required" : "sku is required");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    mode: existing ? "update" : "create",
    key: aiMaintenanceKey(op.type, op.data),
    action: op.action,
    type: op.type,
    reason: op.reason,
    data: op.data,
    before: existing ? compactAiMaintenanceRow(op.type, existing) : null,
    after: compactAiMaintenanceRow(op.type, next),
    operation: op,
  };
}

async function previewAiMaintenanceOperations(operations) {
  const targetTypes = [...new Set((operations || []).map((operation) => String(operation.type || "").trim()).filter((type) => aiMaintenanceSchemas[type]))];
  const rowsByType = {};
  await Promise.all(targetTypes.map(async (type) => {
    rowsByType[type] = await readRows(type);
  }));
  return (operations || []).map((operation) => previewAiMaintenanceOperation(operation, rowsByType));
}

async function applyAiMaintenanceOperations(operations) {
  const targetTypes = [...new Set((operations || []).map((operation) => String(operation.type || "").trim()).filter((type) => aiMaintenanceSchemas[type]))];
  const rowsByType = {};
  await Promise.all(targetTypes.map(async (type) => {
    rowsByType[type] = await readRows(type);
  }));

  const applied = [];
  const rejected = [];
  const touched = new Set();
  (operations || []).forEach((operation, index) => {
    const preview = previewAiMaintenanceOperation(operation, rowsByType);
    if (!preview.valid) {
      rejected.push({ index, ...preview });
      return;
    }

    const rows = rowsByType[preview.type];
    const existingIndex =
      preview.type === "dictionaries"
        ? rows.findIndex((row) => row.type === preview.data.type && row.code === preview.data.code)
        : rows.findIndex((row) => row.sku && row.sku === preview.data.sku);
    const existing = existingIndex >= 0 ? rows[existingIndex] : {};
    const next = normalizeRecord(preview.type, preview.data, existing);
    if (existingIndex >= 0) {
      rows[existingIndex] = next;
    } else {
      rows.push(next);
    }
    touched.add(preview.type);
    applied.push({ index, ...preview, id: next.id, mode: existingIndex >= 0 ? "update" : "create" });
  });

  for (const type of touched) {
    await writeRows(type, rowsByType[type]);
  }

  return { applied, rejected };
}

async function handleAiMaintenancePreview(req, res) {
  if (!(await requirePermission(req, res, "ai_maintenance:manage"))) {
    return;
  }

  const body = await readJson(req);
  const instruction = String(body.instruction || "").trim();
  const sourceText = String(body.source_text || body.sourceText || "").trim();
  if (!instruction && !sourceText) {
    sendJson(res, 400, { error: "Instruction or source text is required." });
    return;
  }

  const targetTypes = normalizeAiMaintenanceTargetTypes(body.target_types || body.targetTypes);
  const context = await buildAiMaintenanceContext(targetTypes);
  const result = await callDeepSeekMaintenancePlan({ instruction, sourceText, targetTypes, context });
  if (!result.ok) {
    sendJson(res, result.error === "not_configured" ? 503 : 502, { error: "DeepSeek maintenance plan failed.", reason: result.error, detail: result.detail || "" });
    return;
  }

  const operations = await previewAiMaintenanceOperations(result.plan.operations);
  await appendAiLog(req, {
    module: "ai_maintenance",
    action: "preview",
    source: "admin_ai",
    actor: getSessionUser(req) || "admin",
    target_type: "database",
    target_label: `${operations.filter((operation) => operation.valid).length} valid, ${operations.filter((operation) => !operation.valid).length} invalid`,
    prompt: [instruction, sourceText].filter(Boolean).join("\n\n").slice(0, 2000),
    output: JSON.stringify({ summary: result.plan.summary, warnings: result.plan.warnings, operations: operations.map((operation) => ({ valid: operation.valid, type: operation.type, key: operation.key })) }).slice(0, 2000),
    detail: `DeepSeek ${result.model} generated ${operations.length} maintenance operation(s). latency_ms=${result.latency_ms || 0}`,
  });

  sendJson(res, 200, {
    provider: result.provider,
    model: result.model,
    summary: result.plan.summary,
    warnings: result.plan.warnings,
    operations,
    valid_count: operations.filter((operation) => operation.valid).length,
    invalid_count: operations.filter((operation) => !operation.valid).length,
    usage: result.usage || {},
  });
}

async function handleAiMaintenanceApply(req, res) {
  if (!(await requirePermission(req, res, "ai_maintenance:manage"))) {
    return;
  }

  const body = await readJson(req);
  const operations = Array.isArray(body.operations) ? body.operations : [];
  if (!operations.length) {
    sendJson(res, 400, { error: "No operations to apply." });
    return;
  }

  const result = await applyAiMaintenanceOperations(operations);
  await appendAiLog(req, {
    module: "ai_maintenance",
    action: "apply",
    source: "admin_ai",
    actor: getSessionUser(req) || "admin",
    target_type: "database",
    target_label: `${result.applied.length} applied, ${result.rejected.length} rejected`,
    output: JSON.stringify({ applied: result.applied.map((operation) => ({ type: operation.type, key: operation.key, mode: operation.mode })), rejected: result.rejected.map((operation) => ({ type: operation.type, key: operation.key, errors: operation.errors })) }).slice(0, 2000),
    detail: "AI maintenance operations applied after admin confirmation.",
  });

  sendJson(res, result.rejected.length ? 207 : 200, result);
}

async function createInquiryFromAi(req, body, recommendations) {
  const messages = normalizeAiMessages(body.messages);
  const transcript = messages.map((message) => `${message.role}: ${message.content}`).join("\n").slice(0, 6000);
  const latest = latestUserMessage(messages);
  const email = String(body.email || extractEmail(transcript)).trim();
  const whatsapp = String(body.whatsapp || extractPhone(transcript)).trim();
  const name = String(body.name || (email ? email.split("@")[0] : "AI visitor")).trim();
  const country = String(body.country || body.destination || "").trim();
  const message = String(body.message || latest || transcript).trim();
  const sessionId = String(body.session_id || createId("ai_chat")).trim();
  const sessionRows = await readRows("aiSessions");
  const existingSession = sessionRows.find((row) => row.session_id === sessionId);

  if (existingSession?.inquiry_id) {
    return { inquiry: null, session_id: sessionId, created: false, inquiry_id: existingSession.inquiry_id };
  }

  if ((!email && !whatsapp) || !message) {
    const session = normalizeRecord("aiSessions", {
      ...(existingSession || {}),
      session_id: sessionId,
      status: "collecting",
      email,
      whatsapp,
      country,
      summary: message || transcript,
      messages,
      recommendations,
    }, existingSession || {});
    const index = sessionRows.findIndex((row) => row.session_id === sessionId);
    if (index >= 0) {
      sessionRows[index] = session;
    } else {
      sessionRows.unshift(session);
    }
    await writeRows("aiSessions", sessionRows.slice(0, 500));
    return { inquiry: null, session_id: sessionId, created: false };
  }

  const hasVehicle = recommendations.some((item) => item.kind === "Vehicle");
  const hasPart = recommendations.some((item) => item.kind === "Auto Part");
  const record = normalizeRecord("inquiries", {
    name,
    company: body.company || "",
    country,
    email,
    whatsapp,
    product_type: hasVehicle && hasPart ? "Mixed" : hasVehicle ? "Vehicle" : hasPart ? "Auto Part" : "General",
    message: `AI reception summary:\n${message}\n\nTranscript:\n${transcript}`,
    items: recommendations,
    status: "New",
    source: "AI Reception",
    source_url: body.source_url || "",
    ai_session_id: sessionId,
  });
  const errors = validateRecord("inquiries", record);
  if (errors.length) {
    return { inquiry: null, session_id: sessionId, created: false, errors };
  }

  const inquiries = await readRows("inquiries");
  inquiries.unshift(record);
  await writeRows("inquiries", inquiries);

  const session = normalizeRecord("aiSessions", {
    ...(existingSession || {}),
    session_id: sessionId,
    status: "inquiry_created",
    inquiry_id: record.id,
    email,
    whatsapp,
    country,
    summary: message,
    messages,
    recommendations,
  }, existingSession || {});
  const index = sessionRows.findIndex((row) => row.session_id === sessionId);
  if (index >= 0) {
    sessionRows[index] = session;
  } else {
    sessionRows.unshift(session);
  }
  await writeRows("aiSessions", sessionRows.slice(0, 500));

  await appendAiLog(req, {
    module: "ai_reception",
    action: "create_inquiry",
    source: "website_ai",
    actor: email || whatsapp || name,
    target_type: "inquiries",
    target_id: record.id,
    target_label: targetLabel(record),
    detail: `AI reception created inquiry from session ${sessionId}.`,
  });

  return { inquiry: record, session_id: sessionId, created: true };
}

async function handleAiChat(req, res) {
  const rateLimit = recordAiChatRequest(req);
  if (rateLimit.limited) {
    res.setHeader("Retry-After", String(rateLimit.retryAfterSeconds || 60));
    sendJson(res, 429, { error: "Too many AI chat requests. Please try again later." });
    return;
  }

  const body = await readJson(req);
  const messages = normalizeAiMessages(body.messages);
  if (body.message) {
    messages.push({ role: "user", content: String(body.message || "").trim().slice(0, 2000) });
  }
  if (!messages.length) {
    sendJson(res, 400, { error: "message is required" });
    return;
  }

  const transcript = messages.map((message) => message.content).join("\n");
  const email = String(body.email || extractEmail(transcript)).trim();
  const phone = String(body.whatsapp || extractPhone(transcript)).trim();
  const locale = body.locale === "zh" ? "zh" : "en";
  const recommendations = await findAiRecommendations(messages);
  let reply = buildAiReply({ messages, recommendations, email, phone, locale });
  let aiEngine = {
    provider: "rules",
    model: "rules",
    status: AI_PROVIDER === "deepseek" ? "fallback" : "success",
    fallback_reason: AI_PROVIDER === "deepseek" ? "not_called" : "",
    latency_ms: 0,
    usage: {},
  };
  let aiIntent = "";
  let missingFields = [];

  if (AI_PROVIDER === "deepseek") {
    const deepSeekResult = await callDeepSeekReception({
      messages,
      recommendations,
      email,
      phone,
      locale,
    });

    if (deepSeekResult.ok) {
      reply = deepSeekResult.result.reply;
      aiEngine = {
        provider: deepSeekResult.provider,
        model: deepSeekResult.model,
        status: "success",
        fallback_reason: "",
        latency_ms: deepSeekResult.latency_ms,
        usage: deepSeekResult.usage || {},
      };
      aiIntent = deepSeekResult.result.intent;
      missingFields = deepSeekResult.result.missing_fields || [];
    } else {
      aiEngine = {
        provider: "rules",
        model: "rules",
        status: "fallback",
        fallback_reason: deepSeekResult.error,
        upstream_provider: deepSeekResult.provider,
        upstream_model: deepSeekResult.model,
        latency_ms: deepSeekResult.latency_ms,
        usage: {},
      };
    }
  }

  const inquiryResult = await createInquiryFromAi(req, { ...body, messages }, recommendations);

  await appendAiLog(req, {
    module: "ai_reception",
    action: inquiryResult.created ? "chat_inquiry_created" : "chat",
    source: "website_ai",
    actor: email || phone || "visitor",
    target_type: inquiryResult.created ? "inquiries" : "aiSessions",
    target_id: inquiryResult.inquiry?.id || inquiryResult.session_id,
    target_label: inquiryResult.inquiry ? targetLabel(inquiryResult.inquiry) : inquiryResult.session_id,
    output: reply.slice(0, 1200),
    detail: [
      `AI reception handled ${messages.length} message(s).`,
      `provider=${aiEngine.provider}`,
      `model=${aiEngine.model}`,
      `status=${aiEngine.status}`,
      aiEngine.fallback_reason ? `fallback_reason=${aiEngine.fallback_reason}` : "",
      aiEngine.upstream_provider ? `upstream_provider=${aiEngine.upstream_provider}` : "",
      aiEngine.upstream_model ? `upstream_model=${aiEngine.upstream_model}` : "",
      `latency_ms=${aiEngine.latency_ms || 0}`,
      aiEngine.usage?.prompt_tokens !== undefined ? `prompt_tokens=${aiEngine.usage.prompt_tokens}` : "",
      aiEngine.usage?.completion_tokens !== undefined ? `completion_tokens=${aiEngine.usage.completion_tokens}` : "",
      aiIntent ? `intent=${aiIntent}` : "",
      missingFields.length ? `missing_fields=${missingFields.join(",")}` : "",
    ]
      .filter(Boolean)
      .join(" "),
  });

  sendJson(res, 200, {
    session_id: inquiryResult.session_id,
    reply,
    recommendations,
    inquiry_created: inquiryResult.created,
    inquiry_id: inquiryResult.inquiry?.id || inquiryResult.inquiry_id || "",
    ai_provider: aiEngine.provider,
    ai_model: aiEngine.model,
    ai_status: aiEngine.status,
    fallback_reason: aiEngine.fallback_reason || "",
    intent: aiIntent,
    missing_fields: missingFields,
    errors: inquiryResult.errors || [],
  });
}

async function handleInquiryPost(req, res) {
  const body = await readJson(req);
  const record = normalizeRecord("inquiries", {
    name: body.name || "",
    company: body.company || "",
    country: body.country || body.destination || "",
    email: body.email || "",
    whatsapp: body.whatsapp || "",
    product_type: body.product_type || "",
    message: body.message || "",
    items: Array.isArray(body.items) ? body.items : [],
    status: "New",
    source: body.source || "Website Form",
    source_url: body.source_url || "",
  });
  const errors = validateRecord("inquiries", record);
  if (errors.length) {
    sendJson(res, 400, { errors });
    return;
  }
  const rows = await readRows("inquiries");
  rows.unshift(record);
  await writeRows("inquiries", rows);
  await appendAiLog(req, {
    module: "inquiries",
    action: "create",
    source: "website",
    actor: record.email || record.name || "visitor",
    target_type: "inquiries",
    target_id: record.id,
    target_label: targetLabel(record),
    detail: "Website inquiry submitted.",
  });
  sendJson(res, 201, record);
}

async function handleInquiryUpdate(req, res, id) {
  if (!(await requirePermission(req, res, "inquiries:update"))) {
    return;
  }
  const rows = await readRows("inquiries");
  const index = rows.findIndex((row) => row.id === id);
  if (index === -1) {
    sendJson(res, 404, { error: "Not found" });
    return;
  }
  const body = await readJson(req);
  rows[index] = normalizeRecord("inquiries", body, rows[index]);
  await writeRows("inquiries", rows);
  await appendAiLog(req, {
    module: "inquiries",
    action: "update_status",
    target_type: "inquiries",
    target_id: rows[index].id,
    target_label: targetLabel(rows[index]),
    detail: `Inquiry status updated to ${rows[index].status || ""}.`,
  });
  sendJson(res, 200, rows[index]);
}

async function handleAiLogs(req, res) {
  if (!(await requirePermission(req, res, "ai_logs:view"))) {
    return;
  }

  if (req.method === "GET") {
    const rows = (await readRows("aiLogs")).sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || "")));
    sendJson(res, 200, { items: rows.slice(0, 500) });
    return;
  }

  sendJson(res, 405, { error: "Method not allowed" });
}

async function handlePermissions(req, res) {
  if (!(await requirePermission(req, res))) {
    return;
  }
  sendJson(res, 200, { items: permissionCatalog });
}

async function handleAdminUsers(req, res, id, action) {
  if (req.method === "GET") {
    if (!(await requirePermission(req, res, "users:view"))) {
      return;
    }
    const rows = sortByUpdated(await readRows("adminUsers")).map(sanitizeUser);
    sendJson(res, 200, { items: rows });
    return;
  }

  if (req.method === "POST" && action === "reset-password") {
    if (!(await requirePermission(req, res, "users:reset_password"))) {
      return;
    }
    const body = await readJson(req);
    const password = String(body.password || "").trim();
    if (password.length < 8) {
      sendJson(res, 400, { errors: ["password must be at least 8 characters"] });
      return;
    }
    const rows = await readRows("adminUsers");
    const index = rows.findIndex((row) => row.id === id);
    if (index === -1) {
      sendJson(res, 404, { error: "Not found" });
      return;
    }
    rows[index] = normalizeRecord("adminUsers", bumpUserSessionVersion({ ...rows[index], password_hash: hashPassword(password) }), rows[index]);
    await writeRows("adminUsers", rows);
    invalidateUserSessions(rows[index].id);
    await appendAiLog(req, {
      module: "adminUsers",
      action: "reset_password",
      target_type: "adminUsers",
      target_id: rows[index].id,
      target_label: rows[index].username,
      detail: "Admin user password was reset.",
    });
    sendJson(res, 200, sanitizeUser(rows[index]));
    return;
  }

  if (req.method === "POST" && (action === "disable" || action === "enable")) {
    if (!(await requirePermission(req, res, "users:disable"))) {
      return;
    }
    const rows = await readRows("adminUsers");
    const index = rows.findIndex((row) => row.id === id);
    if (index === -1) {
      sendJson(res, 404, { error: "Not found" });
      return;
    }
    rows[index] = normalizeRecord("adminUsers", bumpUserSessionVersion({ ...rows[index], status: action === "disable" ? "disabled" : "active" }), rows[index]);
    await writeRows("adminUsers", rows);
    if (rows[index].status === "disabled") {
      invalidateUserSessions(rows[index].id);
    }
    await appendAiLog(req, {
      module: "adminUsers",
      action,
      target_type: "adminUsers",
      target_id: rows[index].id,
      target_label: rows[index].username,
      detail: `Admin user ${action}d.`,
    });
    sendJson(res, 200, sanitizeUser(rows[index]));
    return;
  }

  if (req.method === "POST") {
    if (!(await requirePermission(req, res, "users:create"))) {
      return;
    }
    const body = await readJson(req);
    const password = String(body.password || "").trim();
    const record = normalizeRecord("adminUsers", safeUserPayload(body));
    const errors = validateRecord("adminUsers", record);
    if (!password) {
      errors.push("password is required");
    } else if (password.length < 8) {
      errors.push("password must be at least 8 characters");
    }
    if (!record.role_ids.length) {
      errors.push("role_ids is required");
    }
    if (errors.length) {
      sendJson(res, 400, { errors });
      return;
    }
    const rows = await readRows("adminUsers");
    if (rows.some((row) => row.username === record.username)) {
      sendJson(res, 409, { error: "Username already exists." });
      return;
    }
    rows.push(record);
    await writeRows("adminUsers", rows);
    await appendAiLog(req, {
      module: "adminUsers",
      action: "create",
      target_type: "adminUsers",
      target_id: record.id,
      target_label: record.username,
      detail: "Admin user created.",
    });
    sendJson(res, 201, sanitizeUser(record));
    return;
  }

  if (req.method === "PUT" && id) {
    if (!(await requirePermission(req, res, "users:update"))) {
      return;
    }
    const body = await readJson(req);
    const rows = await readRows("adminUsers");
    const index = rows.findIndex((row) => row.id === id);
    if (index === -1) {
      sendJson(res, 404, { error: "Not found" });
      return;
    }
    const record = normalizeRecord("adminUsers", bumpUserSessionVersion(safeUserPayload(body, rows[index])), rows[index]);
    const errors = validateRecord("adminUsers", record);
    if (body.password && String(body.password || "").trim().length < 8) {
      errors.push("password must be at least 8 characters");
    }
    if (!record.role_ids.length) {
      errors.push("role_ids is required");
    }
    if (errors.length) {
      sendJson(res, 400, { errors });
      return;
    }
    if (rows.some((row, rowIndex) => rowIndex !== index && row.username === record.username)) {
      sendJson(res, 409, { error: "Username already exists." });
      return;
    }
    rows[index] = record;
    await writeRows("adminUsers", rows);
    invalidateUserSessions(record.id);
    await appendAiLog(req, {
      module: "adminUsers",
      action: "update",
      target_type: "adminUsers",
      target_id: record.id,
      target_label: record.username,
      detail: "Admin user updated.",
    });
    sendJson(res, 200, sanitizeUser(record));
    return;
  }

  sendJson(res, 405, { error: "Method not allowed" });
}

async function handleAdminRoles(req, res, id) {
  if (req.method === "GET") {
    if (!(await requirePermission(req, res, "roles:view"))) {
      return;
    }
    sendJson(res, 200, { items: sortByUpdated(await readRows("adminRoles")).map(sanitizeRole) });
    return;
  }

  if (req.method === "POST") {
    if (!(await requirePermission(req, res, "roles:create"))) {
      return;
    }
    const body = await readJson(req);
    const record = normalizeRecord("adminRoles", safeRolePayload(body));
    const errors = validateRecord("adminRoles", record);
    if (!record.permissions.length) {
      errors.push("permissions is required");
    }
    if (errors.length) {
      sendJson(res, 400, { errors });
      return;
    }
    const rows = await readRows("adminRoles");
    if (rows.some((row) => row.code === record.code)) {
      sendJson(res, 409, { error: "Role code already exists." });
      return;
    }
    rows.push(record);
    await writeRows("adminRoles", rows);
    await appendAiLog(req, {
      module: "adminRoles",
      action: "create",
      target_type: "adminRoles",
      target_id: record.id,
      target_label: record.code,
      detail: "Admin role created.",
    });
    sendJson(res, 201, sanitizeRole(record));
    return;
  }

  const rows = await readRows("adminRoles");
  const index = rows.findIndex((row) => row.id === id);
  if (index === -1) {
    sendJson(res, 404, { error: "Not found" });
    return;
  }

  if (req.method === "PUT") {
    if (!(await requirePermission(req, res, "roles:update"))) {
      return;
    }
    const body = await readJson(req);
    const record = normalizeRecord("adminRoles", safeRolePayload(body, rows[index]), rows[index]);
    const errors = validateRecord("adminRoles", record);
    if (!record.permissions.length) {
      errors.push("permissions is required");
    }
    if (errors.length) {
      sendJson(res, 400, { errors });
      return;
    }
    if (rows.some((row, rowIndex) => rowIndex !== index && row.code === record.code)) {
      sendJson(res, 409, { error: "Role code already exists." });
      return;
    }
    rows[index] = record;
    await writeRows("adminRoles", rows);
    await appendAiLog(req, {
      module: "adminRoles",
      action: "update",
      target_type: "adminRoles",
      target_id: record.id,
      target_label: record.code,
      detail: "Admin role updated.",
    });
    sendJson(res, 200, sanitizeRole(record));
    return;
  }

  if (req.method === "DELETE") {
    if (!(await requirePermission(req, res, "roles:delete"))) {
      return;
    }
    if (rows[index].system) {
      sendJson(res, 400, { error: "System roles cannot be deleted." });
      return;
    }
    const users = await readRows("adminUsers");
    if (users.some((user) => {
      const roleIds = normalizeStringList(user.role_ids);
      return roleIds.includes(rows[index].id) || roleIds.includes(rows[index].code);
    })) {
      sendJson(res, 409, { error: "Role is assigned to users and cannot be deleted." });
      return;
    }
    const [removed] = rows.splice(index, 1);
    await writeRows("adminRoles", rows);
    await appendAiLog(req, {
      module: "adminRoles",
      action: "delete",
      target_type: "adminRoles",
      target_id: removed.id,
      target_label: removed.code,
      detail: "Admin role deleted.",
    });
    sendJson(res, 200, { removed: sanitizeRole(removed) });
    return;
  }

  sendJson(res, 405, { error: "Method not allowed" });
}

async function handleApi(req, res, pathname) {
  if (!isRequestOriginAllowed(req)) {
    sendJson(res, 403, { error: "Origin is not allowed" });
    return true;
  }

  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return true;
  }

  if (pathname === "/api/health") {
    sendJson(res, 200, { ok: true, service: "vehicle-export-platform", port: PORT, storage: mysqlPool ? "mysql" : "json" });
    return true;
  }

  if (pathname === "/api/auth/login" && req.method === "POST") {
    await handleLogin(req, res);
    return true;
  }

  if (pathname === "/api/ai/chat" && req.method === "POST") {
    await handleAiChat(req, res);
    return true;
  }

  if (pathname === "/api/ai-maintenance/preview" && req.method === "POST") {
    await handleAiMaintenancePreview(req, res);
    return true;
  }

  if (pathname === "/api/ai-maintenance/apply" && req.method === "POST") {
    await handleAiMaintenanceApply(req, res);
    return true;
  }

  if (pathname === "/api/admin/session") {
    await handleAdminSession(req, res);
    return true;
  }

  if (pathname === "/api/admin/permissions") {
    await handlePermissions(req, res);
    return true;
  }

  const adminUserMatch = pathname.match(/^\/api\/admin\/users(?:\/([^/]+)(?:\/([^/]+))?)?$/);
  if (adminUserMatch) {
    await handleAdminUsers(req, res, adminUserMatch[1], adminUserMatch[2]);
    return true;
  }

  const adminRoleMatch = pathname.match(/^\/api\/admin\/roles(?:\/([^/]+))?$/);
  if (adminRoleMatch) {
    await handleAdminRoles(req, res, adminRoleMatch[1]);
    return true;
  }

  if (pathname === "/api/uploads" && req.method === "POST") {
    await handleUpload(req, res);
    return true;
  }

  if (pathname === "/api/ai-logs") {
    await handleAiLogs(req, res);
    return true;
  }

  const importMatch = pathname.match(/^\/api\/import\/(vehicles|parts)$/);
  if (importMatch && req.method === "POST") {
    await handleImport(req, res, importMatch[1]);
    return true;
  }

  const dictionaryImportMatch = pathname.match(/^\/api\/import\/dictionaries\/([^/]+)$/);
  if (dictionaryImportMatch && req.method === "POST") {
    await handleDictionaryImport(req, res, dictionaryImportMatch[1]);
    return true;
  }

  const collectionMatch = pathname.match(/^\/api\/(vehicles|parts)(?:\/([^/]+))?$/);
  if (collectionMatch) {
    await handleCollection(req, res, collectionMatch[1], collectionMatch[2]);
    return true;
  }

  const dictionaryTypeMatch = pathname.match(/^\/api\/dictionaries\/type\/([^/]+)$/);
  if (dictionaryTypeMatch && req.method === "GET") {
    const rows = (await readRows("dictionaries"))
      .filter((row) => row.type === dictionaryTypeMatch[1])
      .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));
    sendJson(res, 200, { items: rows });
    return true;
  }

  if (pathname === "/api/dictionaries" || pathname.match(/^\/api\/dictionaries\/[^/]+$/)) {
    const dictionaryId = pathname === "/api/dictionaries" ? undefined : pathname.split("/").pop();
    await handleCollection(req, res, "dictionaries", dictionaryId);
    return true;
  }

  if (pathname === "/api/inquiries") {
    if (req.method === "GET") {
      if (!(await requirePermission(req, res, "inquiries:view"))) {
        return true;
      }
      sendJson(res, 200, { items: await readRows("inquiries") });
      return true;
    }
    if (req.method === "POST") {
      await handleInquiryPost(req, res);
      return true;
    }
  }

  const inquiryMatch = pathname.match(/^\/api\/inquiries\/([^/]+)$/);
  if (inquiryMatch && req.method === "PUT") {
    await handleInquiryUpdate(req, res, inquiryMatch[1]);
    return true;
  }

  return false;
}

async function route(req, res) {
  try {
    applySecurityHeaders(res);
    applyCorsHeaders(req, res);

    const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const pathname = parsedUrl.pathname;

    if (pathname.startsWith("/api/")) {
      const handled = await handleApi(req, res, pathname);
      if (!handled) {
        sendJson(res, 404, { error: "API route not found" });
      }
      return;
    }

    if (serveStatic(req, res, pathname)) {
      return;
    }

    sendText(res, 404, "Not found");
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Internal server error" });
  }
}

async function startServer() {
  await ensureStorage();
  return http.createServer(route).listen(PORT, () => {
    console.log(`Vehicle export platform running at http://localhost:${PORT}`);
    console.log(`Storage driver: ${mysqlPool ? "mysql" : "json"}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });
}

module.exports = {
  applyCorsHeaders,
  applyAiMaintenanceOperations,
  applySecurityHeaders,
  buildContentSecurityPolicy,
  buildDeepSeekSystemPrompt,
  buildDeepSeekUserPrompt,
  buildAiMaintenanceSystemPrompt,
  buildAiMaintenanceUserPrompt,
  clearLoginAttempts,
  callDeepSeekReception,
  callDeepSeekMaintenancePlan,
  createSessionToken,
  extractEmail,
  extractKeywordTokens,
  getLoginRateLimit,
  getRequestOrigin,
  hashPassword,
  isOriginAllowed,
  isRequestOriginAllowed,
  isSameRequestOrigin,
  detectImageExtension,
  buildAiReply,
  isAllowedUploadedImage,
  mergeDictionaries,
  mysqlRecordIdsToDelete,
  mysqlRecordSnapshot,
  normalizeDictionaryImportRow,
  parseAiMaintenanceJsonPlan,
  parseDeepSeekJsonReply,
  previewAiMaintenanceOperation,
  previewAiMaintenanceOperations,
  parseSignedToken,
  recordFailedLogin,
  route,
  startServer,
  verifyPassword,
};
