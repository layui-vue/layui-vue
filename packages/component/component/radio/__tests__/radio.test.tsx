import { ref } from "vue";
import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import LayRadio from "../index.vue";
import LayRadioGroup from "../../radioGroup/index.vue";

describe("LayRadio", () => {
  test("radio 基础使用", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref("");

        return () => (
          <div>
            <LayRadio value={1} v-model={value1.value}>
              写作
            </LayRadio>
            <LayRadio value={2} v-model={value1.value}>
              画画
            </LayRadio>
            <LayRadio value={3} v-model={value1.value}>
              运动
            </LayRadio>
          </div>
        );
      },
    });

    const radioComponents = wrapper.findAllComponents(LayRadio);

    await radioComponents[0].find(".layui-form-radio").trigger("click");
    expect(radioComponents[0].props("modelValue")).toBe(1);

    await radioComponents[1].find(".layui-form-radio").trigger("click");
    expect(radioComponents[0].props("modelValue")).toBe(2);
  });

  test("radio disabled", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref("");

        return () => (
          <div>
            <LayRadio value={1} v-model={value1.value}>
              写作
            </LayRadio>
            <LayRadio value={2} v-model={value1.value} disabled={true}>
              画画
            </LayRadio>
            <LayRadio value={3} v-model={value1.value}>
              运动
            </LayRadio>
          </div>
        );
      },
    });

    const radioComponents = wrapper.findAllComponents(LayRadio);

    await radioComponents[0].find(".layui-form-radio").trigger("click");
    expect(radioComponents[0].props("modelValue")).toBe(1);

    await radioComponents[1].find(".layui-form-radio").trigger("click");
    expect(radioComponents[0].props("modelValue")).toBe(1);
  });

  test("radio 单向数据流", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(0);

        return () => (
          <div>
            <LayRadio value={1} modelValue={value1.value}>
              写作
            </LayRadio>
            <LayRadio value={2} modelValue={value1.value}>
              画画
            </LayRadio>
            <LayRadio value={3} modelValue={value1.value}>
              运动
            </LayRadio>
          </div>
        );
      },
    });

    const radioComponents = wrapper.findAllComponents(LayRadio);

    await radioComponents[0].find(".layui-form-radio").trigger("click");
    expect(radioComponents[0].props("modelValue")).toBe(0);

    await radioComponents[1].find(".layui-form-radio").trigger("click");
    expect(radioComponents[0].props("modelValue")).toBe(0);
  });

  test("radio group 基础使用", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(1);

        return () => (
          <LayRadioGroup v-model={value1.value}>
            <LayRadio value={1}>写作</LayRadio>
            <LayRadio value={2}>画画</LayRadio>
            <LayRadio value={3}>运动</LayRadio>
          </LayRadioGroup>
        );
      },
    });

    const radioGroupComponents = wrapper.findComponent(LayRadioGroup);
    const radioComponents = wrapper.findAllComponents(LayRadio);

    await radioComponents[1].find(".layui-form-radio").trigger("click");

    expect(radioGroupComponents.props("modelValue")).toBe(2);
  });

  test("radio group disabled", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(1);

        return () => (
          <LayRadioGroup v-model={value1.value} disabled={true}>
            <LayRadio value={1}>写作</LayRadio>
            <LayRadio value={2}>画画</LayRadio>
            <LayRadio value={3}>运动</LayRadio>
          </LayRadioGroup>
        );
      },
    });

    const radioGroupComponents = wrapper.findComponent(LayRadioGroup);
    const radioComponents = wrapper.findAllComponents(LayRadio);

    await radioComponents[1].find(".layui-form-radio").trigger("click");
    expect(radioGroupComponents.props("modelValue")).toBe(1);

    await radioComponents[2].find(".layui-form-radio").trigger("click");
    expect(radioGroupComponents.props("modelValue")).toBe(1);
  });

  test("radio group 单向数据流", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(1);

        return () => (
          <LayRadioGroup modelValue={value1.value}>
            <LayRadio value={1}>写作</LayRadio>
            <LayRadio value={2}>画画</LayRadio>
            <LayRadio value={3}>运动</LayRadio>
          </LayRadioGroup>
        );
      },
    });

    const radioGroupComponents = wrapper.findComponent(LayRadioGroup);
    const radioComponents = wrapper.findAllComponents(LayRadio);

    await radioComponents[1].find(".layui-form-radio").trigger("click");

    expect(radioGroupComponents.props("modelValue")).toBe(1);
  });

  test("radio group change事件", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(1);

        return () => (
          <LayRadioGroup modelValue={value1.value}>
            <LayRadio value={1}>写作</LayRadio>
            <LayRadio value={2}>画画</LayRadio>
            <LayRadio value={3}>运动</LayRadio>
          </LayRadioGroup>
        );
      },
    });

    const radioGroupComponents = wrapper.findComponent(LayRadioGroup);
    const radioComponents = wrapper.findAllComponents(LayRadio);

    await radioComponents[1].find(".layui-form-radio").trigger("click");

    expect(radioGroupComponents.emitted()).toHaveProperty("change");
    expect(radioGroupComponents.emitted().change[0]).toEqual([2]);
  });
});
