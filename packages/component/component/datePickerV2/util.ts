import dayjs, { type Dayjs } from "dayjs";
import type { DatePickerModelValueSingleType } from "./interface";
import { DateContentSingleDateObject } from "./component/interface";

export const normalizeDayjsValue = (
  value: DatePickerModelValueSingleType,
  format: string | undefined
): Dayjs | null => {
  const date = dayjs(value, format);

  // return date.isValid() ? date : dayjs(value).isValid() ? dayjs(value) : null;
  return date.isValid() ? date : null;
};

export const dayjsToString = (
  value: DatePickerModelValueSingleType,
  format: string
) => {
  const date = dayjs(value, format);

  return date.isValid()
    ? dayjs(value, format).format(format)
    : dayjs(value).isValid()
    ? dayjs(value).format(format)
    : "";
};

export const checkRangeValue = (values: Array<Dayjs | null>) => {
  const [start, end] = values;
  if (!start || !end) return false;
  return start.isValid() && end.isValid();
};

/**
 * 获取年份列表
 * @param {Date | number} date 时间
 * @param {Number} page 页数
 * @param {Number} step 步进
 */
export const getYears = (date?: Date | number, page = 15, step = 1) => {
  const years = [];
  const y = typeof date === "number" ? date : date?.getFullYear() ?? 1970;
  const currentIndex = getPosition(y, page);

  for (
    let i = y - (currentIndex - 1);
    i <= y + page - currentIndex;
    i += step
  ) {
    years.push(i);
  }
  return years;
};

const getPosition = (year: number, length: number): number => {
  if (year === 0) return length;

  return ((((year - 1) % length) + length) % length) + 1;
};

/**
 * 获取当前日期
 */
export const getDate = (val = "") => {
  if (val) {
    return new Date(val);
  } else {
    return new Date();
  }
};

/**
 * 获取当前年份
 */
export const getYear = (val = "") => {
  return getDate(val).getFullYear();
};

/**
 * 获取当前月份
 */
export const getMonth = (val = "") => {
  return getDate(val).getMonth();
};

export const getDay = (val = "") => {
  if (val) {
    return new Date(getDate(val).toDateString()).getTime();
  } else {
    return -1;
  }
};

/**
 * 获取月份天数
 *
 * @param year
 * @param month
 */
export const getDayLength = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// 设置日期列表
export const setDateList = (
  year: number,
  month: number
): Array<DateContentSingleDateObject> => {
  const curDays = getDayLength(year, month); // 当月天数
  const prevDays = getDayLength(year, month - 1); // 上月天数
  const curFirstDayWeek = new Date(year, month, 1).getDay(); // 当月第一天星期几
  const list: Array<DateContentSingleDateObject> = [];

  // 填充上月天数
  for (let i = prevDays - curFirstDayWeek + 1; i <= prevDays; i++) {
    list.push({
      day: i,
      value: +new Date(year, month - 1, i),
      isRange: false,
      isSelected: false,
      type: "prev",
    });
  }
  // 填充当月天数
  for (let i = 1; i <= curDays; i++) {
    list.push({
      day: i,
      value: +new Date(year, month, i),
      isRange: false,
      isSelected: false,
      type: "current",
    });
  }
  // 填充下月天数
  const nextDays = 7 - (list.length % 7);
  if (nextDays !== 7) {
    for (let i = 1; i <= nextDays; i++) {
      list.push({
        day: i,
        value: +new Date(year, month + 1, i),
        isRange: false,
        isSelected: false,
        type: "next",
      });
    }
  }
  return list;
};
