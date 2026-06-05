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

const siteTranslations = {
  en: {
    "meta.title": "GlobalThreads | Vehicle & Auto Parts Supply",
    "nav.vehicles": "Vehicles",
    "nav.parts": "Auto Parts",
    "nav.export": "Export Service",
    "nav.cases": "Cases",
    "nav.contact": "Contact",
    "nav.admin": "Data Admin",
    "action.inquiry": "Inquiry",
    "action.search": "Search",
    "action.details": "Details",
    "action.getQuote": "Get Quote",
    "action.askQuote": "Ask Quote",
    "hero.eyebrow": "For overseas dealers, importers, and fleet buyers",
    "hero.title": "Vehicle Export & Auto Parts Supply",
    "hero.copy": "New energy vehicles, fuel cars, commercial vehicles, and OEM spare parts shipped from China to global markets.",
    "hero.browse": "Browse Vehicles",
    "hero.findParts": "Find Auto Parts",
    "search.brandModel": "Brand or model",
    "search.partName": "Part name",
    "search.keywordPlaceholder": "BYD, Toyota, pickup...",
    "search.energy": "Energy",
    "search.any": "Any",
    "search.oe": "OE number",
    "search.oePlaceholder": "Enter OE / OEM number",
    "search.destination": "Destination",
    "search.destinationPlaceholder": "Country or port",
    "vehicles.eyebrow": "Export-ready inventory",
    "vehicles.title": "Featured Vehicles",
    "parts.eyebrow": "OE/OEM matching",
    "parts.title": "Auto Parts Categories",
    "export.eyebrow": "Export workflow",
    "export.title": "From Inquiry To Delivery",
    "export.start": "Start Inquiry",
    "process.inquiry": "Inquiry",
    "process.inquiryText": "Collect vehicle model, OE number, quantity, destination, and trade term.",
    "process.quote": "Quotation",
    "process.quoteText": "Confirm FOB, CIF, CFR, or EXW pricing with validity and lead time.",
    "process.inspection": "Inspection",
    "process.inspectionText": "Prepare photos, specification sheets, inspection records, and export files.",
    "process.shipping": "Shipping",
    "process.shippingText": "Arrange customs clearance, port delivery, container loading, and documents.",
    "proof.eyebrow": "Supply capability",
    "proof.title": "Built For B2B Vehicle Trade",
    "proof.copy": "The platform is designed for dealers who need reliable vehicle sourcing, correct spare part matching, and fast quote follow-up.",
    "metrics.brands": "Vehicle brands",
    "metrics.skus": "Parts SKUs",
    "metrics.markets": "Export markets",
    "metrics.quoteTarget": "Quote target",
    "contact.eyebrow": "Contact sales",
    "contact.title": "Request A Latest Export Quote",
    "contact.copy": "Share your target model, OE number, quantity, country, and destination port. A sales manager can reply with the latest supply plan.",
    "form.name": "Name",
    "form.email": "Email",
    "form.country": "Country",
    "form.message": "Message",
    "form.send": "Send Inquiry",
    "drawer.eyebrow": "Inquiry list",
    "drawer.title": "Selected Products",
    "drawer.email": "Your email",
    "drawer.destinationPlaceholder": "Country / port",
    "drawer.messagePlaceholder": "Quantity, trade term, configuration, OE number...",
    "drawer.submit": "Submit Inquiry",
    "drawer.empty": "No selected products yet.",
    "detail.eyebrow": "Product detail",
    "detail.specifications": "Specifications",
    "detail.descriptionFallback": "No detailed description has been added yet.",
    "detail.addInquiry": "Add To Inquiry",
    "detail.contact": "Contact Sales",
    "detail.vehicleType": "Vehicle Type",
    "detail.energyType": "Energy Type",
    "detail.year": "Year",
    "detail.steering": "Steering",
    "detail.stockStatus": "Stock Status",
    "detail.price": "Price",
    "detail.exportPort": "Export Port",
    "detail.oeNumber": "OE Number",
    "detail.fitment": "Fitment",
    "detail.moq": "MOQ",
    "detail.leadTime": "Lead Time",
    "footer.copy": "Vehicle export and OEM auto parts supply",
    "footer.backTop": "Back to top",
    "toast.added": "added to inquiry.",
    "toast.searchMatches": "Showing {type} matches for your request.",
    "toast.showingAvailable": "Showing available {type}.",
    "toast.contactBackend": "Inquiry submitted to the backend.",
    "toast.contactPrototype": "Inquiry captured in the website prototype.",
    "toast.drawerBackend": "Inquiry submitted to the backend.",
    "toast.drawerPrototype": "Inquiry submitted in the website prototype."
  },
  zh: {
    "meta.title": "GlobalThreads | 整车出口与汽车零配件供应",
    "nav.vehicles": "整车展示",
    "nav.parts": "汽车零配件",
    "nav.export": "出口服务",
    "nav.cases": "案例能力",
    "nav.contact": "联系我们",
    "nav.admin": "后台管理",
    "action.inquiry": "询盘",
    "action.search": "搜索",
    "action.details": "详情",
    "action.getQuote": "获取报价",
    "action.askQuote": "询价",
    "hero.eyebrow": "面向海外经销商、进口商和车队采购商",
    "hero.title": "整车出口与汽车零配件供应平台",
    "hero.copy": "提供新能源汽车、燃油车、商用车及 OEM 零配件，支持从中国发往全球市场。",
    "hero.browse": "查看整车",
    "hero.findParts": "查找配件",
    "search.brandModel": "品牌或车型",
    "search.partName": "配件名称",
    "search.keywordPlaceholder": "比亚迪、丰田、皮卡...",
    "search.energy": "能源类型",
    "search.any": "不限",
    "search.oe": "OE 编号",
    "search.oePlaceholder": "输入 OE / OEM 编号",
    "search.destination": "目的地",
    "search.destinationPlaceholder": "国家或港口",
    "vehicles.eyebrow": "可出口库存",
    "vehicles.title": "推荐整车",
    "parts.eyebrow": "OE/OEM 精准匹配",
    "parts.title": "汽车零配件分类",
    "export.eyebrow": "出口流程",
    "export.title": "从询盘到交付",
    "export.start": "发起询盘",
    "process.inquiry": "询盘",
    "process.inquiryText": "收集车型、OE 编号、数量、目的地和贸易条款。",
    "process.quote": "报价",
    "process.quoteText": "确认 FOB、CIF、CFR 或 EXW 价格、有效期和交期。",
    "process.inspection": "检测",
    "process.inspectionText": "准备照片、规格表、检测记录和出口资料。",
    "process.shipping": "发运",
    "process.shippingText": "安排报关、送港、装柜和单证。",
    "proof.eyebrow": "供应能力",
    "proof.title": "为 B2B 整车贸易而设计",
    "proof.copy": "平台适用于需要稳定整车采购、准确配件匹配和快速报价跟进的海外客户。",
    "metrics.brands": "整车品牌",
    "metrics.skus": "配件 SKU",
    "metrics.markets": "出口市场",
    "metrics.quoteTarget": "报价目标",
    "contact.eyebrow": "联系销售",
    "contact.title": "获取最新出口报价",
    "contact.copy": "请提交目标车型、OE 编号、数量、国家和目的港，销售经理会回复最新供应方案。",
    "form.name": "姓名",
    "form.email": "邮箱",
    "form.country": "国家",
    "form.message": "留言",
    "form.send": "发送询盘",
    "drawer.eyebrow": "询盘清单",
    "drawer.title": "已选择产品",
    "drawer.email": "您的邮箱",
    "drawer.destinationPlaceholder": "国家 / 港口",
    "drawer.messagePlaceholder": "数量、贸易条款、配置、OE 编号...",
    "drawer.submit": "提交询盘",
    "drawer.empty": "还没有选择产品。",
    "detail.eyebrow": "产品详情",
    "detail.specifications": "参数信息",
    "detail.descriptionFallback": "暂未添加详细描述。",
    "detail.addInquiry": "加入询盘",
    "detail.contact": "联系销售",
    "detail.vehicleType": "车辆类型",
    "detail.energyType": "能源类型",
    "detail.year": "年份",
    "detail.steering": "方向盘",
    "detail.stockStatus": "库存状态",
    "detail.price": "价格",
    "detail.exportPort": "出口港",
    "detail.oeNumber": "OE 编号",
    "detail.fitment": "适配车型",
    "detail.moq": "最小起订量",
    "detail.leadTime": "交期",
    "footer.copy": "整车出口与 OEM 汽车零配件供应",
    "footer.backTop": "返回顶部",
    "toast.added": "已加入询盘。",
    "toast.searchMatches": "正在显示符合条件的{type}。",
    "toast.showingAvailable": "正在显示可用{type}。",
    "toast.contactBackend": "询盘已提交到后台。",
    "toast.contactPrototype": "询盘已记录在官网原型中。",
    "toast.drawerBackend": "询盘已提交到后台。",
    "toast.drawerPrototype": "询盘已记录在官网原型中。"
  },
};

let currentLang = localStorage.getItem("site_lang") === "zh" ? "zh" : "en";

function t(key, values = {}) {
  let text = siteTranslations[currentLang][key] || siteTranslations.en[key] || key;
  Object.entries(values).forEach(([name, value]) => {
    text = text.replace(`{${name}}`, value);
  });
  return text;
}

function applyLanguage() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.title = t("meta.title");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  const langToggle = document.querySelector("[data-lang-toggle]");
  if (langToggle) {
    langToggle.textContent = currentLang === "zh" ? "English" : "中文";
  }
  setSearchTab(activeSearchTab);
}

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

function localizedName(item) {
  if (currentLang === "zh" && item.nameZh) {
    return item.nameZh;
  }
  return item.nameEn || item.name || "";
}

function localizedDescription(item) {
  if (currentLang === "zh" && item.descriptionZh) {
    return item.descriptionZh;
  }
  return item.descriptionEn || item.description || "";
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
    nameEn: record.title_en || record.name_en || compact([record.brand, record.model, record.trim]).join(" "),
    nameZh: record.title_zh || record.name_zh || "",
    descriptionEn: record.description_en || "",
    descriptionZh: record.description_zh || "",
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
    record,
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
    nameEn: record.title_en || record.name_en || name,
    nameZh: record.title_zh || record.name_zh || "",
    descriptionEn: record.description_en || "",
    descriptionZh: record.description_zh || "",
    category: record.category || "Other",
    oe: record.oe_numbers || record.part_number || "OE matching",
    fitment: compact([record.applicable_brand, record.applicable_model]).join(" / ") || "Model-specific",
    moq: record.moq || "Ask MOQ",
    lead: record.stock_status || (record.lead_time_days ? `${record.lead_time_days} days` : "Ask sales"),
    mark: mark || "AP",
    image: getFirstImage(record.images),
    record,
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
const detailDrawer = document.querySelector("[data-detail-drawer]");
const detailTitle = document.querySelector("[data-detail-title]");
const detailContent = document.querySelector("[data-detail-content]");
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
        <h3>${localizedName(vehicle)}</h3>
        <div class="spec-list">
          ${vehicle.specs.map((spec) => `<span>${spec}</span>`).join("")}
        </div>
      </div>
      <div class="price-row">
        <strong>${vehicle.price}</strong>
        <span class="stock">${vehicle.stock}</span>
      </div>
      <div class="card-actions">
        <button class="ghost-button" type="button" data-open-detail="${vehicle.id}">${t("action.details")}</button>
        <button class="solid-button" type="button" data-add-inquiry="${vehicle.id}" data-kind="Vehicle">${t("action.getQuote")}</button>
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
        <h3>${localizedName(part)}</h3>
        <div class="part-meta">
          <span>${part.oe}</span>
          <span>${part.fitment}</span>
          <span>${part.moq}</span>
          <span>${part.lead}</span>
        </div>
      </div>
      <div class="card-actions">
        <button class="ghost-button" type="button" data-open-detail="${part.id}">${t("action.details")}</button>
        <button class="solid-button" type="button" data-add-inquiry="${part.id}" data-kind="Auto Part">${t("action.askQuote")}</button>
      </div>
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
    return { id, kind: "Vehicle", name: localizedName(vehicle), meta: `${vehicle.type} | ${vehicle.stock}` };
  }

  const part = parts.find((item) => item.id === id);
  if (part) {
    return { id, kind: "Auto Part", name: localizedName(part), meta: `${part.oe} | ${part.fitment}` };
  }

  return null;
}

function renderInquiryItems() {
  const items = [...inquiryItems.values()];
  if (!items.length) {
    inquiryItemsEl.innerHTML = `<div class="drawer-empty">${t("drawer.empty")}</div>`;
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

function findProduct(id) {
  const vehicle = vehicles.find((item) => item.id === id);
  if (vehicle) {
    return { kind: "Vehicle", item: vehicle };
  }
  const part = parts.find((item) => item.id === id);
  if (part) {
    return { kind: "Auto Part", item: part };
  }
  return null;
}

function specBlock(label, value) {
  if (!String(value || "").trim()) {
    return "";
  }
  return `
    <div>
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `;
}

function renderDetail(product) {
  const { kind, item } = product;
  const isVehicle = kind === "Vehicle";
  const record = item.record || {};
  const title = localizedName(item);
  const description = localizedDescription(item) || t("detail.descriptionFallback");
  const specs = isVehicle
    ? [
        [t("detail.vehicleType"), record.vehicle_type || item.type],
        [t("detail.energyType"), record.energy_type || item.type],
        [t("detail.year"), record.year || item.specs?.[0]],
        [t("detail.steering"), record.steering || ""],
        [t("detail.stockStatus"), record.stock_status || item.stock],
        [t("detail.price"), item.price],
        [t("detail.exportPort"), record.export_port || ""],
      ]
    : [
        [t("parts.title"), record.category || item.category],
        [t("detail.oeNumber"), record.oe_numbers || item.oe],
        [t("detail.fitment"), compact([record.applicable_brand, record.applicable_model]).join(" / ") || item.fitment],
        [t("detail.moq"), record.moq || item.moq],
        [t("detail.leadTime"), record.lead_time_days ? `${record.lead_time_days} days` : item.lead],
        [t("detail.price"), buildPrice(record)],
      ];

  detailTitle.textContent = title;
  detailContent.innerHTML = `
    <div class="detail-visual ${item.image ? "has-image" : ""}" ${item.image ? `style="background-image:url('${item.image.replace(/'/g, "%27")}')"` : ""}></div>
    <div class="detail-summary">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
    <div>
      <p class="eyebrow">${t("detail.specifications")}</p>
      <div class="detail-specs">
        ${specs.map(([label, value]) => specBlock(label, value)).join("")}
      </div>
    </div>
    <div class="detail-actions">
      <button class="solid-button" type="button" data-add-inquiry="${item.id}" data-kind="${kind}">${t("detail.addInquiry")}</button>
      <button class="ghost-button" type="button" data-open-inquiry>${t("detail.contact")}</button>
    </div>
  `;
}

function openDetail(id) {
  const product = findProduct(id);
  if (!product) {
    return;
  }
  renderDetail(product);
  detailDrawer.dataset.currentProductId = id;
  detailDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
}

function closeDetail() {
  detailDrawer.setAttribute("aria-hidden", "true");
  detailDrawer.dataset.currentProductId = "";
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
  primaryLabel.textContent = tab === "vehicles" ? t("search.brandModel") : t("search.partName");
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
      showToast(`${product.name} ${t("toast.added")}`);
    }
    return;
  }

  if (target.closest("[data-open-inquiry]")) {
    closeDetail();
    openInquiry();
    return;
  }

  if (target.closest("[data-close-inquiry]")) {
    closeInquiry();
    return;
  }

  const detailButton = target.closest("[data-open-detail]");
  if (detailButton) {
    openDetail(detailButton.dataset.openDetail);
    return;
  }

  if (target.closest("[data-close-detail]")) {
    closeDetail();
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

  if (target === detailDrawer) {
    closeDetail();
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
      ? t("toast.searchMatches", { type: activeSearchTab === "vehicles" ? t("nav.vehicles") : t("nav.parts") })
      : t("toast.showingAvailable", { type: activeSearchTab === "vehicles" ? t("nav.vehicles") : t("nav.parts") }),
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
  showToast(saved ? t("toast.contactBackend") : t("toast.contactPrototype"));
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
  showToast(saved ? t("toast.drawerBackend") : t("toast.drawerPrototype"));
});

document.querySelector("[data-lang-toggle]").addEventListener("click", () => {
  currentLang = currentLang === "zh" ? "en" : "zh";
  localStorage.setItem("site_lang", currentLang);
  applyLanguage();
  renderVehicles(document.querySelector("[data-vehicle-filter].active")?.dataset.vehicleFilter || "all");
  renderParts(document.querySelector("[data-part-filter].active")?.dataset.partFilter || "all");
  renderInquiryItems();
  if (detailDrawer.getAttribute("aria-hidden") === "false" && detailDrawer.dataset.currentProductId) {
    openDetail(detailDrawer.dataset.currentProductId);
  }
});

window.addEventListener("scroll", elevateHeader, { passive: true });

applyLanguage();
renderVehicles();
renderParts();
renderInquiryItems();
elevateHeader();
loadApiData();
