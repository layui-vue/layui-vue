import { ref, nextTick } from "vue";
import { describe, expect, test, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { sleep } from "../../../test-utils";

import LaySelect from "../index.vue";
import LayDropdown from "../../dropdown/index.vue";

describe("LaySelect", () => {
  afterEach(() => {
    const popperDom = document.body.querySelector(".layui-popper");
    if (popperDom) {
      popperDom.remove();
    }
  });

  test("LaySelect emit clear事件", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(1);
        const value2 = ref([1, 2]);
        const options = [
          { label: "选项1", value: 1 },
          { label: "选项2", value: 2 },
          { label: "选项3", value: 3 },
        ];

        return () => (
          <div>
            <LaySelect
              v-model={value1.value}
              allow-clear
              options={options}
            ></LaySelect>
            <LaySelect
              v-model={value2.value}
              options={options}
              multiple
              allow-clear
            ></LaySelect>
          </div>
        );
      },
    });

    const [selects, multipleSelect] = wrapper.findAllComponents(LaySelect);

    const inputComponent = selects.find(".layui-input");
    await inputComponent.trigger("mouseover");

    const iconComponent = inputComponent.find(
      ".layui-input-clear > .layui-icon"
    );
    await iconComponent.trigger("click");

    // 出否有clear回调
    expect(selects.emitted()).toHaveProperty("clear");
    expect(selects.props("modelValue")).toBe("");

    // start multiple
    const tagInput = multipleSelect.find(".layui-tag-input");
    await tagInput.trigger("mouseover");

    const iconComponent2 = tagInput.find(
      ".layui-tag-input-clear > .layui-icon"
    );
    await iconComponent2.trigger("click");

    // 出否有clear回调
    expect(multipleSelect.emitted()).toHaveProperty("clear");
    expect(multipleSelect.props("modelValue")).toEqual([]);
  });

  test("LaySelect emit remove-tag事件", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref([1, 2]);
        const options = [
          { label: "选项1", value: 1 },
          { label: "选项2", value: 2 },
          { label: "选项3", value: 3 },
        ];

        return () => (
          <LaySelect
            v-model={value1.value}
            options={options}
            multiple
            allow-clear
          ></LaySelect>
        );
      },
    });

    const selects = wrapper.findComponent(LaySelect);
    await nextTick();

    const tags = selects.findAll(".layui-tag");
    const tagClose = tags[1].find(".layui-tag-close-icon");
    await tagClose.trigger("click");

    // 是否触发remove-tag emit
    expect(selects.emitted()).toHaveProperty("remove-tag");
    // remove-tag emit 参数是否正确
    expect(selects.emitted()["remove-tag"][0]).toEqual([2]);
    await nextTick();

    // 校验select.modelValue
    expect(selects.props("modelValue")).toEqual([1]);
  });

  test("dropdown 是否正常关闭", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref(1);
        const options = [
          { label: "选项1", value: 1 },
          { label: "选项2", value: 2 },
          { label: "选项3", value: 3 },
        ];

        return () => (
          <LaySelect v-model={value1.value} options={options}></LaySelect>
        );
      },
    });

    const inputComponent = wrapper.findComponent(".layui-input");
    const dropDownDom = wrapper.findComponent(LayDropdown);

    expect((dropDownDom.vm as any).open).toBeFalsy();

    await inputComponent.trigger("click");
    await nextTick();
    await sleep();
    expect((dropDownDom.vm as any).open).toBe(true);

    const selectOptions = document.body.querySelectorAll(
      ".layui-select-content .layui-select-option"
    );

    // // dropdown 数据长度
    expect(selectOptions.length).toBe(3);

    await selectOptions[1].dispatchEvent(new Event("click"));

    await sleep();

    expect((dropDownDom.vm as any).open).toBeFalsy();
    expect((wrapper.findComponent(".layui-select") as any).vm.modelValue).toBe(
      2
    );
  });

  test("dropdown 是否正常关闭 multiple", async () => {
    const wrapper = mount({
      setup() {
        const value1 = ref([]);
        const options = [
          { label: "选项1", value: 1 },
          { label: "选项2", value: 2 },
          { label: "选项3", value: 3 },
          { label: "选项4", value: 4 },
        ];

        return () => (
          <LaySelect
            v-model={value1.value}
            options={options}
            multiple
          ></LaySelect>
        );
      },
    });

    const inputComponent = wrapper.findComponent(".layui-tag-input");
    const dropDownDom = wrapper.findComponent(LayDropdown);

    await inputComponent.trigger("click");
    await nextTick();
    await sleep();
    expect((dropDownDom.vm as any).open).toBe(true);

    const selectOptions = document.body.querySelectorAll(
      ".layui-select-content .layui-select-option"
    );

    // dropdown 数据长度
    expect(selectOptions.length).toBe(4);

    await selectOptions[1].dispatchEvent(new Event("click"));

    await sleep();
    // 多选不关闭dropdown
    expect((dropDownDom.vm as any).open).toBe(true);

    await selectOptions[2].dispatchEvent(new Event("click"));
    expect(
      (wrapper.findComponent(".layui-select") as any).vm.modelValue
    ).toEqual([2, 3]);

    // 二次点击input关闭dropdown
    await inputComponent.trigger("click");
    await sleep();

    expect((dropDownDom.vm as any).open).toBeFalsy();
  });

  test("开启多选，处于搜索中时，点击input中的选中项无法删除", async () => {
    const value1 = ref([1]);

    const wrapper = mount({
      setup() {
        const options = [
          { label: "学习", value: 1 },
          { label: "复习", value: 2 },
        ];

        return () => (
          <LaySelect
            v-model={value1.value}
            options={options}
            multiple
            show-search
          ></LaySelect>
        );
      },
    });

    const inputComponent = wrapper.findComponent(".layui-tag-input");

    await inputComponent.trigger("click");
    await nextTick();
    await sleep();

    const tags = wrapper.findAll(".layui-tag-input-inner .layui-tag");
    expect(tags.length).toBe(1);

    await inputComponent.find(".layui-tag-input-inner input").setValue("学习");

    await tags[0].find(".layui-tag-close-icon").trigger("click");
    const tags1 = wrapper.findAll(".layui-tag-input-inner .layui-tag");
    expect(tags1.length).toBe(0);
    expect(value1.value.length).toBe(0);
  });

  test("输入内容，自动弹出下拉框", async () => {
    const teleportProps = { to: "body", disabled: true };

    const value1 = ref([1]);

    const wrapper = mount(
      {
        setup() {
          const options = [
            { label: "学习", value: 1 },
            { label: "复习", value: 2 },
          ];

          return () => (
            <LaySelect
              v-model={value1.value}
              options={options}
              multiple
              show-search
              teleportProps={teleportProps}
            ></LaySelect>
          );
        },
      },
      { attachTo: document.body }
    );

    const inputComponent = wrapper.findComponent(".layui-tag-input");

    await inputComponent.trigger("click");
    await nextTick();
    await sleep();

    const tooltip1 = wrapper.find(".layui-popper");
    expect(tooltip1.exists()).toBeTruthy();
    expect(tooltip1.isVisible()).toBeTruthy();

    await inputComponent.trigger("click");
    await nextTick();
    await sleep();
    expect(tooltip1.isVisible()).toBeFalsy();

    const inputInstance = wrapper.find(
      ".layui-tag-input .layui-tag-input-inner input"
    );
    await inputInstance.setValue("hello");

    await nextTick();
    await sleep();
    expect(tooltip1.isVisible()).toBeTruthy();
  });
});
