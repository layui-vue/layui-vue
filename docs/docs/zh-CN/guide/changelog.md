::: demo

<template>
    <lay-timeline>
        <lay-timeline-item title="0.1.0">
          [新增] tree 树，支持 node-click，selectKeys 等<br>
          [新增] table 表格，提供 columns datasource page 分页<br>
          [新增] transfer 穿梭框，提供 双列表数据切换<br>
          [新增] textarea 文本域 input 事件 与 disabled 禁用属性<br>
          [新增] button 按钮 disabled 禁用属性<br>
          [新增] input 输入框 disabled 禁用属性<br>
          [新增] checkbox 复选框 disabled 禁用属性<br>
          [新增] icon 图标 prefix 属性，支持自定义 iconfont 引入使用<br>
          [修改] card 卡片 slot 判断逻辑，body 不存在时，使用 default slot<br>
          [修改] field 字段逻辑，当 slot 为空时，展现为线状，否则为面板<br>
          [修复] collapse 手风琴，展开 收起 状态时的不同图标展示<br>
          [重构] checkbox 复选框逻辑，让 api 更合理<br>
          [依赖] 升级 vue 3.2.20 依赖<br>
        </lay-timeline-item>
        <lay-timeline-item title="0.0.17">
          [新增] table 表格组件<br>
          [新增] tab 选项卡组件<br>
          [新增] rate 评分组件<br>
          [新增] button 组件 border 属性，设置边框颜色<br>
          [新增] iconPicker 组件 showSearch 配置, 是否启用搜索<br>
          [新增] page 分页组件<br>
          [修复] menu 组件，菜单项 与 目录 重复渲染<br>
          [支持] 完善 layui-vue-sample 案例<br>
          [支持] 文档支持模糊查询, 用于快速检索组件文档<br>
          [支持] 文档移动端预览<br>
        </lay-timeline-item>
        <lay-timeline-item title="0.0.14">
          [新增] menu 菜单组件<br>
          [新增] iconPicker 图标选择组件<br>
          [新增] anim 动画文档<br>
          [新增] dropdown 下拉菜单组件<br>
          [新增] color 颜色文档<br>
          [新增] collapse 手风琴组件<br>
          [新增] select 下拉选择组件<br>
          [新增] empty 空数据组件<br>
          [新增] scroll 滚动容器组件<br>
          [新增] avatar 头像组件<br>
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
