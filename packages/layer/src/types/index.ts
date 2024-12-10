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

type OperateEndReturn = void | [string, string] | undefined;

interface MoveEndFnOptions {
  left: string;
  top: string;
  isMax: boolean;
  isMin: boolean;
}

export type MoveEndFn = (
  id: string,
  options: MoveEndFnOptions
) => OperateEndReturn;

interface ResizeEndFnOptions {
  width: string;
  height: string;
}

export type ResizeEndFn = (
  id: string,
  options: ResizeEndFnOptions
) => OperateEndReturn;
