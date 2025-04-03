export interface PageProps {
  total: number;
  limit?: number;
  theme?: string;
  pages?: number;
  limits?: number[];
  simple?: boolean;
  modelValue?: number;
  hideOnSinglePage?: boolean;
  // mode?: MODE;
  ellipsisTooltip?: boolean;
  disabled?: boolean;
  layout?: LayoutKey[];
}

export type LayoutKey =
  | "count"
  | "prev"
  | "page"
  | "limits"
  | "next"
  | "limits"
  | "refresh"
  | "skip";
