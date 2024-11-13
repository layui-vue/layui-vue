import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import LaySegmented from "../index.vue";
import { nextTick } from "vue";

describe("LaySegmented", () => {
  test("render", async () => {
    const wrapper = mount(LaySegmented, {
      props: {
        modelValue: "A",
        options: ["A", "B", "C"],
      },
    });

    const component = wrapper.findComponent(LaySegmented);
    expect(component.exists()).toBe(true);
    await nextTick();
    expect(component.findAll(".layui-segmented-item-label").length).toBe(3);
  });

  test("modelValue 改变", async () => {
    const wrapper = mount(LaySegmented, {
      props: {
        modelValue: "A",
        options: ["A", "B", "C"],
      },
    });

    const component = wrapper.findComponent(LaySegmented);
    await wrapper.setProps({ modelValue: "B" });
    await nextTick();
    expect(component.props("modelValue")).toBe("B");
  });

  test("options 改变", async () => {
    const wrapper = mount(LaySegmented, {
      props: {
        modelValue: "A",
        options: ["A", "B", "C"],
      },
    });

    const component = wrapper.findComponent(LaySegmented);
    await wrapper.setProps({ options: [{ label: "A" }, { label: "B" }] });
    await nextTick();
    expect(component.findAll(".layui-segmented-item-label").length).toBe(2);
  });

  test("form 表单形式", async () => {
    const wrapper = mount(LaySegmented, {
      props: {
        modelValue: "A",
        options: ["A", "B", "C"],
        name: "formRadio",
      },
    });

    const component = wrapper.findComponent(LaySegmented);
    expect(component.exists()).toBe(true);
    await nextTick();
    expect(component.findAll(".layui-segmented-item-label").length).toBe(3);
    expect(component.find("input").attributes("name")).toBe("formRadio");
    expect(component.findAll("input").length).toBe(3);
    expect(component.findAll("input")[0].attributes("value")).toBe("A");
    expect(component.find("input").element.checked).toBe(true);
  });

  test("disabled 禁用", async () => {
    const wrapper = mount(LaySegmented, {
      props: {
        modelValue: "A",
        options: ["A", "B", "C"],
        disabled: true,
      },
    });

    const component = wrapper.findComponent(LaySegmented);
    expect(component.exists()).toBe(true);
    await nextTick();
    expect(
      component.element.classList.contains("layui-segmented-disabled")
    ).toBe(true);
  });
});
