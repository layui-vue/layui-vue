import BaseLayout from '../layouts/Layout.vue'
import Component from '../view/component.vue'
import Hooks from '../view/hooks.vue'
import Guide from '../view/guide.vue'
import Index from '../view/index.vue'

const zhCN = [
  {
    path: '/',
    redirect: '/zh-CN/index',
    component: BaseLayout,
    meta: { title: '首页' },
    children: [
      {
        path: '/zh-CN/index',
        component: Index,
        meta: { title: '指南' },
      },
      {
        path: '/zh-CN/guide',
        redirect: '/zh-CN/guide/introduce',
        component: Guide,
        meta: { title: '指南' },
        children: [
          {
            path: '/zh-CN/guide/introduce',
            component: () => import('../../docs/zh-CN/guide/introduce.md'),
            meta: { title: '介绍' },
          },
          {
            path: '/zh-CN/guide/getStarted',
            component: () => import('../../docs/zh-CN/guide/getStarted.md'),
            meta: { title: '安装' },
          },
          {
            path: '/zh-CN/guide/changelog',
            component: () => import('../../docs/zh-CN/guide/changelog.md'),
            meta: { title: '更新' },
          },
          {
            path: '/zh-CN/guide/problem',
            component: () => import('../../docs/zh-CN/guide/problem.md'),
            meta: { title: '问题' },
          },
          {
            path: '/zh-CN/guide/contribution',
            component: () => import('../../docs/zh-CN/guide/contribution.md'),
            meta: { title: '贡献' },
          },
          {
            path: '/zh-CN/guide/norms',
            component: () => import('../../docs/zh-CN/guide/norms.md'),
            meta: { title: '规范' },
          },
          {
            path: '/zh-CN/guide/sandbox',
            component: () => import('../../docs/zh-CN/guide/sandbox.md'),
            meta: { title: '沙盒' },
          },
        ],
      },
      {
        path: '/zh-CN/components',
        redirect: '/zh-CN/components/color',
        component: Component,
        meta: { title: '组件' },
        children: [
          {
            path: '/zh-CN/components/layout',
            component: () => import('../../docs/zh-CN/components/layout.md'),
            meta: { title: '布局' },
          },
          {
            path: '/zh-CN/components/color',
            component: () => import('../../docs/zh-CN/components/color.md'),
            meta: { title: '颜色' },
          },
          {
            path: '/zh-CN/components/container',
            component: () => import('../../docs/zh-CN/components/container.md'),
            meta: { title: '容器' },
          },
          {
            path: '/zh-CN/components/breadcrumb',
            component: () =>
              import('../../docs/zh-CN/components/breadcrumb.md'),
            meta: { title: '面包屑' },
          },
          {
            path: '/zh-CN/components/button',
            component: () => import('../../docs/zh-CN/components/button.md'),
            meta: { title: '按钮' },
          },
          {
            path: '/zh-CN/components/icon',
            component: () => import('../../docs/zh-CN/components/icon.md'),
            meta: { title: '图标' },
          },
          {
            path: '/zh-CN/components/panel',
            component: () => import('../../docs/zh-CN/components/panel.md'),
            meta: { title: '面板' },
          },
          {
            path: '/zh-CN/components/animation',
            component: () => import('../../docs/zh-CN/components/animation.md'),
            meta: { title: '动画' },
          },
          {
            path: '/zh-CN/components/card',
            component: () => import('../../docs/zh-CN/components/card.md'),
            meta: { title: '卡片' },
          },
          {
            path: '/zh-CN/components/grid',
            component: () => import('../../docs/zh-CN/components/grid.md'),
            meta: { title: '栅格' },
          },
          {
            path: '/zh-CN/components/form',
            component: () => import('../../docs/zh-CN/components/form.md'),
            meta: { title: '表单' },
          },
          {
            path: '/zh-CN/components/badge',
            component: () => import('../../docs/zh-CN/components/badge.md'),
            meta: { title: '徽章' },
          },
          {
            path: '/zh-CN/components/block',
            component: () => import('../../docs/zh-CN/components/block.md'),
            meta: { title: '辅助' },
          },
          {
            path: '/zh-CN/components/line',
            component: () => import('../../docs/zh-CN/components/line.md'),
            meta: { title: '分割' },
          },
          {
            path: '/zh-CN/components/progress',
            component: () => import('../../docs/zh-CN/components/progress.md'),
            meta: { title: '进度' },
          },
          {
            path: '/zh-CN/components/menu',
            component: () => import('../../docs/zh-CN/components/menu.md'),
            meta: { title: '菜单' },
          },
          {
            path: '/zh-CN/components/timeline',
            component: () => import('../../docs/zh-CN/components/timeline.md'),
            meta: { title: '时间线' },
          },
          {
            path: '/zh-CN/components/collapse',
            component: () => import('../../docs/zh-CN/components/collapse.md'),
            meta: { title: '手风琴' },
          },
          {
            path: '/zh-CN/components/table',
            component: () => import('../../docs/zh-CN/components/table.md'),
            meta: { title: '表格' },
          },
          {
            path: '/zh-CN/components/avatar',
            component: () => import('../../docs/zh-CN/components/avatar.md'),
            meta: { title: '头像' },
          },
          {
            path: '/zh-CN/components/field',
            component: () => import('../../docs/zh-CN/components/field.md'),
            meta: { title: '字段' },
          },
          {
            path: '/zh-CN/components/empty',
            component: () => import('../../docs/zh-CN/components/empty.md'),
            meta: { title: '空' },
          },
          {
            path: '/zh-CN/components/rate',
            component: () => import('../../docs/zh-CN/components/rate.md'),
            meta: { title: '评分' },
          },
          {
            path: '/zh-CN/components/dropdown',
            component: () => import('../../docs/zh-CN/components/dropdown.md'),
            meta: { title: '下拉' },
          },
          {
            path: '/zh-CN/components/tab',
            component: () => import('../../docs/zh-CN/components/tab.md'),
            meta: { title: '选项卡' },
          },
          {
            path: '/zh-CN/components/iconPicker',
            component: () =>
              import('../../docs/zh-CN/components/iconPicker.md'),
            meta: { title: '图标选择' },
          },
          {
            path: '/zh-CN/components/tree',
            component: () => import('../../docs/zh-CN/components/tree.md'),
            meta: { title: '树形组件' },
          },
          {
            path: '/zh-CN/components/page',
            component: () => import('../../docs/zh-CN/components/page.md'),
            meta: { title: '分页' },
          },
          {
            path: '/zh-CN/components/transfer',
            component: () => import('../../docs/zh-CN/components/transfer.md'),
            meta: { title: '穿梭框' },
          },
          {
            path: '/zh-CN/components/checkbox',
            component: () => import('../../docs/zh-CN/components/checkbox.md'),
            meta: { title: '复选框' },
          },
          {
            path: '/zh-CN/components/radio',
            component: () => import('../../docs/zh-CN/components/radio.md'),
            meta: { title: '单选框' },
          },
          {
            path: '/zh-CN/components/input',
            component: () => import('../../docs/zh-CN/components/input.md'),
            meta: { title: '输入框' },
          },
          {
            path: '/zh-CN/components/textarea',
            component: () => import('../../docs/zh-CN/components/textarea.md'),
            meta: { title: '文本域' },
          },
          {
            path: '/zh-CN/components/switch',
            component: () => import('../../docs/zh-CN/components/switch.md'),
            meta: { title: '开关' },
          },
          {
            path: '/zh-CN/components/slider',
            component: () => import('../../docs/zh-CN/components/slider.md'),
            meta: { title: '滑块' },
          },
          {
            path: '/zh-CN/components/carousel',
            component: () => import('../../docs/zh-CN/components/carousel.md'),
            meta: { title: '轮播' },
          },
          {
            path: '/zh-CN/components/select',
            component: () => import('../../docs/zh-CN/components/select.md'),
            meta: { title: '下拉选择' },
          },
          {
            path: '/zh-CN/components/colorPicker',
            component: () =>
              import('../../docs/zh-CN/components/colorPicker.md'),
            meta: { title: '颜色选择器' },
          },
          {
            path: '/zh-CN/components/modal',
            component: () => import('../../docs/zh-CN/components/modal.md'),
            meta: { title: '弹层' },
          },{
            path: '/zh-CN/components/load',
            component: () => import('../../docs/zh-CN/components/load.md'),
            meta: { title: '加载' },
          },
        ],
      },
      {
        path: '/zh-CN/hooks',
        redirect: '/zh-CN/hooks/useClickOutside',
        component: Hooks,
        meta: { title: 'hooks' },
        children: [
          {
            path: '/zh-CN/hooks/useStarted',
            component: () =>
              import('../../docs/zh-CN/hooks/useStarted.md'),
            meta: { title: 'useStarted' },
          },
          {
            path: '/zh-CN/hooks/useClickOutside',
            component: () =>
              import('../../docs/zh-CN/hooks/useClickOutside.md'),
            meta: { title: 'useClickOutside' },
          },
          {
            path: '/zh-CN/hooks/useFullScreen',
            component: () => import('../../docs/zh-CN/hooks/useFullScreen.md'),
            meta: { title: 'useFullScreen' },
          },
          {
            path: '/zh-CN/hooks/useMove',
            component: () => import('../../docs/zh-CN/hooks/useMove.md'),
            meta: { title: 'useMove' },
          },          {
            path: '/zh-CN/hooks/useState',
            component: () => import('../../docs/zh-CN/hooks/useState.md'),
            meta: { title: 'useState' },
          },
          {
            path: '/zh-CN/hooks/useBoolean',
            component: () => import('../../docs/zh-CN/hooks/useBoolean.md'),
            meta: { title: 'useBoolean' },
          },
        ],
      },
    ],
  },
]

export default zhCN
