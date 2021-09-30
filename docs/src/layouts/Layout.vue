<template>
  <div class="width:100%;height:300px">
    <lay-layout>
      <lay-header>
        <lay-logo>
          <img src="../assets/logo.png" />
        </lay-logo>
        <ul
          class="layui-nav layui-layout-right"
          style="margin-top: 0px; margin-bottom: 0px"
        >
          <li class="layui-nav-item">
            <a href="https://gitee.com/Jmysy/layui-vue-sample"> 案例 </a>
          </li>
          <li class="layui-nav-item">
            <a href="https://gitee.com/Jmysy/layui-vue"> 仓库 </a>
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
        <ul class="layui-menu layui-menu-lg layui-menu-docs">
          <li
            :key="menu"
            v-for="menu in menus"
            :class="[selected === menu.id ? 'layui-menu-item-checked2' : '']"
            @click="handleClick(menu)"
          >
            <div class="layui-menu-body-title">
              <router-link :to="menu.path">{{ menu.title }}</router-link>
            </div>
          </li>
        </ul>
      </lay-side>
      <lay-body>
        <div style="padding: 20px">
          <router-view></router-view>
        </div>
      </lay-body>
      <lay-footer></lay-footer>
    </lay-layout>
  </div>
</template>
<script>
import { ref } from 'vue'
import {  useRouter } from 'vue-router'
export default {
  setup() {

    const router = useRouter()
    const menus = [
      { id: 1, title: '介绍', path: '/zh-CN/guide' },
      { id: 2, title: '安装', path: '/zh-CN/guide/install' },
      { id: 3, title: '布局', path: '/zh-CN/components/layout' },
      { id: 4, title: '容器', path: '/zh-CN/components/container' },
      { id: 5, title: '按钮', path: '/zh-CN/components/button' },
      { id: 6, title: '图标', path: '/zh-CN/components/icon' },
      { id: 7, title: '面板', path: '/zh-CN/components/panel' },
      { id: 8, title: '卡片', path: '/zh-CN/components/card' },
      { id: 9, title: '动画', path: '/zh-CN/components/animation' },
      { id: 10, title: '栅格', path: '/zh-CN/components/grid' },
      { id: 11, title: '表单', path: '/zh-CN/components/form' },
      { id: 12, title: '徽章', path: '/zh-CN/components/badge' },
      { id: 13, title: '区块', path: '/zh-CN/components/block' },
      { id: 14, title: '分割', path: '/zh-CN/components/line' },
      { id: 15, title: '菜单', path: '/zh-CN/components/menu' },
      { id: 16, title: '进度', path: '/zh-CN/components/progress' },
      { id: 17, title: '时间', path: '/zh-CN/components/timeline' },
    ]

    const selected = ref(1)

    const handleClick = function (menu) {
      selected.value = menu.id
      router.push(menu.path)
    }

    return {
      menus,
      selected,
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
</style>