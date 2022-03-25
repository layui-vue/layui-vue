<template>
  <lay-config-provider
    :theme="theme"
    :locale="locale"
    :locales="locales"
    :themeVariable="themeVariable"
  >
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
            <router-link to="/zh-CN/index"> {{ t("nav.home") }} </router-link>
          </li>
          <li class="layui-nav-item">
            <router-link to="/zh-CN/guide"> {{ t("nav.guide") }} </router-link>
          </li>
          <li class="layui-nav-item">
            <router-link to="/zh-CN/components">
              {{ t("nav.components") }}
            </router-link>
          </li>
          <li class="layui-nav-item">
            <router-link to="/zh-CN/resources">
              {{ t("nav.resources") }}
            </router-link>
          </li>
          <li class="layui-nav-item">
            <router-link to="/zh-CN/material">
              {{ t("nav.material") }}
            </router-link>
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
            <lay-dropdown>
              <a href="javascript:void(0);">
                <lay-icon
                  size="15px"
                  type="layui-icon-theme"
                  style="
                    color: rgba(255, 255, 255, 0.7);
                    padding-left: 30px;
                    padding-right: 30px;
                  "
                ></lay-icon>
              </a>
              <template #content>
                <div style="width: 380px; padding: 0px 10px 10px 10px">
                  <lay-color-picker
                    v-model="themeVariable['--global-primary-color']"
                  ></lay-color-picker
                  >&nbsp;
                  <lay-color-picker
                    v-model="themeVariable['--global-normal-color']"
                  ></lay-color-picker
                  >&nbsp;
                  <lay-color-picker
                    v-model="themeVariable['--global-warm-color']"
                  ></lay-color-picker
                  >&nbsp;
                  <lay-color-picker
                    v-model="themeVariable['--global-danger-color']"
                  ></lay-color-picker
                  >&nbsp;
                  <lay-color-picker
                    v-model="themeVariable['--global-checked-color']"
                  ></lay-color-picker
                  >&nbsp;
                  <lay-input
                    v-model="themeVariable['--global-border-radius']"
                    style="display: inline-block; width: 130px"
                  ></lay-input>
                  <lay-color-picker
                    v-model="themeVariable['--global-neutral-color-1']"
                  ></lay-color-picker
                  >&nbsp;
                  <lay-color-picker
                    v-model="themeVariable['--global-neutral-color-2']"
                  ></lay-color-picker
                  >&nbsp;
                  <lay-color-picker
                    v-model="themeVariable['--global-neutral-color-3']"
                  ></lay-color-picker
                  >&nbsp;
                  <lay-color-picker
                    v-model="themeVariable['--global-neutral-color-4']"
                  ></lay-color-picker
                  >&nbsp;
                  <lay-color-picker
                    v-model="themeVariable['--global-neutral-color-5']"
                  ></lay-color-picker
                  >&nbsp;
                  <lay-color-picker
                    v-model="themeVariable['--global-neutral-color-6']"
                  ></lay-color-picker
                  >&nbsp;
                  <lay-color-picker
                    v-model="themeVariable['--global-neutral-color-7']"
                  ></lay-color-picker
                  >&nbsp;
                  <lay-color-picker
                    v-model="themeVariable['--global-neutral-color-8']"
                  ></lay-color-picker>
                  <lay-button fluid>导 出 配 置</lay-button>
                </div>
              </template>
            </lay-dropdown>
          </li>
          <li class="layui-nav-item">
            <a href="https://gitee.com/layui-vue/layui-vue">
              <lay-icon type="layui-icon-fonts-code" size="15px"></lay-icon>
            </a>
          </li>
          <li class="layui-nav-item">
            <a href="javascript:void(0)">
              <lay-badge
                type="rim"
                class="layui-local-badge"
                v-if="locale === 'en_US'"
                @click="changeLocale('zh_CN')"
                >中 文</lay-badge
              >
              <lay-badge
                type="rim"
                class="layui-local-badge"
                v-else
                @click="changeLocale('en_US')"
                >英 文</lay-badge
              >
            </a>
          </li>
          <li class="layui-nav-item">
            <a href="https://gitee.com/layui-vue/layui-vue/issues">
              <lay-icon type="layui-icon-chat" size="15px"></lay-icon>
            </a>
          </li>
          <li class="layui-nav-item">
            <a href="javascript:void(0)"> 0.4.1 </a>
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
import { useI18n } from "vue-i18n";
import zh_CN from "../locales/zh_CN.ts";
import en_US from "../locales/en_US.ts";

export default {
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const locale = ref("zh_CN");
    const currentPath = ref("/zh-CN/guide");
    const locales = [
      { name: "zh_CN", locale: zh_CN, merge: true },
      { name: "en_US", locale: en_US, merge: true },
    ];
    const theme = "light";
    const themeVariable = ref({
      "--global-primary-color": "#009688",
      "--global-normal-color": "#1e9fff",
      "--global-warm-color": "#ffb800",
      "--global-danger-color": "#ff5722",
      "--global-checked-color": "#5fb878",
      "--global-border-radius": "2px",
      "--global-neutral-color-1": "#FAFAFA",
      "--global-neutral-color-2": "#F6F6F6",
      "--global-neutral-color-3": "#eeeeee",
      "--global-neutral-color-4": "#e2e2e2",
      "--global-neutral-color-5": "#dddddd",
      "--global-neutral-color-6": "#d2d2d2",
      "--global-neutral-color-7": "#cccccc",
      "--global-neutral-color-8": "#c2c2c2",
    });

    const menus = [];

    menu.forEach((m) => {
      m.children.forEach((c) => {
        menus.push(c);
      });
    });

    watch(
      () => route.path,
      (val) => {
        currentPath.value = val;
      },
      { immediate: true, deep: true }
    );

    const handleClick = function (menu) {
      router.push(menu.path);
    };

    const changeLocale = function (lang) {
      locale.value = lang;
    };

    return {
      t,
      menus,
      theme,
      locale,
      locales,
      currentPath,
      handleClick,
      changeLocale,
      themeVariable,
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
  color: rgba(255, 255, 255, 0.7);
  border-color: rgba(255, 255, 255, 0.7);
}

.layui-header > .layui-local:hover {
  color: white;
  border-color: white;
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
