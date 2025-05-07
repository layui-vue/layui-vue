import type { Dayjs } from "dayjs";
import type {
  DatePickerModelValueSingleType,
  DatePickerRenderComponentProps,
  RequiredDatePickerProps,
  TypeMap,
} from "../interface";

import { computed, reactive, toRefs } from "vue";
import { isArray, isNumber } from "../../../utils";
import DatePicker from "../component/DatePicker.vue";
import DateRange from "../component/DateRange.vue";
import MonthRange from "../component/MonthRange.vue";
import TimeRange from "../component/TimeRange.vue";

import YearRange from "../component/YearRange.vue";
import { normalizeDayjsValue } from "../util";

export function useDatePicker(props: RequiredDatePickerProps) {
  // 类型映射
  const TYPE_MAP: TypeMap = {
    year: { component: props.range ? YearRange : DatePicker, format: "YYYY" },
    month: { component: props.range ? MonthRange : DatePicker, format: "M" },
    datetime: {
      component: props.range ? DateRange : DatePicker,
      format: "YYYY-MM-DD HH:mm:ss",
    },
    date: {
      component: props.range ? DateRange : DatePicker,
      format: "YYYY-MM-DD",
    },
    yearmonth: {
      component: props.range ? MonthRange : DatePicker,
      format: "YYYY-MM",
    },
    time: {
      component: props.range ? TimeRange : DatePicker,
      format: "HH:mm:ss",
    },
  };

  const typeMap = computed(() => {
    return TYPE_MAP[props.type];
  });

  const _format = computed(() => {
    return props.format || typeMap.value.format;
  });

  const initDate = computed<Dayjs | Array<Dayjs> | null>(() => {
    if (props.range) {
      const modelValue = isArray(props.modelValue) ? props.modelValue : [];

      return modelValue.map((date: DatePickerModelValueSingleType) => {
        return normalizeDayjsValue(date, _format.value);
      }) as Array<Dayjs>;
    }
    else {
      let value = props.modelValue;

      // 兼容之前的 Year | Month 类型 modelValue可传 `2024` | `11` number类型
      if (
        ["year", "month"].includes(props.type!)
        && isNumber(props.modelValue)
        && `${props.modelValue}`.length <= 4
      ) {
        value += "";
      }

      return normalizeDayjsValue(
        value as DatePickerModelValueSingleType,
        _format.value,
      );
    }
  });

  const _inputFormat = computed(() => {
    return props.inputFormat ?? typeMap.value.format;
  });

  const renderComponentProps = computed<DatePickerRenderComponentProps>(() => {
    return {
      ...props,
      modelValue: initDate.value,
      format: _format.value,
      inputFormat: _inputFormat.value,
    };
  });

  const datePickerContext = reactive({
    ...toRefs(props),
    modelValue: initDate,
    format: _format,
    inputFormat: _inputFormat,
  });

  const RenderComponent = computed(() => {
    return typeMap.value.component;
  });

  return {
    RenderComponent,
    renderComponentProps,
    datePickerContext,
  };
}
