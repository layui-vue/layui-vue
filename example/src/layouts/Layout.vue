<template>
  <lay-config-provider
    :locale="locale"
    :theme="theme" 
    :themeVariable="themeVariable">
    <lay-layout class="layui-layout-document">
      <lay-header
        ><lay-logo style="box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.15)">
          <img src="../assets/logo.png" />
        </lay-logo>
        <ul
          class="layui-nav layui-layout-left"
          style="margin-top: 0px; margin-bottom: 0px"
        >
          <li class="layui-nav-item">
            <router-link to="/zh-CN/index"> 首页 </router-link>
          </li>
          <li class="layui-nav-item">
            <router-link to="/zh-CN/guide"> 指南 </router-link>
          </li>
          <li class="layui-nav-item">
            <router-link to="/zh-CN/components"> 组件 </router-link>
          </li>
          <li class="layui-nav-item">
            <router-link to="/zh-CN/ecology"> 生态 </router-link>
          </li>
          <li class="layui-nav-item">
            <lay-form>
              <lay-search :datas="menus" />
            </lay-form>
          </li>
        </ul>
        <ul
          class="layui-nav layui-layout-right"
          style="margin-top: 0px; margin-bottom: 0px"
        >
          <li class="layui-nav-item">
            <a
              href="https://layui-vue.gitee.io/layui-vue-playground"
              target="_blank"
            >
              <lay-icon type="layui-icon-util" size="15px"></lay-icon>
            </a>
          </li>
          <li class="layui-nav-item">
            <a href="https://gitee.com/layui-vue">
              <lay-icon type="layui-icon-fonts-code" size="15px"></lay-icon>
            </a>
          </li>
          <li class="layui-nav-item">
            <a href="https://gitee.com/layui-vue/layui-vue/issues">
              <lay-icon type="layui-icon-chat" size="15px"></lay-icon>
            </a>
          </li>
          <li class="layui-nav-item">
            <a href="javascript:void(0)"> 0.3.7 </a>
          </li>
        </ul>
      </lay-header>
      <router-view></router-view>
    </lay-layout>
  </lay-config-provider>
</template>
<script>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import menu from "../view/utils/menus";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const currentPath = ref("/zh-CN/guide");

    const menus = [];

    menu.forEach((m) => {
      m.children.forEach((c) => {
        menus.push(c);
      });
    });

    watch(
      () => route.path, (val) => {
        currentPath.value = val;
      },{immediate: true, deep: true}
    );

    const handleClick = function (menu) {
      router.push(menu.path);
    };

    const locale = "en_US";

    const theme = "light";

    const themeVariable = {
    }

    return {
      menus,
      theme,
      locale,
      themeVariable,
      currentPath,
      handleClick,
    };
  },
};
</script>
<style>
.layui-layout-document > .layui-header {
  z-index: 9999;
  width: 100%;
  position: fixed;
  background: #393d49;
  border-bottom: 1px solid #404553;
}

.layui-layout-document > .layui-layout > .layui-side {
  overflow-x: hidden;
  position: fixed;
  margin-top: 60px;
  height: calc(100% - 60px);
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}

.layui-layout-document > .layui-layout > .layui-body {
  margin-top: 60px;
  left: 200px;
  position: absolute;
  width: calc(100% - 200px);
  height: calc(100% - 60px);
}

.layui-logo img {
  height: 31px;
  width: 82px;
  left: 15px;
  top: 16px;
}
.layui-header > .layui-nav {
  background-color: transparent;
}
.layui-menu-docs {
  padding-top: 10px;
}
.layui-menu-docs .layui-menu-body-title .layui-font-gray {
  padding-left: 10px;
}
.layui-side hr {
  margin: 8px;
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
