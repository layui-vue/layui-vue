type FormatType = "es" | "umd";

export const getFullFormatName = (name: string, format: FormatType) => {
  return `${name}${format === "umd" ? ".umd" : ""}.js`;
};
