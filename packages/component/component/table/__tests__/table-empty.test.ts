/*
 * @Description  :
 * @Version      : V1.0.0
 * @Author       : sdwdjzhy sdwdjzhy@qq.com
 * @Date         : 2023-11-21 14:12:07
 * @LastEditors  : sdwdjzhy sdwdjzhy@qq.com
 * @LastEditTime : 2023-11-21 14:53:03
 * @FilePath     : table-empty.test.ts
 * Copyright 2023 Runy, All Rights Reserved.
 * 2023-11-21 14:12:07
 */

import { mount, shallowMount, config } from "@vue/test-utils";
import LayTable from "../index.vue";
import LayEmpty from "../../empty";

import { describe, expect, test, vi } from "vitest";
import { nextTick, reactive, ref } from "vue";

describe("Table.vue", () => {
  // 无数据的UI 默认时，使用LayEmpty显示
  test("render Table empty slot default test", async () => {
    const wrapper = mount(LayTable, {
      props: {
        columns: [{ title: "姓名", width: "80px", key: "name", sort: "desc" }],
        dataSource: [],
        emptyDescription: "数据飞走了",
      },
    });
    await nextTick();
    const body = wrapper.find(".layui-table-body");
    expect(body.exists()).toBeTruthy();
    const emptyC = body.findComponent(LayEmpty);
    expect(emptyC.exists()).toBeTruthy();
    expect(emptyC.html()).toContain("数据飞走了");

    wrapper.unmount();
  });
  // 无数据的UI 使用empty插槽替换整个LayEmpty
  test("render Table empty slot  test", async () => {
    const wrapper = mount(LayTable, {
      props: {
        columns: [{ title: "姓名", width: "80px", key: "name", sort: "desc" }],
        dataSource: [],
      },
      slots: {
        empty: "<span>无数据(empty)</span>",
      },
    });
    await nextTick();
    const body = wrapper.find(".layui-table-body");
    expect(body.exists()).toBeTruthy();
    expect(body.findComponent(LayEmpty).exists()).toBeFalsy();
    expect(body.html()).toContain("<span>无数据(empty)</span>");
    wrapper.unmount();
  });
});
