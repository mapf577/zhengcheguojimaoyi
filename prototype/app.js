const defaultVehicles = [
  {
    id: "veh-byd-song-plus",
    name: "BYD Song Plus EV",
    type: "EV",
    badge: "New Energy SUV",
    specs: ["2025", "LHD", "520 km range", "In stock"],
    price: "Ask for latest FOB",
    stock: "Ready export",
    media: "ev",
  },
  {
    id: "veh-geely-galaxy",
    name: "Geely Galaxy L7",
    type: "PHEV",
    badge: "PHEV Family SUV",
    specs: ["2025", "LHD", "Hybrid", "Batch supply"],
    price: "USD 15k - 19k",
    stock: "Factory order",
    media: "phev",
  },
  {
    id: "veh-toyota-corolla",
    name: "Toyota Corolla",
    type: "Used",
    badge: "Used Sedan",
    specs: ["2022", "LHD", "Gasoline", "Low mileage"],
    price: "Ask for inspection",
    stock: "Limited stock",
    media: "used",
  },
  {
    id: "veh-foton-truck",
    name: "Foton Light Truck",
    type: "Commercial",
    badge: "Commercial Truck",
    specs: ["Diesel", "3.5T", "LHD", "Fleet order"],
    price: "Project quote",
    stock: "Order slot",
    media: "truck",
  },
  {
    id: "veh-chery-tiggo",
    name: "Chery Tiggo 8 Pro",
    type: "Gasoline",
    badge: "Gasoline SUV",
    specs: ["2025", "LHD", "7 seats", "1.6T"],
    price: "USD 17k - 23k",
    stock: "In stock",
    media: "gasoline",
  },
  {
    id: "veh-maxus-v90",
    name: "Maxus V90 Van",
    type: "Commercial",
    badge: "Passenger Van",
    specs: ["Diesel", "9-15 seats", "LHD", "Export trim"],
    price: "Ask for latest CIF",
    stock: "Batch supply",
    media: "truck",
  },
];

const defaultParts = [
  {
    id: "part-brake-pad",
    name: "Ceramic Brake Pad Set",
    category: "Brake",
    oe: "OE 04465-0K340",
    fitment: "Toyota Hilux / Fortuner",
    moq: "MOQ 50 sets",
    lead: "7-12 days",
    mark: "BP",
  },
  {
    id: "part-oil-filter",
    name: "Engine Oil Filter",
    category: "Engine",
    oe: "OE 90915-YZZE1",
    fitment: "Toyota / Lexus models",
    moq: "MOQ 200 pcs",
    lead: "Ready stock",
    mark: "OF",
  },
  {
    id: "part-led-headlamp",
    name: "LED Headlamp Assembly",
    category: "Electrical",
    oe: "OEM fitment",
    fitment: "BYD / Chery / Geely",
    moq: "MOQ 20 pcs",
    lead: "10-15 days",
    mark: "HL",
  },
  {
    id: "part-bumper",
    name: "Front Bumper Cover",
    category: "Body",
    oe: "Model-specific",
    fitment: "SUV and sedan series",
    moq: "MOQ 30 pcs",
    lead: "15 days",
    mark: "FB",
  },
  {
    id: "part-shock",
    name: "Shock Absorber",
    category: "Chassis",
    oe: "OE 48510 series",
    fitment: "Pickup / SUV models",
    moq: "MOQ 80 pcs",
    lead: "Ready stock",
    mark: "SA",
  },
  {
    id: "part-sensor",
    name: "ABS Wheel Speed Sensor",
    category: "Electrical",
    oe: "OE 89542 series",
    fitment: "Japanese and Chinese brands",
    moq: "MOQ 100 pcs",
    lead: "7 days",
    mark: "AS",
  },
];

function getStoredRows(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function buildPrice(record) {
  const min = String(record.price_min || "").trim();
  const max = String(record.price_max || "").trim();
  const currency = String(record.currency || "USD").trim();

  if (min && max) {
    return `${currency} ${min} - ${max}`;
  }

  if (min) {
    return `From ${currency} ${min}`;
  }

  return "Ask for latest quote";
}

function getFirstImage(value) {
  const first = String(value || "")
    .split(";")
    .map((item) => item.trim())
    .find(Boolean);

  if (!first) {
    return "";
  }

  if (/^(https?:|data:|\.\/|\/)/i.test(first)) {
    return first;
  }

  return `./assets/${first}`;
}

function compact(values) {
  return values.filter((value) => String(value || "").trim()).map((value) => String(value).trim());
}

function mapImportedVehicle(record) {
  const condition = String(record.condition || "").trim();
  const vehicleType = String(record.vehicle_type || "").trim();
  const energy = String(record.energy_type || "").trim();
  const type =
    condition.toLowerCase() === "used" ? "Used" : vehicleType === "Commercial" ? "Commercial" : energy || vehicleType;

  return {
    id: record.sku,
    name: compact([record.brand, record.model, record.trim]).join(" "),
    type,
    badge: compact([condition, energy || vehicleType]).join(" "),
    specs: compact([
      record.year,
      record.steering,
      record.range_km ? `${record.range_km} km range` : "",
      record.engine_displacement,
      record.stock_status,
    ]).slice(0, 4),
    price: buildPrice(record),
    stock: record.stock_status || "Ask sales",
    media: type === "Commercial" ? "truck" : type === "Used" ? "used" : String(type || "ev").toLowerCase(),
    image: getFirstImage(record.images),
  };
}

function mapImportedPart(record) {
  const name = String(record.name || record.product_name || "").trim();
  const mark = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return {
    id: record.sku,
    name,
    category: record.category || "Other",
    oe: record.oe_numbers || record.part_number || "OE matching",
    fitment: compact([record.applicable_brand, record.applicable_model]).join(" / ") || "Model-specific",
    moq: record.moq || "Ask MOQ",
    lead: record.stock_status || (record.lead_time_days ? `${record.lead_time_days} days` : "Ask sales"),
    mark: mark || "AP",
    image: getFirstImage(record.images),
  };
}

function loadVehicles() {
  const imported = getStoredRows("zc_imported_vehicles");
  return imported.length ? imported.map(mapImportedVehicle) : defaultVehicles;
}

function loadParts() {
  const imported = getStoredRows("zc_imported_parts");
  return imported.length ? imported.map(mapImportedPart) : defaultParts;
}

async function loadApiData() {
  if (location.protocol === "file:") {
    return;
  }

  try {
    const [vehicleResponse, partResponse] = await Promise.all([fetch("/api/vehicles"), fetch("/api/parts")]);
    if (!vehicleResponse.ok || !partResponse.ok) {
      return;
    }

    const vehiclePayload = await vehicleResponse.json();
    const partPayload = await partResponse.json();
    const apiVehicles = Array.isArray(vehiclePayload.items) ? vehiclePayload.items.map(mapImportedVehicle) : [];
    const apiParts = Array.isArray(partPayload.items) ? partPayload.items.map(mapImportedPart) : [];

    if (apiVehicles.length) {
      vehicles = apiVehicles;
      renderVehicles();
    }

    if (apiParts.length) {
      parts = apiParts;
      renderParts();
    }
  } catch {
    // Keep local prototype data when the backend is not running.
  }
}

let vehicles = loadVehicles();
let parts = loadParts();
const inquiryItems = new Map();
let activeSearchTab = "vehicles";

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const vehicleGrid = document.querySelector("[data-vehicle-grid]");
const partGrid = document.querySelector("[data-part-grid]");
const inquiryDrawer = document.querySelector("[data-inquiry-drawer]");
const inquiryItemsEl = document.querySelector("[data-inquiry-items]");
const toast = document.querySelector("[data-toast]");
const searchForm = document.querySelector("[data-search-form]");
const vehicleField = document.querySelector("[data-vehicle-field]");
const partField = document.querySelector("[data-part-field]");
const primaryLabel = document.querySelector("[data-primary-label]");

function elevateHeader() {
  header.dataset.elevated = window.scrollY > 24 ? "true" : "false";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2600);
}

function makeVehicleCard(vehicle) {
  const card = document.createElement("article");
  card.className = "product-card";
  const imageStyle = vehicle.image ? `style="background-image: url('${vehicle.image.replace(/'/g, "%27")}')"` : "";
  card.innerHTML = `
    <div class="card-media ${vehicle.media} ${vehicle.image ? "has-image" : ""}" ${imageStyle}>
      <span>${vehicle.badge}</span>
    </div>
    <div class="product-body">
      <div>
        <h3>${vehicle.name}</h3>
        <div class="spec-list">
          ${vehicle.specs.map((spec) => `<span>${spec}</span>`).join("")}
        </div>
      </div>
      <div class="price-row">
        <strong>${vehicle.price}</strong>
        <span class="stock">${vehicle.stock}</span>
      </div>
      <div class="card-actions">
        <button class="ghost-button" type="button" data-open-inquiry>Details</button>
        <button class="solid-button" type="button" data-add-inquiry="${vehicle.id}" data-kind="Vehicle">Get Quote</button>
      </div>
    </div>
  `;
  return card;
}

function makePartCard(part) {
  const card = document.createElement("article");
  card.className = "part-card";
  const imageStyle = part.image ? `style="background-image: url('${part.image.replace(/'/g, "%27")}')"` : "";
  card.innerHTML = `
    <div class="part-visual ${part.image ? "has-image" : ""}" ${imageStyle}>${part.image ? "" : part.mark}</div>
    <div class="part-body">
      <div>
        <h3>${part.name}</h3>
        <div class="part-meta">
          <span>${part.oe}</span>
          <span>${part.fitment}</span>
          <span>${part.moq}</span>
          <span>${part.lead}</span>
        </div>
      </div>
      <button class="solid-button" type="button" data-add-inquiry="${part.id}" data-kind="Auto Part">Ask Quote</button>
    </div>
  `;
  return card;
}

function renderVehicles(filter = "all") {
  const filtered = filter === "all" ? vehicles : vehicles.filter((vehicle) => vehicle.type === filter);
  vehicleGrid.replaceChildren(...filtered.map(makeVehicleCard));
}

function renderParts(filter = "all") {
  const filtered = filter === "all" ? parts : parts.filter((part) => part.category === filter);
  partGrid.replaceChildren(...filtered.map(makePartCard));
}

function getProductById(id) {
  const vehicle = vehicles.find((item) => item.id === id);
  if (vehicle) {
    return { id, kind: "Vehicle", name: vehicle.name, meta: `${vehicle.type} | ${vehicle.stock}` };
  }

  const part = parts.find((item) => item.id === id);
  if (part) {
    return { id, kind: "Auto Part", name: part.name, meta: `${part.oe} | ${part.fitment}` };
  }

  return null;
}

function renderInquiryItems() {
  const items = [...inquiryItems.values()];
  if (!items.length) {
    inquiryItemsEl.innerHTML = '<div class="drawer-empty">No selected products yet.</div>';
    return;
  }

  inquiryItemsEl.replaceChildren(
    ...items.map((item) => {
      const el = document.createElement("div");
      el.className = "drawer-item";
      el.innerHTML = `
        <div>
          <strong>${item.name}</strong>
          <span>${item.kind} | ${item.meta}</span>
        </div>
        <button type="button" aria-label="Remove ${item.name}" data-remove-inquiry="${item.id}">x</button>
      `;
      return el;
    }),
  );
}

function openInquiry() {
  renderInquiryItems();
  inquiryDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
}

function closeInquiry() {
  inquiryDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("drawer-open");
}

async function submitInquiry(payload) {
  if (location.protocol === "file:") {
    return false;
  }

  try {
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        source_url: location.href,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

function setActiveChip(chip, selector) {
  document.querySelectorAll(selector).forEach((item) => item.classList.remove("active"));
  chip.classList.add("active");
}

function setSearchTab(tab) {
  activeSearchTab = tab;
  document.querySelectorAll("[data-search-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.searchTab === tab);
  });
  vehicleField.hidden = tab !== "vehicles";
  partField.hidden = tab !== "parts";
  primaryLabel.textContent = tab === "vehicles" ? "Brand or model" : "Part name";
}

document.addEventListener("click", (event) => {
  const target = event.target;

  const vehicleFilter = target.closest("[data-vehicle-filter]");
  if (vehicleFilter) {
    setActiveChip(vehicleFilter, "[data-vehicle-filter]");
    renderVehicles(vehicleFilter.dataset.vehicleFilter);
    return;
  }

  const partFilter = target.closest("[data-part-filter]");
  if (partFilter) {
    setActiveChip(partFilter, "[data-part-filter]");
    renderParts(partFilter.dataset.partFilter);
    return;
  }

  const searchTab = target.closest("[data-search-tab]");
  if (searchTab) {
    setSearchTab(searchTab.dataset.searchTab);
    return;
  }

  const addButton = target.closest("[data-add-inquiry]");
  if (addButton) {
    const product = getProductById(addButton.dataset.addInquiry);
    if (product) {
      inquiryItems.set(product.id, product);
      renderInquiryItems();
      showToast(`${product.name} added to inquiry.`);
    }
    return;
  }

  if (target.closest("[data-open-inquiry]")) {
    openInquiry();
    return;
  }

  if (target.closest("[data-close-inquiry]")) {
    closeInquiry();
    return;
  }

  const removeButton = target.closest("[data-remove-inquiry]");
  if (removeButton) {
    inquiryItems.delete(removeButton.dataset.removeInquiry);
    renderInquiryItems();
    return;
  }

  if (target === inquiryDrawer) {
    closeInquiry();
  }
});

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  header.classList.toggle("nav-active", !expanded);
  document.body.classList.toggle("nav-open", !expanded);
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    header.classList.remove("nav-active");
    document.body.classList.remove("nav-open");
  });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(searchForm);
  const keyword = String(data.get("keyword") || "").trim();
  const destination = String(data.get("destination") || "").trim();
  const target = activeSearchTab === "vehicles" ? "#vehicles" : "#parts";
  document.querySelector(target).scrollIntoView({ behavior: "smooth", block: "start" });
  showToast(
    keyword || destination
      ? `Showing ${activeSearchTab} matches for your request.`
      : `Showing available ${activeSearchTab}.`,
  );
});

document.querySelector("[data-contact-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const saved = await submitInquiry({
    name: data.get("name"),
    email: data.get("email"),
    country: data.get("country"),
    whatsapp: data.get("whatsapp"),
    message: data.get("message"),
    product_type: "General",
  });
  form.reset();
  showToast(saved ? "Inquiry submitted to the backend." : "Inquiry captured in the website prototype.");
});

document.querySelector("[data-drawer-form]").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const items = [...inquiryItems.values()];
  const saved = await submitInquiry({
    name: data.get("email"),
    email: data.get("email"),
    country: data.get("destination"),
    message: data.get("message") || `Selected products: ${items.map((item) => item.name).join(", ")}`,
    product_type: items.some((item) => item.kind === "Vehicle") && items.some((item) => item.kind === "Auto Part") ? "Mixed" : items[0]?.kind || "General",
    items,
  });
  form.reset();
  inquiryItems.clear();
  renderInquiryItems();
  closeInquiry();
  showToast(saved ? "Inquiry submitted to the backend." : "Inquiry submitted in the website prototype.");
});

window.addEventListener("scroll", elevateHeader, { passive: true });

renderVehicles();
renderParts();
renderInquiryItems();
elevateHeader();
loadApiData();
