<script lang="ts">
export default {
  name: "LaySpace",
};
</script>
<script lang="ts" setup>
import "./index.less";
import {
  computed,
  h,
  useSlots,
  Comment,
  VNode,
  Fragment,
  isVNode,
  createTextVNode,
  VNodeArrayChildren,
  StyleValue,
} from "vue";
import RenderFunction from "../_components/renderFunction";

export type SpaceSize = "lg" | "md" | "sm" | "xs" | number | string;

export interface LaySpaceProps {
  /* 对齐方式 */
  align?: "start" | "end" | "center" | "baseline";
  /* 间距方向 */
  direction?: "horizontal" | "vertical";
  /* 子元素是否填充父容器 */
  fill?: boolean;
  /* 间距大小 */
  size?: SpaceSize | [SpaceSize, SpaceSize];
  /* 是否自动折行 */
  wrap?: boolean;
}

const props = withDefaults(defineProps<LaySpaceProps>(), {
  direction: "horizontal",
  size: "sm",
});

const slots = useSlots();

const computAlign = computed(
  () => props.align ?? (props.direction === "horizontal" ? "center" : "")
);

const extractChildren = () => {
  const result: VNode[] = [];
  const children = slots.default && (slots?.default() as VNodeArrayChildren);
  const elementData = Array.isArray(children) ? [...children] : [];

  while (elementData.length) {
    const vnode = elementData.shift();

    if (vnode === null) continue;

    if (Array.isArray(vnode)) {
      elementData.unshift(...vnode);
    }

    if (!isVNode(vnode) || vnode.type === Comment) continue;

    if (vnode.type === Fragment && Array.isArray(vnode.children)) {
      elementData.unshift(vnode.children);
    } else if (typeof vnode === "string" || typeof vnode === "number") {
      result.push(createTextVNode(vnode));
    } else {
      result.push(vnode);
    }
  }

  return result;
};

const spaceClass = computed(() => [
  "layui-space",
  {
    [`layui-space-align-${props.align}`]: computAlign.value,
    [`layui-space-${props.direction}`]: props.direction,
    [`layui-space-wrap`]: props.wrap,
    [`layui-space-fill`]: props.fill,
  },
]);

const spaceStyle = computed(() => {
  const sizeMap = { xs: "4px", sm: "8px", md: "16px", lg: "24px" };
  let gap = "";

  if (Array.isArray(props.size)) {
    gap = props.size
      .map((size) => {
        if (typeof size === "number") {
          return `${size}px`;
        }
        if (typeof size === "string") {
          return sizeMap[props.size as keyof Omit<SpaceSize, number>] || size;
        }
        return size;
      })
      .join(" ");
  } else if (typeof props.size === "string") {
    gap = sizeMap[props.size as keyof Omit<SpaceSize, string>] || props.size;
  } else if (typeof props.size === "number") {
    gap = `${props.size}px`;
  }

  return {
    gap,
  };
});

const itemStyle = computed<StyleValue>(() => [
  props.fill ? { flexGrow: 1, minWidth: "100%" } : {},
]);

const children = extractChildren();

const renderSpaceItems = () =>
  children.map((child, index) => {
    return h(
      "div",
      {
        class: "layui-space-item",
        style: itemStyle.value,
      },
      h(child)
    );
  });
</script>
<template>
  <div :class="spaceClass" :style="spaceStyle">
    <RenderFunction :renderFunc="renderSpaceItems" />
  </div>
</template>
