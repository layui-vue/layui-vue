import { DOMWrapper, type VueWrapper, mount } from "@vue/test-utils";
import LayTable from "../index.vue";
import LayCheckboxV2 from "@layui/component/component/checkboxV2/index.vue";
import LayButton from '@layui/component/component/button/index.vue'

import { describe, expect, test, vi } from "vitest";
import {h, nextTick, reactive, ref, watch} from "vue";
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
      ".layui-table-view .layui-table-tool-self .layui-space-item"
    );

    expect(iconBoxs.length).toBe(3);
    expect(iconBoxs[1].find('div').attributes().title).toBe("刷新");

    await iconBoxs[1].find('div').trigger("click");

    expect(value).toBe(2);
  });

  test("default-toolbar 渲染自定义组件", async () => {
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
      "filter",
      {
        render: () => h(LayButton, {
          onClick: () => {
            value++;
          },
        })
      },
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
        ".layui-table-view .layui-table-tool-self .layui-space-item"
    );

    expect(iconBoxs[1].find('.layui-btn').attributes().type).toBe('button')

    await iconBoxs[1].find('.layui-btn').trigger("click");

    expect(value).toBe(2)
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

  test("点击default-toolbar 字段隐藏", async () => {
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
            columns={columns}
            dataSource={dataSource.value}
            default-toolbar
          ></LayTable>
        );
      },
    });
    const filter = wrapper.find('.layui-table-tool-self [title="筛选"]');

    await filter.trigger("click");
    await nextTick();
    await sleep();

    const checkboxLists = document.body.querySelectorAll(
      ".layui-table-tool-checkbox .layui-checkbox"
    );

    expect(checkboxLists.length).toBe(2);

    await checkboxLists[0].dispatchEvent(new MouseEvent("click"));
    await nextTick();

    const headerTr = wrapper.findAll(".layui-table-header tr");
    const headerTh = headerTr[0].findAll("th");
    expect(headerTh.length).toBe(1);

    const bodyTr = wrapper.findAll(".layui-table-main tr");
    expect(bodyTr.length).toBe(2);

    const bodyTd = bodyTr[0].findAll("td");
    expect(bodyTd.length).toBe(1);
  });

  test("分页切换 slots数据正确", async () => {
    const columns = [
      { title: "姓名", width: "80px", key: "name" },
      {
        title: "操作",
        width: "150px",
        customSlot: "operator",
        key: "operator",
      },
    ];
    const loading = ref(false);

    const dataSource = ref([
      { id: "1", name: "张三1" },
      { id: "2", name: "张三2" },
      { id: "3", name: "张三3" },
      { id: "4", name: "张三4" },
      { id: "5", name: "张三5" },
      { id: "6", name: "张三6" },
      { id: "7", name: "张三7" },
      { id: "8", name: "张三8" },
      { id: "9", name: "张三9" },
      { id: "10", name: "张三10" },
    ]);

    const change = (page) => {
      loading.value = true;
      setTimeout(() => {
        dataSource.value = loadDataSource(page.current, page.limit);
        loading.value = false;
      }, 100);
    };

    const loadDataSource = (page, pageSize) => {
      const response = [];
      const startIndex = (page - 1) * pageSize + 1;
      const endIndex = page * pageSize;
      for (let i = startIndex; i <= endIndex; i++) {
        response.push({
          id: `${i}`,
          name: `张三${i}`,
        });
      }
      return response;
    };

    let name = "";

    const handleClick = (row: any) => {
      name = row.name;
    };

    const wrapper = mount({
      setup() {
        return () => (
          <LayTable
            page={{ current: 1, limit: 10, total: 100 }}
            columns={columns}
            dataSource={dataSource.value}
            default-toolbar
            loading={loading.value}
            onChange={change}
            v-slots={{
              operator: ({ row }: any) => (
                <div class={"custom-operator"} onClick={() => handleClick(row)}>
                  click
                </div>
              ),
            }}
          ></LayTable>
        );
      },
    });

    let operatorDoms: any;
    operatorDoms = wrapper.findAll(".custom-operator");
    expect(operatorDoms.length).toBe(10);
    await operatorDoms[1].trigger("click");
    expect(name).toBe("张三2");

    const nextPageDom = wrapper.find(".layui-table-page .layui-page-next");
    await nextPageDom.trigger("click");
    await sleep(200);

    operatorDoms = wrapper.findAll(".custom-operator");
    expect(operatorDoms.length).toBe(10);
    await operatorDoms[1].trigger("click");
    expect(name).toBe("张三12");

    const prevPageDom = wrapper.find(".layui-table-page .layui-page-prev");
    await prevPageDom.trigger("click");
    await sleep(200);

    operatorDoms = wrapper.findAll(".custom-operator");
    expect(operatorDoms.length).toBe(10);
    await operatorDoms[1].trigger("click");
    expect(name).toBe("张三2");
  });

  test("columns titleSlot", async () => {
    const columns = [
      { title: '', titleSlot: "titleSlot1", width: "80px", key: "name1" },
      { title: '', titleSlot: () => ('titleSlot2'), width: "80px", key: "name2" },
    ];

    const dataSource = ref([]);

    const wrapper = mount({
      setup() {
        return () => (
          <LayTable
            page={{ current: 1, limit: 10, total: 100 }}
            columns={columns}
            dataSource={dataSource.value}
            v-slots={{
              titleSlot1: ({ row }: any) => (
                'titleSlot1'
              ),
            }}
          ></LayTable>
        );
      },
    });

    await nextTick()

    const thS = wrapper.findAll(".layui-table-header .layui-table-header-wrapper tr th");

    expect(thS[0].text()).toBe('titleSlot1')
    expect(thS[1].text()).toBe('titleSlot2')
  });

  test("dataSource为空，表头checkbox状态应为空", async () => {
    const columns = [
      { type: 'checkbox', title: 'title', key: 'id'},
    ];

    const dataSource = ref([]);

    const wrapper = mount({
      setup() {
        return () => (
          <LayTable
            columns={columns}
            dataSource={dataSource.value}
          ></LayTable>
        );
      },
    });

    await nextTick()

    const checkboxComponent = wrapper.findComponent(".layui-table-header .layui-table-header-wrapper tr th .layui-checkbox");

    expect((checkboxComponent as any).vm.modelValue).toBeFalsy();
  });

  // https://gitee.com/layui-vue/layui-vue/issues/IC9S5Q
  test("一级表头存在两个fixed为left表头，第二个表头会覆盖第一列", async () => {
    const columns = [
      { title: "用户", width: "80px", key: "name", fixed: "left" as const },
      { title: "城市", width: "80px", key: "city", fixed: "left" as const },
    ];

    const dataSource = ref([]);

    const wrapper = mount({
      setup() {
        return () => (
          <LayTable
            columns={columns}
            dataSource={dataSource.value}
          ></LayTable>
        );
      },
    });

    await nextTick()

    const ths = wrapper.findAll(".layui-table-header .layui-table-header-wrapper tr th");

    const style = ths[1].attributes().style

    expect(style).toMatch(/left/)
    expect(style).toMatch(/80px/)
  });

  test("一级表头存在两个fixed为left表头，存在 layui-table-fixed-left-last 类名", async () => {
    const columns = reactive([
      { title: "用户", width: "80px", key: "name", fixed: "left" as const },
      { title: "城市", width: "80px", key: "city", fixed: "left" as const },
    ]);

    const dataSource = ref([]);

    const wrapper = mount({
      setup() {
        return () => (
          <LayTable
            columns={columns}
            dataSource={dataSource.value}
          ></LayTable>
        );
      },
    });

    await nextTick()

    const ths = wrapper.findAll(".layui-table-header .layui-table-header-wrapper tr th");

    const _class = ths[1].attributes().class

    expect(_class).toMatch(/layui-table-fixed-left-last/)
  });

  // https://gitee.com/layui-vue/layui-vue/issues/ICKILA
  test("selectedKeys制空未生效", async () => {

    const selectedKeys = ref([]);

    const wrapper = mount({
      setup() {
         const columns = reactive([
          { type: "checkbox", title: "复选" },
          { title: "用户", width: "80px", key: "name" },
        ]);
        const dataSource = ref<any>([]);

        function generateData1() {
          dataSource.value = [
            { id: "3", name: "张三3", city: "城市-3", sex: "男", age: "20", remark: "屈指古今多少事，都只是、镜中春", score: 100, sign: "已签到", joinTime: "2022-02-09" },
            { id: "4", name: "张三4", city: "城市-4", sex: "男", age: "20", remark: "屈指古今多少事，都只是、镜中春", score: 100, sign: "已签到", joinTime: "2022-02-09" }, 
            { id: "5", name: "张三5", city: "城市-5", sex: "男", age: "20", remark: "屈指古今多少事，都只是、镜中春", score: 100, sign: "已签到", joinTime: "2022-02-09" }
          ];
        }

        function generateData2() {
          dataSource.value = [
            { id: "9", name: "张三9", city: "城市-9", sex: "男", age: "20", remark: "屈指古今多少事，都只是、镜中春", score: 100, sign: "已签到", joinTime: "2022-02-09" },
            { id: "10", name: "张三10", city: "城市-10", sex: "男", age: "18", remark: "屈指古今多少事，都只是、镜中春", score: 100, sign: "已签到", joinTime: "2022-02-09" },
            { id: "11", name: "张三11", city: "城市-11", sex: "男", age: "18", remark: "屈指古今多少事，都只是、镜中春", score: 100, sign: "已签到", joinTime: "2022-02-09" },
            { id: "12", name: "张三12", city: "城市-12", sex: "男", age: "20", remark: "屈指古今多少事，都只是、镜中春", score: 100, sign: "已签到", joinTime: "2022-02-09" },
          ];
        }

        watch([dataSource], () => {
          selectedKeys.value = []
        });

        return () => (
          <div>
            <LayButton class='custom-btn1' size="sm" onClick={generateData1}>
              数据1
            </LayButton>
            <LayButton class='custom-btn2' size="sm" onClick={generateData2}>
              数据2
            </LayButton>
            <LayTable
              columns={columns}
              dataSource={dataSource.value}
              v-model:selectedKeys={selectedKeys.value}
            ></LayTable>
          </div>
        );
      },
    });

    await nextTick()

    const btn1 = wrapper.find('.custom-btn1')
    const btn2 = wrapper.find('.custom-btn2')

    await btn1.trigger('click')

    const trs1 = wrapper.findAll('.layui-table-body .layui-table tbody tr')
    expect(trs1.length).toBe(3)

    await trs1[0].findComponent('.layui-checkbox').trigger('click')
    expect(selectedKeys.value.length).toBe(1)

    await trs1[1].findComponent('.layui-checkbox').trigger('click')
    expect(selectedKeys.value.length).toBe(2)

    await btn2.trigger('click')
    const trs2 = wrapper.findAll('.layui-table-body .layui-table tbody tr')
    expect(trs2.length).toBe(4)

    expect(selectedKeys.value.length).toBe(0)
  });
});
