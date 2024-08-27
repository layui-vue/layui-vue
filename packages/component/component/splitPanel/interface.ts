import type { ComputedRef, Ref } from "vue";

export interface StepProps {
  vertical?: boolean;
  minSize?: number;
}

export interface SplitPanelStepsType {
  itemId: ComputedRef<string>;
  setIndex: (val: number) => void;
  space: ComputedRef<string | number>;
  itemEl: Ref<HTMLDivElement | null>;
}
