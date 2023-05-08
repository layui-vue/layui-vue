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
        <lay-timeline-item title="2.0.0">
            <ul>
                <a name="2-0-0"></a>
                <li>
                    <h3>2.0.0 <span class="layui-badge-rim">2023-05-07</span></h3>
                    <ul>
                        <li>[新增] field 组件 title 插槽，支持标题自定义。</li>
                        <li>[修复] layer 组件 maxmin 属性开启时，最小化内容溢出的问题。</li>
                        <li>[修复] tree 组件 showCheckbox 属性启用时，title 与 checkbox 的异常间隔。</li>
                        <li>[修复] icon-picker 组件，选项边角不跟随主题变量的问题。</li>
                        <li>[修复] tooltip 组件，面板边角不跟随主题变量的问题。</li>
                        <li>[修复] collapse 组件，面版边角不跟随主题变量的问题。</li>
                        <li>[修复] date-picker 组件，面板边角不跟随主题变量的问题。</li>
                        <li>[修复] slider 组件，横向模式与竖向模式下，进度条背景颜色不一致的问题。</li>
                        <li>[主题] global-primary-color 变量默认值由 #009688 调整为 #16baaa。</li>
                        <li>[主题] global-checked-color 变量默认值由 #5FB878 调整为 #16b777。</li>
                        <li>[文档] radio-button 说明从 radio 文档剥离，独立为单独的菜单项。</li>
                        <li>[文档] collapse 折叠面板文档更新，补充案例说明。</li>
                        <li>[文档] form 表单文档更新，补充案例说明。</li>
                        <li>[升级] layer-vue 到 1.8.4 版本。</li>
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
                                <li>[修复] table 组件 筛选列 下拉面板横向布局的问题，修正为竖向布局。</li>
                                <li>[优化] table 组件 body 滚动条样式，使其更贴合现今流行的审美。</li>
                                <li>[优化] table 组件 筛选列 下拉面板最大高度，超出后滚动展示。</li>
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
