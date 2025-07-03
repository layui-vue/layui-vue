export interface Message {
  id: number | string;
  direction: MessageDirection;
  type: MessageType;
  content?: string | Blob | File;
  avatar?: string;
  name?: string;
  time?: string;
  backgroundColor?: string;
  textColor?: string;
  icon?: string;
};

export type MessageType = "text" | "image" | "file" | "audio" | "video" | "custom";
export type MessageDirection = "in" | "out" | "system";
