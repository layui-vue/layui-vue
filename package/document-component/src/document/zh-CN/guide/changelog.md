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
  <lay-timeline-item title="1.6.x">
    <ul> 
      <a name="1-6-10"></a> 
      <li> 
        <h3>1.6.10 <span class="layui-badge-rim">2022-10-21</span></h3> 
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
          <li>[修复] page 组件 pages 属性起始页计算逻辑, 在接近尾页时 pages 数量不对应。</li>
          <li>[修复] page 组件 pages 属性, 缺少响应式特性。</li>
          <li>[删除] select 组件 show-empty 属性, 由用户自定义 select-option 代替。</li>
          <li>[删除] select 组件 empty-message 属性, 由用户自定义 select-option 代替。</li>
          <li>[删除] select 组件 placeholder, searchPlaceholder 属性默认值, 由使用者提供。</li>
          <li>[其他] date-picker, empty, page 组件支持 i18n 国际化。</li>
        </ul> 
      </li>
    </ul>
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
