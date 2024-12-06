import { mount } from "@vue/test-utils";
import LayTable from "../index.vue";

import { describe, expect, test, vi } from "vitest";
import { nextTick, ref } from "vue";

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

  test("初始化expand-keys 未生效", async () => {
    const expandKeys = ref(["1", "1-1"]);
    const columns = [
      { title: "姓名", width: "80px", key: "name", sort: "desc" },
      { title: "状态", width: "180px", key: "status" },
    ];
    const dataSource = [
      {
        id: "1",
        name: "张三",
        children: [
          {
            id: "1-1",
            name: "张三",
            children: [
              {
                id: "1-1-1",
                name: "张三",
                children: [],
              },
            ],
          },
        ],
      },
      { id: "2", name: "张三" },
    ];
    const wrapper = mount({
      setup() {
        return () => (
          <LayTable
            columns={columns}
            dataSource={dataSource}
            v-model:expandKeys={expandKeys.value}
          ></LayTable>
        );
      },
    });
    await nextTick();

    const trs = wrapper.findAll(".layui-table-body table tbody tr");

    expect(trs.length).toBe(4);
    expect(expandKeys.value).toEqual(["1", "1-1"]);
  });

  test("多级表头 expand插槽 colspan正确", async () => {
    const columns = [
      { title: "班级", width: "120px", key: "classes" },
      {
        title: "分数",
        key: "total",
        children: [
          { title: "语文", width: "80px", key: "chinese", totalRow: true },
        ],
      },
    ];
    const dataSource = [
      {
        id: "1",
        name: "张三1",
        classes: "六年级一班",
        chinese: 80,
        mathematics: 50,
        english: 60,
        organism: 80,
        geography: 22,
        history: 55,
        politics: 53,
        score: 454,
      },
    ];
    const wrapper = mount({
      setup() {
        return () => (
          <LayTable
            columns={columns}
            dataSource={dataSource}
            expandKeys={["1"]}
            v-slots={{
              expand: () => 1,
            }}
          ></LayTable>
        );
      },
    });
    await nextTick();

    const td = wrapper.find(".layui-table-cell-expand .layui-table-cell");
    const colspan = td.attributes("colspan");
    expect(colspan).toBe("2");
  });
});
