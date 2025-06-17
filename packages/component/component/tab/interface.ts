import type { TabItemProps } from "@layui/component/component/tabItem/interface";
import type { NumberOrString } from "@layui/component/types";
import type { Slots } from "vue";

export const TabInjectKey = Symbol("layuiTab");

export interface TabProps {
  type?: "default" | "brief" | "card";
  modelValue: TabItemProps["id"];
  allowClose?: boolean;
  tabPosition?: TabPosition;
  beforeClose?: Function;
  beforeLeave?: Function;
  activeBarTransition?: boolean;
}

export interface TabEmits {
  (e: "update:modelValue", value: TabProps["modelValue"]): void;
  (e: "change", value: TabProps["modelValue"]): void;
  (e: "close", value: TabProps["modelValue"]): void;
}

export interface TabData {
  id: NumberOrString;
  title?: string | Function;
  icon?: string | Function;
  closable?: boolean;
  slots: Slots;
}

export interface TabsContext {
  active: string;
  addItem: (id: string, data: TabData) => void;
  removeItem: (id: string) => void;
}

export type TabPosition = "top" | "bottom" | "left" | "right";
