import { OriginalTreeData, StringOrNumber } from './tree.type';
import { Nullable } from '../type';
import { Ref } from 'vue';
declare type CustomKey = string | number;
declare type CustomString = (() => string) | string;
export interface TreeData {
    id: CustomKey;
    title: CustomString;
    children: TreeData[];
    parentKey: Nullable<StringOrNumber>;
    isRoot: boolean;
    isChecked: Ref<boolean>;
    isDisabled: Ref<boolean>;
    isLeaf: Ref<boolean>;
    hasNextSibling: boolean;
    parentNode: Nullable<TreeData>;
}
interface ReplaceFields {
    id: string;
    title: string;
    children: string;
}
interface TreeConfig {
    showCheckbox: boolean;
    checkedKeys: StringOrNumber[];
    expandKeys: StringOrNumber[];
    nodeMap: Map<StringOrNumber, TreeData>;
    originMap: Map<StringOrNumber, OriginalTreeData>;
    replaceFields: ReplaceFields;
}
declare class Tree {
    protected config: TreeConfig;
    protected treeData: TreeData[];
    constructor(config: TreeConfig, origin: OriginalTreeData | OriginalTreeData[]);
    init(origin: OriginalTreeData | OriginalTreeData[]): void;
    createTree(origin: OriginalTreeData | OriginalTreeData[], parentKey?: StringOrNumber): TreeData[];
    getNode(origin: OriginalTreeData, parentKey: StringOrNumber, hasNextSibling: boolean): TreeData;
    setChildrenChecked(checked: boolean, nodes: TreeData[]): void;
    setParentChecked(checked: boolean, parent: TreeData): void;
    setCheckedKeys(checked: boolean, node: TreeData): void;
    getData(): TreeData[];
    getKeys(): {
        checkedKeys: any[];
        expandKeys: any[];
    };
    getOriginData(key: StringOrNumber): OriginalTreeData;
}
export { Tree };
