import type { Ref, InjectionKey } from "vue";
import { inject } from "vue";

type InjectionKeyType = {
  inputEl?: Ref<HTMLInputElement | null>;
  setInputEl?: (inputEl: HTMLInputElement) => void;
};

export const LAYUI_TREE_SELECT: InjectionKey<InjectionKeyType> =
  Symbol("layui-tree-select");

export const useTreeSelectProvide = () => inject(LAYUI_TREE_SELECT, {});
