import type { ComponentPublicInstance } from "vue";
import { getNodeName, isNode } from "@layui/component/utils";

/**
 * 判断target是否为组件
 */
function isComponentPublicInstance(
  target: unknown,
): target is ComponentPublicInstance {
  return target != null && typeof target === "object" && "$el" in target;
}

export function unRefRealElement<T>(element: T) {
  if (isComponentPublicInstance(element)) {
    const _el = element.$el as Exclude<T, ComponentPublicInstance>;

    return isNode(_el) && getNodeName(_el) === "#comment" ? null : _el;
  }

  return element as Exclude<T, ComponentPublicInstance>;
}
