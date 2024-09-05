import type { DatePickerProps } from "../interface";
import type { CommonBlockProps } from "../component/interface";

import { computed } from "vue";

export const useDateCommon = (props: DatePickerProps) => {
  const commonBlockProps = computed<CommonBlockProps>(() => {
    return {
      name: props.name!,
      classes: [
        "layui-date-picker",
        { "layui-date-range-picker": props.range },
      ],
      size: "md",
      disabled: props.disabled!,
      allowClear: props.allowClear!,
      range: props.range!,
      rangeSeparator: props.rangeSeparator!,
      readonly: props.readonly!,
      prefixIcon: props.prefixIcon,
      suffixIcon: props.suffixIcon,
      contentClass: props.contentClass!,
      contentStyle: props.contentStyle!,
    };
  });

  return {
    commonBlockProps,
  };
};
