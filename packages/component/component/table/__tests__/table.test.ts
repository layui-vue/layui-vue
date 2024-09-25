import { mount } from "@vue/test-utils";
import LayTable from "../index.vue";

import { describe, expect, test, vi } from "vitest";
import { nextTick } from "vue";

describe("LayTable", () => {
  test("点击不可排序表头 是否报错", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const wrapper = mount(LayTable, {
      props: {
        columns: [
          { title: "姓名", width: "80px", key: "name", sort: "desc" },
          { title: "状态", width: "180px", key: "status" },
        ],
        dataSource: [],
      },
    });
    await nextTick();

    const thDom = wrapper.findAll(
      ".layui-table-header .layui-table-header-wrapper th"
    );

    await thDom[1].trigger("click");

    expect(errorSpy).not.toHaveBeenCalled();

    errorSpy.mockRestore();
  });
});
