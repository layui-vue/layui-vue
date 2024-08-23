import { ref } from "vue";
import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import LayRadioButton from "../index.vue";
import LayRadioGroup from "../../radioGroup/index.vue";

describe("LayRadioButton", () => {
  test("radioButton 基础使用", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref("");

        return () => (
          <div>
            <LayRadioButton value={1} v-model={value1.value}>
              写作
            </LayRadioButton>
            <LayRadioButton value={2} v-model={value1.value}>
              画画
            </LayRadioButton>
            <LayRadioButton value={3} v-model={value1.value}>
              运动
            </LayRadioButton>
          </div>
        );
      },
    });

    const radioComponents = wrapper.findAllComponents(LayRadioButton);

    await radioComponents[0].find(".layui-btn").trigger("click");
    expect(radioComponents[0].props("modelValue")).toBe(1);

    await radioComponents[1].find(".layui-btn").trigger("click");
    expect(radioComponents[0].props("modelValue")).toBe(2);
  });

  test("radioButton disabled", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref("");

        return () => (
          <div>
            <LayRadioButton value={1} v-model={value1.value}>
              写作
            </LayRadioButton>
            <LayRadioButton value={2} v-model={value1.value} disabled={true}>
              画画
            </LayRadioButton>
            <LayRadioButton value={3} v-model={value1.value}>
              运动
            </LayRadioButton>
          </div>
        );
      },
    });

    const radioComponents = wrapper.findAllComponents(LayRadioButton);

    await radioComponents[0].find(".layui-btn").trigger("click");
    expect(radioComponents[0].props("modelValue")).toBe(1);

    await radioComponents[1].find(".layui-btn").trigger("click");
    expect(radioComponents[0].props("modelValue")).toBe(1);
  });

  test("radioButton 单向数据流", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(0);

        return () => (
          <div>
            <LayRadioButton value={1} modelValue={value1.value}>
              写作
            </LayRadioButton>
            <LayRadioButton value={2} modelValue={value1.value}>
              画画
            </LayRadioButton>
            <LayRadioButton value={3} modelValue={value1.value}>
              运动
            </LayRadioButton>
          </div>
        );
      },
    });

    const radioComponents = wrapper.findAllComponents(LayRadioButton);

    await radioComponents[0].find(".layui-btn").trigger("click");
    expect(radioComponents[0].props("modelValue")).toBe(0);

    await radioComponents[1].find(".layui-btn").trigger("click");
    expect(radioComponents[0].props("modelValue")).toBe(0);
  });

  test("radioButton group 基础使用", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(1);

        return () => (
          <LayRadioGroup v-model={value1.value}>
            <LayRadioButton value={1}>写作</LayRadioButton>
            <LayRadioButton value={2}>画画</LayRadioButton>
            <LayRadioButton value={3}>运动</LayRadioButton>
          </LayRadioGroup>
        );
      },
    });

    const radioGroupComponents = wrapper.findComponent(LayRadioGroup);
    const radioComponents = wrapper.findAllComponents(LayRadioButton);

    await radioComponents[1].find(".layui-btn").trigger("click");

    expect(radioGroupComponents.props("modelValue")).toBe(2);
  });

  test("radioButton group disabled", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(1);

        return () => (
          <LayRadioGroup v-model={value1.value} disabled={true}>
            <LayRadioButton value={1}>写作</LayRadioButton>
            <LayRadioButton value={2}>画画</LayRadioButton>
            <LayRadioButton value={3}>运动</LayRadioButton>
          </LayRadioGroup>
        );
      },
    });

    const radioGroupComponents = wrapper.findComponent(LayRadioGroup);
    const radioComponents = wrapper.findAllComponents(LayRadioButton);

    await radioComponents[1].find(".layui-btn").trigger("click");
    expect(radioGroupComponents.props("modelValue")).toBe(1);

    await radioComponents[2].find(".layui-btn").trigger("click");
    expect(radioGroupComponents.props("modelValue")).toBe(1);
  });

  test("radioButton group 单向数据流", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(1);

        return () => (
          <LayRadioGroup modelValue={value1.value}>
            <LayRadioButton value={1}>写作</LayRadioButton>
            <LayRadioButton value={2}>画画</LayRadioButton>
            <LayRadioButton value={3}>运动</LayRadioButton>
          </LayRadioGroup>
        );
      },
    });

    const radioGroupComponents = wrapper.findComponent(LayRadioGroup);
    const radioComponents = wrapper.findAllComponents(LayRadioButton);

    await radioComponents[1].find(".layui-btn").trigger("click");

    expect(radioGroupComponents.props("modelValue")).toBe(1);
  });

  test("radioButton group change事件", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(1);

        return () => (
          <LayRadioGroup modelValue={value1.value}>
            <LayRadioButton value={1}>写作</LayRadioButton>
            <LayRadioButton value={2}>画画</LayRadioButton>
            <LayRadioButton value={3}>运动</LayRadioButton>
          </LayRadioGroup>
        );
      },
    });

    const radioGroupComponents = wrapper.findComponent(LayRadioGroup);
    const radioComponents = wrapper.findAllComponents(LayRadioButton);

    await radioComponents[1].find(".layui-btn").trigger("click");

    expect(radioGroupComponents.emitted()).toHaveProperty("change");
    expect(radioGroupComponents.emitted().change[0]).toEqual([2]);
  });
});
