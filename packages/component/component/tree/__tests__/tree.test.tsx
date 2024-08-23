import { nextTick, ref } from "vue";
import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

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
});
