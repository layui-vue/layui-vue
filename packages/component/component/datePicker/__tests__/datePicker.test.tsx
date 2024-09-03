import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, test } from "vitest";

import LayDatePicker from "../index.vue";
import { nextTick } from "vue";

describe("LayDatePicker", () => {
  afterEach(() => {
    const popperDom = document.body.querySelector(".layui-popper");
    if (popperDom) {
      popperDom.remove();
    }
  });

  test("modelValue", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        modelValue: "2024/10/01 10:00:00",
      },
    });

    const component = wrapper.findComponent(LayDatePicker);
    await nextTick();
    expect((component.props() as any).modelValue).toBe("2024/10/01 10:00:00");
    expect((component.vm as any).currentYear).toBe(2024);
    expect((component.vm as any).currentMonth).toBe(10 - 1);
    expect((component.vm as any).currentDay).toBe(
      new Date("2024/10/01 00:00:00").getTime()
    );
  });

  test("modelValue 修改", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        modelValue: "2024/10/01 10:00:00",
      },
    });

    const component = wrapper.findComponent(LayDatePicker);
    await nextTick();
    wrapper.setProps({
      modelValue: "2024/10/02 10:00:00",
    });
    await nextTick();
    expect((component.props() as any).modelValue).toBe("2024/10/02 10:00:00");
    expect((component.vm as any).currentYear).toBe(2024);
    expect((component.vm as any).currentMonth).toBe(10 - 1);
    expect((component.vm as any).currentDay).toBe(
      new Date("2024/10/02 00:00:00").getTime()
    );
  });

  test("modelValue 负数时间", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        modelValue: "1970/01/01 00:00:00",
      },
    });

    const component = wrapper.findComponent(LayDatePicker);
    await nextTick();
    expect((component.props() as any).modelValue).toBe("1970/01/01 00:00:00");
    expect((component.vm as any).currentYear).toBe(1970);
    expect((component.vm as any).currentMonth).toBe(1 - 1);
    expect((component.vm as any).currentDay).toBe(
      new Date("1970/01/01 00:00:00").getTime()
    );
  });

  test("timestamp 负数时间", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        timestamp: true,
        modelValue: -1,
      },
    });

    const component = wrapper.findComponent(LayDatePicker);
    await nextTick();
    expect((component.vm as any).currentYear).toBe(1970);
    expect((component.vm as any).currentMonth).toBe(1 - 1);
    expect((component.vm as any).currentDay).toBe(
      new Date("1970/01/01 00:00:00").getTime()
    );
  });

  test("format", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        modelValue: "2024/10/01 10:00:00",
        format: "MM-dd",
      },
    });

    const component = wrapper.findComponent(LayDatePicker);
    await nextTick();
    expect((component.vm as any).currentYear).toBe(2024);
    expect((component.vm as any).currentMonth).toBe(10 - 1);
    expect((component.vm as any).currentDay).toBe(
      new Date("2024/10/01 00:00:00").getTime()
    );
  });
});
