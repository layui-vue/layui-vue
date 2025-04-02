import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import { sleep } from "../../../test-utils";

import LayPopConfirm from "../index.vue";

describe("LayPopConfirm", () => {
  test("嵌套popper/dropdown 点击子级不关闭整体", async () => {
    const teleportProps = { to: "body", disabled: true };

    const wrapper = mount(
      {
        setup() {
          return () => (
            <LayPopConfirm
              content="请确认你的操作，流程将结束"
              trigger="click"
              teleportProps={teleportProps}
            >
              <button class="btn_test">1</button>
            </LayPopConfirm>
          );
        },
      },
      { attachTo: document.body }
    );

    const tooltip1 = wrapper.find(".layui-popper");
    expect(tooltip1.exists()).toBeFalsy();

    const btn = wrapper.find(".btn_test");
    await btn.trigger("click");
    await sleep(200);

    const tooltip2 = wrapper.find(".layui-popper");
    expect(tooltip2.exists()).toBeTruthy();
    expect(tooltip2.isVisible()).toBeTruthy();

    const confirmBtn = wrapper.find(".layui-btn-primary");
    await confirmBtn.trigger("click");
    await sleep(200);

    const tooltip3 = wrapper.find(".layui-popper");
    expect(tooltip3.isVisible()).toBeFalsy();
  });
});
