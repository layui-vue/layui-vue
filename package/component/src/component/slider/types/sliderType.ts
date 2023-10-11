/*
 * @Author: baobaobao
 * @Date: 2023-10-09 17:15:52
 * @LastEditTime: 2023-10-11 19:52:24
 * @LastEditors: baobaobao
 */

import { StyleValue } from "vue";

export interface MarkList {
  [key: number]: string;
}
export interface TooltipProps {
  isCanHide: boolean;
  disabled: boolean;
  placement: string;
  isDark: boolean;
}
export interface SliderProps {
  vertical: boolean;
  modelValue: number | Array<number>;
  rangeValue?: Array<number>;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  range: boolean;
  showDots: boolean;
  marks?: Record<number, any>;
  tooltipProps?: Record<string, boolean | string>;
  formatTooltip?: (val: number) => number | string;
}

export type Mark = {
  pos: number;
  mark: string | { [k: string]: any };
};

export type Marks = Mark[];

export type SliderBarProps = {
  modelValue: number;
};

export interface StyledMark {
  style: StyleValue;
  label: string;
  point: number;
}
export interface MarkPoints {
  mark: StyledMark;
}
export interface tooltipProps  {
  position?: string;
  isDark?:  string;
  disabled?: boolean;
  isCanHide?: boolean;
}
