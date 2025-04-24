import type { LayFormContext } from "../../../types";
import type { DatePickerProps } from "../interface";

import { computed, inject } from "vue";

export function useProps(props: DatePickerProps) {
  const size = computed(() => {
    const formContext = inject("LayForm", {} as LayFormContext);

    return props.size || formContext.size || "md";
  });

  return { size };
}
