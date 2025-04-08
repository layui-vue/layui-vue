import { nextTick, ref } from "vue";
import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import { sleep } from "../../../test-utils";

import LayTree from "../index.vue";
import LayCheckbox from "../../checkboxV2/index.vue";

describe("LayTree", () => {
  test("check-strictly为false，子节点未全选，checkedKeys不包含父节点", async () => {
      const wrapper = mount({
        setup() {
          const checkedKeys = ref([]);
          const data = ref([
            {
              Name: "tree-1",
              Id: "1",
              Children: [
                {
                  Name: "tree-1-1",
                  Id: "1-1",
                },
                {
                  Name: "tree-1-2",
                  Id: "1-2",
                },
              ],
            },
          ]);
  
          return () => (
            <LayTree
              data={data.value}
              showCheckbox={true}
              default-expand-all={true}
              v-model:checkedKeys={checkedKeys.value}
              replaceFields={{ id: "Id", title: "Name", children: "Children" }}
            ></LayTree>
          );
        },
      });
      await nextTick();
  
      const vm = wrapper.getComponent(LayTree);
      const checkboxAll = wrapper.findAll(".layui-checkbox");
  
      await checkboxAll[1].trigger("click");
  
      expect(vm.props("checkedKeys")).toEqual(["1-1"]);
    });
  
    test("checkedKeys只包含第三层数据，初始化第一层并未半选", async () => {
      const wrapper = mount({
        setup() {
          const checkedKeys = ref([3]);
          const data = ref([
            {
              title: "一级1",
              id: 1,
              children: [
                {
                  title: "二级1-1",
                  id: 2,
                  children: [
                    {
                      title: "三级1-1-3",
                      id: 3,
                    },
                    {
                      title: "三级1-1-1",
                      id: 4,
                    },
                    {
                      title: "三级1-1-2",
                      id: 5,
                    },
                  ],
                },
              ],
            },
          ]);
  
          return () => (
            <LayTree
              data={data.value}
              showCheckbox={true}
              v-model:checkedKeys={checkedKeys.value}
            ></LayTree>
          );
        },
      });
      await nextTick();
  
      const checkboxAll = wrapper.findAll(".layui-checkbox");
  
      const oneCheckbox = checkboxAll[0].getComponent(LayCheckbox);
  
      const { isIndeterminate, modelValue } = oneCheckbox.props();
      expect(isIndeterminate).toBeTruthy();
      expect(modelValue).toBeFalsy();
    });
  
    test("checkedKeys只包含第三层数据，并未展开所有子节点，展开第一层、checkedKeys变为[1, 3]", async () => {
      const wrapper = mount({
        setup() {
          const checkedKeys = ref([3]);
          const data = ref([
            {
              title: "一级1",
              id: 1,
              children: [
                {
                  title: "二级1-1",
                  id: 2,
                  children: [
                    {
                      title: "三级1-1-3",
                      id: 3,
                    },
                    {
                      title: "三级1-1-1",
                      id: 4,
                    },
                    {
                      title: "三级1-1-2",
                      id: 5,
                    },
                  ],
                },
              ],
            },
          ]);
  
          return () => (
            <LayTree
              data={data.value}
              showCheckbox={true}
              v-model:checkedKeys={checkedKeys.value}
            ></LayTree>
          );
        },
      });
      await nextTick();
  
      const vm = wrapper.getComponent(LayTree);
      const expandIcon = wrapper.findAll(".layui-tree-txt");
  
      await expandIcon[0].trigger("click");
      await nextTick();
  
      expect(vm.props("checkedKeys")).toEqual([3]);
    });
  
    test("包含disabled节点，点击第一层，checkedKeys是否正确", async () => {
      const wrapper = mount({
        setup() {
          const checkedKeys = ref([]);
          const data = ref([
            {
              title: "一级1",
              id: 1,
              checked: true,
              spread: true,
              children: [
                {
                  title: "二级1-1",
                  id: 2,
                  href: "https://www.layui.com/",
                  children: [
                    {
                      title: "三级1-1-3",
                      id: 5,
                    },
                    {
                      title: "三级1-1-1",
                      id: 6,
                    },
                    {
                      title: "三级1-1-2",
                      id: 7,
                    },
                  ],
                },
                {
                  title: "二级1-2",
                  id: 3,
                  spread: true,
                  children: [
                    {
                      title: "三级1-2-1",
                      id: 8,
                      disabled: true,
                      children: [
                        {
                          title: "三级1-2-1-1",
                          id: 12,
                        },
                        {
                          title: "三级1-2-1-2",
                          id: 13,
                        },
                      ],
                    },
                    {
                      title: "三级1-2-2",
                      id: 9,
                    },
                  ],
                },
                {
                  title: "二级1-3",
                  id: 4,
                  children: [
                    {
                      title: "三级1-3-1",
                      id: 10,
                    },
                    {
                      title: "三级1-3-2",
                      id: 11,
                    },
                  ],
                },
              ],
            },
          ]);
  
          return () => (
            <LayTree
              data={data.value}
              showCheckbox={true}
              v-model:checkedKeys={checkedKeys.value}
            ></LayTree>
          );
        },
      });
      await nextTick();
  
      const vm = wrapper.getComponent(LayTree);
      const checkboxAll = wrapper.findAll(".layui-checkbox");
  
      await checkboxAll[0].trigger("click");
      await nextTick();
  
      expect(vm.props("checkedKeys")).toEqual([
        1, 2, 5, 6, 7, 3, 8, 12, 13, 9, 4, 10, 11,
      ]);
    });
  
    test("show-line 为false时， 点击最后一级展开报错", async () => {
      const wrapper = mount({
        setup() {
          const data = ref([
            {
              title: "一级1",
              id: 1,
              children1: [
                {
                  title: "二级1-1",
                  id: 3,
                },
              ],
            },
          ]);
  
          const replaceFields = {
            title: "title",
            id: "id",
            children: "children1",
          };
  
          return () => (
            <LayTree
              data={data.value}
              tailNodeIcon={false}
              onlyIconControl={false}
              replaceFields={replaceFields}
              show-line={false}
            ></LayTree>
          );
        },
      });
  
      await nextTick();
  
      const expandIcon = wrapper.findAll(
        ".layui-tree-entry .layui-tree-iconClick .layui-icon"
      );
  
      expect(expandIcon.length).toBe(1);
  
      await expandIcon[0].trigger("click");
  
      await nextTick();
      await sleep(200);
  
      // 获取展开之后的dom数，正常应为2
      const NewDom = wrapper.findAll(".layui-tree-entry");
  
      expect(NewDom.length).toBe(2);
    });

  test("当disabled节点存在子节点时，点击头部节点 disabled节点也应子节点勾选而被勾选", async () => {
    const wrapper = mount({
      setup() {
        const checkedKeys = ref([]);

        const data = ref([
          {
            title: "一级1",
            id: 1,
            children: [
              {
                title: "二级1-1",
                id: 2,
                disabled: true,
                children: [
                  {
                    title: "三级1-1-1",
                    id: 3,
                  },
                ],
              }
            ],
          },
        ]);

        return () => (
          <LayTree
            data={data.value}
            showCheckbox={true}
            v-model:checkedKeys={checkedKeys.value}
          ></LayTree>
        );
      },
    });
    await nextTick();

    const vm = wrapper.getComponent(LayTree);
    const checkboxAll = wrapper.findAll(".layui-checkbox");

    await checkboxAll[0].trigger("click");
    await nextTick();

    expect(vm.props("checkedKeys")).toEqual([
      1, 2, 3
    ]);
  });

  test("懒加载 + 如元素被checked 那懒加载的元素也将自动checked", async () => {
    const wrapper = mount({
      setup() {
        const checkedKeys = ref([]);

        const data = ref([
          {
            title: "一级1",
            id: 1
          },
        ]);

        function onLoad (_, resolve: any) {
          setTimeout(() => {
            resolve([
              {
                title: "二级1-1",
                id: 2,
                children: [
                  {
                    title: "三级1-1-1",
                    id: 3,
                    checked: true
                  },
                ],
              },
            ])
          }, 200)
        }

        return () => (
          <LayTree
            data={data.value}
            showCheckbox={true}
            v-model:checkedKeys={checkedKeys.value}
            lazy
            load={onLoad}
          ></LayTree>
        );
      },
    });

    await nextTick();

    const vm = wrapper.getComponent(LayTree);
    const checkboxAll = wrapper.findAll(".layui-checkbox");

    await checkboxAll[0].trigger("click");
    await nextTick();

    expect(vm.props("checkedKeys")).toEqual([
      1
    ]);

    const textDom = wrapper.find(".layui-tree-entry .layui-tree-txt");
    await textDom.trigger("click");

    await nextTick()

    // loading show
    const loadingDom = wrapper.find(".layui-tree-entry .layui-tree-loading");
    expect(loadingDom.exists()).toBeTruthy()
    expect(loadingDom.isVisible()).toBeTruthy()

    await sleep(300)

    expect(vm.props("checkedKeys")).toEqual([1, 2, 3]);

  });

  test("懒加载 + 如元素被checked 那懒加载的元素也将自动checked （存在disabled节点）", async () => {
    const wrapper = mount({
      setup() {
        const checkedKeys = ref([]);

        const data = ref([
          {
            title: "一级1",
            id: 1
          },
        ]);

        function onLoad (_, resolve: any) {
          setTimeout(() => {
            resolve([
              {
                title: "二级1-1",
                id: 2,
                disabled: true
              },
              {
                title: "二级1-2",
                id: 3,
                children: [
                  {
                    title: "三级1-2-1",
                    id: 5,
                    checked: true,
                  },
                ],
              },
            ])

          }, 200)
        }

        return () => (
          <LayTree
            data={data.value}
            showCheckbox={true}
            v-model:checkedKeys={checkedKeys.value}
            lazy
            load={onLoad}
          ></LayTree>
        );
      },
    });

    await nextTick();

    const vm = wrapper.getComponent(LayTree);
    const checkboxAll = wrapper.findAll(".layui-checkbox");

    await checkboxAll[0].trigger("click");
    await nextTick();

    expect(vm.props("checkedKeys")).toEqual([
      1
    ]);

    const textDom = wrapper.find(".layui-tree-entry .layui-tree-txt");
    await textDom.trigger("click");

    await nextTick()

    // loading show
    const loadingDom = wrapper.find(".layui-tree-entry .layui-tree-loading");
    expect(loadingDom.exists()).toBeTruthy()
    expect(loadingDom.isVisible()).toBeTruthy()

    await sleep(300)

    expect(vm.props("checkedKeys")).toEqual([
      3, 5
    ]);

  });

  test("check-change", async () => {
    const wrapper = mount({
      setup() {
        const checkedKeys = ref([1, 2]);

        const data = ref([
          {
            title: "一级1",
            id: 1,
            children: [
              {
                title: "二级1-1",
                id: 2
              }
            ],
          },
        ]);

        return () => (
          <LayTree
            data={data.value}
            showCheckbox={true}
            v-model:checkedKeys={checkedKeys.value}
          ></LayTree>
        );
      },
    });
    await nextTick();

    const vm = wrapper.getComponent(LayTree);
    const checkboxAll = wrapper.findAll(".layui-checkbox");

    await checkboxAll[0].trigger("click");
    await nextTick();
    expect(vm.emitted()['check-change'][0][1]).toBeFalsy();

    await checkboxAll[0].trigger("click");
    await nextTick();

    expect(vm.emitted()['check-change'][1][1]).toBeTruthy();
  });

  test("check-change 子节点存在disabled 当前节点checked则一直为false", async () => {
    const wrapper = mount({
      setup() {
        const checkedKeys = ref([]);

        const data = ref([
          {
            title: "一级1",
            id: 1,
            children: [
              {
                title: "二级1-1",
                id: 2,
                disabled: true
              }
            ],
          },
        ]);

        return () => (
          <LayTree
            data={data.value}
            showCheckbox={true}
            v-model:checkedKeys={checkedKeys.value}
          ></LayTree>
        );
      },
    });
    await nextTick();

    const vm = wrapper.getComponent(LayTree);
    const checkboxAll = wrapper.findAll(".layui-checkbox");

    await checkboxAll[0].trigger("click");
    await nextTick();
    expect(vm.emitted()['check-change'][0][1]).toBeFalsy();

    await checkboxAll[0].trigger("click");
    await nextTick();

    expect(vm.emitted()['check-change'][1][1]).toBeFalsy();
  });

  test("cacheData", async () => {
    const wrapper = mount({
      setup() {
        const checkedKeys = ref([3]);

        const data = ref([
          {
            title: "一级1",
            id: 1,
          },
        ]);

        const cacheData = [
          {
            title: "一级2",
            id: 3,
          },
        ];

        function onLoad (_, resolve: any) {
          setTimeout(() => {
            resolve([
              {
                title: "二级1-1",
                id: 2,
                checked: true,
              },
              {
                title: "一级2",
                id: 3,
              },
            ])
          }, 200)
        }

        return () => (
          <LayTree
            data={data.value}
            showCheckbox={true}
            cacheData={cacheData}
            lazy
            load={onLoad}
            v-model:checkedKeys={checkedKeys.value}
          ></LayTree>
        );
      },
    }, {attachTo: document.body});
    await nextTick();

    const vm = wrapper.getComponent(LayTree);

    expect(vm.props("checkedKeys")).toEqual([
      3
    ]);

    const treeNodes = wrapper.findAll(".layui-tree > .layui-tree-block > .layui-tree-set");
     // 加上cacheData 数据源为2
    expect(treeNodes.length).toBe(2)
     // cacheData 将默认隐藏
    expect(treeNodes.at(-1)?.isVisible()).toBeFalsy()

    const textDom = wrapper.findAll(".layui-tree-entry .layui-tree-txt");
    await textDom[0].trigger("click");

    await nextTick()
    await sleep(300)

    const treeNodes1 = wrapper.findAll(".layui-tree > .layui-tree-block > .layui-tree-set");
    // cacheData数据已被懒加载，原本的数据源将被删除
    expect(treeNodes1.length).toBe(1)
  });

  test("node-click、node-double、node-contextmenu", async () => {
    const wrapper = mount({
      setup() {
        const checkedKeys = ref([3]);

        const data = ref([
          {
            title: "一级1",
            id: 1,
          },
        ]);

        return () => (
          <LayTree
            data={data.value}
            showCheckbox={true}
            v-model:checkedKeys={checkedKeys.value}
          ></LayTree>
        );
      },
    }, {attachTo: document.body});
    await nextTick();

    const vm = wrapper.getComponent(LayTree);

    const textDom = wrapper.findAll(".layui-tree-entry .layui-tree-txt");

    await textDom[0].trigger("click");
    await nextTick()
    expect(vm.emitted()).toHaveProperty("node-click");

    await textDom[0].trigger("dblclick");
    await nextTick()
    expect(vm.emitted()).toHaveProperty("node-double");

    await textDom[0].trigger("contextmenu");
    await nextTick()
    expect(vm.emitted()).toHaveProperty("node-contextmenu");
  });

  test("懒加载 + checkStrictly + 懒加载数据checked为true将反填至checkedKeys", async () => {
    const wrapper = mount({
      setup() {
        const checkedKeys = ref([1]);

        const data = ref([
          {
            title: "一级1",
            id: 1
          },
        ]);

        function onLoad (_, resolve: any) {
          setTimeout(() => {
            resolve([
              {
                title: "二级1-1",
                id: 2,
                checked: true
              },
              {
                title: "二级1-2",
                id: 3
              }
            ])

          }, 200)
        }

        return () => (
          <LayTree
            data={data.value}
            showCheckbox={true}
            v-model:checkedKeys={checkedKeys.value}
            lazy
            load={onLoad}
            checkStrictly
          ></LayTree>
        );
      },
    });

    await nextTick();

    const vm = wrapper.getComponent(LayTree);

    expect(vm.props("checkedKeys")).toEqual([
      1
    ]);

    const textDom = wrapper.find(".layui-tree-entry .layui-tree-txt");
    await textDom.trigger("click");

    await nextTick()
    await sleep(300)

    expect(vm.props("checkedKeys")).toEqual([
      1, 2
    ]);

  });

  test("props.expandKeys + data中包含expand为true", async () => {
    const wrapper = mount({
      setup() {
        const expandKeys = ref([1, 2]);

        const data = ref([
          {
            title: "一级1",
            id: 1
          },
          {
            title: "一级2",
            id: 2
          },
          {
            title: "一级3",
            id: 3,
            spread: true
          },
        ]);

        return () => (
          <LayTree
            data={data.value}
            showCheckbox={true}
            v-model:expand-keys={expandKeys.value}
          ></LayTree>
        );
      },
    });

    await nextTick();
    const vm = wrapper.getComponent(LayTree);

    await nextTick();
    expect(vm.props("expandKeys")).toEqual([1, 2, 3]);

  });

  test("懒加载 + replaceFields.expanded + props.expandKeys + data中包含expand为true", async () => {
    const wrapper = mount({
      setup() {
        const expandKeys = ref([2]);

        const data = ref([
          {
            title: "一级1",
            id: 1
          },
          {
            title: "一级2",
            id: 2
          },
        ]);

        function onLoad (_, resolve: any) {
          setTimeout(() => {
            resolve([
              {
                title: "二级1-1",
                id: 3,
                expanded: true
              },
              {
                title: "二级1-2",
                id: 4,
              }
            ])

          }, 200)
        }

        return () => (
          <LayTree
            data={data.value}
            showCheckbox={true}
            v-model:expand-keys={expandKeys.value}
            lazy
            load={onLoad}
            replaceFields={{expanded: 'expanded'}}
          ></LayTree>
        );
      },
    });

    await nextTick();

    const vm = wrapper.getComponent(LayTree);

    expect(vm.props("expandKeys")).toEqual([
      2
    ]);

    const textDom = wrapper.findAll(".layui-tree-entry .layui-tree-txt");
    await textDom[0].trigger("click");

    await nextTick()
    await sleep(300)

    expect(vm.props("expandKeys")?.sort()).toEqual([
      1 ,2, 3
    ]);

  });

  test("filter", async () => {

    const wrapper = mount({
      setup() {
        function filterNodeMethod(node:any, value: any) {
          return node.title.includes(value);
        }

        const data = ref([
          {
            title: "一级1",
            id: 1,
            children: [
              {
                title: "二级1-1",
                id: 11,
                children: [
                  {
                    title: "三级1-1-1",
                    id: 111,
                    children: []
                  },
                  {
                    title: "三级1-1-2",
                    id: 112,
                    children: []
                  }
                ]
              },
              {
                title: "二级1-2",
                id: 12,
                children: [
                  {
                    title: "三级1-2-1",
                    id: 121,
                    children: []
                  },
                  {
                    title: "三级1-2-2",
                    id: 122,
                    children: []
                  }
                ]
              }
            ]
          },
          {
            title: "一级2",
            id: 2,
            children: [
              {
                title: "二级2-1",
                id: 11,
                children: []
              },
              {
                title: "二级2-2",
                id: 12,
                children: []
              }
            ]
          },
        ]);

        return () => (
          <LayTree
            ref="tree"
            data={data.value}
            search-node-method={filterNodeMethod}
          ></LayTree>
        );
      },
    }, {attachTo: document.body});

    await nextTick();

    const treeRef = wrapper.findComponent({ref: 'tree'}).vm;
    treeRef.filter('三级1-1-2')

    await nextTick();
    await sleep(200)

    const treeNodes = wrapper.findAll(".layui-tree-set");
    const filterTreeNodes = treeNodes.reduce((total, node) => {
      if (node.isVisible()) {
        total++
      }
      return total
    }, 0)

    expect(filterTreeNodes).toBe(3);
  });

  test("props.data 改变", async () => {

    const data = ref([
      {
        title: "一级1",
        id: 1,
      },
      {
        title: "一级2",
        id: 2,
      },
    ]);

    const wrapper = mount({
      setup() {

        return () => (
          <LayTree
            data={data.value}
          ></LayTree>
        );
      },
    });

    await nextTick();

    const treeNodes = wrapper.findAll(".layui-tree-set");
    expect(treeNodes.length).toBe(2);
    expect(treeNodes[0].find('.layui-tree-txt').text()).toBe('一级1');

    data.value[0].title = '一级11'
    await nextTick()
    const treeNodes1 = wrapper.findAll(".layui-tree-set");
    expect(treeNodes1[0].find('.layui-tree-txt').text()).toBe('一级11');

    data.value.push({
      title: "一级3",
      id: 3,
    })
    await nextTick()

    const treeNodes2 = wrapper.findAll(".layui-tree-set");
    expect(treeNodes2.length).toBe(3);
    expect(treeNodes2.at(-1)!.find('.layui-tree-txt').text()).toBe('一级3');
  });

  test("node.slot", async () => {

    const data = ref([
      {
        title: "一级1",
        id: 1,
        slot: 'slot1',
        spread: true
      },
      {
        title: "一级2",
        id: 2,
      },
    ]);

    const wrapper = mount({
      setup() {

        return () => (
          <LayTree
            data={data.value}
             v-slots={{
              slot1: () => 'slot1',
            }}
          ></LayTree>
        );
      },
    });

    await nextTick();

    const treeNodes = wrapper.findAll(".layui-tree-set");

    expect(treeNodes[0].find('.layui-tree-pack').text()).toBe('slot1')
  });
});
