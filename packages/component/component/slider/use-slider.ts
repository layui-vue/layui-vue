/*
 * @Author: baobaobao
 * @Date: 2023-10-06 13:58:41
 * @LastEditTime: 2023-11-16 10:35:16
 * @LastEditors: baobaobao
 */

import type {
  SliderTooltipProps,
  DefaultValueSliderPropsType,
} from "./types/sliderType";
import type { Ref, ToRefs } from "vue";

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
  nextTick,
} from "vue";

type InitValType = {
  firstVal: number;
  secondVal: number;
};

interface SliderContext extends ToRefs<DefaultValueSliderPropsType> {
  tooltipProp: Required<SliderTooltipProps>;
  firstVal: Ref<InitValType["firstVal"]>;
  secondVal: Ref<InitValType["secondVal"]>;
  updateDragging: (v: boolean) => void;
  getCalcPos: (e: MouseEvent) => number;
}

export const LAYUI_SLIDER_KEY: InjectionKey<SliderContext> =
  Symbol("layui-slider");
export const useSliderProvide = () => inject(LAYUI_SLIDER_KEY) as SliderContext;

export const useSlider = (
  props: DefaultValueSliderPropsType,
  emit: any,
  getSortMarks: ComputedRef<number[]>
) => {
  const initVal = reactive<InitValType>({
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
          const _key = key as keyof SliderTooltipProps;

          tooltipProp[_key] = props.tooltipProps[_key]!;
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
      if (val.value) {
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
      // 向下兼容rangeValue
      const modelValue = props.range
        ? Array.isArray(vals[0])
          ? vals[0]
          : vals[1]
        : vals[0];
      const oldValue = props.range
        ? Array.isArray(oldVal[0])
          ? oldVal[0]
          : oldVal[1]
        : oldVal[0];
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
      }
      if (props.max < props.min) {
        throw new Error("max请大于min!");
      }
      initValidate();
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
  const precision = computed(() => {
    const precisions = [props.min, props.max, props.step].map((item) => {
      const decimal = `${item}`.split(".")[1];
      return decimal ? decimal.length : 0;
    });
    return Math.max.apply(null, precisions);
  });
  const getCalcPos = (e: MouseEvent) => {
    const domPos = slider.value!.getBoundingClientRect();
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
    let value = steps * props.step + props.min;
    value = Number.parseFloat(value.toFixed(precision.value));

    if (isSatisfy) {
      return calcInterval(value);
    }
    // console.log(lengthPerStep, 'lengthPerStep')
    // let value = steps * lengthPerStep * (props.max - props.min) * 0.01 + props.min
    // console.log(value)
    // let value = (Math.round(pos * (props.max - props.min) + props.min))  + props.step
    // console.log('value', value)
    // console.log(value  + lengthPerStep)
    return value;
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

  const initValidate = async () => {
    if (props.range) {
      const modelValue = props.modelValue ? props.modelValue : props.rangeValue;
      if (Array.isArray(modelValue)) {
        const firstVal = Math.min(
          Math.max(props.min, modelValue[0] ? modelValue[0] : props.min),
          props.max
        );
        const secondVal = Math.min(
          Math.max(props.min, modelValue[1] ? modelValue[1] : props.min),
          props.max
        );
        initVal.firstVal = firstVal;
        initVal.secondVal = secondVal;
      } else {
        initVal.firstVal = props.min;
        initVal.secondVal = props.max;
        await nextTick();
        emit("update:modelValue", [props.min, props.max]);
      }
    } else {
      if (typeof props.modelValue !== "number") {
        initVal.firstVal = props.min;
      } else {
        initVal.secondVal = props.max;
        initVal.firstVal = Math.min(
          props.max,
          Math.max(props.min, props.modelValue)
        );
      }
      await nextTick();
      emit("update:modelValue", minValue.value);
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
    tooltipProp: tooltipProp as Required<SliderTooltipProps>,
    ...toRefs(initVal),
  };
};
