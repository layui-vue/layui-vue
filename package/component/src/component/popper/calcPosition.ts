import { Ref } from "vue";
// 计算各个方向位置
const postionFns: any = {
  top(
    el: HTMLElement,
    popper: HTMLElement,
    innnerPosition: Ref,
    called: boolean
  ) {
    let { top, left, bottom } = el.getBoundingClientRect();
    if (
      (top = top - popper.offsetHeight - 6) < 0 &&
      bottom > popper.offsetHeight
    ) {
      innnerPosition.value = "bottom";
      top = bottom;
    } else {
      innnerPosition.value = "top";
    }
    return {
      top: `${top}px`,
      left: `${left - (popper.offsetWidth - el.offsetWidth) / 2}px`,
    };
  },
  bottom(
    el: HTMLElement,
    popper: HTMLElement,
    innnerPosition: Ref,
    called: boolean
  ) {
    let { top, left, bottom } = el.getBoundingClientRect();
    if (window.innerHeight - bottom < popper.offsetHeight + 6) {
      innnerPosition.value = "top";
      bottom = top - popper.offsetHeight - 6;
    } else {
      innnerPosition.value = "bottom";
    }
    return {
      top: `${bottom}px`,
      left: `${left - (popper.offsetWidth - el.offsetWidth) / 2}px`,
    };
  },
  left(
    el: HTMLElement,
    popper: HTMLElement,
    innnerPosition: Ref,
    called: boolean
  ) {
    let { top, left, right } = el.getBoundingClientRect();
    left = left - popper.offsetWidth - 6;
    if (left < 0) {
      innnerPosition.value = "right";
      left = right;
    } else {
      innnerPosition.value = "left";
    }
    return {
      top: `${top - (popper.offsetHeight - el.offsetHeight) / 2}px`,
      left: `${left}px`,
    };
  },
  right(
    el: HTMLElement,
    popper: HTMLElement,
    innnerPosition: Ref,
    called: boolean
  ) {
    let { top, left, right } = el.getBoundingClientRect();
    if (window.innerWidth < right + popper.offsetWidth + 6) {
      innnerPosition.value = "left";
      right = left - popper.offsetWidth - 6;
    } else {
      innnerPosition.value = "right";
    }
    return {
      top: `${top - (popper.offsetHeight - el.offsetHeight) / 2}px`,
      left: `${right}px`,
    };
  },
};
export default postionFns;
