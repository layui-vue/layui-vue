import type { Component } from "vue";
import type { TabItemVNode } from "../components/interface";

import LayTabItem from "@layui/component/component/tabItem";
import { flattedVNode } from "@layui/component/utils";
import { ref, useSlots, watch } from "vue";

export function useTabSlot() {
  const slots = useSlots();

  const defaultSlot = ref<TabItemVNode[]>([]);

  function generateDefaultSlot() {
    defaultSlot.value = (!slots.default
      ? []
      : flattedVNode(slots.default())
        ?.filter((slot) => {
          return (slot.type as Component)?.name === LayTabItem.name;
        })) as TabItemVNode[];
  }

  watch(
    () => slots.default?.(),
    () => {
      generateDefaultSlot();
    },
    { deep: true, immediate: true },
  );

  return { defaultSlot };
}
