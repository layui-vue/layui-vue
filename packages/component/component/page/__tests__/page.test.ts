import { mount, shallowMount, config } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import { sleep } from "../../../test-utils";

import LayPage from "../index.vue";
import LayIcon from "../../icon";
import { describe, expect, test } from "vitest";
import LayDropdown from "../../dropdown";
import LayDropdownMenu from "../../dropdownMenu";
import LayDropdownMenuItem from "../../dropdownMenuItem";
import LaySelectOption from "../../selectOption";
import LaySelect from "../../select";
import LayButton from "../../button";
import LayInput from "../../input";

config.global.components = {
  "lay-select": LaySelect,
  "lay-icon": LayIcon,
  "lay-dropdown-menu": LayDropdownMenu,
  "lay-dropdown-menu-item": LayDropdownMenuItem,
  "lay-dropdown": LayDropdown,
  "lay-select-option": LaySelectOption,
  "lay-button": LayButton,
  "lay-input": LayInput,
};
const initMaxVal = 10;
const initMinVal = 1;
const total = 100;
const limit = 5;
const changeTotal = 102;
const changeLimit = 10;

describe("LayPage.vue", () => {
  test("render modelValue test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMaxVal,
        total,
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
        pages: 0,
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

    const initialValue = wrapper.vm.currentPage;
    await wrapper.setProps({ modelValue: 1 });

    await wrapper.find(".layui-page-next").trigger("click");

    expect(initialValue + 1).toBe(+wrapper.vm.currentPage);

    await wrapper.setProps({ modelValue: 5 });
    const initiaPrevlValue = wrapper.vm.currentPage;

    await wrapper.find(".layui-page-prev").trigger("click");
    expect(initiaPrevlValue - 1).toBe(+wrapper.vm.currentPage);
    wrapper.vm.handlePage(-1);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.currentPage).toBe(1);

    wrapper.vm.handlePage(1000);

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.currentPage).toBe(Math.ceil(total / 10));

    expect(wrapper.vm.groups).toBe(wrapper.vm.pages + 1);

    await wrapper.setProps({ modelValue: 1000 });
    await nextTick();
    expect(wrapper.vm.currentPage).toBe(Math.ceil(total / 10));

    wrapper.unmount();
  });

  test("render more event  test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total,
      },
    });

    await wrapper.find(".layui-page-right-number").trigger("click");

    expect(+wrapper.find(".layui-pager").find(".is-active").text()).toEqual(
      initMinVal + 3
    );

    await wrapper.setProps({ modelValue: initMaxVal });

    await nextTick();

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
    });
    expect(+wrapper.find(".layui-pager").find("li:last-child").text()).toEqual(
      Math.ceil(total / limit)
    );
    await nextTick();
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
    });
    await wrapper
      .find(
        ".layui-page-limits  .layui-select .layui-input .layui-input-wrapper"
      )
      .trigger("click");
    await sleep();

    const options = wrapper.findAllComponents(LaySelectOption);
    options[3]?.trigger("click");
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
    await wrapper.find(".layui-pager-jumper .layui-input input").setValue(2);
    await wrapper.find(".layui-pager-jumper .layui-btn").trigger("click");
    await nextTick();
    expect(+wrapper.find(".layui-pager .is-active").text()).toEqual(2);

    const GETINPUT_DOM = wrapper.find(
      '.layui-pager-jumper input[type="number"]'
    );
    const GETPAGELASTDOM = wrapper.find(
      ".layui-pager  .layui-pager-number:last-child"
    );
    const GETPAGEFIRSTDOM = wrapper.find(
      ".layui-pager  .layui-pager-number:first-child"
    );

    await GETINPUT_DOM.setValue(1000);

    await GETINPUT_DOM.trigger("blur");

    await nextTick();
    let inputValue = (GETINPUT_DOM.element as HTMLInputElement).value;

    expect(+inputValue).toBe(+GETPAGELASTDOM.text());

    await GETINPUT_DOM.setValue(0);

    GETINPUT_DOM.trigger("blur");
    await nextTick();
    inputValue = (GETINPUT_DOM.element as HTMLInputElement).value;
    expect(+inputValue).toBe(+GETPAGEFIRSTDOM.text());
    wrapper.find(".layui-page-refresh").trigger("click");
    wrapper.unmount();
  });

  test("render disabled test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total,
        disabled: true,
      },
    });
    expect(wrapper.classes("is-disabled")).toBe(true);
    await wrapper.setProps({ disabled: false });
    expect(wrapper.classes("is-disabled")).toBe(false);
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
    });
    expect(wrapper.find(".is-active").classes("layui-bg-blue")).toBe(true);
    await wrapper.setProps({ theme: "yellow" });
    expect(wrapper.find(".is-active").classes("layui-bg-yellow")).toBe(true);
    wrapper.unmount();
  });

  test("render ellipsisTooltip test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total,
        limit,
        ellipsisTooltip: true,
      },
    });
    const findDropDown = wrapper.findComponent(LayDropdown).vm as InstanceType<
      typeof LayDropdown
    >;
    expect(findDropDown.disabled).toBe(false);

    await wrapper.setProps({ ellipsisTooltip: false });
    await nextTick();
    expect(findDropDown.disabled).toBe(true);

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
    });
    expect(wrapper.find(".layui-page-next").text()).toEqual("next");
    expect(wrapper.find(".layui-page-prev").text()).toEqual("prev");
    wrapper.unmount();
  });

  test("render simple test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total,
        simple: true,
      },
    });
    await wrapper.find(".layui-pager-jumper input").setValue(1000);
    await wrapper.find(".layui-pager-jumper input").trigger("blur");
    const currentPage = wrapper.vm.currentPage;

    expect(currentPage).toBe(Math.ceil(total / 10));

    await wrapper.find(".layui-pager-jumper input").setValue(-1);
    await wrapper.find(".layui-pager-jumper input").trigger("blur");
    const newVal = wrapper.vm.currentPage;

    expect(newVal).toBe(1);
    wrapper.unmount();
  });

  test("render hide-on-single-page test", async () => {
    const wrapper = mount(LayPage, {
      props: {
        modelValue: initMinVal,
        total: 1,
        hideOnSinglePage: true,
      },
    });
    expect(wrapper.text()).toBe("");
    wrapper.unmount();
  });

  // https://gitee.com/layui-vue/layui-vue/issues/IB0ANQ
  test("前置 ellipsisTooltip", async () => {
    const _value = ref(1);

    const wrapper = mount(LayPage, {
      props: {
        modelValue: _value.value,
        limit: 10,
        total: 100,
        ellipsisTooltip: true,
        "onUpdate:modelValue": (value) => {
          _value.value = value;
        },
      },
    });

    const lis = wrapper.findAll(".layui-pager li");

    await lis[lis.length - 1].trigger("click");

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(_value.value).toBe(10);

    const prevLi = wrapper.find(".layui-pager .layui-page-left-number");

    await prevLi.trigger("mouseenter");
    await sleep(400);

    const DropdownInstance = wrapper.findComponent(LayDropdown);

    const DropdownMenuItems =
      DropdownInstance.findAllComponents(LayDropdownMenuItem);

    await DropdownMenuItems[0].trigger("click");

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(_value.value).toEqual(5);
  });
});
