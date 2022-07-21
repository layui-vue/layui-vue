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
  <lay-timeline-item title="1.3.x">
    <ul> 
      <a name="1-3-4"></a> 
      <li> 
        <h3>1.3.4 <span class="layui-badge-rim">2022-07-22</span></h3> 
        <ul>         
          <li>[优化] date-picker 组件 width 样式默认为 220px。</li>
          <li>[优化] select 组件 multiple 属性为 true 时, 标签内容滚动。</li>
          <li>[优化] select 组件 multiple 属性为 true 时, 默认 width 为 260px。</li>
          <li>[优化] cascader 组件 item 高度, 新增 min-height 样式。</li>
          <li>[修复] theme-panel 组件因 cascader 组件调整出现布局错误。</li>
        </ul>
      </li>
    </ul>  
    <ul> 
      <a name="1-3-3"></a> 
      <li> 
        <h3>1.3.3 <span class="layui-badge-rim">2022-07-21</span></h3> 
        <ul>         
          <li>[修复] cascader 组件 因 dropdwon 变动而导致的布局错误。</li>
        </ul>
      </li>
    </ul>  
    <ul> 
      <a name="1-3-2"></a> 
      <li> 
        <h3>1.3.2 <span class="layui-badge-rim">2022-07-21</span></h3> 
        <ul>         
          <li>[修复] table 组件 columns 全部设置 width 时, 计算宽度错误。</li>
          <li>[修复] table 组件 max-height 状态, 设置字段 fixed 时 scroll 不固定。</li>
          <li>[修复] color-picker 组件初始色板与默认色不对应问题。</li>
          <li>[优化] dropdown 组件渲染到 body, 避免 css 污染。</li>
        </ul>
      </li>
    </ul>  
      <ul> 
      <a name="1-3-1"></a> 
      <li> 
        <h3>1.3.1 <span class="layui-badge-rim">2022-07-20</span></h3> 
        <ul>         
          <li>[新增] input 组件 append 与 prepend 插槽。</li>
          <li>[新增] input 组件 password 属性, 开启密码模式。</li>
          <li>[新增] table 组件 columns 配置 hide 属性, 用于隐藏列。</li>
          <li>[新增] table 组件 expand-index 属性, 控制展开操作的所在列。</li>
          <li>[新增] table 组件 columns 配置 type 属性 radio 值, 开启单选列。</li>
          <li>[新增] table 组件 columns 配置 type 属性 checkbox 值, 开启复选列。</li>
          <li>[新增] table 组件 columns 配置 type 属性 number 值, 开启序号列。</li>
          <li>[新增] table 组件 columns 配置 totalRow 属性, 开启列值统计。</li>
          <li>[新增] table 组件 selected-key 属性, 配置单选列的选中值。</li>
          <li>[新增] table 组件 data-source 属性, 长度为 0 时的显示状态。</li>
          <li>[新增] date-picker 组件 年月日 范围选择, 重构代码。</li>
          <li>[新增] date-picker 组件 allow-clear 属性, 开启内容清空操作。</li>
          <li>[新增] date-picker 组件 readonly 属性, 开启只读模式。</li>
          <li>[新增] checkbox 组件 size 属性, 用于设置 checkbox 尺寸。</li>
          <li>[新增] radio 组件 size 属性, 用于设置 radio 尺寸。</li>
          <li>[新增] switch 组件 size 属性, 用于设置 switch 尺寸。</li>
          <li>[修复] date-picker 组件 modelValue 属性, 空值报错。</li>
          <li>[修复] input-number 组件 size 属性, lg md sm xs 为可选值。</li>
          <li>[修复] input-number 组件 size 属性, 默认值为 md。</li>
          <li>[修复] rate 组件 has-clear 为 allow-clear 属性。</li>
          <li>[修复] transfer 组件因 checkbox 属性更新而导致的选择逻辑错误。</li>
          <li>[优化] select 组件 multiple 属性开启时的 tag 标签样式。</li>
          <li>[删除] table 组件 checkbox 属性, 由 type = checkbox 列代替。</li>
        </ul>
      </li>
    </ul>  
  </lay-timeline-item>
  <lay-timeline-item title="1.2.x">
      <ul> 
      <a name="1-2-10"></a> 
      <li> 
        <h3>1.2.11 <span class="layui-badge-rim">2022-07-14</span></h3> 
        <ul>         
          <li>[修复] datePicker 组件 初始值为空时无法点击的 BUG。 by @SmallWai</li> 
          <li>[修复] datePicker 组件 点击日期时无法无法选中的问题。 by @SmallWai</li> 
          <li>[修复] datePicker 组件 modelValue 不更新的问题。 by @SmallWai</li> 
          <li>[优化] datePicker 组件 打开时跳转到选中值位置。 by @SmallWai</li> 
          <li>[升级] vite 与 less 版本。</li>
        </ul>
      </li>
    </ul>  
    <ul> 
      <a name="1-2-10"></a> 
      <li> 
        <h3>1.2.10 <span class="layui-badge-rim">2022-07-14</span></h3> 
        <ul>         
          <li><span style="color:#FF5722">[重构]</span> radio 属性, label代表显示值，value代表绑定值。 by @SmallWai</li> 
          <li><span style="color:#FF5722">[重构]</span> checkbox 属性, label代表显示值，value代表绑定值。 by @SmallWai</li> 
          <li>[修复] page 组件 外部更改v-model视图不刷新问题。 by @SmallWai</li> 
          <li>[修复] datePicker 组件 初始值为空时无法点击Bug。 by @SmallWai</li> 
          <li>[修复] datePicker 组件 启用simple属性后无法弹出问题。 by @SmallWai</li> 
          <li>[修复] datePicker 组件 上一次更新带来的Bug。 by @SmallWai</li> 
          <li>[优化] radio 组件 动画效果。 by @SmallWai</li> 
          <li>[新增] formItem 组件 label-width属性，用于控制宽度 by @SmallWai</li> 
          <li>[优化] inputNumber 组件 禁用状态下的样式 by @SmallWai</li>
          <li>[优化] botton 组件 禁用状态下的icon hover样式 by @SmallWai</li>
          <li>[新增] checkboxGroup 组件 disabled属性  by @SmallWai</li>
          <li>[新增] radioGroup 组件 disabled属性  by @SmallWai</li>
        </ul>
      </li>
    </ul>  
    <ul> 
      <a name="1-2-9"></a> 
      <li> 
        <h3>1.2.9 <span class="layui-badge-rim">2022-07-12</span></h3> 
        <ul>         
          <li>[新增] tree 组件 checkbox 加入半选状态。 by @SmallWai</li> 
          <li>[新增] transition 组件 time属性自定义过渡时长 by @SmallWai</li> 
          <li>[修复] datePicker 组件 更新modelValue视图未更新问题 by @SmallWai</li> 
          <li>[修复] uuid 依赖的类型警告, 新增 types/uuid 依赖。by @Jmysy</li>
          <li>[修复] table 组件无法多列固定造成错位的问题。by @Jmysy</li>
          <li>[优化] splitPanel 组件 space 修改成像素, 其他自适应 by @dingyongya</li> 
          <li>[优化] tree 组件 支持更改data数据后刷新视图。 by @SmallWai</li> 
          <li>[优化] tree 组件 checkedKeys支持下级节点 by @SmallWai</li> 
          <li>[优化] tree 组件 关闭连线后启用行内点击 by @SmallWai</li> 
          <li>[优化] tree 组件 默认启用过渡动画 by @SmallWai</li> 
        </ul>
      </li>
    </ul>   
    <ul> 
      <a name="1-2-8"></a> 
      <li> 
        <h3>1.2.8 <span class="layui-badge-rim">2022-07-08</span></h3> 
        <ul>         
          <li>[修复] layer 组件 notifiy 缺失关闭图标。 by @SmallWai</li> 
          <li>[修复] input 组件 modelValue 设置为 zero 不显示的问题。by @Jmysy</li>
          <li>[新增] date-picker 组件 placeholder 属性, 设置提示信息。by @Jmysy</li>
          <li>[新增] textarea 组件 allow-clear 属性, 允许清空。by @Jmysy</li>
          <li>[新增] textarea 组件 change 回调函数。by @Jmysy</li>
          <li>[新增] textarea 组件 clear 回调函数。by @Jmysy</li>
          <li>[新增] cascader 组件 replaceFields属性 用于自义定字段。by @SmallWai</li>
          <li>[新增] cascader 组件 allow-clear属性 用于清空默认slot中的值。by @SmallWai</li>
          <li>[优化] cascader 组件 change 回调函数。 by @SmallWai</li>
          <li>[删除] input 组件 value 属性, 与 v-model 属性冲突。by @Jmysy</li>
        </ul>
      </li>
    </ul>
    <ul> 
      <a name="1-2-7"></a> 
      <li> 
        <h3>1.2.7 <span class="layui-badge-rim">2022-07-07</span></h3> 
        <ul>
          <li>[新增] layer 组件 photos 方法, 支持相册层。 by @SmallWai</li>
          <li>[新增] layer 组件 notifiy 方法, 支持消息通知。by @SmallWai</li>
          <li>[新增] table 组件 columns 配置 fixed 属性, 支持列固定。by @Jmysy</li>
          <li>[新增] dropdown-menu-item 新增 disabled 属性。by @starsatdawn</li>
          <li>[新增] table 组件 skin 属性, 用于 table 风格切换, 可选参数为 row line nob。by @Jmysy</li>
          <li>[修复] table 组件 treetable 默认, 自定义插槽 data 数据不正确。by @Jmysy</li>
          <li>[修复] table 默认加载时有横向滚动条，header 的滚动条占位无法显示。 by @dingyongya</li>
          <li>[修复] table 组件 max-height 下 sm 尺寸 th 不生效。by @Jmysy</li>
          <li>[优化] carousel 首次加载时不应存在动画效果，而是应立即显示默认的item。 by @SmallWai</li>
          <li>[优化] dropdown 组件无法在 overflow: scroll 使用的问题。by @starsatdawn</li>
          <li>[升级] layer-vue 1.4.1 版本。</li>
        </ul>
      </li>
    </ul>
    <ul> 
      <a name="1-2-6"></a> 
      <li> 
        <h3>1.2.6 <span class="layui-badge-rim">2022-07-02</span></h3> 
        <ul>
          <li>[新增] transfer 组件 leftFooter 与 rightFooter 插槽, 用于自定义穿梭框底部内容。by @Jmysy</li>
          <li>[修复] tooltip 组件设置isAutoShow 属性时，宽度设置max-width 时拖动浏览器时出现...时，tooltip不显示问题。 by @dingyongya</li>
          <li>[修复] table 组件设置 ellipsisTooltip 属性时 出现...时，tooltip不显示问题。by @dingyongya</li>
          <li>[优化] transfer 组件 selectedKeys 选中效果, 加入 checkbox 半选状态。by @Jmysy</li>
          <li>[优化] page 组件 hover状态下文字颜色跟当前设置的theme主题色保持一致。by @0o张不歪o0</li>
          <li>[优化] menu 组件 collapse 状态, 提供 popup-menu 悬浮菜单。by @starsatdawn</li>
        </ul>
      </li>
    </ul>
    <ul> 
      <a name="1-2-5"></a> 
      <li> 
        <h3>1.2.5 <span class="layui-badge-rim">2022-06-29</span></h3> 
        <ul>
          <li>[新增] dropdown-sub-menu 组件, 用于呈现二级下拉菜单。</li>
          <li>[新增] dropdown-menu-item 组件 default 插槽, 自定义内容。</li>
          <li>[新增] dropdown-menu-item 组件 prefix 插槽, 自定义内容前缀。</li>
          <li>[新增] dropdown-menu-item 组件 suffix 插槽, 自定义内容后缀。</li>
          <li>[新增] table 组件 rowStyle 属性, 自定义行样式, 值为 function(row, rowIndex) 函数或 string 类型。</li>
          <li>[新增] table 组件 rowClassName 属性, 自定义行样式, 值为 function(row, rowIndex) 函数或 string 类型。</li>
          <li>[新增] table 组件 cellStyle 属性, 自定义单元格样式, 值为 function(row, column, rowIndex, columnIndex) 函数或 string 类型。</li>
          <li>[新增] table 组件 cellClassName 属性, 自定义单元格样式, 值为 function(row, column, rowIndex, columnIndex) 函数或 string 类型。</li>
          <li>[修复] icon-picker 组件在颜色面板中拉动选取颜色，触碰颜色面板边角时，导致色相变为 0。 </li>
          <li>[修复] provider 组件切换主题 Embedded Dark Reader cannot access a cross-origin resource。</li>
          <li>[修复] switch 组件 onswitch-text 与 unswitch-text 使用文档。</li>
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
