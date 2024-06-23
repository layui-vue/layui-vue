/*
 * @Author: baobaobao
 * @Date: 2023-11-06 14:03:54
 * @LastEditTime: 2023-11-06 15:36:02
 * @LastEditors: baobaobao
 */
import { mount, config } from "@vue/test-utils";
import { beforeAll, describe, expect, test, vi } from "vitest";
import LayAvatar from "../index";
import LayIcon from "../../icon";

import { nextTick } from "vue";

config.global.components = {
  "lay-icon": LayIcon,
};
describe("Avatar.vue", () => {
  test("render avatar test", async () => {
    const wrapper = mount(LayAvatar, {});
    expect(wrapper.find(".layui-avatar-text")).toBeTruthy();
  });
  test("render src test", async () => {
    const wrapper = mount(LayAvatar, {
      props: {
        src: "https://foruda.gitee.com/avatar/1677022544584087390/4835367_jmysy_1578975358.png",
      },
    });
    // console.log(wrapper.vm.src)
    expect(wrapper.find("img").attributes().src).toEqual(wrapper.vm.src);
  });
  test("render icon test", async () => {
    const wrapper = mount(LayAvatar, {
      props: {
        icon: "layui-icon-face-smile",
      },
    });
    expect(wrapper.find(".layui-icon-face-smile")).toBeTruthy();
  });

  test("render icon test", async () => {
    const wrapper = mount(LayAvatar, {
      props: {
        icon: "layui-icon-face-smile",
        radius: true,
      },
    });
    expect(wrapper.find(".layui-avatar-radius")).toBeTruthy();
    expect(wrapper.find(".layui-icon-face-smile")).toBeTruthy();
  });
  test("render fallback test", async () => {
    const wrapper = mount(LayAvatar, {
      props: {
        src: "error.png",
        fallback: "http://abc.pearadmin.com/logo-png.png",
      },
    });
    await nextTick();
    wrapper.find("img").trigger("error");
    expect(wrapper.find("img").attributes().src).toEqual(wrapper.vm.fallback);
  });
  test("render avatar test", async () => {
    const wrapper = mount(LayAvatar, {
      props: {
        size: "xs",
      },
    });
    expect(wrapper.find(".layui-avatar-xs")).toBeTruthy();
  });
});
