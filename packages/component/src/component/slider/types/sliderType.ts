/*
 * @Author: baobaobao
 * @Date: 2023-10-09 17:15:52
 * @LastEditTime: 2023-10-15 17:06:07
 * @LastEditors: baobaobao
 */

import type { StyleValue, ToRefs } from "vue";
import type { Placement } from "../../popper/index";

export interface MarkList {
  [key: number]: string;
}
export interface SliderTooltipProps {
  disabled?: boolean;
  placement?: Placement;
  isDark?: boolean;
}
export interface SliderProps {
  vertical?: boolean;
  modelValue?: number | Array<number>;
  rangeValue?: Array<number>;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  range?: boolean;
  showDots?: boolean;
  marks?: Record<number, any>;
  reverse?: boolean;
  isFollowMark?: boolean;
  tooltipProps?: SliderTooltipProps;
  alwayShowTooltip?: boolean;
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
  style?: StyleValue;
  label: string;
  point: number;
}
export interface MarkPoints {
  mark: StyledMark;
}

export type DefaultValueSliderPropsType = Required<
  Omit<SliderProps, "marks" | "formatTooltip">
> &
  Partial<Pick<SliderProps, "marks" | "formatTooltip">>;
