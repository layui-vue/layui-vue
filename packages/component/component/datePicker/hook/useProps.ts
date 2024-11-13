import type { LayFormContext } from "../../../types";
import { computed, inject } from "vue";

import type { DatePickerProps } from "../interface";

export function useProps(props: DatePickerProps) {
  const size = computed(() => {
    const formContext = inject("LayForm", {} as LayFormContext);

    return props.size || formContext.size || "md";
  });

  return { size };
}
