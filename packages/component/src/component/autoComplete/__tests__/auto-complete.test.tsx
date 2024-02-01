import { reactive, nextTick } from "vue";
import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import LayAutocomplete from "../index";

const FETCH_SUGGESTIONS = () => {
  return Promise.resolve([
    { value: "test1" },
    { value: "test2" },
    { value: "test3" },
  ]);
};

const _mount = (props) => {
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
});
