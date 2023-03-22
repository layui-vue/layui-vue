::: title 更新日志
:::

::: describe 严格遵循 <a style="color:#009688;" href="https://semver.org/lang/zh-CN/">Semantic Versioning 2.0.0</a> 语义化版本规范。
:::

::: describe 正常情况下使用 每周 发布策略， 但关键的 bug 修复将需要热修复，所以实际发布版本 可能 每周超过 1 次。
:::

::: describe 若你需要查看更多详情，可前往 <a style="color:#009688;" target="_blank" href="https://gitee.com/layui/layui-vue/releases">Gitee</a>。
:::

::: demo 
<template>
<lay-timeline>
<lay-timeline-item title="1.9.x">
    <ul> 
      <a name="1-9-4"></a> 
      <li> 
        <h3>1.9.4 <span class="layui-badge-rim">2023-03-22</span></h3> 
        <ul> 
          <li>[新增] table 组件 resize 属性，用于开启列宽拉伸，columns 存在同名属性，可用于开启某一列宽拉伸。</li>
          <li>[新增] autocomplete 组件 size 属性，用于设置 input 输入框尺寸。</li>     
          <li>[新增] upload 组件 before-upload 属性，用于设置上传前回调，参数为 file | file[]，通过返回 false 来阻止上传。</li>
          <li>[优化] table 组件 header 样式，移除定位属性，避免与 layer 不必要的层级冲突。</li>
          <li>[修复] date-picker 组件月份面板，点击 1 月份选项被清空的问题。</li>
        </ul>  
      </li>
    </ul>
    <ul> 
      <a name="1-9-3"></a> 
      <li> 
        <h3>1.9.3 <span class="layui-badge-rim">2023-03-17</span></h3> 
        <ul> 
          <li>[新增] table 组件 table-border-radius Css3 变量。</li>     
          <li>[新增] dropdown 组件 dropdown-content-border-radius Css3 变量。 </li>
          <li>[优化] autocomplete 组件 selected 样式，输入内容与提示内容相匹配时，使用次色标注。 </li>
          <li>[优化] global-border-radius 变量对 dropdown 组件下拉面板的样式影响。 </li>
          <li>[优化] global-border-radius 变量对 table 组件样式影响。</li>
          <li>[优化] table 组件 page 分页栏样式，修改 select 高度为 26px。</li>
        </ul>  
      </li>
    </ul>
    <ul> 
      <a name="1-9-2"></a> 
      <li> 
        <h3>1.9.2 <span class="layui-badge-rim">2023-03-13</span></h3> 
        <ul> 
          <li>[新增] auto-complete 组件，带提示的文本输入框，用于辅助输入。<a href="https:/gitee.com/layui/layui-vue/issues/I6JSOA">#I6JSOA</a></li>     
          <li>[新增] page 组件 showPage 属性开启时, 显示首页直达功能，从而改善易用性。<a href="https://gitee.com/layui/layui-vue/issues/I69ZW6">#I69ZW6</a></li>
          <li>[优化] page 组件 limits 所依赖的原生 select 高度, 使其与其他元素保持一致。</li>
          <li>
              <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">autocomplete</h4>
              <ul>
                  <li>[新增] autocomplete 组件 name 属性, input 原生 name 属性。</li>
                  <li>[新增] autocomplete 组件 allow-clear 属性, 用于开启清空操作。</li>
                  <li>[新增] autocomplete 组件 disabled 属性, 用于设置输入框禁用状态。</li>
                  <li>[新增] autocomplete 组件 placeholder 属性, 用于设置输入框提示信息。</li>
                  <li>[新增] autocomplete 组件 fetchSuggestions 属性, 输入时的回调方法，用于查询建议列表。</li>
                  <li>[新增] autocomplete 组件 contentStyle 属性, 继承至 dropdown 组件，用于设置下拉面板的 style 属性。</li>
                  <li>[新增] autocomplete 组件 contentClass 属性, 继承至 dropdown 组件，用于设置下拉面板的 class 属性。</li>
                  <li>[新增] autocomplete 组件 autoFitWidth 属性, 继承至 dropdown 组件，继承至 dropdown 组件，用于设置下拉面板是否与输入框宽度相同。</li>
              </ul>
          </li>
        </ul>  
      </li>
    </ul>
    <ul> 
      <a name="1-9-1"></a> 
      <li> 
        <h3>1.9.1 <span class="layui-badge-rim">2023-03-09</span></h3> 
        <ul>      
          <li>[新增] page 组件 showPage 属性开启时, 显示最后一页直达功能，从而改善易用性。<a href="https://gitee.com/layui/layui-vue/issues/I69ZW6">#I69ZW6</a></li>
          <li>[修复] table 组件 columns 中 type 属性为 number 的列，不会被导出的问题。<a href="https://gitee.com/layui/layui-vue/issues/I6KXVD">#I6KXVD</a></li>
          <li>[修复] table 组件导出功能，如果匹配不到字段不创建列结构，导致 excel 整体错位的问题。<a href="https://gitee.com/layui/layui-vue/issues/I6KXVD">#I6KXVD</a></li>
          <li>[修复] table 组件 columns 中包含 children 属性的 column 设置 fixed 属性不生效的问题。<a href="https://gitee.com/layui/layui-vue/issues/I6L4AY">#I6L4AY</a></li>
          <li>[优化] table 组件 columns 中 type 属性为 checkbox 或 radio 的列，不再被导出。<a href="https://gitee.com/layui/layui-vue/issues/I6KXVD">#I6KXVD</a></li>
        </ul>  
      </li>
    </ul>
    <ul> 
      <a name="1-9-0"></a> 
      <li> 
        <h3>1.9.0 <span class="layui-badge-rim">2023-03-05</span></h3> 
        <ul>      
          <li>[新增] input 组件 focus 与 blur 方法, 通过方法调用促使 input 获取焦点。</li>
          <li>[新增] textarea 组件 focus 与 blur 方法, 通过方法调用促使 textarea 获取焦点。</li>
          <li>[新增] types 目录 components.d.ts 声明文件, web-types.json, attributes.json 和 tags.json 配置文件。</li>
          <li>[优化] upload 组件 cutOptions.layerOption.area 属性, 默认值由 ["640px","640px"] 修改为 "auto"。</li>
          <li>[优化] select 组件 multiple 属性为 true 时, 传递非 array 类型数据时的异常信息。</li>
          <li>[重要] upload 组件 multiple 为 false 时, 上传时 file[0] 字段修改为 file 字段。<span style="color:red;">破坏性</span></li>
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
                  <li>[升级] layer-vue 到 1.6.0 版本。</li>
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
