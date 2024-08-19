<template>
  <lay-layout>
    <lay-side class="layui-menu-ref-2">
      <lay-scroll style="overflow-y: scroll">
        <ul class="layui-menu layui-menu-lg layui-menu-docs">
          <li
            v-for="menu in menus"
            :key="menu"
            class="layui-menu-item-group"
            lay-options="{type: 'group', isAllowSpread: true}"
          >
            <div class="layui-menu-body-title">{{ menu.title }}</div>
            <hr />
            <ul>
              <li
                v-for="children in menu.children"
                :key="children"
                :class="[
                  currentPath === children.path
                    ? 'layui-menu-item-checked2'
                    : '',
                ]"
                @click="handleClick(children)"
              >
                <div class="layui-menu-body-title">
                  <router-link :to="children.path">
                    <span>{{ children.title }}</span>
                    <span class="layui-font-12 layui-font-gray">
                      {{ children.subTitle }}
                    </span>
                  </router-link>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </lay-scroll>
    </lay-side>
    <lay-body>
      <div
        class="layui-menu-toggle"
        style="
          width: auto !important;
          height: auto !important;
          padding: 0 !important;
          padding-left: 8px;
        "
        @click="handleMenuOpen(true)"
      >
        <lay-icon
          type="layui-icon-menu-fill"
          style="font-size: 32px"
        ></lay-icon>
      </div>
      <div style="padding: 20px" @click="handleMenuOpen(false)">
        <router-view />
      </div>
    </lay-body>
  </lay-layout>
</template>
<script>
import { ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const currentPath = ref("/zh-CN/guide");

    const isMenuDisplay = ref(false);
    const menuDisplay = computed(() => (isMenuDisplay.value ? "200px" : "0px"));

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

    const menus = [
      {
        id: 1,
        title: "基础",
        children: [
          {
            id: 1,
            title: "介绍",
            subTitle: "introduce",
            path: "/zh-CN/guide/introduce",
          },
          {
            id: 2,
            title: "安装",
            subTitle: "started",
            path: "/zh-CN/guide/getStarted",
          },
          {
            id: 3,
            title: "更新",
            subTitle: "changelog",
            path: "/zh-CN/guide/changelog",
          },
          {
            id: 4,
            title: "主题",
            subTitle: "theme",
            path: "/zh-CN/guide/theme",
          },
          {
            id: 5,
            title: "夜间",
            subTitle: "themeDark",
            path: "/zh-CN/guide/dark",
          },
          {
            id: 6,
            title: "语言",
            subTitle: "locale",
            path: "/zh-CN/guide/locale",
          },
          {
            id: 7,
            title: "问题",
            subTitle: "problem",
            path: "/zh-CN/guide/problem",
          },
          {
            id: 8,
            title: "升级",
            subTitle: "upgrade",
            path: "/zh-CN/guide/upgrade",
          },
        ],
      },
    ];

    const selected = ref(1);

    const handleMenuOpen = function (val) {
      isMenuDisplay.value = val;
    };

    const handleClick = function (menu) {
      selected.value = menu.id;
      router.push(menu.path);
      handleMenuOpen(false);
    };

    return {
      menus,
      selected,
      currentPath,
      handleClick,
      handleMenuOpen,
      menuDisplay,
    };
  },
};
</script>

<style>
@media screen and (max-width: 768px) {
  .layui-menu-toggle {
    display: block !important;
  }

  .layui-menu-ref-2 {
    width: v-bind(menuDisplay) !important;
  }
}
.layui-menu-toggle {
  display: none;
}
</style>
