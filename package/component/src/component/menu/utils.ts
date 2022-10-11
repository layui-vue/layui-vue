// 处理菜单栏缩进
export function indentHandle(obj: {
  indent: boolean | string;
  level: number;
  basePadding?: number;
}) {
  const { indent, level, basePadding = 0 } = obj;
  const least: number = level - 1; // 第一层不缩进
  if (indent && least > 0) {
    const px =
      typeof indent === "boolean"
        ? `${basePadding + 10 * least}px` // css样式表对<a>设定了23基础边距
        : indent.replace(/\d+/g, (s) => (basePadding + least * +s).toString());
    return `padding-left: ${px}`;
  }
  return "";
}
