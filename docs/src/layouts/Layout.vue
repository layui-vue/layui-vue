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
        <ul class="layui-menu layui-menu-lg">
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/guide">介绍</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/guide/install">安装</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/components/layout">布局</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/components/container">容器</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/components/button">按钮</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/components/icon">图标</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/components/panel">面板</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/components/card">卡片</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/components/animation">动画</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/components/grid">栅格</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/components/form">表单</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/components/badge">徽章</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/components/block">区块</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/components/line">分割</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/components/menu">菜单</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/components/progress">进度</router-link>
            </div>
          </li>
          <li>
            <div class="layui-menu-body-title">
              <router-link to="/zh-CN/components/timeline">时间</router-link>
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
export default {
  setup() {
    return {}
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
</style>