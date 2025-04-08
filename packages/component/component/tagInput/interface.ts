export type TagInputSize = "lg" | "md" | "sm" | "xs";

export interface TagInputData {
  value?: string | number;
  label?: string;
  closable?: boolean;
  [other: string]: any;
}
