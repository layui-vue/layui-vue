<template>
  <div class="width:100%;height:300px">
    <lay-layout>
      <lay-header style="background: #393d49">
        <lay-logo>
          <img src="../assets/logo.png" />
        </lay-logo>
        <ul
          class="layui-nav layui-layout-left"
          style="margin-top: 10px; margin-bottom: 0px"
        >
          <lay-form>
            <lay-search :datas="menus" />
          </lay-form>
        </ul>
        <ul
          class="layui-nav layui-layout-right"
          style="margin-top: 0px; margin-bottom: 0px"
        >
          <li class="layui-nav-item">
            <a href="https://gitee.com/layui-vue/layui-vue-sample"> 案例 </a>
          </li>
          <li class="layui-nav-item">
            <a href="https://gitee.com/layui-vue/layui-vue"> 仓库 </a>
          </li>
          <li class="layui-nav-item">
            <a
              href="https://gitee.com/Jmysy/layui-vue/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=Jmysy%2Flayui-vue&project_type=&scope=&sort=&state=all&target_project="
            >
              反馈
            </a>
          </li>
        </ul>
      </lay-header>
      <lay-side>
        <ul
          class="layui-menu layui-menu-lg layui-menu-docs"
          style="padding: 6px"
        >
          <li
            v-for="menu in menus"
            :key="menu"
            :class="[
              currentPath === menu.path ? 'layui-menu-item-checked2' : '',
            ]"
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
    </lay-layout>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const currentPath = ref('hahaha')

    watch(
      () => route.path,
      (newValue, oldValue) => {
        currentPath.value = route.path
      }
    )

    const menus = [
      {
        id: 1,
        title: '介绍',
        subTitle: 'Getting Started',
        path: '/zh-CN/guide',
      },
      {
        id: 2,
        title: '安装',
        subTitle: 'install',
        path: '/zh-CN/guide/install',
      },
      {
        id: 3,
        title: '更新',
        subTitle: 'changelog',
        path: '/zh-CN/guide/changelog',
      },
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
<style>
.layui-logo img {
  height: 31px;
  width: 82px;
  left: 15px;
  top: 16px;
}
.layui-menu-docs {
  padding-top: 10px;
}
.layui-menu-docs .layui-menu-body-title .layui-font-gray {
  padding-left: 10px;
}

@media screen and (max-width: 768px) {
  .layui-side {
    width: 0px !important;
  }
  .layui-body {
    left: 0px !important;
    width: 100% !important;
  }
  .layui-logo {
    display: none !important;
  }
  .layui-layout-left {
    left: 0px !important;
  }
}
</style>
