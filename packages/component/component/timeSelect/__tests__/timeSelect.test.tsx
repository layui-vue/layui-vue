import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, test } from "vitest";
import { nextTick } from "vue";
import { sleep } from "../../../test-utils";

import LayDropdown from "../../dropdown/index.vue";
import LayTimeSelect from "../index.vue";
import LaySelect from "../../select/index.vue";

describe("TimeSelect", () => {
  afterEach(() => {
    document.querySelectorAll(".layui-popper").forEach((el) => el.remove());
  });

  test("render", async () => {
    const wrapper = mount(LayTimeSelect, {
      props: {
        modelValue: "12:00:00",
      },
    });

    const component = wrapper.getComponent(LayTimeSelect);
    expect(component.find(".layui-input").exists()).toBe(true);
    expect(component.props("modelValue")).toBe("12:00:00");
  });

  test("modelValue 修改", async () => {
    const wrapper = mount(LayTimeSelect, {
      props: {
        modelValue: "12:00:00",
      },
    });

    const component = wrapper.getComponent(LayTimeSelect);
    const dropdownInstance = component.findComponent(LayDropdown);
    const selectInstance = component.findComponent(LaySelect);
    await nextTick();
    expect(dropdownInstance.exists()).toBe(true);
    expect(selectInstance.element).toBeDefined();
    await wrapper.setProps({
      modelValue: "13:00:00",
    });
    await nextTick();
    expect(component.props("modelValue")).toBe("13:00:00");
    expect(selectInstance.props("modelValue")).toBe("13:00:00");
  });

  test("format 修改", async () => {
    const wrapper = mount(LayTimeSelect, {
      props: {
        modelValue: "12:00",
        format: "H:i:s",
        valueFormat: "H:i",
      },
    });

    const component = wrapper.getComponent(LayTimeSelect);
    await nextTick();
    expect(component.props("modelValue")).toBe("12:00");
    await wrapper.setProps({
      valueFormat: "H",
      modelValue: "12",
    });
    await nextTick();
    expect(component.props("modelValue")).toBe("12");
  });

  test("skip 跳过时间点", async () => {
    const wrapper = mount(LayTimeSelect, {
      props: {
        valueFormat: "H:i",
        skip: ["12:00", "12:30"],
      },
    });

    const component = wrapper.getComponent(LayTimeSelect);
    const dropdownInstance = component.findComponent(LayDropdown);
    await nextTick();
    dropdownInstance.vm.show();
    await nextTick();
    await sleep(300);
    expect(
      dropdownInstance
        .findAll(".layui-select-option")
        .filter((el) => ["12:00", "12:30"].includes(el.text())).length
    ).toBe(0);
  });

  test("disabled 禁用", async () => {
    const wrapper = mount(LayTimeSelect, {
      props: {
        disabled: true,
      },
    });

    const component = wrapper.getComponent(LayTimeSelect);
    const dropdownInstance = component.findComponent(LayDropdown);
    await nextTick();
    expect(dropdownInstance.exists()).toBe(true);
    expect(component.props("disabled")).toBe(true);
  });
});
