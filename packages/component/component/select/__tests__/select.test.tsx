import { ref, nextTick } from "vue";
import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import LaySelect from "../index.vue";

describe("LaySelect", () => {
  test("LaySelect emit clear事件", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(1);
        const value2 = ref([1, 2]);
        const options = [
          {label:'选项1', value:1},
          {label:'选项2', value:2},
          {label:'选项3', value:3},
        ]

        return () => (
          <div>
            <LaySelect v-model={value1.value} allow-clear options={options}></LaySelect>
            <LaySelect v-model={value2.value} options={options} multiple allow-clear></LaySelect>
          </div>
        );
      },
    });

    const [selects, multipleSelect] = wrapper.findAllComponents(LaySelect);

    const inputComponent = selects.find('.layui-input')
    await inputComponent.trigger("mouseover")

    const iconComponent = inputComponent.find('.layui-input-clear > .layui-icon')
    await iconComponent.trigger("click")

    // 出否有clear回调
    expect(selects.emitted()).toHaveProperty("clear");
    expect(selects.props("modelValue")).toBe("");

    // start multiple
    const tagInput = multipleSelect.find('.layui-tag-input')
    await tagInput.trigger("mouseover")

    const iconComponent2 = tagInput.find('.layui-tag-input-clear > .layui-icon')
    await iconComponent2.trigger("click")

    // 出否有clear回调
    expect(multipleSelect.emitted()).toHaveProperty("clear");
    expect(multipleSelect.props("modelValue")).toEqual([]);
  });

  test("LaySelect emit remove-tag事件", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref([1, 2]);
        const options = [
          {label:'选项1', value:1},
          {label:'选项2', value:2},
          {label:'选项3', value:3},
        ]

        return () => (
          <LaySelect v-model={value1.value} options={options} multiple allow-clear></LaySelect>
        );
      },
    });

    const selects = wrapper.findComponent(LaySelect);
    await nextTick()

    const tags = selects.findAll('.layui-tag')
    const tagClose = tags[1].find('.layui-tag-close-icon')
    tagClose.trigger("click")

    // 是否触发remove-tag emit
    expect(selects.emitted()).toHaveProperty("remove-tag");
    // remove-tag emit 参数是否正确
    expect(selects.emitted()['remove-tag'][0]).toEqual([2]);
    await nextTick()
    
    // 校验select.modelValue
    expect(selects.props("modelValue")).toEqual([1]);
    
  });

  
});
