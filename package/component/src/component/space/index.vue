<script lang="ts">
import "./index.less";
import {
  computed,
  Comment,
  VNode,
  Fragment,
  isVNode,
  createTextVNode,
  StyleValue,
  defineComponent,
  PropType,
  h,
  renderSlot,
} from "vue";

type SpaceSize = "lg" | "md" | "sm" | "xs" | number | string;

export default defineComponent({
  name: "LaySpace",
  props: {
    align: {
      type: String as PropType<"start" | "end" | "center" | "baseline">,
    },
    direction: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "horizontal",
    },
    fill: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [Number, String, Array] as PropType<
        SpaceSize | [SpaceSize, SpaceSize]
      >,
      default: "sm",
    },
    wrap: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { slots }) {
    const computAlign = computed(
      () => props.align ?? (props.direction === "horizontal" ? "center" : "")
    );

    const spaceClass = computed(() => [
      "layui-space",
      {
        [`layui-space-align-${computAlign.value}`]: computAlign.value,
        [`layui-space-${props.direction}`]: props.direction,
        [`layui-space-wrap`]: props.wrap,
        [`layui-space-fill`]: props.fill,
      },
    ]);

    const spaceStyle = computed<StyleValue>(() => {
      const sizeMap = { xs: "4px", sm: "8px", md: "16px", lg: "24px" };
      let gap = "";

      if (Array.isArray(props.size)) {
        gap = props.size
          .map((size) => {
            if (typeof size === "number") {
              return `${size}px`;
            }
            if (typeof size === "string") {
              return sizeMap[size as keyof Omit<SpaceSize, number>] || size;
            }
            return size;
          })
          .join(" ");
      } else if (typeof props.size === "string") {
        gap =
          sizeMap[props.size as keyof Omit<SpaceSize, string | number>] ||
          props.size;
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

    const extractChildren = () => {
      const result: VNode[] = [];
      const children = renderSlot(slots, "default").children;
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

    return () => {
      const children = extractChildren();

      return h(
        "div",
        {
          class: spaceClass.value,
          style: spaceStyle.value,
        },
        children.map((child, index) => {
          return h(
            "div",
            {
              key: child.key ?? `item-${index}`,
              class: "layui-space-item",
              style: itemStyle.value,
            },
            h(child)
          );
        })
      );
    };
  },
});
</script>
