import type { InjectionKey } from "vue";
import type { AvatarListProps } from "./interface";

export const AVATAR_LIST_CONTEXT: InjectionKey<AvatarListProps> = Symbol("LayAvatar");
