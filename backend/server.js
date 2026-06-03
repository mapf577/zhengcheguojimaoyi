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

const sessions = new Map();
let mysqlPool = null;

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
    required: ["name", "email", "message"],
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
      payload JSON NOT NULL,
      created_at VARCHAR(40) NULL,
      updated_at VARCHAR(40) NULL,
      PRIMARY KEY (id),
      UNIQUE KEY uniq_store_record (store_type, record_id),
      KEY idx_store_type (store_type),
      KEY idx_store_sku (store_type, sku),
      KEY idx_dictionary (store_type, dictionary_type, code)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await seedMysqlFromJson();
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
  const [rows] = await mysqlPool.execute("SELECT payload FROM app_records WHERE store_type = ? ORDER BY id ASC", [type]);
  return rows.map((row) => {
    if (typeof row.payload === "string") {
      return JSON.parse(row.payload);
    }
    return row.payload || {};
  });
}

async function writeMysqlRows(type, rows) {
  const connection = await mysqlPool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute("DELETE FROM app_records WHERE store_type = ?", [type]);
    for (const row of rows) {
      const persisted = row.id ? row : normalizeRecord(type, row);
      await connection.execute(
        `INSERT INTO app_records
          (store_type, record_id, sku, code, dictionary_type, payload, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          type,
          persisted.id,
          persisted.sku || null,
          persisted.code || null,
          type === "dictionaries" ? persisted.type || null : null,
          JSON.stringify(persisted),
          persisted.created_at || null,
          persisted.updated_at || null,
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
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  });
  res.end(body);
}

function sendText(res, status, text) {
  res.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
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

function normalizeRecord(type, input, existing = {}) {
  const timestamp = now();
  const prefixes = {
    vehicles: "veh",
    parts: "part",
    dictionaries: "dict",
    aiLogs: "log",
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

function getBearerToken(req) {
  const auth = req.headers.authorization || "";
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : "";
}

function getSession(req) {
  const token = getBearerToken(req);
  const session = sessions.get(token);
  if (!session) {
    return null;
  }
  if (session.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }
  return { token, ...session };
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
  const users = await readRows("adminUsers");
  const index = users.findIndex((user) => user.username === username);
  const user = index >= 0 ? users[index] : null;

  if (!user || user.status === "disabled" || !verifyPassword(body.password, user.password_hash)) {
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
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, {
    userId: user.id,
    username: user.username,
    permissions: authPayload.permissions,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  });
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
    rows[index] = normalizeRecord("adminUsers", { ...rows[index], password_hash: hashPassword(password) }, rows[index]);
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
    rows[index] = normalizeRecord("adminUsers", { ...rows[index], status: action === "disable" ? "disabled" : "active" }, rows[index]);
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
    const record = normalizeRecord("adminUsers", safeUserPayload(body, rows[index]), rows[index]);
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

  const collectionMatch = pathname.match(/^\/api\/(vehicles|parts)(?:\/([^/]+))?$/);
  if (collectionMatch) {
    await handleCollection(req, res, collectionMatch[1], collectionMatch[2]);
    return true;
  }

  if (pathname === "/api/dictionaries" || pathname.match(/^\/api\/dictionaries\/[^/]+$/)) {
    const dictionaryId = pathname === "/api/dictionaries" ? undefined : pathname.split("/").pop();
    await handleCollection(req, res, "dictionaries", dictionaryId);
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

ensureStorage()
  .then(() => {
    http.createServer(route).listen(PORT, () => {
      console.log(`Vehicle export platform running at http://localhost:${PORT}`);
      console.log(`Storage driver: ${mysqlPool ? "mysql" : "json"}`);
    });
  })
  .catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });
