import type { CSSProperties, VNode, Slot } from "vue";

export type BaseAlignType = "left" | "center" | "right";

export interface DescriptionsItemProps {
  label?: string;
  span?: number;
  align?: BaseAlignType;
  labelAlign?: BaseAlignType;
  style?: CSSProperties;
  class?: string;
  labelStyle?: CSSProperties;
  labelClass?: string;
}

export interface DescriptionsItemsNode extends VNode {
  children: { [key: string]: Slot } | null;
  props: DescriptionsItemProps;
}
