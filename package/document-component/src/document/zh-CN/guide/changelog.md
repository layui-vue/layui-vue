::: title 更新记录
:::

<lay-timeline style="padding-left:30px;padding-top:30px;">
  <lay-timeline-item title="🐛 尾版本号：日常问题更新。" simple></lay-timeline-item>
  <lay-timeline-item title="🌟 次版本号：带有新特性的向下兼容的版本。" simple></lay-timeline-item>
  <lay-timeline-item title="♻️ 主版本号：含有破坏性更新和新特性，不在发布周期内。" simple></lay-timeline-item>
</lay-timeline>

::: demo
<template>
<lay-timeline>
  <lay-timeline-item title="1.2.x">
    <ul> 
      <a name="1-2-5"></a> 
      <li> 
        <h3>1.2.5 <span class="layui-badge-rim">2022-06-28</span></h3> 
        <ul>
          <li>[新增] table 组件 rowStyle 属性, 自定义行样式, 值为 function(row, rowIndex) 函数或 string 类型。</li>
          <li>[新增] table 组件 rowClassName 属性, 自定义行样式, 值为 function(row, rowIndex) 函数或 string 类型。</li>
          <li>[新增] table 组件 cellStyle 属性, 自定义单元格样式, 值为 function(row, column, rowIndex, columnIndex) 函数或 string 类型。</li>
          <li>[新增] table 组件 cellClassName 属性, 自定义单元格样式, 值为 function(row, column, rowIndex, columnIndex) 函数或 string 类型。</li>
          <li>[修复] icon-picker 组件在颜色面板中拉动选取颜色，触碰颜色面板边角时，导致色相变为 0。 </li>
          <li>[修复] provider 组件切换主题 Embedded Dark Reader cannot access a cross-origin resource。</li>
        </ul>
      </li>
    </ul>
    <ul> 
      <a name="1-2-4"></a> 
      <li> 
        <h3>1.2.4 <span class="layui-badge-rim">2022-06-28</span></h3> 
        <ul>
          <li>[新增] select 组件 多选模式下 的搜索功能。 </li>
          <li>[新增] table 组件 even 属性, 用于开启斑马条纹背景样式。</li>
          <li>[新增] dropdown 组件 placement 属性 right left right-bottom right-top left-bottom left-top 值。</li>
          <li>[新增] affix 组件, 使用锚点，可以将内容固定在容器内，并且不随容器的滚动而滚动，常用于侧边菜单导航等。 </li>
          <li>[新增] affix 组件 position 属性, 用于设置固定的位置, 可选值为 top 与 bottom。</li>
          <li>[新增] affix 组件 offset 属性, 定位偏移量, 默认为 0。</li>
          <li>[新增] affix 组件 target 属性, 定位时的参考容器, 默认为 document.body。</li>
          <li>[修复] date-picker 组件 prefix-icon 前置图标无边距的问题。</li>
          <li>[修复] input 组件 foucs 状态时 border 颜色为 #d2d2d2。</li>
          <li>[修复] cascader 组件 children 不能为空的问题。</li>
          <li>[修复] scroll 组件 按需加载时 index.css 不存在的问题。</li>
        </ul>
      </li>
    </ul>
    <ul> 
      <a name="1-2-2"></a> 
      <li> 
        <h3>1.2.2 <span class="layui-badge-rim">2022-06-26</span></h3> 
        <ul>
          <li>[新增] tab 组件 activeBarTransition 属性, 启用 activeBar 过渡动画。 </li>
          <li>[新增] cascader 组件 onlyLastLevel 属性 控制 displayValue 回显数据层级。</li>
          <li>[修复] cascader 组件 children 不能为空的问题。</li>
          <li>[优化] icon-picker 组件 lay-input 引用使用类型错误</li>
          <li>[优化] row 与 col 组件的所有属性同时兼容 number 与 string 类型。</li>
          <li>[优化] table 组件 childrenColumnName 属性为非必填。</li>
          <li>[优化] notice-bar 组件 color 与 background 属性的类型警告。</li>
          <li>[优化] upload 组件 cutOptions 属性非必填, 在 cut 为 false 时。</li>
          <li>[优化] radio 组件 name 属性非必填, 在一些应用场景下 name 没有存在的必要。</li>
          <li>[优化] checkbox 组件 isIndeterminate 属性类型非必填。</li>
        </ul>
      </li>
    </ul>
    <ul> 
      <a name="1-2-1"></a> 
      <li> 
        <h3>1.2.1 <span class="layui-badge-rim">2022-06-23</span></h3> 
        <ul>
          <li>[新增] dropdown 组件 placement 属性, 设置下拉面板位置。</li>
          <li>[新增] dropdown 组件 autoFitPosition 属性, 超出浏览器边界自动调整下拉面板位置, 默认为 true。</li>
          <li>[新增] dropdown 组件 autoFitWidth 与 autoFitMinWidth 属性, 是否将下拉面板宽度与最小宽度设置为触发器宽度, 默认 false。</li>
          <li>[新增] dropdown 组件 updateAtScroll 属性, 是否在容器滚动时更新下拉面板的位置,默认 false。</li>
          <li>[新增] dropdown 组件 autoFixPosition 属性, 是否在触发器或下拉面板尺寸变化时更新下拉面板位置, 默认 true。</li>
          <li>[新增] dropdown 组件 clickOutsideToClose 属性, 点击面板外部关闭下拉, 默认 true。</li>
          <li>[新增] dropdown 组件 contentOffset 属性, 下拉面板距离触发器的偏移距离，默认 2。</li>
          <li>[新增] progress 组件 circleSize 和 circleWidth 属性, 用于控制环形进度条尺寸与线条宽度。</li>    
          <li>[修复] progress 组件 circle 模式夜间主题不兼容的问题。</li>
          <li>[新增] carousel 组件 过渡动画，默认为滑动。</li>
          <li>[修复] carousel 组件 autoplay 属性为false时仍自动播放问题。</li>
          <li>[修复] cascader 组件 按需加载无法正常引入使用。</li>
        </ul>
      </li>
    </ul>
  </lay-timeline-item>
  <lay-timeline-item title="1.1.x">
      <ul> 
      <a name="1-1-9"></a> 
      <li> 
        <h3>1.1.10 <span class="layui-badge-rim">2022-06-21</span></h3> 
        <ul>
          <li>[修复] darkreader 依赖不存在的问题</li>
          <li>[修复] cascader 组件的样式文件污染</li>
        </ul>
      </li>
    </ul>
      <ul> 
      <a name="1-1-9"></a> 
      <li> 
        <h3>1.1.9 <span class="layui-badge-rim">2022-06-21</span></h3> 
        <ul>
          <li>[新增] progress 组件 circle 属性, 支持环形进度条</li>
          <li>[新增] cascader 组件, 将数据按照指定的格式传入后分层分级，通过此组件逐级查看并选择</li>
          <li>[新增] page-header 组件,页面的路径比较简单,则使用页头组件要,比面包屑更直观一点</li>
          <li>[修复] layer 组件 btn 属性 callback 回调参数 id 为空的问题</li>
          <li>[优化] layer 组件 callback 回调 id 参数, 配合 layer.close() 关闭当前弹层</li>
          <li>[优化] layui-vue 在 nuxt3 中的使用, 将 darkreader 替换为 ssr-darkreader</li>
        </ul>
      </li>
    </ul>
    <ul> 
      <a name="1-1-8"></a> 
      <li> 
        <h3>1.1.8 <span class="layui-badge-rim">2022-06-20</span></h3> 
        <ul>
          <li>[新增] provider 组件 theme 属性 auto 值, 自动跟随系统主题</li>
          <li>[新增] checkbox 组件 is-indeterminate 属性, 用于展示半选状态</li>
          <li>[新增] layui-vue-helper 插件, 用于 Visual Studio Code 辅助开发</li>
          <li>[新增] textarea 组件 show-count 属性, 用于展示输入长度与 max-length</li>
          <li>[修复] carousel 组件加载时无法获取 carousel-item 轮播项</li>
          <li>[修复] input-number 组件 modelValue 属性类型错误</li>
          <li>[修复] checkbox 组件 夜间模式 选中状态异常</li>
          <li>[优化] table 组件 checkedKeys 属性, 加入半选状态</li>
        </ul>
      </li>
    </ul>
    <ul> 
      <a name="1-1-7"></a> 
      <li> 
        <h3>1.1.7 <span class="layui-badge-rim">2022-06-13</span></h3> 
        <ul>
          <li>[新增] upload 组件 default 插槽, 允许自定义上传入口</li>
          <li>[新增] transfer 组件 width 与 height 属性, 允许自定义盒子尺寸</li>
          <li>[新增] table 组件 max-height 与 height 属性, 超出指定高度标题固定</li>
          <li>[修复] transfer 组件 input 样式, 由原生 input 修改为 lay-input 组件</li>
          <li>[修复] transfer 组件 transfer-data 高度超出 transfer-box 的问题</li>  
          <li>[修复] table 组件 按需加载 时, 内置 checkbox 无法正常显示的问题</li>
          <li>[优化] input 组件 modelValue 属性非必填, 使用 @input 回调取值</li>
        </ul>
      </li>
    </ul>
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
