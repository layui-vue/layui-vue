/*
 * @Author: baobaobao
 * @Date: 2023-10-29 18:28:59
 * @LastEditTime: 2023-10-30 14:00:36
 * @LastEditors: baobaobao
 */
import { mount, shallowMount, config } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import LayBadge from "../index.vue";
import LayAvatar from "../../avatar";

import { nextTick, ref } from "vue";

describe("Badge.vue", () => {
  test("render value test", async () => {
    const wrapper = mount(LayBadge, {
      props: {
        value: 10,
      },
    });
    await nextTick();
    expect(wrapper.find(".layui-badge-number").text()).toEqual("10");
  });
  test("render type rim test", async () => {
    const wrapper = mount(LayBadge, {
      props: {
        value: 10,
      },
      slots: {
        default: LayAvatar,
      },
    });
    await nextTick();
    expect(wrapper.find(".layui-avatar")).toBeTruthy();
    expect(wrapper.find(".layui-badge-number").text()).toEqual("10");
  });
  test("render type dot test", async () => {
    const wrapper = mount(LayBadge, {
      props: {
        value: 10,
        type: "dot",
      },
      slots: {
        default: LayAvatar,
      },
    });
    await nextTick();
    expect(wrapper.find(".layui-badge-dot")).toBeTruthy();
    expect(wrapper.find(".layui-badge-dot").text()).toEqual("");
  });
  test("render badgeStyle test", async () => {
    const wrapper = mount(LayBadge, {
      props: {
        value: 10,
        badgeStyle: { backgroundColor: "#52c41a" },
      },
      slots: {},
    });
    await nextTick();
    expect(wrapper.find(".layui-badge-number").attributes().style).toContain(
      "#52c41a"
    );
  });
  test("render postion test", async () => {
    const wrapper = mount(LayBadge, {
      props: {
        value: 10,
        position: "bottom-right",
      },
      slots: {},
    });
    await nextTick();
    expect(wrapper.find(".is-bottom-right")).toBeTruthy();
  });
  test("render theme test", async () => {
    const wrapper = mount(LayBadge, {
      props: {
        value: 10,
        theme: "orange",
      },
      slots: {},
    });
    await nextTick();
    expect(wrapper.find(".layui-bg-orange")).toBeTruthy();
  });

  test("render show-zero test", async () => {
    const wrapper = mount(LayBadge, {
      props: {
        value: 0,
        showZero: true,
      },
      slots: {},
    });
    await nextTick();
    expect(wrapper.find(".layui-badge-number").text()).toEqual("0");
    wrapper.setProps({ showZero: false });
    await nextTick();
    expect(wrapper.find(".layui-badge-number").exists()).toBeFalsy();
  });

  test("render custom test", async () => {
    const wrapper = mount(LayBadge, {
      props: {
        value: "new",
      },
    });
    await nextTick();
    expect(wrapper.find(".layui-badge-number").text()).toEqual("new");
  });

  test("render max test", async () => {
    const wrapper = mount(LayBadge, {
      props: {
        value: 100,
      },
    });
    await nextTick();
    expect(wrapper.find(".layui-badge-number").text()).toEqual(`${99}+`);
    wrapper.setProps({ max: 10 });
    await nextTick();
    expect(wrapper.find(".layui-badge-number").text()).toEqual(`${10}+`);
  });

  test("render ripple test", async () => {
    const wrapper = mount(LayBadge, {
      props: {
        ripple: true,
        type: "dot",
      },
    });
    await nextTick();
    expect(wrapper.find(".layui-badge-dot-ripple").exists()).toBeTruthy();
  });

  test("render slot test", async () => {
    const wrapper = mount(LayBadge, {
      props: {},
      slots: {
        default: LayAvatar,
        custom: () => "custom",
      },
    });
    await nextTick();
    expect(wrapper.find(".layui-badge-number").text()).toEqual("custom");
  });
});
