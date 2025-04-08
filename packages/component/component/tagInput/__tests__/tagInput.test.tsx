import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { nextTick } from "vue";

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
    const inputInstance = component.find("input");
    expect(component.exists()).toBe(true);
    expect(inputInstance.exists()).toBe(true);
    await nextTick();
    expect((component.vm as any).normalizedTags.length).toBe(3);
    wrapper.setProps({
      inputValue: "D",
    });
    await nextTick();
    inputInstance.trigger("keydown.enter");
    await nextTick();
    expect((component.vm as any).tagData.length).toBe(3);
    expect(component.emitted("exceed")![0].at(0)).toBe("D");
  });

  test("checkInputValue 按条件创建标签", async () => {
    const wrapper = mount(LayTagInput, {
      props: {
        modelValue: ["标签1", "标签2"],
        inputValue: "标签3",
        checkInputValue: (value: string) => value.search(/^标签(.+)/g) > -1,
      },
    });

    const component = wrapper.findComponent(LayTagInput);
    const inputInstance = component.find("input");
    expect(component.exists()).toBe(true);
    expect(inputInstance.exists()).toBe(true);
    await nextTick();
    inputInstance.trigger("keydown.enter");
    await nextTick();
    expect(
      (component.emitted("update:modelValue")![0][0] as Array<string>)!.length
    ).toBe(3);
    wrapper.setProps({
      inputValue: "Hello!",
    });
    await nextTick();
    inputInstance.trigger("keydown.enter");
    await nextTick();
    expect(
      (component.emitted("update:modelValue")![0][0] as Array<string>)!.length
    ).toBe(3);
    expect(component.emitted("check-input-value-fail")![0].at(0)).toBe("Hello!");
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
    expect(
      (component.emitted("update:modelValue")![0][0] as Array<string>)!.length
    ).toBe(1);
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

  test("Chinese input test 中文输入测试", async () => {
    const wrapper = mount(LayTagInput, {
      props: {
        modelValue: ["标签1", "标签2"],
        inputValue: "",
      },
    });

    const component = wrapper.findComponent(LayTagInput);
    const inputInstance = component.find("input");
    expect(component.exists()).toBe(true);
    expect(inputInstance.exists()).toBe(true);
    await nextTick();
    expect(component.findAll(".layui-tag-text").length).toBe(2);
    inputInstance.trigger("compositionstart");
    wrapper.setProps({
      inputValue: "H",
    });
    inputInstance.trigger("compositionupdate", { data: "H" });
    await nextTick();
    expect((component.vm as any).compositionValue).toBe("H");
    wrapper.setProps({
      inputValue: "",
    });
    inputInstance.trigger("compositionupdate", { data: "" });
    inputInstance.trigger("keyup.backspace");
    await nextTick();
    inputInstance.trigger("compositionend");
    await nextTick();
    expect((component.vm as any).compositionValue).toBe("");
    expect((component.vm as any).oldCompositionValue).toBe("H");
    expect(component.findAll(".layui-tag-text").length).toBe(2);
  });

  test("inputValue 初始化反填", async () => {
    const wrapper = mount(LayTagInput, {
      props: {
        inputValue: "123",
      },
    });

    const component = wrapper.findComponent(LayTagInput);
    const inputInstance = component.find("input");
    expect(inputInstance.element.value).toBe("123");
  });
});
