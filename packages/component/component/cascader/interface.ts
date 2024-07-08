import { StyleValue } from "vue";
import {
  CascaderPanelItemProps,
  CascaderPanelLazyloadFunction,
} from "../cascaderPanel/interface";

export type CascaderSize = "lg" | "md" | "sm" | "xs";
export type DropdownTrigger = "click" | "hover" | "focus" | "contextMenu";

export interface CascaderProps {
  options?: Array<CascaderPanelItemProps>;
  modelValue?: string | Array<string>;
  decollator?: string;
  placeholder?: string;
  onlyLastLevel?: boolean;
  disabled?: boolean;
  replaceFields?: { label?: string; value?: string; children?: string };
  allowClear?: boolean;
  size?: CascaderSize;
  trigger?: DropdownTrigger | DropdownTrigger[];
  contentClass?: string | Array<string | object> | object;
  contentStyle?: StyleValue;
  changeOnSelect?: boolean;
  multiple?: boolean;
  lazy?: boolean;
  load?: CascaderPanelLazyloadFunction;
  checkStrictly?: boolean;
  fullpath?: boolean;
}
