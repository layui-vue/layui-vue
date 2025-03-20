import { type VueWrapper, mount } from "@vue/test-utils";
import LayTable from "../index.vue";
import LayCheckboxV2 from "@layui/component/component/checkboxV2/index.vue";

import { describe, expect, test, vi } from "vitest";
import { nextTick, reactive, ref } from "vue";
import { sleep } from "../../../test-utils";

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

  test("切换defaultExpandAll ", async () => {
    const defaultExpandAll = ref(true);

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
            defaultExpandAll={defaultExpandAll.value}
          ></LayTable>
        );
      },
    });
    await nextTick();

    const trs1 = wrapper.findAll(".layui-table-body table tbody tr");
    expect(trs1.length).toBe(3);

    defaultExpandAll.value = false;

    await nextTick();

    const trs2 = wrapper.findAll(".layui-table-body table tbody tr");
    expect(trs2.length).toBe(2);
  });

  test("服务器排序 ", async () => {
    const columns = [
      { title: "姓名", width: "80px", key: "name", sort: "custom" },
      { title: "状态", width: "180px", key: "status" },
    ];

    const dataSource = ref([
      {
        id: "1",
        name: "张三1",
      },
      { id: "2", name: "张三2" },
      { id: "3", name: "张三3" },
    ]);

    const onSortChange = () => {
      // mock request
      setTimeout(() => {
        dataSource.value = dataSource.value.reverse();
      }, 500);
    };

    const wrapper = mount({
      setup() {
        return () => (
          <LayTable
            columns={columns}
            dataSource={dataSource.value}
            onSortChange={onSortChange}
          ></LayTable>
        );
      },
    });

    await nextTick();

    const trDom1 = wrapper.findAll(".layui-table-body .layui-table tr");
    const tDDom1 = trDom1[0].findAll("td");
    expect(tDDom1[0].text()).toBe("张三1");

    const thDom = wrapper.findAll(
      ".layui-table-header .layui-table-header-wrapper th"
    );

    await thDom[0].trigger("click");

    await sleep(800);

    const trDom2 = wrapper.findAll(".layui-table-body .layui-table tr");
    const tDDom2 = trDom2[0].findAll("td");
    expect(tDDom2[0].text()).toBe("张三3");
  });

  test("tree形 全选 childrenColumnName", async () => {
    const columns = [
      {
        fixed: "left" as const,
        type: "checkbox",
        title: "复选",
        key: "checkbox",
      },
      {
        title: "编号",
        width: "100px",
        key: "id",
      },
    ];

    const dataSource = ref([
      {
        id: "1",
        name: "张三1",
        children1: [
          {
            id: "2",
            name: "张三2",
          },
        ],
      },
    ]);

    const selectedKeys = ref([]);

    const wrapper = mount({
      setup() {
        return () => (
          <LayTable
            columns={columns}
            dataSource={dataSource.value}
            v-model:selectedKeys={selectedKeys.value}
            childrenColumnName="children1"
          ></LayTable>
        );
      },
    });

    await nextTick();

    const allCheckbox = wrapper.find(
      ".layui-table-header .layui-table-cell-checkbox .layui-checkbox"
    );

    allCheckbox.trigger("click");

    await nextTick();

    expect(selectedKeys.value).toEqual(["1", "2"]);
  });

  test("分页切换 selectedKeys的数据保留、并且全选状态正确", async () => {
    const columns = [
      {
        fixed: "left" as const,
        type: "checkbox",
        title: "复选",
        key: "checkbox",
      },
      {
        title: "编号",
        width: "100px",
        key: "id",
      },
    ];

    const dataSource = ref([
      {
        id: "1",
      },
      {
        id: "2",
      },
    ]);

    const selectedKeys = ref(["1"]);

    const handleChange = (page: any) => {
      if (page.current === 1) {
        dataSource.value = [
          {
            id: "1",
          },
          {
            id: "2",
          },
        ];
      }
      if (page.current === 2) {
        dataSource.value = [
          {
            id: "3",
          },
          {
            id: "4",
          },
        ];
      }
    };

    const wrapper = mount({
      setup() {
        return () => (
          <LayTable
            page={{ current: 1, limit: 10, total: 100 }}
            columns={columns}
            dataSource={dataSource.value}
            v-model:selectedKeys={selectedKeys.value}
            onChange={handleChange}
          ></LayTable>
        );
      },
    });

    const allCheckbox = wrapper.findComponent(
      ".layui-table-header .layui-table-cell-checkbox .layui-checkbox"
    ) as VueWrapper<typeof LayCheckboxV2>;

    expect(allCheckbox.vm.isIndeterminate).toBeTruthy();
    expect(allCheckbox.vm.modelValue).toBeFalsy();

    await allCheckbox.trigger("click");

    expect(selectedKeys.value).toEqual(["1", "2"]);
    expect(allCheckbox.vm.modelValue).toBeTruthy();

    const nextPage = wrapper.find(".layui-table-page .layui-page-next");
    await nextPage.trigger("click");

    await nextTick();

    expect(allCheckbox.vm.isIndeterminate).toBeFalsy();
    expect(allCheckbox.vm.modelValue).toBeFalsy();

    await allCheckbox.trigger("click");

    expect(selectedKeys.value).toEqual(["1", "2", "3", "4"]);

    const prePage = wrapper.find(".layui-table-page .layui-page-prev");

    await prePage.trigger("click");

    expect(allCheckbox.vm.isIndeterminate).toBeTruthy();
    expect(allCheckbox.vm.modelValue).toBeTruthy();
  });

  test("emit checkbox and checkbox-all", async () => {
    const columns = [
      {
        fixed: "left" as const,
        type: "checkbox",
        title: "复选",
        key: "checkbox",
      },
      {
        title: "编号",
        width: "100px",
        key: "id",
      },
    ];

    const dataSource = ref([
      {
        id: "1",
      },
      {
        id: "2",
      },
    ]);

    const wrapper = mount({
      setup() {
        return () => (
          <LayTable columns={columns} dataSource={dataSource.value}></LayTable>
        );
      },
    });

    const tableInstance = wrapper.findComponent(LayTable);

    const allCheckbox = wrapper.findComponent(
      ".layui-table-header .layui-table-cell-checkbox .layui-checkbox"
    ) as VueWrapper<typeof LayCheckboxV2>;

    const signCheckbox = wrapper
      .findAll(".layui-table-body .layui-table-cell-checkbox")[0]
      .findComponent(".layui-checkbox") as VueWrapper<typeof LayCheckboxV2>;

    await signCheckbox.trigger("click");

    await nextTick();

    expect(tableInstance.emitted()).toHaveProperty("checkbox");
    expect(tableInstance.emitted().checkbox[0][0]).toBeTruthy();
    expect(tableInstance.emitted().checkbox[0][1]).toEqual(dataSource.value[0]);

    await signCheckbox.trigger("click");
    await nextTick();

    expect(tableInstance.emitted()).toHaveProperty("checkbox");
    expect(tableInstance.emitted().checkbox[1][0]).toBeFalsy();
    expect(tableInstance.emitted().checkbox[1][1]).toEqual(dataSource.value[0]);

    await allCheckbox.trigger("click");

    expect(tableInstance.emitted()).toHaveProperty("checkbox-all");
    expect(tableInstance.emitted()["checkbox-all"][0][0]).toEqual(
      dataSource.value.map((item) => item.id)
    );

    await allCheckbox.trigger("click");

    expect(tableInstance.emitted()).toHaveProperty("checkbox-all");
    expect(tableInstance.emitted()["checkbox-all"][1][0]).toEqual([]);
  });

  test("default-toolbar 拓展其他icon", async () => {
    const columns = [
      {
        fixed: "left" as const,
        type: "checkbox",
        title: "复选",
        key: "checkbox",
      },
      {
        title: "编号",
        width: "100px",
        key: "id",
      },
    ];

    const dataSource = ref([
      {
        id: "1",
      },
      {
        id: "2",
      },
    ]);

    let value = 1;

    const defaultToolbars = [
      "filter" as const,
      {
        icon: "layui-icon-refresh",
        title: "刷新",
        onClick: () => {
          value++;
        },
      },
      "print" as const,
    ];

    const wrapper = mount({
      setup() {
        return () => (
          <LayTable
            columns={columns}
            dataSource={dataSource.value}
            defaultToolbar={defaultToolbars}
          ></LayTable>
        );
      },
    });
    const iconBoxs = wrapper.findAll(
      ".layui-table-view .layui-table-tool-self .layui-inline"
    );

    expect(iconBoxs.length).toBe(3);
    expect(iconBoxs[1].attributes().title).toBe("刷新");

    await iconBoxs[1].trigger("click");

    expect(value).toBe(2);
  });

  test("page change", async () => {
    const columns = [
      {
        fixed: "left" as const,
        type: "checkbox",
        title: "复选",
        key: "checkbox",
      },
      {
        title: "编号",
        width: "100px",
        key: "id",
      },
    ];

    const dataSource = ref([
      {
        id: "1",
      },
      {
        id: "2",
      },
    ]);

    let current = 1;

    const wrapper = mount({
      setup() {
        return () => (
          <LayTable
            page={{
              current: 1,
              limit: 10,
              total: 100,
              change: (pageData) => {
                current = pageData.current;
              },
            }}
            columns={columns}
            dataSource={dataSource.value}
          ></LayTable>
        );
      },
    });

    const nextPage = wrapper.find(".layui-table-page .layui-page-next");
    await nextPage.trigger("click");

    await nextTick();

    expect(current).toBe(2);
  });

  test("slots page", async () => {
    const columns = [
      {
        fixed: "left" as const,
        type: "checkbox",
        title: "复选",
        key: "checkbox",
      },
      {
        title: "编号",
        width: "100px",
        key: "id",
      },
    ];

    const dataSource = ref([
      {
        id: "1",
      },
      {
        id: "2",
      },
    ]);

    const wrapper = mount({
      setup() {
        return () => (
          <LayTable
            page={{
              current: 1,
              limit: 10,
              total: 100,
            }}
            columns={columns}
            dataSource={dataSource.value}
            v-slots={{
              page: () => 123,
            }}
          ></LayTable>
        );
      },
    });
    const pageSlot = wrapper.find(
      ".layui-table-view .layui-table-page .layui-table-page-slot"
    );

    expect(pageSlot.exists()).toBeTruthy();
    expect(pageSlot.text()).toBe("123");
  });
});
