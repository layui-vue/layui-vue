/*
 * @Author: baobaobao
 * @Date: 2023-04-27 11:57:58
 * @LastEditTime: 2023-04-28 17:20:16
 * @LastEditors: baobaobao
 */
import { mount } from "@vue/test-utils";
import LayCheckCard from "../src/component/checkcard";

import { describe, expect, test } from "vitest";
const IMAGE_URL = "https://img.com";
const title = "test checkcard text";
const description = "test checkcard description";
const style = "color: red";
const addClass = "cardClass";
describe("LayCheckCard.vue", () => {
  test("renders title test", () => {
    const wrapper = mount(LayCheckCard, {
      props: {
        title,
      },
    });
    expect(wrapper.find(".layui-checkcard-title").exists()).toBe(true);
    wrapper.unmount();
  });
  test("render description test", () => {
    const wrapper = mount(LayCheckCard, {
      props: {
        description,
      },
    });
    expect(wrapper.find(".layui-checkcard-desc").exists()).toBe(true);
    wrapper.unmount();
  });
  test("render avater test", () => {
    const wrapper = mount(LayCheckCard, {
      props: {
        avatar: IMAGE_URL,
      },
    });
    expect(wrapper.find(".layui-checkcard-avatar img").attributes("src")).toBe(
      IMAGE_URL
    );
    wrapper.unmount();
  });

  test("render defaultChecked test", () => {
    const wrapper = mount(LayCheckCard, {
      props: {
        defaultChecked: true,
      },
    });
    expect(wrapper.find(".layui-checkcard-checked").exists()).toBe(true);
    wrapper.unmount();
  });
  test("render all test", async () => {
    const wrapper = mount(LayCheckCard, {
      props: {
        avatar: IMAGE_URL,
        description,
        title,
        defaultChecked: true,
      },
    });
    expect(wrapper.find(".layui-checkcard-checked").exists()).toBe(true);
    expect(wrapper.find(".layui-checkcard-avatar").exists()).toBe(true);
    expect(wrapper.find(".layui-checkcard-avatar img").attributes("src")).toBe(
      IMAGE_URL
    );
    expect(wrapper.find(".layui-checkcard-desc").exists()).toBe(true);
    expect(wrapper.find(".layui-checkcard-desc").text()).toBe(description);
    expect(wrapper.find(".layui-checkcard-title").exists()).toBe(true);
    expect(wrapper.find(".layui-checkcard-title").text()).toBe(title);
    await wrapper.find(".layui-checkcard").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
    wrapper.unmount();
  });
  test("render class、style test", () => {
    const wrapper = mount(LayCheckCard, {
      attrs: {
        style,
        class: addClass,
      },
    });
    expect(wrapper.find(".layui-checkcard").classes()).toContain(addClass);
    expect(wrapper.find(".layui-checkcard").attributes("style")).toContain(
      style
    );
    wrapper.unmount();
  });
  test("render slots test", () => {
    const wrapper = mount(LayCheckCard, {
      slots: {
        avatar: () => `avater`,
        description: () => `description`,
        title: () => `title`,
        extra: () => `extra`,
      },
    });
    expect(wrapper.find(".layui-checkcard-title").exists()).toBe(true);
    expect(wrapper.find(".layui-checkcard-title").text()).toBe("title");
    expect(wrapper.find(".layui-checkcard-desc").exists()).toBe(true);
    expect(wrapper.find(".layui-checkcard-desc").text()).toBe("description");
    expect(wrapper.find(".layui-checkcard-extra").exists()).toBe(true);
    expect(wrapper.find(".layui-checkcard-extra").text()).toBe("extra");
    expect(wrapper.find(".layui-checkcard-left").exists()).toBe(true);
    expect(wrapper.find(".layui-checkcard-left").text()).toBe("avater");
    wrapper.unmount();
  });

  test("render cover slots test", () => {
    const wrapper = mount(LayCheckCard, {
      slots: {
        cover: () => `cover`,
      },
    });
    expect(wrapper.find(".layui-checkcard-is-cover").text()).toBe("cover");
    expect(wrapper.find(".layui-checkcard-is-cover").exists()).toBe(true);
    wrapper.unmount();
  });
  test("render disabled test", async () => {
    const wrapper = mount(LayCheckCard, {
      props: {
        disabled: true,
      },
    });
    expect(wrapper.find(".layui-checkcard").classes()).toContain(
      "layui-checkcard-disabled"
    );
    await wrapper.find(".layui-checkcard").trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
    wrapper.unmount();
  });
});
