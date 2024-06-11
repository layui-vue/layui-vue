# API 和 属性

在 Layer 中提供了多个 API 和多种属性，以便您进行快速开发。

## 说明

### 文档约定

假设您使用 TypeScript 开发，若您不使用 TypeScript，请自行忽略不适用的内容

1. 属性名和参数名均用 *斜体* 标注
2. 若属性有多个类型，则可以在这些类型之中任选一个
3. 无默认值的 *`属性`*，视为 `undefined`
4. 无默认值的 *`参数`*，视为 **必填项**

### 值约定

| 类型 | 标注方法 | 举个栗子 |
| --- | ------- | ------ |
| `string` | 用双引号包括 | `"This is a string"` |
| 其他类型 | 不特殊标注 | `LayerProps` `114514` `true` `false` |

## API

以下是 layer 支持的基础 API。

| 函数签名 | 描述 |
| ------- | --- |
| `create: (option: LayerProps, defaultOption: LayerProps, callback?: Function)` | 创建一个弹层 |
| `open: (option: LayerProps, callback?: Function)` | 打开一个弹层 |
| `close: (id: string)` | 关闭指定 ID 的弹层 |
| `closeAll: ()` | 关闭当前上下文中全部的弹层 |
| `reset: (id: string)` | 重置某个弹层的位置和大小 |
| `full: (id: string)` | 最大化某个弹层 |

## 基础属性

以下是 layer 支持的基础属性。根据 *`type`* 的不同，对基础属性的扩充也各不同，`(通用属性 + 回调) + 扩充属性 = LayerProps`。

请查看后文的 **弹层API** 了解各个 *`type`* 对属性的扩充。

### 通用属性

| 属性 | 描述 | 类型 | 默认值 | 可选值 |
| -- | -- | -- | -- | -- |
| *`id`* | ID | `string` | | |
| *`type`* | 类型 | `string` `number` | `1` | `0` `1` `2` `3` `4` `5` `6` `7` |
| | | | | `"dialog"` `"page"` `"iframe"` `"loading"` |
| | | | | `"drawer"` `"photos"` `"notify"` `"prompt"` |
| *`icon`* | 图标 | `string` `number` | | |
| *`title`* | 标题 | `string` `boolean` | `"信息"` | |
| *`title-style`* | 标题样式 | `string` `StyleValue` | `""` |  |
| *`skin`* | 颜色模式 | `string` | | |
| *`layer-classes (原 skin 属性)`* | layer box 类名 | `string` | | |
| *`z-index`* | zIndex，若不设置则内部将从 `99999` 开始递增 | `number` | | |
| *`content`* | 内容 | `string` `VNode` | | |
| *`v-model`* | 显示 | `boolean` | `false`  | `true` `false` |
| *`offset`* | 位置 | `string` `string[]` | `"auto"` | `"auto"` `[top, left]` |
| *`area`* | 尺寸 | `string` `string[]` | `"auto"`  | `"auto"` `[width, height]` |
| *`move`* | 允许移动 | `boolean` | `true` | `true` `false` |
| *`moveOut`* | 是否可以拖出浏览器可视区域 | `boolean` | `false` | `true` `false` |
| *`maxmin`* | 开启最小/最大化 | `boolean` | `false` | `true` `false` |
| *`resize`* | 允许拉伸 | `boolean` | `false` | `true` `false` |
| *`anim`* | 入场动画 | `number` | `0` | `0` - `6` |
| *`isOutAnim`* | 离场动画 | `boolean` | `true` | `true` `false` |
| *`animDuration`* | 动画持续时间 | `string` | `"0.3s"` | |
| *`btn`* | 底部按钮集合 | `Array<BtnType>` `false` | | |
| *`btnAlign`* | 底部按钮位置 | `string` | `"r"` | `"l"` `"c"` `"r"` |
| *`closeBtn`* | 关闭按钮 | `boolean` `string` | `"1"` | `false` `"1"` `"2"` |
| *`time`* | `msg` `notify` 定时关闭 | `number` | `0` | |
| *`shade`* | 显示遮盖层 | `boolean` | `true` | `true` `false` |
| *`shade-close`* | 遮盖层关闭 | `boolean` | `true` | `true` `false` |
| *`shade-style`*   | 遮盖层样式   | `StyleValue` |  |  |
| *`shade-opacity`* | 遮盖层透明度 | `string` | `"0.1"` | `"0.1"` - `"1"` |
| *`isHtmlFragment`* | 解析 html 字符 | `boolean` | `false` | `true` `false` |
| *`teleport`* | layer挂载到目标DOM | `string` | `body`  |  |
| *`teleportDisabled`* | 禁止挂载到目标DOM，保持原位置 | `boolean` | `false`  | |
| *`lastPosition`* | 最小/最大化复原位置 `true`上次位置(拖动)、 `false` layer初始位置 | `boolean` | `true`  | |
| *`load`* | `type` 为3时，loading Icon   | `number` | `0` | `0`, `1` |
| *`yesText`* | 底部默认按钮文本   | `string` | `确定` |  |

##### `BtnType`

| 参数 | 描述 | 类型 | 默认值 | 可选值 |
| -- | -- | -- | -- | -- |
| *`text`* | 按钮文本 | `string` | | |
| *`callback`* | 回调 | `Function` | | |
| *`style`* | 按钮样式 | `string` `StyleValue` | `""` | |
| *`class`* | 按钮类 | `string` | `""` | |
| *`disabled`* | 是否禁用 | `boolean` | `false` | |

### 回调

| 属性 | 描述 | 类型 | 默认值 | 可选值 |
| -- | -- | -- | -- | -- |
| *`full`* | 最大化回调 | `function` | `(id) => {}` | |
| *`min`* | 最小化回调 | `function` | `(id) => {}` | |
| *`revert`* | 恢复最小/最大化回调 | `function` | `(id) => {}` | |
| *`success`* | layer打开回调 | `function` | `(id) => {}` | |
| *`end`* | layer关闭回调 | `function` | `(id) => {}` | |
| *`close`* | 内部(右上角/点击遮罩/默认确认按钮)关闭回调 | `function` | `(id) => {}` | |
| *`beforeClose`* | 内部(右上角/点击遮罩/默认确认按钮)关闭前回调，返回值为 `true` 内部才会关闭 | `function` | `(id) => boolean` | |
| *`destroy`* | 销毁回调 | `function` | `() => {}` | |
| *`yes`* | 点击底部默认按钮 | `function` | `id` | | |
| *`moveStart`* | 弹窗拖动位置开始回调 | `function` | `id`| - |
| *`moving`* | 弹窗拖动位置回调 | `function` | `id`| - |
| *`moveEnd`* | 弹窗拖动位置结束回调 | `function` | `id`| - |
| *`resizeStart`* | 弹窗拉伸位置开始回调 | `function` | `id`| - |
| *`resizing`* | 弹窗拉伸位置开始回调 | `function` | `id`| - |
| *`resizeEnd`* | 弹窗拉伸位置开始回调 | `function` | `id`| - |

### 事件

| 名称 | 描述 |
| -- | -- |
| *`reset`* | 重置弹窗 `modelValue` 为false 弹窗将打开 |
| *`open`* | 打开弹窗 |
| *`close`* | 关闭弹窗 |
| *`full`* | 最大化 |
| *`min`* | 最小化 |
| *`reset`* | 复原最小/最大化 |

## 弹层API

弹层 API 是对 `layer.open` 的封装。

全部的封装都带有扩充属性 `option`，**调用时与内部预置的 `defaultOption` 配置混合，`Option` 的配置将有更高的优先级**。

| 函数签名 | 描述 |
| ------- | --- |
| `msg: (message: string, option: LayerProps = {}, callback?: Function)` | 消息 |
| `drawer: (option: LayerProps, callback?: Function)` | 抽屉 |
| `load: (load: number, option: LayerProps = {}, callback?: Function)` | 加载 |
| `confirm: (msg: string, option: LayerProps = {}, callback?: Function)` | 确认 |
| `photos: (option: string \| LayerProps, callback?: Function)` | 图片预览 |
| `notify: (option: LayerProps, callback?: Function)` | 通知 |
| `prompt: (option: LayerProps, callback?: Function)` | 输入框 |

----

#### `msg`

对用户进行简单提示。

##### 参数

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | ---- | ----- |
| *`message`* | 要显示的消息 | `string` | `""` |
| *`option`* | 配置 | `LayerProps` | `{}` |
| *`callback`* | 弹层创建后的回调 | `Function` | `(id) => {}` |

##### `defaultOption`

| 参数名 | 描述 | 值 |
| --- | --- | -- |
| *`type`* | 类型 | `0` |
| *`title`* | 标题 | `false` |
| *`content`* | 内容 | *`message`* |
| *`shade-close`* | 遮盖层关闭 | `false` |
| *`closeBtn`* | 关闭按钮 | `false` |
| *`isMessage`* | 是否为消息类型 | `true` |
| *`shade`* | 遮盖层 | `false` |
| *`time`* | 关闭时间 | `1000` |

##### 扩充属性

| 属性 | 描述 | 类型 | 默认值 | 可选值 |
| -- | -- | -- | -- | -- |
| *`isMessage`* | 是否为消息类型 | `boolean` | `true` | `true` `false` |

----

#### `drawer`

弹出抽屉浮层。

##### 参数

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | ---- | ----- |
| *`option`* | 配置 | `LayerProps` |  |
| *`callback`* | 弹层创建后的回调 | `Function` | `(id) => {}` |

##### `defaultOption`

| 属性 | 描述 | 值 |
| --- | --- | -- |
| *`type`* | 类型 | `"drawer"` |

##### 扩充属性

没有扩充属性。

----

#### `load`

加载数据、异步操作。

##### 参数

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | ---- | ----- |
| *`load`* | 加载层样式 | `number` | |
| *`option`* | 配置 | `LayerProps` | |
| *`callback`* | 弹层创建后的回调 | `Function` | `(id) => {}` |

##### `defaultOption`

| 属性 | 描述 | 值 |
| --- | --- | -- |
| *`type`* | 类型 | `3` |
| *`load`* | 加载层样式 | *`load`* |
| *`anim`* | 入场动画 | `5` |
| *`isOutAnim`* | 出场动画 | `false` |
| *`shade-close`* | 遮盖层关闭 | `false` |

##### 扩充属性

| 属性 | 描述 | 类型 | 默认值 | 可选值 |
| -- | -- | -- | -- | -- |
| *`load`* | 加载层样式 | `number` | `0` | `0` - `6` |

----

#### `confirm`

要求用户确认操作。

##### 参数

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | ---- | ----- |
| *`msg`* | 要显示的消息 | `string` | `""` |
| *`option`* | 配置 | `LayerProps` | `{}` |
| *`callback`* | 弹层创建后的回调 | `Function` | `(id) => {}` |

##### `defaultOption`

| 属性 | 描述 | 值 |
| --- | --- | -- |
| *`type`* | 类型 | `0` |
| *`content`* | 内容 | *`msg`* |
| *`shade-close`* | 遮罩层关闭 | `false` |

##### 扩充属性

没有扩充属性。

----

#### `photos`

展示一系列的图片。

##### 参数

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | ---- | ----- |
| *`option`* | 配置 | `string` `ImgListType` | |
| *`callback`* | 弹层创建后的回调 | `Function` | `(id) => {}` |

##### `defaultOption`

| 属性 | 描述 | 值 |
| --- | --- | -- |
| *`type`* | 类型 | `5` |
| *`anim`* | 入场动画 | `2` |
| *`startIndex`* | 初始图片索引 | `0` |
| *`isOutAnim`* | 出场动画 | `true` |
| *`shade-close`* | 遮罩层关闭 | `true` |
| *`shade-opacity`* | 遮罩层透明度 | `"0.2"`|

##### 扩充属性

| 属性 | 描述 | 类型 | 默认值 | 可选值 |
| -- | -- | -- | -- | -- |
| *`startIndex`* | 初始图片索引 | `number` | `0` |  |
| *`imgList`* | 图片列表 | `Array<ImgListType>` | `[]` |  |

##### `ImgListType`

| 属性 | 描述 | 类型 | 默认值 | 可选值 |
| -- | -- | -- | -- | -- |
| *`src`* | 图片地址 | `string` | | |
| *`alt`* | 图片描述 | `string` | `""` | |
| *`thumb`* | 缩略图 | `string` | `""` | |

----

#### `notify`

显示通知。

##### 参数

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | ---- | ----- |
| *`option`* | 配置 | `LayerProps` | |
| *`callback`* | 弹层创建后的回调 | `Function` | `(id) => {}` |

##### `defaultOption`

| 属性 | 描述 | 值 |
| --- | --- | -- |
| *`offset`* | 位置 | `"rt"` |
| *`time`* | 关闭时间 | `2000` |
| *`area`* | 尺寸 | `"auto"` |
| *`shade`* | 遮罩层 | `false` |

##### 扩充属性

没有扩充属性。

----

#### `prompt`

让用户输入少量内容。

##### 参数

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | ---- | ----- |
| *`option`* | 配置 | `LayerProps` | |
| *`callback`* | 弹层创建后的回调 | `Function` | `(id) => {}` |

##### `defaultOption`

| 属性 | 描述 | 值 |
| --- | --- | -- |
| *`type`* | 类型 | `"prompt"` |
| *`shade-close`* | 遮罩层关闭 | `false` |
| *`shade-opacity`* | 遮罩层透明度 | `"0.2"` |

##### 扩充属性

| 属性 | 描述 | 类型 | 默认值 | 可选值 |
| -- | -- | -- | -- | -- |
| *`formType`* | 表单类型 | `string` `number` | `"text"` | `0` `1` `2` `"text"` `"password"` `"textarea"` |
| *`value`* | 表单初始值 | `string` | `""` | |
| *`maxLength`* | 最大输入长度 | `number` | | |
| *`placeholder`* | 占位符 | `string` | `"请输入内容"` | |
