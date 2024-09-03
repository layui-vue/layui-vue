import { SelectProps } from "../select/index.vue";

export interface TimeSelectProps extends SelectProps {
  interval?: string;
  format?: string;
  valueFormat?: string;
  start?: string;
  end?: string;
  withStartTime?: boolean;
  withEndTime?: boolean;
  skip?: string[];
}
