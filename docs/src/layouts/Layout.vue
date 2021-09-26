<template>
  <lay-layout>
    <lay-header>
      <lay-logo>
        layui-vue
      </lay-logo>
    </lay-header>
    <lay-side>
      <ul>
        <li><router-link to="/zh-CN/components/layout">布局</router-link></li>
        <li><router-link to="/zh-CN/components/button">按钮</router-link></li>
        <li><router-link to="/zh-CN/components/icon">图标</router-link></li>
        <li><router-link to="/zh-CN/components/panel">面板</router-link></li>
      </ul>
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