export type LaySegmentedItemType = {
  label: string;
  slot?: string;
  [key: string]: any;
};

export interface LaySegmentedProps {
  options: LaySegmentedItemType[] | string[];
  modelValue: string;
  size?: "lg" | "md" | "sm";
  name?: string;
  disabled?: boolean;
}
