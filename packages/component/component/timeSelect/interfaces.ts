import { SelectProps } from "../select/index.vue";

export interface TimeSelectProps extends SelectProps {
  interval?: string;
  inputFormat?: string;
  format?: string;
  start?: string;
  end?: string;
  withStartTime?: boolean;
  withEndTime?: boolean;
  skip?: string[];
}
