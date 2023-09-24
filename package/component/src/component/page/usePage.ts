/*
 * @Author: baobaobao
 * @Date: 2023-09-22 13:51:50
 * @LastEditTime: 2023-09-22 14:34:21
 * @LastEditors: baobaobao
 */
import { InjectionKey, inject } from "vue";
export const LAYUI_PAGE_KEY: InjectionKey<any> = Symbol("layui-page");
export const usePage = () => inject(LAYUI_PAGE_KEY, {});
