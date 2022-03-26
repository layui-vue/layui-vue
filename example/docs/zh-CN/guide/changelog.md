::: title 更新记录
:::

<lay-timeline style="padding-left:30px;padding-top:30px;">
  <lay-timeline-item title="尾版本号：日常问题更新。" simple></lay-timeline-item>
  <lay-timeline-item title="次版本号：带有新特性的向下兼容的版本。" simple></lay-timeline-item>
  <lay-timeline-item title="主版本号：含有破坏性更新和新特性，不在发布周期内。" simple></lay-timeline-item>
</lay-timeline>

::: demo
<template>
<lay-timeline>
  <lay-timeline-item title="0.4.0">
    <ul> 
      <a name="0-4-3"> </a> 
      <li> 
        <h3>0.4.3 <span class="layui-badge-rim">2022-03-27</span></h3> 
        <ul>
          <li>[修复] menu 组件 level 属性不生效。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="0-4-2"> </a> 
      <li> 
        <h3>0.4.2 <span class="layui-badge-rim">2022-03-26</span></h3> 
        <ul>
          <li>[新增] card 组件 extra 插槽。</li>
          <li>[新增] switch 组件 onswitch-color 属性。</li>
          <li>[新增] switch 组件 unswitch-color 属性。</li>
          <li>[修复] docsearch peer dependencies 警告。</li>
          <li>[修复] select 组件 input border 显示问题。</li>
          <li>[优化] card 组件 header 插槽为 title 插槽。</li>
          <li>[优化] switch 组件 in-active-text 为 unswitch-text 属性, 默认不显示。</li>
          <li>[优化] switch 组件 active-text 为 onswitch-text 属性, 默认不显示。</li>
          <li>[优化] switch 组件样式。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="0-4-1"> </a> 
      <li> 
        <h3>0.4.1 <span class="layui-badge-rim">2022-03-25</span></h3> 
        <ul>
          <li>[新增] switch 组件 onswitch-icon 插槽。</li>
          <li>[新增] switch 组件 unswitch-icon 插槽。</li>
          <li>[新增] transition 组件 type 属性, 默认为 collapse 过渡。</li>
          <li>[新增] transition 组件 enable 属性, 默认为 true 启用动画。</li>
          <li>[新增] transition 组件 type 属性 fade 值, 提供淡出淡入效果。</li>
          <li>[新增] menu 组件 collapseTransition 属性, 是否启用折叠动画, 默认为 true。</li>
          <li>[新增] collapse 组件 collapseTransition 属性, 是否启用折叠动画, 默认为 true。</li>
          <li>[新增] tree 组件 collapseTransition 属性, 是否启用折叠动画, 默认为 true。</li>
          <li>[新增] input 组件 allow-clear 属性, 提供输入清空。</li>
          <li>[新增] input 组件 prefix 插槽, 提供前缀设置。</li>
          <li>[新增] input 组件 suffix 插槽, 提供后缀设置。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="0-4-0"> </a> 
      <li> 
        <h3>0.4.0 <span class="layui-badge-rim">2022-03-17</span></h3> 
        <ul>
          <li>[新增] notice-bar 通告栏。</li>
          <li>[新增] scroll 虚拟滚动组件。</li> 
          <li>[新增] transition 过渡动画组件。</li>
          <li>[新增] collapse 折叠面板过渡动画。</li>
          <li>[新增] table 表格组件 excel 导出工具栏。</li>
          <li>[新增] table column 选项 sort 属性, 开启字段排序。</li>
          <li>[新增] page 分页组件 v-model 属性, 支持默认页设置。</li>
          <li>[新增] dropdown-menu 与 dropdown-menu-item 下拉菜单组件。</li>
          <li>[新增] date-picker 日期选择组件, 支持年月, 日期, 时间。</li>
          <li>[新增] transfer 穿梭框组件 showSearch 开启搜索属性。</li>
          <li>[修复] carousel-item 轮播项使用 v-for 无法渲染。</li>
          <li>[修复] checkbox 复选框组件, 选中颜色丢失。</li>
          <li>[修复] slider 滑块组件, 默认 step 值异常。</li>
          <li>[修复] form 表单错误提示没有间距的问题。</li>
          <li>[升级] layer-vue 1.3.10 版本。</li>
        </ul> 
      </li>
    </ul>
  </lay-timeline-item>
  <lay-timeline-item title="0.3.x">
    <ul> 
      <a name="0-3-9"></a> 
      <li> 
        <h3>0.3.9 <span class="layui-badge-rim">2022-03-08</span></h3> 
        <ul> 
          <li>[重构] count-up 组件。</li>
          <li>[新增] algolia 文档搜索引擎。</li>
          <li>[新增] theme 主题 neutral 辅色配置。</li>
          <li>[新增] menuItem 与 subMenu 组件 title 与 icon 插槽。</li>
          <li>[新增] menu 菜单 collapse 属性, 支持折叠。</li>
          <li>[修复] menu 菜单 inverted 跟随主题配置。</li>
          <li>[删除] menuItem 菜单项 title 属性。</li>
          <li>[删除] subMenu 菜单集 title 属性。</li>
          <li>[升级] layer-vue 1.3.8 版本。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="0-3-8"> </a> 
      <li> 
        <h3>0.3.8 <span class="layui-badge-rim">2022-02-21</span></h3> 
        <ul> 
          <li>[新增] fullscreen 全屏组件。</li>
          <li>[新增] icon-picker 颜色选择器。</li>
          <li>[新增] config-provider 全局配置, 用于主题与国际化切换。</li>
          <li>[修复] container 容器在不同的分辨率无法自适应的问题</li>
          <li>[修复] dropdown 组件无法嵌套使用的问题。</li>
          <li>[修复] menu 组件导航模式菜单错位问题。 </li>
          <li>[修复] quote 引用的 nm 灰色主题失效。</li>
          <li>[升级] icons-vue 1.0.7 版本。</li>
          <li>[升级] layer-vue 1.3.5 版本。</li>
        </ul> 
      </li>
    </ul>
     <ul> 
      <a name="0-3-7"> </a> 
      <li> 
        <h3>0.3.7 <span class="layui-badge-rim">2022-02-07</span></h3> 
        <ul> 
          <li>[新增] slider 滑块组件 setp 属性, 支持设置步长。</li>
          <li>[新增] index.less 样式文件, 支持一定程度的主题定制。</li>
          <li>[移除] `defineProps`,`defineEmits` 两个全局宏命令引入，消除控制台警告。</li>
          <li>[修复] menu 组件 inverted 属性不兼容 string 类型。</li>
          <li>[修复] menu 组件 level 属性不兼容 string 类型。</li>
          <li>[升级] icons-vue 1.0.4 版本。</li>
          <li>[升级] layer-vue 1.3.3 版本。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="0-3-6"> </a> 
      <li> 
        <h3>0.3.6 <span class="layui-badge-rim">2022-02-02</span></h3> 
        <ul> 
          <li>[新增] result 结果组件, 提供 success error 通用状态页。</li>
          <li>[新增] exception 异常组件, 提供 403, 404, 500 通用异常页。</li>
          <li>[新增] menu 组件 level 属性, 控制菜单层级之间的背景色差异。</li>
          <li>[新增] menu 组件 inverted 属性, 提供另一种树形菜单选中效果。</li>
          <li>[新增] menu 组件 theme 属性, 可选值 light 和 dark。</li>
          <li>[修复] table 组件 header 不随 body 滚动。</li>
          <li>[升级] vue 3.2.29 版本。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="0-3-5"> </a> 
      <li> 
        <h3>0.3.5 <span class="layui-badge-rim">2022-01-24</span></h3> 
        <ul> 
          <li>[新增] split-panel 分割面板, 高度灵活的布局组件。</li>
          <li>[新增] layer 弹层 type 属性 drawer 可选值, 提供抽屉模式。</li>
          <li>[修复] tab-item 组件 closable 属性警告, 兼容 string 类型。</li>
          <li>[修复] dropdown 下拉菜单 content 显示位置问题。</li>
          <li>[升级] icons-vue 1.0.3 版本。</li>
          <li>[升级] layer-vue 1.3.1 版本。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="0-3-4"> </a> 
      <li> 
        <h3>0.3.4 <span class="layui-badge-rim">2022-01-19</span></h3> 
        <ul> 
          <li>[新增] avatar-list 头像列表组件。</li>
          <li>[新增] tab-item 选项卡组件 closable 属性, 控制当前选项卡 close 支持。</li>
          <li>[修复] button 按钮 disabled 为 true 时, 触发 click 事件。</li>
          <li>[修复] menu-item 与 sub-menu 组件的 title 属性必填警告。</li> 
          <li>[修复] layout 组件 side 因 flex 布局宽度不固定。</li>
          <li>[优化] layer 的 children slot 渲染机制。</li>
          <li>[升级] layer-vue 1.2.5 版本。</li>
          <li>[升级] vue 3.2.27 版本。</li>   
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="0-3-3"> </a> 
      <li> 
        <h3>0.3.3 <span class="layui-badge-rim">2022-01-09</span></h3> 
        <ul> 
          <li>[新增] setup 步骤条组件。</li>
          <li>[新增] slider 滑块组件 vertical 属性, 支持垂直布局。</li>
          <li>[新增] timeline-item 时间线组件 dot 插槽, 支持自定义节点内容。</li>
          <li>[新增] sub-menu 目录组件, 与 menu-item 组合使用。</li>
          <li>[修复] menu 菜单组件 layui-nav-more 切换动画。</li>
          <li>[修复] select 下拉选择组件外部参数变更组件内的数值不生效的问题</li>
          <li>[修复] page 分页组件 limit 数量过多时, 展示部分页数。</li>
          <li>[推出] layui-vue-admin 后台模板 </li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="0-3-2"> </a> 
      <li> 
        <h3>0.3.2 <span class="layui-badge-rim">2022-01-03</span></h3> 
        <ul> 
          <li>[新增] skeleton 骨架屏组件。</li>
          <li>[重构] tooltip 内部 popper 组件，支持移动到 tooltip 内部。</li>
          <li>[增强] layer 部分函数 msg open confirm 等, content 支持 VNode 类型。</li>
          <li>[增强] menu 菜单组件, 初步支持无限级嵌套。</li>
          <li>[修复] layer.close layer.closeAll 函数无法触发 OutAnim 过度动画问题。</li>
          <li>[废弃] menu-child-item 组件, 使用 menu-item 替代。</li>
          <li>[升级] layer-vue 1.2.4 版本。</li>
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="0-3-1"> </a> 
      <li> 
        <h3>0.3.1 <span class="layui-badge-rim">2021-12-28</span></h3> 
        <ul> 
          <li>[新增] count-up 数字滚动组件。</li>
          <li>[新增] slider 滑块 range 属性, 支持区间取值。</li>
          <li>[新增] button 按钮 disabled 属性, 删除 type 属性 disabled 值。</li>  
          <li>[修复] 演示站点剪贴板功能，http下不能使用的问题。</li>  
          <li>[修复] checkbox 复选框 modelValue 属性必填警告。</li>  
          <li>[修复] formItem 内下拉框组件校验不通过边框未标红问题。</li>  
          <li>[修复] rate 评分 mouseleave 事件绑定警告。</li>
          <li>[修复] npm 安装 layui-vue 不必要的依赖警告。</li>  
          <li>[集成] eslint, prettier 规范插件 。</li>  
          <li>[升级] icons-vue 1.0.2 版本。</li>  
        </ul> 
      </li>
    </ul>
  </lay-timeline-item>
  <lay-timeline-item title="0.2.x">
  <ul> 
      <a name="0-2-9"> </a> 
      <li> 
        <h3>0.2.9 <span class="layui-badge-rim">2021-12-21</span></h3> 
        <ul> 
          <li>[新增] backtop 返回顶部组件, 支持自定义功能。</li> 
          <li>[新增] slider 滑动型输入器，展示当前值和可选范围。</li> 
          <li>[新增] select 下拉选择组件 multiple 属性, 支持多选策略。</li> 
          <li>[新增] form 表单组件内置验证, 提供 rules 配置自定义验证规则。</li>
          <li>[新增] layer 组件 resize 方法, 重置 area 与 offset 状态。</li>
          <li>[修复] layer 弹层 v-model 切换状态后, 让其保持 area 与 offset 状态。</li>
          <li>[修复] transfer 穿梭框组件按钮样式, 使其增加减少操作按钮对齐。</li>
          <li>[修复] tree 树开启 checkbox 时, 无法选中的问题。</li>
          <li>[升级] layer-vue 1.2.2 版本。</li>      
        </ul> 
      </li>
    </ul>
    <ul> 
      <a name="0-2-8"> </a> 
      <li> 
        <h3>0.2.8 <span class="layui-badge-rim">2021-12-15</span></h3> 
        <ul> 
          <li>[新增] tooltip 警告提示，展现需要关注的信息。</li> 
          <li>[新增] input-number 数字输入框, 通过鼠标或键盘，输入范围内的数值。</li> 
          <li>[新增] layer 组件 isHtmlFangement 属性，函数调用时，用于解析 html 片段。</li>
          <li>[新增] layer 组件 resize 属性, 开启弹层尺寸拉伸, 常用于 页面层 与 Iframe 层。</li>
          <li>[加强] layer 组件 area 属性, 支持 字符串 与 数组 类型, 默认 auto 宽高根据内容自适应。</li>
          <li>[修复] layer 组件 body 禁用拖动, 仅支持标题拖动窗体。</li>
          <li>[修复] icon-picker 组件 select 图标时, 自动隐藏选择内容。</li>
          <li>[修复] dropdown 组件触发方式为 hover 时，移动不到菜单子项的问题</li>
          <li>[集成] utteranc.es 插件, 基于 issues 提供为文档提供留言能力。</li>
          <li>[升级] layer-vue 1.2.0, 更稳定的 layer 版本。</li>
          <li>[升级] vue 3.2.26 版本。</li>
        </ul> 
      </li>
    </ul>
  </lay-timeline-item>
  <lay-timeline-item title="0.1.x">
    <ul> 
      <a name="0-2-7"> </a> 
      <li> 
        <h3>0.1.0 <span class="layui-badge-rim">2021-12-10</span></h3> 
        <ul> 
          <li>孵化。</li>
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
