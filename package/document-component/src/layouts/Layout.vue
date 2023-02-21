<template>
  <lay-config-provider
    :locale="locale"
    :locales="locales"
    :theme="appStore.theme"
    :themeVariable="appStore.themeVariable"
  >
    <lay-layout class="layui-layout-document" style="height: 100%">
      <lay-header>
        <lay-logo>
          <img src="../assets/logo-png.png" />
          <span class="title">layui - vue</span>
        </lay-logo>
        <ul
          class="layui-nav layui-layout-left"
          style="margin-top: 0px; margin-bottom: 0px"
        >
          <li
            class="layui-nav-item"
            :class="{ 'layui-active': currentPath.includes('/zh-CN/index') }"
          >
            <router-link to="/zh-CN/index"> {{ t("nav.home") }} </router-link>
          </li>
          <li
            class="layui-nav-item"
            :class="{ 'layui-active': currentPath.includes('/zh-CN/guide') }"
          >
            <router-link to="/zh-CN/guide"> {{ t("nav.guide") }} </router-link>
          </li>
          <li
            class="layui-nav-item"
            :class="{
              'layui-active': currentPath.includes('/zh-CN/components'),
            }"
          >
            <router-link to="/zh-CN/components">
              {{ t("nav.components") }}
            </router-link>
          </li>
          <li
            class="layui-nav-item"
            :class="{
              'layui-active': currentPath.includes('/zh-CN/resources'),
            }"
          >
            <router-link to="/zh-CN/resources">
              {{ t("nav.resources") }}
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
                <lay-icon size="15px" type="layui-icon-theme"> </lay-icon>
              </a>
              <template #content>
                <div class="theme-panel">
                  <lay-color-picker
                    v-model="appStore.themeVariable['--global-primary-color']"
                  ></lay-color-picker>
                  <lay-color-picker
                    v-model="appStore.themeVariable['--global-normal-color']"
                  ></lay-color-picker>
                  <lay-color-picker
                    v-model="appStore.themeVariable['--global-warm-color']"
                  ></lay-color-picker>
                  <lay-color-picker
                    v-model="appStore.themeVariable['--global-danger-color']"
                  ></lay-color-picker>
                  <lay-color-picker
                    v-model="appStore.themeVariable['--global-checked-color']"
                  ></lay-color-picker>
                  <lay-input
                    v-model="appStore.themeVariable['--global-border-radius']"
                    style="display: inline-block; width: 130px"
                  ></lay-input>
                  <lay-color-picker
                    v-model="appStore.themeVariable['--global-neutral-color-1']"
                  ></lay-color-picker>
                  <lay-color-picker
                    v-model="appStore.themeVariable['--global-neutral-color-2']"
                  ></lay-color-picker>
                  <lay-color-picker
                    v-model="appStore.themeVariable['--global-neutral-color-3']"
                  ></lay-color-picker>
                  <lay-color-picker
                    v-model="appStore.themeVariable['--global-neutral-color-4']"
                  ></lay-color-picker>
                  <lay-color-picker
                    v-model="appStore.themeVariable['--global-neutral-color-5']"
                  ></lay-color-picker>
                  <lay-color-picker
                    v-model="appStore.themeVariable['--global-neutral-color-6']"
                  ></lay-color-picker>
                  <lay-color-picker
                    v-model="appStore.themeVariable['--global-neutral-color-7']"
                  ></lay-color-picker>
                  <lay-color-picker
                    v-model="appStore.themeVariable['--global-neutral-color-8']"
                  ></lay-color-picker>
                  <lay-button
                    :fluid="true"
                    border="green"
                    border-style="dashed"
                    @click="resetThemeVariable"
                    >重置配置</lay-button
                  >
                </div>
              </template>
            </lay-dropdown>
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
            <a href="https://gitee.com/layui/layui-vue" target="_blank">
              Gitee
            </a>
          </li>
          <li class="layui-nav-item">
            <a href="javascript:void(0)">
              <lay-switch
                v-model="appStore.theme"
                class="switch"
                onswitch-value="dark"
                unswitch-value="light"
                onswitch-color="rgba(255, 255, 255, 0.05)"
                unswitch-color="rgba(255, 255, 255, 0.05)"
              >
                <template #onswitch-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="rgba(60, 60, 60, .7)"
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    class="vt-switch-appearance-moon"
                  >
                    <path
                      d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"
                    ></path>
                  </svg>
                </template>
                <template #unswitch-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="rgba(60, 60, 60, .7)"
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    class="vt-switch-appearance-sun"
                  >
                    <path
                      d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"
                    ></path>
                    <path
                      d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"
                    ></path>
                    <path
                      d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"
                    ></path>
                    <path
                      d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"
                    ></path>
                    <path
                      d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"
                    ></path>
                    <path
                      d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"
                    ></path>
                    <path
                      d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                    ></path>
                    <path
                      d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"
                    ></path>
                    <path
                      d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"
                    ></path>
                  </svg>
                </template>
              </lay-switch>
            </a>
          </li>
          <li class="layui-nav-item">
            <a href="javascript:void(0)"> {{ version }} </a>
          </li>
        </ul>
      </lay-header>
      <router-view></router-view>
    </lay-layout>
  </lay-config-provider>
</template>
<script>
import { provide, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAppStore } from "../store/app";
import { useI18n } from "../../../component/src/index";
import menu from "../view/utils/menus";
import zh_CN from "../language/zh_CN.ts";
import en_US from "../language/en_US.ts";
import config from "../../../component/package.json";

export default {
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const locale = ref("zh_CN");
    const locales = [
      { name: "zh_CN", locale: zh_CN, merge: true },
      { name: "en_US", locale: en_US, merge: true },
    ];
    const appStore = useAppStore();
    const menus = [];
    const currentPath = ref("/zh-CN/guide");

    watch(
      () => route.path,
      (val) => {
        currentPath.value = val;
      },
      {
        immediate: true,
        deep: true,
      }
    );

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

    const resetThemeVariable = function () {
      appStore.themeVariable = {
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
      };
    };

    const version = config.version;

    provide("version", version);

    return {
      t,
      menus,
      locale,
      version,
      locales,
      appStore,
      currentPath,
      handleClick,
      changeLocale,
      resetThemeVariable,
    };
  },
};
</script>

<style>
.layui-layout-document > .layui-header {
  z-index: 99;
  width: 100%;
  position: fixed;
  border-bottom: 1px solid #eeeeee;
  background-image: radial-gradient(transparent 1px, #ffffff 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}

.layui-layout-document > .layui-layout > .layui-side {
  overflow-x: hidden;
  position: fixed;
  margin-top: 60px;
  z-index: 99;
  height: calc(100% - 60px);
  border-right: 1px solid #eeeeee;
}

.layui-layout-document > .layui-layout > .layui-body {
  margin-top: 60px;
  left: 200px;
  position: absolute;
  width: calc(100% - 200px);
  height: calc(100% - 60px);
}

.layui-layout-document .layui-header .layui-form-switch {
  border: 1px solid rgba(60, 60, 60, 0.29);
  background-color: #f1f1f1 !important;
}

.layui-layout-document .layui-header .layui-nav .layui-nav-item *,
.layui-layout-document .layui-header .layui-nav .layui-nav-item a,
.layui-layout-document .layui-header .layui-nav .layui-nav-item a:hover {
  color: rgba(0, 0, 0, 0.8);
}

.layui-layout-document .layui-header .layui-logo {
  text-align: left;
  padding-left: 15px;
}

.layui-logo img {
  margin-top: -5px;
  height: 45px;
  left: 15px;
}

.layui-logo .title {
  margin-left: 12px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.2px;
  opacity: 0.8;
}

.layui-header > .layui-nav {
  background-color: transparent;
}

.layui-header > .layui-nav .layui-active * {
  color: var(--global-checked-color) !important;
}

.layui-header .layui-local-badge {
  font-size: 12.4px;
  background: transparent;
}

.layui-menu-docs {
  padding-top: 10px;
}

.layui-menu-docs .layui-menu-body-title .layui-font-gray {
  padding-left: 10px;
}

.layui-menu li,
.layui-menu-body-title a {
  padding: 5px 15px;
}

.layui-side hr {
  margin: 8px;
}

.switch svg {
  position: absolute;
  width: 12px;
  height: 12px;
  top: 3px;
  left: 3px;
}

.theme-panel {
  width: 380px;
  padding: 0px 10px 10px 10px;
}

.theme-panel > * {
  margin-top: 9px;
  margin-right: 9px;
}
</style>
