<fieldset class="layui-elem-field layui-field-title">
    <legend>选项</legend>
</fieldset>

我们提供了丰富的 `options` 配置, 你可以通过配置来满足对 layer 的定制化, 需要注意的是有些属性仅适用部分组件。

| 属性 | 描述 | 类型 | 默认值 | 可选值 |
| -- | -- | -- | -- | -- |
| type | 类型 | string | `1` | `0` `1` `2` `3` `4` `5` |
| title | 标题 | string boolean | `信息` | -- |
| content | 内容 | string vnode | -- | -- |
| v-model | 显示 | boolean | `false`  | `true` `false` |
| offset | 位置 | string array | `auto` | -- |
| area | 尺寸 | string array | `auto`  | -- |
| move | 拖拽 | boolean | `true` | `true` `false` | 
| maxmin | 缩放 | boolean | `false` | `true` `false` |
| resize | 拉伸 | boolean | `false` | `true` `false` |
| anim | 入场动画 | number | `0` | `0` - `6` |
| isOutAnim | 出场动画 | boolean | `true` | `true` `false` |
| btnAlign | 按钮位置 | string | `r` | `l` `c` `r` |
| closeBtn | 关闭按钮 | boolean string | `1` | `false` `1` `2` |
| time | 关闭时间 | number | `0` | -- |
| shade | 遮盖层 | boolean | `true` | `true` `false` |
| shadeClose | 遮盖层关闭 | boolean | `true` | `true` `false` |
| shadeOpacity | 遮盖层透明度 | string | `0.1` | `0.1` - `1` |
| isHtmlFragment | 解析 html 字符 | boolean | `false` | `true` `false` |
| imgList | 图片数据数组 | array[{src:图片链接,alt:图片名字可选',thumb:'缩略图可选'}] | - | - |
| startIndex | 图片初始浏览索引 | number | 0 | - |
| full | 最大化回调 | function | - | - |
| min | 最小化回调 | function | -  | - |
| restore | 重置回调 | function | -  | - |
| success | 打开回调 | function | -  | - |
| end | 关闭回调 | function | -  | - |