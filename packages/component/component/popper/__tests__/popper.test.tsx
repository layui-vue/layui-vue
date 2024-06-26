import { reactive, nextTick, h } from "vue";
import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";

import type { PopperTrigger } from "../index";

import LayPopper from "../popper.vue";

const wait = (ms = 100) =>
  new Promise((resolve) => setTimeout(() => resolve(0), ms));

const _mount = (props?: any, slots = {}) => {
  return mount(
    {
      setup() {
        const attrs = reactive({
          trigger: "hover" as PopperTrigger,
          ...props,
        });

        return () => (
          <LayPopper {...attrs}>
            <span id="reference"></span>
          </LayPopper>
        );
      },
    },
    {
      slots: {
        content: h("span", { ref: "popperEl" }, "content"),
      },
    }
  );
};

describe("LayPopper", () => {
  test("trigger", async () => {
    const wrapper = _mount();

    await nextTick();
    wrapper.find("#reference").trigger("mouseover");
  });
});
