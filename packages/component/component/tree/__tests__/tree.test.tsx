import { nextTick, ref } from "vue";
import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import LayTree from "../index.vue";

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
});
