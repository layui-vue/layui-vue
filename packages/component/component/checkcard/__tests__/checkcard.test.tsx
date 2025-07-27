/*
 * @Author: baobaobao
 * @Date: 2023-04-27 11:57:58
 * @LastEditTime: 2023-05-23 13:34:10
 * @LastEditors: baobaobao
 */
import { mount, shallowMount } from "@vue/test-utils";
import LayCheckCard from "../index.vue";
import LayCheckcardGroup from "../../checkcardGroup/index.vue";
import { describe, expect, test } from "vitest";
import {ref, h, nextTick} from 'vue'

const IMAGE_URL = "https://img.com";
const title = "test checkcard text";
const description = "test checkcard description";
const style = "color: red";
const addClass = "layui-checkcard-checkedcardClass";
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

  test("render modelValue test", async () => {
    const wrapper = mount(LayCheckCard, {
      props: {
        modelValue: true,
      },
    });
    await wrapper.setProps({ modelValue: false });
    expect(Object.is(wrapper.vm.modelValue, false)).toBe(true);
    expect(wrapper.find(".layui-checkcard-checked").exists()).toBe(false);
    wrapper.unmount();
  });

  test("render all test", async () => {
    const wrapper = mount(LayCheckCard, {
      props: {
        avatar: IMAGE_URL,
        description,
        title,
        modelValue: true,
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
    await wrapper.setProps({ disabled: false });
    expect(wrapper.vm.disabled).toBe(false);
    await wrapper.find(".layui-checkcard").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");

    wrapper.unmount();
  });

  test("disabled", async () => {
    const disabledGroup = ref(true)
    const disabled = ref(true)

    const wrapper = mount(
      {
        setup() {
          return () => (
            <LayCheckcardGroup disabled={disabledGroup.value}>
              <LayCheckCard title="标题" disabled={disabled.value}></LayCheckCard>
            </LayCheckcardGroup>
          );
        },
      },
      {}
    );

    await nextTick()
    expect(wrapper.find(".layui-checkcard").classes()).toContain(
      "layui-checkcard-disabled"
    );

    // await wrapper.setProps({ disabled: false })
    disabledGroup.value = false
    await nextTick()
    expect(wrapper.find(".layui-checkcard").classes()).toContain(
      "layui-checkcard-disabled"
    );

    disabled.value = false
    await nextTick()
    expect(wrapper.find(".layui-checkcard").classes()).not.toContain(
      "layui-checkcard-disabled"
    );
  });
});
