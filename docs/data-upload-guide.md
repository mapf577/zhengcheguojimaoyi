# 数据上传方案

## 当前原型怎么上传

当前项目现在有两个后台入口：

- 真实后台管理系统：`http://localhost:3000/admin/`
- 旧的静态上传原型：`prototype/admin.html`

真实后台通过 Node 后端保存数据到 `backend/data/*.json`，上传图片保存到 `backend/uploads/`。

旧静态上传原型没有真实后端和数据库，只会把数据保存到浏览器 `localStorage`，保留它是为了离线演示。

## 真实后台怎么上传

启动后端：

```text
npm start
```

打开后台：

```text
http://localhost:3000/admin/
```

默认开发账号：

```text
admin / admin123
```

真实后台支持：

- 整车新增、编辑、删除。
- 零配件新增、编辑、删除。
- CSV 批量导入。
- CSV 导出。
- 图片上传。
- 询盘查看和状态更新。
- 产品中英文标题和描述维护。

官网入口：

```text
http://localhost:3000/
```

通过这个地址访问官网时，页面会读取后端 API：

```text
/api/vehicles
/api/parts
/api/inquiries
```

## 静态原型怎么上传

静态原型入口：

入口：

```text
prototype/admin.html
```

演示流程：

1. 打开 `prototype/admin.html`。
2. 选择 `Vehicles` 或 `Auto Parts`。
3. 下载模板或示例 CSV。
4. 上传 CSV 文件。
5. 查看校验结果。
6. 点击 `Save Valid Rows`。
7. 回到 `prototype/index.html` 查看导入后的产品展示。

后台还支持：

- 手动新增单条整车或配件。
- 查看当前浏览器已保存数据。
- 删除单条数据。
- 导出已保存数据为 CSV。
- 清空当前类型的已保存数据。

注意：

- 当前保存只在本机当前浏览器生效。
- 换浏览器、清理缓存或点击 `Clear Saved Data` 后，数据会消失。
- 这是上传流程原型，不是正式数据库。

## 模板文件

整车模板：

```text
prototype/data/vehicle-import-template.csv
```

整车示例：

```text
prototype/data/vehicle-import-sample.csv
```

配件模板：

```text
prototype/data/parts-import-template.csv
```

配件示例：

```text
prototype/data/parts-import-sample.csv
```

## 校验规则

整车必填字段：

- `sku`
- `brand`
- `model`
- `year`
- `condition`
- `vehicle_type`
- `energy_type`
- `stock_status`
- `currency`

配件必填字段：

- `sku`
- `category`
- `name`
- `oe_numbers`
- `moq`
- `stock_status`
- `currency`

通用校验：

- 必填字段不能为空。
- 同一个文件内 `sku` 不能重复。
- 价格、年份、座位数、续航等数字字段必须是数字。
- 缺少必填表头时会标记错误。

## 正式系统建议

正式开发时应升级为：

- 后台单条录入。
- Excel 批量导入。
- 图片 ZIP 批量上传。
- 导入预检查。
- 错误行导出。
- 草稿审核后发布。
- 数据库存储。
- 对象存储保存图片。

图片批量上传建议按 SKU 命名：

```text
VEH-BYD-SONG-001-1.jpg
VEH-BYD-SONG-001-2.jpg
PART-BRAKE-001-1.jpg
PART-BRAKE-001-2.jpg
```

CSV/Excel 的 `images` 字段填写：

```text
VEH-BYD-SONG-001-1.jpg;VEH-BYD-SONG-001-2.jpg
```

系统导入时根据 SKU 和图片文件名自动匹配。

## 产品多语言字段

整车和配件都支持以下多语言字段：

```text
title_en
title_zh
description_en
description_zh
```

官网显示规则：

- 当前语言为英文时，优先使用 `title_en` 和 `description_en`。
- 当前语言为中文时，优先使用 `title_zh` 和 `description_zh`。
- 如果对应语言字段为空，会回退到原始产品名称或英文描述。

CSV 模板已经包含这些字段，后台手动新增表单也可以维护这些字段。

## 当前原型的图片字段

当前静态原型不能真正上传图片到服务器，但可以读取 `images` 字段。

如果图片在 `prototype/assets` 目录下，直接填写文件名：

```text
hero-export-yard.png
```

如果是外部图片，可以填写完整 URL：

```text
https://example.com/images/vehicle-001.jpg
```

多个图片用英文分号分隔，当前原型会优先展示第一张：

```text
VEH-BYD-SONG-001-1.jpg;VEH-BYD-SONG-001-2.jpg
```
