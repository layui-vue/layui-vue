import { mount, shallowMount } from "@vue/test-utils";
import LayPage from "../src/component/page";
import LayIcon from "../src/component/icon";
import { describe, expect, test } from "vitest";
import LayDropdown from "../src/component/dropdown";
import LayDropdownMenu from "../src/component/dropdownMenu";
import LayDropdownMenuItem from "../src/component/dropdownMenuItem";
import LaySelectOption from "../src/component/selectOption";
import LaySelect from "../src/component/select";
import LayButton from "../src/component/button";
import LayInput from "../src/component/input";
import { nextTick } from "vue";
const initMaxVal = 10;
const initMinVal = 1;
const total = 100;
const limit = 5;
const changeTotal = 102;
const changeLimit = 10;
describe("LayCheckCard.vue", () => {
  test("render modelValue test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMaxVal,
        total,
      },
      components: {
        LayIcon,
        LayDropdown,
        LayDropdownMenu,
        LayDropdownMenuItem,
        LaySelectOption,
        LaySelect,
        LayInput,
        LayButton,
      },
    });
    expect(+wrapper.find(".layui-pager").find(".is-active").text()).toEqual(
      initMaxVal
    );
    expect(wrapper.find(".layui-pager").find(".is-active").exists()).toBe(true);
    wrapper.unmount();
  });

  test("render event perev next test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMaxVal,
        total,
      },
      components: {
        LayIcon,
        LayDropdown,
        LayDropdownMenu,
        LayDropdownMenuItem,
        LaySelectOption,
        LaySelect,
        LayInput,
        LayButton,
      },
    });
    await wrapper.find(".layui-page-next").trigger("click");
    expect(+wrapper.find(".layui-pager").find(".is-active").text()).toEqual(
      initMaxVal
    );
    expect(wrapper.find(".layui-page-next").classes("is-disabled")).toBe(true);

    await wrapper.setProps({ modelValue: initMinVal });

    await wrapper.find(".layui-page-prev").trigger("click");

    expect(+wrapper.find(".layui-pager").find(".is-active").text()).toEqual(
      initMinVal
    );
    expect(wrapper.find(".layui-page-prev").classes("is-disabled")).toBe(true);
    wrapper.unmount();
  });

  test("render more event  test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total,
      },
      components: {
        LayIcon,
        LayDropdown,
        LayDropdownMenu,
        LayDropdownMenuItem,
        LaySelectOption,
        LaySelect,
        LayInput,
        LayButton,
      },
    });

    await wrapper.find(".layui-page-right-number").trigger("click");

    expect(+wrapper.find(".layui-pager").find(".is-active").text()).toEqual(
      initMinVal + 3
    );

    await wrapper.setProps({ modelValue: initMaxVal });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await wrapper.find(".layui-page-left-number").trigger("click");

    expect(+wrapper.find(".layui-pager").find(".is-active").text()).toEqual(
      initMaxVal - 3
    );
    wrapper.unmount();
  });

  test("render total limit  test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total,
        limit,
      },
      components: {
        LayIcon,
        LayDropdown,
        LayDropdownMenu,
        LayDropdownMenuItem,
        LaySelectOption,
        LaySelect,
        LayInput,
        LayButton,
      },
    });

    expect(+wrapper.find(".layui-pager").find("li:last-child").text()).toEqual(
      Math.ceil(total / limit)
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await wrapper.setProps({ total: changeTotal, limit: changeLimit });
    expect(+wrapper.find(".layui-pager").find("li:last-child").text()).toEqual(
      Math.ceil(changeTotal / changeLimit)
    );
    wrapper.unmount();
  });

  test("render layout test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total,
        limit,
        layout: ["count", "prev", "page", "next", "limits", "refresh", "skip"],
      },
      components: {
        LayIcon,
        LayDropdown,
        LayDropdownMenu,
        LayDropdownMenuItem,
        LaySelectOption,
        LaySelect,
        LayInput,
        LayButton,
      },
    });

    await wrapper
      .find(
        ".layui-page-options .layui-page-options-number .layui-select .layui-input-wrapper"
      )
      .trigger("click");
    const options = wrapper.findAllComponents(LaySelectOption);
    options.at(3)?.trigger("click");
    await nextTick();
    expect(+wrapper.find(".layui-pager").find("li:last-child").text()).toEqual(
      Math.ceil(total / 40)
    );
    await wrapper.setProps({
      layout: ["count", "prev", "page", "next", "limits", "refresh", "skip"],
    });
    await nextTick();
    expect(
      wrapper.find("span:first-child").classes("layui-page-total-text")
    ).toBe(true);
    await wrapper.find(".layui-page-jumper .layui-input input").setValue(2);
    await wrapper.find(".layui-page-jumper .layui-btn").trigger("click");
    await nextTick();
    expect(+wrapper.find(".layui-pager .is-active").text()).toEqual(2);
    // const input:HTMLInputElement = wrapper.find('.layui-page-jumper .layui-input input').element as HTMLInputElement

    wrapper.unmount();
  });

  test("render theme test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total,
        limit,
        theme: "blue",
      },
      components: {
        LayIcon,
        LayDropdown,
        LayDropdownMenu,
        LayDropdownMenuItem,
        LaySelectOption,
        LaySelect,
        LayInput,
        LayButton,
      },
    });
    expect(wrapper.find(".is-active").classes("layui-bg-blue")).toBe(true);
    wrapper.unmount();
  });

  test("render slots test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total,
        limit,
      },
      slots: {
        next: () => `next`,
        prev: () => `prev`,
      },
      components: {
        LayIcon,
        LayDropdown,
        LayDropdownMenu,
        LayDropdownMenuItem,
        LaySelectOption,
        LaySelect,
        LayInput,
        LayButton,
      },
    });
    expect(wrapper.find(".layui-page-next").text()).toEqual("next");
    expect(wrapper.find(".layui-page-prev").text()).toEqual("prev");
    wrapper.unmount();
  });
});
