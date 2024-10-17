import { nextTick, ref } from "vue";
import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import { sleep } from "../../../test-utils";

import type { PopperTrigger } from "../index";

import LayPopper from "../popper.vue";

describe("LayPopper", () => {
  test("嵌套popper/dropdown 点击子级不关闭整体", async () => {
    const modelValue1 = ref(false);
    const modelValue2 = ref(false);

    const wrapper = mount({
      setup() {
        return () => (
          <LayPopper
            trigger="click"
            v-model={modelValue1.value}
            v-slots={{
              default: () => <div class="p1">p1</div>,
              content: () => (
                <div>
                  <div class="p1-content">p1-content</div>
                  <LayPopper
                    trigger="click"
                    v-model={modelValue2.value}
                    v-slots={{
                      default: () => <div class="p2">p2</div>,
                      content: () => <div class="p2-content">p2-content</div>,
                    }}
                  ></LayPopper>
                </div>
              ),
            }}
          ></LayPopper>
        );
      },
    });

    const p1Dom = wrapper.find(".p1");

    // 未触发click poppper.modelValue未false
    expect(modelValue1.value).toBeFalsy();
    await p1Dom.trigger("click");
    await nextTick();
    await sleep();
    expect(modelValue1.value).toBe(true);

    const p2Dom = document.body.querySelector(".p2");
    expect(p2Dom?.innerHTML).toBe("p2");

    expect(modelValue2.value).toBeFalsy();
    await p2Dom?.dispatchEvent(new Event("click"));
    await nextTick();
    await sleep();
    expect(modelValue2.value).toBe(true);

    const p2ContentDom = document.querySelector(".p2-content");
    expect(p2ContentDom?.innerHTML).toBe("p2-content");

    // 模拟点击内部popper 外部popper的状态需要依旧为true
    await p2ContentDom?.dispatchEvent(new Event("click"));
    await nextTick();
    await sleep(200);
    expect(modelValue1.value).toBe(true);

    // 模拟点击外部popper 内部popper状态关闭
    const p1ContentDom = document.querySelector(".p1-content");
    await p1ContentDom?.dispatchEvent(new Event("click"));
    await nextTick();
    await sleep(200);
    expect(modelValue2.value).toBeFalsy();
  });
});
