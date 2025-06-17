import type { TabProps } from "../interface";
import { clsPrefix } from "@layui/component/utils";

import { computed } from "vue";

export function useTab(props: TabProps) {
  const classTab = computed(() => {
    return [
      clsPrefix("tab"),
      {
        [`is-${props.tabPosition}`]: props.tabPosition,
        [`${clsPrefix(`tab-${props.type}`)}`]: props.type,
      },
    ];
  });

  return { classTab };
}

export type UseTab = ReturnType<typeof useTab>;
