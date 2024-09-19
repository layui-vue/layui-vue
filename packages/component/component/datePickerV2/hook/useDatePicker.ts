import type { DatePickerProps, DatePickerEmits, TypeMap } from "../interface";

import { computed, provide, ref } from "vue";
// import dayjs from "dayjs";
import YearPanel from "../component/common/Year.vue";
import MonthPanel from "../component/common/Month.vue";
import Picker from "../component/Picker.vue";
import YearHeader from "../component/header/YearHeader.vue";
import { useYearPanel } from "./useYearPanel";
import Footer from "../component/common/Footer.vue";
import { PICKER_CONTEXT } from "../component/interface";
import dayjs, { type Dayjs } from "dayjs";

export const useDatePicker = (
  props: DatePickerProps
  // emits: DatePickerEmits
) => {
  // const _modelValue = computed({
  //   get() {
  //     return props.modelValue;
  //   },
  //   set(val) {
  //     return emits("update:modelValue", val as string | Array<string>);
  //   },
  // });

  const _format = computed(() => {
    return props.format ?? typeMap.value.format;
  });

  const _inputFormat = computed(() => {
    return props.inputFormat ?? typeMap.value.format;
  });

  // 类型映射
  const TYPE_MAP: TypeMap = {
    date: {
      context: useYearPanel,
      header: YearHeader,
      component: YearPanel,
      footer: Footer,
      format: "YYYY-MM-DD",
    },
    datetime: { component: YearPanel, format: "YYYY-MM-DD HH:mm:ss" },
    year: {
      context: useYearPanel,
      header: YearHeader,
      component: Picker,
      footer: Footer,
      format: "YYYY",
    },
    month: { component: Picker, format: "MM" },
    yearmonth: { component: Picker, format: "YYYY-MM" },
    time: { component: YearPanel, format: "HH:mm:ss" },
  };

  const renderComponentProps = computed<DatePickerProps>(() => {
    return {
      ...props,
      format: _format.value,
      inputFormat: _inputFormat.value,
    };
  });

  const typeMap = computed(() => {
    const t = TYPE_MAP[props.type!];
    t.context?.(props);
    return t;
  });

  const RenderComponent = computed(() => {
    return typeMap.value.component;
  });

  const RenderHeader = computed(() => {
    return typeMap.value.header;
  });

  const RenderFooter = computed(() => {
    return typeMap.value.footer;
  });

  const currentData = ref<Dayjs>(dayjs());
  const currentType = ref();

  provide(PICKER_CONTEXT, {
    currentData,
    currentType,
  });

  return {
    // _modelValue,
    currentData,
    currentType,
    RenderHeader,
    RenderComponent,
    RenderFooter,
    renderComponentProps,
  };
};
