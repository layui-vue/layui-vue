import type { StringOrNumber } from "../tree/tree.type";

export type TreeSelectSize = "lg" | "md" | "sm" | "xs";

export interface TreeSelectCacheData {
  label: string;
  value: StringOrNumber;
}
