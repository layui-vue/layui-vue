/*
 * @Author: baobaobao
 * @Date: 2023-04-28 17:16:39
 * @LastEditTime: 2023-05-23 11:36:27
 * @LastEditors: baobaobao
 */
import { mount } from "@vue/test-utils";
import LayCheckCardGroup from "../index.vue";

import { describe, expect, test } from "vitest";

describe("LayCheckCard.vue", () => {
  test("render all test", () => {
    const wrapper = mount(LayCheckCardGroup, {});
    expect(wrapper.find(".layui-checkcard-group").exists()).toBe(true);
    wrapper.unmount();
  });
  test("render disabled test", async () => {
    const wrapper = mount(LayCheckCardGroup, {
      props: {
        disabled: true,
      },
    });

    await wrapper.setProps({ disabled: false });
    expect(wrapper.vm.disabled).toBe(false);
  });
  test("render single test", async () => {
    const wrapper = mount(LayCheckCardGroup, {
      props: {
        single: true,
        modelValue: [1, 2, 3],
      },
    });
    await wrapper.setProps({ single: false });
    await wrapper.setProps({ modelValue: ["10"] });
    expect(wrapper.vm.modelValue).toEqual(["10"]);
    expect(wrapper.vm.single).toBe(false);
  });
  test("render modelValue test", async () => {
    const wrapper = mount(LayCheckCardGroup, {
      props: {
        modelValue: ["1", "2", "3"],
      },
    });
    await wrapper.setProps({ modelValue: ["10"] });
    expect(wrapper.vm.modelValue).toEqual(["10"]);
  });
});
