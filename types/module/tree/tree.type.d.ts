export declare type StringFn = () => string;
export declare type StringOrNumber = string | number;
export declare type KeysType = (number | string)[];
export declare type EditType = boolean | ('add' | 'update' | 'delete');
export interface OriginalTreeData {
    title: StringFn | string;
    id: StringOrNumber;
    field: StringFn | string;
    children?: OriginalTreeData[];
    disabled?: boolean;
}
export interface TreeProps {
    checkedKeys?: KeysType;
    expandKeys?: KeysType;
    data: OriginalTreeData;
    showCheckbox?: boolean;
    edit?: EditType;
    accordion?: boolean;
    onlyIconControl?: boolean;
    showLine?: boolean;
    replaceFields?: {
        id?: string;
        children?: string;
        title?: string;
    };
}
export interface TreeEmits {
    (e: 'update:checkedKeys', keys: KeysType): void;
    (e: 'update:expandKeys', keys: KeysType): void;
    (e: 'node-click', node: OriginalTreeData, event: Event): void;
}
