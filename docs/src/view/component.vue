<template>
      <lay-side>
    <ul class="layui-menu layui-menu-lg layui-menu-docs" style="padding: 8px">
      <li
        v-for="menu in menus"
        :key="menu"
        :class="[currentPath === menu.path ? 'layui-menu-item-checked2' : '']"
        @click="handleClick(menu)"
      >
        <div class="layui-menu-body-title">
          <router-link :to="menu.path">
            <span>{{ menu.title }}</span>
            <span class="layui-font-12 layui-font-gray">
              {{ menu.subTitle }}
            </span>
          </router-link>
        </div>
      </li>
    </ul>
  </lay-side>
  <lay-body>
    <div style="padding: 20px">
      <router-view />
    </div>
  </lay-body>
</template>
<script>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const currentPath = ref('/zh-CN/guide')

    watch(
      () => route.path,
      (val) => {
        currentPath.value = val
      },
      {
        immediate: true,
        deep: true,
      }
    )

    const menus = [
      {
        id: 4,
        title: '布局',
        subTitle: 'layout',
        path: '/zh-CN/components/layout',
      },
      {
        id: 5,
        title: '容器',
        subTitle: 'container',
        path: '/zh-CN/components/container',
      },
      {
        id: 6,
        title: '按钮',
        subTitle: 'button',
        path: '/zh-CN/components/button',
      },
      {
        id: 7,
        title: '图标',
        subTitle: 'iconfont',
        path: '/zh-CN/components/icon',
      },
      {
        id: 8,
        title: '面板',
        subTitle: 'panel',
        path: '/zh-CN/components/panel',
      },
      {
        id: 9,
        title: '卡片',
        subTitle: 'card',
        path: '/zh-CN/components/card',
      },
      {
        id: 10,
        title: '动画',
        subTitle: 'animation',
        path: '/zh-CN/components/animation',
      },
      {
        id: 11,
        title: '栅格',
        subTitle: 'grid',
        path: '/zh-CN/components/grid',
      },
      {
        id: 12,
        title: '表单',
        subTitle: 'form',
        path: '/zh-CN/components/form',
      },
      {
        id: 13,
        title: '徽章',
        subTitle: 'badge',
        path: '/zh-CN/components/badge',
      },
      {
        id: 14,
        title: '区块',
        subTitle: 'block',
        path: '/zh-CN/components/block',
      },
      {
        id: 15,
        title: '分割',
        subTitle: 'line',
        path: '/zh-CN/components/line',
      },
      {
        id: 16,
        title: '菜单',
        subTitle: 'nav',
        path: '/zh-CN/components/menu',
      },
      {
        id: 17,
        title: '面包屑',
        subTitle: 'breadcrumb',
        path: '/zh-CN/components/breadcrumb',
      },
      {
        id: 18,
        title: '进度',
        subTitle: 'progress',
        path: '/zh-CN/components/progress',
      },
      {
        id: 19,
        title: '时间线',
        subTitle: 'timeline',
        path: '/zh-CN/components/timeline',
      },
      {
        id: 20,
        title: '颜色',
        subTitle: 'color',
        path: '/zh-CN/components/color',
      },
      {
        id: 21,
        title: '手风琴',
        subTitle: 'collapse',
        path: '/zh-CN/components/collapse',
      },
      {
        id: 22,
        title: '表格',
        subTitle: 'table',
        path: '/zh-CN/components/table',
      },
      {
        id: 23,
        title: '头像',
        subTitle: 'avatar',
        path: '/zh-CN/components/avatar',
      },
      {
        id: 24,
        title: '字段',
        subTitle: 'field',
        path: '/zh-CN/components/field',
      },
      {
        id: 25,
        title: '空',
        subTitle: 'empty',
        path: '/zh-CN/components/empty',
      },
      {
        id: 26,
        title: '评分',
        subTitle: 'rate',
        path: '/zh-CN/components/rate',
      },
      {
        id: 27,
        title: '下拉菜单',
        subTitle: 'dropdown',
        path: '/zh-CN/components/dropdown',
      },
      {
        id: 28,
        title: '选项卡',
        subTitle: 'tab',
        path: '/zh-CN/components/tab',
      },
      {
        id: 29,
        title: '图标选择',
        subTitle: 'iconPicker',
        path: '/zh-CN/components/iconPicker',
      },
      {
        id: 29,
        title: '分页',
        subTitle: 'page',
        path: '/zh-CN/components/page',
      },
      {
        id: 30,
        title: '树形组件',
        subTitle: 'tree',
        path: '/zh-CN/components/tree',
      },
      {
        id: 31,
        title: '穿梭框',
        subTitle: 'transfer',
        path: '/zh-CN/components/transfer',
      },
      {
        id: 32,
        title: '复选框',
        subTitle: 'checkbox',
        path: '/zh-CN/components/checkbox',
      },
      {
        id: 33,
        title: '单选框',
        subTitle: 'radio',
        path: '/zh-CN/components/radio',
      },
      {
        id: 34,
        title: '输入框',
        subTitle: 'input',
        path: '/zh-CN/components/input',
      },
      {
        id: 35,
        title: '文本域',
        subTitle: 'textarea',
        path: '/zh-CN/components/textarea',
      },
      {
        id: 36,
        title: '开关',
        subTitle: 'switch',
        path: '/zh-CN/components/switch',
      },
      {
        id: 37,
        title: '滑块',
        subTitle: 'slider',
        path: '/zh-CN/components/slider',
      },
      {
        id: 38,
        title: '轮播',
        subTitle: 'carousel',
        path: '/zh-CN/components/carousel',
      },
      {
        id: 39,
        title: '下拉选择',
        subTitle: 'select',
        path: '/zh-CN/components/select',
      },
      {
        id: 40,
        title: '颜色选择器',
        subTitle: 'colorPicker',
        path: '/zh-CN/components/colorPicker',
      },
    ]

    const selected = ref(1)

    const handleClick = function (menu) {
      selected.value = menu.id
      router.push(menu.path)
    }

    return {
      menus,
      selected,
      currentPath,
      handleClick,
    }
  },
}
</script>