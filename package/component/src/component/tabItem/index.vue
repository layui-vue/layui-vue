<script lang="ts">
export default {
  name: "LayTabItem",
};
</script>

<script setup lang="ts">
import {
  withDefaults,
  inject,
  Ref,
  useSlots,
  getCurrentInstance,
  computed,
  reactive,
  onBeforeUnmount,
  toRefs,
} from "vue";
import { TabInjectKey, TabsContext } from "../tab/interface";

export interface LayTabItemProps {
  id: string;
  title: string;
  closable?: boolean | string;
}

const props = withDefaults(defineProps<LayTabItemProps>(), {
  closable: true,
});

const instance = getCurrentInstance();
const slots = useSlots();
const active = inject("active");
const slotsChange: Ref<boolean> = inject("slotsChange") as Ref<boolean>;
slotsChange.value = !slotsChange.value;
const tabsCtx = inject<Partial<TabsContext>>(TabInjectKey, {});

const data = reactive({
  id: props.id,
  title: props.title,
  closable: props.closable,
  slots: slots,
});

if (instance?.uid) {
  tabsCtx.addItem?.(props.id, data);
}

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
