import type { ComputedRef, Ref } from "vue";

export interface CascaderPanelItemProps {
  label?: any;
  value?: any;
  disabled?: boolean;
  slot?: string;
  children?: Array<CascaderPanelItemProps>;
  [key: string]: any;
}

export interface CascaderPanelItemPropsInternal {
  label: any;
  value: any;
  slot?: any;
  indeterminate: boolean;
  checked: boolean;
  selected: boolean;
  loading: boolean;
  disabled?: boolean;
  orig?: CascaderPanelItemProps;
  children?: Array<CascaderPanelItemPropsInternal>;
  parent?: CascaderPanelItemPropsInternal;
}

export type CascaderPanelLazyloadFunction = (
  node: CascaderPanelItemPropsInternal,
  resolve: (data: any) => string | Promise<Array<CascaderPanelItemProps>> | void
) => string | Promise<Array<CascaderPanelItemProps>> | void;

export interface CascaderPanelProps {
  options?: Array<CascaderPanelItemProps>;
  modelValue?: string | Array<string>;
  decollator?: string;
  replaceFields?: {
    label?: string;
    value?: string;
    children?: string;
  };
  style?: {
    stripe?: boolean;
    /**
     * @duplicate
     */
    loadingTheme?: string;
  };
  multiple?: boolean;
  onlyLastLevel?: boolean;
  lazy?: boolean;
  load?: CascaderPanelLazyloadFunction;
  alwaysLazy?: boolean;
  value?: string | Array<string>;
  height?: string | number;
  checkStrictly?: boolean;
  changeOnSelect?: boolean;
  fullpath?: boolean;
}

export enum FLUSH_SIGNAL {
  CHANGE,
  MULTIPLE,
  SINGLE,
}

export interface tCascaderPanel {
  dataSource: ComputedRef<CascaderPanelItemPropsInternal[][]>;
  sanitizer: (
    data: Array<CascaderPanelItemProps>,
    parent: CascaderPanelItemPropsInternal | undefined
  ) => Array<CascaderPanelItemPropsInternal>;
  onlyLastLevel: Ref<boolean | undefined>;
  multiple: Ref<boolean | undefined>;
  checkStrictly: Ref<boolean | undefined>;
  decollator: Ref<string | undefined>;
  multipleSelectItem: Ref<Map<string, CascaderPanelItemPropsInternal>>;
  alwaysLazy: Ref<boolean | undefined>;
  loadingTheme: Ref<string | undefined>;
  selectKeys: Ref<string[]>;
  showKeys: Ref<string[]>;
  selectLabel: ComputedRef<string | string[]>;
  iterCollector: (iter: IterableIterator<any>) => any[];
  flatData: ComputedRef<CascaderPanelItemPropsInternal[]>;
  changeOnSelect: Ref<boolean | undefined>;
  buildMultipleStatus: () => void;
  setup: () => void;
  modelValue: Ref<string | string[]>;
}
