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
    "nav.aiLogs": "AI Logs",
    "nav.aiMaintenance": "AI Maintenance",
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
    "nav.aiLogs": "AI日志",
    "nav.aiMaintenance": "AI维护",
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
  "nav.groupCommerce": "Commerce",
  "nav.groupSystem": "System",
  "workspace.subtitle": "Centralized export operations for vehicles and auto parts.",
  "workspace.account": "Current account",
  "workspace.status": "Console date",
  "workspace.welcome": "Welcome back",
  "workspace.ipAddress": "IP address",
  "metric.vehiclesHint": "Export catalogue records",
  "metric.partsHint": "Parts inventory records",
  "metric.inquiriesHint": "Customer request pipeline",
  "metric.aiLogsHint": "Traceable assistant actions",
  "dashboard.heroEyebrow": "Live operations",
  "dashboard.heroTitle": "Export Command Center",
  "dashboard.heroText": "Track catalogue capacity, inquiry pressure and AI activity from one control surface.",
  "dashboard.live": "Live",
  "dashboard.snapshotEyebrow": "Snapshot",
  "dashboard.catalogTitle": "Catalogue Overview",
  "dashboard.pipelineEyebrow": "Pipeline",
  "dashboard.inquiryTitle": "Latest Inquiries",
  "dashboard.activityEyebrow": "Realtime",
  "dashboard.activityTitle": "Live Activity",
  "dashboard.tableSegment": "Segment",
  "dashboard.tableTotal": "Total",
  "dashboard.tableReady": "Ready",
  "dashboard.tableTop": "Top Category",
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
  "nav.groupCommerce": "业务管理",
  "nav.groupSystem": "系统管理",
  "workspace.subtitle": "集中管理整车和汽车零配件出口业务。",
  "workspace.account": "当前账号",
  "workspace.status": "控制台日期",
  "workspace.welcome": "欢迎登录",
  "workspace.ipAddress": "IP 地址",
  "metric.vehiclesHint": "整车出口商品记录",
  "metric.partsHint": "零配件库存记录",
  "metric.inquiriesHint": "客户询盘流程",
  "metric.aiLogsHint": "可追踪的 AI 操作",
  "dashboard.heroEyebrow": "实时运营",
  "dashboard.heroTitle": "出口业务指挥中心",
  "dashboard.heroText": "集中查看商品容量、询盘压力和 AI 动作，快速判断今天该处理什么。",
  "dashboard.live": "实时",
  "dashboard.snapshotEyebrow": "总览",
  "dashboard.catalogTitle": "商品数据概览",
  "dashboard.pipelineEyebrow": "管线",
  "dashboard.inquiryTitle": "最新询盘",
  "dashboard.activityEyebrow": "实时",
  "dashboard.activityTitle": "实时动态",
  "dashboard.tableSegment": "模块",
  "dashboard.tableTotal": "总数",
  "dashboard.tableReady": "可用",
  "dashboard.tableTop": "主要类别",
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
    adminUsers: [],
    adminRoles: [],
  },
  aiMaintenance: {
    operations: [],
    lastPreview: null,
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

function isReadyStock(row) {
  return ["ready-export", "in-stock", "limited-stock"].includes(String(row.stock_status || ""));
}

function openInquiryCount() {
  return (state.data.inquiries || []).filter((row) => !["Won", "Lost", "Invalid"].includes(String(row.status || ""))).length;
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

  const vehicles = state.data.vehicles || [];
  const parts = state.data.parts || [];
  const inquiries = state.data.inquiries || [];
  const aiLogs = state.data.aiLogs || [];
  const today = todayKey();
  const rows = [
    {
      segment: t("dashboard.segmentVehicles"),
      total: vehicles.length,
      ready: `${vehicles.filter(isReadyStock).length} ${t("dashboard.readyVehicles")}`,
      top: topValueLabel(vehicles, "vehicle_type", "vehicle_types"),
    },
    {
      segment: t("dashboard.segmentParts"),
      total: parts.length,
      ready: `${parts.filter(isReadyStock).length} ${t("dashboard.readyParts")}`,
      top: topValueLabel(parts, "category", "part_categories"),
    },
    {
      segment: t("dashboard.segmentInquiries"),
      total: inquiries.length,
      ready: `${openInquiryCount()} ${t("dashboard.openInquiries")}`,
      top: topValueLabel(inquiries, "source"),
    },
    {
      segment: t("dashboard.segmentAiLogs"),
      total: aiLogs.length,
      ready: `${aiLogs.filter((row) => String(row.created_at || "").slice(0, 10) === today).length} ${t("dashboard.todayLogs")}`,
      top: topValueLabel(aiLogs, "module"),
    },
  ];

  body.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td><strong>${escapeHtml(row.segment)}</strong></td>
          <td class="number-cell">${escapeHtml(row.total)}</td>
          <td>${escapeHtml(row.ready)}</td>
          <td>${escapeHtml(row.top)}</td>
        </tr>
      `,
    )
    .join("");
}

function renderDashboardInquiries() {
  const body = document.querySelector("[data-dashboard-inquiry-body]");
  if (!body) {
    return;
  }

  const rows = [...(state.data.inquiries || [])].sort((a, b) => parseTime(b.created_at) - parseTime(a.created_at)).slice(0, 5);
  if (!rows.length) {
    body.innerHTML = `<tr><td colspan="4">${escapeHtml(t("dashboard.noData"))}</td></tr>`;
    return;
  }

  body.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td><strong>${escapeHtml(row.name || "--")}</strong></td>
          <td>${escapeHtml(row.source || "Website Form")}</td>
          <td><span class="status-pill status-${statusClass(row.status)}">${escapeHtml(statusText(row.status || "New"))}</span></td>
          <td>${escapeHtml(formatDateTime(row.created_at) || "--")}</td>
        </tr>
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

function switchView(view) {
  state.view = view;
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.viewPanel !== view;
  });
}

function renderMetrics() {
  document.querySelector("[data-metric-vehicles]").textContent = String(state.data.vehicles.length);
  document.querySelector("[data-metric-parts]").textContent = String(state.data.parts.length);
  document.querySelector("[data-metric-inquiries]").textContent = String(state.data.inquiries.length);
  const aiLogsMetric = document.querySelector("[data-metric-ai-logs]");
  if (aiLogsMetric) {
    aiLogsMetric.textContent = String(state.data.aiLogs.length);
  }
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
    body.innerHTML = `<tr><td colspan="8">${t("empty.inquiries")}</td></tr>`;
    return;
  }

  body.innerHTML = state.data.inquiries
    .map(
      (row) => `
        <tr>
          <td>
            <select class="status-select" data-inquiry-status="${escapeHtml(row.id)}">
              ${["New", "Contacted", "Quoted", "Negotiating", "Won", "Lost", "Invalid"]
                .map((status) => `<option value="${status}" ${row.status === status ? "selected" : ""}>${statusText(status)}</option>`)
                .join("")}
            </select>
          </td>
          <td>${escapeHtml(row.name || "")}</td>
          <td>${escapeHtml(row.email || "")}</td>
          <td>${escapeHtml(row.country || "")}</td>
          <td>${escapeHtml(row.source || "Website Form")}</td>
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
  const [vehicles, parts, inquiries, dictionaries, aiLogs, adminUsers, adminRoles, permissions] = await Promise.all([
    api("/api/vehicles"),
    api("/api/parts"),
    apiIfAllowed("/api/inquiries", "inquiries:view"),
    api("/api/dictionaries"),
    apiIfAllowed("/api/ai-logs", "ai_logs:view"),
    apiIfAllowed("/api/admin/users", "users:view"),
    apiIfAllowed("/api/admin/roles", "roles:view"),
    api("/api/admin/permissions"),
  ]);
  state.data.vehicles = vehicles.items || [];
  state.data.parts = parts.items || [];
  state.data.inquiries = inquiries.items || [];
  state.data.dictionaries = dictionaries.items || [];
  state.data.aiLogs = aiLogs.items || [];
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
