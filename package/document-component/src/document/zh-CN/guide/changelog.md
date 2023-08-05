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
    <lay-timeline-item title="2.3.x">
      <ul>
        <a name="2-3-10"></a>
        <li>
          <h3>2.3.10 <span class="layui-badge-rim">2023-08-04</span></h3>
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
