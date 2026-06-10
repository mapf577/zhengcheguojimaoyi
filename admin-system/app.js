const dictionaryTypeOptions = [
  ["brands", "Brands"],
  ["models", "Models"],
  ["colors", "Colors"],
  ["energy_types", "Energy Types"],
  ["vehicle_types", "Vehicle Types"],
  ["stock_statuses", "Stock Statuses"],
  ["part_categories", "Part Categories"],
  ["currencies", "Currencies"],
  ["export_ports", "Export Ports"],
];

const dictionaryTypeLabelKeys = {
  brands: "dict.brands",
  models: "dict.models",
  colors: "dict.colors",
  energy_types: "dict.energyTypes",
  vehicle_types: "dict.vehicleTypes",
  stock_statuses: "dict.stockStatuses",
  part_categories: "dict.partCategories",
  currencies: "dict.currencies",
  export_ports: "dict.exportPorts",
};

const tableDictionaryFields = {
  vehicles: {
    brand: "brands",
    model: "models",
    vehicle_type: "vehicle_types",
    energy_type: "energy_types",
    stock_status: "stock_statuses",
    color: "colors",
    currency: "currencies",
    export_port: "export_ports",
  },
  parts: {
    category: "part_categories",
    brand: "brands",
    applicable_brand: "brands",
    stock_status: "stock_statuses",
    currency: "currencies",
  },
};

const filterPlaceholderKeys = {
  vehicles: {
    energy_type: "filter.allEnergy",
    vehicle_type: "filter.allVehicleTypes",
    stock_status: "filter.allStock",
  },
  parts: {
    category: "filter.allCategories",
    stock_status: "filter.allStock",
  },
};

const schemas = {
  vehicles: {
    title: "Vehicles",
    api: "/api/vehicles",
    importApi: "/api/import/vehicles",
    columns: ["sku", "brand", "model", "year", "condition", "vehicle_type", "energy_type", "stock_status", "supplier_name", "review_status", "publish_status", "price_min", "price_max", "currency"],
    fields: [
      { name: "sku", label: "SKU", required: true },
      { name: "brand", label: "Brand", required: true, dictionaryType: "brands" },
      { name: "model", label: "Model", required: true, dictionaryType: "models", dependsOn: "brand" },
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
      { name: "range_km", label: "Range KM" },
      { name: "battery_kwh", label: "Battery KWH" },
      { name: "engine_displacement", label: "Engine Displacement" },
      { name: "mileage", label: "Mileage" },
      { name: "registration_date", label: "Registration Date" },
      { name: "ownership_status", label: "Ownership Status" },
      { name: "location", label: "Current Location" },
      { name: "emission_standard", label: "Emission Standard" },
      { name: "inspection_report", label: "Inspection Report", type: "textarea" },
      { name: "accident_note", label: "Accident Note", type: "textarea" },
      { name: "color", label: "Color", dictionaryType: "colors" },
      { name: "stock_status", label: "Stock Status", required: true, dictionaryType: "stock_statuses" },
      { name: "supplier_name", label: "Supplier Name" },
      { name: "review_status", label: "Review Status", options: [["draft", "Draft"], ["submitted", "Submitted"], ["approved", "Approved"], ["rejected", "Rejected"]] },
      { name: "publish_status", label: "Publish Status", options: [["unpublished", "Unpublished"], ["published", "Published"]] },
      { name: "reject_reason", label: "Reject Reason", type: "textarea" },
      { name: "price_min", label: "Price Min" },
      { name: "price_max", label: "Price Max" },
      { name: "currency", label: "Currency", required: true, dictionaryType: "currencies" },
      { name: "export_port", label: "Export Port", dictionaryType: "export_ports" },
      { name: "images", label: "Images", type: "image" },
      { name: "description_en", label: "English Description", type: "textarea" },
      { name: "description_zh", label: "Chinese Description", type: "textarea" },
    ],
  },
  parts: {
    title: "Auto Parts",
    api: "/api/parts",
    importApi: "/api/import/parts",
    columns: ["sku", "category", "brand", "name", "oe_numbers", "applicable_brand", "applicable_model", "moq", "stock_status", "supplier_name", "review_status", "publish_status", "price_min", "price_max", "currency"],
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
      { name: "supplier_name", label: "Supplier Name" },
      { name: "review_status", label: "Review Status", options: [["draft", "Draft"], ["submitted", "Submitted"], ["approved", "Approved"], ["rejected", "Rejected"]] },
      { name: "publish_status", label: "Publish Status", options: [["unpublished", "Unpublished"], ["published", "Published"]] },
      { name: "reject_reason", label: "Reject Reason", type: "textarea" },
      { name: "lead_time_days", label: "Lead Time Days" },
      { name: "unit_weight", label: "Unit Weight" },
      { name: "package_size", label: "Package Size" },
      { name: "price_min", label: "Price Min" },
      { name: "price_max", label: "Price Max" },
      { name: "currency", label: "Currency", required: true, dictionaryType: "currencies" },
      { name: "images", label: "Images", type: "image" },
      { name: "description_en", label: "English Description", type: "textarea" },
      { name: "description_zh", label: "Chinese Description", type: "textarea" },
    ],
  },
  dictionaries: {
    title: "Dictionaries",
    api: "/api/dictionaries",
    columns: ["type", "code", "name_en", "name_zh", "status", "sort_order"],
    fields: [
      { name: "type", label: "Dictionary Type", required: true, options: dictionaryTypeOptions },
      { name: "code", label: "Code", required: true },
      { name: "brand_code", label: "Parent Brand Code", dictionaryType: "brands" },
      { name: "name_en", label: "English Name", required: true },
      { name: "name_zh", label: "Chinese Name", required: true },
      { name: "vehicle_type", label: "Default Vehicle Type", dictionaryType: "vehicle_types" },
      { name: "energy_type", label: "Default Energy Type", dictionaryType: "energy_types" },
      { name: "status", label: "Status", required: true, options: [["active", "Active"], ["disabled", "Disabled"]] },
      { name: "sort_order", label: "Sort Order" },
    ],
  },
  adminUsers: {
    title: "Users",
    api: "/api/admin/users",
    columns: ["username", "name", "email", "role_ids", "status", "last_login_at"],
    fields: [
      { name: "username", label: "Username", required: true },
      { name: "name", label: "Display Name", required: true },
      { name: "email", label: "Email" },
      { name: "phone", label: "Phone" },
      { name: "password", label: "Password", type: "password" },
      { name: "role_ids", label: "Roles", type: "rolePicker", required: true },
      { name: "status", label: "Status", required: true, options: [["active", "Active"], ["disabled", "Disabled"]] },
    ],
  },
  adminRoles: {
    title: "Roles",
    api: "/api/admin/roles",
    columns: ["code", "name_en", "name_zh", "permissions", "status"],
    fields: [
      { name: "code", label: "Role Code", required: true },
      { name: "name_en", label: "English Name", required: true },
      { name: "name_zh", label: "Chinese Name", required: true },
      { name: "description_en", label: "English Description", type: "textarea" },
      { name: "description_zh", label: "Chinese Description", type: "textarea" },
      { name: "status", label: "Status", required: true, options: [["active", "Active"], ["disabled", "Disabled"]] },
      { name: "permissions", label: "Permissions", type: "permissionMatrix", required: true },
    ],
  },
};

const fieldGroups = {
  vehicles: [
    { titleKey: "form.basic", fields: ["sku", "brand", "model", "title_en", "title_zh", "year", "trim", "condition"] },
    {
      titleKey: "form.specs",
      fields: [
        "vehicle_type",
        "energy_type",
        "steering",
        "seats",
        "transmission",
        "drive_type",
        "range_km",
        "battery_kwh",
        "engine_displacement",
        "color",
      ],
    },
    {
      titleKey: "form.usedVehicle",
      fields: ["mileage", "registration_date", "ownership_status", "location", "emission_standard", "inspection_report", "accident_note"],
    },
    { titleKey: "form.commercial", fields: ["stock_status", "supplier_name", "review_status", "publish_status", "reject_reason", "price_min", "price_max", "currency", "export_port"] },
    { titleKey: "form.media", fields: ["images", "description_en", "description_zh"] },
  ],
  parts: [
    { titleKey: "form.basic", fields: ["sku", "category", "brand", "name", "title_en", "title_zh", "oe_numbers", "part_number"] },
    { titleKey: "form.fitment", fields: ["applicable_brand", "applicable_model", "applicable_year"] },
    {
      titleKey: "form.commercial",
      fields: ["moq", "stock_status", "supplier_name", "review_status", "publish_status", "reject_reason", "lead_time_days", "unit_weight", "package_size", "price_min", "price_max", "currency"],
    },
    { titleKey: "form.media", fields: ["images", "description_en", "description_zh"] },
  ],
  dictionaries: [
    { titleKey: "form.dictionaryCore", fields: ["type", "code", "status", "sort_order"] },
    { titleKey: "form.dictionaryNames", fields: ["name_en", "name_zh"] },
    { titleKey: "form.dictionaryRules", fields: ["brand_code", "vehicle_type", "energy_type"] },
  ],
  adminUsers: [
    { titleKey: "form.account", fields: ["username", "password", "status"] },
    { titleKey: "form.profile", fields: ["name", "email", "phone"] },
    { titleKey: "form.access", fields: ["role_ids"] },
  ],
  adminRoles: [
    { titleKey: "form.roleCore", fields: ["code", "name_en", "name_zh", "status"] },
    { titleKey: "form.roleDescription", fields: ["description_en", "description_zh"] },
    { titleKey: "form.permissions", fields: ["permissions"] },
  ],
};

schemas.usedVehicles = {
  ...schemas.vehicles,
  title: "Used Cars",
  sourceType: "vehicles",
  conditionFilter: "used",
  fixedValues: { condition: "used" },
  columns: ["sku", "brand", "model", "year", "mileage", "registration_date", "vehicle_type", "energy_type", "stock_status", "supplier_name", "review_status", "publish_status", "price_min", "price_max", "currency"],
  fields: schemas.vehicles.fields.filter((field) => field.name !== "condition"),
};

fieldGroups.usedVehicles = [
  { titleKey: "form.basic", fields: ["sku", "brand", "model", "title_en", "title_zh", "year", "trim"] },
  {
    titleKey: "form.specs",
    fields: ["vehicle_type", "energy_type", "steering", "seats", "transmission", "drive_type", "range_km", "battery_kwh", "engine_displacement", "color"],
  },
  {
    titleKey: "form.usedVehicle",
    fields: ["mileage", "registration_date", "ownership_status", "location", "emission_standard", "inspection_report", "accident_note"],
  },
  { titleKey: "form.commercial", fields: ["stock_status", "supplier_name", "review_status", "publish_status", "reject_reason", "price_min", "price_max", "currency", "export_port"] },
  { titleKey: "form.media", fields: ["images", "description_en", "description_zh"] },
];

tableDictionaryFields.usedVehicles = tableDictionaryFields.vehicles;
filterPlaceholderKeys.usedVehicles = filterPlaceholderKeys.vehicles;

const adminTranslations = {
  en: {
    "meta.title": "Admin Console | GlobalThreads",
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
    "nav.leadDiscovery": "AI Lead Discovery",
    "nav.groupInventory": "Products & Inventory",
    "nav.groupCustomers": "Customer Operations",
    "nav.groupAiTools": "AI Tools",
    "nav.groupTools": "Tools & System",
    "nav.leadTasks": "Discovery Tasks",
    "nav.leadPool": "Lead Pool",
    "nav.aiLogs": "AI Logs",
    "nav.aiMaintenance": "AI Maintenance",
    "leadDiscovery.title": "Commercial Vehicle Lead Discovery",
    "leadDiscovery.hint": "Discover commercial vehicle importers, dealers, fleet operators and project buyers by country, vehicle type and industry.",
    "leadDiscovery.taskCenterTitle": "Lead Discovery Tasks",
    "leadDiscovery.taskCenterHint": "Configure search tasks, run collection and review task progress.",
    "leadDiscovery.leadPoolTitle": "Lead Pool & Profiles",
    "leadDiscovery.leadPoolHint": "Review lead quality, AI profiles, contact details and follow-up records.",
    "leadDiscovery.searchTask": "Search Configuration",
    "leadDiscovery.searchTaskHint": "Configure countries, vehicles and buyer profiles for commercial vehicle export prospecting.",
    "leadDiscovery.keywords": "Keywords",
    "leadDiscovery.countries": "Countries",
    "leadDiscovery.industries": "Industries",
    "leadDiscovery.targetCountries": "Target countries / regions",
    "leadDiscovery.targetVehicles": "Target vehicles",
    "leadDiscovery.customerTypes": "Customer types",
    "leadDiscovery.customerType": "Customer Type",
    "leadDiscovery.purchaseScenarios": "Purchase scenarios",
    "leadDiscovery.searchDepth": "Search depth",
    "leadDiscovery.keywordTemplate": "Search keyword template",
    "leadDiscovery.advanced": "Advanced options",
    "leadDiscovery.manualKeywords": "Manual keywords",
    "leadDiscovery.generateKeywords": "Generate Keywords",
    "leadDiscovery.resetConfig": "Reset Config",
    "leadDiscovery.more": "More",
    "leadDiscovery.addOption": "Search and add...",
    "leadDiscovery.createTask": "Create Search Task",
    "leadDiscovery.runCrawler": "Run Crawler",
    "leadDiscovery.tasks": "Tasks",
    "leadDiscovery.recentTasks": "Recent Search Tasks",
    "leadDiscovery.recentTasksHint": "Run or review recent commercial vehicle lead searches.",
    "leadDiscovery.progress": "Search Progress",
    "leadDiscovery.progressHint": "Run a task to collect websites, contacts, scores and AI profiles.",
    "leadDiscovery.progressIdle": "No crawler task is running.",
    "leadDiscovery.progressRunning": "Crawler running",
    "leadDiscovery.progressDone": "Crawler completed",
    "leadDiscovery.progressFailed": "Crawler failed",
    "leadDiscovery.progressMeta": "{task} · {elapsed}s",
    "leadDiscovery.progressResult": "Saved {results} source result(s), {leads} lead(s), {profiles} AI profile(s).",
    "leadDiscovery.statistics": "Lead Statistics",
    "leadDiscovery.statisticsHint": "Quality signals for current lead pool.",
    "leadDiscovery.statTotal": "Total Leads",
    "leadDiscovery.statHigh": "Qualified Leads",
    "leadDiscovery.statContact": "Contactable Leads",
    "leadDiscovery.statVerify": "Needs Verification",
    "leadDiscovery.statInvalid": "Invalid / Low Quality",
    "leadDiscovery.manualAdd": "Manual Add Lead",
    "leadDiscovery.crawlResult": "Manual Add Lead",
    "leadDiscovery.relatedTask": "Related Task",
    "leadDiscovery.titleField": "Title",
    "leadDiscovery.sourceContent": "Source Content",
    "leadDiscovery.addUrl": "Add Lead & Generate Profile",
    "leadDiscovery.leads": "Lead Table",
    "leadDiscovery.company": "Company",
    "leadDiscovery.industry": "Industry",
    "leadDiscovery.score": "Score",
    "leadDiscovery.leadScore": "Lead Score",
    "leadDiscovery.matchedVehicles": "Matched Vehicles",
    "leadDiscovery.contactQuality": "Contact Quality",
    "leadDiscovery.contact": "Contact",
    "leadDiscovery.source": "Source",
    "leadDiscovery.followStatus": "Follow-up",
    "leadDiscovery.lastUpdated": "Last Updated",
    "leadDiscovery.selectLead": "Select a lead to review profile and contact history.",
    "leadDiscovery.profile": "AI Profile",
    "leadDiscovery.possibleVehicles": "Possible Purchase Vehicles",
    "leadDiscovery.purchaseReasons": "Purchase Reasons",
    "leadDiscovery.keyEvidence": "Key Evidence",
    "leadDiscovery.outreach": "WhatsApp / Email Outreach",
    "leadDiscovery.riskFlags": "Risk Warnings",
    "leadDiscovery.nextSteps": "Next Steps",
    "leadDiscovery.scoring": "Scoring Breakdown",
    "leadDiscovery.contacts": "Contact Details",
    "leadDiscovery.sourceResults": "Source Content",
    "leadDiscovery.contactLogs": "Follow-up Records",
    "leadDiscovery.generateProfile": "Generate Profile",
    "leadDiscovery.generateOutreach": "Generate outreach message",
    "leadDiscovery.verifyContact": "Verify contact",
    "leadDiscovery.verifyLead": "Verify Lead",
    "leadDiscovery.addToCrm": "Add to CRM",
    "leadDiscovery.markInvalid": "Mark Invalid",
    "leadDiscovery.openSource": "Open source website",
    "leadDiscovery.addContactLog": "Add Follow-up",
    "leadDiscovery.noProfile": "No AI profile yet.",
    "leadDiscovery.noLogs": "No follow-up records yet.",
    "leadDiscovery.noSource": "No source content yet.",
    "leadDiscovery.logContent": "Follow-up note",
    "toast.leadTaskCreated": "Search task created.",
    "toast.crawlResultAdded": "Lead added and AI profile generated.",
    "toast.leadProfileGenerated": "Lead profile generated.",
    "toast.contactLogAdded": "Follow-up record added.",
    "toast.crawlerFinished": "Crawler saved {results} result(s) and {leads} lead(s).",
    "workspace.eyebrow": "Backend management",
    "action.logout": "Logout",
    "action.openWebsite": "Open Website",
    "action.refresh": "Refresh",
    "action.new": "New",
    "action.addVehicle": "Add Vehicle",
    "action.addPart": "Add Auto Part",
    "action.edit": "Edit",
    "action.delete": "Delete",
    "action.email": "Email",
    "action.cancel": "Cancel",
    "action.importCsv": "Import CSV",
    "action.importBrands": "Import Brands",
    "action.exportCsv": "Export CSV",
    "action.approve": "Approve",
    "action.reject": "Reject",
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
    "aiLogs.title": "AI Logs",
    "aiMaintenance.title": "AI Database Maintenance",
    "aiMaintenance.hint": "Use DeepSeek to generate safe batch updates, review them, then apply only valid changes.",
    "aiMaintenance.targets": "Targets",
    "aiMaintenance.targetDictionaries": "Dictionaries",
    "aiMaintenance.targetVehicles": "Vehicles",
    "aiMaintenance.targetParts": "Auto Parts",
    "aiMaintenance.instruction": "Instruction",
    "aiMaintenance.instructionPlaceholder": "Example: Add the following gearbox and brake categories, or update these SKUs with new prices.",
    "aiMaintenance.sourceText": "Source Text",
    "aiMaintenance.sourcePlaceholder": "Paste CSV, spreadsheet rows, product notes, or dictionary terms here.",
    "aiMaintenance.preview": "Generate Preview",
    "aiMaintenance.apply": "Apply Valid Changes",
    "aiMaintenance.empty": "No operations generated.",
    "aiMaintenance.valid": "Valid",
    "aiMaintenance.invalid": "Invalid",
    "aiMaintenance.create": "Create",
    "aiMaintenance.update": "Update",
    "aiMaintenance.applied": "{applied} applied. {rejected} rejected.",
    "table.status": "Status",
    "table.module": "Module",
    "table.action": "Action",
    "table.target": "Target",
    "table.source": "Source",
    "table.actor": "Actor",
    "table.details": "Details",
    "table.name": "Name",
    "table.email": "Email",
    "table.country": "Country",
    "table.message": "Message",
    "table.created": "Created",
    "table.actions": "Actions",
    "empty.vehicles": "No vehicles yet.",
    "empty.parts": "No auto parts yet.",
    "empty.noMatches": "No matching records.",
    "empty.adjustFilters": "Adjust search keywords or filters.",
    "empty.inquiries": "No inquiries yet.",
    "empty.aiLogs": "No AI logs yet.",
    "filter.searchVehicles": "Search SKU, brand, model...",
    "filter.searchParts": "Search SKU, name, OE number...",
    "filter.allEnergy": "All energy",
    "filter.allVehicleTypes": "All types",
    "filter.allCategories": "All categories",
    "filter.allStock": "All stock",
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
    "toast.reviewUpdated": "Review status updated.",
    "toast.aiMaintenancePreview": "{valid} valid operation(s), {invalid} invalid.",
    "toast.aiMaintenanceApplied": "{applied} applied. {rejected} rejected.",
    "confirm.delete": "Delete {name}?",
    "confirm.aiMaintenanceApply": "Apply {count} valid AI maintenance operation(s)?",
    "prompt.rejectReason": "Reject reason",
    "placeholder.image": "/uploads/image.jpg or external URL",
  },
  zh: {
    "meta.title": "后台管理 | GlobalThreads",
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
    "nav.leadDiscovery": "AI客户发现",
    "nav.groupInventory": "商品与库存",
    "nav.groupCustomers": "客户运营",
    "nav.groupAiTools": "AI工具",
    "nav.groupTools": "工具与系统",
    "nav.leadTasks": "发现任务",
    "nav.leadPool": "客户线索池",
    "nav.aiLogs": "AI日志",
    "nav.aiMaintenance": "AI维护",
    "leadDiscovery.title": "商用车出口客户发现",
    "leadDiscovery.hint": "按国家、车型和行业发现商用车进口商、经销商、车队运营商和项目采购方。",
    "leadDiscovery.taskCenterTitle": "客户发现任务",
    "leadDiscovery.taskCenterHint": "配置搜索任务、运行采集并查看任务进度。",
    "leadDiscovery.leadPoolTitle": "客户线索池与画像",
    "leadDiscovery.leadPoolHint": "查看客户质量、AI画像、联系方式和跟进记录。",
    "leadDiscovery.searchTask": "搜索配置",
    "leadDiscovery.searchTaskHint": "配置国家、车型和客户画像，用于商用车出口线索开发。",
    "leadDiscovery.keywords": "搜索关键词",
    "leadDiscovery.countries": "国家",
    "leadDiscovery.industries": "行业",
    "leadDiscovery.targetCountries": "目标国家/地区",
    "leadDiscovery.targetVehicles": "目标车型",
    "leadDiscovery.customerTypes": "客户类型",
    "leadDiscovery.customerType": "客户类型",
    "leadDiscovery.purchaseScenarios": "采购场景",
    "leadDiscovery.searchDepth": "搜索深度",
    "leadDiscovery.keywordTemplate": "搜索关键词模板",
    "leadDiscovery.advanced": "高级选项",
    "leadDiscovery.manualKeywords": "手动关键词",
    "leadDiscovery.generateKeywords": "生成关键词",
    "leadDiscovery.resetConfig": "重置配置",
    "leadDiscovery.more": "更多",
    "leadDiscovery.addOption": "搜索并添加...",
    "leadDiscovery.createTask": "创建搜索任务",
    "leadDiscovery.runCrawler": "运行爬虫",
    "leadDiscovery.tasks": "任务",
    "leadDiscovery.recentTasks": "最近搜索任务",
    "leadDiscovery.recentTasksHint": "运行或复查最近的商用车客户搜索。",
    "leadDiscovery.progress": "搜索进度",
    "leadDiscovery.progressHint": "运行任务后采集网站、联系人、评分并生成 AI 画像。",
    "leadDiscovery.progressIdle": "当前没有正在运行的爬虫任务。",
    "leadDiscovery.progressRunning": "爬虫运行中",
    "leadDiscovery.progressDone": "爬虫已完成",
    "leadDiscovery.progressFailed": "爬虫运行失败",
    "leadDiscovery.progressMeta": "{task} · {elapsed}秒",
    "leadDiscovery.progressResult": "已保存 {results} 条来源、{leads} 个线索、{profiles} 个 AI 画像。",
    "leadDiscovery.statistics": "线索统计",
    "leadDiscovery.statisticsHint": "当前线索池质量信号。",
    "leadDiscovery.statTotal": "线索总数",
    "leadDiscovery.statHigh": "合格线索",
    "leadDiscovery.statContact": "可联系线索",
    "leadDiscovery.statVerify": "需要验证",
    "leadDiscovery.statInvalid": "无效/低质量",
    "leadDiscovery.manualAdd": "手动添加线索",
    "leadDiscovery.crawlResult": "手动添加线索",
    "leadDiscovery.relatedTask": "关联任务",
    "leadDiscovery.titleField": "标题",
    "leadDiscovery.sourceContent": "来源内容",
    "leadDiscovery.addUrl": "添加线索并生成画像",
    "leadDiscovery.leads": "线索表",
    "leadDiscovery.company": "公司名",
    "leadDiscovery.industry": "行业",
    "leadDiscovery.score": "评分",
    "leadDiscovery.leadScore": "线索评分",
    "leadDiscovery.matchedVehicles": "匹配车型",
    "leadDiscovery.contactQuality": "联系方式质量",
    "leadDiscovery.contact": "联系方式",
    "leadDiscovery.source": "来源链接",
    "leadDiscovery.followStatus": "跟进状态",
    "leadDiscovery.lastUpdated": "最后更新",
    "leadDiscovery.selectLead": "选择客户后查看 AI 画像、联系方式和跟进记录。",
    "leadDiscovery.profile": "AI画像",
    "leadDiscovery.possibleVehicles": "可能采购车型",
    "leadDiscovery.purchaseReasons": "采购理由",
    "leadDiscovery.keyEvidence": "关键证据",
    "leadDiscovery.outreach": "WhatsApp / Email开发话术",
    "leadDiscovery.riskFlags": "风险提示",
    "leadDiscovery.nextSteps": "下一步建议",
    "leadDiscovery.scoring": "评分拆解",
    "leadDiscovery.contacts": "联系方式",
    "leadDiscovery.sourceResults": "来源内容",
    "leadDiscovery.contactLogs": "跟进记录",
    "leadDiscovery.generateProfile": "生成画像",
    "leadDiscovery.generateOutreach": "生成开发话术",
    "leadDiscovery.verifyContact": "验证联系方式",
    "leadDiscovery.verifyLead": "验证线索",
    "leadDiscovery.addToCrm": "加入CRM",
    "leadDiscovery.markInvalid": "标记无效",
    "leadDiscovery.openSource": "打开来源网站",
    "leadDiscovery.addContactLog": "新增跟进",
    "leadDiscovery.noProfile": "暂无 AI 画像。",
    "leadDiscovery.noLogs": "暂无跟进记录。",
    "leadDiscovery.noSource": "暂无来源内容。",
    "leadDiscovery.logContent": "跟进内容",
    "toast.leadTaskCreated": "搜索任务已创建。",
    "toast.crawlResultAdded": "线索已添加，并已生成 AI 画像。",
    "toast.leadProfileGenerated": "客户画像已生成。",
    "toast.contactLogAdded": "跟进记录已新增。",
    "toast.crawlerFinished": "爬虫已保存 {results} 条结果、{leads} 个客户。",
    "workspace.eyebrow": "后台管理",
    "action.logout": "退出登录",
    "action.openWebsite": "打开官网",
    "action.refresh": "刷新",
    "action.new": "新增",
    "action.addVehicle": "新增整车",
    "action.addPart": "新增配件",
    "action.edit": "编辑",
    "action.delete": "删除",
    "action.email": "发邮件",
    "action.cancel": "取消",
    "action.importCsv": "导入 CSV",
    "action.importBrands": "导入品牌",
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
    "aiLogs.title": "AI日志",
    "aiMaintenance.title": "AI 数据维护",
    "aiMaintenance.hint": "使用 DeepSeek 生成批量维护方案，先审核预览，再只执行有效变更。",
    "aiMaintenance.targets": "维护对象",
    "aiMaintenance.targetDictionaries": "字典",
    "aiMaintenance.targetVehicles": "整车",
    "aiMaintenance.targetParts": "零配件",
    "aiMaintenance.instruction": "维护要求",
    "aiMaintenance.instructionPlaceholder": "示例：新增以下变速箱和制动分类，或更新这些 SKU 的价格。",
    "aiMaintenance.sourceText": "原始数据",
    "aiMaintenance.sourcePlaceholder": "粘贴 CSV、表格行、商品说明或字典词条。",
    "aiMaintenance.preview": "生成预览",
    "aiMaintenance.apply": "执行有效变更",
    "aiMaintenance.empty": "未生成操作。",
    "aiMaintenance.valid": "有效",
    "aiMaintenance.invalid": "无效",
    "aiMaintenance.create": "新增",
    "aiMaintenance.update": "更新",
    "aiMaintenance.applied": "已执行 {applied} 条，拒绝 {rejected} 条。",
    "table.status": "状态",
    "table.module": "模块",
    "table.action": "操作",
    "table.target": "对象",
    "table.source": "来源",
    "table.actor": "操作者",
    "table.details": "详情",
    "table.name": "姓名",
    "table.email": "邮箱",
    "table.country": "国家",
    "table.message": "留言",
    "table.created": "创建时间",
    "table.actions": "操作",
    "empty.vehicles": "暂无整车数据。",
    "empty.parts": "暂无零配件数据。",
    "empty.noMatches": "没有找到匹配结果。",
    "empty.adjustFilters": "请调整搜索关键词或筛选条件。",
    "empty.inquiries": "暂无询盘。",
    "empty.aiLogs": "暂无AI日志。",
    "filter.searchVehicles": "搜索 SKU、品牌、车型...",
    "filter.searchParts": "搜索 SKU、名称、OE 编号...",
    "filter.allEnergy": "全部能源",
    "filter.allVehicleTypes": "全部类型",
    "filter.allCategories": "全部分类",
    "filter.allStock": "全部库存",
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
    "toast.reviewUpdated": "审核状态已更新。",
    "toast.aiMaintenancePreview": "{valid} 条有效，{invalid} 条无效。",
    "toast.aiMaintenanceApplied": "已执行 {applied} 条，拒绝 {rejected} 条。",
    "confirm.delete": "确认删除 {name}？",
    "confirm.aiMaintenanceApply": "确认执行 {count} 条有效 AI 维护操作？",
    "prompt.rejectReason": "请输入驳回原因",
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
    "Supplier Name": "供应商名称",
    "Review Status": "审核状态",
    "Publish Status": "发布状态",
    "Reject Reason": "驳回原因",
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
    supplier_name: "供应商",
    review_status: "审核状态",
    publish_status: "发布状态",
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

Object.assign(adminTranslations.en, {
  "nav.settings": "Settings",
  "settings.title": "Dictionary Settings",
  "settings.add": "Add Dictionary Item",
  "action.saveDictionary": "Save Dictionary Item",
  "empty.dictionaries": "No dictionary items yet.",
  "singular.dictionary": "Dictionary Item",
  "select.choose": "Select...",
  "select.optional": "Optional",
  "form.basic": "Basic Information",
  "form.specs": "Specifications",
  "form.commercial": "Pricing & Inventory",
  "form.media": "Media & Description",
  "form.fitment": "Fitment",
  "form.dictionaryCore": "Dictionary Item",
  "form.dictionaryNames": "Localized Names",
  "form.dictionaryRules": "Linked Defaults",
  "dict.brands": "Brands",
  "dict.models": "Models",
  "dict.colors": "Colors",
  "dict.energyTypes": "Energy Types",
  "dict.vehicleTypes": "Vehicle Types",
  "dict.stockStatuses": "Stock Statuses",
  "dict.partCategories": "Part Categories",
  "dict.currencies": "Currencies",
  "dict.exportPorts": "Export Ports",
});

Object.assign(adminTranslations.zh, {
  "meta.title": "后台管理 | GlobalThreads",
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
  "nav.aiLogs": "AI日志",
  "nav.settings": "设置",
  "workspace.eyebrow": "后台管理",
  "action.logout": "退出登录",
  "action.openWebsite": "打开官网",
  "action.refresh": "刷新",
  "action.new": "新增",
  "action.addVehicle": "新增整车",
  "action.addPart": "新增零配件",
  "action.edit": "编辑",
  "action.delete": "删除",
  "action.email": "发邮件",
  "action.cancel": "取消",
  "action.importCsv": "导入 CSV",
  "action.importBrands": "导入品牌",
  "action.exportCsv": "导出 CSV",
  "action.approve": "通过",
  "action.reject": "驳回",
  "action.saveVehicle": "保存整车",
  "action.savePart": "保存零配件",
  "action.saveDictionary": "保存字典项",
  "action.uploadImage": "上传图片",
  "dashboard.next": "下一步",
  "dashboard.task1": "新增或导入第一批可出口整车。",
  "dashboard.task2": "在管理表单中上传产品图片。",
  "dashboard.task3": "打开官网检查产品卡片和询盘表单。",
  "vehicles.data": "整车数据",
  "parts.data": "零配件数据",
  "inquiries.title": "客户询盘",
  "aiLogs.title": "AI日志",
  "settings.title": "字典设置",
  "settings.add": "新增字典项",
  "table.status": "状态",
  "table.module": "模块",
  "table.action": "操作",
  "table.target": "对象",
  "table.source": "来源",
  "table.actor": "操作者",
  "table.details": "详情",
  "table.name": "姓名",
  "table.email": "邮箱",
  "table.country": "国家",
  "table.message": "留言",
  "table.created": "创建时间",
  "table.actions": "操作",
  "empty.vehicles": "暂无整车数据。",
  "empty.parts": "暂无零配件数据。",
  "empty.dictionaries": "暂无字典项。",
  "empty.noMatches": "没有找到匹配结果。",
  "empty.adjustFilters": "请调整搜索关键词或筛选条件。",
  "empty.inquiries": "暂无询盘。",
  "empty.aiLogs": "暂无AI日志。",
  "filter.searchVehicles": "搜索 SKU、品牌、车型...",
  "filter.searchParts": "搜索 SKU、名称、OE 编号...",
  "filter.allEnergy": "全部能源",
  "filter.allVehicleTypes": "全部类型",
  "filter.allCategories": "全部分类",
  "filter.allStock": "全部库存",
  "singular.vehicle": "整车",
  "singular.part": "零配件",
  "singular.dictionary": "字典项",
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
  "select.choose": "请选择...",
  "select.optional": "可选",
  "form.basic": "基础信息",
  "form.specs": "规格参数",
  "form.commercial": "价格与库存",
  "form.media": "图片与描述",
  "form.fitment": "适配信息",
  "form.dictionaryCore": "字典项",
  "form.dictionaryNames": "中英文名称",
  "form.dictionaryRules": "关联默认值",
  "dict.brands": "品牌",
  "dict.models": "车型",
  "dict.colors": "颜色",
  "dict.energyTypes": "能源类型",
  "dict.vehicleTypes": "车辆类型",
  "dict.stockStatuses": "库存状态",
  "dict.partCategories": "零配件分类",
  "dict.currencies": "币种",
  "dict.exportPorts": "出口港口",
});

Object.assign(fieldTranslations.zh, {
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
  "Export Port": "出口港口",
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
  "Dictionary Type": "字典类型",
  Code: "编码",
  "Parent Brand Code": "所属品牌",
  "English Name": "英文名称",
  "Chinese Name": "中文名称",
  "Default Vehicle Type": "默认车辆类型",
  "Default Energy Type": "默认能源类型",
  Status: "状态",
  "Sort Order": "排序",
  Brands: "品牌",
  Models: "车型",
  Colors: "颜色",
  "Energy Types": "能源类型",
  "Vehicle Types": "车辆类型",
  "Stock Statuses": "库存状态",
  "Part Categories": "零配件分类",
  Currencies: "币种",
  "Export Ports": "出口港口",
  Active: "启用",
  Disabled: "停用",
  Username: "用户名",
  "Display Name": "显示名称",
  Email: "邮箱",
  Phone: "电话",
  Password: "密码",
  Roles: "角色",
  "Role Code": "角色编码",
  Permissions: "权限",
});

Object.assign(columnTranslations.zh, {
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
  type: "类型",
  code: "编码",
  name_en: "英文名称",
  name_zh: "中文名称",
  status: "状态",
  sort_order: "排序",
});

Object.assign(adminTranslations.en, {
  "login.stageEyebrow": "Export management",
  "login.stageTitle": "From Factory to World",
  "login.stageText": "Manage vehicles, auto parts, inquiries and AI operation logs in one workspace.",
  "login.metricVehicles": "Catalog",
  "login.metricParts": "Inventory",
  "login.metricInquiries": "Pipeline",
  "login.subtitle": "Sign in to manage export-ready products and customer requests.",
  "login.usernamePlaceholder": "Enter username",
  "login.passwordPlaceholder": "Enter password",
  "nav.groupCommerce": "Business Operations",
  "nav.groupSystem": "System Management",
  "nav.groupInventory": "Products & Inventory",
  "nav.groupCustomers": "Customer Operations",
  "nav.groupAiTools": "AI Tools",
  "nav.groupTools": "Tools & System",
  "workspace.subtitle": "Centralized export operations for vehicles and auto parts.",
  "workspace.account": "Current account",
  "workspace.status": "Console date",
  "workspace.welcome": "Welcome back",
  "workspace.exportDesk": "Today's Export Desk",
  "workspace.ipAddress": "IP address",
  "metric.vehiclesHint": "Export catalogue records",
  "metric.partsHint": "Parts inventory records",
  "metric.inquiriesHint": "Customer request pipeline",
  "metric.aiLogsHint": "Traceable assistant actions",
  "dashboard.heroEyebrow": "Live operations",
  "dashboard.heroTitle": "Export Operation Command Center",
  "dashboard.heroText": "Prioritize export-ready inventory, new buyer requests, follow-ups and assisted actions from one command surface.",
  "dashboard.viewInquiries": "View Inquiries",
  "dashboard.viewAllInquiries": "View all",
  "dashboard.createQuote": "Create Quote",
  "dashboard.live": "Live",
  "dashboard.localTime": "Local time",
  "dashboard.snapshotEyebrow": "Inventory",
  "dashboard.catalogTitle": "Inventory Health",
  "dashboard.catalogHint": "Quality score and bottlenecks for sellable stock.",
  "dashboard.pipelineEyebrow": "Pipeline",
  "dashboard.inquiryTitle": "Latest Inquiries",
  "dashboard.inquiryHint": "Buyer requests summarized for fast triage.",
  "dashboard.activityEyebrow": "Realtime",
  "dashboard.activityTitle": "Live Activity",
  "dashboard.actionEyebrow": "Action Required",
  "dashboard.todoTitle": "Today's To-do",
  "dashboard.todoHint": "Prioritized work for today's export desk.",
  "dashboard.tableSegment": "Segment",
  "dashboard.tableTotal": "Total",
  "dashboard.tableReady": "Ready",
  "dashboard.tableTop": "Top Category",
  "dashboard.tableBuyer": "Buyer",
  "dashboard.tableRequest": "Request",
  "dashboard.metricTotalInventory": "Total Inventory",
  "dashboard.metricSaleableInventory": "Saleable Inventory",
  "dashboard.metricAvailableVehicles": "Available Vehicles",
  "dashboard.metricNewInquiries": "New Inquiries",
  "dashboard.metricPendingFollowups": "Pending Follow-ups",
  "dashboard.metricPendingItems": "Pending Items",
  "dashboard.metricAiActions": "AI Actions",
  "dashboard.inventoryIssues": "Inventory Issues",
  "dashboard.subExportReady": "{count} export-ready",
  "dashboard.subCatalogueRecords": "{count} catalogue records",
  "dashboard.subSaleable": "{count} ready for sales",
  "dashboard.saleableZeroHint": "Check vehicle status, price, or publishing settings.",
  "dashboard.subToday": "{count} today",
  "dashboard.subWaiting": "{count} waiting",
  "dashboard.subNeedAction": "{count} need action",
  "dashboard.healthTotal": "Total",
  "dashboard.healthAvailable": "Available",
  "dashboard.healthMissingPrice": "Missing price",
  "dashboard.healthMissingImages": "Missing images",
  "dashboard.healthUnpublished": "Not published",
  "dashboard.healthIncomplete": "Incomplete info",
  "dashboard.healthTotalHint": "Vehicles and parts",
  "dashboard.healthAvailableHint": "Ready, priced and published",
  "dashboard.healthMissingPriceHint": "Need commercial review",
  "dashboard.healthMissingImagesHint": "Need presentation assets",
  "dashboard.healthUnpublishedHint": "Hidden from website",
  "dashboard.healthIncompleteHint": "Required fields missing",
  "dashboard.aiDiagnosis": "AI diagnosis",
  "dashboard.healthScoreTitle": "Inventory health score",
  "dashboard.diagnosisNoSaleable": "Current saleable inventory is 0.",
  "dashboard.diagnosisSaleable": "{count} item(s) are ready for sales.",
  "dashboard.diagnosisMissingPrice": "Prioritize vehicles with missing prices before quotation.",
  "dashboard.diagnosisStatusCheck": "Check whether vehicles are marked export-ready and published.",
  "dashboard.view": "View",
  "dashboard.followUp": "Follow up",
  "dashboard.markValid": "Mark valid",
  "dashboard.addFollowup": "Add follow-up",
  "dashboard.actionReviewInventory": "Review inventory",
  "dashboard.actionFixInventory": "Check sales status",
  "dashboard.actionOpenPipeline": "Open pipeline",
  "dashboard.actionResolveNow": "Resolve now",
  "dashboard.actionReviewAi": "Review logs",
  "dashboard.todoMissingPrice": "Vehicles missing price",
  "dashboard.todoMissingImages": "Vehicles missing images",
  "dashboard.todoNewInquiries": "New inquiries",
  "dashboard.todoPendingCustomers": "Customers pending follow-up",
  "dashboard.todoAiSuggestions": "AI suggestions to review",
  "dashboard.handleNow": "Handle",
  "dashboard.segmentVehicles": "Vehicles",
  "dashboard.segmentParts": "Auto Parts",
  "dashboard.segmentInquiries": "Inquiries",
  "dashboard.segmentAiLogs": "AI Logs",
  "dashboard.readyVehicles": "ready / in stock",
  "dashboard.readyParts": "ready / in stock",
  "dashboard.openInquiries": "open",
  "dashboard.todayLogs": "today",
  "dashboard.noData": "No data yet.",
  "dashboard.focusCatalog": "{count} catalogue items are available for export presentation.",
  "dashboard.focusInquiry": "{count} open inquiry item(s) need follow-up.",
  "dashboard.focusAi": "{count} AI action(s) are traceable in logs.",
  "dashboard.opsEyebrow": "Operations",
  "dashboard.controlEyebrow": "Control center",
  "dashboard.opsTitle": "Management Focus",
  "dashboard.ops1": "Keep vehicle and part dictionaries synchronized before product entry.",
  "dashboard.ops2": "Review inquiries after each catalogue update.",
  "dashboard.ops3": "Check AI logs when automated content or import actions are used.",
  "vehicles.hint": "Maintain export vehicle records, pricing, stock and images.",
  "parts.hint": "Maintain parts categories, OE numbers, fitment and inventory.",
  "inquiries.hint": "Track customer requests from website forms.",
  "settings.hint": "Manage bilingual brands, models, colors and business dictionaries.",
  "aiLogs.hint": "Review automated actions and generated content traces.",
  "nav.users": "Users",
  "nav.roles": "Roles",
  "users.title": "User Management",
  "users.hint": "Create admin accounts, assign roles and control account status.",
  "users.add": "Add User",
  "roles.title": "Role Permissions",
  "roles.hint": "Define backend roles and assign permission scopes.",
  "roles.add": "Add Role",
  "roles.permissionCount": "{count} permission(s)",
  "action.saveUser": "Save User",
  "action.saveRole": "Save Role",
  "action.enable": "Enable",
  "action.disable": "Disable",
  "action.resetPassword": "Reset Password",
  "table.username": "Username",
  "table.roles": "Roles",
  "table.lastLogin": "Last Login",
  "table.code": "Code",
  "table.nameEn": "English Name",
  "table.nameZh": "Chinese Name",
  "table.permissions": "Permissions",
  "empty.users": "No users yet.",
  "empty.roles": "No roles yet.",
  "singular.user": "User",
  "singular.role": "Role",
  "toast.userStatusUpdated": "User status updated.",
  "toast.passwordReset": "Password reset.",
  "prompt.newPassword": "Enter a new password, at least 8 characters.",
  "form.account": "Account",
  "form.profile": "Profile",
  "form.access": "Access",
  "form.roleCore": "Role",
  "form.roleDescription": "Description",
  "form.permissions": "Permissions",
});

Object.assign(adminTranslations.zh, {
  "login.stageEyebrow": "出口管理",
  "login.stageTitle": "从工厂到全球",
  "login.stageText": "在一个工作台管理整车、汽车零配件、客户询盘和 AI 操作日志。",
  "login.metricVehicles": "商品目录",
  "login.metricParts": "库存",
  "login.metricInquiries": "询盘",
  "login.subtitle": "登录后管理可出口商品和客户需求。",
  "login.usernamePlaceholder": "请输入用户名",
  "login.passwordPlaceholder": "请输入密码",
  "nav.groupCommerce": "业务运营",
  "nav.groupSystem": "系统管理",
  "nav.groupInventory": "商品与库存",
  "nav.groupCustomers": "客户运营",
  "nav.groupAiTools": "AI工具",
  "nav.groupTools": "工具与系统",
  "workspace.subtitle": "集中管理整车和汽车零配件出口业务。",
  "workspace.account": "当前账号",
  "workspace.status": "控制台日期",
  "workspace.welcome": "欢迎登录",
  "workspace.exportDesk": "今日出口工作台",
  "workspace.ipAddress": "IP 地址",
  "metric.vehiclesHint": "整车出口商品记录",
  "metric.partsHint": "零配件库存记录",
  "metric.inquiriesHint": "客户询盘流程",
  "metric.aiLogsHint": "可追踪的 AI 操作",
  "dashboard.heroEyebrow": "实时运营",
  "dashboard.heroTitle": "汽车出口业务指挥中心",
  "dashboard.heroText": "集中处理可出口库存、新询盘、待跟进事项和辅助动作，快速判断今天该优先推进什么。",
  "dashboard.viewInquiries": "查看询盘",
  "dashboard.viewAllInquiries": "查看全部",
  "dashboard.createQuote": "创建报价",
  "dashboard.live": "实时",
  "dashboard.localTime": "本地时间",
  "dashboard.snapshotEyebrow": "库存",
  "dashboard.catalogTitle": "库存健康度",
  "dashboard.catalogHint": "可销售库存质量评分和关键瓶颈。",
  "dashboard.pipelineEyebrow": "管线",
  "dashboard.inquiryTitle": "最新询盘",
  "dashboard.inquiryHint": "汇总买家需求，便于快速分流处理。",
  "dashboard.activityEyebrow": "实时",
  "dashboard.activityTitle": "实时动态",
  "dashboard.actionEyebrow": "今日待办",
  "dashboard.todoTitle": "今日待办",
  "dashboard.todoHint": "今天出口工作台应优先处理的事项。",
  "dashboard.tableSegment": "模块",
  "dashboard.tableTotal": "总数",
  "dashboard.tableReady": "可用",
  "dashboard.tableTop": "主要类别",
  "dashboard.tableBuyer": "买家",
  "dashboard.tableRequest": "需求",
  "dashboard.metricTotalInventory": "总库存",
  "dashboard.metricSaleableInventory": "可销售库存",
  "dashboard.metricAvailableVehicles": "可用整车",
  "dashboard.metricNewInquiries": "新询盘",
  "dashboard.metricPendingFollowups": "待跟进",
  "dashboard.metricPendingItems": "待处理事项",
  "dashboard.metricAiActions": "AI 动作",
  "dashboard.inventoryIssues": "库存问题",
  "dashboard.subExportReady": "{count} 台可出口",
  "dashboard.subCatalogueRecords": "{count} 条商品记录",
  "dashboard.subSaleable": "{count} 条可销售",
  "dashboard.saleableZeroHint": "需要检查车辆状态、价格或发布设置。",
  "dashboard.subToday": "今日 {count}",
  "dashboard.subWaiting": "{count} 条等待处理",
  "dashboard.subNeedAction": "{count} 条需处理",
  "dashboard.healthTotal": "总数",
  "dashboard.healthAvailable": "可用",
  "dashboard.healthMissingPrice": "缺少价格",
  "dashboard.healthMissingImages": "缺少图片",
  "dashboard.healthUnpublished": "未发布官网",
  "dashboard.healthIncomplete": "信息不完整",
  "dashboard.healthTotalHint": "整车和零配件",
  "dashboard.healthAvailableHint": "状态、价格和发布均可用",
  "dashboard.healthMissingPriceHint": "需要商务补全",
  "dashboard.healthMissingImagesHint": "需要展示素材",
  "dashboard.healthUnpublishedHint": "官网不可见",
  "dashboard.healthIncompleteHint": "必填信息缺失",
  "dashboard.aiDiagnosis": "AI 诊断建议",
  "dashboard.healthScoreTitle": "库存健康评分",
  "dashboard.diagnosisNoSaleable": "当前库存可销售数量为 0。",
  "dashboard.diagnosisSaleable": "当前有 {count} 条库存可销售。",
  "dashboard.diagnosisMissingPrice": "建议优先补全缺少价格的车辆。",
  "dashboard.diagnosisStatusCheck": "检查车辆是否设置为可出口/可销售状态并发布官网。",
  "dashboard.view": "查看",
  "dashboard.followUp": "跟进",
  "dashboard.markValid": "标记有效",
  "dashboard.addFollowup": "添加跟进",
  "dashboard.actionReviewInventory": "查看库存",
  "dashboard.actionFixInventory": "检查销售状态",
  "dashboard.actionOpenPipeline": "打开询盘",
  "dashboard.actionResolveNow": "立即处理",
  "dashboard.actionReviewAi": "查看日志",
  "dashboard.todoMissingPrice": "缺少价格的车辆",
  "dashboard.todoMissingImages": "缺少图片的车辆",
  "dashboard.todoNewInquiries": "新询盘",
  "dashboard.todoPendingCustomers": "待跟进客户",
  "dashboard.todoAiSuggestions": "AI 建议处理事项",
  "dashboard.handleNow": "处理",
  "dashboard.segmentVehicles": "整车",
  "dashboard.segmentParts": "零配件",
  "dashboard.segmentInquiries": "询盘",
  "dashboard.segmentAiLogs": "AI 日志",
  "dashboard.readyVehicles": "现货/可出口",
  "dashboard.readyParts": "现货/可出口",
  "dashboard.openInquiries": "待跟进",
  "dashboard.todayLogs": "今日",
  "dashboard.noData": "暂无数据。",
  "dashboard.focusCatalog": "当前有 {count} 条商品可用于出口展示。",
  "dashboard.focusInquiry": "有 {count} 条开放询盘需要跟进。",
  "dashboard.focusAi": "已记录 {count} 条可追踪 AI 动作。",
  "dashboard.opsEyebrow": "运营",
  "dashboard.controlEyebrow": "控制中心",
  "dashboard.opsTitle": "管理重点",
  "dashboard.ops1": "录入商品前，先同步品牌、车型、颜色等字典。",
  "dashboard.ops2": "每次更新商品目录后，及时查看客户询盘。",
  "dashboard.ops3": "使用自动内容或导入动作后，检查 AI 日志。",
  "vehicles.hint": "维护整车记录、价格、库存和图片。",
  "parts.hint": "维护零配件分类、OE 编号、适配车型和库存。",
  "inquiries.hint": "跟进官网表单提交的客户需求。",
  "settings.hint": "维护品牌、车型、颜色等中英文字典。",
  "aiLogs.hint": "查看自动化动作和内容生成痕迹。",
  "nav.users": "用户管理",
  "nav.roles": "权限角色",
  "users.title": "用户管理",
  "users.hint": "创建后台账号、分配角色并控制账号启停。",
  "users.add": "新增用户",
  "roles.title": "权限角色",
  "roles.hint": "定义后台角色，并分配可操作的权限范围。",
  "roles.add": "新增角色",
  "roles.permissionCount": "{count} 项权限",
  "action.saveUser": "保存用户",
  "action.saveRole": "保存角色",
  "action.enable": "启用",
  "action.disable": "停用",
  "action.resetPassword": "重置密码",
  "table.username": "用户名",
  "table.roles": "角色",
  "table.lastLogin": "最后登录",
  "table.code": "编码",
  "table.nameEn": "英文名称",
  "table.nameZh": "中文名称",
  "table.permissions": "权限",
  "empty.users": "暂无用户。",
  "empty.roles": "暂无角色。",
  "singular.user": "用户",
  "singular.role": "角色",
  "toast.userStatusUpdated": "用户状态已更新。",
  "toast.passwordReset": "密码已重置。",
  "prompt.newPassword": "请输入新密码，至少 8 位。",
  "form.account": "账号",
  "form.profile": "资料",
  "form.access": "权限分配",
  "form.roleCore": "角色",
  "form.roleDescription": "描述",
  "form.permissions": "权限范围",
});

Object.assign(adminTranslations.en, {
  "nav.usedVehicles": "Used Cars",
  "usedVehicles.data": "Used Car Data",
  "usedVehicles.hint": "Maintain inspected used car stock, mileage, condition notes and export pricing.",
  "action.addUsedVehicle": "Add Used Car",
  "action.saveUsedVehicle": "Save Used Car",
  "empty.usedVehicles": "No used cars yet.",
  "filter.searchUsedVehicles": "Search SKU, brand, model...",
  "singular.usedVehicle": "Used Car",
  "form.usedVehicle": "Used Car Details",
});

Object.assign(adminTranslations.zh, {
  "nav.usedVehicles": "二手车管理",
  "usedVehicles.data": "二手车数据",
  "usedVehicles.hint": "维护已检二手车车源、里程、车况说明和出口价格。",
  "action.addUsedVehicle": "新增二手车",
  "action.saveUsedVehicle": "保存二手车",
  "empty.usedVehicles": "暂无二手车数据。",
  "filter.searchUsedVehicles": "搜索 SKU、品牌、车型...",
  "singular.usedVehicle": "二手车",
  "form.usedVehicle": "二手车信息",
});

Object.assign(fieldTranslations.zh, {
  New: "新车",
  Used: "二手车",
  "Registration Date": "上牌日期",
  "Ownership Status": "产权/手续状态",
  "Current Location": "当前所在地",
  "Emission Standard": "排放标准",
  "Inspection Report": "检测报告",
  "Accident Note": "事故说明",
});

Object.assign(columnTranslations.zh, {
  mileage: "里程",
  registration_date: "上牌日期",
  ownership_status: "产权/手续",
  location: "所在地",
  emission_standard: "排放标准",
});

const logValueTranslations = {
  en: {
    modules: {
      auth: "Auth",
      vehicles: "Vehicles",
      parts: "Auto Parts",
      dictionaries: "Settings",
      inquiries: "Inquiries",
      uploads: "Uploads",
      adminUsers: "Users",
      adminRoles: "Roles",
    },
    actions: {
      login: "Login",
      login_failed: "Login Failed",
      create: "Create",
      update: "Update",
      delete: "Delete",
      import: "Import",
      upload_image: "Upload Image",
      update_status: "Update Status",
      reset_password: "Reset Password",
      enable: "Enable",
      disable: "Disable",
    },
    sources: {
      admin: "Admin",
      website: "Website",
      system: "System",
    },
    statuses: {
      success: "Success",
      failed: "Failed",
    },
  },
  zh: {
    modules: {
      auth: "登录认证",
      vehicles: "整车",
      parts: "零配件",
      dictionaries: "设置",
      inquiries: "询盘",
      uploads: "图片上传",
      adminUsers: "用户管理",
      adminRoles: "权限角色",
    },
    actions: {
      login: "登录",
      login_failed: "登录失败",
      create: "新增",
      update: "编辑",
      delete: "删除",
      import: "导入",
      upload_image: "上传图片",
      update_status: "更新状态",
      reset_password: "重置密码",
      enable: "启用",
      disable: "停用",
    },
    sources: {
      admin: "后台",
      website: "官网",
      system: "系统",
    },
    statuses: {
      success: "成功",
      failed: "失败",
    },
  },
};

const state = {
  token: localStorage.getItem("admin_token") || "",
  lang: localStorage.getItem("admin_lang") === "zh" ? "zh" : "en",
  view: "dashboard",
  editing: {
    vehicles: null,
    usedVehicles: null,
    parts: null,
    dictionaries: null,
    adminUsers: null,
    adminRoles: null,
  },
  drawerType: "",
  dictionaryType: "brands",
  filters: {
    vehicles: {
      query: "",
      energy_type: "",
      vehicle_type: "",
      stock_status: "",
    },
    usedVehicles: {
      query: "",
      energy_type: "",
      vehicle_type: "",
      stock_status: "",
    },
    parts: {
      query: "",
      category: "",
      stock_status: "",
    },
  },
  data: {
    vehicles: [],
    parts: [],
    inquiries: [],
    dictionaries: [],
    aiLogs: [],
    searchTasks: [],
    leads: [],
    crawlResults: [],
    adminUsers: [],
    adminRoles: [],
  },
  aiMaintenance: {
    operations: [],
    lastPreview: null,
  },
  leadCrawler: {
    running: false,
    taskId: "",
    taskLabel: "",
    step: -1,
    startedAt: 0,
    result: null,
    error: "",
    timer: null,
  },
  permissions: [],
  session: {
    username: "admin",
    ip: "--",
    permissions: null,
    roles: [],
  },
};

const loginScreen = document.querySelector("[data-login-screen]");
const adminApp = document.querySelector("[data-admin-app]");
const loginForm = document.querySelector("[data-login-form]");
const toast = document.querySelector("[data-toast]");
const currentDate = document.querySelector("[data-current-date]");
const welcomeUser = document.querySelector("[data-welcome-user]");
const clientIp = document.querySelector("[data-client-ip]");
const recordDrawer = document.querySelector("[data-record-drawer]");
const recordForm = document.querySelector("[data-record-form]");
const recordFields = document.querySelector("[data-fields]");
const editorTitle = document.querySelector("[data-editor-title]");
const saveRecordButton = document.querySelector("[data-save-record]");
const aiMaintenanceForm = document.querySelector("[data-ai-maintenance-form]");
const aiMaintenanceResult = document.querySelector("[data-ai-maintenance-result]");
const aiMaintenanceSummary = document.querySelector("[data-ai-maintenance-summary]");
const aiMaintenanceMeta = document.querySelector("[data-ai-maintenance-meta]");
const aiMaintenanceWarnings = document.querySelector("[data-ai-maintenance-warnings]");
const aiMaintenanceBody = document.querySelector("[data-ai-maintenance-body]");
const aiMaintenanceApplyButton = document.querySelector("[data-ai-maintenance-apply]");
const leadTaskForm = document.querySelector("[data-lead-task-form]");
const crawlResultForm = document.querySelector("[data-crawl-result-form]");

const leadDiscoveryOptions = {
  countries: ["Kenya", "Tanzania", "Ghana", "Nigeria", "UAE", "Saudi Arabia", "Chile", "Peru", "Bolivia"],
  target_vehicles: ["Tractor Head", "Dump Truck", "Cargo Truck", "Bus", "Refrigerated Truck", "Concrete Mixer Truck", "Pickup", "Used Commercial Vehicle", "Electric Truck"],
  customer_types: ["Importer", "Dealer", "Fleet Operator", "Construction Company", "Mining Company", "Logistics Company", "Bus Company", "Government Procurement"],
  purchase_scenarios: ["Logistics", "Mining", "Construction", "Public Transport", "Municipal Service", "Agriculture", "Oil & Gas"],
};

const leadChipState = {
  countries: [],
  target_vehicles: [],
  customer_types: [],
  purchase_scenarios: [],
};

const leadStatuses = ["New", "Needs Verification", "Verified", "Contacted", "Interested", "Quoted", "Rejected", "Invalid"];

const leadProgressSteps = [
  "Searching websites",
  "Extracting company information",
  "Finding contacts",
  "Scoring lead quality",
  "Generating AI profile",
];

const sidebarCollapsedStorageKey = "admin_sidebar_collapsed";
const sidebarGroupStorageKey = "admin_sidebar_groups";
const sidebarGroupViews = {
  inventory: ["vehicles", "usedVehicles", "parts"],
  customers: ["inquiries", "leadDiscovery", "leadPool"],
  ai: ["aiMaintenance", "aiLogs"],
  system: ["users", "roles", "settings"],
};

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
  if (type === "vehicles") {
    return t("singular.vehicle");
  }
  if (type === "usedVehicles") {
    return t("singular.usedVehicle");
  }
  if (type === "parts") {
    return t("singular.part");
  }
  if (type === "adminUsers") {
    return t("singular.user");
  }
  if (type === "adminRoles") {
    return t("singular.role");
  }
  return t("singular.dictionary");
}

function sourceType(type) {
  return schemas[type]?.sourceType || type;
}

function isUsedVehicleRow(row) {
  const condition = String(row?.condition || "").trim().toLowerCase();
  return condition === "used" || condition === "二手" || condition === "二手车";
}

function rowsForType(type) {
  const schema = schemas[type] || {};
  let rows = state.data[sourceType(type)] || [];
  if (schema.conditionFilter === "used") {
    rows = rows.filter(isUsedVehicleRow);
  }
  return rows;
}

function fixedValuesForType(type) {
  return schemas[type]?.fixedValues || {};
}

function addActionLabel(type) {
  if (type === "usedVehicles") {
    return t("action.addUsedVehicle");
  }
  if (type === "vehicles") {
    return t("action.addVehicle");
  }
  return t("action.addPart");
}

function saveActionLabel(type) {
  if (type === "usedVehicles") {
    return t("action.saveUsedVehicle");
  }
  if (type === "vehicles") {
    return t("action.saveVehicle");
  }
  if (type === "parts") {
    return t("action.savePart");
  }
  if (type === "adminUsers") {
    return t("action.saveUser");
  }
  if (type === "adminRoles") {
    return t("action.saveRole");
  }
  return t("action.saveDictionary");
}

function emptyKeyForType(type) {
  if (type === "usedVehicles") {
    return "empty.usedVehicles";
  }
  return type === "vehicles" ? "empty.vehicles" : "empty.parts";
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

function parseTime(value) {
  const time = Date.parse(value || "");
  return Number.isFinite(time) ? time : 0;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function countBy(rows, field) {
  const counts = new Map();
  rows.forEach((row) => {
    const value = String(row[field] || "").trim();
    if (value) {
      counts.set(value, (counts.get(value) || 0) + 1);
    }
  });
  return counts;
}

function topValueLabel(rows, field, dictionaryType = "") {
  const [value, count] = [...countBy(rows, field).entries()].sort((a, b) => b[1] - a[1])[0] || [];
  if (!value) {
    return "--";
  }
  const label = dictionaryType ? dictionaryLabel(dictionaryType, value) : value;
  return `${label} · ${count}`;
}

function normalizedToken(value) {
  return String(value || "").trim().toLowerCase().replace(/[\s_-]+/g, "");
}

function isReadyStock(row) {
  return new Set(["readyexport", "instock", "limitedstock", "available", "ready", "sellable", "onsale", "现货", "可出口", "可销售"]).has(normalizedToken(row.stock_status));
}

function isPublished(row) {
  return new Set(["published", "publish", "live", "online", "active", "yes", "true", "1", "已发布", "上架"]).has(normalizedToken(row.publish_status));
}

function isExplicitlyUnpublished(row) {
  return new Set(["unpublished", "hidden", "offline", "draft", "disabled", "no", "false", "0", "未发布", "下架", "草稿"]).has(normalizedToken(row.publish_status));
}

function hasPrice(row) {
  return !hasMissingPrice(row);
}

function isSaleableInventory(row) {
  return isReadyStock(row) && hasPrice(row) && !isExplicitlyUnpublished(row);
}

function isIncompleteRecord(row) {
  const fields = row.oe_numbers || row.category ? ["sku", "category", "name", "oe_numbers", "stock_status"] : ["sku", "brand", "model", "year", "vehicle_type", "energy_type", "stock_status"];
  return fields.some((field) => !String(row[field] || "").trim());
}

function dashboardInventory() {
  return state.data.vehicles || [];
}

function inventoryStats() {
  const inventory = dashboardInventory();
  const total = inventory.length;
  const saleable = inventory.filter(isSaleableInventory).length;
  const missingPrice = inventory.filter(hasMissingPrice).length;
  const missingImages = inventory.filter(hasMissingImages).length;
  const unpublished = inventory.filter((row) => !isPublished(row)).length;
  const incomplete = inventory.filter(isIncompleteRecord).length;
  const priceScore = total ? ((total - missingPrice) / total) * 20 : 0;
  const imageScore = total ? ((total - missingImages) / total) * 15 : 0;
  const publishScore = total ? ((total - unpublished) / total) * 15 : 0;
  const completeScore = total ? ((total - incomplete) / total) * 10 : 0;
  const saleableScore = total ? (saleable / total) * 40 : 0;
  const score = total ? Math.max(0, Math.min(100, Math.round(saleableScore + priceScore + imageScore + publishScore + completeScore))) : 0;

  return { total, saleable, missingPrice, missingImages, unpublished, incomplete, score };
}

function inventoryIssueCount() {
  return dashboardInventory().filter((row) => hasMissingPrice(row) || hasMissingImages(row) || !isPublished(row) || isIncompleteRecord(row)).length;
}

function openInquiryCount() {
  return (state.data.inquiries || []).filter((row) => !["Won", "Lost", "Invalid"].includes(String(row.status || ""))).length;
}

function newInquiryCount() {
  return (state.data.inquiries || []).filter((row) => String(row.status || "New") === "New").length;
}

function pendingFollowupCount() {
  return (state.data.inquiries || []).filter((row) => ["Contacted", "Negotiating"].includes(String(row.status || "New"))).length;
}

function isToday(value) {
  return String(value || "").slice(0, 10) === todayKey();
}

function hasMissingPrice(row) {
  return !String(row.price_min || "").trim() && !String(row.price_max || "").trim();
}

function hasMissingImages(row) {
  return !String(row.images || "").trim();
}

function summarizeText(value, maxLength = 110) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) {
    return text || "--";
  }
  return `${text.slice(0, maxLength - 1)}...`;
}

function updateMetric(selector, value) {
  const node = document.querySelector(selector);
  if (node) {
    node.textContent = String(value);
  }
}

function updateMetricSub(selector, value) {
  const node = document.querySelector(selector);
  if (node) {
    node.textContent = value;
  }
}

function renderDashboardMetrics() {
  const inquiries = state.data.inquiries || [];
  const aiLogs = state.data.aiLogs || [];
  const todayInquiries = inquiries.filter((row) => isToday(row.created_at)).length;
  const todayAiLogs = aiLogs.filter((row) => isToday(row.created_at)).length;
  const stats = inventoryStats();
  const pendingItems = inventoryIssueCount() + newInquiryCount() + pendingFollowupCount() + todayAiLogs;
  const saleableCard = document.querySelector("[data-saleable-card]");

  updateMetric("[data-metric-total-inventory]", stats.total);
  updateMetricSub("[data-metric-total-inventory-sub]", t("dashboard.subCatalogueRecords", { count: stats.total }));
  updateMetric("[data-metric-saleable-inventory]", stats.saleable);
  updateMetricSub(
    "[data-metric-saleable-inventory-sub]",
    stats.saleable ? t("dashboard.subSaleable", { count: stats.saleable }) : t("dashboard.saleableZeroHint"),
  );
  saleableCard?.classList.toggle("metric-card-warning", stats.saleable === 0 && stats.total > 0);
  updateMetric("[data-metric-new-inquiries]", newInquiryCount());
  updateMetricSub("[data-metric-new-inquiries-sub]", t("dashboard.subToday", { count: todayInquiries }));
  updateMetric("[data-metric-pending-items]", pendingItems);
  updateMetricSub("[data-metric-pending-items-sub]", t("dashboard.subNeedAction", { count: pendingItems }));
  updateMetric("[data-metric-ai-actions]", aiLogs.length);
  updateMetricSub("[data-metric-ai-actions-sub]", t("dashboard.subToday", { count: todayAiLogs }));
}

function setDashboardClock() {
  const node = document.querySelector("[data-dashboard-clock]");
  if (node) {
    node.textContent = new Date().toLocaleTimeString(state.lang === "zh" ? "zh-CN" : "en-US", { hour12: false });
  }
}

function renderDashboardCatalog() {
  const body = document.querySelector("[data-dashboard-catalog-body]");
  if (!body) {
    return;
  }

  const stats = inventoryStats();
  const rows = [
    {
      label: t("dashboard.healthTotal"),
      value: stats.total,
      hint: t("dashboard.healthTotalHint"),
      tone: "neutral",
    },
    {
      label: t("dashboard.healthAvailable"),
      value: stats.saleable,
      hint: t("dashboard.healthAvailableHint"),
      tone: stats.saleable ? "good" : "danger",
    },
    {
      label: t("dashboard.healthMissingPrice"),
      value: stats.missingPrice,
      hint: t("dashboard.healthMissingPriceHint"),
      tone: "warning",
    },
    {
      label: t("dashboard.healthMissingImages"),
      value: stats.missingImages,
      hint: t("dashboard.healthMissingImagesHint"),
      tone: "danger",
    },
    {
      label: t("dashboard.healthUnpublished"),
      value: stats.unpublished,
      hint: t("dashboard.healthUnpublishedHint"),
      tone: "warning",
    },
    {
      label: t("dashboard.healthIncomplete"),
      value: stats.incomplete,
      hint: t("dashboard.healthIncompleteHint"),
      tone: "warning",
    },
  ];

  body.innerHTML = rows
    .map((row) => `
        <div class="inventory-health-card inventory-health-${escapeHtml(row.tone)}" data-dashboard-view="vehicles">
          <span>${escapeHtml(row.label)}</span>
          <strong>${escapeHtml(row.value)}</strong>
          <small>${escapeHtml(row.hint)}</small>
        </div>
      `)
    .join("");

  body.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="inventory-score-card">
        <div class="inventory-score-ring" style="--score: ${escapeHtml(stats.score)}%"><strong>${escapeHtml(stats.score)}</strong><span>/100</span></div>
        <div>
          <span class="eyebrow">${escapeHtml(t("dashboard.aiDiagnosis"))}</span>
          <h3>${escapeHtml(t("dashboard.healthScoreTitle"))}</h3>
          <ul class="ai-diagnosis-list">
            <li>${escapeHtml(stats.saleable === 0 ? t("dashboard.diagnosisNoSaleable") : t("dashboard.diagnosisSaleable", { count: stats.saleable }))}</li>
            <li>${escapeHtml(t("dashboard.diagnosisMissingPrice"))}</li>
            <li>${escapeHtml(t("dashboard.diagnosisStatusCheck"))}</li>
          </ul>
        </div>
      </div>
    `,
  );
}

function renderDashboardInquiries() {
  const body = document.querySelector("[data-dashboard-inquiry-body]");
  if (!body) {
    return;
  }

  const rows = [...(state.data.inquiries || [])].sort((a, b) => parseTime(b.created_at) - parseTime(a.created_at)).slice(0, 5);
  if (!rows.length) {
    body.innerHTML = `<div class="dashboard-empty-card">${escapeHtml(t("dashboard.noData"))}</div>`;
    return;
  }

  body.innerHTML = rows
    .map(
      (row) => `
        <article class="inquiry-card">
          <div class="inquiry-card-main">
            <div class="inquiry-card-head">
              <div>
                <strong>${escapeHtml(row.name || row.email || "--")}</strong>
                <span>${escapeHtml(row.source || "Website Form")}</span>
              </div>
              <span class="status-pill status-${statusClass(row.status)}">${escapeHtml(statusText(row.status || "New"))}</span>
            </div>
            <details class="inquiry-summary">
              <summary>${escapeHtml(summarizeText(row.message || row.product_type || "--", 128))}</summary>
              <p>${escapeHtml(row.message || row.product_type || "--")}</p>
            </details>
            <small>${escapeHtml(formatDateTime(row.created_at) || "--")}</small>
          </div>
          <div class="inquiry-card-actions">
            <button class="secondary-button" type="button" data-dashboard-view="inquiries">${escapeHtml(t("dashboard.view"))}</button>
            <button class="secondary-button" type="button" data-dashboard-inquiry-valid="${escapeHtml(row.id)}">${escapeHtml(t("dashboard.markValid"))}</button>
            ${row.email ? `<a class="secondary-button" href="mailto:${escapeHtml(row.email)}">${escapeHtml(t("dashboard.addFollowup"))}</a>` : `<button class="secondary-button" type="button" data-dashboard-view="inquiries">${escapeHtml(t("dashboard.addFollowup"))}</button>`}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderDashboardHeroSummary() {
  const body = document.querySelector("[data-dashboard-hero-summary]");
  if (!body) {
    return;
  }
  const stats = inventoryStats();
  const inventoryIssues = inventoryIssueCount();
  const rows = [
    [t("dashboard.metricNewInquiries"), newInquiryCount()],
    [t("dashboard.metricPendingFollowups"), pendingFollowupCount()],
    [t("dashboard.inventoryIssues"), inventoryIssues],
    [t("dashboard.metricSaleableInventory"), stats.saleable],
  ];
  body.innerHTML = rows
    .map(([label, value]) => `<div><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`)
    .join("");
}

function renderDashboardTodos() {
  const body = document.querySelector("[data-dashboard-todos]");
  if (!body) {
    return;
  }
  const vehicles = state.data.vehicles || [];
  const aiLogs = state.data.aiLogs || [];
  const todayAiLogs = aiLogs.filter((row) => isToday(row.created_at)).length;
  const rows = [
    { label: t("dashboard.todoMissingPrice"), count: vehicles.filter(hasMissingPrice).length, view: "vehicles", tone: "warning" },
    { label: t("dashboard.todoMissingImages"), count: vehicles.filter(hasMissingImages).length, view: "vehicles", tone: "danger" },
    { label: t("dashboard.todoNewInquiries"), count: newInquiryCount(), view: "inquiries", tone: "info" },
    { label: t("dashboard.todoPendingCustomers"), count: pendingFollowupCount(), view: "inquiries", tone: "warning" },
    { label: t("dashboard.todoAiSuggestions"), count: todayAiLogs, view: "aiLogs", tone: "info" },
  ];

  body.innerHTML = rows
    .map(
      (row) => `
        <button class="todo-item todo-${escapeHtml(row.tone)}" type="button" data-dashboard-view="${escapeHtml(row.view)}">
          <span>${escapeHtml(row.label)}</span>
          <strong>${escapeHtml(row.count)}</strong>
          <em>${escapeHtml(t("dashboard.handleNow"))}</em>
        </button>
      `,
    )
    .join("");
}

function renderDashboardFocus() {
  const body = document.querySelector("[data-dashboard-focus]");
  if (!body) {
    return;
  }

  const catalogueCount = (state.data.vehicles || []).length + (state.data.parts || []).length;
  const items = [
    t("dashboard.focusCatalog", { count: catalogueCount }),
    t("dashboard.focusInquiry", { count: openInquiryCount() }),
    t("dashboard.focusAi", { count: (state.data.aiLogs || []).length }),
  ];
  body.innerHTML = items.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
}

function activityLabel(item) {
  if (item.kind === "inquiry") {
    return `${t("dashboard.segmentInquiries")} · ${item.title}`;
  }
  if (item.kind === "vehicle") {
    return `${t("dashboard.segmentVehicles")} · ${item.title}`;
  }
  if (item.kind === "part") {
    return `${t("dashboard.segmentParts")} · ${item.title}`;
  }
  return `${t("dashboard.segmentAiLogs")} · ${item.title}`;
}

function renderDashboardActivity() {
  const body = document.querySelector("[data-dashboard-activity]");
  if (!body) {
    return;
  }

  const activities = [
    ...(state.data.inquiries || []).map((row) => ({
      kind: "inquiry",
      title: row.name || row.email || row.country || "Inquiry",
      detail: row.message || row.source || "",
      time: row.created_at,
    })),
    ...(state.data.aiLogs || []).map((row) => ({
      kind: "ai",
      title: `${row.module || "AI"} / ${row.action || ""}`,
      detail: row.detail || row.target_label || "",
      time: row.created_at,
    })),
    ...(state.data.vehicles || []).map((row) => ({
      kind: "vehicle",
      title: row.title_zh || row.title_en || row.sku || "Vehicle",
      detail: row.sku || "",
      time: row.updated_at || row.created_at,
    })),
    ...(state.data.parts || []).map((row) => ({
      kind: "part",
      title: row.title_zh || row.title_en || row.name || row.sku || "Part",
      detail: row.sku || row.oe_numbers || "",
      time: row.updated_at || row.created_at,
    })),
  ]
    .filter((item) => parseTime(item.time))
    .sort((a, b) => parseTime(b.time) - parseTime(a.time))
    .slice(0, 8);

  if (!activities.length) {
    body.innerHTML = `<div class="dashboard-activity-empty">${escapeHtml(t("dashboard.noData"))}</div>`;
    return;
  }

  body.innerHTML = activities
    .map(
      (item) => `
        <div class="dashboard-activity-item">
          <span class="dashboard-activity-dot"></span>
          <div>
            <strong>${escapeHtml(activityLabel(item))}</strong>
            <small>${escapeHtml(formatDateTime(item.time))}${item.detail ? ` · ${escapeHtml(String(item.detail).slice(0, 90))}` : ""}</small>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderDashboard() {
  setDashboardClock();
  renderDashboardMetrics();
  renderDashboardHeroSummary();
  renderDashboardTodos();
  renderDashboardCatalog();
  renderDashboardInquiries();
  renderDashboardFocus();
  renderDashboardActivity();
}

function applyLanguage() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.title = t("meta.title");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
    button.textContent = state.lang === "zh" ? "English" : "中文";
  });
  renderChrome();
  switchView(state.view);
  if (state.drawerType && recordDrawer.getAttribute("aria-hidden") === "false") {
    renderFields(state.drawerType, state.editing[state.drawerType] ? findRecord(state.drawerType, state.editing[state.drawerType]) || {} : {});
  }
  renderFilterOptions();
  renderTable("vehicles");
  renderTable("usedVehicles");
  renderTable("parts");
  renderDictionaryTable();
  renderInquiries();
  renderAiLogs();
  renderLeadDiscovery();
  renderDashboard();
  renderAiMaintenanceResult();
  renderUsers();
  renderRoles();
}

function renderChrome() {
  if (currentDate) {
    currentDate.textContent = new Intl.DateTimeFormat(state.lang === "zh" ? "zh-CN" : "en", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date());
  }
  renderSessionInfo();
  renderDictionaryTabs();
}

function renderSessionInfo() {
  if (welcomeUser) {
    welcomeUser.textContent = state.session.username || "admin";
  }
  if (clientIp) {
    clientIp.textContent = state.session.ip || "--";
  }
}

async function loadSessionInfo() {
  const result = await api("/api/admin/session");
  state.session = {
    username: result.user?.username || state.session.username || "admin",
    ip: result.ip || "--",
    permissions: result.permissions || [],
    roles: result.roles || result.user?.roles || [],
  };
  state.permissions = result.permissionCatalog || state.permissions || [];
  renderSessionInfo();
}

function renderDictionaryTabs() {
  const tabs = document.querySelector("[data-dictionary-tabs]");
  const select = document.querySelector("[data-dictionary-type]");
  if (!tabs || !select) {
    return;
  }

  select.value = state.dictionaryType;
  tabs.innerHTML = dictionaryTypeOptions
    .map(([value]) => {
      const active = value === state.dictionaryType ? " active" : "";
      return `<button class="${active.trim()}" type="button" data-dictionary-tab="${value}">${escapeHtml(dictionaryTypeLabel(value))}</button>`;
    })
    .join("");
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
    const error = new Error(payload.error || (payload.errors ? payload.errors.join("; ") : "Request failed"));
    error.status = response.status;
    throw error;
  }

  return payload;
}

function can(permission) {
  if (!permission) {
    return true;
  }
  const permissions = state.session.permissions;
  if (!Array.isArray(permissions)) {
    return true;
  }
  return permissions.includes(permission);
}

async function apiIfAllowed(path, permission, fallback = { items: [] }) {
  if (!can(permission)) {
    return fallback;
  }
  try {
    return await api(path);
  } catch (error) {
    if (error.status === 403) {
      return fallback;
    }
    throw error;
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function setAuthenticated(token, session = {}) {
  state.token = token;
  state.session = {
    username: session.user?.username || session.username || state.session.username || "admin",
    ip: session.ip || state.session.ip || "--",
    permissions: Array.isArray(session.permissions) ? session.permissions : state.session.permissions,
    roles: session.roles || session.user?.roles || state.session.roles || [],
  };
  renderSessionInfo();
  localStorage.setItem("admin_token", token);
  loginScreen.hidden = true;
  adminApp.hidden = false;
}

function logout() {
  state.token = "";
  state.session = { username: "admin", ip: "--", permissions: null, roles: [] };
  renderSessionInfo();
  localStorage.removeItem("admin_token");
  loginScreen.hidden = false;
  adminApp.hidden = true;
}

function readSidebarGroupState() {
  try {
    return JSON.parse(localStorage.getItem(sidebarGroupStorageKey) || "{}") || {};
  } catch {
    return {};
  }
}

function writeSidebarGroupState(groups) {
  localStorage.setItem(sidebarGroupStorageKey, JSON.stringify(groups));
}

function setSidebarCollapsed(collapsed) {
  const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
  adminApp?.classList.toggle("sidebar-collapsed", collapsed);
  localStorage.setItem(sidebarCollapsedStorageKey, String(collapsed));
  if (sidebarToggle) {
    sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
    sidebarToggle.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
  }
}

function sidebarGroupForView(view) {
  return Object.entries(sidebarGroupViews).find(([, views]) => views.includes(view))?.[0] || "";
}

function renderSidebarGroups() {
  const storedGroups = readSidebarGroupState();
  const currentGroup = sidebarGroupForView(state.view);
  document.querySelectorAll("[data-nav-group]").forEach((group) => {
    const groupName = group.dataset.navGroup;
    const isCurrentGroup = groupName === currentGroup;
    const expanded = isCurrentGroup || storedGroups[groupName] === true;
    const items = group.querySelector(".nav-submenu-items");
    const toggle = group.querySelector("[data-nav-toggle]");

    group.classList.toggle("expanded", expanded);
    group.classList.toggle("has-active", isCurrentGroup);
    if (items) {
      items.hidden = !expanded;
    }
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(expanded));
    }
  });
}

function switchView(view) {
  state.view = view;
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.viewPanel !== view;
  });
  renderSidebarGroups();
}

function renderMetrics() {
  renderDashboard();
}

function getFilteredRows(type) {
  const filters = state.filters[type];
  const query = String(filters.query || "").trim().toLowerCase();
  const baseType = sourceType(type);
  const queryFields =
    baseType === "vehicles"
      ? ["sku", "brand", "model", "title_en", "title_zh", "vehicle_type", "energy_type"]
      : ["sku", "name", "title_en", "title_zh", "oe_numbers", "applicable_brand", "applicable_model", "category"];

  return rowsForType(type).filter((row) => {
    const matchesQuery =
      !query ||
      queryFields.some((field) => {
        const rawValue = String(row[field] || "").toLowerCase();
        const displayValue = String(formatCell(type, field, row[field], row) || "").toLowerCase();
        return rawValue.includes(query) || displayValue.includes(query);
      });

    if (!matchesQuery) {
      return false;
    }

    return Object.entries(filters).every(([field, value]) => {
      if (field === "query" || !value) {
        return true;
      }
      return String(row[field] || "") === value;
    });
  });
}

function dictionaryTypeLabel(type) {
  return t(dictionaryTypeLabelKeys[type] || type);
}

function localizedDictionaryName(row) {
  if (!row) {
    return "";
  }
  return state.lang === "zh" ? row.name_zh || row.name_en || row.code : row.name_en || row.name_zh || row.code;
}

function findDictionaryItem(type, value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized) {
    return null;
  }
  return (state.data.dictionaries || []).find((row) => {
    if (row.type !== type) {
      return false;
    }
    return [row.code, row.name_en, row.name_zh].some((candidate) => String(candidate || "").trim().toLowerCase() === normalized);
  });
}

function dictionaryCode(type, value) {
  const row = findDictionaryItem(type, value);
  return row ? row.code : String(value || "").trim();
}

function dictionaryLabel(type, value) {
  const row = findDictionaryItem(type, value);
  return row ? localizedDictionaryName(row) : value || "";
}

function sortedDictionaryRows(rows) {
  return [...rows].sort((a, b) => {
    const orderA = Number(a.sort_order || 0);
    const orderB = Number(b.sort_order || 0);
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return String(a.name_en || a.code || "").localeCompare(String(b.name_en || b.code || ""));
  });
}

function dictionaryItems(type) {
  return sortedDictionaryRows((state.data.dictionaries || []).filter((row) => row.type === type && row.status !== "disabled"));
}

function renderFilterOptions() {
  document.querySelectorAll("[data-filter-records]").forEach((select) => {
    const type = select.dataset.filterRecords;
    const field = select.dataset.filterField;
    const dictionaryType = tableDictionaryFields[type]?.[field];
    if (!dictionaryType) {
      return;
    }
    const currentValue = state.filters[type]?.[field] || "";
    const placeholderKey = filterPlaceholderKeys[type]?.[field] || "select.optional";
    const options = dictionaryItems(dictionaryType);
    select.innerHTML = `
      <option value="">${t(placeholderKey)}</option>
      ${options.map((row) => `<option value="${escapeHtml(row.code)}">${escapeHtml(localizedDictionaryName(row))}</option>`).join("")}
    `;
    select.value = [...select.options].some((option) => option.value === currentValue) ? currentValue : "";
    if (state.filters[type]) {
      state.filters[type][field] = select.value;
    }
  });
}

function optionLabel(option) {
  if (option.labelKey) {
    return t(option.labelKey);
  }
  return fieldLabel(option.label);
}

function normalizeOption(option) {
  if (Array.isArray(option)) {
    return { value: option[0], label: option[1] };
  }
  return option;
}

function getFieldOptions(field, record = {}) {
  let options = [];
  if (field.options) {
    options = field.options.map(normalizeOption);
  } else if (field.dictionaryType) {
    let rows = dictionaryItems(field.dictionaryType);
    if (field.dictionaryType === "models" && field.dependsOn) {
      const parentValue = record[field.dependsOn] || recordForm.querySelector(`[name="${field.dependsOn}"]`)?.value || "";
      const parentCode = dictionaryCode("brands", parentValue);
      if (parentCode) {
        rows = rows.filter((row) => !row.brand_code || dictionaryCode("brands", row.brand_code) === parentCode);
      }
    }
    options = rows.map((row) => ({ value: row.code, label: localizedDictionaryName(row) }));
  }

  const currentValue = String(record[field.name] || "");
  if (currentValue && !options.some((option) => String(option.value) === currentValue)) {
    const fallbackLabel = field.dictionaryType ? dictionaryLabel(field.dictionaryType, currentValue) : currentValue;
    options.unshift({ value: currentValue, label: fallbackLabel });
  }
  return options;
}

function renderSelectOptions(field, record = {}) {
  const value = String(record[field.name] || "");
  const options = getFieldOptions(field, record);
  const placeholder = field.required ? t("select.choose") : t("select.optional");
  return `
    <option value="">${placeholder}</option>
    ${options
      .map(
        (option) =>
          `<option value="${escapeHtml(option.value)}" ${String(option.value) === value ? "selected" : ""}>${escapeHtml(optionLabel(option))}</option>`,
      )
      .join("")}
  `;
}

function renderSelectField(field, record = {}) {
  const required = field.required ? "required" : "";
  return `
    <label>
      <span>${fieldLabel(field.label)}${field.required ? " *" : ""}</span>
      <select name="${field.name}" ${required} ${field.dependsOn ? `data-depends-on="${field.dependsOn}"` : ""}>
        ${renderSelectOptions(field, record)}
      </select>
    </label>
  `;
}

function formatCell(type, column, value) {
  if (type === "dictionaries") {
    if (column === "type") {
      return dictionaryTypeLabel(value);
    }
    if (column === "status") {
      return fieldLabel(value === "disabled" ? "Disabled" : "Active");
    }
    if (column === "brand_code") {
      return dictionaryLabel("brands", value);
    }
  }

  const dictionaryType = tableDictionaryFields[type]?.[column];
  if (dictionaryType) {
    return dictionaryLabel(dictionaryType, value);
  }
  return value || "";
}

function statusClass(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function shouldRenderPill(type, column) {
  return (
    column === "stock_status" ||
    column === "status" ||
    column === "review_status" ||
    column === "publish_status" ||
    column === "energy_type" ||
    (sourceType(type) === "vehicles" && column === "vehicle_type")
  );
}

function renderTableCell(type, column, row) {
  const rawValue = row[column];
  const displayValue = escapeHtml(formatCell(type, column, rawValue, row));
  const className = ["year", "price_min", "price_max", "moq", "sort_order"].includes(column) ? "number-cell" : "";
  const classAttr = className ? ` class="${className}"` : "";

  if (shouldRenderPill(type, column) && displayValue) {
    return `<td${classAttr}><span class="status-pill status-${statusClass(rawValue)}">${displayValue}</span></td>`;
  }
  return `<td${classAttr}>${displayValue}</td>`;
}

function renderReviewActions(type, row) {
  const reviewType = sourceType(type);
  if (!["vehicles", "parts"].includes(reviewType) || row.owner_type !== "supplier" || row.review_status !== "submitted") {
    return "";
  }
  const id = escapeHtml(row.id);
  const escapedType = escapeHtml(reviewType);
  return `
    ${can("product_reviews:approve") ? `<button class="secondary-button" type="button" data-review-action="approve" data-review-type="${escapedType}" data-id="${id}">${t("action.approve")}</button>` : ""}
    ${can("product_reviews:reject") ? `<button class="danger-button" type="button" data-review-action="reject" data-review-type="${escapedType}" data-id="${id}">${t("action.reject")}</button>` : ""}
  `;
}

function renderDictionaryTable() {
  const head = document.querySelector("[data-dictionary-head]");
  const body = document.querySelector("[data-dictionary-body]");
  if (!head || !body) {
    return;
  }

  renderDictionaryTabs();
  const schema = schemas.dictionaries;
  const rows = sortedDictionaryRows((state.data.dictionaries || []).filter((row) => row.type === state.dictionaryType));
  head.innerHTML = `
    <tr>
      ${schema.columns.map((column) => `<th>${columnLabel(column)}</th>`).join("")}
      <th>${t("table.actions")}</th>
    </tr>
  `;

  if (!rows.length) {
    body.innerHTML = `
      <tr>
        <td colspan="${schema.columns.length + 1}">
          <div class="empty-state">
            <strong>${t("empty.dictionaries")}</strong>
            <button class="primary-button" type="button" data-new-dictionary>${t("settings.add")}</button>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  body.innerHTML = rows
    .map(
      (row) => `
        <tr>
          ${schema.columns.map((column) => renderTableCell("dictionaries", column, row)).join("")}
          <td>
            <div class="row-actions">
              <button class="secondary-button" type="button" data-edit="dictionaries" data-id="${escapeHtml(row.id)}">${t("action.edit")}</button>
              <button class="danger-button" type="button" data-delete="dictionaries" data-id="${escapeHtml(row.id)}">${t("action.delete")}</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");
}

function updateVehicleModelOptions(form) {
  if (sourceType(form.dataset.recordForm) !== "vehicles") {
    return;
  }
  const brand = form.querySelector('[name="brand"]')?.value || "";
  const modelSelect = form.querySelector('[name="model"]');
  if (!modelSelect) {
    return;
  }
  const modelField = schemas.vehicles.fields.find((field) => field.name === "model");
  modelSelect.innerHTML = renderSelectOptions(modelField, { brand, model: "" });
  modelSelect.value = "";
}

function applyVehicleModelDefaults(form) {
  if (sourceType(form.dataset.recordForm) !== "vehicles") {
    return;
  }
  const modelValue = form.querySelector('[name="model"]')?.value || "";
  const model = findDictionaryItem("models", modelValue);
  if (!model) {
    return;
  }
  [
    ["vehicle_type", model.vehicle_type],
    ["energy_type", model.energy_type],
  ].forEach(([fieldName, value]) => {
    const input = form.querySelector(`[name="${fieldName}"]`);
    if (input && value) {
      input.value = value;
    }
  });
}

function listValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || "").trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function roleLabel(role = {}) {
  return state.lang === "zh" ? role.name_zh || role.name_en || role.code || "" : role.name_en || role.name_zh || role.code || "";
}

function roleNames(roleIds = []) {
  const ids = new Set(listValue(roleIds));
  return state.data.adminRoles.filter((role) => ids.has(role.id) || ids.has(role.code)).map(roleLabel);
}

function permissionGroupLabel(group = {}) {
  return state.lang === "zh" ? group.label_zh || group.label_en || group.group || "" : group.label_en || group.label_zh || group.group || "";
}

function permissionLabel(permission = {}) {
  return state.lang === "zh" ? permission.label_zh || permission.label_en || permission.code || "" : permission.label_en || permission.label_zh || permission.code || "";
}

function renderRolePicker(field, record = {}) {
  const selected = new Set(listValue(record[field.name]));
  const roles = state.data.adminRoles || [];
  return `
    <div class="field-wide choice-field">
      <span>${fieldLabel(field.label)}${field.required ? " *" : ""}</span>
      <div class="choice-grid">
        ${
          roles.length
            ? roles
                .map(
                  (role) => `
                    <label class="choice-item">
                      <input type="checkbox" name="${field.name}" value="${escapeHtml(role.id)}" ${selected.has(role.id) || selected.has(role.code) ? "checked" : ""} />
                      <span>
                        <strong>${escapeHtml(roleLabel(role))}</strong>
                        <small>${escapeHtml(role.code || "")}</small>
                      </span>
                    </label>
                  `,
                )
                .join("")
            : `<div class="empty-inline">${t("empty.roles")}</div>`
        }
      </div>
    </div>
  `;
}

function renderPermissionMatrix(field, record = {}) {
  const selected = new Set(listValue(record[field.name]));
  return `
    <div class="field-wide permission-field">
      <span>${fieldLabel(field.label)}${field.required ? " *" : ""}</span>
      <div class="permission-matrix">
        ${(state.permissions || [])
          .map(
            (group) => `
              <fieldset>
                <legend>${escapeHtml(permissionGroupLabel(group))}</legend>
                ${(group.permissions || [])
                  .map(
                    (permission) => `
                      <label class="permission-item">
                        <input type="checkbox" name="${field.name}" value="${escapeHtml(permission.code)}" ${selected.has(permission.code) ? "checked" : ""} />
                        <span>${escapeHtml(permissionLabel(permission))}</span>
                      </label>
                    `,
                  )
                  .join("")}
              </fieldset>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderFieldControl(field, record = {}) {
  const required = field.required ? "required" : "";
  const value = escapeHtml(record[field.name] || "");

  if (field.type === "rolePicker") {
    return renderRolePicker(field, record);
  }

  if (field.type === "permissionMatrix") {
    return renderPermissionMatrix(field, record);
  }

  if (field.options || field.dictionaryType) {
    return renderSelectField(field, record);
  }

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

  if (field.type === "password") {
    return `
      <label>
        <span>${fieldLabel(field.label)}${field.required ? " *" : ""}</span>
        <input name="${field.name}" type="password" value="" autocomplete="new-password" ${required} />
      </label>
    `;
  }

  return `
    <label>
      <span>${fieldLabel(field.label)}${field.required ? " *" : ""}</span>
      <input name="${field.name}" type="text" value="${value}" ${required} />
    </label>
  `;
}

function getGroupedFields(type) {
  const fields = schemas[type].fields;
  const groups = fieldGroups[type] || [{ titleKey: "form.basic", fields: fields.map((field) => field.name) }];
  const byName = new Map(fields.map((field) => [field.name, field]));
  const used = new Set();

  const renderedGroups = groups
    .map((group) => {
      const groupFields = group.fields.map((fieldName) => byName.get(fieldName)).filter(Boolean);
      groupFields.forEach((field) => used.add(field.name));
      return { ...group, fields: groupFields };
    })
    .filter((group) => group.fields.length);

  const remainingFields = fields.filter((field) => !used.has(field.name));
  if (remainingFields.length) {
    renderedGroups.push({ titleKey: "form.basic", fields: remainingFields });
  }
  return renderedGroups;
}

function renderFields(type, record = {}) {
  recordForm.dataset.recordForm = type;

  recordFields.innerHTML = getGroupedFields(type)
    .map(
      (group) => `
        <section class="form-section">
          <h3 class="form-section-title">${t(group.titleKey)}</h3>
          <div class="form-section-grid">
            ${group.fields.map((field) => renderFieldControl(field, record)).join("")}
          </div>
        </section>
      `,
    )
    .join("");

  editorTitle.textContent = record.id ? `${t("action.edit")} ${singularLabel(type)}` : `${t("action.new")} ${singularLabel(type)}`;
  saveRecordButton.textContent = saveActionLabel(type);
}

function renderTable(type) {
  const schema = schemas[type];
  const head = document.querySelector(`[data-table-head="${type}"]`);
  const body = document.querySelector(`[data-table-body="${type}"]`);
  if (!schema || !head || !body) {
    return;
  }
  const allRows = rowsForType(type);
  const rows = getFilteredRows(type);

  head.innerHTML = `
    <tr>
      ${schema.columns.map((column) => `<th>${columnLabel(column)}</th>`).join("")}
      <th>${t("table.actions")}</th>
    </tr>
  `;

  if (!allRows.length) {
    body.innerHTML = `
      <tr>
        <td colspan="${schema.columns.length + 1}">
          <div class="empty-state">
            <strong>${t(emptyKeyForType(type))}</strong>
            <button class="primary-button" type="button" data-new-record="${type}">${addActionLabel(type)}</button>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  if (!rows.length) {
    body.innerHTML = `
      <tr>
        <td colspan="${schema.columns.length + 1}">
          <div class="empty-state">
            <strong>${t("empty.noMatches")}</strong>
            <span>${t("empty.adjustFilters")}</span>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  body.innerHTML = rows
    .map(
      (row) => `
        <tr>
          ${schema.columns.map((column) => renderTableCell(type, column, row)).join("")}
          <td>
            <div class="row-actions">
              <button class="secondary-button" type="button" data-edit="${escapeHtml(type)}" data-id="${escapeHtml(row.id)}">${t("action.edit")}</button>
              ${renderReviewActions(type, row)}
              <button class="danger-button" type="button" data-delete="${escapeHtml(type)}" data-id="${escapeHtml(row.id)}">${t("action.delete")}</button>
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
    body.innerHTML = `<div class="dashboard-empty-card">${escapeHtml(t("empty.inquiries"))}</div>`;
    return;
  }

  body.innerHTML = [...state.data.inquiries]
    .sort((a, b) => parseTime(b.created_at) - parseTime(a.created_at))
    .map(
      (row) => `
        <article class="inquiry-card inquiry-management-card">
          <div class="inquiry-card-main">
            <div class="inquiry-card-head">
              <div>
                <strong>${escapeHtml(row.name || row.email || "--")}</strong>
                <span>${escapeHtml([row.country, row.source || "Website Form"].filter(Boolean).join(" · "))}</span>
              </div>
              <select class="status-select" data-inquiry-status="${escapeHtml(row.id)}">
                ${["New", "Contacted", "Quoted", "Negotiating", "Won", "Lost", "Invalid"]
                  .map((status) => `<option value="${status}" ${row.status === status ? "selected" : ""}>${statusText(status)}</option>`)
                  .join("")}
              </select>
            </div>
            <details class="inquiry-summary">
              <summary>${escapeHtml(summarizeText(row.message || row.product_type || "--", 150))}</summary>
              <p>${escapeHtml(row.message || row.product_type || "--")}</p>
            </details>
            <div class="inquiry-meta-row">
              <span>${escapeHtml(row.email || "--")}</span>
              <span>${escapeHtml(formatDateTime(row.created_at) || "--")}</span>
            </div>
          </div>
          <div class="inquiry-card-actions">
            ${row.email ? `<a class="secondary-button" href="mailto:${escapeHtml(row.email)}">${escapeHtml(t("action.email"))}</a>` : ""}
          </div>
        </article>
      `,
    )
    .join("");
}

function logValue(group, value) {
  const key = String(value || "");
  return logValueTranslations[state.lang]?.[group]?.[key] || logValueTranslations.en[group]?.[key] || key;
}

function renderAiLogs() {
  const body = document.querySelector("[data-ai-logs-body]");
  if (!body) {
    return;
  }

  if (!state.data.aiLogs.length) {
    body.innerHTML = `<tr><td colspan="8">${t("empty.aiLogs")}</td></tr>`;
    return;
  }

  body.innerHTML = state.data.aiLogs
    .map((row) => {
      const status = row.status || "success";
      const target = row.target_label || row.target_id || "";
      const created = (row.created_at || "").slice(0, 19).replace("T", " ");
      return `
        <tr>
          <td><span class="status-pill status-${statusClass(status)}">${escapeHtml(logValue("statuses", status))}</span></td>
          <td>${escapeHtml(logValue("modules", row.module))}</td>
          <td>${escapeHtml(logValue("actions", row.action))}</td>
          <td>${escapeHtml(target)}</td>
          <td>${escapeHtml(logValue("sources", row.source))}</td>
          <td>${escapeHtml(row.actor || "")}</td>
          <td>${escapeHtml(created)}</td>
          <td>${escapeHtml(row.detail || row.output || row.prompt || "")}</td>
        </tr>
      `;
    })
    .join("");
}

function aiMaintenanceStatusLabel(operation) {
  return operation.valid ? t("aiMaintenance.valid") : t("aiMaintenance.invalid");
}

function aiMaintenanceModeLabel(operation) {
  return operation.mode === "update" ? t("aiMaintenance.update") : t("aiMaintenance.create");
}

function renderAiMaintenanceResult(payload = null) {
  if (!aiMaintenanceResult || !aiMaintenanceBody) {
    return;
  }

  const current = payload || state.aiMaintenance.lastPreview;
  aiMaintenanceResult.hidden = !current;
  if (aiMaintenanceApplyButton) {
    aiMaintenanceApplyButton.disabled = !state.aiMaintenance.operations.length;
  }
  if (!current) {
    return;
  }

  const operations = current.operations || [];
  if (aiMaintenanceSummary) {
    aiMaintenanceSummary.textContent = current.summary || t("aiMaintenance.empty");
  }
  if (aiMaintenanceMeta) {
    const validCount = operations.filter((operation) => operation.valid).length;
    const invalidCount = operations.length - validCount;
    aiMaintenanceMeta.textContent = `${current.provider || "deepseek"} / ${current.model || ""} | ${t("toast.aiMaintenancePreview", { valid: validCount, invalid: invalidCount })}`;
  }
  if (aiMaintenanceWarnings) {
    const warnings = current.warnings || [];
    aiMaintenanceWarnings.innerHTML = warnings.length ? warnings.map((warning) => `<span>${escapeHtml(warning)}</span>`).join("") : "";
  }

  if (!operations.length) {
    aiMaintenanceBody.innerHTML = `<tr><td colspan="5">${escapeHtml(t("aiMaintenance.empty"))}</td></tr>`;
    return;
  }

  aiMaintenanceBody.innerHTML = operations
    .map((operation) => {
      const details = operation.valid
        ? JSON.stringify(operation.after || operation.data || {})
        : `${(operation.errors || []).join("; ")} ${JSON.stringify(operation.data || {})}`;
      return `
        <tr>
          <td><span class="status-pill status-${operation.valid ? "active" : "invalid"}">${escapeHtml(aiMaintenanceStatusLabel(operation))}</span></td>
          <td>${escapeHtml(aiMaintenanceModeLabel(operation))}</td>
          <td>${escapeHtml(operation.type || "")}</td>
          <td>${escapeHtml(operation.key || "")}</td>
          <td>
            <strong>${escapeHtml(operation.reason || "")}</strong>
            <pre class="ai-maintenance-json">${escapeHtml(details)}</pre>
          </td>
        </tr>
      `;
    })
    .join("");
}

function formatDateTime(value) {
  return String(value || "").slice(0, 19).replace("T", " ");
}

function leadContactLabel(row = {}) {
  return [row.contact_email, row.contact_phone, row.contact_website].filter(Boolean).join(" / ") || "--";
}

function listValue(value) {
  return Array.isArray(value) ? value.join(", ") : String(value || "");
}

function selectedValues(select) {
  if (select?.type === "hidden") {
    return String(select.value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return Array.from(select?.selectedOptions || []).map((option) => option.value).filter(Boolean);
}

function leadKeywordTemplateFromForm(form) {
  const countries = selectedValues(form.elements.countries);
  const vehicles = selectedValues(form.elements.target_vehicles);
  const customerTypes = selectedValues(form.elements.customer_types);
  const scenarios = selectedValues(form.elements.purchase_scenarios);
  const manual = String(form.elements.manual_keywords?.value || "").trim();
  return [countries.join(" OR "), vehicles.join(" OR "), customerTypes.join(" OR "), scenarios.join(" OR "), manual]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function leadTaskName(task = {}) {
  const country = normalizeUiList(task.countries)[0] || "Global";
  const vehicle = normalizeUiList(task.target_vehicles)[0] || "Commercial Vehicle";
  const buyer = normalizeUiList(task.customer_types)[0] || normalizeUiList(task.purchase_scenarios)[0] || "Leads";
  return `${country} ${vehicle} ${buyer} Leads`.replace(/\s+/g, " ").trim();
}

function normalizeUiList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function sourceDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return String(url || "--").slice(0, 28);
  }
}

function populateLeadSelects() {
  Object.entries(leadDiscoveryOptions).forEach(([name]) => renderChipField(name));
  updateLeadKeywordTemplate();
}

function renderChipField(name, expanded = false) {
  const field = document.querySelector(`[data-chip-field="${name}"]`);
  const input = document.querySelector(`[name="${name}"]`);
  if (!field || !input) return;
  const values = leadDiscoveryOptions[name] || [];
  const selected = new Set(leadChipState[name] || []);
  input.value = Array.from(selected).join(",");
  const visibleValues = expanded ? values : values.slice(0, 5);
  field.innerHTML = `
    <div class="lead-chip-selected">
      ${Array.from(selected).map((value) => `<button class="lead-chip is-selected" type="button" data-chip-remove="${escapeHtml(name)}" data-chip-value="${escapeHtml(value)}">${escapeHtml(value)} ×</button>`).join("") || `<span>${escapeHtml(t("leadDiscovery.addOption"))}</span>`}
    </div>
    <div class="lead-chip-options">
      ${visibleValues.map((value) => `<button class="lead-chip ${selected.has(value) ? "is-active" : ""}" type="button" data-chip-toggle="${escapeHtml(name)}" data-chip-value="${escapeHtml(value)}">${escapeHtml(value)}</button>`).join("")}
      ${values.length > 5 ? `<button class="lead-chip" type="button" data-chip-more="${escapeHtml(name)}">${escapeHtml(t("leadDiscovery.more"))}</button>` : ""}
    </div>
  `;
}

function resetLeadConfig() {
  if (leadTaskForm) {
    leadTaskForm.reset();
  }
  Object.keys(leadChipState).forEach((key) => {
    leadChipState[key] = [];
    renderChipField(key);
  });
  updateLeadKeywordTemplate();
}

function updateLeadKeywordTemplate() {
  const form = document.querySelector("[data-lead-task-form]");
  const template = document.querySelector("[data-keyword-template]");
  if (!form || !template) {
    return;
  }
  template.value = leadKeywordTemplateFromForm(form);
}

function leadScoreLevel(row = {}) {
  const score = Number(row.profile?.score ?? row.score ?? 0);
  const hasContact = Boolean(row.contact_email || row.contact_phone || row.contact_website);
  if (!hasContact && score >= 85) return "HIGH";
  if (!hasContact && row.lead_score_level === "VERY_HIGH") return "HIGH";
  return row.lead_score_level || (score >= 85 ? "VERY_HIGH" : score >= 70 ? "HIGH" : score >= 60 ? "MEDIUM_HIGH" : score >= 45 ? "MEDIUM" : "LOW");
}

function leadContactQuality(row = {}) {
  if (row.contact_quality) return row.contact_quality;
  const count = [row.contact_email, row.contact_phone, row.contact_website].filter(Boolean).length;
  if (count >= 3) return "STRONG";
  if (count >= 2) return "GOOD";
  if (count === 1) return "BASIC";
  return "MISSING";
}

function resetLeadCrawlerTimer() {
  if (state.leadCrawler.timer) {
    clearInterval(state.leadCrawler.timer);
    state.leadCrawler.timer = null;
  }
}

function startLeadCrawlerProgress(task = {}) {
  resetLeadCrawlerTimer();
  state.leadCrawler = {
    running: true,
    taskId: task.id || "",
    taskLabel: task.keywords_template || task.keywords || task.id || "",
    step: 0,
    startedAt: Date.now(),
    result: null,
    error: "",
    timer: null,
  };
  state.leadCrawler.timer = setInterval(() => {
    if (!state.leadCrawler.running) {
      resetLeadCrawlerTimer();
      return;
    }
    state.leadCrawler.step = Math.min(leadProgressSteps.length - 1, state.leadCrawler.step + 1);
    renderLeadProgress();
  }, 3500);
  renderLeadDiscovery();
}

function finishLeadCrawlerProgress(result = {}) {
  resetLeadCrawlerTimer();
  state.leadCrawler.running = false;
  state.leadCrawler.step = leadProgressSteps.length;
  state.leadCrawler.result = result;
  state.leadCrawler.error = "";
  renderLeadDiscovery();
}

function failLeadCrawlerProgress(error) {
  resetLeadCrawlerTimer();
  state.leadCrawler.running = false;
  state.leadCrawler.error = String(error?.message || error || "");
  renderLeadProgress();
}

function renderLeadProgress() {
  const box = document.querySelector("[data-lead-progress]");
  if (!box) {
    return;
  }
  const crawler = state.leadCrawler || {};
  const elapsed = crawler.startedAt ? Math.max(0, Math.round((Date.now() - crawler.startedAt) / 1000)) : 0;
  const percent = crawler.result ? 100 : crawler.running ? Math.min(92, Math.max(8, (crawler.step + 1) * 18)) : 0;
  const taskLeads = crawler.taskId ? (state.data.leads || []).filter((lead) => lead.search_task_id === crawler.taskId) : [];
  const taskUrls = crawler.result?.saved_results || (crawler.running ? Math.max(0, crawler.step * 2) : 0);
  const parsedCompanies = crawler.result?.saved_leads || taskLeads.length;
  const validLeads = taskLeads.filter((lead) => ["VERY_HIGH", "HIGH", "MEDIUM_HIGH"].includes(leadScoreLevel(lead))).length;
  const statusKey = crawler.error ? "leadDiscovery.progressFailed" : crawler.running ? "leadDiscovery.progressRunning" : crawler.result ? "leadDiscovery.progressDone" : "leadDiscovery.progressIdle";
  const resultHtml = crawler.result
    ? `<p class="lead-progress-result">${escapeHtml(t("leadDiscovery.progressResult", { results: crawler.result.saved_results || 0, leads: crawler.result.saved_leads || 0, profiles: crawler.result.generated_profiles || 0 }))}</p>`
    : crawler.error
      ? `<p class="lead-progress-result is-error">${escapeHtml(crawler.error)}</p>`
      : "";
  box.innerHTML = leadProgressSteps
    .map((step, index) => {
      const stateClass = crawler.error && index === Math.max(0, crawler.step) ? "is-error" : index < crawler.step || crawler.result ? "is-done" : index === crawler.step && crawler.running ? "is-active" : "is-pending";
      return `<div class="lead-progress-step ${stateClass}"><span>${index + 1}</span><p>${escapeHtml(step)}</p></div>`;
    })
    .join("");
  box.insertAdjacentHTML(
    "afterbegin",
    `<div class="lead-progress-summary">
      <strong>${escapeHtml(t(statusKey))}</strong>
      <span>${crawler.taskLabel ? escapeHtml(t("leadDiscovery.progressMeta", { task: crawler.taskLabel.slice(0, 56), elapsed })) : escapeHtml(t("leadDiscovery.progressIdle"))}</span>
      ${crawler.running || crawler.result ? `<div class="lead-progress-meter"><i style="width:${escapeHtml(percent)}%"></i></div><div class="lead-progress-metrics"><span>${escapeHtml(percent)}%</span><span>${escapeHtml(taskUrls)} URLs</span><span>${escapeHtml(parsedCompanies)} companies</span><span>${escapeHtml(validLeads)} valid</span></div>` : ""}
      ${resultHtml}
    </div>`,
  );
}

function renderLeadStats() {
  const box = document.querySelector("[data-lead-stats]");
  if (!box) {
    return;
  }
  const leads = state.data.leads || [];
  const qualified = leads.filter((lead) => ["VERY_HIGH", "HIGH", "MEDIUM_HIGH"].includes(leadScoreLevel(lead)) && !["invalid", "rejected"].includes(String(lead.follow_status || "").toLowerCase())).length;
  const contactable = leads.filter((lead) => Boolean(lead.contact_email || lead.contact_phone || /whatsapp/i.test([lead.contact_phone, lead.profile?.ai_summary, lead.profile?.outreach_message].filter(Boolean).join(" ")))).length;
  const needsVerification = leads.filter((lead) => {
    const status = String(lead.follow_status || "").toLowerCase();
    const evidenceCount = normalizeUiList(lead.profile?.key_evidence).length;
    return ["new", "needs_verification", "needs verification"].includes(status) && evidenceCount < 2;
  }).length;
  const invalid = leads.filter((lead) => ["LOW"].includes(leadScoreLevel(lead)) || ["invalid", "rejected"].includes(String(lead.follow_status || "").toLowerCase())).length;
  const stats = [
    [t("leadDiscovery.statTotal"), leads.length],
    [t("leadDiscovery.statHigh"), qualified],
    [t("leadDiscovery.statContact"), contactable],
    [t("leadDiscovery.statVerify"), needsVerification],
    [t("leadDiscovery.statInvalid"), invalid],
  ];
  box.innerHTML = stats.map(([label, value]) => `<article><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></article>`).join("");
}

function renderLeadTaskOptions() {
  const select = document.querySelector("[data-lead-task-select]");
  const list = document.querySelector("[data-lead-tasks-list]");
  if (!select) {
    return;
  }
  const tasks = state.data.searchTasks || [];
  select.innerHTML = `<option value="">--</option>${tasks
    .map((task) => `<option value="${escapeHtml(task.id)}">${escapeHtml(task.keywords || task.id)}</option>`)
    .join("")}`;
  if (list) {
    list.innerHTML = tasks.length
      ? `<div class="lead-task-table">${tasks
          .slice(0, 5)
          .map(
            (task) => `
              <div class="lead-task-item">
                <strong>${escapeHtml(leadTaskName(task))}</strong>
                <span>${escapeHtml(normalizeUiList(task.countries).join(", ") || "--")}</span>
                <span>${escapeHtml(normalizeUiList(task.target_vehicles).join(", ") || "--")}</span>
                <span><b class="status-pill status-${statusClass(task.status)}">${escapeHtml(task.status || "active")}</b></span>
                <span>${escapeHtml((state.data.leads || []).filter((lead) => lead.search_task_id === task.id).length)}</span>
                <span>${escapeHtml(formatDateTime(task.created_at))}</span>
                <button class="secondary-button" type="button" data-run-crawler-task="${escapeHtml(task.id)}" ${state.leadCrawler.running ? "disabled" : ""}>${escapeHtml(state.leadCrawler.running && state.leadCrawler.taskId === task.id ? t("leadDiscovery.progressRunning") : t("leadDiscovery.runCrawler"))}</button>
              </div>
            `,
          )
          .join("")}</div>`
      : "";
  }
}

function renderLeadsTable() {
  const body = document.querySelector("[data-leads-body]");
  if (!body) {
    return;
  }
  const leads = state.data.leads || [];
  if (!leads.length) {
    body.innerHTML = `<tr><td colspan="7">${escapeHtml(t("leadDiscovery.selectLead"))}</td></tr>`;
    return;
  }
  body.innerHTML = leads
    .map((row) => {
      const score = Number(row.profile?.score ?? row.score ?? 0);
      const level = leadScoreLevel(row);
      return `
        <tr>
          <td><strong class="lead-company-cell">${escapeHtml(row.company_name || "--")}</strong></td>
          <td class="lead-nowrap">${escapeHtml(row.country || "")}</td>
          <td><span class="score-pill score-${escapeHtml(level.toLowerCase())}">${escapeHtml(level)} · ${escapeHtml(score)}</span></td>
          <td><span class="contact-quality-badge">${escapeHtml(leadContactQuality(row))}</span></td>
          <td><span class="status-pill status-${statusClass(row.follow_status)}">${escapeHtml(row.follow_status || "new")}</span></td>
          <td>${escapeHtml(formatDateTime(row.updated_at || row.created_at))}</td>
          <td class="lead-actions-sticky">
            <div class="row-actions">
              <button class="secondary-button" type="button" data-lead-detail-id="${escapeHtml(row.id)}">${escapeHtml(t("dashboard.view"))}</button>
              <button class="secondary-button" type="button" data-lead-status-id="${escapeHtml(row.id)}" data-lead-status="Verified">${escapeHtml(t("leadDiscovery.verifyLead"))}</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderLeadDetail(lead = null) {
  const panel = document.querySelector("[data-lead-detail]");
  if (!panel) {
    return;
  }
  if (!lead) {
    const topLeads = (state.data.leads || [])
      .filter((row) => !["invalid", "rejected"].includes(String(row.follow_status || "").toLowerCase()))
      .sort((a, b) => Number(b.profile?.score ?? b.score ?? 0) - Number(a.profile?.score ?? a.score ?? 0))
      .slice(0, 5);
    panel.innerHTML = `
      <div class="lead-detail-empty lead-top-empty">
        <h3>Top Leads</h3>
        <p>${escapeHtml(t("leadDiscovery.selectLead"))}</p>
        ${topLeads.map((row) => `<button type="button" data-lead-detail-id="${escapeHtml(row.id)}"><strong>${escapeHtml(row.company_name || "--")}</strong><span>${escapeHtml([row.country, leadScoreLevel(row)].filter(Boolean).join(" · "))}</span></button>`).join("")}
      </div>
    `;
    return;
  }
  const sourceRows = (lead.crawl_results || []).length ? lead.crawl_results : (state.data.crawlResults || []).filter((row) => row.processed_lead_id === lead.id || row.url === lead.source_url);
  const logs = lead.contact_logs || [];
  const profile = lead.profile;
  const score = Number(profile?.score ?? lead.score ?? 0);
  const scoring = profile?.scoring_breakdown || {};
  const evidence = profile?.key_evidence?.length ? profile.key_evidence : sourceRows.map((row) => row.title || row.url).filter(Boolean).slice(0, 3);
  const outreach = profile?.outreach_message || `Hello, we supply commercial vehicles for export. Are you currently sourcing ${listValue(lead.matched_vehicles) || "trucks, buses or fleet vehicles"} for upcoming projects?`;
  panel.innerHTML = `
    <div class="lead-detail-header">
      <div>
        <span>${escapeHtml([lead.country, lead.customer_type || lead.industry].filter(Boolean).join(" · "))}</span>
        <h3>${escapeHtml(lead.company_name || "--")}</h3>
      </div>
      <div class="lead-detail-actions">
        <button class="primary-button" type="button" data-lead-status-id="${escapeHtml(lead.id)}" data-lead-status="Verified">${escapeHtml(t("leadDiscovery.verifyLead"))}</button>
        <button class="secondary-button" type="button" data-lead-profile-id="${escapeHtml(lead.id)}">${escapeHtml(t("leadDiscovery.generateOutreach"))}</button>
        <button class="secondary-button" type="button" data-contact-log-focus="${escapeHtml(lead.id)}">${escapeHtml(t("leadDiscovery.addContactLog"))}</button>
        <button class="secondary-button" type="button" data-lead-status-id="${escapeHtml(lead.id)}" data-lead-status="Interested">${escapeHtml(t("leadDiscovery.addToCrm"))}</button>
        <button class="secondary-button" type="button" data-lead-status-id="${escapeHtml(lead.id)}" data-lead-status="Invalid">${escapeHtml(t("leadDiscovery.markInvalid"))}</button>
        ${lead.source_url ? `<a class="secondary-button" href="${escapeHtml(lead.source_url)}" target="_blank" rel="noreferrer">${escapeHtml(t("leadDiscovery.openSource"))}</a>` : ""}
      </div>
    </div>
    <section class="lead-detail-section">
      <h4>${escapeHtml(t("leadDiscovery.profile"))}</h4>
      ${
        profile
          ? `<p>${escapeHtml(profile.ai_summary || "")}</p>
            <div class="lead-score-strip"><span class="score-pill">${escapeHtml(leadScoreLevel({ ...lead, profile }))} · ${escapeHtml(score)}</span><span>${escapeHtml(profile.export_fit || "")}</span></div>`
          : `<p class="muted-text">${escapeHtml(t("leadDiscovery.noProfile"))}</p>`
      }
    </section>
    <section class="lead-detail-section">
      <h4>${escapeHtml(t("leadDiscovery.scoring"))}</h4>
      <dl>
        <div><dt>Product Fit</dt><dd>${escapeHtml(scoring.product_fit ?? "--")}</dd></div>
        <div><dt>Country Fit</dt><dd>${escapeHtml(scoring.country_fit ?? "--")}</dd></div>
        <div><dt>Buyer Identity</dt><dd>${escapeHtml(scoring.buyer_identity_confidence ?? "--")}</dd></div>
        <div><dt>Contact Complete</dt><dd>${escapeHtml(scoring.contact_completeness ?? "--")}</dd></div>
        <div><dt>Purchase Potential</dt><dd>${escapeHtml(scoring.purchase_potential || "--")}</dd></div>
      </dl>
    </section>
    <section class="lead-detail-section">
      <h4>${escapeHtml(t("leadDiscovery.possibleVehicles"))}</h4>
      <p>${escapeHtml(listValue(lead.matched_vehicles) || profile?.recommended_products || "--")}</p>
    </section>
    <section class="lead-detail-section">
      <h4>${escapeHtml(t("leadDiscovery.purchaseReasons"))}</h4>
      ${(profile?.purchase_reasons?.length ? profile.purchase_reasons : profile?.pain_points || []).map((item) => `<article>${escapeHtml(item)}</article>`).join("") || `<p class="muted-text">${escapeHtml(t("leadDiscovery.noProfile"))}</p>`}
    </section>
    <section class="lead-detail-section">
      <h4>${escapeHtml(t("leadDiscovery.keyEvidence"))}</h4>
      ${evidence.length ? evidence.map((item) => `<article>${escapeHtml(item)}</article>`).join("") : `<p class="muted-text">${escapeHtml(t("leadDiscovery.noSource"))}</p>`}
    </section>
    <section class="lead-detail-section">
      <h4>${escapeHtml(t("leadDiscovery.contacts"))}</h4>
      <p>${escapeHtml(leadContactLabel(lead))}</p>
    </section>
    <section class="lead-detail-section">
      <h4>${escapeHtml(t("leadDiscovery.outreach"))}</h4>
      <p>${escapeHtml(outreach)}</p>
    </section>
    <section class="lead-detail-section">
      <h4>${escapeHtml(t("leadDiscovery.riskFlags"))}</h4>
      ${(profile?.risk_flags || ["Verify buyer identity and contact ownership before quoting."]).map((item) => `<article>${escapeHtml(item)}</article>`).join("")}
    </section>
    <section class="lead-detail-section">
      <h4>${escapeHtml(t("leadDiscovery.nextSteps"))}</h4>
      ${(profile?.next_steps || ["Verify contact", "Confirm vehicle requirement", "Qualify budget and timeline"]).map((item) => `<article>${escapeHtml(item)}</article>`).join("")}
    </section>
    <section class="lead-detail-section">
      <h4>${escapeHtml(t("leadDiscovery.sourceResults"))}</h4>
      ${
        sourceRows.length
          ? sourceRows.map((row) => `<article><strong>${escapeHtml(row.title || row.url)}</strong><p>${escapeHtml(String(row.content || "").slice(0, 420))}</p></article>`).join("")
          : `<p class="muted-text">${escapeHtml(t("leadDiscovery.noSource"))}</p>`
      }
    </section>
    <section class="lead-detail-section">
      <h4>${escapeHtml(t("leadDiscovery.contactLogs"))}</h4>
      ${logs.length ? logs.map((log) => `<article><strong>${escapeHtml(log.channel || "Follow-up")} · ${escapeHtml(formatDateTime(log.created_at))}</strong><p>${escapeHtml(log.content || "")}</p></article>`).join("") : `<p class="muted-text">${escapeHtml(t("leadDiscovery.noLogs"))}</p>`}
      <form class="lead-log-form" data-contact-log-form="${escapeHtml(lead.id)}">
        <label><span>${escapeHtml(t("leadDiscovery.logContent"))}</span><textarea name="content" rows="3" required></textarea></label>
        <button class="secondary-button" type="submit">${escapeHtml(t("leadDiscovery.addContactLog"))}</button>
      </form>
    </section>
  `;
}

function renderLeadDiscovery() {
  populateLeadSelects();
  renderLeadProgress();
  renderLeadStats();
  renderLeadTaskOptions();
  renderLeadsTable();
}

async function updateLeadStatus(leadId, nextStatus) {
  const existing = (state.data.leads || []).find((lead) => lead.id === leadId) || {};
  await api(`/api/lead-discovery/leads/${leadId}`, {
    method: "PUT",
    body: JSON.stringify({ ...existing, follow_status: nextStatus }),
  });
  await api(`/api/lead-discovery/leads/${leadId}/contact-logs`, {
    method: "POST",
    body: JSON.stringify({
      channel: "System",
      content: `Status updated to ${nextStatus}.`,
      result_status: nextStatus,
    }),
  });
  await refreshData();
  renderLeadDetail(await api(`/api/lead-discovery/leads/${leadId}`));
}

function renderUsers() {
  const body = document.querySelector("[data-users-body]");
  if (!body) {
    return;
  }

  const rows = state.data.adminUsers || [];
  if (!rows.length) {
    body.innerHTML = `<tr><td colspan="7">${t("empty.users")}</td></tr>`;
    return;
  }

  body.innerHTML = rows
    .map((row) => {
      const roles = roleNames(row.role_ids).join(", ") || "--";
      const status = row.status === "disabled" ? "disabled" : "active";
      return `
        <tr>
          <td><strong>${escapeHtml(row.username || "")}</strong></td>
          <td>${escapeHtml(row.name || "")}</td>
          <td>${escapeHtml(row.email || "")}</td>
          <td>${escapeHtml(roles)}</td>
          <td><span class="status-pill status-${statusClass(status)}">${escapeHtml(fieldLabel(status === "disabled" ? "Disabled" : "Active"))}</span></td>
          <td>${escapeHtml(formatDateTime(row.last_login_at) || "--")}</td>
          <td>
            <div class="row-actions">
              ${can("users:update") ? `<button class="secondary-button" type="button" data-edit="adminUsers" data-id="${escapeHtml(row.id)}">${t("action.edit")}</button>` : ""}
              ${
                can("users:disable")
                  ? `<button class="secondary-button" type="button" data-user-status="${status === "disabled" ? "enable" : "disable"}" data-id="${escapeHtml(row.id)}">${
                      status === "disabled" ? t("action.enable") : t("action.disable")
                    }</button>`
                  : ""
              }
              ${can("users:reset_password") ? `<button class="secondary-button" type="button" data-reset-password="${escapeHtml(row.id)}">${t("action.resetPassword")}</button>` : ""}
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderRoles() {
  const body = document.querySelector("[data-roles-body]");
  if (!body) {
    return;
  }

  const rows = state.data.adminRoles || [];
  if (!rows.length) {
    body.innerHTML = `<tr><td colspan="6">${t("empty.roles")}</td></tr>`;
    return;
  }

  body.innerHTML = rows
    .map((row) => {
      const permissions = listValue(row.permissions);
      const status = row.status === "disabled" ? "disabled" : "active";
      return `
        <tr>
          <td><strong>${escapeHtml(row.code || "")}</strong></td>
          <td>${escapeHtml(row.name_en || "")}</td>
          <td>${escapeHtml(row.name_zh || "")}</td>
          <td>${escapeHtml(t("roles.permissionCount", { count: permissions.length }))}</td>
          <td><span class="status-pill status-${statusClass(status)}">${escapeHtml(fieldLabel(status === "disabled" ? "Disabled" : "Active"))}</span></td>
          <td>
            <div class="row-actions">
              ${can("roles:update") ? `<button class="secondary-button" type="button" data-edit="adminRoles" data-id="${escapeHtml(row.id)}">${t("action.edit")}</button>` : ""}
              ${can("roles:delete") && !row.system ? `<button class="danger-button" type="button" data-delete="adminRoles" data-id="${escapeHtml(row.id)}">${t("action.delete")}</button>` : ""}
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

async function refreshData() {
  const [vehicles, parts, inquiries, dictionaries, aiLogs, searchTasks, leads, crawlResults, adminUsers, adminRoles, permissions] = await Promise.all([
    api("/api/vehicles"),
    api("/api/parts"),
    apiIfAllowed("/api/inquiries", "inquiries:view"),
    api("/api/dictionaries"),
    apiIfAllowed("/api/ai-logs", "ai_logs:view"),
    apiIfAllowed("/api/lead-discovery/search-tasks", "lead_discovery:view"),
    apiIfAllowed("/api/lead-discovery/leads", "lead_discovery:view"),
    apiIfAllowed("/api/lead-discovery/crawl-results", "lead_discovery:view"),
    apiIfAllowed("/api/admin/users", "users:view"),
    apiIfAllowed("/api/admin/roles", "roles:view"),
    api("/api/admin/permissions"),
  ]);
  state.data.vehicles = vehicles.items || [];
  state.data.parts = parts.items || [];
  state.data.inquiries = inquiries.items || [];
  state.data.dictionaries = dictionaries.items || [];
  state.data.aiLogs = aiLogs.items || [];
  state.data.searchTasks = searchTasks.items || [];
  state.data.leads = leads.items || [];
  state.data.crawlResults = crawlResults.items || [];
  state.data.adminUsers = adminUsers.items || [];
  state.data.adminRoles = adminRoles.items || [];
  state.permissions = permissions.items || [];
  renderMetrics();
  renderFilterOptions();
  renderTable("vehicles");
  renderTable("usedVehicles");
  renderTable("parts");
  renderDictionaryTable();
  renderInquiries();
  renderAiLogs();
  renderLeadDiscovery();
  renderUsers();
  renderRoles();
}

function collectForm(type, form) {
  const data = new FormData(form);
  const record = {};
  schemas[type].fields.forEach((field) => {
    if (field.type === "rolePicker" || field.type === "permissionMatrix") {
      record[field.name] = data.getAll(field.name).map((value) => String(value || "").trim()).filter(Boolean);
      return;
    }
    const value = String(data.get(field.name) || "").trim();
    if (field.type === "password" && !value) {
      return;
    }
    record[field.name] = value;
  });
  return { ...record, ...fixedValuesForType(type) };
}

function resetForm(type) {
  state.editing[type] = null;
  recordForm.reset();
  state.drawerType = "";
  recordDrawer.setAttribute("aria-hidden", "true");
}

function findRecord(type, id) {
  return rowsForType(type).find((row) => row.id === id) || (state.data[sourceType(type)] || []).find((row) => row.id === id);
}

function openRecordDrawer(type, record = {}) {
  state.drawerType = type;
  state.editing[type] = record.id || null;
  renderFields(type, { ...fixedValuesForType(type), ...record });
  recordDrawer.setAttribute("aria-hidden", "false");
}

function closeRecordDrawer() {
  if (state.drawerType) {
    state.editing[state.drawerType] = null;
  }
  state.drawerType = "";
  recordForm.reset();
  recordDrawer.setAttribute("aria-hidden", "true");
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
    setAuthenticated(result.token, { user: result.user, roles: result.roles, permissions: result.permissions, ip: result.ip });
    await loadSessionInfo();
    await refreshData();
    showToast(t("toast.loggedIn"));
  } catch (error) {
    showToast(error.message);
  }
});

if (aiMaintenanceForm) {
  aiMaintenanceForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const targetTypes = data.getAll("target_types").map((value) => String(value || "").trim()).filter(Boolean);
    const instruction = String(data.get("instruction") || "").trim();
    const sourceText = String(data.get("source_text") || "").trim();

    if (!instruction && !sourceText) {
      showToast(t("aiMaintenance.instructionPlaceholder"));
      return;
    }

    state.aiMaintenance.operations = [];
    if (aiMaintenanceApplyButton) {
      aiMaintenanceApplyButton.disabled = true;
    }

    try {
      const result = await api("/api/ai-maintenance/preview", {
        method: "POST",
        body: JSON.stringify({
          target_types: targetTypes,
          instruction,
          source_text: sourceText,
        }),
      });
      state.aiMaintenance.lastPreview = result;
      state.aiMaintenance.operations = (result.operations || []).filter((operation) => operation.valid).map((operation) => operation.operation);
      renderAiMaintenanceResult(result);
      showToast(t("toast.aiMaintenancePreview", { valid: result.valid_count || 0, invalid: result.invalid_count || 0 }));
    } catch (error) {
      showToast(error.message);
    }
  });
}

if (leadTaskForm) {
  leadTaskForm.addEventListener("input", updateLeadKeywordTemplate);
  leadTaskForm.addEventListener("change", updateLeadKeywordTemplate);
  leadTaskForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const keywordsTemplate = leadKeywordTemplateFromForm(form);
    try {
      await api("/api/lead-discovery/search-tasks", {
        method: "POST",
        body: JSON.stringify({
          keywords: keywordsTemplate,
          keywords_template: keywordsTemplate,
          countries: selectedValues(form.elements.countries),
          industries: selectedValues(form.elements.purchase_scenarios),
          target_vehicles: selectedValues(form.elements.target_vehicles),
          customer_types: selectedValues(form.elements.customer_types),
          purchase_scenarios: selectedValues(form.elements.purchase_scenarios),
          search_depth: data.get("search_depth") || "standard",
          manual_keywords: data.get("manual_keywords"),
          status: data.get("status") || "active",
        }),
      });
      resetLeadConfig();
      await refreshData();
      showToast(t("toast.leadTaskCreated"));
    } catch (error) {
      showToast(error.message);
    }
  });
}

if (crawlResultForm) {
  crawlResultForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      await api("/api/lead-discovery/crawl-results", {
        method: "POST",
        body: JSON.stringify({
          search_task_id: data.get("search_task_id"),
          url: data.get("url"),
          title: data.get("company_name"),
          company_name: data.get("company_name"),
          country: data.get("country"),
          customer_type: data.get("customer_type"),
          content: data.get("content"),
        }),
      });
      form.reset();
      await refreshData();
      showToast(t("toast.crawlResultAdded"));
    } catch (error) {
      showToast(error.message);
    }
  });
}

document.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-contact-log-form]");
  if (!form) {
    return;
  }
  event.preventDefault();
  const leadId = form.dataset.contactLogForm;
  const data = new FormData(form);
  try {
    await api(`/api/lead-discovery/leads/${leadId}/contact-logs`, {
      method: "POST",
      body: JSON.stringify({ content: data.get("content"), channel: "note" }),
    });
    form.reset();
    await refreshData();
    renderLeadDetail(await api(`/api/lead-discovery/leads/${leadId}`));
    showToast(t("toast.contactLogAdded"));
  } catch (error) {
    showToast(error.message);
  }
});

document.querySelectorAll("[data-password-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.parentElement && button.parentElement.querySelector("input");
    if (!input) return;
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    button.classList.toggle("is-active", isPassword);
    button.setAttribute("aria-pressed", String(isPassword));
    button.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
    input.focus();
  });
});

document.addEventListener("click", async (event) => {
  const target = event.target;

  const chipToggle = target.closest("[data-chip-toggle]");
  if (chipToggle) {
    const name = chipToggle.dataset.chipToggle;
    const value = chipToggle.dataset.chipValue;
    const selected = new Set(leadChipState[name] || []);
    selected.has(value) ? selected.delete(value) : selected.add(value);
    leadChipState[name] = Array.from(selected);
    renderChipField(name);
    updateLeadKeywordTemplate();
    return;
  }

  const chipRemove = target.closest("[data-chip-remove]");
  if (chipRemove) {
    const name = chipRemove.dataset.chipRemove;
    leadChipState[name] = (leadChipState[name] || []).filter((value) => value !== chipRemove.dataset.chipValue);
    renderChipField(name);
    updateLeadKeywordTemplate();
    return;
  }

  const chipMore = target.closest("[data-chip-more]");
  if (chipMore) {
    renderChipField(chipMore.dataset.chipMore, true);
    return;
  }

  if (target.closest("[data-generate-lead-keywords]")) {
    updateLeadKeywordTemplate();
    return;
  }

  if (target.closest("[data-reset-lead-config]")) {
    resetLeadConfig();
    return;
  }

  const dictionaryTab = target.closest("[data-dictionary-tab]");
  if (dictionaryTab) {
    state.dictionaryType = dictionaryTab.dataset.dictionaryTab;
    const select = document.querySelector("[data-dictionary-type]");
    if (select) {
      select.value = state.dictionaryType;
    }
    renderDictionaryTabs();
    renderDictionaryTable();
    return;
  }

  const navToggle = target.closest("[data-nav-toggle]");
  if (navToggle) {
    const groupName = navToggle.dataset.navToggle;
    const group = document.querySelector(`[data-nav-group="${groupName}"]`);
    const storedGroups = readSidebarGroupState();
    if (adminApp?.classList.contains("sidebar-collapsed")) {
      setSidebarCollapsed(false);
      storedGroups[groupName] = true;
    } else {
      storedGroups[groupName] = !group?.classList.contains("expanded");
    }
    writeSidebarGroupState(storedGroups);
    renderSidebarGroups();
    return;
  }

  const viewButton = target.closest("[data-view]");
  if (viewButton) {
    switchView(viewButton.dataset.view);
    return;
  }

  const dashboardViewButton = target.closest("[data-dashboard-view]");
  if (dashboardViewButton) {
    switchView(dashboardViewButton.dataset.dashboardView);
    return;
  }

  const dashboardQuoteButton = target.closest("[data-dashboard-quote]");
  if (dashboardQuoteButton) {
    switchView("inquiries");
    return;
  }

  const dashboardQuoteIdButton = target.closest("[data-dashboard-quote-id]");
  if (dashboardQuoteIdButton) {
    switchView("inquiries");
    return;
  }

  const dashboardInquiryValidButton = target.closest("[data-dashboard-inquiry-valid]");
  if (dashboardInquiryValidButton) {
    try {
      await api(`/api/inquiries/${dashboardInquiryValidButton.dataset.dashboardInquiryValid}`, {
        method: "PUT",
        body: JSON.stringify({ status: "Contacted" }),
      });
      await refreshData();
      showToast(t("toast.inquiryUpdated"));
    } catch (error) {
      showToast(error.message);
    }
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

  const leadDetailButton = target.closest("[data-lead-detail-id]");
  if (leadDetailButton) {
    try {
      renderLeadDetail(await api(`/api/lead-discovery/leads/${leadDetailButton.dataset.leadDetailId}`));
    } catch (error) {
      showToast(error.message);
    }
    return;
  }

  const leadProfileButton = target.closest("[data-lead-profile-id]");
  if (leadProfileButton) {
    try {
      const result = await api(`/api/lead-discovery/leads/${leadProfileButton.dataset.leadProfileId}/profile`, { method: "POST" });
      await refreshData();
      renderLeadDetail(await api(`/api/lead-discovery/leads/${result.profile.lead_id}`));
      showToast(t("toast.leadProfileGenerated"));
    } catch (error) {
      showToast(error.message);
    }
    return;
  }

  const leadStatusButton = target.closest("[data-lead-status-id]");
  if (leadStatusButton) {
    try {
      await updateLeadStatus(leadStatusButton.dataset.leadStatusId, leadStatusButton.dataset.leadStatus);
      showToast(t("toast.contactLogAdded"));
    } catch (error) {
      showToast(error.message);
    }
    return;
  }

  const contactLogFocus = target.closest("[data-contact-log-focus]");
  if (contactLogFocus) {
    const input = document.querySelector(`[data-contact-log-form="${contactLogFocus.dataset.contactLogFocus}"] textarea`);
    if (input) {
      input.focus();
    }
    return;
  }

  const runCrawlerButton = target.closest("[data-run-crawler-task]");
  if (runCrawlerButton) {
    const task = (state.data.searchTasks || []).find((row) => row.id === runCrawlerButton.dataset.runCrawlerTask) || { id: runCrawlerButton.dataset.runCrawlerTask };
    try {
      runCrawlerButton.disabled = true;
      startLeadCrawlerProgress(task);
      const result = await api(`/api/lead-discovery/search-tasks/${runCrawlerButton.dataset.runCrawlerTask}/crawler-run`, { method: "POST" });
      await refreshData();
      finishLeadCrawlerProgress(result);
      showToast(t("toast.crawlerFinished", { results: result.saved_results || 0, leads: result.saved_leads || 0 }));
    } catch (error) {
      failLeadCrawlerProgress(error);
      showToast(error.message);
    } finally {
      renderLeadTaskOptions();
    }
    return;
  }

  if (target.closest("[data-ai-maintenance-apply]")) {
    const operations = state.aiMaintenance.operations || [];
    if (!operations.length) {
      return;
    }
    if (!confirm(t("confirm.aiMaintenanceApply", { count: operations.length }))) {
      return;
    }
    try {
      const result = await api("/api/ai-maintenance/apply", {
        method: "POST",
        body: JSON.stringify({ operations }),
      });
      state.aiMaintenance.operations = [];
      if (aiMaintenanceApplyButton) {
        aiMaintenanceApplyButton.disabled = true;
      }
      await refreshData();
      showToast(t("toast.aiMaintenanceApplied", { applied: result.applied?.length || 0, rejected: result.rejected?.length || 0 }));
    } catch (error) {
      showToast(error.message);
    }
    return;
  }

  if (target.closest("[data-new-dictionary]")) {
    const sameTypeRows = (state.data.dictionaries || []).filter((row) => row.type === state.dictionaryType);
    const nextOrder = sameTypeRows.length ? Math.max(...sameTypeRows.map((row) => Number(row.sort_order || 0))) + 10 : 10;
    openRecordDrawer("dictionaries", {
      type: state.dictionaryType,
      status: "active",
      sort_order: String(nextOrder),
    });
    return;
  }

  const newRecordButton = target.closest("[data-new-record]");
  if (newRecordButton) {
    const type = newRecordButton.dataset.newRecord;
    const defaults = {
      ...fixedValuesForType(type),
      ...(type === "adminUsers" || type === "adminRoles" ? { status: "active" } : {}),
    };
    openRecordDrawer(type, defaults);
    return;
  }

  if (target.closest("[data-close-record-drawer]")) {
    closeRecordDrawer();
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
      openRecordDrawer(type, record);
      showToast(t("toast.loaded"));
    }
    return;
  }

  const userStatusButton = target.closest("[data-user-status]");
  if (userStatusButton) {
    try {
      await api(`/api/admin/users/${userStatusButton.dataset.id}/${userStatusButton.dataset.userStatus}`, { method: "POST" });
      await refreshData();
      showToast(t("toast.userStatusUpdated"));
    } catch (error) {
      showToast(error.message);
    }
    return;
  }

  const resetPasswordButton = target.closest("[data-reset-password]");
  if (resetPasswordButton) {
    const password = window.prompt(t("prompt.newPassword"));
    if (!password) {
      return;
    }
    try {
      await api(`/api/admin/users/${resetPasswordButton.dataset.resetPassword}/reset-password`, {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      await refreshData();
      showToast(t("toast.passwordReset"));
    } catch (error) {
      showToast(error.message);
    }
    return;
  }

  const reviewButton = target.closest("[data-review-action]");
  if (reviewButton) {
    const action = reviewButton.dataset.reviewAction;
    const type = reviewButton.dataset.reviewType;
    const id = reviewButton.dataset.id;
    const body = {};
    if (action === "reject") {
      const reason = window.prompt(t("prompt.rejectReason"));
      if (!reason) {
        return;
      }
      body.reason = reason;
    }
    try {
      await api(`/api/admin/product-reviews/${type}/${id}/${action}`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      await refreshData();
      showToast(t("toast.reviewUpdated"));
    } catch (error) {
      showToast(error.message);
    }
    return;
  }

  const deleteButton = target.closest("[data-delete]");
  if (deleteButton) {
    const type = deleteButton.dataset.delete;
    const record = findRecord(type, deleteButton.dataset.id);
    const recordName = record?.sku || record?.name || record?.name_en || record?.name_zh || record?.model || record?.code || record?.id;
    if (!record || !confirm(t("confirm.delete", { name: recordName }))) {
      return;
    }
    try {
      await api(`${schemas[type].api}/${record.id}`, { method: "DELETE" });
      await refreshData();
      if (state.editing[type] === record.id) {
        closeRecordDrawer();
      }
      showToast(t("toast.deleted"));
    } catch (error) {
      showToast(error.message);
    }
    return;
  }

  const exportButton = target.closest("[data-export]");
  if (exportButton) {
    const type = exportButton.dataset.export;
    downloadCsv(`${type}.csv`, getFilteredRows(type), schemas[type].columns);
  }
});

document.querySelectorAll("[data-record-form]").forEach((form) => {
  form.addEventListener("change", (event) => {
    if (event.target?.name === "brand") {
      updateVehicleModelOptions(form);
    }
    if (event.target?.name === "model") {
      applyVehicleModelDefaults(form);
    }
  });

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

document.querySelector("[data-dictionary-type]")?.addEventListener("change", (event) => {
  state.dictionaryType = event.target.value;
  renderDictionaryTabs();
  renderDictionaryTable();
});

document.querySelectorAll("[data-search-records]").forEach((input) => {
  input.addEventListener("input", () => {
    const type = input.dataset.searchRecords;
    state.filters[type].query = input.value;
    renderTable(type);
  });
});

document.querySelectorAll("[data-filter-records]").forEach((select) => {
  select.addEventListener("change", () => {
    const type = select.dataset.filterRecords;
    state.filters[type][select.dataset.filterField] = select.value;
    renderTable(type);
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
      const rows = parseCsv(await file.text()).map((row) => ({ ...row, ...fixedValuesForType(type) }));
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

document.querySelectorAll("[data-import-dictionary]").forEach((input) => {
  input.addEventListener("change", async () => {
    const dictionaryType = input.dataset.importDictionary;
    const file = input.files[0];
    if (!file) {
      return;
    }
    try {
      const rows = parseCsv(await file.text());
      const result = await api(`/api/import/dictionaries/${dictionaryType}`, {
        method: "POST",
        body: JSON.stringify({ rows }),
      });
      state.dictionaryType = dictionaryType;
      const select = document.querySelector("[data-dictionary-type]");
      if (select) {
        select.value = dictionaryType;
      }
      await refreshData();
      input.value = "";
      showToast(t("toast.imported", { saved: result.saved.length, rejected: result.rejected.length }));
    } catch (error) {
      input.value = "";
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
  applyLanguage();
  switchView("dashboard");
  window.setInterval(setDashboardClock, 1000);

  if (state.token) {
    setAuthenticated(state.token);
    loadSessionInfo().catch(() => {
      renderSessionInfo();
    });
    refreshData().catch((error) => {
      showToast(error.message);
      logout();
    });
  }
}

boot();
