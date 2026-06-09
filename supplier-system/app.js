const productSchemas = {
  vehicles: {
    title: "Vehicles",
    api: "/api/supplier/vehicles",
    columns: ["sku", "brand", "model", "year", "condition", "stock_status", "review_status", "publish_status", "updated_at"],
    fields: [
      { name: "sku", label: "SKU", required: true },
      { name: "brand", label: "Brand", required: true, dictionaryType: "brands" },
      { name: "model", label: "Model", required: true, dictionaryType: "models" },
      { name: "title_en", label: "English Title" },
      { name: "title_zh", label: "Chinese Title" },
      { name: "year", label: "Year", required: true },
      { name: "trim", label: "Trim" },
      { name: "condition", label: "Condition", required: true, options: [["new", "New"], ["used", "Used"]] },
      { name: "vehicle_type", label: "Vehicle Type", required: true, dictionaryType: "vehicle_types" },
      { name: "energy_type", label: "Energy Type", required: true, dictionaryType: "energy_types" },
      { name: "steering", label: "Steering" },
      { name: "seats", label: "Seats" },
      { name: "transmission", label: "Transmission" },
      { name: "drive_type", label: "Drive Type" },
      { name: "mileage", label: "Mileage" },
      { name: "color", label: "Color", dictionaryType: "colors" },
      { name: "stock_status", label: "Stock Status", required: true, dictionaryType: "stock_statuses" },
      { name: "price_min", label: "Price Min" },
      { name: "price_max", label: "Price Max" },
      { name: "currency", label: "Currency", required: true, dictionaryType: "currencies" },
      { name: "export_port", label: "Export Port", dictionaryType: "export_ports" },
      { name: "images", label: "Image", type: "image" },
      { name: "description_en", label: "English Description", type: "textarea" },
      { name: "description_zh", label: "Chinese Description", type: "textarea" },
    ],
  },
  parts: {
    title: "Auto Parts",
    api: "/api/supplier/parts",
    columns: ["sku", "category", "name", "oe_numbers", "stock_status", "review_status", "publish_status", "updated_at"],
    fields: [
      { name: "sku", label: "SKU", required: true },
      { name: "category", label: "Category", required: true, dictionaryType: "part_categories" },
      { name: "brand", label: "Brand", dictionaryType: "brands" },
      { name: "name", label: "Product Name", required: true },
      { name: "title_en", label: "English Title" },
      { name: "title_zh", label: "Chinese Title" },
      { name: "oe_numbers", label: "OE/OEM Numbers", required: true },
      { name: "part_number", label: "Part Number" },
      { name: "applicable_brand", label: "Applicable Brand", dictionaryType: "brands" },
      { name: "applicable_model", label: "Applicable Model" },
      { name: "applicable_year", label: "Applicable Year" },
      { name: "moq", label: "MOQ", required: true },
      { name: "stock_status", label: "Stock Status", required: true, dictionaryType: "stock_statuses" },
      { name: "lead_time_days", label: "Lead Time Days" },
      { name: "price_min", label: "Price Min" },
      { name: "price_max", label: "Price Max" },
      { name: "currency", label: "Currency", required: true, dictionaryType: "currencies" },
      { name: "images", label: "Image", type: "image" },
      { name: "description_en", label: "English Description", type: "textarea" },
      { name: "description_zh", label: "Chinese Description", type: "textarea" },
    ],
  },
};

const defaultValues = {
  vehicles: {
    condition: "new",
    stock_status: "factory-order",
    currency: "CNY",
  },
  parts: {
    stock_status: "factory-order",
    currency: "CNY",
  },
};

const translations = {
  en: {
    "page.title": "Supplier Portal | GlobalThreads",
    "auth.access": "Supplier access",
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.username": "Username",
    "auth.password": "Password",
    "auth.companyName": "Company Name",
    "auth.contactName": "Contact Name",
    "auth.email": "Email",
    "auth.phone": "Phone / WhatsApp",
    "auth.country": "Country",
    "auth.createAccount": "Create Account",
    "auth.logout": "Logout",
    "supplier.label": "Supplier",
    "supplier.status.pending": "Pending",
    "supplier.status.active": "Active",
    "supplier.status.suspended": "Suspended",
    "supplier.status.disabled": "Disabled",
    "workspace.kicker": "Supplier Workspace",
    "products.vehicles": "Vehicles",
    "products.parts": "Auto Parts",
    "metrics.productStatus": "Product status",
    "search.placeholder": "Search SKU, name, model...",
    "drawer.product": "Product",
    "drawer.edit": "Edit {title}",
    "drawer.new": "New {title}",
    "actions.refresh": "Refresh",
    "actions.newProduct": "New Product",
    "actions.close": "Close",
    "actions.cancel": "Cancel",
    "actions.saveDraft": "Save Draft",
    "actions.actions": "Actions",
    "actions.edit": "Edit",
    "actions.submit": "Submit",
    "actions.delete": "Delete",
    "actions.upload": "Upload",
    "actions.optional": "Optional",
    "status.draft": "Draft",
    "status.submitted": "Submitted",
    "status.approved": "Approved",
    "status.rejected": "Rejected",
    "status.published": "Published",
    "status.unpublished": "Unpublished",
    "status.archived": "Archived",
    "empty.products": "No products yet.",
    "toast.chooseImage": "Choose an image first.",
    "toast.imageUploaded": "Image uploaded.",
    "toast.loggedIn": "Logged in.",
    "toast.accountCreated": "Account created.",
    "toast.dataRefreshed": "Data refreshed.",
    "toast.submitted": "Submitted for review.",
    "toast.deleted": "Product deleted.",
    "toast.saved": "Draft saved.",
    "confirm.delete": "Delete this product?",
    "image.placeholder": "/uploads/image.jpg",
    "lang.toggle": "中文",
  },
  zh: {
    "page.title": "供应商后台 | GlobalThreads",
    "auth.access": "供应商入口",
    "auth.login": "登录",
    "auth.register": "注册",
    "auth.username": "用户名",
    "auth.password": "密码",
    "auth.companyName": "公司名称",
    "auth.contactName": "联系人",
    "auth.email": "邮箱",
    "auth.phone": "电话 / WhatsApp",
    "auth.country": "国家",
    "auth.createAccount": "创建账号",
    "auth.logout": "退出登录",
    "supplier.label": "供应商",
    "supplier.status.pending": "待审核",
    "supplier.status.active": "已启用",
    "supplier.status.suspended": "已停用",
    "supplier.status.disabled": "已禁用",
    "workspace.kicker": "供应商工作台",
    "products.vehicles": "整车产品",
    "products.parts": "汽车配件",
    "metrics.productStatus": "产品状态",
    "search.placeholder": "搜索 SKU、名称、车型...",
    "drawer.product": "产品",
    "drawer.edit": "编辑{title}",
    "drawer.new": "新增{title}",
    "actions.refresh": "刷新",
    "actions.newProduct": "新增产品",
    "actions.close": "关闭",
    "actions.cancel": "取消",
    "actions.saveDraft": "保存草稿",
    "actions.actions": "操作",
    "actions.edit": "编辑",
    "actions.submit": "提交审核",
    "actions.delete": "删除",
    "actions.upload": "上传",
    "actions.optional": "选填",
    "status.draft": "草稿",
    "status.submitted": "已提交",
    "status.approved": "已通过",
    "status.rejected": "已驳回",
    "status.published": "已发布",
    "status.unpublished": "未发布",
    "status.archived": "已归档",
    "empty.products": "暂无产品。",
    "toast.chooseImage": "请先选择图片。",
    "toast.imageUploaded": "图片已上传。",
    "toast.loggedIn": "已登录。",
    "toast.accountCreated": "账号已创建。",
    "toast.dataRefreshed": "数据已刷新。",
    "toast.submitted": "已提交审核。",
    "toast.deleted": "产品已删除。",
    "toast.saved": "草稿已保存。",
    "confirm.delete": "确认删除这个产品？",
    "image.placeholder": "/uploads/image.jpg",
    "lang.toggle": "English",
  },
};

const fieldLabels = {
  SKU: { zh: "SKU" },
  Brand: { zh: "品牌" },
  Model: { zh: "车型" },
  "English Title": { zh: "英文标题" },
  "Chinese Title": { zh: "中文标题" },
  Year: { zh: "年份" },
  Trim: { zh: "配置" },
  Condition: { zh: "车况" },
  "Vehicle Type": { zh: "车辆类型" },
  "Energy Type": { zh: "能源类型" },
  Steering: { zh: "方向盘" },
  Seats: { zh: "座位数" },
  Transmission: { zh: "变速箱" },
  "Drive Type": { zh: "驱动形式" },
  Mileage: { zh: "里程" },
  Color: { zh: "颜色" },
  "Stock Status": { zh: "库存状态" },
  "Price Min": { zh: "最低价格" },
  "Price Max": { zh: "最高价格" },
  Currency: { zh: "币种" },
  "Export Port": { zh: "出口港" },
  Image: { zh: "图片" },
  "English Description": { zh: "英文描述" },
  "Chinese Description": { zh: "中文描述" },
  Category: { zh: "分类" },
  "Product Name": { zh: "产品名称" },
  "OE/OEM Numbers": { zh: "OE/OEM 编号" },
  "Part Number": { zh: "配件编号" },
  "Applicable Brand": { zh: "适用品牌" },
  "Applicable Model": { zh: "适用车型" },
  "Applicable Year": { zh: "适用年份" },
  MOQ: { zh: "最小起订量" },
  "Lead Time Days": { zh: "交期天数" },
};

const optionLabels = {
  New: { zh: "新车" },
  Used: { zh: "二手" },
};

const columnLabels = {
  sku: { en: "SKU", zh: "SKU" },
  brand: { en: "Brand", zh: "品牌" },
  model: { en: "Model", zh: "车型" },
  year: { en: "Year", zh: "年份" },
  condition: { en: "Condition", zh: "车况" },
  stock_status: { en: "Stock Status", zh: "库存状态" },
  review_status: { en: "Review Status", zh: "审核状态" },
  publish_status: { en: "Publish Status", zh: "发布状态" },
  updated_at: { en: "Updated At", zh: "更新时间" },
  category: { en: "Category", zh: "分类" },
  name: { en: "Name", zh: "名称" },
  oe_numbers: { en: "OE/OEM Numbers", zh: "OE/OEM 编号" },
};

const state = {
  token: localStorage.getItem("supplier_token") || "",
  lang: localStorage.getItem("supplier_lang") === "zh" ? "zh" : "en",
  supplier: null,
  user: null,
  type: "vehicles",
  editingId: "",
  query: "",
  data: {
    vehicles: [],
    parts: [],
    dictionaries: [],
  },
};

const authScreen = document.querySelector("[data-auth-screen]");
const supplierApp = document.querySelector("[data-supplier-app]");
const loginForm = document.querySelector("[data-login-form]");
const registerForm = document.querySelector("[data-register-form]");
const drawer = document.querySelector("[data-drawer]");
const productForm = document.querySelector("[data-product-form]");
const formFields = document.querySelector("[data-form-fields]");
const toast = document.querySelector("[data-toast]");

function t(key, values = {}) {
  const template = translations[state.lang]?.[key] || translations.en[key] || key;
  return template.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}

function translateLookup(map, value) {
  return map[value]?.[state.lang] || value;
}

function productTitle(type = state.type) {
  return t(type === "parts" ? "products.parts" : "products.vehicles");
}

function translateStatus(value) {
  const status = String(value || "draft").toLowerCase();
  return translations[state.lang]?.[`status.${status}`] || value || t("status.draft");
}

function applyLanguage() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.title = t("page.title");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
    button.textContent = t("lang.toggle");
  });
  renderSupplier();
  renderTable();
  if (drawer.getAttribute("aria-hidden") === "false") {
    const record = state.editingId ? (state.data[state.type] || []).find((row) => row.id === state.editingId) || {} : {};
    openDrawer(record);
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("visible"), 2600);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function api(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (state.token) {
    headers.Authorization = `Bearer ${state.token}`;
  }
  const response = await fetch(path, { ...options, headers });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};
  if (!response.ok) {
    if (response.status === 401) {
      logout();
    }
    throw new Error(payload.error || (payload.errors ? payload.errors.join("; ") : "Request failed"));
  }
  return payload;
}

function setAuthenticated(token, payload) {
  state.token = token || state.token;
  state.supplier = payload.supplier || null;
  state.user = payload.user || null;
  localStorage.setItem("supplier_token", state.token);
  authScreen.hidden = true;
  supplierApp.hidden = false;
  renderSupplier();
}

function logout() {
  state.token = "";
  state.supplier = null;
  state.user = null;
  localStorage.removeItem("supplier_token");
  authScreen.hidden = false;
  supplierApp.hidden = true;
}

function dictionaryRows(type) {
  return (state.data.dictionaries || [])
    .filter((row) => row.type === type && row.status !== "disabled")
    .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));
}

function dictionaryLabel(type, code) {
  const row = dictionaryRows(type).find((item) => item.code === code);
  if (!row) {
    return code || "";
  }
  return state.lang === "zh" ? row.name_zh || row.name_en || row.code : row.name_en || row.name_zh || row.code;
}

function renderSupplier() {
  document.querySelector("[data-supplier-name]").textContent = state.supplier?.company_name || "--";
  const status = state.supplier?.status || "";
  const statusKey = `supplier.status.${status}`;
  document.querySelector("[data-supplier-status]").textContent = status ? translations[state.lang]?.[statusKey] || status : "--";
}

function statusPill(value) {
  const status = String(value || "draft").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `<span class="status-pill status-${escapeHtml(status)}">${escapeHtml(translateStatus(value))}</span>`;
}

function formatCell(row, column) {
  if (column === "updated_at") {
    return String(row.updated_at || "").slice(0, 19).replace("T", " ");
  }
  if (column === "brand") {
    return dictionaryLabel("brands", row.brand);
  }
  if (column === "model") {
    return dictionaryLabel("models", row.model);
  }
  if (column === "category") {
    return dictionaryLabel("part_categories", row.category);
  }
  if (column === "stock_status") {
    return dictionaryLabel("stock_statuses", row.stock_status);
  }
  if (column === "condition") {
    return translateLookup(optionLabels, row.condition === "new" ? "New" : row.condition === "used" ? "Used" : row.condition);
  }
  return row[column] || "";
}

function rowsForCurrentType() {
  const query = state.query.trim().toLowerCase();
  const rows = state.data[state.type] || [];
  if (!query) {
    return rows;
  }
  return rows.filter((row) =>
    [row.sku, row.brand, row.model, row.name, row.title_en, row.title_zh, row.oe_numbers]
      .some((value) => String(value || "").toLowerCase().includes(query)),
  );
}

function renderCounts() {
  const rows = state.data[state.type] || [];
  ["draft", "submitted", "approved", "rejected"].forEach((status) => {
    const node = document.querySelector(`[data-count="${status}"]`);
    if (node) {
      node.textContent = rows.filter((row) => (row.review_status || "draft") === status).length;
    }
  });
}

function renderTable() {
  const schema = productSchemas[state.type];
  const title = productTitle();
  document.querySelector("[data-view-title]").textContent = title;
  document.querySelector("[data-table-title]").textContent = title;
  document.querySelectorAll("[data-product-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.productTab === state.type);
  });

  const head = document.querySelector("[data-products-head]");
  const body = document.querySelector("[data-products-body]");
  head.innerHTML = `
    <tr>
      ${schema.columns.map((column) => `<th>${escapeHtml(columnLabels[column]?.[state.lang] || column.replace(/_/g, " "))}</th>`).join("")}
      <th>${escapeHtml(t("actions.actions"))}</th>
    </tr>
  `;

  const rows = rowsForCurrentType();
  if (!rows.length) {
    body.innerHTML = `<tr><td colspan="${schema.columns.length + 1}">${escapeHtml(t("empty.products"))}</td></tr>`;
    renderCounts();
    return;
  }

  body.innerHTML = rows
    .map((row) => {
      const canSubmit = ["draft", "rejected"].includes(row.review_status || "draft");
      return `
        <tr>
          ${schema.columns
            .map((column) =>
              ["review_status", "publish_status"].includes(column)
                ? `<td>${statusPill(row[column])}</td>`
                : `<td>${escapeHtml(formatCell(row, column))}</td>`,
            )
            .join("")}
          <td>
            <div class="row-actions">
              <button class="secondary-button" type="button" data-edit="${escapeHtml(row.id)}">${escapeHtml(t("actions.edit"))}</button>
              ${canSubmit ? `<button class="primary-button" type="button" data-submit="${escapeHtml(row.id)}">${escapeHtml(t("actions.submit"))}</button>` : ""}
              <button class="danger-button" type="button" data-delete="${escapeHtml(row.id)}">${escapeHtml(t("actions.delete"))}</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
  renderCounts();
}

function optionList(field, value) {
  let options = field.options || [];
  if (field.dictionaryType) {
    options = dictionaryRows(field.dictionaryType).map((row) => [row.code, state.lang === "zh" ? row.name_zh || row.name_en || row.code : row.name_en || row.name_zh || row.code]);
  } else {
    options = options.map(([optionValue, label]) => [optionValue, translateLookup(optionLabels, label)]);
  }
  const required = field.required ? "" : `<option value="">${escapeHtml(t("actions.optional"))}</option>`;
  return `${required}${options
    .map(([optionValue, label]) => `<option value="${escapeHtml(optionValue)}" ${String(value || "") === String(optionValue) ? "selected" : ""}>${escapeHtml(label)}</option>`)
    .join("")}`;
}

function renderField(field, record) {
  const value = record[field.name] ?? "";
  const label = `${translateLookup(fieldLabels, field.label)}${field.required ? " *" : ""}`;
  const fullClass = field.type === "textarea" || field.type === "image" ? "full" : "";
  if (field.type === "textarea") {
    return `
      <label class="${fullClass}">
        <span>${escapeHtml(label)}</span>
        <textarea name="${escapeHtml(field.name)}">${escapeHtml(value)}</textarea>
      </label>
    `;
  }
  if (field.type === "image") {
    return `
      <label class="${fullClass}">
          <span>${escapeHtml(label)}</span>
          <div class="image-row">
          <input name="${escapeHtml(field.name)}" value="${escapeHtml(value)}" placeholder="${escapeHtml(t("image.placeholder"))}" />
          <button class="secondary-button" type="button" data-upload-image>${escapeHtml(t("actions.upload"))}</button>
        </div>
        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-image-file />
      </label>
    `;
  }
  if (field.options || field.dictionaryType) {
    return `
      <label class="${fullClass}">
        <span>${escapeHtml(label)}</span>
        <select name="${escapeHtml(field.name)}" ${field.required ? "required" : ""}>${optionList(field, value)}</select>
      </label>
    `;
  }
  return `
    <label class="${fullClass}">
      <span>${escapeHtml(label)}</span>
      <input name="${escapeHtml(field.name)}" value="${escapeHtml(value)}" ${field.required ? "required" : ""} />
    </label>
  `;
}

function openDrawer(record = {}) {
  const schema = productSchemas[state.type];
  state.editingId = record.id || "";
  const next = { ...defaultValues[state.type], ...record };
  const title = productTitle();
  document.querySelector("[data-form-title]").textContent = state.editingId ? t("drawer.edit", { title }) : t("drawer.new", { title });
  document.querySelector("[data-form-mode]").textContent = translateStatus(next.review_status || "draft");
  formFields.innerHTML = schema.fields.map((field) => renderField(field, next)).join("");
  drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  state.editingId = "";
  productForm.reset();
  drawer.setAttribute("aria-hidden", "true");
}

function collectProductForm() {
  const data = new FormData(productForm);
  const record = {};
  productSchemas[state.type].fields.forEach((field) => {
    record[field.name] = String(data.get(field.name) || "").trim();
  });
  return record;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadImage(button) {
  const label = button.closest("label");
  const file = label.querySelector("[data-image-file]").files[0];
  if (!file) {
    showToast(t("toast.chooseImage"));
    return;
  }
  const result = await api("/api/supplier/uploads", {
    method: "POST",
    body: JSON.stringify({
      filename: file.name,
      data: await readFileAsDataUrl(file),
    }),
  });
  label.querySelector('input[name="images"]').value = result.url;
  showToast(t("toast.imageUploaded"));
}

async function refreshData() {
  const [vehicles, parts, dictionaries] = await Promise.all([
    api("/api/supplier/vehicles"),
    api("/api/supplier/parts"),
    api("/api/dictionaries"),
  ]);
  state.data.vehicles = vehicles.items || [];
  state.data.parts = parts.items || [];
  state.data.dictionaries = dictionaries.items || [];
  renderTable();
}

document.querySelectorAll("[data-auth-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const tab = button.dataset.authTab;
    document.querySelectorAll("[data-auth-tab]").forEach((node) => node.classList.toggle("active", node === button));
    loginForm.hidden = tab !== "login";
    registerForm.hidden = tab !== "register";
  });
});

document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    state.lang = state.lang === "zh" ? "en" : "zh";
    localStorage.setItem("supplier_lang", state.lang);
    applyLanguage();
  });
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(loginForm);
  try {
    const result = await api("/api/supplier/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: data.get("username"),
        password: data.get("password"),
      }),
    });
    setAuthenticated(result.token, result);
    await refreshData();
    showToast(t("toast.loggedIn"));
  } catch (error) {
    showToast(error.message);
  }
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(registerForm).entries());
  try {
    const result = await api("/api/supplier/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setAuthenticated(result.token, result);
    await refreshData();
    showToast(t("toast.accountCreated"));
  } catch (error) {
    showToast(error.message);
  }
});

document.addEventListener("click", async (event) => {
  const target = event.target;
  const tab = target.closest("[data-product-tab]");
  if (tab) {
    state.type = tab.dataset.productTab;
    state.query = "";
    document.querySelector("[data-search]").value = "";
    renderTable();
    return;
  }

  if (target.closest("[data-logout]")) {
    logout();
    return;
  }

  if (target.closest("[data-refresh]")) {
    try {
      await refreshData();
      showToast(t("toast.dataRefreshed"));
    } catch (error) {
      showToast(error.message);
    }
    return;
  }

  if (target.closest("[data-new-product]")) {
    openDrawer();
    return;
  }

  if (target.closest("[data-close-drawer]")) {
    closeDrawer();
    return;
  }

  const uploadButton = target.closest("[data-upload-image]");
  if (uploadButton) {
    try {
      await uploadImage(uploadButton);
    } catch (error) {
      showToast(error.message);
    }
    return;
  }

  const editButton = target.closest("[data-edit]");
  if (editButton) {
    const record = (state.data[state.type] || []).find((row) => row.id === editButton.dataset.edit);
    if (record) {
      openDrawer(record);
    }
    return;
  }

  const submitButton = target.closest("[data-submit]");
  if (submitButton) {
    try {
      await api(`${productSchemas[state.type].api}/${submitButton.dataset.submit}/submit`, { method: "POST" });
      await refreshData();
      showToast(t("toast.submitted"));
    } catch (error) {
      showToast(error.message);
    }
    return;
  }

  const deleteButton = target.closest("[data-delete]");
  if (deleteButton) {
    if (!confirm(t("confirm.delete"))) {
      return;
    }
    try {
      await api(`${productSchemas[state.type].api}/${deleteButton.dataset.delete}`, { method: "DELETE" });
      await refreshData();
      showToast(t("toast.deleted"));
    } catch (error) {
      showToast(error.message);
    }
  }
});

document.querySelector("[data-search]").addEventListener("input", (event) => {
  state.query = event.target.value;
  renderTable();
});

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const record = collectProductForm();
  try {
    await api(state.editingId ? `${productSchemas[state.type].api}/${state.editingId}` : productSchemas[state.type].api, {
      method: state.editingId ? "PUT" : "POST",
      body: JSON.stringify(record),
    });
    closeDrawer();
    await refreshData();
    showToast(t("toast.saved"));
  } catch (error) {
    showToast(error.message);
  }
});

async function boot() {
  applyLanguage();
  if (!state.token) {
    logout();
    return;
  }
  try {
    const session = await api("/api/supplier/session");
    setAuthenticated(state.token, session);
    await refreshData();
  } catch {
    logout();
  }
}

boot();
