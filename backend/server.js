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

const sessions = new Map();

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
};

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

function ensureStorage() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  Object.values(stores).forEach((store) => {
    if (!fs.existsSync(store.file)) {
      fs.writeFileSync(store.file, "[]", "utf8");
    }
  });
}

function readRows(type) {
  const file = stores[type].file;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return [];
  }
}

function writeRows(type, rows) {
  fs.writeFileSync(stores[type].file, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
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
  return {
    ...existing,
    ...input,
    id: existing.id || input.id || createId(type === "vehicles" ? "veh" : type === "parts" ? "part" : "inq"),
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

function mergeBySku(type, rows) {
  const existing = readRows(type);
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

  writeRows(type, [...bySku.values()]);
  return { saved, rejected, total: bySku.size };
}

function getBearerToken(req) {
  const auth = req.headers.authorization || "";
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : "";
}

function isAuthorized(req) {
  const token = getBearerToken(req);
  const session = sessions.get(token);
  if (!session) {
    return false;
  }
  if (session.expiresAt < Date.now()) {
    sessions.delete(token);
    return false;
  }
  return true;
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
  if (body.username !== ADMIN_USER || body.password !== ADMIN_PASSWORD) {
    sendJson(res, 401, { error: "Invalid username or password" });
    return;
  }

  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, {
    user: ADMIN_USER,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  });
  sendJson(res, 200, { token, user: { username: ADMIN_USER } });
}

async function handleCollection(req, res, type, id) {
  if (req.method === "GET") {
    const rows = readRows(type);
    if (id) {
      const row = rows.find((item) => item.id === id || item.sku === id);
      sendJson(res, row ? 200 : 404, row || { error: "Not found" });
      return;
    }
    sendJson(res, 200, { items: rows });
    return;
  }

  if (!requireAuth(req, res)) {
    return;
  }

  if (req.method === "POST") {
    const body = await readJson(req);
    const errors = validateRecord(type, body);
    if (errors.length) {
      sendJson(res, 400, { errors });
      return;
    }
    const rows = readRows(type);
    if (body.sku && rows.some((row) => row.sku === body.sku)) {
      sendJson(res, 409, { error: "SKU already exists. Use update or import to replace it." });
      return;
    }
    const record = normalizeRecord(type, body);
    rows.push(record);
    writeRows(type, rows);
    sendJson(res, 201, record);
    return;
  }

  if (!id) {
    sendJson(res, 400, { error: "Missing record id" });
    return;
  }

  const rows = readRows(type);
  const index = rows.findIndex((row) => row.id === id || row.sku === id);
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
    rows[index] = next;
    writeRows(type, rows);
    sendJson(res, 200, next);
    return;
  }

  if (req.method === "DELETE") {
    const [removed] = rows.splice(index, 1);
    writeRows(type, rows);
    sendJson(res, 200, { removed });
    return;
  }

  sendJson(res, 405, { error: "Method not allowed" });
}

async function handleImport(req, res, type) {
  if (!requireAuth(req, res)) {
    return;
  }
  const body = await readJson(req);
  const rows = Array.isArray(body.rows) ? body.rows : [];
  const result = mergeBySku(type, rows);
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
  const rows = readRows("inquiries");
  rows.unshift(record);
  writeRows("inquiries", rows);
  sendJson(res, 201, record);
}

async function handleInquiryUpdate(req, res, id) {
  if (!requireAuth(req, res)) {
    return;
  }
  const rows = readRows("inquiries");
  const index = rows.findIndex((row) => row.id === id);
  if (index === -1) {
    sendJson(res, 404, { error: "Not found" });
    return;
  }
  const body = await readJson(req);
  rows[index] = normalizeRecord("inquiries", body, rows[index]);
  writeRows("inquiries", rows);
  sendJson(res, 200, rows[index]);
}

async function handleApi(req, res, pathname) {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return true;
  }

  if (pathname === "/api/health") {
    sendJson(res, 200, { ok: true, service: "vehicle-export-platform", port: PORT });
    return true;
  }

  if (pathname === "/api/auth/login" && req.method === "POST") {
    await handleLogin(req, res);
    return true;
  }

  if (pathname === "/api/uploads" && req.method === "POST") {
    await handleUpload(req, res);
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

  if (pathname === "/api/inquiries") {
    if (req.method === "GET") {
      if (!requireAuth(req, res)) {
        return true;
      }
      sendJson(res, 200, { items: readRows("inquiries") });
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

ensureStorage();

http.createServer(route).listen(PORT, () => {
  console.log(`Vehicle export platform running at http://localhost:${PORT}`);
  console.log(`Admin login: ${ADMIN_USER} / ${ADMIN_PASSWORD}`);
});
