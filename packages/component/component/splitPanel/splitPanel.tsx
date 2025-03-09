import {
  type Component,
  type PropType,
  type Ref,
  ref,
  watch,
  provide,
  defineComponent,
} from "vue";
import "./index.less";

import {
  type StepProps,
  type SplitPanelStepsType,
  SPLITPANEL_INJECTION_KEY,
} from "./interface";

import { flattedVNode } from "../../utils";

export default defineComponent({
  name: "LaySplitPanel",
  props: {
    vertical: {
      type: Boolean as PropType<StepProps["vertical"]>,
      default: () => false,
    },
    minSize: {
      type: Number as PropType<StepProps["minSize"]>,
      default: 50,
    },
  },
  setup(props, { slots }) {
    // line el width
    const LINE_WIDTH = 3;

    const target = ref();

    const domEvent = ref();
    const domStatus = ref();

    const handleMousemove = (event: MouseEvent) => {
      const { left: boxLeft, top: boxTop } =
        target.value.getBoundingClientRect();

      if (window.getSelection != undefined) {
        window.getSelection()?.removeAllRanges();
      }
      if (domStatus.value && domEvent.value) {
        if (!props.vertical) {
          baseSetStyleFlexBasis(
            event.clientX - boxLeft,
            domEvent.value.target.previousElementSibling.offsetLeft,
            domEvent.value.target.previousElementSibling.offsetWidth,
            domEvent.value.target.nextElementSibling.offsetWidth,
            target.value.offsetWidth
          );
        } else {
          baseSetStyleFlexBasis(
            event.clientY - boxTop,
            domEvent.value.target.previousElementSibling.offsetTop,
            domEvent.value.target.previousElementSibling.offsetHeight,
            domEvent.value.target.nextElementSibling.offsetHeight,
            target.value.offsetHeight
          );
        }
      }
    };

    const baseSetStyleFlexBasis = (
      currentPoin: number, // 鼠标在当前splitPanel中 offsetLeft | offsetTop
      preDomOffset: number, // 上一个item offsetLeft | offsetTop
      preDomSize: number, // 上一个item offsetWidth | offsetHeight
      nextDomSize: number, // 下一个item offsetWidth | offsetHeight
      boxSize: number // splitPanel容器 offsetWidth | offsetHeight
    ) => {
      const prevDom = domEvent.value.target.previousElementSibling;
      const nextDom = domEvent.value.target.nextElementSibling;

      const otherSize = boxSize - (preDomSize + nextDomSize + LINE_WIDTH);
      const otherSizePercentage =
        ((preDomSize + nextDomSize + LINE_WIDTH) / boxSize) * 100;

      if (
        currentPoin - preDomOffset < props.minSize! ||
        boxSize - (currentPoin - preDomOffset) - otherSize < props.minSize!
      ) {
        return false;
      }

      prevDom.style.flexBasis =
        ((currentPoin - preDomOffset) /
          (preDomSize + nextDomSize + LINE_WIDTH)) *
          otherSizePercentage +
        "%";

      nextDom.style.flexBasis =
        ((boxSize - (currentPoin - preDomOffset) - otherSize) /
          (preDomSize + nextDomSize + LINE_WIDTH)) *
          otherSizePercentage +
        "%";
    };

    const moveChange = (event: MouseEvent) => {
      domEvent.value = event;
      domStatus.value = true;
      target.value.addEventListener("mousemove", handleMousemove);
    };

    const mouseup = () => {
      domEvent.value = null;
      domStatus.value = false;
      target.value.removeEventListener("mousemove", handleMousemove);
    };

    // 定义初始化个数数组
    const steps = ref<SplitPanelStepsType[]>([]);

    // 监听有几个lay-split-panel-item
    watch(
      () => steps.value,
      (newVal) => {
        // 所有设置了space props的总数
        const spaces = newVal
          .filter((step) => step.space)
          .map((step) => step.space);

        const spaceLength = spaces.join(" - ") || "0px";
        const other = newVal.length - spaces.length;

        newVal.forEach((step, index) => {
          step.setIndex(index);

          if (step.space) {
            step.itemEl!.style.flexBasis = `calc(${step.space} - ${LINE_WIDTH}px)`;
          } else {
            // 没有设置space 计算逻辑
            // ((总宽度 - 总spaces) / 没有设置space数量) = 剩下位置平分
            step.itemEl!.style.flexBasis = `calc(((100% - ${spaceLength}) / ${other}) - ${LINE_WIDTH}px)`;
          }
        });
      },
      { flush: "post", deep: true }
    );

    // 向lay-split-panel-item传递参数
    provide(SPLITPANEL_INJECTION_KEY, {
      props: props as Required<StepProps>,
      steps: steps as unknown as Ref<SplitPanelStepsType[]>,
    });

    return () => {
      const itemSlots = !slots.default
        ? []
        : flattedVNode(slots.default())
            ?.filter((slot) => {
              return (slot.type as Component)?.name === "LaySplitPanelItem";
            })
            .map((slot, index) => {
              if (index) {
                return [
                  <div
                    class="lay-split-panel-line"
                    onMousedown={moveChange}
                  ></div>,
                  slot,
                ];
              } else {
                return slot;
              }
            })
            .flat() || [];

      return (
        <div
          ref={target}
          class={[
            "lay-split-panel",
            `lay-split-panel-${props.vertical ? "vertical" : "horizontal"}`,
          ]}
          style={{
            cursor: domStatus.value
              ? !props.vertical
                ? "col-resize"
                : "row-resize"
              : "",
          }}
          onMouseup={mouseup}
        >
          {itemSlots}
        </div>
      );
    };
  },
});
