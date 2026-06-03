const schemas = {
  vehicles: {
    title: "Vehicles",
    api: "/api/vehicles",
    importApi: "/api/import/vehicles",
    columns: ["sku", "brand", "model", "year", "condition", "vehicle_type", "energy_type", "stock_status", "price_min", "price_max", "currency"],
    fields: [
      { name: "sku", label: "SKU", required: true },
      { name: "brand", label: "Brand", required: true },
      { name: "model", label: "Model", required: true },
      { name: "title_en", label: "English Title" },
      { name: "title_zh", label: "Chinese Title" },
      { name: "year", label: "Year", required: true },
      { name: "trim", label: "Trim" },
      { name: "condition", label: "Condition", required: true },
      { name: "vehicle_type", label: "Vehicle Type", required: true },
      { name: "energy_type", label: "Energy Type", required: true },
      { name: "steering", label: "Steering" },
      { name: "seats", label: "Seats" },
      { name: "transmission", label: "Transmission" },
      { name: "drive_type", label: "Drive Type" },
      { name: "range_km", label: "Range KM" },
      { name: "battery_kwh", label: "Battery KWH" },
      { name: "engine_displacement", label: "Engine Displacement" },
      { name: "mileage", label: "Mileage" },
      { name: "color", label: "Color" },
      { name: "stock_status", label: "Stock Status", required: true },
      { name: "price_min", label: "Price Min" },
      { name: "price_max", label: "Price Max" },
      { name: "currency", label: "Currency", required: true },
      { name: "export_port", label: "Export Port" },
      { name: "images", label: "Images", type: "image" },
      { name: "description_en", label: "English Description", type: "textarea" },
      { name: "description_zh", label: "Chinese Description", type: "textarea" },
    ],
  },
  parts: {
    title: "Auto Parts",
    api: "/api/parts",
    importApi: "/api/import/parts",
    columns: ["sku", "category", "brand", "name", "oe_numbers", "applicable_brand", "applicable_model", "moq", "stock_status", "price_min", "price_max", "currency"],
    fields: [
      { name: "sku", label: "SKU", required: true },
      { name: "category", label: "Category", required: true },
      { name: "brand", label: "Brand" },
      { name: "name", label: "Product Name", required: true },
      { name: "title_en", label: "English Title" },
      { name: "title_zh", label: "Chinese Title" },
      { name: "oe_numbers", label: "OE/OEM Numbers", required: true },
      { name: "part_number", label: "Part Number" },
      { name: "applicable_brand", label: "Applicable Brand" },
      { name: "applicable_model", label: "Applicable Model" },
      { name: "applicable_year", label: "Applicable Year" },
      { name: "moq", label: "MOQ", required: true },
      { name: "stock_status", label: "Stock Status", required: true },
      { name: "lead_time_days", label: "Lead Time Days" },
      { name: "unit_weight", label: "Unit Weight" },
      { name: "package_size", label: "Package Size" },
      { name: "price_min", label: "Price Min" },
      { name: "price_max", label: "Price Max" },
      { name: "currency", label: "Currency", required: true },
      { name: "images", label: "Images", type: "image" },
      { name: "description_en", label: "English Description", type: "textarea" },
      { name: "description_zh", label: "Chinese Description", type: "textarea" },
    ],
  },
};

const adminTranslations = {
  en: {
    "meta.title": "Admin Console | AutoGlobal Export",
    "brand.admin": "Admin",
    "login.console": "Management Console",
    "login.title": "Admin Login",
    "login.username": "Username",
    "login.password": "Password",
    "login.submit": "Login",
    "nav.dashboard": "Dashboard",
    "nav.vehicles": "Vehicles",
    "nav.parts": "Auto Parts",
    "nav.inquiries": "Inquiries",
    "workspace.eyebrow": "Backend management",
    "action.logout": "Logout",
    "action.openWebsite": "Open Website",
    "action.refresh": "Refresh",
    "action.new": "New",
    "action.edit": "Edit",
    "action.delete": "Delete",
    "action.email": "Email",
    "action.importCsv": "Import CSV",
    "action.exportCsv": "Export CSV",
    "action.saveVehicle": "Save Vehicle",
    "action.savePart": "Save Auto Part",
    "action.uploadImage": "Upload Image",
    "dashboard.next": "Next Steps",
    "dashboard.task1": "Add or import the first batch of export-ready vehicles.",
    "dashboard.task2": "Upload product images from the management forms.",
    "dashboard.task3": "Open the website to verify product cards and inquiry forms.",
    "vehicles.data": "Vehicle Data",
    "parts.data": "Auto Parts Data",
    "inquiries.title": "Customer Inquiries",
    "table.status": "Status",
    "table.name": "Name",
    "table.email": "Email",
    "table.country": "Country",
    "table.message": "Message",
    "table.created": "Created",
    "table.actions": "Actions",
    "empty.vehicles": "No vehicles yet.",
    "empty.parts": "No auto parts yet.",
    "empty.inquiries": "No inquiries yet.",
    "singular.vehicle": "Vehicle",
    "singular.part": "Auto Part",
    "toast.chooseImage": "Choose an image first.",
    "toast.imageUploaded": "Image uploaded.",
    "toast.loggedIn": "Logged in.",
    "toast.refreshed": "Data refreshed.",
    "toast.loaded": "Record loaded for editing.",
    "toast.deleted": "Record deleted.",
    "toast.saved": "{item} saved.",
    "toast.imported": "{saved} row(s) imported. {rejected} rejected.",
    "toast.inquiryUpdated": "Inquiry status updated.",
    "confirm.delete": "Delete {name}?",
    "placeholder.image": "/uploads/image.jpg or external URL",
  },
  zh: {
    "meta.title": "后台管理 | AutoGlobal Export",
    "brand.admin": "后台",
    "login.console": "管理控制台",
    "login.title": "管理员登录",
    "login.username": "用户名",
    "login.password": "密码",
    "login.submit": "登录",
    "nav.dashboard": "仪表盘",
    "nav.vehicles": "整车管理",
    "nav.parts": "零配件管理",
    "nav.inquiries": "询盘管理",
    "workspace.eyebrow": "后台管理",
    "action.logout": "退出登录",
    "action.openWebsite": "打开官网",
    "action.refresh": "刷新",
    "action.new": "新增",
    "action.edit": "编辑",
    "action.delete": "删除",
    "action.email": "发邮件",
    "action.importCsv": "导入 CSV",
    "action.exportCsv": "导出 CSV",
    "action.saveVehicle": "保存整车",
    "action.savePart": "保存零配件",
    "action.uploadImage": "上传图片",
    "dashboard.next": "下一步",
    "dashboard.task1": "新增或导入第一批可出口整车。",
    "dashboard.task2": "在管理表单中上传产品图片。",
    "dashboard.task3": "打开官网检查产品卡片和询盘表单。",
    "vehicles.data": "整车数据",
    "parts.data": "零配件数据",
    "inquiries.title": "客户询盘",
    "table.status": "状态",
    "table.name": "姓名",
    "table.email": "邮箱",
    "table.country": "国家",
    "table.message": "留言",
    "table.created": "创建时间",
    "table.actions": "操作",
    "empty.vehicles": "暂无整车数据。",
    "empty.parts": "暂无零配件数据。",
    "empty.inquiries": "暂无询盘。",
    "singular.vehicle": "整车",
    "singular.part": "零配件",
    "toast.chooseImage": "请先选择图片。",
    "toast.imageUploaded": "图片已上传。",
    "toast.loggedIn": "已登录。",
    "toast.refreshed": "数据已刷新。",
    "toast.loaded": "数据已载入编辑表单。",
    "toast.deleted": "数据已删除。",
    "toast.saved": "{item}已保存。",
    "toast.imported": "已导入 {saved} 行，拒绝 {rejected} 行。",
    "toast.inquiryUpdated": "询盘状态已更新。",
    "confirm.delete": "确认删除 {name}？",
    "placeholder.image": "/uploads/image.jpg 或外部图片 URL",
  },
};

const fieldTranslations = {
  en: {},
  zh: {
    SKU: "SKU",
    Brand: "品牌",
    Model: "车型",
    Year: "年份",
    Trim: "配置",
    Condition: "车况",
    "Vehicle Type": "车辆类型",
    "Energy Type": "能源类型",
    Steering: "方向盘",
    Seats: "座位数",
    Transmission: "变速箱",
    "Drive Type": "驱动方式",
    "Range KM": "续航 KM",
    "Battery KWH": "电池 KWH",
    "Engine Displacement": "发动机排量",
    Mileage: "里程",
    Color: "颜色",
    "Stock Status": "库存状态",
    "Price Min": "最低价",
    "Price Max": "最高价",
    Currency: "币种",
    "Export Port": "出口港",
    Images: "图片",
    "English Description": "英文描述",
    "English Title": "英文标题",
    "Chinese Title": "中文标题",
    "Chinese Description": "中文描述",
    Category: "分类",
    "Product Name": "产品名称",
    "OE/OEM Numbers": "OE/OEM 编号",
    "Part Number": "配件编号",
    "Applicable Brand": "适配品牌",
    "Applicable Model": "适配车型",
    "Applicable Year": "适配年份",
    MOQ: "最小起订量",
    "Lead Time Days": "交期天数",
    "Unit Weight": "单件重量",
    "Package Size": "包装尺寸",
  },
};

const columnTranslations = {
  en: {},
  zh: {
    sku: "SKU",
    brand: "品牌",
    model: "车型",
    year: "年份",
    condition: "车况",
    vehicle_type: "车辆类型",
    energy_type: "能源类型",
    stock_status: "库存状态",
    price_min: "最低价",
    price_max: "最高价",
    currency: "币种",
    category: "分类",
    name: "名称",
    oe_numbers: "OE 编号",
    applicable_brand: "适配品牌",
    applicable_model: "适配车型",
    moq: "MOQ",
  },
};

const state = {
  token: localStorage.getItem("admin_token") || "",
  lang: localStorage.getItem("admin_lang") === "zh" ? "zh" : "en",
  view: "dashboard",
  editing: {
    vehicles: null,
    parts: null,
  },
  data: {
    vehicles: [],
    parts: [],
    inquiries: [],
  },
};

const loginScreen = document.querySelector("[data-login-screen]");
const adminApp = document.querySelector("[data-admin-app]");
const loginForm = document.querySelector("[data-login-form]");
const toast = document.querySelector("[data-toast]");
const pageTitle = document.querySelector("[data-page-title]");

function t(key, values = {}) {
  let text = adminTranslations[state.lang][key] || adminTranslations.en[key] || key;
  Object.entries(values).forEach(([name, value]) => {
    text = text.replace(`{${name}}`, value);
  });
  return text;
}

function fieldLabel(label) {
  return fieldTranslations[state.lang][label] || label;
}

function columnLabel(column) {
  return columnTranslations[state.lang][column] || column;
}

function singularLabel(type) {
  return type === "vehicles" ? t("singular.vehicle") : t("singular.part");
}

function statusText(status) {
  if (state.lang !== "zh") {
    return status;
  }
  return (
    {
      New: "新询盘",
      Contacted: "已联系",
      Quoted: "已报价",
      Negotiating: "洽谈中",
      Won: "已成交",
      Lost: "已丢失",
      Invalid: "无效",
    }[status] || status
  );
}

function applyLanguage() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.title = t("meta.title");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelector("[data-lang-toggle]").textContent = state.lang === "zh" ? "English" : "中文";
  switchView(state.view);
  renderFields("vehicles", state.editing.vehicles ? findRecord("vehicles", state.editing.vehicles) || {} : {});
  renderFields("parts", state.editing.parts ? findRecord("parts", state.editing.parts) || {} : {});
  renderTable("vehicles");
  renderTable("parts");
  renderInquiries();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2800);
}

async function api(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (state.token) {
    headers.Authorization = `Bearer ${state.token}`;
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok && response.status !== 207) {
    if (response.status === 401) {
      logout();
    }
    throw new Error(payload.error || (payload.errors ? payload.errors.join("; ") : "Request failed"));
  }

  return payload;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function setAuthenticated(token) {
  state.token = token;
  localStorage.setItem("admin_token", token);
  loginScreen.hidden = true;
  adminApp.hidden = false;
}

function logout() {
  state.token = "";
  localStorage.removeItem("admin_token");
  loginScreen.hidden = false;
  adminApp.hidden = true;
}

function switchView(view) {
  state.view = view;
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.viewPanel !== view;
  });
  pageTitle.textContent =
    view === "dashboard"
      ? t("nav.dashboard")
      : view === "vehicles"
        ? t("nav.vehicles")
        : view === "parts"
          ? t("nav.parts")
          : t("nav.inquiries");
}

function renderMetrics() {
  document.querySelector("[data-metric-vehicles]").textContent = String(state.data.vehicles.length);
  document.querySelector("[data-metric-parts]").textContent = String(state.data.parts.length);
  document.querySelector("[data-metric-inquiries]").textContent = String(state.data.inquiries.length);
}

function renderFields(type, record = {}) {
  const fieldsRoot = document.querySelector(`[data-fields="${type}"]`);
  const schema = schemas[type];

  fieldsRoot.innerHTML = schema.fields
    .map((field) => {
      const required = field.required ? "required" : "";
      const value = escapeHtml(record[field.name] || "");

      if (field.type === "textarea") {
        return `
          <label class="field-wide">
            <span>${fieldLabel(field.label)}${field.required ? " *" : ""}</span>
            <textarea name="${field.name}" rows="3" ${required}>${value}</textarea>
          </label>
        `;
      }

      if (field.type === "image") {
        return `
          <div class="image-field">
            <label>
              <span>${fieldLabel(field.label)}</span>
              <input name="${field.name}" type="text" value="${value}" placeholder="${t("placeholder.image")}" />
            </label>
            <div class="image-field-row">
              <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-image-file />
              <button class="secondary-button" type="button" data-upload-image>${t("action.uploadImage")}</button>
            </div>
          </div>
        `;
      }

      return `
        <label>
          <span>${fieldLabel(field.label)}${field.required ? " *" : ""}</span>
          <input name="${field.name}" type="text" value="${value}" ${required} />
        </label>
      `;
    })
    .join("");

  const editorTitle = document.querySelector(`[data-view-panel="${type}"] [data-editor-title]`);
  editorTitle.textContent = record.id ? `${t("action.edit")} ${singularLabel(type)}` : `${t("action.new")} ${singularLabel(type)}`;
}

function renderTable(type) {
  const schema = schemas[type];
  const head = document.querySelector(`[data-table-head="${type}"]`);
  const body = document.querySelector(`[data-table-body="${type}"]`);

  head.innerHTML = `
    <tr>
      ${schema.columns.map((column) => `<th>${columnLabel(column)}</th>`).join("")}
      <th>${t("table.actions")}</th>
    </tr>
  `;

  if (!state.data[type].length) {
    body.innerHTML = `<tr><td colspan="${schema.columns.length + 1}">${t(type === "vehicles" ? "empty.vehicles" : "empty.parts")}</td></tr>`;
    return;
  }

  body.innerHTML = state.data[type]
    .map(
      (row) => `
        <tr>
          ${schema.columns.map((column) => `<td>${escapeHtml(row[column] || "")}</td>`).join("")}
          <td>
            <div class="row-actions">
              <button class="secondary-button" type="button" data-edit="${type}" data-id="${row.id}">${t("action.edit")}</button>
              <button class="danger-button" type="button" data-delete="${type}" data-id="${row.id}">${t("action.delete")}</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");
}

function renderInquiries() {
  const body = document.querySelector("[data-inquiries-body]");
  if (!state.data.inquiries.length) {
    body.innerHTML = `<tr><td colspan="7">${t("empty.inquiries")}</td></tr>`;
    return;
  }

  body.innerHTML = state.data.inquiries
    .map(
      (row) => `
        <tr>
          <td>
            <select class="status-select" data-inquiry-status="${row.id}">
              ${["New", "Contacted", "Quoted", "Negotiating", "Won", "Lost", "Invalid"]
                .map((status) => `<option value="${status}" ${row.status === status ? "selected" : ""}>${statusText(status)}</option>`)
                .join("")}
            </select>
          </td>
          <td>${escapeHtml(row.name || "")}</td>
          <td>${escapeHtml(row.email || "")}</td>
          <td>${escapeHtml(row.country || "")}</td>
          <td>${escapeHtml(row.message || "")}</td>
          <td>${escapeHtml((row.created_at || "").slice(0, 19).replace("T", " "))}</td>
          <td>
            <a class="secondary-button" href="mailto:${escapeHtml(row.email || "")}">${t("action.email")}</a>
          </td>
        </tr>
      `,
    )
    .join("");
}

async function refreshData() {
  const [vehicles, parts, inquiries] = await Promise.all([
    api("/api/vehicles"),
    api("/api/parts"),
    api("/api/inquiries"),
  ]);
  state.data.vehicles = vehicles.items || [];
  state.data.parts = parts.items || [];
  state.data.inquiries = inquiries.items || [];
  renderMetrics();
  renderTable("vehicles");
  renderTable("parts");
  renderInquiries();
}

function collectForm(type, form) {
  const data = new FormData(form);
  const record = {};
  schemas[type].fields.forEach((field) => {
    record[field.name] = String(data.get(field.name) || "").trim();
  });
  return record;
}

function resetForm(type) {
  state.editing[type] = null;
  document.querySelector(`[data-record-form="${type}"]`).reset();
  renderFields(type);
}

function findRecord(type, id) {
  return state.data[type].find((row) => row.id === id);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  const input = String(text || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        value += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        value += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(value.trim());
      value = "";
    } else if (char === "\n") {
      row.push(value.trim());
      value = "";
      if (row.some((cell) => cell !== "")) {
        rows.push(row);
      }
      row = [];
    } else {
      value += char;
    }
  }

  row.push(value.trim());
  if (row.some((cell) => cell !== "")) {
    rows.push(row);
  }

  if (!rows.length) {
    return [];
  }

  const headers = rows[0].map((header) =>
    String(header || "")
      .trim()
      .replace(/^\uFEFF/, "")
      .toLowerCase(),
  );

  return rows.slice(1).map((cells) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = cells[index] || "";
    });
    return record;
  });
}

function escapeCsv(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function downloadCsv(filename, rows, columns) {
  const csv = [columns.join(","), ...rows.map((row) => columns.map((column) => escapeCsv(row[column] || "")).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadImage(button) {
  const wrapper = button.closest(".image-field");
  const fileInput = wrapper.querySelector("[data-image-file]");
  const imageInput = wrapper.querySelector('input[name="images"]');
  const file = fileInput.files[0];
  if (!file) {
    showToast(t("toast.chooseImage"));
    return;
  }
  const data = await readFileAsDataUrl(file);
  const result = await api("/api/uploads", {
    method: "POST",
    body: JSON.stringify({
      filename: file.name,
      data,
    }),
  });
  imageInput.value = result.url;
  showToast(t("toast.imageUploaded"));
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(loginForm);
  try {
    const result = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: data.get("username"),
        password: data.get("password"),
      }),
    });
    setAuthenticated(result.token);
    await refreshData();
    showToast(t("toast.loggedIn"));
  } catch (error) {
    showToast(error.message);
  }
});

document.addEventListener("click", async (event) => {
  const target = event.target;

  const viewButton = target.closest("[data-view]");
  if (viewButton) {
    switchView(viewButton.dataset.view);
    return;
  }

  if (target.closest("[data-logout]")) {
    logout();
    return;
  }

  if (target.closest("[data-lang-toggle]")) {
    state.lang = state.lang === "zh" ? "en" : "zh";
    localStorage.setItem("admin_lang", state.lang);
    applyLanguage();
    return;
  }

  if (target.closest("[data-refresh]")) {
    await refreshData();
    showToast(t("toast.refreshed"));
    return;
  }

  const resetButton = target.closest("[data-reset-form]");
  if (resetButton) {
    const panel = resetButton.closest("[data-view-panel]");
    resetForm(panel.dataset.viewPanel);
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
    const type = editButton.dataset.edit;
    const record = findRecord(type, editButton.dataset.id);
    if (record) {
      state.editing[type] = record.id;
      renderFields(type, record);
      showToast(t("toast.loaded"));
    }
    return;
  }

  const deleteButton = target.closest("[data-delete]");
  if (deleteButton) {
    const type = deleteButton.dataset.delete;
    const record = findRecord(type, deleteButton.dataset.id);
    if (!record || !confirm(t("confirm.delete", { name: record.sku || record.name || record.model }))) {
      return;
    }
    try {
      await api(`${schemas[type].api}/${record.id}`, { method: "DELETE" });
      await refreshData();
      resetForm(type);
      showToast(t("toast.deleted"));
    } catch (error) {
      showToast(error.message);
    }
    return;
  }

  const exportButton = target.closest("[data-export]");
  if (exportButton) {
    const type = exportButton.dataset.export;
    downloadCsv(`${type}.csv`, state.data[type], schemas[type].columns);
  }
});

document.querySelectorAll("[data-record-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const type = form.dataset.recordForm;
    const editingId = state.editing[type];
    const record = collectForm(type, form);

    try {
      await api(editingId ? `${schemas[type].api}/${editingId}` : schemas[type].api, {
        method: editingId ? "PUT" : "POST",
        body: JSON.stringify(record),
      });
      await refreshData();
      resetForm(type);
      showToast(t("toast.saved", { item: singularLabel(type) }));
    } catch (error) {
      showToast(error.message);
    }
  });
});

document.querySelectorAll("[data-import-file]").forEach((input) => {
  input.addEventListener("change", async () => {
    const type = input.dataset.importFile;
    const file = input.files[0];
    if (!file) {
      return;
    }
    try {
      const rows = parseCsv(await file.text());
      const result = await api(schemas[type].importApi, {
        method: "POST",
        body: JSON.stringify({ rows }),
      });
      await refreshData();
      input.value = "";
      showToast(t("toast.imported", { saved: result.saved.length, rejected: result.rejected.length }));
    } catch (error) {
      showToast(error.message);
    }
  });
});

document.querySelector("[data-inquiries-body]").addEventListener("change", async (event) => {
  const select = event.target.closest("[data-inquiry-status]");
  if (!select) {
    return;
  }
  const id = select.dataset.inquiryStatus;
  try {
    await api(`/api/inquiries/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: select.value }),
    });
    await refreshData();
    showToast(t("toast.inquiryUpdated"));
  } catch (error) {
    showToast(error.message);
  }
});

function boot() {
  renderFields("vehicles");
  renderFields("parts");
  applyLanguage();
  switchView("dashboard");

  if (state.token) {
    setAuthenticated(state.token);
    refreshData().catch((error) => {
      showToast(error.message);
      logout();
    });
  }
}

boot();
