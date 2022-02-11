<template>
  <lay-config-provider
    :locale="locale"
    :theme="theme" 
    :locales="locales"
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
            <router-link to="/zh-CN/index"> {{ t('nav.home')}} </router-link>
          </li>
          <li class="layui-nav-item">
            <router-link to="/zh-CN/guide"> {{ t('nav.guide')}} </router-link>
          </li>
          <li class="layui-nav-item">
            <router-link to="/zh-CN/components"> {{ t('nav.components') }} </router-link>
          </li>
          <li class="layui-nav-item">
            <router-link to="/zh-CN/environment"> {{ t('nav.environment') }} </router-link>
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
            <a href="javascript:void(0)"> 
              <lay-badge type="rim" class="layui-local-badge" v-if="locale === 'en_US'" @click="changeLocale('zh_CN')">中 文</lay-badge>
              <lay-badge type="rim" class="layui-local-badge" v-else @click="changeLocale('en_US')">英 文</lay-badge>    
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
import { useI18n } from 'vue-i18n';
import zh_CN from "../locales/zh_CN.ts";
import en_US from "../locales/en_US.ts";
export default {
  setup() {

    const { t } = useI18n(); 

    const route = useRoute();
    const router = useRouter();
    const currentPath = ref("/zh-CN/guide");
    // 当前语言
    const locale = ref('zh_CN');
    // 扩展语言包
    const locales = [
      {name:'zh_CN',locale: zh_CN, merge: true},
      {name:'en_US',locale: en_US, merge: true}
    ]
    // 当前主题
    const theme = "light";
    // 主题变量
    const themeVariable = {

    }

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

    const changeLocale = function(lang) {
      locale.value = lang;
    }

    return {
      t,
      menus,
      theme,
      locale,
      locales,
      themeVariable,
      currentPath,
      handleClick,
      changeLocale,
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

.layui-header .layui-local-badge {
  font-size: 12.4px;
  background: transparent;
  color:rgba(255, 255, 255, 0.7);
  border-color:rgba(255, 255, 255, 0.7);
}

.layui-header > .layui-local:hover {
  color:white;
  border-color:white;
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
