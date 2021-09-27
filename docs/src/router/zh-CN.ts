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
      }
    ],
  },
]

export default zhCN
