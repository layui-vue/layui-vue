import BaseLayout from '../layouts/Layout.vue'

const zhCN = [
  {
    path: '/',
    redirect: '/zh-CN/guide/',
    component: BaseLayout,
    meta: { title: '指南', icon: 'el-icon-position' },
    children: [
      {
        path: '/zh-CN/guide/',
        component: () => import('../../docs/zh-CN/guide/home.md'),
        meta: { title: '介绍' },
      },
    ],
  },
  {
    path: '/zh-CN/components/',
    redirect: '/zh-CN/components/button',
    component: BaseLayout,
    meta: { title: '组件', icon: 'el-icon-copy-document' },
    children: [
      {
        path: '/zh-CN/components/layout',
        component: () => import('../../docs/zh-CN/components/layout.md'),
        meta: { title: '布局' },
      },
      {
        path: '/zh-CN/components/button',
        component: () => import('../../docs/zh-CN/components/button.md'),
        meta: { title: '按钮' },
      },{
        path: '/zh-CN/components/icon',
        component: () => import('../../docs/zh-CN/components/icon.md'),
        meta: { title: '图标' },
      },{
        path: '/zh-CN/components/panel',
        component: () => import('../../docs/zh-CN/components/panel.md'),
        meta: { title: '面板' },
      },{
        path: '/zh-CN/components/card',
        component: () => import('../../docs/zh-CN/components/cards.md'),
        meta: { title: '卡片' },
      },{
        path: '/zh-CN/components/grid',
        component: () => import('../../docs/zh-CN/components/grid.md'),
        meta: { title: '栅格' },
      },{
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
      }
    ],
  },
]

export default zhCN
