::: title 更新记录
:::

<lay-timeline style="padding-left:30px;padding-top:30px;">
  <lay-timeline-item title="尾版本号：日常问题更新。" simple></lay-timeline-item>
  <lay-timeline-item title="次版本号：带有新特性的向下兼容的版本。" simple></lay-timeline-item>
  <lay-timeline-item title="主版本号：含有破坏性更新和新特性，不在发布周期内。" simple></lay-timeline-item>
</lay-timeline>

::: demo
<template>
<lay-timeline>
  <lay-timeline-item title="1.1.x">
    <ul> 
      <a name="1-1-6"></a> 
      <li> 
        <h3>1.1.6 <span class="layui-badge-rim">2022-06-11</span></h3> 
        <ul>
          <li>[新增] input 组件 prefix-icon 属性, 用于设置输入框前置图标</li>
          <li>[新增] input 组件 suffix-icon 属性, 用于设置输入框后置图标</li>
          <li>[修复] date-picker 组件 v-model 无法解析 yy-mm-dd 年月日, 会显示现在日期的问题</li>
          <li>[优化] dropdown 组件 trigger 属性为 context-menu 值, 不再根据鼠标位置展示内容</li>
          <li>[优化] input-number 组件 v-model 内容默认对齐方式为 center, 更符合普遍的审美</li>
          <li>[升级] vue, vueuse, vue-i18n, darkreader, rollup 等核心依赖 </li>
        </ul>
      </li>
    </ul>
    <ul> 
      <a name="1-1-5"></a> 
      <li> 
        <h3>1.1.5 <span class="layui-badge-rim">2022-06-04</span></h3> 
        <ul>
          <li>[新增] input 组件 label-position 属性, 通过设置改变表单域标签的位置, top、left 为可选值</li>
          <li>[修复] tab 组件 brief 风格 position 为 bottom 时 active-bar 的位置</li>
          <li>[修复] tab 组件 brief 风格 background-color 为 transparent 透明色</li>
          <li>[优化] tab 组件 tab-panel 宽度超出当前组件宽度时, 增加左右滑动的能力</li>
          <li>[优化] input 组件 foucs 状态, 新增 global-checked-color 选中色</li>
          <li>[优化] layer 组件 夜间模式 样式, 新增 border 边框样式</li>
        </ul>
      </li>
    </ul>
    <ul> 
      <a name="1-1-4"></a> 
      <li> 
        <h3>1.1.4 <span class="layui-badge-rim">2022-05-29</span></h3> 
        <ul>
          <li>[新增] table 组件 childrenColumnName 属性, 配置 children 子节点为其他字段</li>
          <li>[新增] table 组件 indent-size 属性, 用于 tree-table 模式控制每一层的缩进宽度</li>
          <li>[新增] table 组件 expand 插槽, 内容较多不能一次性完全展示时使用, 参数 data 为当前行数据</li>
          <li>[新增] table 组件 children 字段解析, 当字段中存在 children 时会自动转化为树表</li>
          <li>[新增] tree 组件 title 插槽, 参数 data 为当前行数据, 用于自定义节点标题</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-1-3"></a> 
      <li> 
        <h3>1.1.3 <span class="layui-badge-rim">2022-05-27</span></h3> 
        <ul>
          <li>[新增] input 组件 clear 事件, 清空内容时触发的无参事件</li>
          <li>[新增] avatar 组件 alt 属性, 用于设置描述图像无法正常显示时的替换文本</li>
          <li>[新增] radio-group 组件, 公用 name change v-model 属性, 简化多 radio 使用</li>
          <li>[修复] tab 组件初始化时, 因无法监听到 slots 变化, 而导致 layui-tab-title 无法正常显示的问题</li>
          <li>[优化] input 组件 allow-clear 触发策略, 由始终显示调整为 v-model 不为空显示</li>
          <li>[优化] icon-picker 组件 search 功能, 为 input 输入框增加清空操作</li>
        </ul> 
      </li>
    </ul>
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
