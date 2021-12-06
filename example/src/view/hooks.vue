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
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const currentPath = ref('/zh-CN/guide')

    watch(
      () => route.path,
      (val) => {
        currentPath.value = val
      },
      {
        immediate: true,
        deep: true,
      }
    )

    const menus = [
      {
        id: 1,
        title: 'hooks',
        children: [
          {
            id: 0,
            title: '开始',
            subTitle: 'useStarted',
            path: '/zh-CN/hooks/useStarted',
          },
          {
            id: 1,
            title: '事件',
            subTitle: 'useClickOutside',
            path: '/zh-CN/hooks/useClickOutside',
          },
          {
            id: 3,
            title: '拖拽',
            subTitle: 'useMove',
            path: '/zh-CN/hooks/useMove',
          },
          {
            id: 2,
            title: '全屏',
            subTitle: 'useFullScreen',
            path: '/zh-CN/hooks/useFullScreen',
          },{
            id: 3,
            title: '状态',
            subTitle: 'useState',
            path: '/zh-CN/hooks/useState',
          },{
            id: 4,
            title: '布尔',
            subTitle: 'useBoolean',
            path: '/zh-CN/hooks/useBoolean',
          },
        ],
      },
    ]

    const selected = ref(1)

    const handleClick = function (menu) {
      selected.value = menu.id
      router.push(menu.path)
    }

    return {
      menus,
      selected,
      currentPath,
      handleClick,
    }
  },
}
</script>
