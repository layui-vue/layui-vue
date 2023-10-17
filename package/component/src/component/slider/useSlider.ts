/*
 * @Author: baobaobao
 * @Date: 2023-10-06 13:58:41
 * @LastEditTime: 2023-10-13 22:27:29
 * @LastEditors: baobaobao
 */

import {
  InjectionKey,
  computed,
  inject,
  reactive,
  ref,
  toRefs,
  watch,
  onMounted,
  ComputedRef,
} from "vue";
import { SliderProps } from "./types/sliderType";

export const LAYUI_SLIDER_KEY: InjectionKey<any> = Symbol("layui-slider");
export const useSliderProvide = () => inject(LAYUI_SLIDER_KEY, {});

export const useSlider = (
  props: SliderProps,
  emit: any,
  getSortMarks: ComputedRef<number[]>
) => {
  const initVal = reactive({
    firstVal: props.min,
    secondVal: props.max,
  });
  const tooltipProp = reactive<Record<string, boolean | string>>({
    isCanHide: true,
    disabled: false,
    placement: "top",
    isDark: false,
  });
  const laySliderBar1 = ref<any>(null);
  const laySliderBar2 = ref<any>(null);
  const dragging = ref(false);
  const slider = ref<HTMLElement | null>(null);
  onMounted(() => {
    initValidate();
  });
  const barStyle = computed(() => {
    const maxCalc = `${
      (Math.abs(maxValue.value - minValue.value) / (props.max - props.min)) *
      100
    }`;
    const minCalc = `${
      (Math.abs(minValue.value - props.min) / (props.max - props.min)) * 100
    }`;
    if (props.range) {
      if (props.vertical) {
        return {
          [props.reverse ? "top" : "bottom"]: `${minCalc}%`,
          height: `${maxCalc}%`,
        };
      }
      return {
        width: `${maxCalc}%`,
        [props.reverse ? "right" : "left"]: `${minCalc}%`,
      };
    } else {
      if (props.vertical) {
        return {
          [props.reverse ? "top" : "bottom"]: "0%",
          height: `${minCalc}%`,
        };
      }
      return {
        width: `${minCalc}%`,
        [props.reverse ? "right" : "left"]: "0%",
      };
    }
  });
  const minValue = computed(() => {
    return Math.min(initVal.firstVal, initVal.secondVal);
  });
  const maxValue = computed(() => {
    return Math.max(initVal.firstVal, initVal.secondVal);
  });
  const getStop = computed(() => {
    const stop = (props.max - props.min) / props.step;
    const getAllStop = Array.from({ length: stop - 1 }).map(
      (_, index) => (index + 1) * props.step
    );
    if (props.range) {
      return getAllStop.filter((e) => e >= props.min && e <= props.max);
      // || e >= (100 * (maxValue.value - props.min) / (props.max - props.min)))
    }
    return getAllStop.filter((e) => e >= props.min && e <= props.max);
  });
  watch(
    () => props.tooltipProps,
    () => {
      if (props.tooltipProps) {
        for (const key in props.tooltipProps) {
          if (key in tooltipProp) {
            tooltipProp[key] = props.tooltipProps[key];
          }
        }
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );
  watch(
    () => initVal,
    (val) => {
      if (props.range) {
        emit("update:modelValue", [minValue.value, maxValue.value]);
        emit("update:rangeValue", [minValue.value, maxValue.value]);
        emit("change", [minValue.value, maxValue.value]);
      } else {
        emit("update:modelValue", minValue.value);
        emit("change", minValue.value);
      }
    },
    {
      deep: true,
    }
  );
  watch(
    () => dragging,
    (val) => {
      if (!val.value) {
        if (props.range) {
          const modelValue = props.modelValue
            ? props.modelValue
            : props.rangeValue;
          if (Array.isArray(modelValue) && modelValue.length > 0) {
            initVal.firstVal = modelValue[0];
            initVal.secondVal = modelValue[1];
          }
        } else {
          emit("update:modelValue", minValue.value);
        }
      }
    },
    {
      deep: true,
    }
  );
  watch(
    () => [props.modelValue, props.rangeValue],
    (vals, oldVal) => {
      const modelValue = props.modelValue ? vals[0] : vals[1];
      const oldValue = props.modelValue ? oldVal[0] : oldVal[1];
      if (
        dragging.value ||
        (Array.isArray(modelValue) &&
          Array.isArray(oldValue) &&
          modelValue.every((item, index) => item === oldValue[index]))
      ) {
        return;
      }
      initValidate();
    }
  );
  watch(
    () => [props.min, props.max],
    () => {
      if (
        typeof props.min !== "number" ||
        typeof props.max !== "number" ||
        isNaN(props.min) ||
        isNaN(props.max)
      ) {
        throw new Error("max与min应为数值!");
        return;
      }
      if (props.max < props.min) {
        throw new Error("max请大于min!");
        return;
      }
    }
  );
  const setPos = (pos: number) => {
    if (props.range) {
      if (
        Math.abs(initVal.firstVal - pos) > Math.abs(initVal.secondVal - pos)
      ) {
        initVal.secondVal > initVal.firstVal
          ? laySliderBar2.value.setUpDatePos(pos)
          : laySliderBar1.value.setUpDatePos(pos);
      } else {
        initVal.secondVal < initVal.firstVal
          ? laySliderBar2.value.setUpDatePos(pos)
          : laySliderBar1.value.setUpDatePos(pos);
      }
    } else {
      laySliderBar1.value.setUpDatePos(pos);
    }
  };
  const calcInterval = (value: number) => {
    let rangeData: number[] = [];
    for (let i = 0; i < getSortMarks.value.length - 1; i++) {
      if (
        value >= getSortMarks.value[i] &&
        value <= getSortMarks.value[i + 1]
      ) {
        rangeData = [getSortMarks.value[i], getSortMarks.value[i + 1]];
      }
    }
    if (rangeData && rangeData.length > 1) {
      return value < (rangeData[0] + rangeData[1]) / 2
        ? rangeData[0]
        : rangeData[1];
    }
    return value;
  };
  const getCalcPos = (e: MouseEvent) => {
    let domPos = slider.value!.getBoundingClientRect();
    const GETDOM_VALUE_H = props.reverse ? domPos.right : domPos.left;
    const GETDOM_VALUE_V = props.reverse ? domPos.top : domPos.bottom;
    let diff = (e.clientX - GETDOM_VALUE_H) * (props.reverse ? -1 : 1);
    if (props.vertical) {
      diff = (e.clientY - GETDOM_VALUE_V) * (props.reverse ? 1 : -1);
    }
    let pos = (diff / (props.vertical ? domPos.height : domPos.width)) * 100;
    if (pos > 100) {
      pos = 100;
    }
    if (pos < 0) {
      pos = 0;
    }
    const isSatisfy = props.isFollowMark && getSortMarks.value.length > 0;
    const lengthPerStep =
      100 / ((props.max - props.min) / (isSatisfy ? 1 : props.step));
    const steps = Math.round(pos / lengthPerStep);
    if (isSatisfy) {
      return calcInterval(steps * props.step + props.min);
    }
    // console.log(lengthPerStep, 'lengthPerStep')
    // let value = steps * lengthPerStep * (props.max - props.min) * 0.01 + props.min
    // console.log(value)
    // let value = (Math.round(pos * (props.max - props.min) + props.min))  + props.step
    // console.log('value', value)
    // console.log(value  + lengthPerStep)
    return steps * props.step + props.min;
  };
  const handClick = async (e: MouseEvent) => {
    if (dragging.value || props.disabled) return;
    const getNewPos = getCalcPos(e);
    setPos(getNewPos);
  };
  const dotStyle = (dot: number) => {
    return props.vertical
      ? {
          bottom: `${dot}%`,
        }
      : { left: `${dot}%` };
  };
  const updateDragging = (val: boolean) => {
    dragging.value = val;
  };

  const initValidate = () => {
    if (props.range) {
      const modelValue = props.modelValue ? props.modelValue : props.rangeValue;
      if (Array.isArray(modelValue)) {
        let firstVal = Math.min(
          Math.max(props.min, modelValue[0] ? modelValue[0] : props.min),
          props.max
        );
        let secondVal = Math.min(
          Math.max(props.min, modelValue[1] ? modelValue[1] : props.min),
          props.max
        );
        initVal.firstVal = firstVal;
        initVal.secondVal = secondVal;
      } else {
        initVal.firstVal = props.min;
        initVal.secondVal = props.max;
      }
    } else {
      if (typeof props.modelValue !== "number") {
        initVal.firstVal = props.min;
      } else {
        initVal.firstVal = Math.min(
          props.max,
          Math.max(props.min, props.modelValue)
        );
      }
    }
  };
  return {
    handClick,
    barStyle,
    getStop,
    dotStyle,
    laySliderBar1,
    laySliderBar2,
    slider,
    getCalcPos,
    updateDragging,
    tooltipProp,
    ...toRefs(initVal),
  };
};
