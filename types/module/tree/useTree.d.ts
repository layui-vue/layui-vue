import { TreeEmits, TreeProps } from './tree.type';
import { ComputedRef } from 'vue';
import { Tree, TreeData } from './tree';
export declare type UseTree = (props: TreeProps, emit: TreeEmits) => {
    tree: Tree;
    nodeList: ComputedRef<TreeData[]>;
};
export declare const useTree: UseTree;
