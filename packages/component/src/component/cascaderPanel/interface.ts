export interface CascaderPanelItemProps {
  label?: any;
  value?: any;
  checked?: boolean;
  disabled?: boolean;
  slot?: string;
  children?: Array<CascaderPanelItemProps>;
  [key: string]: any;
}

export interface CascaderPanelItemPropsInternal {
  label: any;
  value: any;
  slot?: any;
  checked: boolean;
  loading: boolean;
  disabled?: boolean;
  children?: Array<CascaderPanelItemPropsInternal>;
}

export type CascaderPanelLazyloadFunction = (
  node: CascaderPanelItemPropsInternal,
  resolve: (data: any) => string | Promise<Array<CascaderPanelItemProps>> | void
) => string | Promise<Array<CascaderPanelItemProps>> | void;

export interface CascaderPanelProps {
  replaceFields?: {
    label?: string;
    value?: string;
    children?: string;
  };
  modelValue?: string | Array<string>;
  style?: {
    stripe?: boolean;
    loadingTheme?: string;
  };
  multiple?: boolean;
  onlyLastLevel?: boolean;
  lazy?: CascaderPanelLazyloadFunction;
  alwaysLazy?: boolean;
  data?: Array<CascaderPanelItemProps>;
  decollator?: string;
  value?: string | Array<string>;
  height?: string | number;
  checkStrictly?: boolean;
}
