import type { InjectionKey, Ref } from "vue";
import type { TabEmits, TabProps } from "./interface";

export interface LayTabContextType {
  emits: TabEmits;

  modelValue: Ref<TabProps["modelValue"]>;
}

export const LAY_TAB_CONTEXT: InjectionKey<LayTabContextType>
  = Symbol("LayTabContext");
