# 整车海外销售平台设计方案

## 1. 平台定位

本系统定位为面向海外采购商、经销商、批发商的整车与汽车零配件展示及询盘平台。第一阶段不建议直接做完整跨境电商闭环，而是优先建设“官网展示 + 精准搜索 + 询盘报价 + 销售跟进”的获客系统。

原因：

- 整车出口价格受车型配置、港口、目标国家、汇率、海运费、认证政策影响，固定在线成交难度高。
- 汽车零配件可以逐步向在线下单发展，但早期仍需要解决 OE 号、适配车型、库存、包装、MOQ、运费确认等问题。
- 海外客户更关注产品真实性、供应能力、出口经验、沟通效率和售后支持。

核心目标：

- 让海外客户快速找到整车或零配件。
- 让客户能用 WhatsApp、邮箱、表单快速询盘。
- 让销售团队能在后台管理产品、客户、询盘和报价。
- 为 Google SEO、广告投放、多语言市场扩展打好基础。

## 2. 用户角色

### 2.1 海外访客

来源包括 Google 搜索、广告、社媒、展会二维码、老客户推荐。

主要诉求：

- 查看可出口车型和配件。
- 比较参数、图片、库存、价格范围。
- 确认是否能发往自己的国家。
- 快速联系销售获取报价。

### 2.2 B2B 采购商

包括海外汽车经销商、车行、维修厂、零配件批发商、工程项目采购商。

主要诉求：

- 批量询价。
- 下载产品资料。
- 获取 FOB/CIF/CFR/EXW 报价。
- 跟踪报价状态和订单进展。

### 2.3 销售人员

主要诉求：

- 及时收到询盘通知。
- 查看客户来源、意向产品、目标国家、采购数量。
- 生成报价单。
- 标记跟进状态。

### 2.4 平台运营人员

主要诉求：

- 维护整车、配件、图片、参数、页面内容。
- 发布案例、新闻、FAQ。
- 管理多语言内容和 SEO 字段。
- 查看询盘转化数据。

### 2.5 系统管理员

主要诉求：

- 管理账号、角色、权限。
- 配置站点语言、币种、联系方式、通知渠道。
- 查看系统日志和数据导入结果。

## 3. 一期范围

一期建议做成可上线获客版本，控制边界：

- 官网首页。
- 整车列表页、详情页。
- 零配件列表页、详情页。
- 关于我们、出口服务、新闻案例、联系我们。
- 多语言基础能力，优先英文，预留西语、法语、阿语、俄语。
- 询盘表单。
- WhatsApp、邮箱、电话快捷联系。
- 后台产品管理。
- 后台询盘管理。
- 后台内容管理。
- 基础 SEO、站点地图、结构化数据。

一期暂不建议做：

- 在线整车支付。
- 复杂订单履约。
- 多仓库存同步。
- ERP 深度集成。
- 客户门户。
- 经销商分级价格。

这些能力应放到二期或三期。

## 4. 官网信息架构

建议主导航：

- Home
- Vehicles
- Auto Parts
- Export Service
- Cases
- News
- About
- Contact

辅助入口：

- WhatsApp
- Email
- Inquiry Cart
- Language Switch
- Search

移动端底部可固定：

- Home
- Vehicles
- Parts
- Inquiry
- WhatsApp

## 5. 首页设计

首页不是普通企业介绍页，而是海外销售转化页。首屏必须明确告诉客户：

- 公司做什么：整车出口 + 汽车零配件供应。
- 可以采购什么：新能源汽车、燃油车、商用车、备件。
- 如何联系：Get Quote、Send Inquiry、WhatsApp。

### 5.1 首页模块顺序

1. 首屏主视觉
   - 标题：Global Vehicle & Auto Parts Export Supplier
   - 副标题：New energy vehicles, fuel cars, commercial vehicles and OEM auto parts for overseas dealers and importers.
   - 按钮：Browse Vehicles、Find Auto Parts、Get Quote
   - 背景：真实车辆仓库、港口装车、展厅或出口场景图片。

2. 快速搜索
   - Vehicle Search：Brand、Energy Type、Body Type、Year、Price Range。
   - Parts Search：OE Number、Part Name、Vehicle Model。

3. 推荐整车
   - 展示 6 到 8 台重点车型。
   - 每张卡片包含品牌、车型、年份、能源、价格范围、库存状态、询盘按钮。

4. 热门零配件
   - 展示发动机件、底盘件、电气件、车身件、易损件。
   - 支持按 OE 号进入详情。

5. 出口服务流程
   - Inquiry
   - Quotation
   - Contract
   - Inspection
   - Customs Clearance
   - Shipping
   - Documents

6. 供应能力
   - 可供车型数量。
   - 合作品牌。
   - 出口国家。
   - 月发运能力。
   - 配件 SKU 数量。

7. 案例与信任背书
   - 港口装运案例。
   - 海外客户交付案例。
   - 检测报告、资质证书、仓库实拍。

8. FAQ
   - Can you ship to my country?
   - What is the MOQ?
   - Do you provide inspection reports?
   - Can you supply spare parts together with vehicles?

9. 页脚
   - 公司信息。
   - 联系方式。
   - 产品分类。
   - 目标市场页面。
   - 隐私政策、条款。

## 6. 整车展示设计

### 6.1 整车列表页

路径建议：

- `/vehicles`
- `/vehicles/new-energy-vehicles`
- `/vehicles/fuel-cars`
- `/vehicles/commercial-vehicles`
- `/vehicles/used-cars`

筛选条件：

- Brand
- Model
- Vehicle Type
- Energy Type
- Year
- Steering
- Seats
- Transmission
- Drive Type
- Price Range
- Stock Status
- Export Availability

排序：

- Latest
- Price Low to High
- Price High to Low
- Popular
- In Stock First

车辆卡片字段：

- 主图。
- 品牌 + 车型。
- 年份。
- 能源类型。
- 续航或排量。
- 变速箱。
- FOB 价格范围或 “Ask for Price”。
- 库存状态。
- Get Quote 按钮。

### 6.2 整车详情页

路径建议：

- `/vehicles/byd-song-plus-ev-2025`

核心模块：

1. 图片/视频区
   - 主图。
   - 外观图。
   - 内饰图。
   - 细节图。
   - 视频。
   - 装运/库存实拍。

2. 关键信息区
   - Brand
   - Model
   - Year
   - Energy Type
   - Mileage
   - Range
   - Battery Capacity
   - Steering
   - Seats
   - Stock Status
   - FOB Price Range
   - Export Port

3. 询盘操作区
   - Get Latest Quote
   - Contact on WhatsApp
   - Add to Inquiry
   - Download Specification

4. 参数表
   - Basic Information
   - Power System
   - Battery / Engine
   - Chassis
   - Body Size
   - Safety
   - Comfort
   - Export Information

5. 配置版本
   - 不同配置版本对比。
   - 支持隐藏价格，仅展示 “Contact for Quote”。

6. 推荐配件
   - 随车易损件。
   - 保养套件。
   - 适配零配件。

7. 相关车型
   - 同品牌。
   - 同价位。
   - 同能源类型。

## 7. 零配件展示设计

### 7.1 零配件分类

一级分类建议：

- Engine Parts
- Transmission Parts
- Chassis Parts
- Suspension Parts
- Brake System
- Electrical Parts
- Body Parts
- Interior Parts
- Cooling System
- Lighting System
- Filters
- Tires & Wheels
- Maintenance Parts

### 7.2 配件列表页

路径建议：

- `/auto-parts`
- `/auto-parts/engine-parts`
- `/auto-parts/brake-system`

筛选条件：

- OE Number
- Part Name
- Category
- Brand
- Applicable Vehicle Brand
- Applicable Model
- MOQ
- Stock Status

配件卡片字段：

- 图片。
- 名称。
- OE/OEM 编号。
- 适配车型。
- MOQ。
- 库存状态。
- Ask for Quote 按钮。

### 7.3 配件详情页

路径建议：

- `/auto-parts/brake-pad-oem-xxxxx`

核心模块：

1. 产品图片。
2. 产品名称。
3. OE/OEM 编号。
4. 适配车型。
5. 产品规格。
6. 材质。
7. 包装方式。
8. 单件重量和体积。
9. MOQ。
10. 库存状态。
11. 交货周期。
12. 询盘按钮。

配件详情页必须优先解决客户的“是否匹配我的车型”问题，因此 OE 号和适配车型要比营销文案更重要。

## 8. 询盘设计

### 8.1 询盘入口

所有核心页面都应该有询盘入口：

- 首页首屏。
- 车辆卡片。
- 车辆详情页。
- 配件卡片。
- 配件详情页。
- 页头固定按钮。
- 移动端底部按钮。

### 8.2 询盘表单字段

基础字段：

- Name
- Company
- Country
- Email
- WhatsApp
- Product
- Quantity
- Destination Port
- Message

整车额外字段：

- Target Vehicle
- Configuration
- Steering Requirement
- Purchase Type：Single / Batch
- Trade Term：FOB / CIF / CFR / EXW

配件额外字段：

- OE Number
- Vehicle Model
- Year
- VIN，可选。
- Required Quantity

### 8.3 询盘状态

后台状态建议：

- New
- Contacted
- Quoted
- Negotiating
- Won
- Lost
- Invalid

每次跟进记录：

- 跟进人。
- 跟进时间。
- 沟通方式。
- 沟通内容。
- 下一次跟进时间。

## 9. 后台管理设计

### 9.1 后台菜单

- Dashboard
- Inquiries
- Vehicles
- Auto Parts
- Categories
- Brands
- Customers
- Quotations
- Content
- Media Library
- SEO
- Users & Roles
- Settings
- Logs

### 9.2 Dashboard

核心指标：

- 今日询盘数。
- 本周询盘数。
- 热门车型。
- 热门配件。
- 国家来源排行。
- 询盘来源排行。
- 待跟进询盘。

### 9.3 整车管理

字段分组：

- 基础信息。
- 销售信息。
- 车辆参数。
- 出口信息。
- 图片视频。
- SEO 信息。
- 多语言内容。

关键操作：

- 新增车辆。
- 批量导入。
- 上架/下架。
- 推荐到首页。
- 复制车型。
- 生成规格表。

### 9.4 零配件管理

字段分组：

- 基础信息。
- OE/OEM 编号。
- 分类品牌。
- 适配车型。
- 库存和 MOQ。
- 包装物流。
- 图片资料。
- SEO 信息。
- 多语言内容。

关键操作：

- 新增配件。
- 批量导入。
- 上架/下架。
- 批量维护 OE 号。
- 批量维护适配车型。

### 9.5 询盘管理

功能：

- 查看询盘列表。
- 按状态、国家、产品类型、销售人员筛选。
- 分配销售。
- 添加跟进记录。
- 转成客户。
- 转成报价。
- 导出 Excel。

### 9.6 报价管理

一期可以做轻量报价：

- 报价编号。
- 客户信息。
- 产品明细。
- 单价。
- 数量。
- 贸易条款。
- 目的港。
- 运费。
- 有效期。
- 备注。
- PDF 导出。

## 10. 数据模型设计

### 10.1 核心实体

- User：后台用户。
- Role：角色。
- Customer：客户。
- Inquiry：询盘。
- InquiryItem：询盘产品项。
- Quotation：报价单。
- QuotationItem：报价明细。
- Vehicle：整车。
- VehicleSpec：车辆参数。
- AutoPart：零配件。
- PartFitment：配件适配关系。
- Brand：品牌。
- Category：分类。
- MediaAsset：媒体资源。
- Article：文章/案例。
- SeoMeta：SEO 信息。
- LocaleContent：多语言内容。

### 10.2 Vehicle 主要字段

| 字段 | 说明 |
| --- | --- |
| id | 主键 |
| slug | URL 标识 |
| brand_id | 品牌 |
| model | 车型 |
| trim | 配置 |
| year | 年份 |
| condition | New / Used |
| vehicle_type | SUV / Sedan / Pickup / Van / Truck |
| energy_type | EV / PHEV / HEV / Gasoline / Diesel |
| steering | LHD / RHD |
| seats | 座位数 |
| transmission | 变速箱 |
| drive_type | FWD / RWD / AWD / 4WD |
| mileage | 里程 |
| range_km | 续航 |
| battery_capacity_kwh | 电池容量 |
| engine_displacement | 排量 |
| color | 颜色 |
| stock_status | In Stock / Preorder / Sold |
| price_min | 最低参考价 |
| price_max | 最高参考价 |
| currency | 币种 |
| export_port | 出口港 |
| status | Draft / Published / Archived |
| is_featured | 是否推荐 |
| created_at | 创建时间 |
| updated_at | 更新时间 |

### 10.3 AutoPart 主要字段

| 字段 | 说明 |
| --- | --- |
| id | 主键 |
| slug | URL 标识 |
| category_id | 分类 |
| brand_id | 品牌 |
| name | 配件名称 |
| oe_numbers | OE/OEM 编号 |
| part_number | 内部编码 |
| applicable_models | 适配车型描述 |
| material | 材质 |
| specification | 规格 |
| moq | 最小起订量 |
| stock_status | 库存状态 |
| lead_time_days | 交期 |
| unit_weight | 单件重量 |
| package_size | 包装尺寸 |
| price_min | 最低参考价 |
| price_max | 最高参考价 |
| currency | 币种 |
| status | Draft / Published / Archived |
| is_featured | 是否推荐 |
| created_at | 创建时间 |
| updated_at | 更新时间 |

### 10.4 Inquiry 主要字段

| 字段 | 说明 |
| --- | --- |
| id | 主键 |
| inquiry_no | 询盘编号 |
| customer_name | 客户姓名 |
| company | 公司 |
| country | 国家 |
| email | 邮箱 |
| whatsapp | WhatsApp |
| product_type | Vehicle / AutoPart / Mixed |
| message | 留言 |
| source_url | 来源页面 |
| source_channel | SEO / Ads / Social / Direct |
| status | 状态 |
| assigned_user_id | 负责人 |
| next_follow_up_at | 下次跟进时间 |
| created_at | 创建时间 |
| updated_at | 更新时间 |

## 11. 多语言设计

一期建议：

- 默认英文。
- 官网和后台支持中文 / 英文切换。
- URL 预留语言前缀。
- 产品数据支持中英文内容字段，例如 `title_en`、`title_zh`、`description_en`、`description_zh`。
- 产品卡片和产品详情按当前语言优先展示对应语言内容。

URL 示例：

- `/en/vehicles`
- `/es/vehicles`
- `/fr/vehicles`
- `/ar/vehicles`
- `/ru/vehicles`

语言优先级建议：

1. English
2. Spanish
3. French
4. Arabic
5. Russian
6. Portuguese

多语言内容不要只翻译菜单，产品标题、参数说明、详情描述、SEO 标题和 Meta 描述都要可翻译。

## 12. SEO 设计

### 12.1 基础 SEO

每个页面需要：

- Title。
- Meta Description。
- Canonical URL。
- Open Graph。
- 图片 ALT。
- 面包屑。
- Sitemap。
- robots.txt。

### 12.2 多语言 SEO

每组多语言页面需要配置 `hreflang`。Google 官方建议多语言或多地区页面明确声明本地化版本，避免搜索引擎错误识别页面关系。

示例：

```html
<link rel="alternate" hreflang="en" href="https://example.com/en/vehicles/byd-song-plus-ev" />
<link rel="alternate" hreflang="es" href="https://example.com/es/vehicles/byd-song-plus-ev" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/vehicles/byd-song-plus-ev" />
```

### 12.3 结构化数据

整车详情页：

- 使用 Product。
- 可结合 schema.org Vehicle / Car 相关属性。
- 包含品牌、车型、图片、描述、报价、库存状态。

零配件详情页：

- 使用 Product。
- 包含名称、图片、品牌、SKU、描述、报价、库存状态。

## 13. 视觉与交互设计方向

整体风格：

- 国际化 B2B。
- 清晰、可信、专业。
- 避免过度装饰。
- 重视产品图、参数表、询盘按钮。

主色建议：

- 深蓝或炭黑作为品牌稳定色。
- 橙色或绿色作为 CTA 强调色。
- 大面积背景使用白色、浅灰。

页面布局：

- 桌面端：左侧筛选 + 右侧产品网格。
- 移动端：顶部筛选抽屉 + 单列卡片。
- 详情页：左图右信息，下方参数和详情。

交互重点：

- 列表页筛选不能太复杂，一期用常用筛选。
- 询盘按钮要始终可见。
- 详情页参数表要支持折叠。
- WhatsApp 按钮移动端固定。

## 14. 技术架构建议

### 14.1 前端

推荐：

- Next.js 或 Nuxt。
- 服务端渲染或静态生成，利于 SEO。
- 响应式设计。
- 图片懒加载和 CDN。

如果团队偏 Vue，建议 Nuxt。
如果团队偏 React，建议 Next.js。

### 14.2 后端

推荐：

- NestJS / Laravel / Spring Boot 均可。
- REST API 优先，后续可扩展 GraphQL。
- 后台和官网共用同一套 API。

### 14.3 数据库

推荐：

- PostgreSQL 或 MySQL。
- 产品、分类、询盘、报价使用关系型结构。
- 搜索可以先用数据库索引，后期再接 Meilisearch / Elasticsearch。

### 14.4 文件存储

推荐：

- 对象存储。
- CDN。
- 图片自动压缩和生成缩略图。

### 14.5 通知

一期建议：

- 邮件通知。
- WhatsApp 链接跳转。
- 后台站内通知。

二期可接：

- WhatsApp Business API。
- 企业微信/飞书/钉钉。
- CRM。

## 15. API 设计草案

公开接口：

- `GET /api/vehicles`
- `GET /api/vehicles/:slug`
- `GET /api/auto-parts`
- `GET /api/auto-parts/:slug`
- `GET /api/categories`
- `GET /api/brands`
- `POST /api/inquiries`
- `GET /api/articles`
- `GET /api/articles/:slug`

后台接口：

- `POST /api/admin/vehicles`
- `PUT /api/admin/vehicles/:id`
- `DELETE /api/admin/vehicles/:id`
- `POST /api/admin/auto-parts`
- `PUT /api/admin/auto-parts/:id`
- `GET /api/admin/inquiries`
- `PUT /api/admin/inquiries/:id/status`
- `POST /api/admin/quotations`
- `GET /api/admin/dashboard`

## 16. 首页线框草案

```text
+-------------------------------------------------------------+
| Logo | Vehicles | Auto Parts | Export Service | About | CTA |
+-------------------------------------------------------------+
| Hero: Global Vehicle & Auto Parts Export Supplier            |
| [Browse Vehicles] [Find Auto Parts] [Get Quote]              |
+-------------------------------------------------------------+
| Quick Search: Brand / Model / OE Number / Category           |
+-------------------------------------------------------------+
| Featured Vehicles                                            |
| [Car Card] [Car Card] [Car Card] [Car Card]                  |
+-------------------------------------------------------------+
| Auto Parts Categories                                        |
| Engine | Brake | Suspension | Electrical | Body | Filters    |
+-------------------------------------------------------------+
| Export Process                                               |
| Inquiry -> Quote -> Inspection -> Customs -> Shipping         |
+-------------------------------------------------------------+
| Cases / Shipment Photos / Certificates                       |
+-------------------------------------------------------------+
| FAQ + Contact Form                                           |
+-------------------------------------------------------------+
| Footer                                                       |
+-------------------------------------------------------------+
```

## 17. 整车详情页线框草案

```text
+-------------------------------------------------------------+
| Breadcrumb: Home / Vehicles / Vehicle Detail                 |
+-------------------------------+-----------------------------+
| Image Gallery                  | Brand / Model / Year        |
|                               | Key Specs                   |
|                               | FOB Price / Ask for Price   |
|                               | [Get Quote] [WhatsApp]      |
+-------------------------------+-----------------------------+
| Tabs: Overview | Specifications | Export Info | FAQ          |
+-------------------------------------------------------------+
| Detailed Specification Table                                  |
+-------------------------------------------------------------+
| Recommended Spare Parts                                      |
+-------------------------------------------------------------+
| Related Vehicles                                             |
+-------------------------------------------------------------+
```

## 18. 零配件详情页线框草案

```text
+-------------------------------------------------------------+
| Breadcrumb: Home / Auto Parts / Brake System                 |
+-------------------------------+-----------------------------+
| Product Images                 | Product Name                |
|                               | OE Number                   |
|                               | Applicable Models          |
|                               | MOQ / Stock / Lead Time     |
|                               | [Ask for Quote] [WhatsApp] |
+-------------------------------+-----------------------------+
| Product Specification                                          |
+-------------------------------------------------------------+
| Fitment Table                                                  |
+-------------------------------------------------------------+
| Packaging & Shipping                                           |
+-------------------------------------------------------------+
| Related Parts                                                  |
+-------------------------------------------------------------+
```

## 19. 分期实施路线

### 19.1 第一阶段：官网 MVP

周期建议：3 到 5 周。

交付内容：

- 前台官网。
- 整车展示。
- 零配件展示。
- 询盘表单。
- 后台产品管理。
- 后台询盘管理。
- 英文内容。
- 基础 SEO。

验收标准：

- 能添加并发布整车。
- 能添加并发布配件。
- 客户能搜索、筛选、查看详情。
- 客户能提交询盘。
- 销售能在后台查看询盘。
- Google 能抓取核心页面。

### 19.2 第二阶段：销售工作台

周期建议：2 到 4 周。

交付内容：

- 客户管理。
- 跟进记录。
- 报价单。
- PDF 报价导出。
- 邮件通知。
- 多语言内容完善。
- 数据看板。

### 19.3 第三阶段：交易与集成

周期建议：4 到 8 周。

交付内容：

- 客户账号。
- 订单管理。
- 配件在线下单。
- 支付接口。
- 库存系统对接。
- 物流接口。
- CRM 集成。
- 广告 Feed。

## 20. 关键风险

### 20.1 产品数据质量

整车和配件平台的成败很大程度取决于数据质量。图片、参数、OE 号、适配车型必须准确，否则客户询盘质量会下降。

应对：

- 设计导入模板。
- 后台做必填校验。
- 上线前先准备 30 到 50 个整车样本和 100 到 300 个配件样本。

### 20.2 多语言质量

机器翻译可以辅助，但产品参数、贸易术语、车型配置不能随意翻译。

应对：

- 英文先做标准。
- 其他语言逐步扩展。
- 关键页面人工校对。

### 20.3 价格展示

整车价格波动大，直接展示固定价格可能造成销售风险。

应对：

- 一期使用价格范围。
- 或显示 Ask for Latest Price。
- 报价以销售正式 PI 为准。

### 20.4 合规与目标市场

不同国家对车辆准入、排放、认证、右舵/左舵、清关文件要求不同。

应对：

- 页面只表达供应能力，不承诺所有国家可进口。
- 询盘时收集目标国家和目的港。
- 出口服务页面明确“根据目标市场确认最终可交付方案”。

## 21. 需要业务方确认的问题

为了进入 UI 设计或开发，需要确认：

1. 公司品牌名、Logo、主域名。
2. 首批目标市场国家。
3. 首批车辆品牌和车型范围。
4. 是否销售二手车。
5. 是否有现成配件 OE 数据。
6. 是否展示价格。
7. 询盘接收方式：邮箱、WhatsApp、CRM 或后台。
8. 技术团队偏 Vue/Nuxt 还是 React/Next.js。
9. 是否需要中文后台、英文前台。
10. 是否已有服务器、对象存储、企业邮箱。

## 22. 推荐下一步

下一步建议先完成三件事：

1. 确定品牌视觉和首页 UI 原型。
2. 整理第一批车辆和配件数据模板。
3. 选择技术栈并初始化项目。

只要以上三项确定，就可以进入实际开发。

## 23. 外部标准参考

- Google 多语言页面与 `hreflang`：https://developers.google.com/search/docs/specialty/international/localized-versions
- Google Product structured data：https://developers.google.com/search/docs/appearance/structured-data/product
- schema.org Automotive / Vehicle：https://schema.org/docs/automotive.html
- Google Vehicle Ads：https://support.google.com/merchants/answer/11189169
