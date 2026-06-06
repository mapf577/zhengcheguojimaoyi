process.env.TOKEN_SECRET = "test-token-secret";
process.env.CORS_ALLOWED_ORIGINS = "https://allowed.example,https://www.allowed.example";
process.env.LOGIN_RATE_LIMIT_MAX_ATTEMPTS = "2";
process.env.LOGIN_RATE_LIMIT_WINDOW_MS = "60000";
process.env.LOGIN_RATE_LIMIT_LOCK_MS = "30000";

const assert = require("node:assert/strict");
const test = require("node:test");

const {
  buildAiReply,
  buildAiMaintenanceSystemPrompt,
  buildContentSecurityPolicy,
  buildDeepSeekUserPrompt,
  callDeepSeekMaintenancePlan,
  callDeepSeekReception,
  clearLoginAttempts,
  createSessionToken,
  detectImageExtension,
  extractEmail,
  extractKeywordTokens,
  getLoginRateLimit,
  hashPassword,
  isOriginAllowed,
  isRequestOriginAllowed,
  isAllowedUploadedImage,
  mysqlRecordIdsToDelete,
  mysqlRecordSnapshot,
  normalizeDictionaryImportRow,
  parseAiMaintenanceJsonPlan,
  parseDeepSeekJsonReply,
  parseSignedToken,
  previewAiMaintenanceOperation,
  recordFailedLogin,
  verifyPassword,
} = require("../backend/server");

function mockReq(ip = "127.0.0.1") {
  return {
    headers: {
      host: "127.0.0.1:3000",
    },
    socket: {
      remoteAddress: ip,
    },
  };
}

test("password hashes verify only the original password", () => {
  const hash = hashPassword("correct-password");

  assert.equal(verifyPassword("correct-password", hash), true);
  assert.equal(verifyPassword("wrong-password", hash), false);
});

test("signed session tokens reject tampering", () => {
  const token = createSessionToken({
    id: "user_test",
    username: "admin",
    session_version: 3,
  });
  const payload = parseSignedToken(token);

  assert.equal(payload.userId, "user_test");
  assert.equal(payload.username, "admin");
  assert.equal(payload.sessionVersion, 3);
  assert.equal(parseSignedToken(`${token}tampered`), null);
});

test("cors allows only configured origins", () => {
  assert.equal(isOriginAllowed(""), true);
  assert.equal(isOriginAllowed("https://allowed.example"), true);
  assert.equal(isOriginAllowed("https://blocked.example"), false);
});

test("cors permits the current same-origin host even without a whitelist entry", () => {
  const req = mockReq();
  req.headers.origin = "http://127.0.0.1:3000";

  assert.equal(isRequestOriginAllowed(req), true);

  req.headers.origin = "https://blocked.example";
  assert.equal(isRequestOriginAllowed(req), false);
});

test("content security policy blocks framing and allows product images", () => {
  const policy = buildContentSecurityPolicy();

  assert.match(policy, /default-src 'self'/);
  assert.match(policy, /frame-ancestors 'none'/);
  assert.match(policy, /object-src 'none'/);
  assert.match(policy, /img-src 'self' https: data:/);
});

test("uploaded image validation checks file signatures", () => {
  const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);
  const jpg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00]);
  const gif = Buffer.from("GIF89a", "ascii");
  const webp = Buffer.concat([Buffer.from("RIFFxxxxWEBP", "ascii"), Buffer.from([0x00])]);
  const fake = Buffer.from("<script>alert(1)</script>", "utf8");

  assert.equal(detectImageExtension(png), ".png");
  assert.equal(detectImageExtension(jpg), ".jpg");
  assert.equal(detectImageExtension(gif), ".gif");
  assert.equal(detectImageExtension(webp), ".webp");
  assert.equal(detectImageExtension(fake), "");
  assert.equal(isAllowedUploadedImage(".png", png), true);
  assert.equal(isAllowedUploadedImage(".jpeg", jpg), true);
  assert.equal(isAllowedUploadedImage(".jpg", png), false);
  assert.equal(isAllowedUploadedImage(".png", fake), false);
});

test("failed login attempts are rate limited by ip and username", () => {
  const req = mockReq("203.0.113.10");
  const username = "admin";

  clearLoginAttempts(req, username);
  assert.equal(getLoginRateLimit(req, username).limited, false);

  recordFailedLogin(req, username);
  assert.equal(getLoginRateLimit(req, username).limited, false);

  recordFailedLogin(req, username);
  assert.equal(getLoginRateLimit(req, username).limited, true);

  clearLoginAttempts(req, username);
  assert.equal(getLoginRateLimit(req, username).limited, false);
});

test("brand import rows are normalized for dictionary storage", () => {
  const row = normalizeDictionaryImportRow(
    {
      code: "acme",
      name_en: "ACME",
      name_zh: "ACME CN",
      sort_order: "20",
    },
    "brands",
  );

  assert.deepEqual(row, {
    code: "acme",
    name_en: "ACME",
    name_zh: "ACME CN",
    sort_order: "20",
    type: "brands",
    status: "active",
  });
});

test("mysql record snapshots preserve store metadata and row order", () => {
  const vehicle = mysqlRecordSnapshot(
    "vehicles",
    {
      id: "veh_1",
      sku: "SKU-1",
      brand: "jac-commercial",
      model: "jac-test",
      year: "2026",
      condition: "New",
      vehicle_type: "light-truck",
      energy_type: "diesel",
      stock_status: "factory-order",
      currency: "CNY",
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-01-01T00:00:00.000Z",
    },
    7,
  );

  assert.equal(vehicle.recordId, "veh_1");
  assert.equal(vehicle.sku, "SKU-1");
  assert.equal(vehicle.code, null);
  assert.equal(vehicle.dictionaryType, null);
  assert.equal(vehicle.rowOrder, 7);
  assert.match(vehicle.payload, /SKU-1/);

  const dictionary = mysqlRecordSnapshot(
    "dictionaries",
    {
      id: "dict_1",
      type: "brands",
      code: "sinotruk",
      name_en: "Sinotruk",
      name_zh: "中国重汽",
    },
    2,
  );

  assert.equal(dictionary.recordId, "dict_1");
  assert.equal(dictionary.code, "sinotruk");
  assert.equal(dictionary.dictionaryType, "brands");
  assert.equal(dictionary.rowOrder, 2);
});

test("mysql incremental writer deletes only missing record ids", () => {
  const deletes = mysqlRecordIdsToDelete(
    ["veh_1", "veh_2", "veh_3"],
    [
      { recordId: "veh_3" },
      { recordId: "veh_1" },
      { recordId: "veh_4" },
    ],
  );

  assert.deepEqual(deletes, ["veh_2"]);
});

test("ai reception extracts contact and product keywords", () => {
  assert.equal(extractEmail("Please quote to buyer@example.com"), "buyer@example.com");
  assert.deepEqual(extractKeywordTokens("Brake pads OE 04465-0K340 for Toyota"), ["brake", "pads", "oe", "04465", "0k340", "for", "toyota"]);
});

test("ai reception reply keeps pricing under sales confirmation", () => {
  const reply = buildAiReply({
    locale: "en",
    email: "buyer@example.com",
    phone: "",
    messages: [{ role: "user", content: "Need price for brake pads to Chile" }],
    recommendations: [{ name: "Brake Pad Set", meta: "OE 04465-0K340" }],
  });

  assert.match(reply, /possible matches/);
  assert.match(reply, /Final pricing needs sales confirmation/);
  assert.match(reply, /sales confirmation/);
});

test("deepseek json replies are parsed and constrained", () => {
  const parsed = parseDeepSeekJsonReply(
    '{"reply":"Sales will confirm the latest stock.","intent":"part","missing_fields":["quantity"],"handoff_reason":"Needs latest stock check","confidence":1.4}',
  );

  assert.equal(parsed.reply, "Sales will confirm the latest stock.");
  assert.equal(parsed.intent, "part");
  assert.deepEqual(parsed.missing_fields, ["quantity"]);
  assert.equal(parsed.confidence, 1);
});

test("deepseek user prompt redacts contact details", () => {
  const prompt = buildDeepSeekUserPrompt({
    locale: "en",
    email: "buyer@example.com",
    phone: "+8613800138000",
    recommendations: [],
    messages: [{ role: "user", content: "Please quote buyer@example.com WhatsApp +8613800138000 for brake pads." }],
  });

  assert.doesNotMatch(prompt, /buyer@example\.com/);
  assert.doesNotMatch(prompt, /8613800138000/);
  assert.match(prompt, /\[email provided\]/);
  assert.match(prompt, /\[phone provided\]/);
});

test("deepseek reception uses json output and appends inquiry boundary", async () => {
  let capturedBody = null;
  const result = await callDeepSeekReception(
    {
      locale: "en",
      email: "buyer@example.com",
      phone: "",
      recommendations: [{ kind: "Auto Part", sku: "BP-1", name: "Brake Pad Set", meta: "OE 04465" }],
      messages: [{ role: "user", content: "Need price for brake pads buyer@example.com" }],
    },
    {
      apiKey: "test-key",
      fetchImpl: async (url, options) => {
        capturedBody = JSON.parse(options.body);
        return new Response(
          JSON.stringify({
            choices: [
              {
                message: {
                  content:
                    '{"reply":"I found a possible brake pad match. Sales will confirm stock and price.","intent":"part","missing_fields":[],"handoff_reason":"Sales must confirm latest stock","confidence":0.9}',
                },
              },
            ],
            usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      },
    },
  );

  assert.equal(result.ok, true);
  assert.equal(result.model, "deepseek-v4-flash");
  assert.equal(capturedBody.response_format.type, "json_object");
  assert.equal(capturedBody.thinking.type, "disabled");
  assert.match(result.result.reply, /does not support online ordering or payment/);
  assert.equal(result.usage.total_tokens, 30);
});

test("ai maintenance parser accepts safe upsert plans", () => {
  const plan = parseAiMaintenanceJsonPlan(
    '```json\n{"summary":"Add a category","warnings":[],"operations":[{"action":"upsert","type":"dictionaries","data":{"type":"part_categories","code":"gearbox","name_en":"Gearbox","name_zh":"变速箱","status":"active"},"reason":"Missing category"}]}\n```',
  );

  assert.equal(plan.summary, "Add a category");
  assert.equal(plan.operations.length, 1);
  assert.equal(plan.operations[0].action, "upsert");
});

test("ai maintenance preview rejects unsafe or unsupported operations", () => {
  const preview = previewAiMaintenanceOperation(
    {
      action: "delete",
      type: "adminUsers",
      data: { username: "admin" },
      reason: "Remove account",
    },
    {},
  );

  assert.equal(preview.valid, false);
  assert.match(preview.errors.join(" "), /Only upsert/);
  assert.match(preview.errors.join(" "), /not supported/);
});

test("ai maintenance preview validates dictionary upserts", () => {
  const preview = previewAiMaintenanceOperation(
    {
      action: "upsert",
      type: "dictionaries",
      data: {
        type: "part_categories",
        code: "gearbox",
        name_en: "Gearbox",
        name_zh: "变速箱",
        status: "active",
        sort_order: "10",
      },
      reason: "Add missing category",
    },
    { dictionaries: [] },
  );

  assert.equal(preview.valid, true);
  assert.equal(preview.mode, "create");
  assert.equal(preview.key, "part_categories:gearbox");
});

test("deepseek maintenance planner uses json output and safe prompt rules", async () => {
  let capturedBody = null;
  const result = await callDeepSeekMaintenancePlan(
    {
      instruction: "Add gearbox category",
      sourceText: "code,name_en,name_zh\ngearbox,Gearbox,变速箱",
      targetTypes: ["dictionaries"],
      context: { allowed_targets: ["dictionaries"] },
    },
    {
      apiKey: "test-key",
      fetchImpl: async (url, options) => {
        capturedBody = JSON.parse(options.body);
        return new Response(
          JSON.stringify({
            choices: [
              {
                message: {
                  content:
                    '{"summary":"Add gearbox category","warnings":[],"operations":[{"action":"upsert","type":"dictionaries","data":{"type":"part_categories","code":"gearbox","name_en":"Gearbox","name_zh":"变速箱","status":"active"},"reason":"Missing category"}]}',
                },
              },
            ],
            usage: { prompt_tokens: 12, completion_tokens: 18, total_tokens: 30 },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      },
    },
  );

  assert.equal(result.ok, true);
  assert.equal(result.plan.operations.length, 1);
  assert.equal(capturedBody.response_format.type, "json_object");
  assert.equal(capturedBody.thinking.type, "disabled");
  assert.match(buildAiMaintenanceSystemPrompt(), /Never generate delete/);
});

test("deepseek reception reports not configured without an api key", async () => {
  const result = await callDeepSeekReception(
    {
      locale: "en",
      email: "",
      phone: "",
      recommendations: [],
      messages: [{ role: "user", content: "Need brake pads" }],
    },
    { apiKey: "" },
  );

  assert.equal(result.ok, false);
  assert.equal(result.error, "not_configured");
});
