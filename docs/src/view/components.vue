<template>
  <lay-layout>
    <lay-side class="layui-menu-ref-1">
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
                    <lay-badge
                      v-bind="children.badge"
                      v-if="children.badge"
                      style="float: right; margin-top: 11px"
                    ></lay-badge>
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
      <div
        style="
          padding: 20px;
          margin-right: 180px;
          transition: margin 240ms 60ms;
        "
        @click="handleMenuOpen(false)"
      >
        <router-view />
      </div>
      <lay-backtop></lay-backtop>
    </lay-body>
  </lay-layout>
</template>
<script>
import { ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import menus from "./utils/menus";
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

  .layui-menu-ref-1 {
    width: v-bind(menuDisplay) !important;
  }
}
.layui-menu-toggle {
  display: none;
}
</style>
