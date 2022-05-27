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
      <a name="1-1-3"></a> 
      <li> 
        <h3>1.1.3 <span class="layui-badge-rim">2022-05-21</span></h3> 
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
