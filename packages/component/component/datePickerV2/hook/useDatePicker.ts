import type {
  // DatePickerProps,
  RequiredDatePickerProps,
  TypeMap,
  DatePickerModelValueSingleType,
  DatePickerContextType,
} from "../interface";
import dayjs, { type Dayjs } from "dayjs";

import { computed } from "vue";
import YearPanel from "../component/common/Year.vue";
import DatePicker from "../component/DatePicker.vue";

import { isArray, isNumber } from "../../../utils";

export const useDatePicker = (props: RequiredDatePickerProps) => {
  const initDate = computed<Dayjs | Array<Dayjs>>(() => {
    if (isArray(props.modelValue)) {
      return props.modelValue.map((date: DatePickerModelValueSingleType) => {
        return dayjs(date || new Date());
      });
    } else {
      // 兼容之前的 Year | Month 类型 modelValue可传 `2024` | `11` number类型
      let value = props.modelValue;
      if (
        ["year", "month"].includes(props.type!) &&
        isNumber(props.modelValue) &&
        `${props.modelValue}`.length <= 4
      ) {
        value += "";
      }

      return dayjs(value || new Date(), typeMap.value.format);
    }
  });

  const _format = computed(() => {
    return props.format ?? typeMap.value.format;
  });

  const _inputFormat = computed(() => {
    return props.inputFormat ?? typeMap.value.format;
  });

  // 类型映射
  const TYPE_MAP: TypeMap = {
    datetime: { component: YearPanel, format: "YYYY-MM-DD HH:mm:ss" },
    date: { component: DatePicker, format: "YYYY-MM-DD" },
    year: { component: DatePicker, format: "YYYY" },
    month: { component: DatePicker, format: "M" },
    yearmonth: { component: DatePicker, format: "YYYY-MM" },
    time: { component: DatePicker, format: "HH:mm:ss" },
  };

  const renderComponentProps = computed<DatePickerContextType>(() => {
    return {
      ...props,
      modelValue: initDate.value,
      defaultFormat: typeMap.value.format,
      format: _format.value,
      inputFormat: _inputFormat.value,
    };
  });

  const typeMap = computed(() => {
    return TYPE_MAP[props.type];
  });

  const RenderComponent = computed(() => {
    return typeMap.value.component;
  });

  return {
    RenderComponent,
    renderComponentProps,
  };
};
