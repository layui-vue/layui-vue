import { SelectProps } from "../select/index.vue";

export interface TimeSelectProps extends SelectProps {
  interval?: string;
  format?: string;
  valueFormat?: string;
  defaultValue?: Date | string;
  start?: Date | string;
  end?: Date | string;
}