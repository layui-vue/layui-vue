import { computed, provide, ref } from "vue";
import { getYears } from "../day";
import { DatePickerProps } from "../interface";
import { HEADER_YEAR_CONTEXT, YEAR_CONTEXT } from "../component/interface";

export const useYearPanel = (props: DatePickerProps) => {
  const currentYear = ref();
  const currentDate = ref();

  const yearList = computed<number[]>(() =>
    getYears(currentDate.value, props.yearPage, props.yearStep)
  );
  const yearRange = computed(() => [
    yearList.value.at(0),
    yearList.value.at(-1),
  ]);

  provide(HEADER_YEAR_CONTEXT, {
    yearRange,
    currentDate,
    yearPage: props.yearPage ?? 15,
  });

  const ret = { currentYear, currentDate, yearList, yearRange };
  provide(YEAR_CONTEXT, ret);
  return ret;
};
