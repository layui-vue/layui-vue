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
<lay-timeline-item title="1.9.x">
    <ul> 
      <a name="1-9-0"></a> 
      <li> 
        <h3>1.9.0 <span class="layui-badge-rim">2023-03-10</span></h3> 
        <ul>      
          <li>[新增] types 目录 components.d.ts 声明文件, web-types.json, attributes.json 和 tags.json 配置文件。</li>
          <li>[优化] upload 组件 cutOptions.layerOption.area 属性, 默认值由 ["640px","640px"] 修改为 "auto"。</li>
          <li>[优化] upload 组件 multiple 为 false 时, 上传时 file[0] 字段修改为 file 字段。<a style="color:red">破坏性</a></li>
          <li>[优化] select 组件 multiple 属性为 true 时, 传递非 array 类型数据时的异常信息。</li>
          <li>[升级] layer-vue 到 1.5.3 版本。</li>
          <li>
              <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">layer</h4>
              <ul>
                  <li>[新增] layer 组件 btn 数组内对象的 disabled 属性, 用于设置 button 的禁用状态。 </li>
                  <li>[新增] layer 组件 offset 属性 `tl` `tr` `bl` `br` 可选值, 在 drawer 模式时, 首个字母决定动画方向。</li>
                  <li>[修复] layer 组件 offset 属性为 `t` `l` `b` `r`, 并且宽高不是 100% 时, 位置不居中的问题。</li>
                  <li>[修复] layer 组件 title 属性作为 ref 响应值时, 内容高度不随之动态计算, 而导致内容超出窗体本身尺寸。</li>
                  <li>[修复] layer 组件 type 属性为 4 或 `drawer` 并且 offset 属性缺省的情况下弹窗居中显示的问题。</li>
                  <li>[修复] layer 组件 z-index 属性不为空时, 在操作弹窗时会被置顶逻辑覆盖的问题, 优化为 z-index 存在值时, 禁用置顶。</li>
                  <li>[修复] layer 组件 offset 属性的单位为 % 时, 实际位置会减去弹窗宽高/2长度的问题。</li>
                  <li>[优化] layer 组件 type 属性为 notifiy 或 4 类型的样式, 关闭按钮的位置, 标题与内容间距, 边框颜色与阴影等。</li>
                  <li>[优化] layer 组件 area 属性高度自适应, 并兼容一下三种高度自适应写法 area: "300px" || ["300px", "auto"] || ["300px"]。</li>
              </ul>
          </li>
        </ul>  
      </li>
    </ul>
</lay-timeline-item>
<lay-timeline-item title="1.8.x">
    <ul> 
      <a name="1-8-10"></a> 
      <li> 
        <h3>1.8.10 <span class="layui-badge-rim">2023-02-19</span></h3> 
        <ul>        
          <li>[修复] layer 与 dropdown 的层级错误, 无法在 layer 中正常显示的问题。</li>
        </ul>  
      </li>
    </ul>
    <ul> 
      <a name="1-8-9"></a> 
      <li> 
        <h3>1.8.9 <span class="layui-badge-rim">2023-02-19</span></h3> 
        <ul>
          <li>[修复] layer 组件在创建多个时, z-index 层级无法自增的问题。</li>
          <li>[修复] upload 组件裁剪后的文件固定为 image/png 类型, 与裁剪前不一致的问题。</li>
          <li>[优化] 公共工具打包到 badge 目录的问题, 在 es 模式时 badge 组件被其他组件导入的问题。</li>
          <li>[优化] upload 组件 cut-options 属性, 修复其响应式特性失效的问题。</li>
          <li>[优化] layer 组件在点击标题时, 置于所有已存在的弹出层最顶部。</li>
          <li>[优化] 移除 vue/reactivity 在源码中的使用, 从而改善打包。 </li>
          <li>[升级] @vueuse/core 到 9.12.0 版本。</li>
          <li>[升级] layer-vue 到 1.4.9 版本。</li>
        </ul>  
      </li>
    </ul>
    <ul> 
      <a name="1-8-8"></a> 
      <li> 
        <h3>1.8.8 <span class="layui-badge-rim">2023-02-17</span></h3> 
        <ul>
          <li>[修复] layer 组件 z-index 缺少响应式特性的问题。 </li>
          <li>[修复] page 组件 showPage 为 true 时, 上下页操作处于禁用状态的问题。</li>
          <li>[升级] layer-vue 1.4.8 版本。</li>
        </ul>  
      </li>
    </ul>
    <ul> 
      <a name="1-8-7"></a> 
      <li> 
        <h3>1.8.7 <span class="layui-badge-rim">2023-02-06</span></h3> 
        <ul>
          <li>[新增] tree 组件 expandKeys 属性, 用于设置展开节点</li>
          <li>[新增] cascader 组件 changeOnSelect 属性，用于开启选择即改变功能。</li>
          <li>[新增] textarea 组件 autosize 属性, 根据内容宽度自适应默认高度。</li>
          <li>[新增] textarea 组件 rols 属性, 原生属性。</li>
          <li>[新增] textarea 组件 cols 属性, 原生属性。</li>
          <li>[修复] textarea 组件 width 和 height 样式不生效的问题。</li>
        </ul>  
      </li>
    </ul>
    <ul> 
      <a name="1-8-6"></a> 
      <li> 
        <h3>1.8.6 <span class="layui-badge-rim">2023-02-03</span></h3> 
        <ul>
          <li>[新增] table 组件列插槽 row column rowIndex columnIndex 参数。</li>
          <li>[修复] upload 组件 before 事件重复回调的问题。</li>
          <li>[修复] upload 组件 layerOption 设置后，默认配置失效的问题。</li>
          <li>[过时] table 组件列插槽 data 参数。</li>
        </ul>  
      </li>
    </ul>
    <ul> 
      <a name="1-8-5"></a> 
      <li> 
        <h3>1.8.5 <span class="layui-badge-rim">2023-01-24</span></h3> 
        <ul>
          <li>[修复] upload 组件 cutOption 配置中 copperOption 属性不生效的问题。</li>
          <li>[修复] form-item 组件在 unmounted 卸载时，不会在 form 中注销，导致不正确的验证逻辑。</li>
          <li>[修复] table 组件 columns 多级表头 children 配置启用时，尾节点的右边框不显示。</li>
        </ul>  
      </li>
    </ul>
    <ul> 
      <a name="1-8-4"></a> 
      <li> 
        <h3>1.8.4 <span class="layui-badge-rim">2023-01-11</span></h3> 
        <ul>
          <li>[新增] table 组件 customSlot 插槽 column 参数，用于获取当前渲染的列信息。</li>
          <li>[修复] tree-select 组件 v-model 属性设置 null 与 undefined 时，placeholder 不生效。</li>
          <li>[修复] select 组件 v-model 属性设置 null 与 undefined 时，placeholder 不生效。</li>
          <li>[修复] table 组件 columns 属性配置 children 插槽不生效的问题。</li>
        </ul>  
      </li>
    </ul>
    <ul> 
      <a name="1-8-3"></a> 
      <li> 
        <h3>1.8.3 <span class="layui-badge-rim">2023-01-06</span></h3> 
        <ul>
          <li>[修复] tree-select 组件多选模式点击节点产生错误异常的问题。</li>
          <li>[修复] tree-select 组件 checkStrictly 属性为 false 时，删除父节点子节点不删除的问题。</li>
          <li>[修复] date-picker 组件范围选择，type 属性为 yearmonth 时右下角仍展示具体日期的问题。</li>
          <li>[修复] input 组件 style 属性 border-radius 设置过大导致的边角缺失。</li>
          <li>[修复] input 组件 type 属性为 number 时显示原生加减操作的问题。</li>
          <li>[文档] 主题配置 "重置配置" 功能实现。</li>
        </ul>  
      </li>
    </ul>
    <ul> 
      <a name="1-8-2"></a> 
      <li> 
        <h3>1.8.2 <span class="layui-badge-rim">2022-12-29</span></h3> 
        <ul>
          <li>[修复] select 组件多选模式 placeholder 在有选中值时仍显示的问题。</li>
          <li>[修复] tree-select 组件多选模式 placeholder 在有选中值时仍显示的问题。</li>
          <li>[修复] tree-select 组件多选模式点击 + - 号仍触发 change 事件的问题。</li>
        </ul>  
      </li>
    </ul>
    <ul> 
      <a name="1-8-1"></a> 
      <li> 
        <h3>1.8.1 <span class="layui-badge-rim">2022-12-29</span></h3> 
        <ul>
          <li>[修复] badge 组件 color 属性失效的问题。</li>
          <li>[修复] barcode 组件属性缺少响应式的能力。 </li>
          <li>[修复] treeSelect 多选模式 值 无法删除的问题。</li>
          <li>[修复] treeSelect 多选模式 change 事件多次触发的问题。</li>
          <li>[修复] qrcode 组件 backgroundColor 属性必填警告。</li>
          <li>[修复] qrcode 组件属性缺少响应式的能力。 </li>
          <li>[修复] qrcode 组件 width 属性必填警告。</li>
          <li>[修复] qrcode 组件 color 属性必填警告。</li>
        </ul>  
      </li>
    </ul>
    <ul> 
      <a name="1-8-0"></a> 
      <li> 
        <h3>1.8.0 <span class="layui-badge-rim">2022-12-29</span></h3> 
        <ul>
          <li>
            <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">Tree Select</h4>
              <ul>
                <li>[新增] tree-select 组件 v-model 属性，用于设置当前选择值。</li>
                <li>[新增] tree-select 组件 data 属性，用于设置树数据。</li>
                <li>[新增] tree-select 组件 multiple 属性，用于设置开启多选模式。</li>
                <li>[新增] tree-select 组件 allow-clear 属性，用于开启清空操作。</li>
                <li>[新增] tree-select 组件 disabled 属性，用于禁用选择。</li>
                <li>[新增] tree-select 组件 placeholder 属性，用于设置提示信息。</li>
                <li>[新增] tree-select 组件 checkStrictly 属性，用于禁用复选框的级联逻辑。</li>
                <li>[新增] tree-select 组件 collapseTagsTooltip 属性，用于开启多选值折叠显示。</li>
                <li>[新增] tree-select 组件 minCollapsedNum 属性，用于设置超过指定标签数量后开启折叠。</li>
                <li>[新增] tree-select 组件 size 属性，用于设置组件尺寸。</li>
              </ul>
          </li>
          <li>
            <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">Qrcode</h4>
              <ul>
                <li>[新增] qrcode 组件 text 属性，用于设置二维码实际值。</li>
                <li>[新增] qrcode 组件 color 属性，用于设置二维码前景色。</li>
                <li>[新增] qrcode 组件 background-color 属性，用于设置二维码背景色。</li>
                <li>[新增] qrcode 组件 width 属性，用于设置二维码宽度。</li>
              </ul>
          </li>
          <li>
            <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">Barcode</h4>
              <ul>
                <li>[新增] barcode 组件 value 属性，用于设置条形码实际值。</li>
                <li>[新增] barcode 组件 line-color 属性，用于设置条形码颜色。</li>
                <li>[新增] barcode 组件 width 属性，用于设置条形码每条之间的宽度。</li>
                <li>[新增] barcode 组件 height 属性，用于设置条形码高度。</li>
                <li>[新增] barcode 组件 margin 属性，用于设置条形码周边空白间距。</li>
                <li>[新增] barcode 组件 displayValue 属性，用于设置显示条形码实际值。</li>
                <li>[新增] barcode 组件 text 属性，用于覆盖默认的文本信息。</li>
                <li>[新增] barcode 组件 background 属性，用于设置条形码背景色。</li>
                <li>[新增] barcode 组件 format 属性，用于设置条形码类型。</li>
              </ul>
          </li>
          <li>
            <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">其他</h4>
              <ul>
                <li>[新增] menu-item 组件 to 属性，路由目标地址，设置该属性后，开启 router 模式。</li>
                <li>[修复] table 组件 column 配置值变动时，旧的 column 配置未被清空的问题。</li>
                <li>[修复] cascader 组件 v-model 属性不为空时，初始化触发 change 回调的问题。</li>
                <li>[修复] cascader 组件 v-model 属性值更新时，回显失效的问题。</li>
                <li>[修复] badge 组件 theme 属性未设置时, 水波纹效果不生效。</li>
                <li>[修复] icon-picker 组件 class 的错误命名。</li>
                <li>[优化] input 组件 allow-clear 属性，默认不显示清空按钮，鼠标移入后展示。</li>
                <li>[优化] textarea 组件 allow-clear 属性，默认不显示清空按钮，鼠标移入后展示。</li>
                <li>[优化] select 组件 allow-clear 属性，默认不显示清空按钮，鼠标移入后展示。</li>
                <li>[优化] icon-picker 组件 allow-clear 属性，默认不显示清空按钮，鼠标移入后展示。</li>
                <li>[优化] table 组件 column 配置 type 为 number 类型时，起始坐标结合分页数据。</li>
              </ul>
          </li>
        </ul>  
      </li>
    </ul>
  </lay-timeline-item>
  <lay-timeline-item title="1.7.x">
    <ul> 
      <a name="1-7-13"></a> 
      <li> 
        <h3>1.7.13 <span class="layui-badge-rim">2022-12-18</span></h3> 
        <ul>
          <li>[修复] select 组件多选模式设置 style 属性 width 宽度失效问题。</li>
          <li>[修复] transfer 组件 search-method 设置后默认检索逻辑仍生效的问题。</li>
          <li>[修复] transfer 组件 width 属性受 flex 影响宽度不稳定的问题。</li>
          <li>[修复] tab 组件在夜间模式下默认样式与卡片样式出现额外的白色边框。</li>
          <li>[优化] transfer 组件 search 属性开启时，拼字阶段仍触发搜索的问题。</li>
          <li>[优化] router 路由拦截添加 nprogress 加载过渡动画。</li>
        </ul>  
      </li>
    </ul>
      <ul> 
      <a name="1-7-12"></a> 
      <li> 
        <h3>1.7.12 <span class="layui-badge-rim">2022-12-15</span></h3> 
        <ul>
          <li>[新增] transfer 组件 leftTitle 插槽, 自定义左侧标题。</li>
          <li>[新增] transfer 组件 rightTitle 插槽, 自定义右侧标题。</li>
          <li>[新增] transfer 组件 search-method 方法，自定义搜索逻辑。</li>
          <li>[新增] tag-input 组件 append 插槽, 用于前缀自定义内容。</li>
          <li>[新增] tag-input 组件 prepend 插槽, 用于后缀自定义内容。</li>
          <li>[新增] select 组件 append 插槽, 用于前缀自定义内容。</li>
          <li>[新增] select 组件 prepend 插槽，用于后缀自定义内容。</li>
          <li>[新增] split-panel-item 组件 space 属性百分比数值支持。</li>
          <li>[修复] icon-picker 组件按需加载 lay-icon 无法解析的警告。</li>
          <li>[修复] transfer 组件 dataSource 配置不存在 title 属性时产生异常。</li>
          <li>[修复] table 组件 columns 属性动态修改后表格不刷新的响应式问题。</li>
        </ul>  
      </li>
    </ul>
    <ul> 
      <a name="1-7-11"></a> 
      <li> 
        <h3>1.7.11 <span class="layui-badge-rim">2022-12-05</span></h3> 
        <ul>
          <li>[新增] tab 组件鼠标滚动功能, 兼容移动端 touch 事件。</li>
          <li>[新增] textarea 组件 autosize 属性, 根据内容自适应大小。</li>
          <li>[新增] icon-picker 组件 allow-clear 属性, 开启清空操作。</li>
          <li>[修复] button 组件 夜间模式 下, 普通按钮边框高亮与背景色不一致的问题。</li>
          <li>[修复] cascader 组件 v-model 属性不为空时, 无法正常回显。</li>
          <li>[修复] select 组件 muilpart 为 true 时候 placeholder 属性无效。</li>
          <li>[修复] page-header 组件 backIcon 插槽 html 中使用无效。</li>
          <li>[优化] checkbox 组件 默认主题 下, 勾选框多余的左边框。</li>
          <li>[优化] icon-picker 组件 下拉 图标, 在打开关闭时赋予不同的状态。</li>
          <li>[优化] table 组件 .layui-table-total 背景色 fixed 字段不生效的问题。</li>
          <li>[优化] layer 组件 success 回调执行时机。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-7-10"></a> 
      <li> 
        <h3>1.7.10 <span class="layui-badge-rim">2022-11-30</span></h3> 
        <ul>
          <li>[修复] select 组件 search-method 属性, 自定义搜索逻辑不生效。</li>
          <li>[优化] select 组件文档, 简化使用案例。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-7-9"></a> 
      <li> 
        <h3>1.7.9 <span class="layui-badge-rim">2022-11-22</span></h3> 
        <ul>
          <li>[新增] select 组件 search-method 属性, 允许自定义搜索逻辑。</li>
          <li>[修复] tag 组件 max-width 属性, 内容超出后 `...` 省略符缺失。</li>
          <li>[修复] table 组件 column 属性 align 配置失效, 该问题仅存在 1.7.8 版本。</li>
          <li>[修复] select 组件 build 后, 选中内容无法正确回显。</li>
          <li>[修复] tab 组件 build 后, tab-item 无法正确显示, 在嵌套 v-for 时。</li>
          <li>[修复] table 组件 default-toolbar 在配置数组时, 未按顺序渲染。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-7-8"></a> 
      <li> 
        <h3>1.7.8 <span class="layui-badge-rim">2022-11-19</span></h3> 
        <ul>
          <li>[新增] upload 组件 auto 属性, 是否自动上传配置。</li>
          <li>[修复] table 组件 ellipsisTooltip 属性不生效。</li>
          <li>[优化] backtop 组件部分浏览器版本无法正常返回顶部。</li>
          <li>[优化] date-picker 组件 btn 操作 border-radius 样式细节。</li>
          <li>[优化] tag-input 组件 maxWidth 属性默认为 100%。</li>
          <li>[优化] tag-input 组件 tagWidth 超出 input 宽度时自动省略文本。</li>
          <li>[优化] table 组件 default-toolbar 属性支持 Array 类型, 举例：['print']。</li>
          <li>[优化] select 组件 dropdown 关闭时统一清空 search 内容。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-7-7"></a> 
      <li> 
        <h3>1.7.7 <span class="layui-badge-rim">2022-11-11</span></h3> 
        <ul>
          <li>[新增] upload 组件 text 属性, 设置上传描述。</li>
          <li>[新增] upload 组件 dragText 属性, 设置拖拽面板提示信息。</li>
          <li>[修复] select-option 组件 default 插槽内容为多层元素时, 使用 label 属性值作为回显。</li>
          <li>[修复] input-number 组件 step 设置为小数时精度丢失的问题。</li>
          <li>[修复] tooltip 组件临近屏幕边界, 三角位置显示错误。</li>
          <li>[优化] select-option 组件 多选 模式只能点击复选框的问题。</li>
          <li>[优化] select 组件 search 事件在拼字时触发的问题。</li>
          <li>[优化] select 组件 change 事件触发时机不恰当的问题。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-7-6"></a> 
      <li> 
        <h3>1.7.6 <span class="layui-badge-rim">2022-11-09</span></h3> 
        <ul>
          <li>[新增] page-header 组件 back-icon 插槽, 自定义返回图标。</li>
          <li>[新增] page-header 组件 back-icon 属性, 自定义返回图标。</li>
          <li>[修复] input-number 组件 step 设置为小数时精度丢失的问题。</li>
          <li>[修复] datePicker 组件 年选择器 清空后再点击确定回显错误。</li>
          <li>[修复] select 组件 单选模式 与 多选模式 清空操作样式不统一的问题。</li>
          <li>[修复] select 组件 单选模式 与 多选模式 下拉宽度不一致的问题。</li>
          <li>[修复] select 组件 多选模式 @search 事件不生效的问题。</li>
          <li>[优化] select 组件 label 属性不兼容 number 类型。</li>
          <li>[优化] select-option 组件 label 属性为 null 时, 单选不展示。</li>
          <li>[优化] select-option 组件 label 属性为 null 时, 搜索报错。</li>
          <li>[优化] datePicker 组件 新增change,blur,foucs事件。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-7-5"></a> 
      <li> 
        <h3>1.7.5 <span class="layui-badge-rim">2022-11-06</span></h3> 
        <ul>
          <li>[修复] select 组件单选模式验证失败后边框无变化的问题。</li>
          <li>[修复] tooltip 组件临近屏幕边界, 三角位置显示错误。</li>
          <li>[修复] upload 组件开启 cut 裁剪属性, 取消上传仍会弹出裁剪界面。</li>
          <li>[修复] upload 组件开启 cut 裁剪属性, 多次上传同文件, 非首次都不会弹出裁剪框。</li>
          <li>[优化] collapse 组件 collapseTransition 属性开启时, 为下拉图标增加转场动画。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-7-4"></a> 
      <li> 
        <h3>1.7.4 <span class="layui-badge-rim">2022-11-04</span></h3> 
        <ul>
          <li>[新增] button 按钮 active 效果。</li>
          <li>[新增] input 组件 max 与 min 属性, 用于控制 number 类型下手动输入值的范围。</li>
          <li>[修复] textarea 组件边框 hover 状态颜色和其它 form 系列组件不一样的问题。</li>
          <li>[修复] tag-input 组件获取焦点与 hover 状态和其它 form 系列组件不一样的问题。</li>
          <li>[修复] upload 组件多次上传同一文件时，除了第一次都无法正常触发到@before和@done 事件。</li>
          <li>[修复] select 组件 slots 无法正常解决注释的问题。</li>
          <li>[修复] tab 组件 slots 无法正常解决注释与 v-if 的问题。</li>
          <li>[修复] select 单选模式和多选模式, 鼠标悬停时边框颜色不一样的问题。</li>
          <li>[修复] textarea 双向绑定在拼字时触发更新的问题。</li>
          <li>[修复] input-number 组件 disabled-input 属性开启时，点击减号无效。</li>
          <li>[修复] input-number 的 min 和 max 属性在手动输入值的场景下无效。</li>
          <li>[修复] button 组件 disabled 属性无效。</li>
          <li>[修复] button-group 组件, 个别类型无法正常显示分割线。</li>
          <li>[修复] select 组件禁用后 仍能清空的问题。</li>
          <li>[修复] input-number 组件无法手动输入负数的问题。</li>
          <li>[修复] input-number 组件清空内容，输入框失去焦点后数字复显的问题。</li>
          <li>[修复] input-number 组件设置步长点击增加，直接拼接字符串的问题。</li>
          <li>[修复] textarea 和 select 验证失败后边框颜色没有变成红色。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-7-3"></a> 
      <li> 
        <h3>1.7.3 <span class="layui-badge-rim">2022-10-27</span></h3> 
        <ul>
          <li>[修复] table 组件 滚动条 拖拽时 header 产生错位。</li>
          <li>[修复] layer 组件 notifiy 类型 css 丢失的问题。</li>
          <li>[优化] layer 组件 notifiy 类型 class 命名规范。</li>
          <li>[升级] layer-vue 1.4.7 版本。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-7-2"></a> 
      <li> 
        <h3>1.7.2 <span class="layui-badge-rim">2022-10-26</span></h3> 
        <ul>
          <li>[优化] input 组件 disabled 属性禁用效果。</li>
          <li>[优化] textarea 组件 disabled 属性禁用效果。</li>
          <li>[优化] switch 组件 disabled 属性禁用效果。</li>
          <li>[优化] select 组件 disabled 属性禁用效果。</li>
          <li>[优化] tag-input 组件 disabled 属性禁用效果。</li>
          <li>[优化] color-picker 组件 disabled 属性禁用效果。</li>
          <li>[优化] cascader 组件 disabled 属性禁用效果。</li>
          <li>[优化] icon-picker 组件 disabled 属性禁用效果。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-7-1"></a> 
      <li> 
        <h3>1.7.1 <span class="layui-badge-rim">2022-10-26</span></h3> 
        <ul>
          <li>[新增] date-picker 组件 placeholder 属性 array 类型兼容。</li>
          <li>[修复] date-picker 组件 range 属性为 true 时的 国际化 翻译失效。</li> 
          <li>[修复] date-picker 组件 range 属性为 true 时的 lay-dropdown 无法解析警告。</li>
          <li>[修复] upload 组件 裁剪 案例不生效问题, 前提需要 acceptMime 为 images 值。</li>
          <li>[优化] upload 组件 i18n 国际化支持。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-7-0"></a> 
      <li> 
        <h3>1.7.0 <span class="layui-badge-rim">2022-10-24</span></h3> 
        <ul>
          <li>[新增] select 组件 contentClass 属性, 用于自定义内容区域 class 属性。</li>
          <li>[新增] select 组件 contentStyle 属性, 用于自定义内容区域 style 属性。</li>
          <li>[新增] icon-picker 组件 disabled 属性, 禁用颜色选择。</li>
          <li>[新增] icon-picker 组件 contentClass 属性, 用于自定义内容区域 class 属性。</li>
          <li>[新增] icon-picker 组件 contentStyle 属性, 用于自定义内容区域 style 属性。</li>
          <li>[新增] color-picker 组件 disabled 属性, 禁用图标选择。</li>
          <li>[新增] color-picker 组件 contentClass 属性, 用于自定义内容区域 class 属性。</li>
          <li>[新增] color-picker 组件 contentStyle 属性, 用于自定义内容区域 style 属性。</li>
          <li>[新增] cascader 组件 disabled 属性, 禁用数据选择。</li>
          <li>[新增] cascader 组件 contentClass 属性, 用于自定义内容区域 class 属性。</li>
          <li>[新增] cascader 组件 contentStyle 属性, 用于自定义内容区域 style 属性。</li>
          <li>[新增] date-picker 组件 contentClass 属性, 用于自定义内容区域 class 属性。</li>
          <li>[新增] date-picker 组件 contentStyle 属性, 用于自定义内容区域 style 属性。</li>
          <li>[修复] date-picker 组件 type 属性为 date 值, range 属性为 true 时, 结束月份出现 13 月的问题。</li>
          <li>[修复] space 组件 size 属性使用内置 string ['md','sm'] 不生效的问题。</li>
          <li>[修复] table 组件 datasource 为空, 表头超出宽度无法滚动的问题。</li>
          <li>[修复] page 组件 pages 属性起始页计算逻辑, 在接近尾页时 pages 页码不对应的问题。</li>
          <li>[修复] select 组件 multiple 与 disabled 属性同时为 true 时, 禁用效果失效。</li>
          <li>[删除] select 组件 show-empty 属性, 由用户自定义 select-option 代替。</li>
          <li>[删除] select 组件 empty-message 属性, 由用户自定义 select-option 代替。</li>
          <li>[删除] select 组件 placeholder, searchPlaceholder 属性默认值, 由使用者提供。</li>
          <li>[优化] select 组件 disabled 属性效果, hover 状态显示禁用光标, 并保持 border 颜色不变。</li>
          <li>[优化] input 组件 disabled 属性效果, hover 状态保持 border 颜色不变。</li>
          <li>[优化] switch 组件 disabled 属性效果, 光标移入圆形白色按钮不显示禁用光标。</li>
          <li>[优化] tag-input 组件 disabled 属性效果, 与其他组件保持相同设计规范。</li>
          <li>[优化] date-picker, empty, page 组件支持 i18n 国际化。</li>
        </ul> 
      </li>
    </ul>
  </lay-timeline-item>
  <lay-timeline-item title="1.6.x">
    <ul> 
      <a name="1-6-9"></a> 
      <li> 
        <h3>1.6.9 <span class="layui-badge-rim">2022-10-18</span></h3> 
        <ul>
          <li>[修复] select 组件内部维护 options 时导致的内存溢出问题。</li>
          <li>[修复] select 组件单选模式 showSearch 属性开启时, 输入框循环重置的问题。</li>
          <li>[修复] upload 组件 drag 为 true 时, 获取拖拽文件 files 集合失败, 无法正常上传。</li>
          <li>[优化] layer 组件 id 属性, 当值相同时仅保留最新的弹出层实例。</li>
          <li>[升级] layer-vue 1.4.6 版本。</li> 
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-6-8"></a> 
      <li> 
        <h3>1.6.8 <span class="layui-badge-rim">2022-10-14</span></h3> 
        <ul>
          <li>[修复] upload 组件 drag 为 false 时的 removeEventListener 警告。</li>
          <li>[修复] upload 组件销毁 drap drapenter dragover 事件未注销。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-6-7"></a> 
      <li> 
        <h3>1.6.7 <span class="layui-badge-rim">2022-10-13</span></h3> 
        <ul>
          <li>[修复] menu 组件 ident 属性带来的 typescript 警告。</li>
          <li>[修复] tansfer 组件 data-source 属性缺少响应式的特性。</li>
          <li>[修复] upload 组件 drag 属性开启后, 拖拽上传无效的问题。</li>
          <li>[优化] switch 组件 on-switch-text 和 un-switch-text 属性, 为描述提供适当边距。</li>
          <li>[优化] config-provider 组件 dark-partial 属性默认值, 降低整体饱和度。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-6-6"></a> 
      <li> 
        <h3>1.6.6 <span class="layui-badge-rim">2022-10-11</span></h3> 
        <ul>
          <li>[新增] menu 组件 ident 属性, 用于开启目录缩进与缩进尺寸。</li>
          <li>[新增] table 组件 column 配置 total-row-method 属性, 用于自定义列统计逻辑。</li>
          <li>[修复] table 组件 column 配置 fixed 属性, 特殊情况下的列空白问题。</li>
          <li>[修复] talle 组件 table-row 行 algin 等属性, 不跟随 column 列配置的问题。</li>
          <li>[修复] table 组件 table-row 行 fixed 属性不生效的问题。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-6-5"></a> 
      <li> 
        <h3>1.6.5 <span class="layui-badge-rim">2022-10-11</span></h3> 
        <ul>
          <li>[新增] datePicker 组件 type 属性为 date 与 datetime 时, 支持时间戳传入。</li>
          <li>[修复] datePicker 组件 type 属性为 dateTime 时 同时选择日期与时间不生效问题。</li>
          <li>[修复] datepicker 组件 type 属性为 mouth 时, v-model 为 number 类型时, 月份选择显示NaN。</li>
          <li>[修复] tree 组件 checkedKeys 属性赋值默认子集全部选中的问题。</li>
          <li>[修复] layer 组件在高版本 google 中的 event.path 警告信息。</li>
          <li>[修复] select-option 组件 default 插槽不可用的问题。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-6-4"></a> 
      <li> 
        <h3>1.6.4 <span class="layui-badge-rim">2022-10-09</span></h3> 
        <ul>
          <li>[修复] radio 组件 value 属性不兼容 number 类型而导致类型警告。</li>
          <li>[修复] table 组件 .layui-table-body 增加过渡动画后, 修改 height 样式, 导致 header 错位。</li>
          <li>[修复] select-option 组件在伴随 v-if 指令时导致无法正常渲染。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-6-3"></a> 
      <li> 
        <h3>1.6.3 <span class="layui-badge-rim">2022-10-08</span></h3> 
        <ul>
          <li>[修复] select 组件 option 子组件 hover 样式缺失。</li>
          <li>[修复] select 组件下拉图标在选择 option 后状态不重置的问题。</li>
          <li>[修复] select 组件多选模式, 选项无法手动删除的问题。</li>
          <li>[修复] layer 组件 end 回调函数多次触发的问题。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-6-2"></a> 
      <li> 
        <h3>1.6.2 <span class="layui-badge-rim">2022-10-07</span></h3> 
        <ul>
          <li>[修复] upload 组件 size 属性提示信息单位换算错误。</li>
          <li>[修复] tree 组件 checkStrictly 属性为 true 时, 初始数据仍关联选择。</li>
          <li>[修复] icon-picker 组件 v-model 缺失响应式特性。</li>
          <li>[修复] select-option 组件 hover 状态的选择样式。</li>
          <li>[升级] 升级 vue 3.2.40 与 typescript 4.8.4。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-6-1"></a> 
      <li> 
        <h3>1.6.1 <span class="layui-badge-rim">2022-10-06</span></h3> 
        <ul>
          <li>[修复] layer 组件 v-model 默认为 true 时弹出层不显示的问题。</li>
          <li>[修复] layer 组件 success 回调函数属性默认显示时不触发的问题。</li>
          <li>[修复] layer 组件 msg 调用 content-height 内容高度计算不正确。</li>
          <li>[修复] layer 组件 btn 与 close 操作抖动的问题。</li>
          <li>[升级] layer-vue 1.4.3 版本。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-6-0"></a> 
      <li> 
        <h3>1.6.0 <span class="layui-badge-rim">2022-10-04</span></h3> 
        <ul>
          <li>[新增] tree 组件 checkStrictly 属性, 开启复选框时解除父子联动关系, 默认为 false。</li>
          <li>[修复] tree 组件 title 自定义标题插槽, 不生效的问题。</li>
          <li>[修复] tree 组件 node 配置 disabled 启用时, @node-click 事件仍触发的问题。</li>
          <li>[修复] select 组件 multiple 开启时, 值不存在时导致控制台异常。</li>
          <li>[修复] timeline 组件 title 属性必填警告。</li>
          <li>[修复] cascader 组件 trigger 属性必填警告。</li>
          <li>[修复] select-option 组件 value 属性 number 类型值警告。</li>
          <li>[修复] checkbox 组件 value 属性 number 类型值警告。</li>
          <li>[修复] checkbox 组件 label 属性与 default 插槽不设置, layui-checkbox-label 元素仍存在的问题。</li>
          <li>[修复] tree 组件 show-checkbox 为 true 时, 复选框与标题间距过宽的问题。</li>
          <li>[修复] tree 组件 node 配置 disabled 启用时, 仍会因为父子关联选择。</li>
          <li>[修复] table 组件 indentSize 属性, 在加载远程数据时不生效的问题。</li>
          <li>[调整] date-picker 组件 laydate-range-hover 前景色与背景色。</li>
        </ul> 
      </li>
    </ul>
  </lay-timeline-item>
  <lay-timeline-item title="1.5.x">
      <ul> 
      <a name="1-5-1"></a> 
      <li> 
        <h3>1.5.1 <span class="layui-badge-rim">2022-09-30</span></h3> 
        <ul>
          <li>[新增] avatar 组件 default 插槽, 支持文本头像, 用于复杂场景。</li>
          <li>[新增] avatar 组件 icon 属性, 用于展示 iconfont 头像, 默认值为 `layui-icon-username`。</li>
          <li>[修复] select 组件 multiple 为 true 且 showSearch 为 true 时光标为输入, 否则为小手指。</li>
          <li>[修复] select 组件 slots 延时渲染, 选中项 label 不更新的问题。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="1-5-0"></a> 
      <li> 
        <h3>1.5.0 <span class="layui-badge-rim">2022-09-29</span></h3> 
        <ul>
          <li>[新增] tag-input 标签输入框组件, 用于录入事物的属性与纬度。</li>
          <li>[新增] table 组件 header 插槽, 用于在工具栏与表格之间插入元素。</li>
          <li>[新增] tabitem 组件 icon 属性, 提供 title 属性前置 icon 设置。</li>
          <li>[新增] select 组件 searchPlaceholder 属性, 自定义搜索提示信息。</li>
          <li>[新增] select 组件 minCollapsedNum 属性, 多选模式选中项超过多少时折叠。</li>
          <li>[新增] select 组件 collapseTagsTooltip 属性, 多选模式下是否悬浮显示折叠的选中项。</li>
          <li>[修复] cascader 外部清空 modelValue, 选中项仍不清楚的问题。</li>
          <li>[修复] tolltip 组件 content 变化时, 位置无法自动计算调整的问题。</li>
          <li>[修复] breadcrumb-item 组件无法正确传递 attrs, 导致 @click 等自定义事件失效。</li>
          <li>[修复] layout 组件仅引入了 footer 作为内容元素时, layui-layout-vertical 样式不生效, 导致布局错误。</li>
          <li>[修复] select 组件 multiple 属性为 true 时, 删除选项时清空筛选条件的问题。</li>
          <li>[修复] select 组件多选模式下提示信息错误, 将 "请选择" 调整为 "请输入"。</li>
          <li>[修复] select 组件与 table 组件组合使用时, 下拉内容被遮盖。</li>
          <li>[修复] select 组件位于 layer 底部时, 点击时出现滚动条。</li>
          <li>[修复] select 组件外部修改 modelValue 值时, option 不选中的问题。</li>
          <li>[修复] icon-picker 组件 show-search 属性开启时, 搜索不生效的问题。</li>
          <li>[修复] notice-bar 组件切换页面后, NodeJS.Timeout 定时器不清除的问题。</li>
          <li>[优化] page 组件 limit 逻辑, 切换 limit 后，如果页数大于当前页，保持当前页码不变，否则使用最大页码。</li>
          <li>[优化] input 组件 suffix 插槽与 allow-clear 启用时的显示顺序, clear > suffix。</li>
          <li>[优化] tag 组件 border background height 等, 使其更贴合 layui 的设计规范。</li>
          <li>[优化] input 组件 suffix prefix password clear 左右布局, 由 15px 调整至 10px。</li>
          <li>[优化] input 组件 prefix 与 prefix-icon 存在时, 取消左侧边距缩进。</li>
          <li>[删除] select 组件 create 属性 与 create 事件。</li>
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
