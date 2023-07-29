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
                        <li>[优化] tree 组件，移除  text-decoration: underline 标题样式。</li>
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
    </lay-timeline>
</template>

<script setup>
import { ref } from 'vue';
</script>

:::
