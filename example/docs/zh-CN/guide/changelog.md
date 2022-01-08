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
  <lay-timeline-item title="0.3.x">
    <ul> 
      <a name="0-3-3"> </a> 
      <li> 
        <h3>0.3.3 <span class="layui-badge-rim">2022-01-05</span></h3> 
        <ul> 
          <li>[新增] setup 步骤条组件。</li>
          <li>[新增] slider 滑块组件 vertical 属性, 支持垂直布局。</li>
          <li>[新增] timeline-item 时间线组件 dot 插槽, 支持自定义节点内容。</li>
          <li>[新增] sub-menu 目录组件, 与 menu-item 组合使用。</li>
          <li>[修复] menu 菜单组件 layui-nav-more 切换动画。</li>
          <li>[修复] select 下拉选择组件外部参数变更组件内的数值不生效的问题</li>
          <li>[修复] page 分页组件 limit 数量过多时, 展示部分页数。</li>
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
          <li>[升级] layer-vue 1.2.4。</li>
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
          <li>[升级] icons-vue 1.0.2。</li>  
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
          <li>[升级] layer-vue 1.2.2。</li>      
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
