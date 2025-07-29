import type { AvatarListProps } from "@layui/component/component/avatarList/interface";

export interface AvatarProps extends AvatarListProps {
  src?: string;
  icon?: string;
  alt?: string;
  fallback?: string;
}
