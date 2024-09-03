import { reactive, nextTick } from "vue";
import { describe, expect, test, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { sleep } from "../../../test-utils";

import LayAutocomplete from "../index.vue";
import LayDropdown from "../../dropdown/index.vue";

const FETCH_SUGGESTIONS = () => {
  return Promise.resolve([
    { value: "test1" },
    { value: "test2" },
    { value: "test3" },
  ]);
};

const _mount = (props: any) => {
  const state = reactive({
    value: "",
    fetchSuggestions: function () {
      return Promise.resolve([
        { value: "test1" },
        { value: "test2" },
        { value: "test3" },
      ]);
    },
    props,
  });

  return mount(() => (
    <LayAutocomplete
      v-model={state.value}
      fetchSuggestions={state.fetchSuggestions}
      {...state.props}
    ></LayAutocomplete>
  ));
};

describe("LayAutocomplete.vue", () => {
  afterEach(() => {
    const popperDom = document.body.querySelector(".layui-popper");
    if (popperDom) {
      popperDom.remove();
    }
  });

  test("test LayAutocomplete placeholder", async () => {
    const placeholder = "test LayAutocomplete placeholder";
    const wrapper = _mount({
      placeholder,
    });
    expect(wrapper.find("input").attributes("placeholder")).toContain(
      placeholder
    );
  });

  test("test LayAutocomplete disabled", async () => {
    const wrapper = _mount({
      disabled: true,
    });
    expect(wrapper.find(".layui-input-wrapper").classes()).toContain(
      "layui-input-disabled"
    );
  });

  test("test LayAutocomplete allow-clear", async () => {
    const wrapper = _mount({
      allowClear: true,
      modelValue: "123",
    });
    expect(wrapper.find(".layui-input-clear").exists()).toBe(true);
  });

  test("是否只有input可触发dropdown", async () => {
    const wrapper = _mount({});

    const inputComponent = wrapper.find(".layui-input");
    const inputDom = wrapper.find(".layui-input input");
    const dropDownDom = wrapper.findComponent(LayDropdown);

    await inputComponent.trigger("click");

    expect((dropDownDom.vm as any).$.setupState.open).toBeFalsy();

    await inputDom.setValue("1");
    await inputDom.trigger("input");

    await nextTick();
    await sleep();

    expect((dropDownDom.vm as any).$.setupState.open).toBe(true);
  });

  test("dropdown 是否正常关闭", async () => {
    const wrapper = _mount({});

    const inputComponent = wrapper.find(".layui-input");
    const inputDom = wrapper.find(".layui-input input");
    const dropDownDom = wrapper.findComponent(LayDropdown);

    await inputComponent.trigger("click");
    await inputDom.setValue("1");
    await inputDom.trigger("input");

    await nextTick();
    await sleep();

    const selectOptions = document.body.querySelectorAll(
      ".lay-autocomplete-content .lay-autocomplete-option"
    );

    // dropdown 数据长度
    expect(selectOptions.length).toBe(3);

    expect((dropDownDom.vm as any).$.setupState.open).toBe(true);
    await selectOptions[1].dispatchEvent(new Event("click"));
    expect((dropDownDom.vm as any).$.setupState.open).toBeFalsy();

    expect(wrapper.findComponent(LayAutocomplete).props("modelValue")).toBe(
      "test2"
    );
  });
});
