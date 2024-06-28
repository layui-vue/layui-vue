/*
 * @Author: baobaobao
 * @Date: 2023-10-27 14:10:55
 * @LastEditTime: 2023-10-27 14:11:59
 * @LastEditors: baobaobao
 */
import { InjectionKey, inject } from "vue";

export const LAYUI_AVATAR_KEY: InjectionKey<any> = Symbol("layui-avatar");
export const useAvatarProvide = () => inject(LAYUI_AVATAR_KEY, {});
