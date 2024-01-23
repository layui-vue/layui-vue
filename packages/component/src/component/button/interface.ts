export type ButtonType = "primary" | "normal" | "warm" | "danger";
export type ButtonSize = "lg" | "md" | "sm" | "xs";
export type ButtonBorder = "green" | "blue" | "orange" | "red" | "black";
export type ButtonNativeType = "button" | "submit" | "reset";

export const ButtonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};
