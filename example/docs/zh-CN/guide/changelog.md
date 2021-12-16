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
  <lay-timeline-item title="0.2.x">
    <ul> 
      <a name="0-2-7"> </a> 
      <li> 
        <h3>0.2.8 <span class="layui-badge-rim">2021-12-15</span></h3> 
        <ul> 
          <li>[新增] tooltip 警告提示，展现需要关注的信息。</li> 
          <li>[新增] input-number 数字输入框, 通过鼠标或键盘，输入范围内的数值。</li> 
          <li>[加强] layer 组件 area 属性, 支持 字符串 与 数组 类型, 默认为 auto 宽高自适应。</li>
          <li>[修复] layer 组件 body 禁用拖动, 仅支持标题拖动窗体。</li>
          <li>[集成] utteranc.es 文档评论。</li>
          <li>[升级] layer-vue 1.1.7。</li>
        </ul> 
      </li>
    </ul>
  </lay-timeline-item>
  <lay-timeline-item title="0.1.x">
    <ul> 
      <a name="0-2-7"> </a> 
      <li> 
        <h3>0.1.1 <span class="layui-badge-rim">2021-12-10</span></h3> 
        <ul> 
          <li>[重写] sort 方法，以便对数字、非数字及混合类等所有内容的排序进行支持</li> 
          <li>[新增] dropdown 组件的 align 参数，用于控制下拉菜单水平对齐方式（支持 left、center、right），默认 left</li> 
          <li>[加强] colorpicker 组件的坐标定位计算方式</li> 
          <li>[修复] 低版本 ie 若干报错问题</li> 
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
