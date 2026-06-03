# 后台整车 / 零配件管理页面改版设计

## 1. 改版目标

当前后台的整车管理和零配件管理采用“左侧表单 + 右侧列表”的结构，适合早期快速录入，但不适合正式后台长期使用。

本次改版目标：

- 页面默认以列表为主。
- 新增和编辑都通过弹窗式交互完成。
- 产品查询、筛选、导入、导出更清晰。
- 表单字段按业务分组，降低录入压力。
- 移动端可全屏编辑。
- 后续方便扩展上架状态、推荐首页、SEO、多图片、批量操作。

## 2. 总体布局

整车管理和零配件管理使用同一套页面结构。

```text
+-------------------------------------------------------------+
| 页面标题                                                     |
| Vehicles / 整车管理                                          |
+-------------------------------------------------------------+
| 搜索框                     筛选项         新增 | 导入 | 导出 |
+-------------------------------------------------------------+
| 数据表格                                                     |
| SKU | 名称 | 分类/车型 | 库存 | 价格 | 更新时间 | 操作       |
|                                             编辑 | 删除       |
+-------------------------------------------------------------+
```

页面原则：

- 列表是主视图。
- 新增按钮在右上角。
- 编辑按钮位于每行操作列。
- 表单不常驻页面。
- 导入 CSV 和导出 CSV 保留在列表工具栏。

## 3. 页面工具栏设计

### 3.1 整车管理工具栏

```text
[搜索 SKU / 品牌 / 车型] [能源类型] [车辆类型] [库存状态] [新增整车] [导入 CSV] [导出 CSV]
```

搜索范围：

- SKU
- 品牌
- 车型
- 英文标题
- 中文标题

筛选项：

- Energy Type：EV / PHEV / Gasoline / Diesel
- Vehicle Type：SUV / Sedan / Commercial / Truck / Van
- Stock Status：In Stock / Factory Order / Sold / Draft

### 3.2 零配件管理工具栏

```text
[搜索 SKU / 名称 / OE 编号] [分类] [库存状态] [新增配件] [导入 CSV] [导出 CSV]
```

搜索范围：

- SKU
- 产品名称
- OE/OEM 编号
- 适配车型
- 英文标题
- 中文标题

筛选项：

- Category：Brake / Engine / Electrical / Body / Chassis
- Stock Status：In Stock / Factory Order / Sold / Draft

## 4. 列表表格设计

### 4.1 整车列表列

```text
SKU
车辆
能源 / 类型
年份
库存
价格
出口港
更新时间
操作
```

车辆列显示：

```text
主标题
品牌 / 车型 / 配置
```

价格列显示：

```text
USD 18500 - 23800
```

操作列：

```text
[编辑] [删除]
```

后续可扩展：

```text
[上架/下架] [推荐]
```

### 4.2 零配件列表列

```text
SKU
配件
分类
OE/OEM
适配车型
MOQ
库存
价格
更新时间
操作
```

配件列显示：

```text
主标题
品牌 / 产品名称
```

操作列：

```text
[编辑] [删除]
```

## 5. 新增 / 编辑交互

新增和编辑都使用右侧抽屉式弹窗。

推荐原因：

- 表单较长，右侧抽屉比居中小弹窗更适合。
- 用户仍能感知背后的列表上下文。
- 保存或取消后可以回到原列表位置。
- 移动端可自然变成全屏抽屉。

### 5.1 抽屉结构

```text
+--------------------------------------------------+
| 新增整车 / 编辑整车                         X    |
+--------------------------------------------------+
| 基础信息                                          |
| [字段] [字段]                                     |
|                                                  |
| 多语言内容                                        |
| [字段] [字段]                                     |
|                                                  |
| 车辆参数 / 匹配信息                               |
| [字段] [字段]                                     |
|                                                  |
| 销售信息                                          |
| [字段] [字段]                                     |
|                                                  |
| 图片                                              |
| [图片地址] [上传图片]                             |
+--------------------------------------------------+
| 取消                                      保存    |
+--------------------------------------------------+
```

### 5.2 抽屉尺寸

桌面端：

```text
宽度：720px
最大宽度：100vw
高度：100vh
```

移动端：

```text
宽度：100vw
高度：100vh
```

底部保存栏固定：

```text
[取消] [保存]
```

这样长表单滚动时，保存按钮始终可见。

## 6. 整车表单分组

### 6.1 基础信息

字段：

- SKU，必填
- Brand，必填
- Model，必填
- Year，必填
- Trim
- Condition，必填

布局：

```text
SKU             Brand
Model           Year
Trim            Condition
```

### 6.2 多语言内容

字段：

- English Title
- Chinese Title
- English Description
- Chinese Description

布局：

```text
English Title
Chinese Title
English Description
Chinese Description
```

描述字段使用 textarea。

### 6.3 车辆参数

字段：

- Vehicle Type，必填
- Energy Type，必填
- Steering
- Seats
- Transmission
- Drive Type
- Range KM
- Battery KWH
- Engine Displacement
- Mileage
- Color

布局：

```text
Vehicle Type        Energy Type
Steering            Seats
Transmission        Drive Type
Range KM            Battery KWH
Engine Displacement Mileage
Color
```

### 6.4 销售信息

字段：

- Stock Status，必填
- Price Min
- Price Max
- Currency，必填
- Export Port

布局：

```text
Stock Status        Currency
Price Min           Price Max
Export Port
```

### 6.5 图片

字段：

- Images
- Upload Image

布局：

```text
Images
[输入图片 URL 或上传后的路径]
[选择文件] [上传图片]
```

后续升级：

- 多图片图库
- 拖拽排序
- 主图选择
- 图片 ALT 文案

## 7. 零配件表单分组

### 7.1 基础信息

字段：

- SKU，必填
- Category，必填
- Brand
- Product Name，必填

### 7.2 多语言内容

字段：

- English Title
- Chinese Title
- English Description
- Chinese Description

### 7.3 匹配信息

字段：

- OE/OEM Numbers，必填
- Part Number
- Applicable Brand
- Applicable Model
- Applicable Year

### 7.4 销售信息

字段：

- MOQ，必填
- Stock Status，必填
- Lead Time Days
- Unit Weight
- Package Size
- Price Min
- Price Max
- Currency，必填

### 7.5 图片

字段：

- Images
- Upload Image

## 8. 弹窗状态设计

### 8.1 新增状态

触发：

```text
点击 [新增整车] 或 [新增配件]
```

表现：

- 抽屉标题：新增整车 / 新增配件
- 表单为空
- 保存按钮：保存
- 保存成功后关闭抽屉
- 列表刷新

### 8.2 编辑状态

触发：

```text
点击某一行 [编辑]
```

表现：

- 抽屉标题：编辑整车 / 编辑配件
- 表单填充当前记录
- 保存按钮：保存修改
- 保存成功后关闭抽屉
- 列表刷新
- 保留当前搜索和筛选条件

### 8.3 删除状态

触发：

```text
点击某一行 [删除]
```

表现：

```text
确认删除 SKU / 产品名称？
[取消] [确认删除]
```

第一阶段可以继续使用 `confirm()`。
后续建议改成统一确认弹窗。

### 8.4 未保存离开

第一阶段可不做。

后续建议：

- 表单已修改但未保存时，点击关闭提示“有未保存内容，确认关闭？”

## 9. 空状态设计

整车无数据：

```text
暂无整车数据
请新增整车或导入 CSV 数据
[新增整车] [导入 CSV]
```

配件无数据：

```text
暂无零配件数据
请新增配件或导入 CSV 数据
[新增配件] [导入 CSV]
```

搜索无结果：

```text
没有找到匹配结果
请调整搜索关键词或筛选条件
[清空筛选]
```

## 10. 响应式设计

### 10.1 桌面端

```text
工具栏横向排列
表格横向滚动
右侧抽屉 720px
```

### 10.2 平板端

```text
工具栏允许换行
搜索框占满第一行
按钮紧随其后
右侧抽屉 86vw
```

### 10.3 手机端

```text
工具栏纵向堆叠
表格可横向滚动
抽屉全屏
底部保存栏固定
```

## 11. 中英文切换

后台当前已经有语言切换能力。

改版后需要确保以下内容跟随语言切换：

- 页面标题
- 工具栏按钮
- 搜索框 placeholder
- 筛选项标签
- 表格表头
- 空状态文案
- 抽屉标题
- 表单字段标签
- 保存 / 取消 / 删除按钮
- Toast 提示

产品数据内容：

- 英文模式优先显示 `title_en`
- 中文模式优先显示 `title_zh`
- 缺失时回退到原始名称

## 12. 代码改造范围

预计主要改动：

```text
admin-system/index.html
admin-system/styles.css
admin-system/app.js
```

后端 API 不需要改动。

现有接口继续使用：

```text
GET    /api/vehicles
POST   /api/vehicles
PUT    /api/vehicles/:id
DELETE /api/vehicles/:id

GET    /api/parts
POST   /api/parts
PUT    /api/parts/:id
DELETE /api/parts/:id
```

图片上传继续使用：

```text
POST /api/uploads
```

CSV 导入继续使用：

```text
POST /api/import/vehicles
POST /api/import/parts
```

## 13. 实施步骤建议

### 第一步：结构改造

- 删除固定左侧 editor panel。
- 列表页上方新增 toolbar。
- 新增抽屉容器。
- 新增遮罩层。

### 第二步：表单抽屉化

- `New` 按钮改为打开抽屉。
- `Edit` 按钮改为打开抽屉并填充数据。
- 保存成功后关闭抽屉。
- 取消关闭抽屉。

### 第三步：列表增强

- 增加搜索框。
- 增加筛选项。
- 表格按筛选结果渲染。
- 无结果时显示空状态。

### 第四步：响应式和语言

- 移动端抽屉全屏。
- 语言切换后重绘 toolbar、table、drawer。

### 第五步：验证

- 新增整车。
- 编辑整车。
- 删除整车。
- 新增配件。
- 编辑配件。
- 删除配件。
- 上传图片。
- 导入 CSV。
- 导出 CSV。
- 中英文切换。
- 移动端布局。

## 14. 不在本次改版内

以下功能先不做，避免范围过大：

- 分页。
- 批量删除。
- 批量上下架。
- 图片拖拽排序。
- SEO 字段管理。
- 多角色权限。
- 操作日志。
- 数据库迁移。

这些可以在后台管理稳定后作为下一轮迭代。
