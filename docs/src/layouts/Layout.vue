<template>
  <lay-layout>
    <lay-header>
      <lay-logo>layui-logo</lay-logo>
    </lay-header>
    <lay-side>
      <router-link to="/zh-CN/components/layout">布局</router-link>
      <router-link to="/zh-CN/components/button">按钮</router-link>
      <router-link to="/zh-CN/components/icon">图标</router-link>
    </lay-side>
    <lay-body>
      <div style="padding: 20px">
        <router-view></router-view>
      </div>
    </lay-body>
    <lay-footer></lay-footer>
  </lay-layout>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    return {}
  },
}
</script>