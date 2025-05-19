import { ref, nextTick } from "vue";
import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import type { VueWrapper } from "@vue/test-utils";

import LayTreeSelect from "../index.vue";
import LayInput from "../../input/index.vue";
import LayTagInput from "@layui/component/component/tagInput/index.vue";
import LayTag from "@layui/component/component/tag/index.vue";
import { sleep } from "@layui/component/test-utils";

const teleportProps = { to: "body", disabled: true };

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

  test("cacheData", async () => {
  
      const wrapper = mount({
        setup() {
          const value1 = ref([1, 11])

          const data = ref([
            {
              title: "一级1",
              id: 1,
            },
            {
              title: "一级2",
              id: 2,
              children: [
                {
                  title: "一级2-1",
                  id: 21,
                }
              ]
            },
          ]);

          const cacheData1 = [
            {
              title: "一级1-1",
              id: 11,
            },
          ]

          const handleLoad = (node, resolve) => {
            console.log(node);
            if (node.id === 1) {
              setTimeout(() => {
                resolve([
                  {
                    title: "一级1-1",
                    id: 11,
                  },
                  {
                    title: "一级1-2",
                    id: 12,
                  },
                ]);
              }, 200);
            }
          };
  
          return () => (
            <LayTreeSelect
              v-model={value1.value}
              multiple
              data={data.value}
              cacheData={cacheData1}
              teleportProps={teleportProps}
              lazy
              load={handleLoad}
            ></LayTreeSelect>
          );
        },
      }, {attachTo: document.body});
  
      await nextTick();
  
      const tagInput = wrapper.findComponent(LayTagInput);
      expect(tagInput.props('modelValue')?.length).toBe(2)

      await tagInput.trigger('click')
      await sleep(300)

      const popper = wrapper.find('.layui-popper')
      expect(popper.isVisible()).toBeTruthy()

      expect(tagInput.props('modelValue')?.length).toBe(2)

      const treeNode = popper.findAll('.layui-tree-set')
      const expandIcon = treeNode[0].find('.layui-tree-iconClick')

      await expandIcon.trigger('click')
      await sleep(300)

      expect(tagInput.props('modelValue')?.length).toBe(2)
    });

  test("replaceFields + 输入反填多级数据", async () => {

    const wrapper = mount({
      setup() {
        const value1 = ref(11)

        const data = ref([{
          name: "一级1",
          key: 1,
          spread: true,
          child: [
            {
              name: "一级1-1",
              key: 11,
            },
          ],
        }]);

        const replaceFields = {
          id: "key",
          title: "name",
          children: "child",
        };


        return () => (
          <LayTreeSelect
            v-model={value1.value}
            data={data.value}
            replaceFields={replaceFields}
          ></LayTreeSelect>
        );
      },
    });

    await nextTick();

    const InputVm = wrapper.findComponent(LayInput);

    expect(InputVm.props("modelValue")).toBe("一级1-1");
  });

  test("replaceFields + 输入反填多级数据 + 多选", async () => {

    const wrapper = mount({
      setup() {
        const value1 = ref([11])

        const data = ref([{
          name: "一级1",
          key: 1,
          spread: true,
          child: [
            {
              name: "一级1-1",
              key: 11,
            },
          ],
        }]);

        const replaceFields = {
          id: "key",
          title: "name",
          children: "child",
        };


        return () => (
          <LayTreeSelect
            v-model={value1.value}
            multiple
            data={data.value}
            replaceFields={replaceFields}
          ></LayTreeSelect>
        );
      },
    });

    await nextTick();

    const tagInput = wrapper.findComponent(LayTagInput);
    expect(tagInput.props('modelValue')?.length).toBe(1)

    const tagComponent = tagInput.findComponent(LayTag);
    expect(tagComponent.text()).toBe('一级1-1')
  });
});
