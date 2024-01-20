<script setup lang="ts">
import {
  watch,
  inject,
  useSlots,
  getCurrentInstance,
  reactive,
  onBeforeUnmount,
} from "vue";
import { TabInjectKey, TabsContext } from "../tab/interface";

export interface TabItemProps {
  id: string;
  title?: string | Function;
  icon?: string | Function;
  closable?: boolean | string;
}

defineOptions({
  name: "LayTabItem",
});

const props = withDefaults(defineProps<TabItemProps>(), {
  closable: true,
});

const instance = getCurrentInstance();
const slots = useSlots();
const active = inject("active");
const tabsCtx = inject<Partial<TabsContext>>(TabInjectKey, {});

const data = reactive({
  id: props.id,
  title: props.title,
  icon: props.icon,
  closable: props.closable,
  slots: slots,
});

if (instance?.uid) {
  tabsCtx.addItem?.(props.id, data);
}

watch(
  () => props,
  () => {
    tabsCtx.addItem?.(
      props.id,
      reactive({
        id: props.id,
        title: props.title,
        icon: props.icon,
        closable: props.closable,
        slots: slots,
      })
    );
  },
  { deep: true }
);

onBeforeUnmount(() => {
  if (instance?.uid) {
    tabsCtx.removeItem?.(props.id);
  }
});
</script>

<template>
  <div class="layui-tab-item" :class="[active === id ? 'layui-show' : '']">
    <slot></slot>
  </div>
</template>
