import type { TabItemProps } from "@layui/component/component/tabItem/interface";
import type { VNode } from "vue";
import type { TabProps } from "../interface";

export interface TabItemVNode extends VNode {
  props: VNode["props"] & TabItemProps;
  children: VNode["children"] & {
    title?: () => any;
    icon?: () => any;
  };
}

export interface TabHeaderProps extends TabProps {
  defaultSlot: TabItemVNode[];
}
