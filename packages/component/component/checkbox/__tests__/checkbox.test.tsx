import { ref } from "vue";
import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import LayCheckbox from "../index.vue";
import LayCheckboxGroup from "../../checkboxGroup/index.vue";

describe("LayCheckbox", () => {
  test("checkbox 基础使用", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref();

        return () => (
          <div>
            <LayCheckbox value={1} v-model={value1.value}>
              写作
            </LayCheckbox>
          </div>
        );
      },
    });

    const checkboxComponents = wrapper.findComponent(LayCheckbox);

    await checkboxComponents.find(".layui-checkbox").trigger("click");
    expect(checkboxComponents.props("modelValue")).toBe(true);

    await checkboxComponents.find(".layui-checkbox").trigger("click");
    expect(checkboxComponents.props("modelValue")).toBe(false);
  });

  test("checkbox disabled", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(true);

        return () => (
          <div>
            <LayCheckbox value={1} v-model={value1.value} disabled={true}>
              写作
            </LayCheckbox>
          </div>
        );
      },
    });

    const checkboxComponents = wrapper.findComponent(LayCheckbox);

    await checkboxComponents.find(".layui-checkbox").trigger("click");
    expect(checkboxComponents.props("modelValue")).toBe(true);

    await checkboxComponents.find(".layui-checkbox").trigger("click");
    expect(checkboxComponents.props("modelValue")).toBe(true);
  });

  test("checkbox 单向数据流", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref();

        return () => (
          <div>
            <LayCheckbox value={1} modelValue={value1.value}>
              写作
            </LayCheckbox>
          </div>
        );
      },
    });

    const checkboxComponents = wrapper.findComponent(LayCheckbox);

    await checkboxComponents.find(".layui-checkbox").trigger("click");
    expect(checkboxComponents.props("modelValue")).toBe(false);
  });

  test("checkbox group 基础使用", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref([1, 2]);

        return () => (
          <LayCheckboxGroup v-model={value1.value}>
            <LayCheckbox value={1}>写作</LayCheckbox>
            <LayCheckbox value={2}>画画</LayCheckbox>
            <LayCheckbox value={3}>运动</LayCheckbox>
          </LayCheckboxGroup>
        );
      },
    });

    const checkboxGroupComponents = wrapper.findComponent(LayCheckboxGroup);
    const checkboxComponents = wrapper.findAllComponents(LayCheckbox);

    await checkboxComponents[1].find(".layui-checkbox").trigger("click");
    expect(checkboxGroupComponents.props("modelValue")).toEqual([1]);

    await checkboxComponents[2].find(".layui-checkbox").trigger("click");
    expect(checkboxGroupComponents.props("modelValue")).toEqual([1, 3]);
  });

  test("checkbox group disabled", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref([1, 2]);

        return () => (
          <LayCheckboxGroup v-model={value1.value} disabled={true}>
            <LayCheckbox value={1}>写作</LayCheckbox>
            <LayCheckbox value={2}>画画</LayCheckbox>
            <LayCheckbox value={3}>运动</LayCheckbox>
          </LayCheckboxGroup>
        );
      },
    });

    const checkboxGroupComponents = wrapper.findComponent(LayCheckboxGroup);
    const checkboxComponents = wrapper.findAllComponents(LayCheckbox);

    await checkboxComponents[1].find(".layui-checkbox").trigger("click");
    expect(checkboxGroupComponents.props("modelValue")).toEqual([1, 2]);

    await checkboxComponents[2].find(".layui-checkbox").trigger("click");
    expect(checkboxGroupComponents.props("modelValue")).toEqual([1, 2]);
  });

  test("checkbox group 单向数据流", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref([1, 2]);

        return () => (
          <LayCheckboxGroup modelValue={value1.value}>
            <LayCheckbox value={1}>写作</LayCheckbox>
            <LayCheckbox value={2}>画画</LayCheckbox>
            <LayCheckbox value={3}>运动</LayCheckbox>
          </LayCheckboxGroup>
        );
      },
    });

    const checkboxGroupComponents = wrapper.findComponent(LayCheckboxGroup);
    const checkboxComponents = wrapper.findAllComponents(LayCheckbox);

    await checkboxComponents[1].find(".layui-checkbox").trigger("click");
    expect(checkboxGroupComponents.props("modelValue")).toEqual([1, 2]);

    await checkboxComponents[2].find(".layui-checkbox").trigger("click");
    expect(checkboxGroupComponents.props("modelValue")).toEqual([1, 2]);
  });
});
