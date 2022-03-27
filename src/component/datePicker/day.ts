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
const getDate = () => {
  return new Date();
};

/**
 * 获取当前年份
 */
const getYear = () => {
  return getDate().getFullYear();
};

/**
 * 获取当前月份 
 */
const getMonth = () => {
  return getDate().getMonth();
}

/**
 * 获取月份天数
 *
 * @param year
 * @param month
 */
const getDayLength = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export { getDayLength, getYears, getDate, getMonth, getYear };
