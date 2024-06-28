import type { VNodeTypes } from "vue";
import type { PropsContentType } from "../types";

export const renderContent = function (content: PropsContentType): VNodeTypes {
  if (typeof content === "function") {
    return (content as () => VNodeTypes)();
  }
  return content;
};
