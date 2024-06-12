export interface CascaderPanelItemProps {
  label?: any;
  value?: any;
  checked?: boolean;
  disabled?: boolean;
  slot?: string;
  children?: Array<CascaderPanelItemProps>;
  [key: string]: any;
}

export type CascaderPanelLazyloadFunction = (
  node: CascaderPanelItemProps,
  resolve: (data: any) => void
) =>
  | void
  | ((node: CascaderPanelItemProps) => Promise<Array<CascaderPanelItemProps>>);

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
}
