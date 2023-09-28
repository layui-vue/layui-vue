/*
 * @Author: baobaobao
 * @Date: 2023-09-28 12:54:28
 * @LastEditTime: 2023-09-28 17:49:06
 * @LastEditors: baobaobao
 */
import { Ref, computed, ref, useSlots, watch, shallowRef, nextTick, getCurrentInstance, toRef } from "vue";
import { on, off } from "evtd";
import { handle_select, makeDots } from "./utils/index";

export const useSlider = (props: any, emit: any) => {
  let standard_style: Ref<number> = ref<number>(props.val as number);
  const tooptipHide = ref<boolean>(true);
  const tracker = ref<HTMLElement | null>(null);
  const tooltipRefEl = shallowRef<any>(undefined);
  let rv = toRef(props, "rangeValue");
  const isDark = ref(props.isDark)
  const IS_FORMATFN = computed(() => props.formatTooltip instanceof Function)
  const formatValue = computed(() => {
    return (IS_FORMATFN.value && props.val ?
      props.formatTooltip(props.val) :
      props.val)
  })
  const formatRangeValue = (val: number) => {
    if (IS_FORMATFN.value && props.val) {
      return props.formatTooltip(val)
    }
    return val
  }
  const dots = makeDots(props);
  let currbtn = -1;
  watch(() => props.isDark, () => {
    isDark.value = props.isDark
  })
  function calcWithStep(
    rate: number | undefined,
    val: Ref<number> | Ref<number[]>
  ) {
    if (typeof rate === "undefined") return false;

    if (typeof val.value === "number") {
      let r = rate - val.value;
      if (Math.abs(r) < props.step) {
        return false;
      }

      if (props.step === 0) val.value = Math.floor(rate);

      if (r < 0 && props.step !== 0) {
        val.value -= props.step;
      } else {
        val.value += props.step;
      }
    }
  }

  function calcWithStepRange(
    rate: number | undefined,
    val: Ref<number> | Ref<number[]>,
    idx: number = -1
  ) {
    if (typeof rate === "undefined") return false;

    if (typeof val.value === "object") {
      let r = rate - val.value[idx];
      if (Math.abs(r) < props.step) {
        return false;
      }

      if (props.step === 0) val.value[idx] = Math.floor(rate);

      if (Array.isArray(val.value)) {
        if (r < 0 && props.step !== 0) {
          val.value[idx] -= props.step;
        } else {
          val.value[idx] += props.step;
        }
        cross(val);
      }
    }
  }
  function handle_mouseup() {
    currbtn = -1;
    off("selectstart", document, handle_select);
    off("mouseup", window, handle_mouseup);
    off("mousemove", window, handleMove);
    off("mousedown", window, handleMove);
    tooptipHide.value = true;
  }

  function handle_mousedown() {
    on("selectstart", window, handle_select, { once: true });
    // on("click", window, handleMove);
    on("mouseup", window, handle_mouseup);
    on("mousemove", window, handleMove);
    // on("click", window, handleMove);

  }

  function sliderClick(e) {
    on("selectstart", window, handle_select, { once: true });
    on("mouseup", window, handle_mouseup);

    on("mousedown", window, handleMove);

  }

  async function handleMove(e: MouseEvent) {
    tooptipHide.value = false;
    if (!tracker.value) {
      return;
    }
    let tracker_rect = tracker.value.getBoundingClientRect();
    let origin_position = tracker_rect.left
    let point_position = e.clientX;

    let distance = point_position - origin_position;
    if (props.vertical) {
      origin_position = tracker_rect.bottom
      point_position = e.clientY;
      distance = (point_position - origin_position) * -1
    }

    if (props.range) {
      if (distance < 0) {
        rv.value[0] = props.min;
      } else {
        let rate =
          props.min + (distance / tracker_rect.width) * (props.max - props.min);
        if (props.vertical) {
          rate =
            props.min + (distance / tracker_rect.height) * (props.max - props.min);
        }
        let idx = -1;
        if (currbtn === -1) {
          currbtn = moveNeighbors(Math.floor(rate), rv);
          idx = currbtn;
        } else {
          idx = currbtn;
        }
        calcWithStepRange(rate, rv, idx);
        if (rv.value[1] > props.max) {
          rv.value[1] = props.max;
        }
        if (rv.value[0] < props.min) {
          rv.value[0] = props.min;
        }
      }
      return
    }

    if (distance < 0) {
      standard_style.value = props.min;
    } else {
      let rate =
        props.min + (distance / tracker_rect.width) * (props.max - props.min);
      if (props.vertical) {
        rate = props.min + (distance / tracker_rect.height) * (props.max - props.min);
      }
      calcWithStep(rate, standard_style);
      if (standard_style.value > props.max) {
        standard_style.value = props.max;
      }
    }
    emit("link-val-hook", standard_style.value, tracker);
    await nextTick()
    tooltipRefEl.value!.update()
  }
  const focusDot = (val: number) => {
    if (props.range) {
      let currbtn = moveNeighbors(val, rv);
      rv.value[currbtn] = val;
      emit("link-val-hook", rv.value);
      return;
    }
    emit("link-val-hook", val);
  };
  function cross(val: any) {
    if (val.value[0] > val.value[1]) {
      let tmp = val.value[0];
      val.value[0] = val.value[1];
      val.value[1] = tmp;
      currbtn = currbtn === 0 ? 1 : 0;
    }
  }
  function moveNeighbors(rate: number, rangeValues: any) {
    let d1 = Math.abs(rate - rangeValues.value[0]);
    let d2 = Math.abs(rate - rangeValues.value[1]);
    if (d1 > d2) {
      return 1;
    } else {
      return 0;
    }
  }
  return {
    calcWithStep,
    handle_mouseup,
    handle_mousedown,
    sliderClick,
    handleMove,
    tooltipRefEl,
    tracker,
    formatValue,
    tooptipHide,
    dots,
    focusDot,
    rv,
    formatRangeValue,
    isDark
  }
}