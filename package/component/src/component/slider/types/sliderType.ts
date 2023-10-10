/*
 * @Author: baobaobao
 * @Date: 2023-10-09 17:15:52
 * @LastEditTime: 2023-10-10 20:19:20
 * @LastEditors: baobaobao
 */

import { StyleValue } from "vue";

export interface MarkList {
  [key: number]: string;
}
export interface SliderProps {
  vertical: boolean;
  modelValue: number | Array<number>;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  range: boolean;
  showDots: boolean;
  isDark: boolean;
  isCanHide: boolean;
  isTips: boolean;
  marks?: Record<number, any>;
  placement: string;
  formatTooltip?: (val: number) => number | string;
}


export type Mark = {
  pos: number;
  mark: string | { [k:string]: any }
}

export type Marks = Mark[]

export type SliderBarProps = {
  modelValue: number;
}

export interface StyledMark {
  style: StyleValue;
  label: string;
  point: number;
}
export interface MarkPoints {
  mark: StyledMark;
}