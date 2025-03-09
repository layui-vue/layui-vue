import type { ComputedRef, Ref, ShallowRef, InjectionKey } from "vue";
export interface StepProps {
  vertical?: boolean;
  minSize?: number;
}

export interface SplitPanelStepsType {
  itemId: ComputedRef<number>;
  setIndex: (val: number) => void;
  space: ComputedRef<string | number>;
  itemEl: ShallowRef<HTMLDivElement | null>;
}

export interface SplitPanelContext {
  props: Required<StepProps>;
  steps: Ref<SplitPanelStepsType[]>;
}

export const SPLITPANEL_INJECTION_KEY: InjectionKey<SplitPanelContext> =
  Symbol("LaySplitPanel");
