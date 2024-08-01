import { VNodeTypes } from "vue";
import type { DescriptionsItemProps } from "../descriptionsItem/interface";

export interface DataListType extends Omit<DescriptionsItemProps, "label"> {
  label?: VNodeTypes;
  content?: VNodeTypes;
}

export interface DescriptionsProps {
  dataList?: DataListType[];
  title?: string;
  extra?: string;
  border?: boolean;
  column?: number;
  direction?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
}
