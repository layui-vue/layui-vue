/*
 * @Description  : test form 上添加属性 mode=inline
 * @Version      : V1.0.0
 * @Author       : sdwdjzhy sdwdjzhy@qq.com
 * @Date         : 2023-11-17 17:01:13
 * @LastEditors  : sdwdjzhy sdwdjzhy@qq.com
 * @LastEditTime : 2023-11-21 10:32:09
 * @FilePath     : form-inline.test.ts
 * Copyright 2023 Marvin, All Rights Reserved.
 * 2023-11-17 17:01:13
 */

import { h } from "vue";
import { mount, config } from "@vue/test-utils";
import { beforeAll, describe, expect, test, vi } from "vitest";
import LayForm from "../index.vue";
import LayFormItem from "../../formItem";

import { nextTick } from "vue";

describe("Form.vue", () => {
  test("render form block test", async () => {
    const wrapper = mount(LayForm, {
      global: {
        components: {
          LayFormItem,
        },
      },
      props: {
        modelValue: {
          name: "",
        },
      },
      slots: {
        default: [
          h(LayFormItem, { label: "inline", prop: "name" }, {}),
          h(LayFormItem, { label: "inline", prop: "name" }, {}),
        ],
      },
    });
    await nextTick();
    expect(wrapper.find(".layui-form").exists()).toBeTruthy();
    expect(wrapper.find(".layui-form-item").exists()).toBeTruthy();
    const list = wrapper.findAll(".layui-form-item");
    expect(list.length).toBe(2);

    // 未在 Form 或 FormItem 上设置mode，则默认都为 block
    expect(list[0].attributes("class")).toContain("block");
    expect(list[1].attributes("class")).toContain("block");
    wrapper.unmount();
  });
  test("render form inline test", async () => {
    const wrapper = mount(LayForm, {
      global: {
        components: {
          LayFormItem,
        },
      },
      props: {
        modelValue: {
          name: "",
        },
        mode: "inline",
      },
      slots: {
        default: [
          h(LayFormItem, { label: "inline", prop: "name" }, {}),
          h(LayFormItem, { label: "inline", prop: "name" }, {}),
        ],
      },
    });
    await nextTick();
    expect(wrapper.find(".layui-form").exists()).toBeTruthy();
    expect(wrapper.find(".layui-form-item").exists()).toBeTruthy();
    const list = wrapper.findAll(".layui-form-item");
    expect(list.length).toBe(2);

    // 由于在form上设置mode=inline，所以其内部的form-item的mode都为inline
    expect(list[0].attributes("class")).toContain("inline");
    expect(list[1].attributes("class")).toContain("inline");
    wrapper.unmount();
  });
  test("render formitem inline test", async () => {
    const wrapper = mount(LayForm, {
      global: {
        components: {
          LayFormItem,
        },
      },
      props: {
        modelValue: {
          name: "",
        },
      },
      slots: {
        default: [
          h(LayFormItem, { label: "inline", prop: "name", mode: "inline" }, {}),
          h(LayFormItem, { label: "inline", prop: "name" }, {}),
        ],
      },
    });
    await nextTick();
    expect(wrapper.find(".layui-form").exists()).toBeTruthy();
    expect(wrapper.find(".layui-form-item").exists()).toBeTruthy();
    const list = wrapper.findAll(".layui-form-item");
    expect(list.length).toBe(2);

    // 第一个，在FormItem上设置mode=inline
    expect(list[0].attributes("class")).toContain("inline");
    // 第二个，未在Form/FormItem上设置mode，mode为block
    expect(list[1].attributes("class")).toContain("block");
    wrapper.unmount();
  });
});
