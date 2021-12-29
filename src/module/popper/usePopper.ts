import { h, ref, render, watchEffect, watch } from "vue";
import popper from "./index.vue";
import { once } from "../../tools/domUtil";
const EVENT_MAP: any = {
  hover: "mouseenter",
  click: "click",
};
const usePopper = {
  createPopper(el: HTMLElement, props: any, trigger: string) {
    const _this = this;
    once(el, EVENT_MAP[trigger], () => {
      // TODO 临时解决方案
      const _props: any = { el };
      for (const key in props) {
        _props[key] = ref(props[key]);
      }
      _props.updateVisible = function (val: boolean) {
        _props.visible && (_props.visible.value = val);
      };
      _this.renderPopper(_props);
      watchEffect(() => {
        for (const key in _props) {
          if (key === "visible") {
            continue;
          }
          _props[key].value = props[key];
        }
      });
      watch(
        () => props.visible,
        (val: boolean) => {
          _props.updateVisible(val);
        }
      );
    });
  },
  renderPopper(props: any) {
    const container: HTMLDivElement = document.createElement("div");
    // container.setAttribute("class", "lay-div");
    const node = h(popper, props);
    render(node, container);
    container.firstElementChild &&
      document.body.appendChild(container.firstElementChild);
    return node;
  },
};
export default usePopper;
