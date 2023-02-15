<template>
  <lay-layout>
    <lay-side>
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
      <div style="padding: 20px">
        <router-view />
      </div>
    </lay-body>
  </lay-layout>
</template>
<script>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
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
            subTitle: "change",
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
            subTitle: "dark",
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
            title: "插件",
            subTitle: "plugin",
            path: "/zh-CN/guide/plugin",
          },
          {
            id: 9,
            title: "团队",
            subTitle: "member",
            path: "/zh-CN/guide/member",
          },
        ],
      },
    ];

    const selected = ref(1);

    const handleClick = function (menu) {
      selected.value = menu.id;
      router.push(menu.path);
    };

    return {
      menus,
      selected,
      currentPath,
      handleClick,
    };
  },
};
</script>
