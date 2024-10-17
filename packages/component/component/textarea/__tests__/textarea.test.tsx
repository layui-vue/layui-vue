import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import LayTextarea from "../index.vue";
import { nextTick } from "vue";

describe("Textarea", () => {
  test("render", async () => {
    const wrapper = mount(LayTextarea, {
      props: {
        modelValue: "hello",
      },
    });

    const component = wrapper.findComponent(LayTextarea);
    expect(component.exists()).toBe(true);
    expect(component.props("modelValue")).toBe("hello");
    expect(component.find("textarea").exists()).toBe(true);
    await nextTick();
    expect(component.find("textarea").element.value).toBe("hello");
  });

  test("render input", async () => {
    const wrapper = mount(LayTextarea, {
      props: {
        modelValue: "hello",
      },
    });

    const component = wrapper.findComponent(LayTextarea);
    const textarea = component.find("textarea");
    expect(component.exists()).toBe(true);
    expect(component.props("modelValue")).toBe("hello");
    expect(textarea.exists()).toBe(true);
    await nextTick();
    textarea.setValue("world");
    await nextTick();
    expect(component.emitted("input")![0][0]).toBe("world");
  });

  test("rows 设置行数", async () => {
    const wrapper = mount(LayTextarea, {
      props: {
        modelValue: "hello",
        rows: 3,
      },
    });

    const component = wrapper.findComponent(LayTextarea);
    const textarea = component.find("textarea");
    expect(component.exists()).toBe(true);
    expect(component.props("modelValue")).toBe("hello");
    expect(textarea.exists()).toBe(true);
    expect(textarea.attributes("rows")).toBe("3");
    await nextTick();
    expect((component.vm as any).styles.height).toBe("76px");
    expect((component.vm as any).styles.maxHeight).toBe("76px");
  });

  test("autosize TextareaAutosizeHeight", async () => {
    const wrapper = mount(LayTextarea, {
      props: {
        modelValue: "hello",
        autosize: { minHeight: 300, maxHeight: 600 },
      },
    });

    const component = wrapper.findComponent(LayTextarea);
    const textarea = component.find("textarea");
    expect(component.exists()).toBe(true);
    expect(component.props("modelValue")).toBe("hello");
    expect(textarea.exists()).toBe(true);
    expect(textarea.attributes("rows")).toBeUndefined();
    await nextTick();
    expect((component.vm as any).styles.height).toBe("300px");
    expect((component.vm as any).styles.maxHeight).toBe("600px");
  });

  test("autosize + rows", async () => {
    const wrapper = mount(LayTextarea, {
      props: {
        modelValue: "hello\nworld\n",
        autosize: { minHeight: 300, maxHeight: 600 },
        rows: 5,
      },
    });

    const component = wrapper.findComponent(LayTextarea);
    const textarea = component.find("textarea");
    expect(component.exists()).toBe(true);
    expect(component.props("modelValue")).toBe("hello\nworld\n");
    expect(textarea.exists()).toBe(true);
    expect(Number(textarea.attributes("rows"))).toBe(5);
  });

  test("autosize TextareaAutosizeRow", async () => {
    const wrapper = mount(LayTextarea, {
      props: {
        modelValue: "hello\nworld\n",
        autosize: { minRow: 3, maxRow: 5 },
      },
    });

    const component = wrapper.findComponent(LayTextarea);
    const textarea = component.find("textarea");
    expect(component.exists()).toBe(true);
    expect(component.props("modelValue")).toBe("hello\nworld\n");
    expect(textarea.exists()).toBe(true);
    await nextTick();
    expect((component.vm as any).styles.height).toBe("76px");
    expect((component.vm as any).styles.maxHeight).toBe("116px");
  });
});
