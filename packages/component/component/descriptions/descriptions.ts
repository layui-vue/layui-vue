import type { InjectionKey } from "vue";

export interface DescriptionsContext {
  border: boolean;
  column: number;
  direction: "horizontal" | "vertical";
  size: "sm" | "md" | "lg";
}

export const DESCRIPTIONS_INJECTION_KEY: InjectionKey<DescriptionsContext> =
  Symbol("LayDescriptions");
