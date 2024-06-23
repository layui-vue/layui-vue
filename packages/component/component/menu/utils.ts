// 处理菜单栏缩进
export function indentHandle(obj: {
  indent: boolean | string;
  level: number;
  basePadding?: number;
  isTree?: boolean;
}) {
  const { indent, level, basePadding = 0, isTree } = obj;
  const least: number = level - 1; // 第一层不缩进
  if (isTree && indent && least > 0) {
    const px =
      typeof indent === "boolean"
        ? `${basePadding + 10 * least}px` // css样式表对<a>设定了23基础边距
        : indent.replace(/\d+/g, (s) => (basePadding + least * +s).toString());
    return `padding-left: ${px}`;
  }
  return "";
}
