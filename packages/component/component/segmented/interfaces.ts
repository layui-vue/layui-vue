export type LaySegementedItemType = {
  label: string;
  slot?: string;
  [key: string]: any;
};

export interface LaySegmentedProps {
  options: LaySegementedItemType[] | string[];
  modelValue: string;
  size?: "lg" | "default" | "sm" | "xs";
  name?: string;
  disabled?: boolean;
}
