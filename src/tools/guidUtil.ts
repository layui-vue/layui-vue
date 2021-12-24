/**
 * 随机数
 * <p>
 * @param null 无参
 * */
export function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * 随机数
 * <p>
 * @param null 无参
 * */
export function guid() {
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}
