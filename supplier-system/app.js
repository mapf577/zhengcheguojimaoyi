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

const state = {
  token: localStorage.getItem("supplier_token") || "",
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
  return row ? row.name_en || row.name_zh || row.code : code || "";
}

function renderSupplier() {
  document.querySelector("[data-supplier-name]").textContent = state.supplier?.company_name || "--";
  document.querySelector("[data-supplier-status]").textContent = state.supplier?.status || "--";
}

function statusPill(value) {
  const status = String(value || "draft").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `<span class="status-pill status-${escapeHtml(status)}">${escapeHtml(value || "draft")}</span>`;
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
  document.querySelector("[data-view-title]").textContent = schema.title;
  document.querySelector("[data-table-title]").textContent = schema.title;
  document.querySelectorAll("[data-product-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.productTab === state.type);
  });

  const head = document.querySelector("[data-products-head]");
  const body = document.querySelector("[data-products-body]");
  head.innerHTML = `
    <tr>
      ${schema.columns.map((column) => `<th>${escapeHtml(column.replace(/_/g, " "))}</th>`).join("")}
      <th>Actions</th>
    </tr>
  `;

  const rows = rowsForCurrentType();
  if (!rows.length) {
    body.innerHTML = `<tr><td colspan="${schema.columns.length + 1}">No products yet.</td></tr>`;
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
              <button class="secondary-button" type="button" data-edit="${escapeHtml(row.id)}">Edit</button>
              ${canSubmit ? `<button class="primary-button" type="button" data-submit="${escapeHtml(row.id)}">Submit</button>` : ""}
              <button class="danger-button" type="button" data-delete="${escapeHtml(row.id)}">Delete</button>
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
    options = dictionaryRows(field.dictionaryType).map((row) => [row.code, row.name_en || row.name_zh || row.code]);
  }
  const required = field.required ? "" : `<option value="">Optional</option>`;
  return `${required}${options
    .map(([optionValue, label]) => `<option value="${escapeHtml(optionValue)}" ${String(value || "") === String(optionValue) ? "selected" : ""}>${escapeHtml(label)}</option>`)
    .join("")}`;
}

function renderField(field, record) {
  const value = record[field.name] ?? "";
  const label = `${field.label}${field.required ? " *" : ""}`;
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
          <input name="${escapeHtml(field.name)}" value="${escapeHtml(value)}" placeholder="/uploads/image.jpg" />
          <button class="secondary-button" type="button" data-upload-image>Upload</button>
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
  document.querySelector("[data-form-title]").textContent = state.editingId ? `Edit ${schema.title}` : `New ${schema.title}`;
  document.querySelector("[data-form-mode]").textContent = next.review_status || "draft";
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
    showToast("Choose an image first.");
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
  showToast("Image uploaded.");
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
    showToast("Logged in.");
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
    showToast("Account created.");
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
      showToast("Data refreshed.");
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
      showToast("Submitted for review.");
    } catch (error) {
      showToast(error.message);
    }
    return;
  }

  const deleteButton = target.closest("[data-delete]");
  if (deleteButton) {
    if (!confirm("Delete this product?")) {
      return;
    }
    try {
      await api(`${productSchemas[state.type].api}/${deleteButton.dataset.delete}`, { method: "DELETE" });
      await refreshData();
      showToast("Product deleted.");
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
    showToast("Draft saved.");
  } catch (error) {
    showToast(error.message);
  }
});

async function boot() {
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
