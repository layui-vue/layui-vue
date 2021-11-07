::: title 更新记录
:::

<lay-timeline style="padding-left:30px;padding-top:30px;">
  <lay-timeline-item title="修订版本号：日常 bugfix 更新" simple></lay-timeline-item>
  <lay-timeline-item title="次版本号：带有新特性的向下兼容的版本。" simple></lay-timeline-item>
  <lay-timeline-item title="主版本号：含有破坏性更新和新特性，不在发布周期内。" simple></lay-timeline-item>
</lay-timeline>

::: demo
<template>
<lay-timeline>
<lay-timeline-item title="0.2.3">
[新增] table 表格 列筛选功能。<br>
[新增] table 表格 row 行单击, row-double 行双击事件。<br>
[新增] layer 弹层 closeBtn 属性, 允许隐藏关闭操作。<br>
[新增] layer 弹层 btnAlign 属性, 允许自定义按钮布局。<br>
[新增] layer 弹层 anim 属性, 支持 7 种入场动画。<br>
[修复] mackdown 文档 table 样式对 table 组件的污染。<br>
[优化] layer 弹层 border 样式。<br>
[优化] layer 弹层 id 默认生成方式, 使用 Guid 作为编号。<br>
[优化] carousel 轮播逻辑, 允许循环切换。<br>
[升级] vue-router 4.0.12 版本。<br>
[升级] vue 3.2.21 版本。<br>
</lay-timeline-item>
<lay-timeline-item title="0.2.2">
[新增] useFullScreen 全屏 hooks。<br>
[新增] useMove 拖拽 hooks。<br>
[新增] textarea 文本域 blur foucs 获取焦点 失去焦点 事件。<br>
[新增] layer 弹层。<br>
</lay-timeline-item>
<lay-timeline-item title="0.2.1">
[新增] hooks 文档
[新增] useClickOutside 外部 click 事件 hooks。<br>
[新增] rate 评分 readonly 属性, 支持只读模式。<br>
[新增] rate 评分 theme 属性, 支持自定义主题。<br>
[新增] progress 文档, 区分 theme 与 size 使用案例。<br>
[新增] dropdown 下拉组件 dropdown-item 点击监听, 隐藏 content 内容。<br>
[新增] input 输入框 foucs blur 原生事件绑定。<br>
[修复] rate 评分 modelValue 属性, 支持双向数据绑定。<br>
</lay-timeline-item>
<lay-timeline-item title="0.2.0">
[新增] carousel 轮播 anim 属性, 支持 default updown 不同方向轮播。<br>
[新增] carousel 轮播 arrow 属性, 支持 always hover none 不同状态切换按钮。<br>
[新增] carousel 轮播 indicator 属性, 支持 none inside outside 不同位置轮播控制器。<br>
[新增] carousel 轮播 change 事件, 用于自定义切换回调事件。<br>
[重构] layout 系列组件, 支持 纵向布局, 横向布局, 嵌套布局等。<br>
</lay-timeline-item>
<lay-timeline-item title="0.1.9">
[新增] carousel 轮播组件, 初步完成切换逻辑。<br>
[新增] colorPicker 颜色选择器, 初步完成组件渲染。<br>
[文档] 新增首页模块。<br>
[文档] 拆分菜单为指南与组件模块。<br>
[文档] 新增全局内容检索。<br>
</lay-timeline-item>
<lay-timeline-item title="0.1.8">
[新增] table 表格 size 属性, 提供不同尺寸。<br>
[新增] transfer 穿梭框 item 插槽, 允许自定义列表项。<br>
[新增] select 下拉选择 change 事件, 值变动触发回调。<br>
[新增] select-option 下拉选择项 disabled 属性, 允许可选项禁用。<br>
[修复] transfer 穿梭框 切换 逻辑。<br>
[删除] dropdown 下拉菜单 padding 样式。<br>
</lay-timeline-item>
<lay-timeline-item title="0.1.7">
[新增] page 分页 prev 插槽。<br>
[新增] page 分页 next 插槽。<br>
[新增] button 按钮 naiveType 属性, 原生 type 属性, 支持 button, submit 可选值。<br>
[新增] form 表单 model 属性, 共 submit 等事件作为入参。<br>
[新增] form 表单 submit 事件, 内部 submit 提交回调。<br>
[修复] menu 菜单 selectedKey 选中项 openKeys 打开项 props 双绑。<br>
[修复] tab 选项卡 v-model 激活项 双绑。<br>
[修复] tab 选项卡 tab-item 组件套用 for 循环无法获取 props 属性。<br>
[重构] tree 树内部逻辑, 优化性能。<br>
</lay-timeline-item>
<lay-timeline-item title="0.1.4">
[新增] button 按钮 loading 属性, 提供 加载 状态。<br>
[新增] tab 选项卡 allow-close 属性，支持 关闭。<br>
[新增] tab 选项卡 close change 事件，扩展 tab 动态逻辑。<br>
[新增] ClickOutside 工具。<br>
[新增] menu 菜单 selectedKey, openKeys 属性。<br>
[修复] menu 菜单 layui-this 样式，多 a 标签样式重叠。<br>
</lay-timeline-item>
<lay-timeline-item title="0.1.1">
[新增] menu 菜单 title 插槽，允许自定义菜单项。<br>
[新增] table 表格 toolbar 插槽, 用于自定义工具栏。<br>
[新增] icon 图标 color 属性, 用于自定义颜色。<br>
[新增] icon 图标 size 属性, 用于自定义尺寸。<br>
[新增] breadcrumb-item 面包屑 default 插槽, 用于自定义标题。<br>
[调整] menu 菜单 child-item 行高, 由 40 调整为 46。<br>
[调整] breadcrumb 面包屑样式, 让 Api 更合理。<br>
</lay-timeline-item>
<lay-timeline-item title="0.1.0">
[新增] tree 树，支持 node-click，selectKeys 等<br>
[新增] table 表格，提供 columns datasource page 分页<br>
[新增] transfer 穿梭框，提供 双列表数据切换<br>
[新增] textarea 文本域 input 事件 与 disabled 禁用属性<br>
[新增] button 按钮 disabled 禁用属性<br>
[新增] input 输入框 disabled 禁用属性<br>
[新增] checkbox 复选框 disabled 禁用属性<br>
[新增] icon 图标 prefix 属性，支持自定义 iconfont 引入使用<br>
[修改] card 卡片 slot 判断逻辑，body 不存在时，使用 default slot<br>
[修改] field 字段逻辑，当 slot 为空时，展现为线状，否则为面板<br>
[修复] collapse 手风琴，展开 收起 状态时的不同图标展示<br>
[重构] checkbox 复选框逻辑，让 api 更合理<br>
[依赖] 升级 vue 3.2.20 依赖<br>
</lay-timeline-item>
<lay-timeline-item title="0.0.17">
[新增] table 表格组件<br>
[新增] tab 选项卡组件<br>
[新增] rate 评分组件<br>
[新增] button 组件 border 属性，设置边框颜色<br>
[新增] iconPicker 组件 showSearch 配置, 是否启用搜索<br>
[新增] page 分页组件<br>
[修复] menu 组件，菜单项 与 目录 重复渲染<br>
[支持] 完善 layui-vue-sample 案例<br>
[支持] 文档支持模糊查询, 用于快速检索组件文档<br>
[支持] 文档移动端预览<br>
</lay-timeline-item>
<lay-timeline-item title="0.0.14">
[新增] menu 菜单组件<br>
[新增] iconPicker 图标选择组件<br>
[新增] anim 动画文档<br>
[新增] dropdown 下拉菜单组件<br>
[新增] color 颜色文档<br>
[新增] collapse 手风琴组件<br>
[新增] select 下拉选择组件<br>
[新增] empty 空数据组件<br>
[新增] scroll 滚动容器组件<br>
[新增] avatar 头像组件<br>
</lay-timeline-item>
</lay-timeline>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::
