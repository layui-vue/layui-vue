/*
 * @Author: baobaobao
 * @Date: 2023-11-06 15:23:34
 * @LastEditTime: 2023-11-06 15:34:46
 * @LastEditors: baobaobao
 */
import { mount, config } from "@vue/test-utils";
import { beforeAll, describe, expect, test, vi } from "vitest";
import LayAvatarList from "../index";
import LayIcon from "../../icon";
import LayAvatar from "../../avatar";

import { nextTick } from "vue";
config.global.components = {
  "lay-icon": LayIcon,
  // "lay-avatar": LayAvatar,
};
describe("Avatar.vue", () => {
  test("render size test", async () => {
    const wrapper = mount(LayAvatarList, {
      props: {
        size: "sm",
      },
      slots: {
        default: [LayAvatar, LayAvatar, LayAvatar],
      },
    });
    await nextTick();
    expect(wrapper.findAll(".layui-avatar").length).toBe(3);
    expect(wrapper.findAll(".layui-avatar-sm").length).toBe(3);
  });
  test("render radius test", async () => {
    const wrapper = mount(LayAvatarList, {
      props: {
        radius: true,
      },
      slots: {
        default: [LayAvatar, LayAvatar, LayAvatar],
      },
    });
    await nextTick();
    expect(wrapper.findAll(".layui-avatar").length).toBe(3);
    expect(wrapper.findAll(".layui-avatar-radius").length).toBe(3);
  });
});
