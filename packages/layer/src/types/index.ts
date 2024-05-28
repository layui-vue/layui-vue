import type { StyleValue } from "vue";

export type StringObject = Record<string, unknown>;

export type InstallOptions = StringObject;

export type BtnType = {
  text: string;
  style?: string | StyleValue;
  class?: string;
  disabled?: boolean;
  callback: (id: string) => void;
};
