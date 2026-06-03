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
    ],
  },
};

const state = {
  token: localStorage.getItem("admin_token") || "",
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
  pageTitle.textContent = view === "parts" ? "Auto Parts" : view[0].toUpperCase() + view.slice(1);
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
            <span>${field.label}${field.required ? " *" : ""}</span>
            <textarea name="${field.name}" rows="3" ${required}>${value}</textarea>
          </label>
        `;
      }

      if (field.type === "image") {
        return `
          <div class="image-field">
            <label>
              <span>${field.label}</span>
              <input name="${field.name}" type="text" value="${value}" placeholder="/uploads/image.jpg or external URL" />
            </label>
            <div class="image-field-row">
              <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-image-file />
              <button class="secondary-button" type="button" data-upload-image>Upload Image</button>
            </div>
          </div>
        `;
      }

      return `
        <label>
          <span>${field.label}${field.required ? " *" : ""}</span>
          <input name="${field.name}" type="text" value="${value}" ${required} />
        </label>
      `;
    })
    .join("");

  const editorTitle = document.querySelector(`[data-view-panel="${type}"] [data-editor-title]`);
  editorTitle.textContent = record.id ? `Edit ${schema.title.slice(0, -1)}` : `New ${schema.title.slice(0, -1)}`;
}

function renderTable(type) {
  const schema = schemas[type];
  const head = document.querySelector(`[data-table-head="${type}"]`);
  const body = document.querySelector(`[data-table-body="${type}"]`);

  head.innerHTML = `
    <tr>
      ${schema.columns.map((column) => `<th>${column}</th>`).join("")}
      <th>Actions</th>
    </tr>
  `;

  if (!state.data[type].length) {
    body.innerHTML = `<tr><td colspan="${schema.columns.length + 1}">No ${schema.title.toLowerCase()} yet.</td></tr>`;
    return;
  }

  body.innerHTML = state.data[type]
    .map(
      (row) => `
        <tr>
          ${schema.columns.map((column) => `<td>${escapeHtml(row[column] || "")}</td>`).join("")}
          <td>
            <div class="row-actions">
              <button class="secondary-button" type="button" data-edit="${type}" data-id="${row.id}">Edit</button>
              <button class="danger-button" type="button" data-delete="${type}" data-id="${row.id}">Delete</button>
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
    body.innerHTML = "<tr><td colspan='7'>No inquiries yet.</td></tr>";
    return;
  }

  body.innerHTML = state.data.inquiries
    .map(
      (row) => `
        <tr>
          <td>
            <select class="status-select" data-inquiry-status="${row.id}">
              ${["New", "Contacted", "Quoted", "Negotiating", "Won", "Lost", "Invalid"]
                .map((status) => `<option ${row.status === status ? "selected" : ""}>${status}</option>`)
                .join("")}
            </select>
          </td>
          <td>${escapeHtml(row.name || "")}</td>
          <td>${escapeHtml(row.email || "")}</td>
          <td>${escapeHtml(row.country || "")}</td>
          <td>${escapeHtml(row.message || "")}</td>
          <td>${escapeHtml((row.created_at || "").slice(0, 19).replace("T", " "))}</td>
          <td>
            <a class="secondary-button" href="mailto:${escapeHtml(row.email || "")}">Email</a>
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
    showToast("Choose an image first.");
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
  showToast("Image uploaded.");
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
    showToast("Logged in.");
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

  if (target.closest("[data-refresh]")) {
    await refreshData();
    showToast("Data refreshed.");
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
      showToast("Record loaded for editing.");
    }
    return;
  }

  const deleteButton = target.closest("[data-delete]");
  if (deleteButton) {
    const type = deleteButton.dataset.delete;
    const record = findRecord(type, deleteButton.dataset.id);
    if (!record || !confirm(`Delete ${record.sku || record.name || record.model}?`)) {
      return;
    }
    try {
      await api(`${schemas[type].api}/${record.id}`, { method: "DELETE" });
      await refreshData();
      resetForm(type);
      showToast("Record deleted.");
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
      showToast(`${schemas[type].title.slice(0, -1)} saved.`);
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
      showToast(`${result.saved.length} row(s) imported. ${result.rejected.length} rejected.`);
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
    showToast("Inquiry status updated.");
  } catch (error) {
    showToast(error.message);
  }
});

function boot() {
  renderFields("vehicles");
  renderFields("parts");
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
