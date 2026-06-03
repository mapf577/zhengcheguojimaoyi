const schemas = {
  vehicles: {
    label: "Vehicle",
    storageKey: "zc_imported_vehicles",
    template: "./data/vehicle-import-template.csv",
    sample: "./data/vehicle-import-sample.csv",
    required: [
      "sku",
      "brand",
      "model",
      "year",
      "condition",
      "vehicle_type",
      "energy_type",
      "stock_status",
      "currency",
    ],
    numeric: ["year", "seats", "range_km", "battery_kwh", "mileage", "price_min", "price_max"],
    preview: [
      "sku",
      "brand",
      "model",
      "year",
      "condition",
      "vehicle_type",
      "energy_type",
      "stock_status",
      "price_min",
      "price_max",
      "currency",
    ],
    manual: [
      { name: "sku", label: "SKU", required: true },
      { name: "brand", label: "Brand", required: true },
      { name: "model", label: "Model", required: true },
      { name: "year", label: "Year", required: true },
      { name: "trim", label: "Trim" },
      { name: "condition", label: "Condition", required: true },
      { name: "vehicle_type", label: "Vehicle Type", required: true },
      { name: "energy_type", label: "Energy Type", required: true },
      { name: "stock_status", label: "Stock Status", required: true },
      { name: "price_min", label: "Price Min" },
      { name: "price_max", label: "Price Max" },
      { name: "currency", label: "Currency", required: true },
      { name: "export_port", label: "Export Port" },
      { name: "images", label: "Image file or URL", wide: true },
      { name: "description_en", label: "English Description", wide: true },
    ],
  },
  parts: {
    label: "Auto Part",
    storageKey: "zc_imported_parts",
    template: "./data/parts-import-template.csv",
    sample: "./data/parts-import-sample.csv",
    required: ["sku", "category", "name", "oe_numbers", "moq", "stock_status", "currency"],
    numeric: ["lead_time_days", "price_min", "price_max"],
    preview: [
      "sku",
      "category",
      "brand",
      "name",
      "oe_numbers",
      "applicable_brand",
      "applicable_model",
      "moq",
      "stock_status",
      "price_min",
      "price_max",
      "currency",
    ],
    manual: [
      { name: "sku", label: "SKU", required: true },
      { name: "category", label: "Category", required: true },
      { name: "brand", label: "Brand" },
      { name: "name", label: "Product Name", required: true },
      { name: "oe_numbers", label: "OE/OEM Numbers", required: true },
      { name: "applicable_brand", label: "Applicable Brand" },
      { name: "applicable_model", label: "Applicable Model" },
      { name: "moq", label: "MOQ", required: true },
      { name: "stock_status", label: "Stock Status", required: true },
      { name: "lead_time_days", label: "Lead Time Days" },
      { name: "price_min", label: "Price Min" },
      { name: "price_max", label: "Price Max" },
      { name: "currency", label: "Currency", required: true },
      { name: "images", label: "Image file or URL", wide: true },
      { name: "description_en", label: "English Description", wide: true },
    ],
  },
};

let importType = "vehicles";
let currentRows = [];
let validRows = [];

const typeButtons = document.querySelectorAll("[data-import-type]");
const templateLink = document.querySelector("[data-template-link]");
const sampleLink = document.querySelector("[data-sample-link]");
const uploadLabel = document.querySelector("[data-upload-label]");
const uploadForm = document.querySelector("[data-upload-form]");
const saveButton = document.querySelector("[data-save-import]");
const clearButton = document.querySelector("[data-clear-import]");
const totalCount = document.querySelector("[data-total-count]");
const validCount = document.querySelector("[data-valid-count]");
const errorCount = document.querySelector("[data-error-count]");
const summary = document.querySelector("[data-import-summary]");
const previewHead = document.querySelector("[data-preview-head]");
const previewBody = document.querySelector("[data-preview-body]");
const manualForm = document.querySelector("[data-manual-form]");
const manualFields = document.querySelector("[data-manual-fields]");
const refreshSavedButton = document.querySelector("[data-refresh-saved]");
const exportSavedButton = document.querySelector("[data-export-saved]");
const savedSummary = document.querySelector("[data-saved-summary]");
const savedHead = document.querySelector("[data-saved-head]");
const savedBody = document.querySelector("[data-saved-body]");
const toast = document.querySelector("[data-toast]");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2600);
}

function normalizeHeader(value) {
  return String(value || "")
    .trim()
    .replace(/^\uFEFF/, "")
    .toLowerCase();
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
    return { headers: [], records: [] };
  }

  const headers = rows[0].map(normalizeHeader);
  const records = rows.slice(1).map((cells, index) => {
    const record = { __rowNumber: index + 2 };
    headers.forEach((header, headerIndex) => {
      record[header] = cells[headerIndex] || "";
    });
    return record;
  });

  return { headers, records };
}

function getSavedRows() {
  const schema = schemas[importType];
  try {
    const rows = JSON.parse(localStorage.getItem(schema.storageKey) || "[]");
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

function setSavedRows(rows) {
  const schema = schemas[importType];
  localStorage.setItem(schema.storageKey, JSON.stringify(rows));
}

function mergeBySku(existingRows, incomingRows) {
  const map = new Map();
  existingRows.forEach((row) => {
    if (row.sku) {
      map.set(String(row.sku).trim(), row);
    }
  });
  incomingRows.forEach((row) => {
    if (row.sku) {
      map.set(String(row.sku).trim(), row);
    }
  });
  return [...map.values()];
}

function isNumeric(value) {
  if (value === "" || value === null || value === undefined) {
    return true;
  }
  return Number.isFinite(Number(value));
}

function validateImport(headers, records) {
  const schema = schemas[importType];
  const missingHeaders = schema.required.filter((field) => !headers.includes(field));
  const seen = new Set();

  const rows = records.map((record) => {
    const errors = [];

    if (missingHeaders.length) {
      errors.push(`Missing headers: ${missingHeaders.join(", ")}`);
    }

    schema.required.forEach((field) => {
      if (!String(record[field] || "").trim()) {
        errors.push(`${field} is required`);
      }
    });

    schema.numeric.forEach((field) => {
      if (!isNumeric(record[field])) {
        errors.push(`${field} must be a number`);
      }
    });

    const sku = String(record.sku || "").trim();
    if (sku) {
      if (seen.has(sku)) {
        errors.push("sku is duplicated in this file");
      }
      seen.add(sku);
    }

    return {
      ...record,
      __errors: errors,
      __valid: errors.length === 0,
    };
  });

  return rows;
}

function renderCounts(rows) {
  const valid = rows.filter((row) => row.__valid);
  totalCount.textContent = String(rows.length);
  validCount.textContent = String(valid.length);
  errorCount.textContent = String(rows.length - valid.length);
}

function renderSummary(rows) {
  summary.classList.remove("success", "warning");

  if (!rows.length) {
    summary.textContent = "No product rows found. Check that the file contains a header row and product data.";
    summary.classList.add("warning");
    return;
  }

  const invalidRows = rows.filter((row) => !row.__valid);
  if (invalidRows.length) {
    summary.textContent = `${invalidRows.length} row(s) need correction. Valid rows can still be saved.`;
    summary.classList.add("warning");
    return;
  }

  summary.textContent = "All rows passed validation and are ready to save.";
  summary.classList.add("success");
}

function renderPreview(rows) {
  const schema = schemas[importType];
  const columns = ["status", "errors", ...schema.preview];
  previewHead.innerHTML = `
    <tr>
      ${columns.map((column) => `<th>${column}</th>`).join("")}
    </tr>
  `;

  if (!rows.length) {
    previewBody.innerHTML = "<tr><td colspan='20'>No rows to preview.</td></tr>";
    return;
  }

  previewBody.innerHTML = rows
    .map((row) => {
      const status = row.__valid ? "Valid" : "Error";
      const errors = row.__errors.length ? row.__errors.join("; ") : "-";
      return `
        <tr class="${row.__valid ? "" : "invalid"}">
          <td>${status}</td>
          <td class="error-cell">${errors}</td>
          ${schema.preview.map((field) => `<td>${row[field] || ""}</td>`).join("")}
        </tr>
      `;
    })
    .join("");
}

function escapeCsv(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function downloadCsv(filename, rows) {
  const schema = schemas[importType];
  const columns = [...new Set([...schema.preview, ...schema.required, ...schema.manual.map((field) => field.name)])];
  const csv = [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => escapeCsv(row[column] || "")).join(",")),
  ].join("\n");
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

function renderManualFields() {
  const schema = schemas[importType];
  manualFields.innerHTML = schema.manual
    .map((field) => {
      const required = field.required ? "required" : "";
      const wide = field.wide ? "wide" : "";
      const input =
        field.name === "description_en"
          ? `<textarea name="${field.name}" rows="3" ${required}></textarea>`
          : `<input name="${field.name}" type="text" ${required} />`;
      return `
        <label class="${wide}">
          <span>${field.label}${field.required ? " *" : ""}</span>
          ${input}
        </label>
      `;
    })
    .join("");
}

function renderSavedRows() {
  const schema = schemas[importType];
  const rows = getSavedRows();
  const columns = ["actions", ...schema.preview];

  savedSummary.classList.remove("success", "warning");
  savedSummary.textContent = rows.length
    ? `${rows.length} saved ${schema.label.toLowerCase()} row(s). Rows with the same SKU are updated on import.`
    : `No saved ${schema.label.toLowerCase()} rows yet.`;
  savedSummary.classList.toggle("success", rows.length > 0);

  savedHead.innerHTML = `
    <tr>
      ${columns.map((column) => `<th>${column}</th>`).join("")}
    </tr>
  `;

  if (!rows.length) {
    savedBody.innerHTML = "<tr><td colspan='20'>No saved data yet.</td></tr>";
    return;
  }

  savedBody.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td>
            <button class="row-action" type="button" data-delete-saved="${row.sku}">Delete</button>
          </td>
          ${schema.preview.map((field) => `<td>${row[field] || ""}</td>`).join("")}
        </tr>
      `,
    )
    .join("");
}

function resetPreview(message = "Upload a CSV file to preview validation results.") {
  currentRows = [];
  validRows = [];
  totalCount.textContent = "0";
  validCount.textContent = "0";
  errorCount.textContent = "0";
  summary.classList.remove("success", "warning");
  summary.textContent = message;
  previewHead.innerHTML = "";
  previewBody.innerHTML = "<tr><td>No uploaded data yet.</td></tr>";
  saveButton.disabled = true;
}

function updateImportType(type) {
  importType = type;
  const schema = schemas[type];
  typeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.importType === type);
  });
  templateLink.href = schema.template;
  sampleLink.href = schema.sample;
  templateLink.textContent = `Download ${schema.label} Template`;
  sampleLink.textContent = `Download ${schema.label} Sample`;
  uploadLabel.textContent = `${schema.label} CSV file`;
  uploadForm.reset();
  manualForm.reset();
  renderManualFields();
  renderSavedRows();
  resetPreview();
}

function saveImport() {
  const schema = schemas[importType];
  const rowsToSave = validRows.map(({ __errors, __rowNumber, __valid, ...record }) => record);
  const merged = mergeBySku(getSavedRows(), rowsToSave);
  setSavedRows(merged);
  renderSavedRows();
  showToast(`${rowsToSave.length} ${schema.label.toLowerCase()} row(s) saved or updated.`);
}

typeButtons.forEach((button) => {
  button.addEventListener("click", () => updateImportType(button.dataset.importType));
});

uploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const file = event.currentTarget.elements.file.files[0];
  if (!file) {
    showToast("Choose a CSV file first.");
    return;
  }

  const text = await file.text();
  const parsed = parseCsv(text);
  currentRows = validateImport(parsed.headers, parsed.records);
  validRows = currentRows.filter((row) => row.__valid);
  renderCounts(currentRows);
  renderSummary(currentRows);
  renderPreview(currentRows);
  saveButton.disabled = validRows.length === 0;
});

saveButton.addEventListener("click", saveImport);

manualForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const schema = schemas[importType];
  const data = new FormData(manualForm);
  const record = {};
  schema.manual.forEach((field) => {
    record[field.name] = String(data.get(field.name) || "").trim();
  });

  const validated = validateImport(Object.keys(record), [record])[0];
  if (!validated.__valid) {
    showToast(validated.__errors.join("; "));
    return;
  }

  const { __errors, __rowNumber, __valid, ...clean } = validated;
  setSavedRows(mergeBySku(getSavedRows(), [clean]));
  manualForm.reset();
  renderSavedRows();
  showToast(`${schema.label} saved.`);
});

refreshSavedButton.addEventListener("click", () => {
  renderSavedRows();
  showToast("Saved data refreshed.");
});

exportSavedButton.addEventListener("click", () => {
  const schema = schemas[importType];
  const rows = getSavedRows();
  if (!rows.length) {
    showToast("No saved rows to export.");
    return;
  }
  downloadCsv(`${importType}-export.csv`, rows);
  showToast(`${schema.label} CSV exported.`);
});

savedBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-saved]");
  if (!button) {
    return;
  }
  const sku = button.dataset.deleteSaved;
  const rows = getSavedRows().filter((row) => String(row.sku || "").trim() !== sku);
  setSavedRows(rows);
  renderSavedRows();
  showToast("Row deleted.");
});

clearButton.addEventListener("click", () => {
  const schema = schemas[importType];
  localStorage.removeItem(schema.storageKey);
  renderSavedRows();
  resetPreview(`${schema.label} data cleared from this browser prototype.`);
  showToast(`${schema.label} saved data cleared.`);
});

updateImportType(importType);
