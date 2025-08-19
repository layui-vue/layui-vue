import type { InjectionKey } from "vue";
import { inject } from "vue";

export const LAYUI_PAGE_KEY: InjectionKey<any> = Symbol("layui-page");
export const usePage = () => inject(LAYUI_PAGE_KEY, {});
