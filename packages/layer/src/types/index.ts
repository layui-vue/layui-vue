import type { StyleValue, VNodeTypes } from "vue";

export type StringObject = Record<string, unknown>;

export type InstallOptions = StringObject;

export type BtnType = {
  text: string;
  type?: string;
  style?: string | StyleValue;
  class?: string;
  disabled?: boolean;
  callback: (id: string, ...args: any) => void;
};

export type ImgListType = {
  src: string;
  alt?: string;
  thumb?: string;
};

export type PropsContentType = VNodeTypes | (() => VNodeTypes);
