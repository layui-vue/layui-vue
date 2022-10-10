import { Ref } from "vue";

export type DatePickerType = "date" | "datetime" | "year" | "time" | "month";

export type provideType = {
  currentYear: Ref;
  currentMonth: Ref;
  currentDay: Ref;
  dateValue: Ref;
  hms: Ref;
  type: string;
  showPanel: Ref;
  clear: Function;
  now: Function;
  ok: Function;
  range: boolean;
  rangeValue: {
    first: string;
    last: string;
    hover: string;
    firstTime: { hh: number; mm: number; ss: number };
    lastTime: { hh: number; mm: number; ss: number };
  };
  rangeSeparator: string;
  simple: boolean;
  timestamp: boolean;
};
