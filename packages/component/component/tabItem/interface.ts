import type { NumberOrString } from "@layui/component/types";

export interface TabItemProps {
  id: NumberOrString;
  title?: string | Function;
  icon?: string | Function;
  closable?: boolean;
}
