import type { InjectionKey } from "vue";
import type { SplitPanelContext } from "./interface";

export const SPLITPANEL_INJECTION_KEY: InjectionKey<SplitPanelContext> =
  Symbol("LaySplitPanel");
