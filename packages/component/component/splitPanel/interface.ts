import type { ComputedRef, Ref, ShallowRef } from "vue";

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
  target: Ref<HTMLDivElement | null>;
  moveChange: (event: MouseEvent, status: boolean, isVertical: boolean) => void;
}
