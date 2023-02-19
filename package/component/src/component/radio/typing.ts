export type RadioSize = "lg" | "md" | "sm" | "xs";

export interface RadioEmits {
    (e: "update:modelValue", value: string | boolean | number | undefined): void;
    (e: "change", value: string | boolean | number | undefined): void;
}