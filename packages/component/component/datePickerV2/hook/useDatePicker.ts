import type { DatePickerProps, DatePickerEmits, TypeMap } from "../interface";

import { computed } from "vue";
// import dayjs from "dayjs";
import YearPanel from "../component/YearPanel.vue";

export const useDatePicker = (
  props: DatePickerProps,
  emits: DatePickerEmits
) => {
  const _modelValue = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      return emits("update:modelValue", val as string | Array<string>);
    },
  });

  const _format = computed(() => {
    return props.format ?? typeMap.value.format;
  });

  const _inputFormat = computed(() => {
    return props.inputFormat ?? typeMap.value.format;
  });

  // 类型映射
  const TYPE_MAP: TypeMap = {
    date: { component: YearPanel, format: "YYYY-MM-DD" },
    datetime: { component: YearPanel, format: "YYYY-MM-DD HH:mm:ss" },
    year: { component: YearPanel, format: "YYYY" },
    month: { component: YearPanel, format: "MM" },
    time: { component: YearPanel, format: "HH:mm:ss" },
    yearmonth: { component: YearPanel, format: "YYYY-MM" },
  };

  const renderComponentProps = computed<DatePickerProps>(() => {
    return {
      ...props,
      format: _format.value,
      inputFormat: _inputFormat.value,
    };
  });

  const typeMap = computed(() => {
    return TYPE_MAP[props.type!];
  });

  const RenderComponent = computed(() => {
    return typeMap.value.component;
  });

  return {
    _modelValue,
    RenderComponent,
    renderComponentProps,
  };
};
