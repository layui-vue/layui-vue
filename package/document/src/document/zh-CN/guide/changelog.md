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
  <lay-timeline-item title="1.2.x">
    <ul> 
      <a name="1-2-0"></a> 
      <li> 
        <h3>1.2.0 <span class="layui-badge-rim">2022-06-21</span></h3> 
        <ul>
          <li>[新增] layui-vue-helper 辅助插件文档。</li>
          <li>[新增] dropdown 组件 placement 属性, 设置下拉面板位置</li>
          <li>[新增] dropdown 组件 autoFitPosition 属性, 超出浏览器边界自动调整下拉面板位置, 默认为 true。</li>
          <li>[新增] dropdown 组件 autoFitWidth 与 autoFitMinWidth 属性, 是否将下拉面板宽度与最小宽度设置为触发器宽度, 默认 false。</li>
          <li>[新增] dropdown 组件 updateAtScroll 属性, 是否在容器滚动时更新下拉面板的位置,默认 false。</li>
          <li>[新增] dropdown 组件 autoFixPosition 属性, 是否在触发器或下拉面板尺寸变化时更新下拉面板位置, 默认 true。</li>
          <li>[新增] dropdown 组件 clickOutsideToClose 属性, 点击面板外部关闭下拉, 默认 true。</li>
          <li>[新增] dropdown 组件 contentOffset 属性, 下拉面板距离触发器的偏移距离，默认 2。</li>
          <li>[新增] carousel 组件渡动画，默认为滑动。</li>
          <li>[修复] carousel 组件 autoplay 属性为false时仍自动播放问题。</li>
          <li>[修复] progress 组件 circle 模式夜间主题不兼容的问题。</li>
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
