::: title 更新日志
:::

::: describe 严格遵循 <a style="color:#009688;" href="https://semver.org/lang/zh-CN/">Semantic Versioning 2.0.0</a> 语义化版本规范。
:::

::: describe 正常情况下使用 每周 发布策略， 但关键的 bug 修复将需要热修复，所以实际发布版本 可能 每周超过 1 次。
:::

::: describe 若你需要查看更多详情，可前往 <a style="color:#009688;" target="_blank" href="https://gitee.com/layui/layui-vue/releases">Gitee Releases</a>。
:::

::: demo 
<template>
<lay-timeline>
<lay-timeline-item title="1.9.x">
    <ul> 
      <a name="1-9-0"></a> 
      <li> 
        <h3>1.9.0 <span class="layui-badge-rim">2023-03-10</span></h3> 
        <ul>      
          <li>[新增] input 组件 focus 与 blur 方法, 通过方法调用促使 input 获取焦点。</li>
          <li>[新增] textarea 组件 focus 与 blur 方法, 通过方法调用促使 textarea 获取焦点。</li>
          <li>[新增] types 目录 components.d.ts 声明文件, web-types.json, attributes.json 和 tags.json 配置文件。</li>
          <li>[优化] upload 组件 cutOptions.layerOption.area 属性, 默认值由 ["640px","640px"] 修改为 "auto"。</li>
          <li>[优化] select 组件 multiple 属性为 true 时, 传递非 array 类型数据时的异常信息。</li>
          <li>[重要] upload 组件 multiple 为 false 时, 上传时 file[0] 字段修改为 file 字段。</li>
          <li>
              <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">layer</h4>
              <ul>
                  <li>[新增] layer 组件 footer 插槽, 自定义底部内容, 用于完成高度自定义的操作栏。</li>
                  <li>[新增] layer 组件 btn 数组内对象的 disabled 属性, 用于设置 button 的禁用状态。 </li>
                  <li>[新增] layer 组件 offset 属性 `tl` `tr` `bl` `br` 可选值, 在 drawer 模式时, 首个字母决定动画方向。</li>
                  <li>[修复] layer 组件 offset 属性为 `t` `l` `b` `r`, 并且宽高不是 100% 时, 位置不居中的问题。</li>
                  <li>[修复] layer 组件 title 属性作为 ref 响应值时, 内容高度不随之动态计算, 而导致内容超出窗体本身尺寸。</li>
                  <li>[修复] layer 组件 type 属性为 4 或 `drawer` 并且 offset 属性缺省的情况下弹窗居中显示的问题。</li>
                  <li>[修复] layer 组件 z-index 属性不为空时, 在操作弹窗时会被置顶逻辑覆盖的问题, 优化为 z-index 存在值时, 禁用置顶。</li>
                  <li>[修复] layer 组件 offset 属性的单位为 % 时, 实际位置会减去弹窗宽高/2长度的问题。</li>
                  <li>[优化] layer 组件 type 属性为 notifiy 或 4 类型的样式, 关闭按钮的位置, 标题与内容间距, 边框颜色与阴影等。</li>
                  <li>[优化] layer 组件 area 属性高度自适应, 并兼容一下三种高度自适应写法 area: "300px" || ["300px", "auto"] || ["300px"]。</li>
                  <li>[优化] layer 组件 type 属性为 photos 时, 标题闪烁的问题, 调整为淡入淡出。</li>
                  <li>[优化] layer 组件 content 高度自适应逻辑, 由 js 计算调整为 flex 响应式布局。</li>
                  <li>[升级] layer-vue 到 1.5.3 版本。</li>
              </ul>
          </li>
        </ul>  
      </li>
    </ul>
</lay-timeline-item>
</lay-timeline>
</template>

<script setup>
import { ref } from 'vue';
</script>

:::
