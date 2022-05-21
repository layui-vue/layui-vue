export declare type SelectValueType = string | string[] | number | number[] | null;
export interface SelectItem {
    value?: SelectValueType;
    label?: null | string | string[];
    disabled?: boolean;
    multiple?: boolean;
}
export interface SelectItemHandle {
    (selectItem: SelectItem, isChecked?: boolean): void;
}
