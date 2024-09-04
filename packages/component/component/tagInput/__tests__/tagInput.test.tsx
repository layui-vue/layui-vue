import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { nextTick } from "vue";
import { sleep } from "../../../test-utils";

import LayTagInput from "../index.vue";

describe("LayTagInput", () => {
  test("render", async () => {
    const wrapper = mount(LayTagInput, {
      props: {
        modelValue: ["A", "B", "C"],
      },
    });

    const component = wrapper.findComponent(LayTagInput);
    expect(component.exists()).toBe(true);
    await nextTick();
    expect(component.findAll(".layui-tag-text").length).toBe(3);
  });

  test("modelValue 修改", async () => {
    const wrapper = mount(LayTagInput, {
      props: {
        modelValue: ["A", "B", "C"],
      },
    });

    const component = wrapper.findComponent(LayTagInput);
    expect(component.exists()).toBe(true);
    await nextTick();
    expect(component.findAll(".layui-tag-text").length).toBe(3);
    wrapper.setProps({
      modelValue: ["A", "B", "C", "D"],
    });
    await nextTick();
    expect(component.findAll(".layui-tag-text").length).toBe(4);
  });

  test("max 限制最大标签数", async () => {
    const wrapper = mount(LayTagInput, {
      props: {
        modelValue: ["A", "B", "C"],
        max: 2,
      },
    });

    const component = wrapper.findComponent(LayTagInput);
    expect(component.exists()).toBe(true);
    await nextTick();
    expect((component.vm as any).normalizedTags.length).toBe(2);
  });

  test("addTag 增加Tag", async () => {
    const wrapper = mount(LayTagInput, {
      props: {
        modelValue: [],
        inputValue: "",
      },
    });

    const component = wrapper.findComponent(LayTagInput);
    const inputInstance = component.find("input");
    expect(component.exists()).toBe(true);
    expect(inputInstance.exists()).toBe(true);
    await nextTick();
    wrapper.setProps({
      inputValue: "A",
    });
    await nextTick();
    inputInstance.trigger("keydown.enter");
    await nextTick();
    expect(
      (component.emitted("update:modelValue")![0][0] as Array<string>)!.length
    ).toBe(1);
  });

  test("deleteTag 删除Tag", async () => {
    const wrapper = mount(LayTagInput, {
      props: {
        modelValue: ["A", "B"],
      },
    });

    const component = wrapper.findComponent(LayTagInput);
    const inputInstance = component.find("input");
    expect(component.exists()).toBe(true);
    expect(inputInstance.exists()).toBe(true);
    await nextTick();
    expect(component.findAll(".layui-tag-text").length).toBe(2);
    component.find(".layui-tag-close-icon").trigger("click");
    await nextTick();
    expect(component.emitted("update:modelValue")?.length).toBe(1);
  });

  test("deleteInputValue 删除输入值但不删除Tag", async () => {
    const wrapper = mount(LayTagInput, {
      props: {
        modelValue: ["A", "B"],
        inputValue: "123",
      },
    });

    const component = wrapper.findComponent(LayTagInput);
    const inputInstance = component.find("input");
    expect(component.exists()).toBe(true);
    expect(inputInstance.exists()).toBe(true);
    await nextTick();
    expect(component.findAll(".layui-tag-text").length).toBe(2);
    inputInstance.setValue("12");
    inputInstance.element.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Backspace" })
    );
    await nextTick();
    expect((component.vm as any).tagData.length).toBe(2);
    expect(
      (component.emitted("update:inputValue")![0] as Array<string>)!.at(0)
    ).toBe("12");
  });
});
