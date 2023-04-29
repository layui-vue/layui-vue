/*
 * @Author: baobaobao
 * @Date: 2023-04-28 17:16:39
 * @LastEditTime: 2023-04-29 00:30:31
 * @LastEditors: baobaobao
 */
import { mount } from "@vue/test-utils";
import LayCheckCardGroup from "../src/component/checkcardGroup";

import { describe, expect, test } from "vitest";

describe("LayCheckCard.vue", () => {
  test('render all test', () => {
    const wrapper = mount(LayCheckCardGroup, {})
    expect(wrapper.find('.layui-checkcard-group').exists()).toBe(true)
  })
});