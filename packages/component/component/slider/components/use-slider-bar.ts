/*
 * @Author: baobaobao
 * @Date: 2023-10-06 13:43:22
 * @LastEditTime: 2023-10-20 17:41:56
 * @LastEditors: baobaobao
 */

import { computed, ref, shallowRef, watch, nextTick } from "vue";
import { useSliderProvide } from "../use-slider";
import { SliderBarProps } from "../types/sliderType";

export const useSliderBar = (props: SliderBarProps, emit: any) => {
  const {
    formatTooltip,
    vertical,
    disabled,
    getCalcPos,
    reverse,
    updateDragging,
    min,
    max,
  } = useSliderProvide();
  const tooltip = shallowRef<any>(null);
  const dragging = ref(false);
  const enableFormat = computed(() => {
    return formatTooltip?.value instanceof Function;
  });
  const formatValue = computed(() => {
    return (
      (enableFormat.value && formatTooltip?.value?.(props.modelValue)) ||
      props.modelValue
    );
  });
  const currentPosition = computed(() => {
    return `${
      ((props.modelValue - min.value) / (max.value - min.value)) * 100
    }%`;
  });

  const wrapperStyle = computed(() => {
    return vertical.value
      ? { [reverse.value ? "top" : "bottom"]: currentPosition.value }
      : { [reverse.value ? "right" : "left"]: currentPosition.value };
  });
  watch(
    () => dragging,
    (val) => {
      updateDragging(val.value);
    },
    {
      deep: true,
    }
  );
  const handleDown = (event: MouseEvent) => {
    if (disabled.value) return;
    event.preventDefault();
    dragging.value = true;
    window.addEventListener("mousemove", onDragging);
    window.addEventListener("mouseup", onDragEnd);
  };
  const onDragging = async (e: MouseEvent) => {
    if (dragging.value) {
      const newPos = getCalcPos(e);
      setUpDatePos(newPos);
    }
  };
  const setUpDatePos = async (newPos: number) => {
    emit("update:modelValue", newPos);
    await nextTick();
    tooltip.value?.update();
  };
  const onDragEnd = () => {
    if (dragging.value) {
      setTimeout(() => {
        dragging.value = false;
      }, 0);
      window.removeEventListener("mousemove", onDragging);
      window.removeEventListener("mouseup", onDragEnd);
    }
  };
  return {
    dragging,
    formatValue,
    setUpDatePos,
    wrapperStyle,
    tooltip,
    handleDown,
  };
};
