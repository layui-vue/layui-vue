import { Ref } from "vue";

export type DatePickerType = "date" | "datetime" | "year" | "time" | "month";

export type provideType = {
  currentYear: Ref;
  currentMonth: Ref;
  currentDay: Ref;
  dateValue: Ref;
  dateList: Ref;
  yearList: Ref;
  hms: Ref;
  type: string;
  showPanel: Ref;
  clear: Function;
  now: Function;
  ok: Function;
  range: boolean;
  rangeValue: Ref;
};
