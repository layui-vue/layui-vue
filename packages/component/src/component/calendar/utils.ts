/*
 * @Author: baobaobao
 * @Date: 2023-05-13 14:41:58
 * @LastEditTime: 2023-05-13 20:51:30
 * @LastEditors: baobaobao
 */
import dayjs, { Dayjs } from "dayjs";
export const weekDays: string[] = ["一", "二", "三", "四", "五", "六", "日"];
export const getMonthDay = (date: string | number | Date) => {
  const days = dayjs(date).daysInMonth();
  return Array(days)
    .fill(dayjs)
    .map((_, index) =>
      dayjs(date)
        .set("date", index + 1)
        .format("YYYY-MM-DD")
    );
};
export const getPrevMonthDay = (date: string | number | Date) => {
  const days = dayjs(date).startOf("month").day();
  const newday = days === 0 ? 7 : days;
  const firstDay = newday + 7 - 7 - 1;
  const latstDay = dayjs(date).subtract(1, "month").endOf("month").date();
  return Array(firstDay)
    .fill(firstDay)
    .map((_, index) =>
      dayjs(date)
        .subtract(1, "month")
        .set("date", latstDay - (firstDay - index - 1))
        .format("YYYY-MM-DD")
    );
};
export const nextMonthDay = (date: string | number | Date, num: number) => {
  return Array(num)
    .fill(num)
    .map((_, index) =>
      dayjs(date)
        .add(1, "month")
        .set("date", index + 1)
        .format("YYYY-MM-DD")
    );
};
