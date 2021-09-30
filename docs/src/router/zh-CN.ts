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
      {
        path: '/zh-CN/guide/install',
        component: () => import('../../docs/zh-CN/guide/install.md'),
        meta: { title: '安装' },
      },      {
        path: '/zh-CN/guide/changelog',
        component: () => import('../../docs/zh-CN/guide/changelog.md'),
        meta: { title: '更新' },
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
      }, {
        path: '/zh-CN/components/container',
        component: () => import('../../docs/zh-CN/components/container.md'),
        meta: { title: '容器' },
      },
      {
        path: '/zh-CN/components/button',
        component: () => import('../../docs/zh-CN/components/button.md'),
        meta: { title: '按钮' },
      }, {
        path: '/zh-CN/components/icon',
        component: () => import('../../docs/zh-CN/components/icon.md'),
        meta: { title: '图标' },
      }, {
        path: '/zh-CN/components/panel',
        component: () => import('../../docs/zh-CN/components/panel.md'),
        meta: { title: '面板' },
      },{
        path: '/zh-CN/components/animation',
        component: () => import('../../docs/zh-CN/components/animation.md'),
        meta: { title: '动画' },
      }, {
        path: '/zh-CN/components/card',
        component: () => import('../../docs/zh-CN/components/cards.md'),
        meta: { title: '卡片' },
      }, {
        path: '/zh-CN/components/grid',
        component: () => import('../../docs/zh-CN/components/grid.md'),
        meta: { title: '栅格' },
      }, {
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
      }
    ],
  },
]

export default zhCN
