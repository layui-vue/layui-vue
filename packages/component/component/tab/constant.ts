import type { InjectionKey, Ref } from "vue";
import type { TabProps } from "./interface";

export interface LayTabContextType {
  modelValue: Ref<TabProps["modelValue"]>;
}

export const LAY_TAB_CONTEXT: InjectionKey<LayTabContextType>
  = Symbol("LayTabContext");
