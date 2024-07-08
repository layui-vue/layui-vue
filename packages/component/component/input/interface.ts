export type InputSize = "lg" | "md" | "sm" | "xs";

export interface InputEmits {
  (e: "blur", eventParam: FocusEvent): void;
  (e: "input", value: string): void;
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "focus", eventParam: FocusEvent): void;
  (e: "clear"): void;
}
