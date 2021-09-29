<template>
  <div class="width:100%;height:300px">
    <lay-layout>
      <lay-header>
        <lay-logo>
          <img src="../assets/logo.png">
        </lay-logo>
      </lay-header>
      <lay-side>
        <ul class="layui-menu layui-menu-lg">
          <li><router-link to="/zh-CN/components/layout">布局</router-link></li>
          <li><router-link to="/zh-CN/components/container">容器</router-link></li>
          <li><router-link to="/zh-CN/components/button">按钮</router-link></li>
          <li><router-link to="/zh-CN/components/icon">图标</router-link></li>
          <li><router-link to="/zh-CN/components/panel">面板</router-link></li>
          <li><router-link to="/zh-CN/components/card">卡片</router-link></li>
          <li><router-link to="/zh-CN/components/grid">栅格</router-link></li>
          <li><router-link to="/zh-CN/components/form">表单</router-link></li>
          <li><router-link to="/zh-CN/components/badge">徽章</router-link></li>
          <li><router-link to="/zh-CN/components/block">区块</router-link></li>
          <li><router-link to="/zh-CN/components/line">分割</router-link></li>
          <li><router-link to="/zh-CN/components/progress">进度</router-link></li>
          <li><router-link to="/zh-CN/components/timeline">时间</router-link></li>
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