/**
 * 获取年份列表
 */
const getYears = () => {
  let years = [];
  for (let i = 1970; i < getYear() + 100; i++) {
    years.push(i);
  }
  return years;
};

/**
 * 获取当前日期
 */
const getDate = (val = "") => {
  if (val) {
    return new Date(val);
  } else {
    return new Date();
  }
};

/**
 * 获取当前年份
 */
const getYear = (val = "") => {
  return getDate(val).getFullYear();
};

/**
 * 获取当前月份
 */
const getMonth = (val = "") => {
  return getDate(val).getMonth();
};

const getDay = (val = "") => {
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
const getDayLength = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// 设置日期列表
const setDateList = (year: number, month: number) => {
  const curDays = getDayLength(year, month); // 当月天数
  const prevDays = getDayLength(year, month - 1); // 上月天数
  const curFirstDayWeek = new Date(year, month, 1).getDay(); // 当月第一天星期几
  const list: any[] = [];
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

export {
  getDayLength,
  getYears,
  getDate,
  getMonth,
  getYear,
  getDay,
  setDateList,
};
