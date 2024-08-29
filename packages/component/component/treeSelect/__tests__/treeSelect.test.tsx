import { ref, nextTick } from "vue";
import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import type { VueWrapper } from "@vue/test-utils";

import LayTreeSelect from "../index.vue";
import LayInput from "../../input/index.vue";

describe("LayTreeSelect", () => {
  test("LayTreeSelect 基础使用", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref<string | number>(1);
        const data = ref([
          {
            title: "title-1",
            id: 1,
            children: [
              {
                title: "title-1-1",
                id: 11,
              },
              {
                title: "title-1-2",
                id: 12,
              },
            ],
          },
          {
            title: "title-2",
            id: 2,
            children: [
              {
                title: "title-2-1",
                id: 21,
              },
              {
                title: "title-2-2",
                id: 22,
              },
            ],
          },
        ]);

        return () => (
          <LayTreeSelect
            modelValue={value1.value}
            onUpdate:modelValue={(val) =>
              (value1.value = val as string | number)
            }
            data={data.value}
          ></LayTreeSelect>
        );
      },
    }) as VueWrapper<any>;
    await nextTick();

    const InputVm = wrapper.findComponent(LayInput);
    expect(InputVm.props("modelValue")).toBe("title-1");

    await wrapper.setProps({ modelValue: 21 });
    await nextTick();
    expect(InputVm.props("modelValue")).toBe("title-2-1");
  });

  test("LayTreeSelect 修改props.data 校验input.modelValue", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref<string | number>(1);
        const data = ref([]);

        return () => (
          <LayTreeSelect
            modelValue={value1.value}
            onUpdate:modelValue={(val) =>
              (value1.value = val as string | number)
            }
            data={data.value}
          ></LayTreeSelect>
        );
      },
    }) as VueWrapper<any>;
    await nextTick();

    const InputVm = wrapper.findComponent(LayInput);
    expect(InputVm.props("modelValue")).toBe("");

    await wrapper.setProps({ modelValue: 21 });
    await nextTick();
    expect(InputVm.props("modelValue")).toBe("");

    wrapper.setProps({
      data: [
        {
          title: "title-1",
          id: 1,
          children: [
            {
              title: "title-1-1",
              id: 11,
            },
            {
              title: "title-1-2",
              id: 12,
            },
          ],
        },
        {
          title: "title-2",
          id: 2,
          children: [
            {
              title: "title-2-1",
              id: 21,
            },
            {
              title: "title-2-2",
              id: 22,
            },
          ],
        },
      ],
    });

    await nextTick();
    expect(InputVm.props("modelValue")).toBe("title-2-1");

    await wrapper.setProps({ modelValue: 1 });
    await nextTick();
    expect(InputVm.props("modelValue")).toBe("title-1");
  });
});
