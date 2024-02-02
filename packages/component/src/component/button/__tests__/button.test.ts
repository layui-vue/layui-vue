import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import LayButton from "../index.vue";

test("测试 button 组件 default 插槽", async () => {
  const wrapper = await mount(LayButton, {
    slots: {
      default: "默认插槽",
    },
  });
  expect(wrapper.text()).toContain("默认插槽");
});

test("测试 button 组件 type 属性", async () => {
  const wrapper = await mount(LayButton, {
    props: {
      type: "primary",
    },
  });
  expect(wrapper.classes("layui-btn-primary")).toBe(true);
});
