::: field 测试
:::

::: demo

<template>
<lay-menu v-model:selectedKey="selectedKey" v-model:openKeys="openKeys" :tree="isTree">
    <lay-menu-item title="工作空间" id="0">
        <lay-menu-child-item id="1" title="控制台">
        </lay-menu-child-item>
        <lay-menu-child-item id="2" title="分析页">
        </lay-menu-child-item>
    </lay-menu-item>
    <lay-menu-item title="错误页面" id="3">
        <lay-menu-child-item id="4" title="403">
        </lay-menu-child-item>
        <lay-menu-child-item id="5" title="404">
        </lay-menu-child-item>
        <lay-menu-child-item id="6" title="500">
        </lay-menu-child-item>
    </lay-menu-item>
</lay-menu>
  <lay-tab type="brief" v-model="selectedKey">
    <lay-tab-item title="选项一" id="1"><div style="padding:20px">选项一</div></lay-tab-item>
    <lay-tab-item title="选项二" id="2"><div style="padding:20px">选项二</div></lay-tab-item>
  </lay-tab>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const isTree = ref(true);
    const selectedKey = ref("1");
    const openKeys = ref(["0"]);
    const change = function (id) {
        selectedKey.value = id
    };

    return {
      isTree,
      selectedKey,
      openKeys,
      change,
    };
  },
};
</script>

:::
