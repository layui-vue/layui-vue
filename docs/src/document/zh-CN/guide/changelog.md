::: title 更新日志
:::

::: describe 严格遵循 <a style="color:#009688;" href="https://semver.org/lang/zh-CN/">Semantic Versioning 2.0.0</a> 语义化版本规范。
:::

::: describe 正常情况下使用 每周 发布策略， 但关键的 bug 修复将需要热修复，所以实际发布版本 可能 每周超过 1 次。
:::

::: describe 若你需要查看更多详情，可前往 <a style="color:#009688;" target="_blank" href="https://gitee.com/layui-vue/layui-vue/releases">Gitee</a>。
:::

::: demo
<template>
  <lay-timeline>
    <lay-timeline-item title="2.23.x">
      <ul>
        <a name="2-23-3"></a>
        <li>
          <h3>2.23.3 <span class="layui-badge-rim">2025-07-28</span></h3>
          <ul>
              <li>[修复] checkcard 组件 disabled属性变化未生效。<a href="https://gitee.com/layui-vue/layui-vue/pulls/501">详情</a></li>
              <li>[修复] menu 组件 展开/收起图标位置异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/502">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-23-2"></a>
        <li>
          <h3>2.23.2 <span class="layui-badge-rim">2025-07-22</span></h3>
          <ul>
              <li>[新增] datePicker 组件 default-time在非range模式下生效。<a href="https://gitee.com/layui-vue/layui-vue/pulls/497">详情</a></li>
              <li>[修复] table 组件 清空dataSource与selectedKeys同时进行，selectedKeys清空异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/499">详情</a></li>
              <li>[修复] menu 组件 高度异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/498">详情</a></li>
              <li>[修复] tree 组件 展开/收起 图标异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/500">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-23-1"></a>
        <li>
          <h3>2.23.1 <span class="layui-badge-rim">2025-07-03</span></h3>
          <ul>
              <li>[修复] table 组件 按需引入时，default-toolbar 样式问题。</li>
              <li>[修复] table 组件 props.columns 为响应式变量时， fixed 列异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/496">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-23-0"></a>
        <li>
          <h3>2.23.0 <span class="layui-badge-rim">2025-07-01</span></h3>
          <ul>
              <li>[升级] @layui/json-schema-form 升级至1.0.16。</li>
              <li>[新增] datePicker 组件  新增 default与footer 插槽。<a href="https://gitee.com/layui-vue/layui-vue/pulls/482">详情</a></li>
              <li>[新增] cascader 组件  新增 getSelectLabel 方法。<a href="https://gitee.com/layui-vue/layui-vue/pulls/451">详情</a></li>
              <li>[新增] table 组件 新增 column.exportCellType 用于导出 xls 自定义单元格类型。<a href="https://gitee.com/layui-vue/layui-vue/pulls/488">详情</a></li>
              <li>[新增] table 组件 default-toolbar 新增 render 属性，用于自定义渲染。<a href="https://gitee.com/layui-vue/layui-vue/pulls/488">详情</a></li>
              <li>[修复] tab 组件 与 layer 结合样式异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/492">详情</a></li>
              <li>[修复] table 组件 导出数据为 Number 时，xls 单元格类型固定为数字。<a href="https://gitee.com/layui-vue/layui-vue/pulls/481">详情</a></li>
              <li>[修复] table 组件 存在多个 fixed 表头，固定表头偏移异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/486">详情</a></li>
              <li>[修复] treeSelect 组件 设置 replaceFields.children 输入框未反填二级内容。<a href="https://gitee.com/layui-vue/layui-vue/pulls/484">详情</a></li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.22.x">
      <ul>
        <a name="2-22-2"></a>
        <li>
          <h3>2.22.2 <span class="layui-badge-rim">2025-04-29</span></h3>
          <ul>
              <li>[修复] table 组件 columns.customSlot获取不到 rowIndex/columnIndex 参数。<a href="https://gitee.com/layui-vue/layui-vue/commit/7e63441051fb056596fa7277b795e7358228f98d">详情</a></li>
              <li>[修复] table 组件 TableColumn(types)中 type 存在时 key 仍为必填的问题。<a href="https://gitee.com/layui-vue/layui-vue/pulls/480">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-22-1"></a>
        <li>
          <h3>2.22.1 <span class="layui-badge-rim">2025-04-26</span></h3>
          <ul>
              <li>[新增] datePicker 组件 static(静态面板)模式。<a href="https://gitee.com/layui-vue/layui-vue/pulls/479">详情</a></li>
              <li>[新增] table 组件 columns.titleSlot支持 function 类型渲染方式。<a href="https://gitee.com/layui-vue/layui-vue/pulls/476">详情</a></li>
              <li>[修复] table 组件 dataSource为空，表头checkbox状态应为空。<a href="https://gitee.com/layui-vue/layui-vue/pulls/475">详情</a></li>
              <li>[修复] table 组件 columns.titleSlot失效。<a href="https://gitee.com/layui-vue/layui-vue/pulls/476">详情</a></li>
              <li>[修复] table 组件 fixed column异常显示resize dom。<a href="https://gitee.com/layui-vue/layui-vue/pulls/478">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-22-0"></a >
        <li>
          <h3>2.22.0 <span class="layui-badge-rim">2025-4-11</span></h3>
          <ul>
              <li>[新增] table 组件 page 插槽，分页右侧区域。<a href="https://gitee.com/layui-vue/layui-vue/pulls/469">详情</a></li>
              <li>[新增] table 组件 page.change 回调，在未来版本中将删除 @change事件。<a href="https://gitee.com/layui-vue/layui-vue/pulls/469">详情</a></li>
              <li>[新增] table 组件 checkbox 与 checkbox-all emit，用于触发点击 单行checkbox 与 全选。<a href="https://gitee.com/layui-vue/layui-vue/pulls/469">详情</a></li>
              <li>[新增] table 组件 default-toolbar 可自定义配置图标(icon)。<a href="https://gitee.com/layui-vue/layui-vue/pulls/469">详情</a></li>
              <li>[新增] table 组件 column.ellipsisTooltipProps 可自定义 tooltip 样式。<a href="https://gitee.com/layui-vue/layui-vue/pulls/469">详情</a></li>
              <li>[新增] tree 和 tree-select 组件 data 属性 checked spread leaf slot icon 配置项。<a href="https://gitee.com/layui-vue/layui-vue/pulls/429">详情</a></li>
              <li>[新增] tree 和 tree-select 组件 replaceField 属性 disabled checked expanded leaf 配置项。<a href="https://gitee.com/layui-vue/layui-vue/pulls/429">详情</a></li>
              <li>[新增] tree 和 tree-select 组件 cacheData 属性，支持传入节点缓存数据。<a href="https://gitee.com/layui-vue/layui-vue/pulls/429">详情</a></li>
              <li>[新增] tree 组件 accordion 属性开启手风琴模式。<a href="https://gitee.com/layui-vue/layui-vue/pulls/429">详情</a></li>
              <li>[新增] tree 组件 loadOnCheck 属性，在点击 checkbox 时，触发懒加载。<a href="https://gitee.com/layui-vue/layui-vue/pulls/429">详情</a></li>
              <li>[新增] tree 组件 node-double 节点双击、node-contextmenu 节点右键事件。<a href="https://gitee.com/layui-vue/layui-vue/pulls/429">详情</a></li>
              <li>[修复] table 组件 多级表头与fixed属性结合，表头滑动偏移位置错误。<a href="https://gitee.com/layui-vue/layui-vue/issues/I9IQQB">issue</a></li>
              <li>[修复] input-number 组件自定义宽度，indicator显示异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/472">详情</a></li>
              <li>[修复] popper 组件多层级点击外部隐藏失效。<a href="https://gitee.com/layui-vue/layui-vue/pulls/473">详情</a></li>
              <li>[修复] descriptionsItem umd中使用labelStyle/labelClass未生效。<a href="https://gitee.com/layui-vue/layui-vue/pulls/471">详情</a></li>
              <li>[修复] splitPanel 组件 splitPanelItem无法设置style/class与splitPanel可渲染非splitPanelItem组件。<a href="https://gitee.com/layui-vue/layui-vue/pulls/468">详情</a></li>
              <li>[优化] select 组件当下拉弹窗隐藏，用户输入自动显示下拉弹窗。<a href="https://gitee.com/layui-vue/layui-vue/pulls/470">详情</a></li>
              <li>[优化] upload 组件 slots.preview 为空时，不渲染相关元素。<a href="https://gitee.com/layui-vue/layui-vue/pulls/471">详情</a></li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.21.x">
      <ul>
        <a name="2-21-2"></a>
        <li>
          <h3>2.21.2 <span class="layui-badge-rim">2025-03-08</span></h3>
          <ul>
              <li>[升级] layer 到 2.4.8 版本。</li>
              <li>[修复] layer 组件 prompt模式输入类型为textarea时placeholder无效。<a href="https://gitee.com/layui-vue/layui-vue/pulls/459">详情</a></li>
              <li>[新增] upload 组件 新增directory参数，用于文件夹上传。<a href="https://gitee.com/layui-vue/layui-vue/pulls/463">详情</a></li>
              <li>[新增] textarea 组件 新增readonly参数。<a href="https://gitee.com/layui-vue/layui-vue/pulls/461">详情</a></li>
              <li>[新增] tableColumns 组件 sort属性支持custom参数值。<a href="https://gitee.com/layui-vue/layui-vue/pulls/462">详情</a></li>
              <li>[新增] datePicker 组件 新增类型为datetime底部选择日期/时间，i18翻译。<a href="https://gitee.com/layui-vue/layui-vue/pulls/458">详情</a></li>
              <li>[修复] splitPanel 组件 当鼠标不在分割线按下时，cursor依旧会变化。<a href="https://gitee.com/layui-vue/layui-vue/pulls/460">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-21-1"></a>
        <li>
          <h3>2.21.1 <span class="layui-badge-rim">2024-12-11</span></h3>
          <ul>
              <li>[修复] table 组件 defaultExpandAll 切换异常。</li>
              <li>[修复] table 组件 cell 内 progress 组件无法正常加载的问题。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-21-0"></a>
        <li>
          <h3>2.21.0 <span class="layui-badge-rim">2024-12-3</span></h3>
          <ul>
              <li>[升级] layer 到 2.4.7 版本。</li>
              <li>[新增] layer 新增moveEnd/resizeEnd返回值。<a href="https://gitee.com/layui-vue/layui-vue/pulls/453">详情</a></li>
              <li>[修复] layui 2.20.0版本无法install问题。</li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.20.x">
      <ul>
        <a name="2-20-0"></a>
        <li>
          <h3>2.20.0 <span class="layui-badge-rim">2024-11-12</span></h3>
          <ul>
              <li>[修复] table 组件部分场景下底部边框不存在的问题。</li>
              <li>[修复] layer 组件拖拽至 iframe 时 mousemove 事件中断的问题。</li>
              <li>[修复] timeSelect 与 Segmented 组件类型未生成的问题。</li>
              <li>[修复] dropdown 和 tooltip 按需模式 popper 样式丢失。</li>
              <li>[修复] date-picker 组件日期范围类型，月份禁用异常。</li>
              <li>[修复] docs 文档中因网络协议导致的图片资源丢失。</li>
              <li>[修复] table 组件多级表格头部 expand 插槽错位。</li> 
              <li>[升级] layer 到 2.4.6 版本。</li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.19.x">
      <ul>
        <a name="2-19-3"></a>
        <li>
          <h3>2.19.3 <span class="layui-badge-rim">2024-11-12</span></h3>
          <ul>
              <li>[升级] @layui/layer-vue 升级至2.4.5。</li>
              <li>[修复] @layui/layer-vue closeAll关闭notify，二次打开存在异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/448">详情</a></li>
              <li>------------------------------以下为 @layui/layui-vue 调整------------------------------</li>
              <li>[修复] form组件，同时存在需要与不需要校验的表单项时，form.validate方法失效。<a href="https://gitee.com/layui-vue/layui-vue/pulls/440">详情</a></li>
              <li>[修复] table组件，初始化赋值expandKeys未生效。<a href="https://gitee.com/layui-vue/layui-vue/pulls/445">详情</a></li>
              <li>[修复] table组件，columns存在hide，expand插槽展开内容错位。<a href="https://gitee.com/layui-vue/layui-vue/pulls/445">详情</a></li>
              <li>[修复] tagInput组件，初始化inputValue未反填至输入框。<a href="https://gitee.com/layui-vue/layui-vue/pulls/447">详情</a></li>
              <li>[修复] cascader组件，开启multiple，输入框未初始modelValue值。<a href="https://gitee.com/layui-vue/layui-vue/pulls/449">详情</a></li>
              <li>[修复] cascader组件，options未深度监听变化。<a href="https://gitee.com/layui-vue/layui-vue/pulls/443">详情</a></li>
              <li>[修复] popConfirm组件，点击确认/取消按钮无法关闭弹窗。<a href="https://gitee.com/layui-vue/layui-vue/pulls/442">详情</a></li>
              <li>[优化] datePicker组件，开启simple/range后点击快捷选项无需确认。<a href="https://gitee.com/layui-vue/layui-vue/pulls/444">详情</a></li>
              <li>[优化] timeSelect组件，补充 select.props默认值。<a href="https://gitee.com/layui-vue/layui-vue/pulls/441">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-19-2"></a>
        <li>
          <h3>2.19.2 <span class="layui-badge-rim">2024-11-04</span></h3>
          <ul>
              <li>[修复] @layui/layui-vue umd版本，存在 production 为空报错。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-19-1"></a>
        <li>
          <h3>2.19.1 <span class="layui-badge-rim">2024-11-01</span></h3>
          <ul>
              <li>[新增] form组件 新增表单校验对于asyncValidator的支持。<a href="https://gitee.com/layui-vue/layui-vue/pulls/435">详情</a></li>
              <li>[新增] select组件 新增autoFitMinWidth属性。<a href="https://gitee.com/layui-vue/layui-vue/pulls/437">详情</a></li>
              <li>[修复] datePicker组件 date/range 模式下modelValue初始化下拉右侧看板日期错误。<a href="https://gitee.com/layui-vue/layui-vue/pulls/438">详情</a></li>
              <li>[修复] table组件 开启 default-toolbar 控制台存在警告。<a href="https://gitee.com/layui-vue/layui-vue/pulls/436">详情</a></li>
              <li>[修复] table组件 树形表格无法导出children的问题。<a href="https://gitee.com/layui-vue/layui-vue/pulls/430">详情</a></li>
              <li>[修复] page组件 开启ellipsisTooltip 前置翻页信息跳转不准确。<a href="https://gitee.com/layui-vue/layui-vue/pulls/434">详情</a></li>
              <li>[修复] tab组件 切换后tab-item中的select下拉未正常渲染。<a href="https://gitee.com/layui-vue/layui-vue/pulls/433">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-19-0"></a>
        <li>
          <h3>2.19.0 <span class="layui-badge-rim">2024-10-22</span></h3>
          <ul>
              <li>[升级] @layui/icons-vue 升级至1.1.3。</li>
              <li>[调整] @layui/icons-vue 调整umd包全局变量名为LayuiIcons。</li>
              <li>[升级] @layui/layer-vue 升级至2.4.4。</li>
              <li>[调整] @layui/layer-vue 调整umd包全局变量名为LayuiLayer。</li>
              <li>[新增] @layui/layer-vue 使用函数调用支持title/footer传入VNode形式。</li>
              <li>[升级] @layui/json-schema-form 升级至1.0.15。</li>
              <li>[调整] @layui/json-schema-form 调整umd包全局变量名为LayuiJsonSchemaForm。</li>
              <li>------------------------------以下为 @layui/layui-vue 调整------------------------------</li>
              <li>[调整] affix组件 内部props类型名称修正：AiffxProps > AffixProps。<a href="https://gitee.com/layui-vue/layui-vue/pulls/408">详情</a></li>
              <li>[新增] 新增timeSelect(时间点选择器)组件。<a href="https://www.layui-vue.com/zh-CN/components/timeSelect">详情</a></li>
              <li>[新增] 新增segmented(分段选择器)组件。<a href="https://www.layui-vue.com/zh-CN/components/segmented">详情</a></li>
              <li>[新增] datePicker组件 年份范围选择模式、允许选择任意年份。<a href="https://www.layui-vue.com/zh-CN/components/datepicker#范围选择">详情</a></li>
              <li>[新增] datePicker组件 disabled-date属性 用于禁止任何日期。<a href="https://www.layui-vue.com/zh-CN/components/datepicker#禁止任何日期">详情</a></li>
              <li>[新增] datePicker组件 input-format属性 用于首次未点击时，下拉弹窗打开时默认显示的时间，传空为组件首次渲染时间。<a href="https://www.layui-vue.com/zh-CN/components/datepicker#默认日期">详情</a></li>
              <li>[新增] datePicker组件 year-page属性 用于年份选择器每页年份的个数。<a href="https://www.layui-vue.com/zh-CN/components/datepicker#年份选择">详情</a></li>
              <li>[新增] datePicker组件 shortcuts属性 用于设置快捷选项。<a href="https://www.layui-vue.com/zh-CN/components/datepicker#快捷选项">详情</a></li>
              <li>[新增] tagInput组件 新增tag新增校验、tag触及最大数量事件。<a href="https://gitee.com/layui-vue/layui-vue/pulls/405">详情</a></li>
              <li>[新增] textArea组件 新增autosize.minRow/autosize.maxRow用于设置高度。<a href="https://gitee.com/layui-vue/layui-vue/pulls/409">详情</a></li>
              <li>[新增] progress组件 支持分段与动画。<a href="https://gitee.com/layui-vue/layui-vue/pulls/419">详情</a></li>
              <li>[修复] table组件 设置导出excel文件单元格为文本。<a href="https://gitee.com/layui-vue/layui-vue/pulls/425">详情</a></li>
              <li>[修复] table组件 切换default-expand-all属性标题与主体单元格为对齐。<a href="https://gitee.com/layui-vue/layui-vue/pulls/424">详情</a></li>
              <li>[修复] table组件 点击未设置sort列程序报错。<a href="https://gitee.com/layui-vue/layui-vue/pulls/423">详情</a></li>
              <li>[修复] tagInput组件 修复按下删除键误删tag。<a href="https://gitee.com/layui-vue/layui-vue/pulls/405">详情</a></li>
              <li>[修复] splitPanel组件 垂直布局嵌套水平布局line方向错误。<a href="https://gitee.com/layui-vue/layui-vue/pulls/422">详情</a></li>
              <li>[修复] descriptions组件 渲染内部descriptions-item丢失响应式。<a href="https://gitee.com/layui-vue/layui-vue/pulls/399">详情</a></li>
              <li>[修复] descriptions组件 存在title/extra渲染header部分。<a href="https://gitee.com/layui-vue/layui-vue/pulls/421">详情</a></li>
              <li>[修复] qrCode组件 设置width/height未生效与图片未居中。<a href="https://gitee.com/layui-vue/layui-vue/pulls/415">详情</a></li>
              <li>[修复] tree组件 show-line为false时展开最后一级报错。<a href="https://gitee.com/layui-vue/layui-vue/pulls/411">详情</a></li>
              <li>[修复] carousel组件 延迟渲染CarouselItem导致无法无缝轮播。<a href="https://gitee.com/layui-vue/layui-vue/pulls/410">详情</a></li>
              <li>[修复] tooltip组件 arrow箭头位置异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/403">详情</a></li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.18.x">
      <ul>
        <a name="2-18-3"></a>
        <li>
          <h3>2.18.3 <span class="layui-badge-rim">2024-08-23</span></h3>
          <ul>
              <li>[升级] json-schema-form 升级至1.0.14。</li>
              <li>[新增] qrCode组件 支持内插图片。<a href="https://gitee.com/layui-vue/layui-vue/pulls/382">详情</a></li>
              <li>[新增] table组件 新增点击th可触发排序。<a href="https://gitee.com/layui-vue/layui-vue/pulls/386">详情</a></li>
              <li>[新增] table组件 新增initSort属性，用于默认排序显示。<a href="https://gitee.com/layui-vue/layui-vue/pulls/386">详情</a></li>
              <li>[新增] select组件 新增clear、remove-tag emit 事件。<a href="https://gitee.com/layui-vue/layui-vue/pulls/391">详情</a></li>
              <li>[修复] table组件 ellipsisTooltip只在文本超出隐藏生效。<a href="https://gitee.com/layui-vue/layui-vue/pulls/389">详情</a></li>
              <li>[修复] select组件 多选时placeholder不可见。<a href="https://gitee.com/layui-vue/layui-vue/pulls/385">详情</a></li>
              <li>[修复] treeSelect组件 props.data改变内部未更新。<a href="https://gitee.com/layui-vue/layui-vue/pulls/384">详情</a></li>
              <li>[修复] radioButton组件 结合radioGroup未触发change事件。<a href="https://gitee.com/layui-vue/layui-vue/pulls/383">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-18-2"></a>
        <li>
          <h3>2.18.2 <span class="layui-badge-rim">2024-08-16</span></h3>
          <ul>
              <li>[新增] qrCode组件 添加options参数用于传入qrCode其他参数。<a href="https://gitee.com/layui-vue/layui-vue/pulls/378">详情</a></li>
              <li>[修复] tree组件 checkedKeys回显层级异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/380">详情</a></li>
              <li>[修复] radioGroup/checkboxGroup组件 单向数据流，选中状态并未跟随modelValue状态。<a href="https://gitee.com/layui-vue/layui-vue/pulls/381">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-18-1"></a>
        <li>
          <h3>2.18.1 <span class="layui-badge-rim">2024-08-09</span></h3>
          <ul>
              <li>[修复] cascader组件 options重新赋值内部panel面板未刷新。<a href="https://gitee.com/layui-vue/layui-vue/pulls/377">详情</a></li>
              <li>[修复] tree组件 checkedKey值异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/375">详情</a></li>
              <li>[修复] tree组件 不存在连线时hover状态整行未居中对齐。<a href="https://gitee.com/layui-vue/layui-vue/pulls/375](https://gitee.com/layui-vue/layui-vue/commit/3b0b138f312cdfc8552414e6e56b535b69825593)">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-18-0"></a>
        <li>
          <h3>2.18.0 <span class="layui-badge-rim">2024-08-02</span></h3>
          <ul>
              <li>[升级] layer 升级至2.4.3。</li>
              <li>[新增] 新增descriptions(描述列表)组件。<a href="https://gitee.com/layui-vue/layui-vue/pulls/369">详情</a></li>
              <li>[新增] 新增cascaderPanel组件 cascader组件 新增搜索、多选、懒加载功能。<a href="https://gitee.com/layui-vue/layui-vue/pulls/338">详情</a></li>
              <li>[新增] auto-complete组件 新增输入框input、focus、blur、clear事件。<a href="https://gitee.com/layui-vue/layui-vue/pulls/360">详情</a></li>
              <li>[新增] table组件 添加expand(行展开)事件。<a href="https://gitee.com/layui-vue/layui-vue/pulls/364">详情</a></li>
              <li>[修复] layer组件 修复umd格式下globalIndex无默认值。<a href="https://gitee.com/layui-vue/layui-vue/pulls/374">详情</a></li>
              <li>[修复] form组件 取消表单submit默认行为。<a href="https://gitee.com/layui-vue/layui-vue/pulls/365">详情</a></li>
              <li>[修复] table组件 data-source改变default-expand-all未更新。<a href="https://gitee.com/layui-vue/layui-vue/pulls/368">详情</a></li>
              <li>[修复] table组件 存在多级表头&totalRow开启行统计时设置fixed报错。<a href="https://gitee.com/layui-vue/layui-vue/pulls/373">详情</a></li>
              <li>[修复] tree组件 checkedKeys异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/354">详情</a></li>
              <li>[修复] avatar组件 修复在src和fallback均不能加载图片时的高频请求问题。<a href="https://gitee.com/layui-vue/layui-vue/pulls/372">详情</a></li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.17.x">
      <ul>
        <a name="2-17-7"></a>
        <li>
          <h3>2.17.7 <span class="layui-badge-rim">2024-06-27</span></h3>
          <ul>
              <li>[升级] layer 升级至2.4.2。</li>
              <li>[新增] tree组件 新增props：`searchNodeMethod`、emit： `check-change`、Exposes： `filter`。<a href="https://gitee.com/layui-vue/layui-vue/pulls/345">详情</a></li>
              <li>[重构] popper组件 影响组件 `tooltip`。<a href="https://gitee.com/layui-vue/layui-vue/pulls/342">详情</a></li>
              <li>[修复] layer组件 手动调用min/full函数切换状态异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/339">详情</a></li>
              <li>[修复] layer组件 content属性在type为6场景下值为VNode失效。<a href="https://gitee.com/layui-vue/layui-vue/pulls/344">详情</a></li>
              <li>[修复] tree组件 设置replaceFields后，节点联动失效。<a href="https://gitee.com/layui-vue/layui-vue/pulls/345">详情</a></li>
              <li>[修复] tree-select组件 下拉树多选开始搜索，选中搜索项会导致已选项清空。<a href="https://gitee.com/layui-vue/layui-vue/pulls/345">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-17-6"></a>
        <li>
          <h3>2.17.6 <span class="layui-badge-rim">2024-06-13</span></h3>
          <ul>
              <li>[升级] layer 升级至2.4.1。</li>
              <li>[新增] layer组件 layer.prompt类型。<a href="https://gitee.com/layui-vue/layui-vue/pulls/337">详情</a></li>
              <li>[修复] layer组件 设置area属性最小化后还原位置错误。<a href="https://gitee.com/layui-vue/layui-vue/pulls/340">详情</a></li>
              <li>[修复] tree组件 check-strictly为false时checkedKeys值异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/336">详情</a></li>
              <li>[修复] date-picker组件 min/max属性丢失响应式。<a href="https://gitee.com/layui-vue/layui-vue/pulls/334">详情</a></li>
              <li>[修复] badge组件 Ripple 闪动动画异常。<a href="https://gitee.com/layui-vue/layui-vue/pulls/332">详情</a></li>
              <li>[调整] menu-item组件 删除props.to属性。<a href="https://gitee.com/layui-vue/layui-vue/pulls/331">详情</a></li>
              <li>[调整] form组件 label-width为0时，label元素不渲染。<a href="https://gitee.com/layui-vue/layui-vue/pulls/330">详情</a></li>
              <li>[调整] form组件 layui-form-item>block类名调整为layui-form-item>layui-form-item-block。<a href="https://gitee.com/layui-vue/layui-vue/pulls/341">详情</a></li>
              <li>[样式] tree组件 图标及连线样式调整(轻度调整)。<a href="https://gitee.com/layui-vue/layui-vue/pulls/329">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-17-5"></a>
        <li>
          <h3>2.17.5 <span class="layui-badge-rim">2024-06-04</span></h3>
          <ul>
              <li>[升级] layer 升级至2.4.0。<a href="https://gitee.com/layui-vue/layui-vue/pulls/328">详情</a></li>
              <li>[新增] layer组件 layer.min 最小化、layer.revert 复原最小/最大化。</li>
              <li>[新增] layer组件 props.revert 内部最小/最大化生命周期。</li>
              <li>[新增] layer组件 props.lastPosition 最小/最大化 复原位置 `true` 最后位置 `false` 初始位置。</li>
              <li>[新增] layer组件 min Expose事件 外部最小化。</li>
              <li>[新增] layer组件 revert Expose事件 外部还原最小/最大化。</li>
              <li>[删除] layer组件 props.destroy。</li>
              <li>[调整] layer组件 props.restore 由 props.revert 代替。</li>
              <li>[修复] datePicker组件 clear事件rang场景初始值调整为空数组。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-17-4"></a>
        <li>
          <h3>2.17.4 <span class="layui-badge-rim">2024-05-23</span></h3>
          <ul>
              <li>[升级] layer 升级至2.3.4。</li>
              <li>[新增] datePicker组件 新增clear事件。<a href="https://gitee.com/layui-vue/layui-vue/pulls/325">详情</a></li>
              <li>[修复] layer组件 type为time范围选择初始化滚动位置失效。<a href="https://gitee.com/layui-vue/layui-vue/pulls/324">详情</a></li>
              <li>[修复] popper组件 zIndex应大于layer。<a href="https://gitee.com/layui-vue/layui-vue/pulls/323">详情</a></li>
              <li>[修复] iconPicker组件 disabled状态下可进行清除操作。<a href="https://gitee.com/layui-vue/layui-vue/pulls/321">详情</a></li>
              <li>[修复] tsconfig.json moduleResolution为bundler无法引用types。<a href="https://gitee.com/layui-vue/layui-vue/pulls/320">详情</a></li>
              <li>[优化] form组件 整体样式优化。<a href="https://gitee.com/layui-vue/layui-vue/pulls/326">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-17-3"></a>
        <li>
          <h3>2.17.3 <span class="layui-badge-rim">2024-05-08</span></h3>
          <ul>
              <li>[修复] datePicker组件 default-time属性调整为非必填。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-17-2"></a>
        <li>
          <h3>2.17.2 <span class="layui-badge-rim">2024-05-06</span></h3>
          <ul>
              <li>[升级] layer 升级至2.3.3。</li>
              <li>[升级] json-schema-form 升级至1.0.7。</li>
              <li>[新增] table组件 columns.customSlot属性新增function类型。<a href="https://gitee.com/layui-vue/layui-vue/pulls/317">详情</a></li>
              <li>[新增] formItem组件 新增tips属性。<a href="https://gitee.com/layui-vue/layui-vue/pulls/313">详情</a></li>
              <li>[新增] inputNumber组件 新增indicator属性。<a href="https://gitee.com/layui-vue/layui-vue/pulls/310">详情</a></li>
              <li>[新增] datePicker组件 新增default-time属性。<a href="https://gitee.com/layui-vue/layui-vue/pulls/309">详情</a></li>
              <li>[修复] layer 设置animDuration属性无效。<a href="https://gitee.com/layui-vue/layui-vue/pulls/303">详情</a></li>
              <li>[修复] table组件 筛选column显示隐藏状态未与column数据绑定。<a href="https://gitee.com/layui-vue/layui-vue/pulls/308">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-17-1"></a>
        <li>
          <h3>2.17.1 <span class="layui-badge-rim">2024-04-23</span></h3>
          <ul>
              <li>[修复] upload组件 cut属性失效<a href="https://gitee.com/layui-vue/layui-vue/pulls/306">详情</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-17-0"></a>
        <li>
          <h3>2.17.0 <span class="layui-badge-rim">2024-04-22</span></h3>
          <ul>
              <li>[新增] form组件 新增isLabelTooltip属性控制label是否超出隐藏。<a href="https://gitee.com/layui-vue/layui-vue/pulls/302">详情</a></li>
              <li>[新增] upload组件 新增选择文件后"on-change"回调事件。<a href="https://gitee.com/layui-vue/layui-vue/pulls/300">详情</a></li>
              <li>[修复] select组件 multiple场景下点击placeholder区域不触发弹窗。<a href="https://gitee.com/layui-vue/layui-vue/pulls/301">详情</a></li>
              <li>[修复] table组件 列宽改变二次渲染单元格错位。<a href="https://gitee.com/layui-vue/layui-vue/pulls/299">详情</a></li>
              <li>[修复] treeSelect组件 modelValue首次赋值为0不生效。<a href="https://gitee.com/layui-vue/layui-vue/pulls/298">详情</a></li>
              <li>[样式] datePicker组件 新增滑入border效果与表单校验失败border边框效果。<a href="https://gitee.com/layui-vue/layui-vue/pulls/297">详情</a></li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.16.x">
      <ul>
        <a name="2-16-8"></a>
        <li>
          <h3>2.16.8 <span class="layui-badge-rim">2024-04-12</span></h3>
          <ul>
              <li>[修复] carousel组件 新增setActive，prev，next外部暴露属性。</li>
              <li>[修复] treeSelect组件 选中节点触发两次change事件。<a href="https://gitee.com/layui-vue/layui-vue/issues/I9CSNH">I9CSNH</a></li>
              <li>[修复] upload组件 额外请求参数移至beforeUpload钩子之后执行。<a href="https://gitee.com/layui-vue/layui-vue/issues/I9E4FA">I9E4FA</a></li>
              <li>[调整] JsonSchemaForm组件 <a href="https://gitee.com/layui-vue/layui-vue/issues/I9DFML#note_26279350_link">相关调整</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-16-7"></a>
        <li>
          <h3>2.16.7 <span class="layui-badge-rim">2024-03-26</span></h3>
          <ul>
              <li>[修复] table组件 双击cell未冒泡到双击row事件。<a href="https://gitee.com/layui/layui-vue/issues/I9BGAP">I9BGAP</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-16-6"></a>
        <li>
          <h3>2.16.6 <span class="layui-badge-rim">2024-03-22</span></h3>
          <ul>
              <li>[新增] table组件 新增单元格双击事件（cell-double）。</li>
              <li>[调整] upload组件 新增submit外部函数，用于用户手动上传。<a href="https://gitee.com/layui/layui-vue/issues/I99WUO">I99WUO</a></li>
              <li>[修复] slider组件 精度丢失。<a href="https://gitee.com/layui/layui-vue/issues/I995I6">I995I6</a></li>
              <li>[修复] table组件 数据改变getCheckboxProps未重新计算。<a href="https://gitee.com/layui/layui-vue/issues/I9A9Y1">I9A9Y1</a></li>
              <li>[修复] treeSelect组件 单选清空二次选择相同值未触发改变。<a href="https://gitee.com/layui/layui-vue/issues/I9A9NT">I9A9NT</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-16-5"></a>
        <li>
          <h3>2.16.5 <span class="layui-badge-rim">2024-03-18</span></h3>
          <ul>
              <li>[新增] table组件 标题插槽新增column，columnIndex参数。</li>
              <li>[修复] table组件 树形跨级展开隐藏错乱。<a href="https://gitee.com/layui/layui-vue/issues/I98Y95">I98Y95</a></li>
              <li>[修复] upload组件 只有当开启裁剪且能够裁剪时才读取文件。<a href="https://gitee.com/layui/layui-vue/issues/I979LK">I979LK</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-16-2"></a>
        <li>
          <h3>2.16.2 <span class="layui-badge-rim">2024-02-29</span></h3>
          <ul>
              <li>[发布] json-schema-form 1.0.0 版本。</li>
              <li>[新增] tree，treeSelect 组件 新增lazy，load参数，实现懒加载子节点。</li>
              <li>[修复] layer组件 在使用template场景下zIndex属性并未更新为最新值。<a href="https://gitee.com/layui/layui-vue/issues/I927ZN">I927ZN</a></li>
              <li>[升级] layer-vue 2.3.2 版本。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-16-1"></a>
        <li>
          <h3>2.16.1 <span class="layui-badge-rim">2024-02-19</span></h3>
          <ul>
              <li>[修复] layer.notify 组件 offset 为 rb 时，位置计算异常。</li>
              <li>[升级] layer-vue 2.3.1 版本。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-16-0"></a>
        <li>
          <h3>2.16.0 <span class="layui-badge-rim">2024-02-19</span></h3>
          <ul>
              <li>[调整] layer.notifiy 方法为 notify。</li>
              <li>[调整] layer 组件 options 属性 type 可选值 notifiy 为 notify。</li>
              <li>[调整] col 组件所有属性可选值范围为 0 - 24。</li>
              <li>[移除] select 组件 items 属性，完全由 options 代替。</li>
              <li>[升级] layer-vue 2.3.0 版本。</li>
          </ul>
        </li>
      </ul>
      </lay-timeline-item>
      <lay-timeline-item title="2.15.x">
      <ul>
        <a name="2-15-2"></a>
        <li>
          <h3>2.15.2 <span class="layui-badge-rim">2024-02-06</span></h3>
          <ul>
              <li>[升级] layer-vue 到 2.2.3 版本。</li>
              <li>[修复] icons-vue 到 1.1.1 版本。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-15-1"></a>
        <li>
          <h3>2.15.1 <span class="layui-badge-rim">2024-02-02</span></h3>
          <ul>
              <li>[新增] affix 组件 test 用例。</li>
              <li>[修复] tree 组件 checkedKeys值丢失。<a href="https://gitee.com/layui/layui-vue/issues/I901ZR">I901ZR</a></li>
              <li>[修复] slider 组件 二次改变modelValue为0时，滚动条未改变。<a href="https://gitee.com/layui/layui-vue/issues/I90K5J">I90K5J</a></li>
              <li>[修复] table 组件 totalRow 合计精度问题。<a href="https://gitee.com/layui/layui-vue/issues/I90LJE">I90LJE</a></li>
              <li>[优化] step 组件 提升 composition 属性优先级,为 row 时 center 属性失效。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-15-0"></a>
        <li>
          <h3>2.15.0 <span class="layui-badge-rim">2024-01-30</span></h3>
          <ul>
              <li>[新增] col 组件 xsPull, smPull, mdPull, lgPull 属性。</li>
              <li>[新增] col 组件 xsPush, smPush, mdPush, lgPush 属性。</li>
          </ul>
        </li>
      </ul>
      </lay-timeline-item>
      <lay-timeline-item title="2.14.x">
      <ul>
        <a name="2-14-3"></a>
        <li>
          <h3>2.14.3 <span class="layui-badge-rim">2024-01-29</span></h3>
          <ul>
              <li>[调整] datePicker 组件 移除 popper 底部清空按钮，该操作交由 allowClear 属性。</li>
              <li>[修复] splitPanel 组件 修复未进行拖动元素失焦问题。<a href="https://gitee.com/layui/layui-vue/issues/I8YP2U">I8YP2U</a></li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-14-2"></a>
        <li>
          <h3>2.14.2 <span class="layui-badge-rim">2024-01-25</span></h3>
          <ul>
              <li>[修复] inputNumber 组件 model-value 属性缺失响应式。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-14-1"></a>
        <li>
          <h3>2.14.1 <span class="layui-badge-rim">2024-01-24</span></h3>
          <ul>
              <li>[新增] color-picker 组件 添加allowClear、simple属性控制清空与确认按钮。</li>
              <li>[新增] input-number 组件 添加precision属性，用于控制数值精度。</li>
              <li>[新增] tree 组件 replace-fields 属性，支持自定义字段。</li>
              <li>[新增] tree 与 treeSelect 组件 defaultExpandAll 属性，默认是否展开所有节点。</li>
              <li>[修复] table 组件 border异常。<a href="https://gitee.com/layui/layui-vue/issues/I8Y142">I8Y142</a></li>
              <li>[修复] table 组件 columns属性内部深度监听。</li>
              <li>[修复] color-picker 组 modelValue为空组件内部报错。</li>
              <li>[优化] table 组件 default-toolbar 的 border-radius 属性跟随主题。</li>
              <li>[优化] date-picker 组件底部按钮 border-radius 跟随主题。</li>
              <li>[优化] tooltip 组件 添加hide事件，当弹窗内容隐藏后触发。</li>
              <li>[优化] layer 组件操作栏 icon 资源，替换为 @layui/icons-vue。</li>
              <li>[优化] layer 组件操作栏 icon 主题跟随主题色。</li>
              <li>[升级] @layui/layer-vue 2.2.1 版本。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-14-0"></a>
        <li>
          <h3>2.14.0 <span class="layui-badge-rim">2024-01-15</span></h3>
          <ul>
              <li>[新增] select 组件 header 与 footer 插槽。</li>
              <li>[修复] checkcard 组件 hover 状态边框不跟随主题色。</li>
              <li>[优化] table 组件内 switch radio 等组件与原样式发生出入的问题。</li>
              <li>[优化] switch 组件 size 为 lg md sm xs 时的样式尺寸。</li>
              <li>[优化] checkcard 组件边框颜色，角标位置。</li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.13.x">
      <ul>
        <a name="2-13-4"></a>
        <li>
          <h3>2.13.4 <span class="layui-badge-rim">2024-01-14</span></h3>
          <ul>
            <li>[修复] public.css 在按需模式下丢失的问题 。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-13-3"></a>
        <li>
          <h3>2.13.3 <span class="layui-badge-rim">2024-01-14</span></h3>
          <ul>
            <li>[修复] input-number 组件 触摸板点击加减触发两次事件。<a href="https://gitee.com/layui/layui-vue/issues/I8VJCB">I8VJCB</a></li>
            <li>[修复] table 组件 table-body出现滚动条行统计偏移量问题。<a href="https://gitee.com/layui/layui-vue/issues/I8VGW2">I8VGW2</a></li>
            <li>[修复] tree-select 组件 搜索问题。<a href="https://gitee.com/layui/layui-vue/issues/I8ULRO">I8ULRO</a></li>
            <li>[新增] tree-select 组件 searchNodeMethod 搜索自定义过滤方法。<a href="http://www.layui-vue.com/zh-CN/components/treeSelect">treeSelect</a></li>
            <li>[新增] form 组件 label文字长度溢出显示tooltip。<a href="https://gitee.com/layui/layui-vue/issues/I8UMQH">I8UMQH</a></li>
            <li>[修复] table 组件切换分页时自动宽度不工作的问题。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-13-2"></a>
        <li>
          <h3>2.13.2 <span class="layui-badge-rim">2024-01-06</span></h3>
          <ul>
            <li>[修复] form-item 组件 label 缺省的情况下，验证异常。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-13-1"></a>
        <li>
          <h3>2.13.1 <span class="layui-badge-rim">2024-01-04</span></h3>
          <ul>
            <li>[新增] input-number 组件 step-strictly 限制输入值只能是步长的倍数。</li>
            <li>[修复] watermark 组件 index.css 按需模式丢失问题。</li>
            <li>[优化] input 组件 blur 与 foucs 事件参数类型为 FocusEvent。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-13-0"></a>
        <li>
          <h3>2.13.0 <span class="layui-badge-rim">2023-12-25</span></h3>
          <ul>
            <li>[新增] watermark 水印组件。</li>
            <li>[新增] watermark 组件 content 属性，用于设置内容。</li>
            <li>[新增] watermark 组件 elementBox 属性，用于指定父容器。</li>
            <li>[新增] watermark 组件 color 属性，用于设置水印字体颜色。</li>
            <li>[新增] watermark 组件 fontSize 属性，用于设置水印字体大小。</li>
            <li>[新增] watermark 组件 fontFamily 属性，用于设置水印字体样式。</li>
            <li>[新增] watermark 组件 rotate 属性，用于设置水印角度。</li>
            <li>[新增] watermark 组件 height 属性，用于设置水印高度。</li>
            <li>[新增] watermark 组件 width 属性，用于设置水印宽度。</li>
            <li>[新增] tree-select 组件 title 插槽用于自定义标题内容。</li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.12.x">
      <ul>
        <a name="2-12-0"></a>
        <li>
          <h3>2.12.0 <span class="layui-badge-rim">2023-11-23</span></h3>
          <ul>
            <li>[新增] layer 组件 resizeStart 属性，拉伸开始回调。</li>
            <li>[新增] layer 组件 resizing 属性，拉伸中回调。</li>
            <li>[新增] layer 组件 resizeEnd 属性，拉伸结束回调。</li>
            <li>[新增] form 组件 mode 属性，全局设置表单项布局模式，block 与 inline 未可选值。</li>
            <li>[新增] table 组件 empty 插槽，提供自定义空状态的能力。</li>
            <li>[新增] table 组件 empty-description 属性，设置没有数据时的默认文本。</li>
            <li>[修复] select 组件 allowClear 属性在文档缺失的问题。</li>
            <li>[升级] layer 组件 2.2.0 版本。</li> 
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.11.x">
      <ul>
        <a name="2-11-5"></a>
        <li>
          <h3>2.11.5 <span class="layui-badge-rim">2023-11-17</span></h3>
          <ul>
            <li>[修复] avatar 组件 class 错误，导致内容不垂直水平居中的问题。</li>
            <li>[修复] slider 组件 max 属性响应式特性失效的问题。</li> 
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-11-4"></a>
        <li>
          <h3>2.11.4 <span class="layui-badge-rim">2023-11-09</span></h3>
          <ul>
            <li>[新增] avatar 与 avatar-list 单元测试用例。</li>
            <li>[修复] table 组件 defaultToolbar 在国际化场景下不兼容的问题。</li> 
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-11-3"></a>
        <li>
          <h3>2.11.3 <span class="layui-badge-rim">2023-11-04</span></h3>
          <ul>
            <li>[修复] page 组件 skin 启用，跳转操作 "确认" 不适配国际化的问题。</li>
            <li>[修复] date-picker 组件下拉面板中的 "确认" 操作 hover 状态不跟随主题色的问题。</li>
            <li>[修正] form 组件文档 required-error-message 属性描述错误。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-11-2"></a>
        <li>
          <h3>2.11.2 <span class="layui-badge-rim">2023-11-02</span></h3>
          <ul>
            <li>[修复] avatar 升级 2.11.0 后，加载图片失败会导致 icon 闪动和连续的请求。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-11-1"></a>
        <li>
          <h3>2.11.1 <span class="layui-badge-rim">2023-11-01</span></h3>
          <ul>
            <li>[修复] avatar 升级 2.11.0 后，加载图片失败会导致 icon 闪动和连续的请求。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-11-0"></a>
        <li>
          <h3>2.11.0 <span class="layui-badge-rim">2023-10-30</span></h3>
          <ul>
            <li>[新增] avatar 组件 fullback 属性，图片加载失败时的回调。</li>
            <li>[新增] avatar 组件 auto-fix-size 属性，自动调节 icon 与 font 尺寸。</li>
            <li>[新增] avatar-list 组件 size 属性，统一 slots 内 avatar 组件 size 属性。</li>
            <li>[新增] avatar-list 组件 radius 属性，统一 slots 内 avatar 组件 radius 属性。</li>
            <li>[新增] badge 组件 position 属性，top-righ top-left bottom-right bottom-left 为可选值。</li>
            <li>[新增] badge 组件 showZero 属性，当 value 为 0 时是否显示。</li>
            <li>[新增] badge 组件 max 属性，设置 value 最大阈值。</li>
            <li>[新增] badge 组件 badgeStyle 属性，设置 badge 样式。</li>
            <li>[新增] badge 组件 custom 插槽。</li>
            <li>[新增] badge 组件 jest 用例。</li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.10.x">
      <ul>
        <a name="2-10-3"></a>
        <li>
          <h3>2.10.3 <span class="layui-badge-rim">2023-10-28</span></h3>
          <ul>
            <li>[修复] table 组件 totalRow 启用后，数据超过表格既定高度，统计栏被压缩的问题。</li>
            <li>[修复] collapse 组件 css 样式，border-radius 超过一定数值标题元素溢出组件的问题。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-10-2"></a>
        <li>
          <h3>2.10.2 <span class="layui-badge-rim">2023-10-25</span></h3>
          <ul>
            <li>[修复] table 组件 resize 属性启用后，拖拽列刷新数据后宽度错位的问题。</li>
            <li>[修复] checkbox 组件 border-radius 不跟随 global-border-radius 变量的问题。</li>
            <li>[修复] splitPanel 组件在拖拽时选中页面文字元素的问题。</li>
            <li>[文档] layer.md 增加 shadeStyle 属性的说明。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-10-1"></a>
        <li>
          <h3>2.10.1 <span class="layui-badge-rim">2023-10-21</span></h3>
          <ul>
            <li>[新增] layer 组件 shadeStyle 属性，设置遮盖层样式。</li>
            <li>[修复] tree-select 组件 multiple 属性为 false 时，change 事件触发两次的问题。</li>
            <li>[修复] page 组件 total 属性为 0 时，页面显示 1 | 0 的问题。</li>
            <li>[修复] upload 组件取消文件选择后，內部仍出发后续解析上传的流程问题。</li>
            <li>[修复] table 组件 children 属性内的子节点 totalRow 属性不起作用的问题。</li>
            <li>[优化] table 组件 totalRow 合并行始终固定在表格最底部，不再随数据流位置而变化。</li>
            <li>[升级] layer-vue 2.1.1 版本。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-10-0"></a>
        <li>
          <h3>2.10.0 <span class="layui-badge-rim">2023-10-16</span></h3>
          <ul>
            <li>[新增] slider 组件 model-value 属性 array 类型兼容。</li>
            <li>[新增] slider 组件 reverse 属性, 实现初始值与结束值的转换。</li>
            <li>[新增] silder 组件 tooltip-props 属性, 传入 tooltip 继承属性，自定义效果。</li>
            <li>[新增] silder 组件 mark 属性, 设置自定义刻度。</li>
            <li>[新增] slider 组件 format-tooltip 函数，格式化 tooltip 内容。</li>
            <li>[新增] slider 组件 is-follow-mark 属性, 设置拖拽按钮是否在自定义刻度停顿。</li>
            <li>[新增] slider 组件 thumb 插槽，定制化拖拽按钮。</li>
            <li>[新增] slider 组件 mark 插槽，定制化刻度渲染内容。</li>
            <li>[新增] slider 组件 custom 插槽，定制化 tooltip 显示内容。</li>
            <li>[新增] slider 组件 change 时间，按钮拖拽回调。</li>
            <li>[新增] table 组件 columns 属性 ignoreExport 配置，用于配置列导出忽略。</li>
            <li>[新增] badge.md 组件 color, ripple 属性说明。</li>
            <li>[修复] tooltip 组件 isAutoShow 属性为 true 时，包裹文本刷新时 isAutoShow 失效。</li>
            <li>[修复] table 组件 columns 属性 ellipsisTooltip 配置刷新数据后失效。</li>
            <li>[修复] table 组件 autoColsWidth 不兼容 number 类型字段的问题。</li>
            <li>[修复] cascader 组件 多次触发 change 事件的问题。</li>
            <li>[优化] date-picker 组件，调整 dropdown 顶部操作 font-size 为 12px。</li>
            <li>[优化] tooltip.md 文档，改善 demo 阅读门槛。</li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.9.x">
      <ul>
        <a name="2-9-1"></a>
        <li>
          <h3>2.9.1 <span class="layui-badge-rim">2023-10-11</span></h3>
          <ul>
              <li>[优化] layer 组件 resize 启用时，拉伸选中文字的问题。</li>
              <li>[升级] layer-vue 到 2.1.0 版本。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-9-0"></a>
        <li>
          <h3>2.9.0 <span class="layui-badge-rim">2023-10-10</span></h3>
          <ul>
            <li>[修复] form-item 组件 prop 配置 x[0].y 格式时，form 组件 reset 方法不兼容。</li>
            <li>[优化] form 组件 reset 方法清空未配置 prop 属性的问题。</li>
            <li>[优化] collapse-item 组件 title 属性为非必填。</li>
            <li>[文档] 改善 button.md 中下拉按钮案例，页面滚动下拉面板不跟随按钮的问题。</li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
      <lay-timeline-item title="2.8.x">
        <ul>
          <a name="2-8-1"></a>
          <li>
            <h3>2.8.1 <span class="layui-badge-rim">2023-10-09</span></h3>
            <ul>
              <li>[修复] layer 组件拖拽后，全文文本无法选中的问题。</li>
              <li>[升级] layer-vue 到 2.0.5 版本。</li>
            </ul>
          </li>
        </ul>
        <ul>
          <a name="2-8-0"></a>
          <li>
            <h3>2.8.0 <span class="layui-badge-rim">2023-10-09</span></h3>
            <ul>
              <li>[新增] layer 组件 full 方法，必填参数为 id，用于弹出层最大化。</li>
              <li>[优化] layer 组件 resize 启用时，拉伸选中文字的问题。</li>
              <li>[优化] layer 组件 success 方法，加入 nextTick 优化，保证在弹层渲染后执行。</li>
              <li>[升级] layer-vue 2.0.4 版本。</li>
            </ul>
          </li>
        </ul>
      </lay-timeline-item>
      <lay-timeline-item title="2.7.x">
        <ul>
        <a name="2-7-4"></a>
        <li>
          <h3>2.7.4 <span class="layui-badge-rim">2023-10-08</span></h3>
          <ul>
            <li>[修复] page 组件 total 属性回显数量不正确的问题。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-7-2"></a>
        <li>
          <h3>2.7.2 <span class="layui-badge-rim">2023-10-08</span></h3>
          <ul>
            <li>[修复] icon-picker 组件按需模式部分样式丢失的问题。</li>
            <li>[优化] icon-picker 组件 page 启用后底栏样式，下边距由 5px 调整为 10px。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-7-1"></a>
        <li>
          <h3>2.7.1 <span class="layui-badge-rim">2023-10-07</span></h3>
          <ul>
            <li>[新增] table 组件 page 属性 layout 配置。</li>
            <li>[新增] table 组件 page 属性 hide-on-single-page 配置。</li>
            <li>[新增] table 组件 page 属性 ellipsisTooltip 配置。</li>
            <li>[新增] table 组件 page 属性 disabled 配置。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-7-0"></a>
        <li>
          <h3>2.7.0 <span class="layui-badge-rim">2023-09-30</span></h3>
          <ul>
            <li>[新增] select 组件 auto-fit-width 属性, 将下拉面板宽度设置为输入框宽度。</li>
            <li>[新增] table 组件 height 属性 % 值的兼容，从而实现高度自适应。</li>
            <li>[修复] table 组件 height 与 maxHeight 只作用到 body 而非整个 table 的问题。</li>
            <li>[修复] layer 组件 reset 方法调用报错的问题。</li>
            <li>[优化] table 组件 空 状态水平垂直居中位置显示。</li>
            <li>[优化] table 组件 page 属性 limits 配置内容省略显示的问题。</li>
            <li>[优化] table 组件 background 背景色为 #ffffff。</li>
            <li>[升级] layer-vue 到 2.0.2 版本。</li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.6.x">
      <ul>
        <a name="2-6-4"></a>
        <li>
          <h3>2.6.4 <span class="layui-badge-rim">2023-09-26</span></h3>
          <ul>
            <li>[新增] table 组件 ellipsisTooltipTheme 属性，自定义 ellipsisTooltip 主题，默认为 'light'。</li>
            <li>[修复] layer 组件 关闭 时，未移除 minArrays 中的弹层实例。</li>
            <li>[升级] layer-vue 到 2.0.1 版本。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-6-3"></a>
        <li>
          <h3>2.6.3 <span class="layui-badge-rim">2023-09-25</span></h3>
          <ul>
            <li>[修复] global-primary-color 设置 color 时，在 dark 模式下失效的问题。</li>
            <li>[修复] global-normal-color 设置 color 时，在 dark 模式下失效的问题。</li>
            <li>[修复] global-warm-color 设置 color 时，在 dark 模式下失效的问题。</li>
            <li>[修复] global-danger-color 设置 color 时，在 dark 模式下失效的问题。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-6-2"></a>
        <li>
          <h3>2.6.2 <span class="layui-badge-rim">2023-09-25</span></h3>
          <ul>
            <li>[修复] page 组件在按需模式下无法正常使用的问题 (由 2.6.1 产生)。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-6-1"></a>
        <li>
          <h3>2.6.1 <span class="layui-badge-rim">2023-09-24</span></h3>
          <ul>
            <li>[新增] page 组件 ellipsisTooltip属性 开启翻页更多。</li>
            <li>[优化] page 组件 layout 属性可更换位置。</li>
            <li>[优化] page 组件 simple 属性启用下的分页样式。</li>
            <li>[修复] page 组件 limit 属性切换不触发 change 事件。</li>
            <li>[测试] 完善分页组件所有属性测试用例, 测试覆盖率100%。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-6-0"></a>
        <li>
          <h3>2.6.0 <span class="layui-badge-rim">2023-09-21</span></h3>
          <ul>
            <li>[新增] datePicker 组件 max,min 属性，用于控制组件内的可选择的最大值与最小值。</li>
            <li>[新增] page 组件 disabled 属性，默认值为 false, 用于分页组件禁用。</li>
            <li>[新增] page 组件 hide-on-single-page 属性，total 值超出 pages 后使用下拉展示。</li>
            <li>[新增] page 组件 layout 属性，字符数组, count, limits, next, page, prev, refresh, skip 为可选值。</li>
            <li>[修复] table 组件 fixed 列内容超出列宽后溢出。</li>
            <li>[优化] table 组件内容换行后，expand-icon 不垂直居中的问题。</li>
            <li>[优化] page 组件 limit 属性，可选属性, 默认值为 10。</li>
            <li>[优化] page 组件 pages 属性，调整 5 为默认值。</li>
            <li>[优化] page 组件 limits 选择框，使用 lay-select 代替原生 select, 改善样式。</li>
            <li>[优化] page 组件 total 值超出 pages 后，省略页码的展现形式。</li>
            <li>[移除] page 组件 showPage, showSkip, showCount, showLimit, showInput, showRefresh 属性。</li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
   <lay-timeline-item title="2.5.x">
      <ul>
        <a name="2-5-0"></a>
        <li>
          <h3>2.5.0 <span class="layui-badge-rim">2023-09-18</span></h3>
          <ul>
            <li>[新增] loading 组件 indicator 插槽，支持自定义加载动画。</li>
            <li>[新增] layer 组件 teleport 属性，用于指定弹出层挂载的 dom 节点，默认为 body。</li>
            <li>[新增] layer 组件 teleportDisabled 属性，用于禁用 teleport 传送门属性。</li>
            <li>[修复] loading 组件 type 属性为 1 2 时，夜间模式不适配的问题。</li>
            <li>[修复] layer 组件 type 为 3 时，仍展示标题的问题。</li>
            <li>[文档] 新增 layer 组件 moving 回调属性说明，同于拖拽中监听。</li>
            <li>[升级] layer-vue 2.0.0 版本。</li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.4.x">
      <ul>
        <a name="2-4-1"></a>
        <li>
          <h3>2.4.1 <span class="layui-badge-rim">2023-09-16</span></h3>
          <ul>
            <li>[修复] date-picker 组件 range 模式 allow-clear 属性不生效的问题。</li>
            <li>[修复] date-picker 组件 format 属性启用时，计算逻辑错误的问题。</li>
            <li>[调整] date-picker 组件 rangeSeparator 属性默认值为 "-"。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-4-0"></a>
        <li>
          <h3>2.4.0 <span class="layui-badge-rim">2023-09-15</span></h3>
          <ul>
            <li>[新增] loading 组件，局部加载。</li>
            <li>[新增] loading 组件 loading 属性，控制加载状态。</li>
            <li>[新增] loading 组件 type 属性，设置动画类型。</li>
            <li>[新增] loading 组件 tip 属性，设置提示信息。</li>
            <li>[新增] loading 组件 delay 属性，设置延迟时间，单位：毫秒。</li>
            <li>[修复] table 组件某些情况下，表头与列错位的问题。 </li>
            <li>[修复] input 组件 type 属性为 number 时，allow-clear 无效的问题。</li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.3.x">
      <ul>
        <a name="2-3-20"></a>
        <li>
          <h3>2.3.20 <span class="layui-badge-rim">2023-09-11</span></h3>
          <ul>
            <li>[新增] layer 组件 animDuration 属性，自定义入场动画速率，默认为 0.3s。 </li>
            <li>[新增] layer 组件 area 属性 ['auto', '100px'] 格式，从而实现宽度自适应。</li>
            <li>[升级] layer-vue 到 1.9.3 版本。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-19"></a>
        <li>
          <h3>2.3.19 <span class="layui-badge-rim">2023-09-07</span></h3>
          <ul>
            <li>[修复] date-picker 组件 showNow 必填的控制台警告。</li>
            <li>[修复] date-picker 组件 range 组件样式问题。</li>
            <li>[修复] tree-select 组件 multiple 属性启用时, 点击节点发生控制台异常。</li>
            <li>[修复] menu 组件第一级菜单在折叠后 to 属性失效的问题。</li>
            <li>[修复] select 组件 multiple 为 true 时 placeholder 属性无效的问题。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-18"></a>
        <li>
          <h3>2.3.18 <span class="layui-badge-rim">2023-09-07</span></h3>
          <ul>
            <li>[优化] table 组件 selectedKeys, selectedKey 属性在 dataSource 变化时不再清空。</li>
            <li>[优化] select 组件 change 事件, value 参数增加 number 和 object 类型兼容。</li>
            <li>[优化] select 组件 update:modelValue 事件, value 参数增加 number 和 object 类型兼容。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-17"></a>
        <li>
          <h3>2.3.17 <span class="layui-badge-rim">2023-09-03</span></h3>
          <ul>
            <li>[修复] treeSelect 组件 multiple 为 true 时 placeholder 属性无效的问题。</li>
            <li>[优化] popconfirm 组件 content 插槽存在时 content 为非必填。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-16"></a>
        <li>
          <h3>2.3.16 <span class="layui-badge-rim">2023-09-03</span></h3>
          <ul>
            <li>[优化] empty 组件采用 flex 布局，保证内容居中自适应。</li>
            <li>[优化] input 组件 background-color 为 #ffffff 值。</li>
            <li>[优化] date-picker 组件范围选择模式，移除现在操作。</li>
            <li>[优化] page 组件 update:modelValue 与 change 事件的执行顺序。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-15"></a>
        <li>
          <h3>2.3.15 <span class="layui-badge-rim">2023-08-27</span></h3>
          <ul>
            <li>[修复] form 组件 rules 属性类型警告，调整 Rule 为 Rules 类型。</li>
            <li>[修复] select 组件 v-model 为 0 时，allow-clear 操作偏移的问题。</li>
            <li>[修复] tree-select 组件 v-model 为 0 时，allow-clear 操作偏移的问题。</li>
            <li>[修复] slider 组件 max min 属性导致拖拽逻辑错乱的问题。</li>
            <li>[优化] slider 组件拖拽卡顿的问题，移除节流防抖函数。</li>
            <li>[优化] date-picker 组件时间选择器，隐藏时分秒列表滚动条。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-14"></a>
        <li>
          <h3>2.3.14 <span class="layui-badge-rim">2023-08-20</span></h3>
          <ul>
            <li>[新增] layer 组件 moving 回调函数，用于处理拖拽中的自定义逻辑。</li>
            <li>[新增] layer 组件 title 插槽, 自定义标题内容。<a href="https://gitee.com/layui/layui-vue/issues/I7S0DF">I7S0DF</a></li>
            <li>[修复] slider 组件在 form-item 内时，增加左侧 10px 边距。</li>
            <li>[修复] form 组件提交验证案例中 rules 配置错误从而导致 demo 无效的问题。<a href="https://gitee.com/layui/layui-vue/issues/I7SN5F">I7SN5F</a></li>
            <li>[修复] table 组件 columns 属性 ellipsisTooltip 配置，按需模式不生效的问题。<a href="https://gitee.com/layui/layui-vue/issues/I7U9WE">I7U9WE</a></li>
            <li>[升级] layer-vue 到 1.9.1 版本。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-13"></a>
        <li>
          <h3>2.3.13 <span class="layui-badge-rim">2023-08-10</span></h3>
          <ul>
            <li>[新增] breadcrumb 组件 separator-icon 属性，用于设置图标分割符。</li>
            <li>[优化] cascader 组件选中项 border-radius 溢出 panel 的问题。</li>
            <li>[优化] color-picker 组件在 form-item 组件 pane 模式下的样式。</li>
            <li>[优化] icon-picker 组件在 form-item 组件 pane 模式下的样式。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-12"></a>
        <li>
          <h3>2.3.12 <span class="layui-badge-rim">2023-08-09</span></h3>
          <ul>
            <li>[修复] rate 组件清空操作不更新 modelValue 的问题。</li>
            <li>[修复] slider 组件在 form-item 组件 block 模式下不垂直居中的问题。</li>
            <li>[优化] rate 组件清空操作仅在 modelValue 大于 0 时显示。</li>
          </ul>
        </li>
      </ul>
       <ul>
        <a name="2-3-11"></a>
        <li>
          <h3>2.3.11 <span class="layui-badge-rim">2023-08-09</span></h3>
          <ul>
            <li>[修复] date-picker 组件 size 属性缺省情况下不随 form 全局配置的问题。</li>
            <li>[优化] slider 组件在 form-item 不垂直居中的问题。</li>
            <li>[优化] rate 组件清空操作，在 form-item 不垂直居中的问题。</li>
            <li>[优化] input 组件 modelValue 属性，增加 null 值兼容。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-10"></a>
        <li>
          <h3>2.3.10 <span class="layui-badge-rim">2023-08-06</span></h3>
          <ul>
            <li>[修复] date-picker 组件 datetime 模式下交互逻辑问题。</li>
            <li>[修复] tag 组件 color 属性，在夜间模式无法正常生效的问题。</li>
            <li>[修复] tab 组件滑动逻辑没有将 tab-item 外边距计算在内的问题。</li>
            <li>[优化] checkbox-group 组件 update:modelValue 事件与 change 的执行顺序。</li>
            <li>[优化] checkbox 组件 update:modelValue 事件与 change 的执行顺序。</li>
            <li>[优化] input 组件 update:modelValue 与 input 事件的执行顺序。</li>
            <li>[优化] input 组件 input 事件的触发逻辑，拼音阶段不再触发。</li>
            <li>[优化] textarea 组件 update:modelValue 与 input 事件的执行顺序。</li>
            <li>[优化] textarea 组件 input 事件的触发逻辑，拼音阶段不再触发。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-9"></a>
        <li>
          <h3>2.3.9 <span class="layui-badge-rim">2023-08-02</span></h3>
          <ul>
            <li>[修复] line 组件夜间模式下的兼容性问题，无法正常显示。</li>
            <li>[修复] 夜间模式 global-primary-color 被强制覆盖的问题。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-8"></a>
        <li>
          <h3>2.3.8 <span class="layui-badge-rim">2023-07-30</span></h3>
          <ul>
            <li>[新增] textarea 组件 autosize 属性，根据内容自适应高度。</li>
            <li>[修复] autoComplete 组件 modelValue 属性选中时不更新的问题。</li>
            <li>[文档] 补充 textarea.md 高度自适应，固定案列案例。</li>
            <li>[文档] 修正 table.md 中 max-height 与 height 属性类型描述错误。</li>
            <li>[文档] 补充 table.md 中 total-row 行统计案例。</li>
            <li>[优化] step 组件 type 属性为 primary 时的颜色为 #16baaa。</li>
            <li>[优化] step 组件 type 属性为 primary 时的颜色不跟随主题色的问题。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-7"></a>
        <li>
          <h3>2.3.7 <span class="layui-badge-rim">2023-07-25</span></h3>
          <ul>
            <li>[优化] layer 组件 max min 等操作夜间模式无法分辨的问题。</li>
            <li>[优化] layer.load(1) 资源，由 gif 升级为 svg，解决矢帧问题。</li>
            <li>[优化] layer.load(2) 资源，由 gif 升级为 svg，解决矢帧问题。</li>
            <li>[优化] layer.load(3) 资源，由 gif 升级为 svg，解决矢帧问题。</li>
            <li>[升级] layer-vue 到 1.9.0 版本。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-6"></a>
        <li>
          <h3>2.3.6 <span class="layui-badge-rim">2023-07-25</span></h3>
          <ul>
            <li>[修复] form 组件 reset 方法无法清空数组类型数据。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-5"></a>
        <li>
          <h3>2.3.5 <span class="layui-badge-rim">2023-07-21</span></h3>
          <ul>
            <li>[修复] layer 组件 global-index 层级无法共享的问题。</li>
            <li>[修复] form 组件 model 属性为深层时，执行 reset 报错问题。</li>
            <li>[优化] form 组件 reset 方法逻辑，重置后不再重新验证内容。</li>
            <li>[优化] button 组件 loading 属性，为 true 时，禁止 click 事件触发。 </li>
            <li>[优化] button 组件 loading 属性，为 true 时，保留原有文本。</li>
            <li>[优化] button 组件 suffix-icon 与 prefix-icon 属性，增加左右边距。</li>
            <li>[文档] 新增 table 组件 getCheckData 方法说明。</li>
            <li>[文档] 明确 layer 组件 end 与 close 回调属性说明。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-2"></a>
        <li>
          <h3>2.3.4 <span class="layui-badge-rim">2023-07-14</span></h3>
          <ul>
            <li>[修复] tag 组件 type 属性启用时，variant 为 light 失效的问题。</li>
            <li>[优化] tag 组件 text 颜色随 Css 变量自适应。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-2"></a>
        <li>
          <h3>2.3.3 <span class="layui-badge-rim">2023-07-11</span></h3>
          <ul>
            <li>[新增] layer 组件 titleStyle 属性，用于自定义 title 样式。</li>
            <li>[新增] upload 组件 beforeUpload 属性 Promise 返回值类型兼容。</li>
            <li>[修复] index.umd.js 与 index.es.js 中存在 index.css 的 decode 问题。</li>
            <li>[修复] tag 组件 type 属性为 primary 时不跟随主题色的问题。</li>
            <li>[修复] layer 组件 border-radius 不跟随 css 变量的问题。</li>
            <li>[修复] layer 组件 按钮 的 border-radius 不跟随 css 变量的问题。</li>
            <li>[优化] unpackedSize 大小，由 14.5 MB 改善到 8.5 MB。</li>
            <li>[优化] index.umd.js 大小，由 2.6 MB 改善到 1.1 MB。</li>
            <li>[优化] tree 组件 OriginalTreeData 类型，移除 field 无效属性。</li>
            <li>[优化] tree 组件 data 属性 OriginalTreeData[] 类型兼容。</li>
            <li>[优化] layer 组件消息通知 border-radius 为 2px。</li>
            <li>[优化] layer 组件，鼠标移入标题栏，根据 move 属性采用不同的样式。</li>
            <li>[升级] layer-vue 到 1.8.11 版本。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-2"></a>
        <li>
          <h3>2.3.2 <span class="layui-badge-rim">2023-06-28</span></h3>
          <ul>
            <li>[新增] layer 组件 btn 属性 style 配置，自定义按钮 Style。</li>
            <li>[新增] layer 组件 btn 属性 class 配置，自定义按钮 Class。</li>
            <li>[新增] select 组件 options 属性代替 items 属性。</li>
            <li>[新增] tree 组件 tail-node-icon 属性，用于设置尾节点图标，通过设置 false 关闭。</li>
            <li>[修复] table 组件 childrenColumnName 属性无效的问题。</li>
            <li>[修复] config-provider 组件 locales 属性 build 时的类型检测问题。</li>
            <li>[优化] layer 组件 layui-layer-btn0 元素跟随主题色。</li>
            <li>[补充] table 文档 sort-change 事件说明。 </li>
            <li>[补充] select 组件 items 属性说明。</li>
            <li>[过时] select 组件 items 属性，但仍生效。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-1"></a>
        <li>
          <h3>2.3.1 <span class="layui-badge-rim">2023-06-18</span></h3>
          <ul>
            <li>[补充] form 组件 label-width 属性遗漏。 </li>
            <li>[修正] card 组件 header 属性说明，调整为 title 属性。</li>
            <li>[修复] checkbox 组件 size 属性 skin 为 default 时不生效的问题。</li>
            <li>[修复] date-picker 组件 年月选择点击 `现在` 按钮无法正确更新年份问题。</li>
            <li>[优化] checkbox 组件在 skin 为 default 时在 form-item 中的居中问题。</li>
            <li>[优化] checkbox 组件 skin 属性为默认值的样式，消除 label 与 icon 之间的间隙。</li>
            <li>[优化] carousel 组件 carousel-item 仅存在一个时，不再显示指示器。</li>
            <li>[优化] table 组件 Dom 结构，移除无效元素。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-3-0"></a>
        <li>
          <h3>2.3.0 <span class="layui-badge-rim">2023-06-12</span></h3>
          <ul>
            <li>[新增] volar 对 radio-button 与 popconfirm 组件的支持，提供编码提示。</li>
            <li>[新增] input 组件 append 插槽 disabled 参数，表示当前输入框的禁用状态。</li>
            <li>[新增] input 组件 prepend 插槽 disabled 参数，表示当前输入框的禁用状态。</li>
            <li>[修复] notice-bar 组件 textlist 为空时，控制台警告的问题。</li>
            <li>[修复] notice-bar 组件 textlist 远程加载时仅展示首个文本，滚动失效的问题。</li>
            <li>[优化] input 组件 disabled 属性启用时，禁用效果不再覆盖整个 input 输入框。</li>
            <li>[优化] tree 组件，showLine 为 false 时，尾节点的缩进宽度与其他节点不一致的问题。</li>
            <li>[优化] tree 组件，showLine 为 false 时，节点在展开与收起时，图标无区别的问题。</li>
            <li>[优化] tree 组件，showLine 为 false 时 hover 状态 border-radius 跟随 css 变量。</li>
            <li>[优化] tree 组件，移除 text-decoration: underline 标题样式。</li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.2.x">
      <ul>
        <a name="2-2-2"></a>
        <li>
          <h3>2.2.2 <span class="layui-badge-rim">2023-06-09</span></h3>
          <ul>
            <li>[修复] checkcard-group 在 demand 环境 index.css 找不到的问题。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-2-1"></a>
        <li>
          <h3>2.2.1 <span class="layui-badge-rim">2023-06-08</span></h3>
          <ul>
            <li>[新增] tree 组件 selectedKey 受控属性，用于设置选中节点。</li>
            <li>[修复] checkcard 在 demand 环境无法正式使用的问题。</li>
            <li>[修复] checkcard-group 在 demand 环境无法正式使用的问题。</li>
            <li>[优化] page 组件 showCount 属性启用时，不再显示总页码，仅显示总条数。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-2-0"></a>
        <li>
          <h3>2.2.0 <span class="layui-badge-rim">2023-06-03</span></h3>
          <ul>
            <li>[新增] table 组件 columns 配置 hide 属性，设置隐藏列，默认为 false。</li>
            <li>[新增] form 组件 label-wdith 属性，用于统一设置 form-item 标签宽度。</li>
            <li>[新增] color-picker 组件 size 属性，默认值为 md, lg sm xs 为可选值。</li>
            <li>[新增] icon-picker 组件 size 属性，默认值为 md, lg sm xs 为可选值。</li>
            <li>[新增] form 组件 size 属性，加入 input 等组件兼容，全局设置表单尺寸。</li>
            <li>[新增] form-item 组件 size 属性，默认值为 md, lg sm xs 为可选值。</li>
            <li>[优化] cascader 组件，统一 sm xs lg md 尺寸宽度皆为 220px。</li>
            <li>[优化] radio-button 组件，移除 margin-bottom: 5px 外边距。</li>
            <li>[优化] button 组件 sm 与 xs 样式规范，高度调整为 32px 与 26px。</li>
            <li>[优化] color-picker 组件样式，自定义宽度后排版不合理的问题。</li>
            <li>[优化] radio 组件 size 属性，不同值下给定不同的尺寸。</li>
            <li>[优化] select 组件 多选模式 在 form 组件方框风格下的样式问题。</li>
            <li>[优化] tree-select 组件 多选模式 在 form 组件方框风格下的样式问题。</li>
            <li>[优化] tag-input 组件在 form 组件方框风格下的样式问题。</li>
            <li>[优化] checkbox 组件在不同尺寸下 icon 与 label 的间隔问题。</li>
            <li>[优化] select 组件多选模式下复选框与文本之间的间隔过大的问题。</li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.1.x">
      <ul>
        <a name="2-1-4"></a>
        <li>
          <h3>2.1.4 <span class="layui-badge-rim">2023-06-01</span></h3>
          <ul>
            <li>[修复] select-option-group 组件按需场景无法找到 index.less 的问题。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-1-3"></a>
        <li>
          <h3>2.1.3 <span class="layui-badge-rim">2023-06-01</span></h3>
          <ul>
            <li>[修复] tab 组件 title 属性缺失响应式的问题。</li>
            <li>[修复] tab 组件 icon 属性缺失响应式的问题。</li>
            <li>[修复] tab 组件 closable 属性缺失响应式的问题。</li>
            <li>[修复] table 组件 loading 无边距的问题，加入 padding-top 与 padding-bottom 30px。</li>
            <li>[修复] build 构建时 vue-tsc 的类型检测问题。</li>
            <li>[文档] checkcard 组件 single 属性说明完善，并修正案例。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-1-2"></a>
        <li>
          <h3>2.1.2 <span class="layui-badge-rim">2023-05-31</span></h3>
          <ul>
            <li>[新增] layer 组件 title 插槽，提供标题自定义的能力。</li>
            <li>[优化] autocomplete 组件下拉面板，增加最大高度 300px 限制，内容超出滚动显示。</li>
            <li>[优化] autocomplete 组件下拉面板滚动条样式。</li>
            <li>[升级] layer-vue 1.8.8 版本。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-1-1"></a>
        <li>
          <h3>2.1.1 <span class="layui-badge-rim">2023-05-28</span></h3>
          <ul>
            <li>[修复] table 组件树表数据全部勾选后，总控复选框仍处于半选状态的问题 。</li>
            <li>[修复] table 组件树表总控复选框，无法全选二级及以上层级的数据。</li>
            <li>[修复] checkbox 组件 skin 默认样式 label 与 icon 高度不一致。</li>
            <li>[修复] tag 组件 type 属性为 primary 时，颜色为 #16baaa。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-1-0"></a>
        <li>
          <h3>2.1.0 <span class="layui-badge-rim">2023-05-18</span></h3>
          <ul>
            <li>[新增] checkcard-group 组件 single 属性，用于开启单选模式，默认为 false。</li>
            <li>[修复] tree-select 组件 data 属性响应式填充造成 input 无法回显的问题。</li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="2.0.x">
      <ul>
        <a name="2-0-5"></a>
        <li>
          <h3>2.0.5 <span class="layui-badge-rim">2023-05-22</span></h3>
          <ul>
            <li>[修复] switch 组件在 form-item 中非 pane 模式中，仍存在左边距的问题。</li>
            <li>[修复] checkbox 组件在 form-item 中非 pane 模式中，仍存在左边距的问题。</li>
            <li>[修复] rate 组件在 form-item 中非 pane 模式中，仍存在左边距的问题。</li>
            <li>[修复] radio 组件在 form-item 中非 pane 模式中，仍存在左边距的问题。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-0-4"></a>
        <li>
          <h3>2.0.4 <span class="layui-badge-rim">2023-05-21</span></h3>
          <ul>
            <li>[优化] checkcard 组件在 form-item 组件中贴边的问题。</li>
            <li>[优化] switch 组件在 form-item 组件中贴边的问题。</li>
            <li>[优化] radio 组件标签右侧内边距为 2px。</li>
            <li>[优化] radio 组件标签颜色为 #666。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-0-3"></a>
        <li>
          <h3>2.0.3 <span class="layui-badge-rim">2023-05-20</span></h3>
          <ul>
            <li>[修复] checkcard-group 组件 modelValue 属性不是响应式的问题。</li>
            <li>[修复] checkcard-group 组件 disabled 属性不生效的问题。</li>
            <li>[修复] checkcard.md 案例图片资源失效的问题。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-0-2"></a>
        <li>
          <h3>2.0.2 <span class="layui-badge-rim">2023-05-19</span></h3>
          <ul>
            <li>[修复] table 组件 checkbox 与 radio 列同时存在，getCheckData获取数据重复的问题。</li>
            <li>[修复] table 组件 getCheckData 方法无法获取树表格二级以上的数据。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-0-1"></a>
        <li>
          <h3>2.0.1 <span class="layui-badge-rim">2023-05-18</span></h3>
          <ul>
            <li>[修复] cascader 组件无法正常渲染的问题。</li>
            <li>[优化] icon-picker 组件在 form-item 的 inline 模式中，高度与其他组件不统一的问题。</li>
            <li>[优化] input-number 组件在 form-item 的 inline 模式中，高度与其他组件不统一的问题。</li>
            <li>[优化] icon-picker 组件在 form-item 中，宽度与独立使用时不一致的问题。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="2-0-0"></a>
        <li>
          <h3>2.0.0 <span class="layui-badge-rim">2023-05-18</span></h3>
          <ul>
            <li>[新增] field 组件 title 插槽，支持标题自定义。</li>
            <li>[修复] tree 组件 showCheckbox 属性启用时，title 与 checkbox 的异常间隔。</li>
            <li>[修复] icon-picker 组件，选项边角不跟随主题变量的问题。</li>
            <li>[修复] tooltip 组件，面板边角不跟随主题变量的问题。</li>
            <li>[修复] collapse 组件，面版边角不跟随主题变量的问题。</li>
            <li>[修复] slider 组件，横向模式与竖向模式下，进度条背景颜色不一致的问题。</li>
            <li>[调整] tooltip 组件 is-dark 属性默认值由 true 调整为 false。</li>
            <li>[主题] global-primary-color 变量默认值由 #009688 调整为 #16baaa。</li>
            <li>[主题] global-checked-color 变量默认值由 #5FB878 调整为 #16b777。</li>
            <li>[文档] radio-button 说明从 radio 文档剥离，独立为单独的菜单项。</li>
            <li>[文档] collapse 折叠面板文档更新，补充案例说明。</li>
            <li>[文档] form 表单文档更新，补充案例说明。</li>
            <li>[升级] layer-vue 到 1.8.5 版本。</li>
            <li>
              <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">Radio Button</h4>
              <ul>
                <li>[新增] radio-button 组件 name 属性，input 原生 name 属性。</li>
                <li>[新增] radio-button 组件 model-value 属性，用于设置当前选中值。</li>
                <li>[新增] radio-button 组件 disabled 属性，用于设置单选按钮禁用状态。</li>
                <li>[新增] radio-button 组件 label 属性与 label 插槽，用于设置单选按钮文本值。</li>
                <li>[新增] radio-button 组件 value 属性，用于设置单选按钮绑定值。</li>
                <li>[新增] radio-button 组件 size 属性，用于设置单选按钮尺寸。</li>
                <li>[新增] radio-button 组件 change 属性，值改变时触发。</li>
              </ul>
            </li>
            <li>
              <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">Checkcard</h4>
              <ul>
                <li>[新增] checkcard 组件，通过卡片的形式提供多选操作。</li>
                <li>[新增] checkcard 组件 title 属性与插槽，用于设置标题。</li>
                <li>[新增] checkcard 组件 description 属性与插槽，用于设置描述。</li>
                <li>[新增] checkcard 组件 avatar 属性与插槽，用于设置头像。</li>
                <li>[新增] checkcard 组件 defaultChecked 属性，用于设置默认选中。</li>
                <li>[新增] checkcard 组件 disabled 属性，用于设置禁用。</li>
                <li>[新增] checkcard 组件 extra 属性与插槽，用于设置扩展内容。</li>
                <li>[新增] checkcard 组件 cover 属性与插槽，用于启用图片选项。</li>
                <li>[新增] checkcard-group 组件，多选卡片组，用于配合 checkcard 使用。</li>
                <li>[新增] checkcard-group 组件 disabled 属性，开启整体禁用。</li>
                <li>[新增] checkcard-group 组件 modelValue 属性，用于设置默认选项。</li>
                <li>[新增] checkcard-group 组件 change 事件，用于监听选项变化。</li>
              </ul>
            </li>
            <li>
              <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">Form</h4>
              <ul>
                <li>[新增] form 组件 label-position 属性，设置包括的 form-item 组件 label 位置。</li>
                <li>[修复] form 组件 pane 属性启用时，label 属性缺省时仍显示占位元素的问题。</li>
                <li>[修复] form 组件 pane 属性启用时，form-item 边框角度不跟随 global-border-radius 变量的问题。</li>
                <li>[修复] form-item 组件 mode 属性为 inline 时，表单项仍以 block 的形式排布。</li>
                <li>[修复] form-item 组件 required 图标颜色不跟随 global-danger-color 变量的问题。</li>
                <li>[修复] form-item 组件中的 rate 与 switch 组件不居中的问题。</li>
                <li>[调整] form-item 组件 required 图标和标题间距，增加适当间距。 </li>
                <li>[调整] form-item 组件 mode 属性为 inline 时，宽度由 190px 调整为 220px。</li>
              </ul>
            </li>
            <li>
              <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">Tree Select</h4>
              <ul>
                <li>[新增] tree-select 组件 search 属性，启用下拉树节点搜索功能。</li>
                <li>[新增] tree-select 组件 contentStyle 属性，用于设置面板的 style 样式。</li>
                <li>[新增] tree-select 组件 contentClass 属性，用于设置面板的 class 属性。</li>
                <li>[修复] tree-select 组件 多选模式，value 在 option 中不存在时，回显 undefined 的问题。</li>
                <li>[修复] tree-select 组件 多选模式，value 在 option 中不存在时，tag 无法删除的问题。 </li>
                <li>[优化] tree-select 组件 multiple 属性为 true 时，值类型错误的异常提示信息。</li>
                <li>[优化] tree-select 组件 content 样式，增加最大高度，超出后滚动展示。</li>
              </ul>
            </li>
            <li>
              <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">Table</h4>
              <ul>
                <li>[新增] table 组件 getCheckData 方法，用于获取选中数据，而不仅仅是选中主键。</li>
                <li>[修复] table 组件 sort 字段点击排序时，其他已排序字段状态不重置的问题。</li>
                <li>[修复] table 组件 sort 字段点击排序时，sort-change 事件始终为 asc 与 desc 的问题。</li>
                <li>[修复] table 组件 height 属性的异常警告，兼容 string 类型。</li>
                <li>[修复] table 组件 筛选列 下拉面板横向布局的问题，修正为竖向布局。</li>
                <li>[优化] table 组件 body 滚动条样式，使其更贴合现今流行的审美。</li>
                <li>[优化] table 组件 筛选列 下拉面板最大高度，超出后滚动展示。</li>
                <li>[优化] table 组件 loading 图标不随 table 高度垂直居中的问题。</li>
                <li>[调整] table 组件 loading 图标尺寸与颜色。</li>
              </ul>
            </li>
            <li>
              <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">Select</h4>
              <ul>
                <li>[新增] select-option-group 组件，为 select-option 提供分组。</li>
                <li>[新增] select-option-group 组件 label 属性，用于设置 option 分组名称。</li>
                <li>[修复] select 组件 多选模式，value 在 option 中不存在时，回显 undefined 的问题。 </li>
                <li>[修复] select 组件 多选模式，value 在 option 中不存在时，tag 无法删除的问题。 </li>
                <li>[优化] select 组件 dropdown 下拉面板 scroll 样式。</li>
              </ul>
            </li>
            <li>
              <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">Date Picker</h4>
              <ul>
                <li>[修复] date-picker 组件，面板边角不跟随主题变量的问题。</li>
                <li>[修复] date-picker 组件 model-value 属性不能为 null 的问题。</li>
                <li>[修复] date-picker 组件 model-value 属性不能在 onMounted 中赋值的问题。</li>
                <li>[优化] date-picker 组件 content 滚动条 Css 样式。</li>
              </ul>
            </li>
            <li>
              <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">Popconfirm</h4>
              <ul>
                <li>[新增] popconfirm 组件 disabled 属性，用于设置禁用状态。</li>
                <li>[新增] popconfirm 组件 confirmText 属性，用于设置确认操作文本内容。</li>
                <li>[新增] popconfirm 组件 cancelText 属性，用于设置取消操作文本内容。</li>
                <li>[新增] popconfirm 组件 content 属性 / 插槽，用于定义提示内容。</li>
                <li>[新增] popconfirm 组件 btn-Align 属性，用于设置操作按钮对齐方式。</li>
                <li>[新增] popconfirm 组件 confirm 事件，用于实现确认回调逻辑。</li>
                <li>[新增] popconfirm 组件 cancel 事件，用于实现取消回调逻辑。</li>
                <li>[新增] popconfirm 组件 trigger 属性， 用于设置触发方式。</li>
                <li>[新增] popconfirm 组件 position 事件，用于设置面板的显示位置。</li>
              </ul>
            </li>
            <li>
              <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">Layer</h4>
              <ul>
                <li>[新增] layer 组件 success 回调函数 id 参数。</li>
                <li>[新增] layer 组件 end 回调函数 id 属性。</li>
                <li>[新增] layer 组件 close 回调函数 id 属性。</li>
                <li>[新增] layer 组件 moveStart 回调函数 id 属性。</li>
                <li>[新增] layer 组件 moveEnd 回调函数 id 属性。</li>
                <li>[修复] layer 组件 closeBtn 属性为 1 时，关闭按钮无法正常显示的问题。</li>
                <li>[修复] layer 组件 maxmin 属性开启时，最小化内容溢出的问题。</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="1.12.0">
      <ul>
        <a name="1-12-0"></a>
        <li>
          <h3>1.12.0 <span class="layui-badge-rim">2023-04-25</span></h3>
          <ul>
            <li>[新增] radio-button 组件，通过按钮的形式展现单选操作, 可以与 radio-group 配合。</li>
            <li>[新增] radio-button 组件 model-value 属性，用于设置当前选中值。</li>
            <li>[新增] radio-button 组件 name 属性，input 原生 name 属性。</li>
            <li>[新增] radio-button 组件 label 属性与 label 插槽，用于设置单选按钮文本值。</li>
            <li>[新增] radio-button 组件 value 属性，用于设置单选按钮绑定值。</li>
            <li>[新增] radio-button 组件 disabled 属性，用于设置单选按钮禁用状态。</li>
            <li>[新增] radio-button 组件 size 属性，用于设置单选按钮尺寸。</li>
            <li>[新增] radio-button 组件 change 属性，值改变时触发。</li>
            <li>[修复] form-item 组件 console.log 代码。 </li>
            <li>[修复] vue-tsc 检测错误，固化 vue-tsc 版本。</li>
            <li>[优化] from-item 组件 label 属性与 label 插槽不存在时，labelWidth 不再生效。</li>
            <li>[文档] radio.md 新增单选按钮的代码案例。</li>
            <li>[文档] select.md 允许清空代码案例，移除禁用状态，恢复演示。</li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="1.11.0">
      <ul>
        <a name="1-11-4"></a>
        <li>
          <h3>1.11.4 <span class="layui-badge-rim">2023-04-22</span></h3>
          <ul>
            <li>[修复] checkbox 组件 label 属性不启用时，icon 发生偏移的问题。</li>
            <li>[修复] checkbox 组件在 table cell 中默认无法居中的问题。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="1-11-3"></a>
        <li>
          <h3>1.11.3 <span class="layui-badge-rim">2023-04-19</span></h3>
          <ul>
            <li>[修复] @postcss/autoprefixer 产生的 Replace fill-available to stretch 警告。</li>
            <li>[优化] checkbox 组件 label 标签与 icon 图标不居中对齐的问题。</li>
            <li>[优化] checkbox 组件 size 属性启用时，不同尺寸下的 icon 大小。</li>
            <li>[文档] transition 组件 time 属性的类型与默认值说明。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="1-11-2"></a>
        <li>
          <h3>1.11.2 <span class="layui-badge-rim">2023-04-15</span></h3>
          <ul>
            <li>[修复] codesandbox 演示地址链接失效的问题。</li>
            <li>[修复] color-picker 组件 modelValue 属性缺少响应式的问题。</li>
            <li>[优化] color-picker 组件 eyeDropper 属性启用时的图标，由 svg 调整为内置 iconfont 图标项。</li>
            <li>[优化] input 组件 password 属性启用时的图标，由 svg 调整为内置 iconfont 图标项。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="1-11-1"></a>
        <li>
          <h3>1.11.1 <span class="layui-badge-rim">2023-04-13</span></h3>
          <ul>
            <li>[修复] icon-picker 组件 totalPage 出现小数的问题。</li>
            <li>[修复] icon-picker 组件 下一页 操作，超出最大页码后仍不禁用的问题。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="1-11-0"></a>
        <li>
          <h3>1.11.0 <span class="layui-badge-rim">2023-04-13</span></h3>
          <ul>
            <li>[新增] table 组件 sort-change 事件，在 column 排序时触发。</li>
            <li>[修复] config-provider 组件 themeVariable 属性在夜间模式下不生效的问题。</li>
            <li>[修复] tab 组件 brief 风格中标题颜色由 primary-color 调整为 checked-color 变量。</li>
            <li>[修复] page 组件 theme 属性缺省，主题色不跟随 config-provider 组件配置。</li>
            <li>[修复] date-picker 组件主题色不跟随 config-provider 组件配置。</li>
            <li>[修复] webpack 构建项目时，因为 tree-shaking 造成 index.css 丢失。</li>
            <li>[升级] icons-vue 到 1.1.0 版本。</li>
            <li>[升级] layer-vue 到 1.8.2 版本。</li>
            <li>
              <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">icons</h4>
              <ul>
                <li>[新增] icons 组件 type 属性 layui-icon-help-circle 值, HelpCircleIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-tips-fill 值, TipsFillIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-test 值, TestIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-clear 值, ClearIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-keyboard 值, KeyboardIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-backspace 值, BackspaceIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-show 值, ShowIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-hide 值, HideIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-error 值, ErrorIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-success 值, SuccessIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-question 值, QuestionIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-lock 值, LockIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-moon 值, MoonIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-github 值, GithubIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-disabled 值, DisabledIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-gitee 值, GiteeIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-eye-invisible 值, EyeInvisibleIcon 图标组件。</li>
                <li>[新增] icons 组件 type 属性 layui-icon-eye 值, EyeIcon 图标组件。</li>
              </ul>
            </li>
            <li>
              <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">layer</h4>
              <ul>
                <li>[新增] layer 组件 beforeClose 回调函数，他将在关闭前触发，你可以通过 return false 来阻止关闭。</li>
                <li>[修复] layer 组件 maxmin 属性在首次拖拽前，无法正常最小化的问题。</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="1.10.0">
      <ul>
        <a name="1-10-0"></a>
        <li>
          <h3>1.10.1 <span class="layui-badge-rim">2023-04-08</span></h3>
          <ul>
            <li>[修复] form 组件 model 属性中对象字段为 0 时，总是验证为空的问题。</li>
            <li>[修复] form-item 组件 prop 属性无法深度取值的问题。</li>
            <li>[优化] form-item 组件 prop 属性，区分深层与浅层取值的逻辑。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="1-10-0"></a>
        <li>
          <h3>1.10.0 <span class="layui-badge-rim">2023-04-06</span></h3>
          <ul>
            <li>[新增] form 组件 pane 属性，开启表单面板风格。</li>
            <li>[修复] date-picker 组件 range 启用时，因 border 属性而造成的高度不严格问题。</li>
            <li>[修复] transfer 组件处于 search 状态时，未被过滤选中的数据会被移回左侧的问题。</li>
            <li>[优化] es 产物 decode 没有被 Tree shaking, 从而造成应用构建产物体积过大的问题。</li>
            <li>[文档] button.md 页面更新 dropdown + button + button-group 实现的案例。</li>
            <li>[文档] menu.md 页面更新 indent 属性描述错误。</li>
            <li>[升级] layer-vue 到 1.8.0 版本。</li>
            <li>
              <h4 style="margin-bottom: 0px !important;font-weight: 500 !important;">layer</h4>
              <ul>
                <li>[新增] layer 组件 moveOut 属性，默认只能在窗口内拖拽，如果你想让拖到窗外，那么设定 true 即可。</li>
                <li>[新增] layer 组件 moveEnd 回调函数，默认不会触发，如果你需要，设定 moveEnd: function(){} 即可。</li>
                <li>[新增] layer 组件 moveStart 回调函数，默认不会触发，如果你需要，设定 moveStart: function(){} 即可。</li>
                <li>[优化] layer 组件 icon 属性为 1 2 3 4 5 6 7 时的图标集合。</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </lay-timeline-item>
    <lay-timeline-item title="1.9.x">
      <ul>
        <a name="1-9-8"></a>
        <li>
          <h3>1.9.8 <span class="layui-badge-rim">2023-03-30</span></h3>
          <ul>
            <li>[新增] upload 组件 onProgress 属性，上传过程回调，本质为 xhr.upload.onprogress 回调函数。</li>
            <li>[优化] table 组件 autoColsWidth 属性，支持树表的列宽计算。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="1-9-7"></a>
        <li>
          <h3>1.9.7 <span class="layui-badge-rim">2023-03-29</span></h3>
          <ul>
            <li>[新增] table 组件 autoColsWidth 属性，列宽自动计算，最大程度利用空间，默认为 false。</li>
            <li>[新增] date-picker 组件 range 属性为 true 且 type 属性为 time 的时间范围选择面板。</li>
            <li>[新增] layui-vue 安装的 options 选项 zIndex 配置，用于设置 layer 的 z-index 起始值。</li>
            <li>[修复] dropdown，select, date-picker 组件 disabled 属性，修改值报错。</li>
            <li>[修复] datepicker 组件 range 启用时，内容没有沾满实际宽度，从而导致诡异的后边距。</li>
            <li>[优化] table 组件 default-expand-all 属性，使其具备响应式的能力。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="1-9-6"></a>
        <li>
          <h3>1.9.6 <span class="layui-badge-rim">2023-03-24</span></h3>
          <ul>
            <li>[新增] volar 支持，提供 components.ts 配置文件，为 volar 的自动提示功能提供支持。</li>
            <li>[优化] sub-menu 组件 id 属性为非必填，常用于静态展示，不需要 id 属性完成联动的场景。</li>
            <li>[优化] menu-item 组件 id 属性为非必填，常用于静态展示，不需要 id 属性来完成联动的场景。</li>
            <li>[优化] table 组件 selectedKeys 与 expandKeys 属性，由 Recordable[] 修改为 string[] 类型。</li>
          </ul>
        </li>
      </ul>
      <ul>
        <a name="1-9-5"></a>
        <li>
          <h3>1.9.5 <span class="layui-badge-rim">2023-03-22</span></h3>
          <ul>
            <li>[修复] tree-select 组件 modelValue / v-model 属性为空，input 组件回显不更新的问题。</li>
            <li>[修复] autocomplete 组件 size 属性必填导致的控制台警告，调整该属性为非必填。</li>
            <li>[修复] tree-select 组件 multiple 属性启用时，v-model / modelValue 不支持 null 值的问题。</li>
            <li>[修复] select 组件 multiple 属性启用时, v-model / modelValue 不支持 null 值的问题。</li>
          </ul>
        </li>
      </ul>
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
            <li>[新增] auto-complete 组件，带提示的文本输入框，用于辅助输入。<a
                href="https:/gitee.com/layui/layui-vue/issues/I6JSOA">#I6JSOA</a></li>
            <li>[新增] page 组件 showPage 属性开启时, 显示首页直达功能，从而改善易用性。<a
                href="https://gitee.com/layui/layui-vue/issues/I69ZW6">#I69ZW6</a></li>
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
            <li>[新增] page 组件 showPage 属性开启时, 显示最后一页直达功能，从而改善易用性。<a
                href="https://gitee.com/layui/layui-vue/issues/I69ZW6">#I69ZW6</a></li>
            <li>[修复] table 组件 columns 中 type 属性为 number 的列，不会被导出的问题。<a
                href="https://gitee.com/layui/layui-vue/issues/I6KXVD">#I6KXVD</a></li>
            <li>[修复] table 组件导出功能，如果匹配不到字段不创建列结构，导致 excel 整体错位的问题。<a
                href="https://gitee.com/layui/layui-vue/issues/I6KXVD">#I6KXVD</a></li>
            <li>[修复] table 组件 columns 中包含 children 属性的 column 设置 fixed 属性不生效的问题。<a
                href="https://gitee.com/layui/layui-vue/issues/I6L4AY">#I6L4AY</a></li>
            <li>[优化] table 组件 columns 中 type 属性为 checkbox 或 radio 的列，不再被导出。<a
                href="https://gitee.com/layui/layui-vue/issues/I6KXVD">#I6KXVD</a></li>
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
</lay-timeline></template>
  
<script setup>
import { ref } from 'vue';
</script>

:::
