/*
 * @Author: baobaobao
 * @Date: 2023-10-18 13:21:13
 * @LastEditTime: 2023-10-23 09:16:33
 * @LastEditors: baobaobao
 */
import { mount, shallowMount, config } from "@vue/test-utils";
import LaySlider from "../index.vue";
import LayTooltip from "../../tooltip";

import { describe, expect, test, vi } from "vitest";
import { nextTick, reactive, ref } from "vue";

describe("LayPage.vue", () => {
  test("render modelValue test", async () => {
    const wrapper = mount(LaySlider, {
      props: {
        modelValue: 0,
      },
    });
    await nextTick();
    await wrapper.setProps({ modelValue: 10 });
    expect(wrapper.classes("layui-slider")).toBe(true);
    expect(wrapper.vm.modelValue).toEqual(10);
  });

  test("render vertical test", async () => {
    const wrapper = mount(LaySlider, {
      props: {
        vertical: true,
        modelValue: 0,
      },
    });
    await nextTick();
    const slider = wrapper.findComponent({ name: "LaySlider" });
    const LaySliderBar = wrapper.findComponent({ name: "LaySliderBar" });

    vi.spyOn(
      wrapper.find(".layui-slider").element,
      "getBoundingClientRect"
    ).mockImplementation(() => {
      return {
        width: 4,
        height: 200,
        bottom: 0,
      } as DOMRect;
    });
    slider.vm.handClick(new MouseEvent("mousedown", { clientY: -100 }));
    await nextTick();
    expect(LaySliderBar.vm.modelValue).toEqual(50);
    expect(wrapper.find(".layui-slider-bar").attributes().style).toContain(
      "height: 50%"
    );
    expect(wrapper.find(".layui-slider-handle").attributes().style).toContain(
      "bottom: 50%"
    );
  });
  test("render range test", async () => {
    const wrapper = mount(LaySlider, {
      props: {
        range: true,
        modelValue: [0, 10],
      },
    });
    await nextTick();
    const getDomInfo = wrapper.findAll(".layui-slider-handle");
    expect(getDomInfo).toHaveLength(2);
    expect(getDomInfo[0]?.attributes().style).toContain("left: 0%");
    expect(getDomInfo[1]?.attributes().style).toContain("left: 10%");
    expect(wrapper.find(".layui-slider-bar").attributes().style).toContain(
      "width: 10%"
    );
    await wrapper.setProps({ modelValue: [0, 20] });
    await nextTick();
    expect(wrapper.find(".layui-slider-bar").attributes().style).toContain(
      "width: 20%"
    );
    expect(getDomInfo[0]?.attributes().style).toContain("left: 0%");
    expect(getDomInfo[1]?.attributes().style).toContain("left: 20%");
  });

  test("render disabled test", async () => {
    const wrapper = mount(LaySlider, {
      props: {
        disabled: true,
        modelValue: 0,
      },
    });
    const slider = wrapper.findComponent({ name: "LaySlider" });
    const LaySliderBar = wrapper.findComponent({ name: "LaySliderBar" });

    vi.spyOn(
      wrapper.find(".layui-slider").element,
      "getBoundingClientRect"
    ).mockImplementation(() => {
      return {
        width: 200,
        height: 4,
        left: 0,
      } as DOMRect;
    });
    slider.vm.handClick(new MouseEvent("mousedown", { clientX: 100 }));
    await nextTick();
    expect(wrapper.find(".layui-slider-bar").attributes().style).toContain(
      "width: 0%"
    );
    expect(LaySliderBar.vm.modelValue === 0).toBeTruthy();
  });
  test("render step test", async () => {
    const wrapper = mount(LaySlider, {
      props: {
        modelValue: 0,
        step: 0.1,
        min: 0,
        max: 1,
      },
    });
    const slider = wrapper.findComponent({ name: "LaySlider" });
    const LaySliderBar = wrapper.findComponent({ name: "LaySliderBar" });
    vi.spyOn(
      wrapper.find(".layui-slider").element,
      "getBoundingClientRect"
    ).mockImplementation(() => {
      return {
        width: 200,
        height: 4,
        left: 0,
      } as DOMRect;
    });
    slider.vm.handClick(new MouseEvent("mousedown", { clientX: 100 }));
    await nextTick();
    expect(LaySliderBar.vm.modelValue === 0.5).toBeTruthy();
    expect(wrapper.find(".layui-slider-bar").attributes().style).toContain(
      "width: 50%"
    );
    expect(wrapper.find(".layui-slider-handle").attributes().style).toContain(
      "left: 50%"
    );
  });

  test("render min and max test", async () => {
    const value = ref(40);
    const wrapper = mount(LaySlider, {
      props: {
        modelValue: value.value,
        min: 40,
        max: 60,
      },
    });
    value.value = 10;
    await nextTick();
    expect(wrapper.vm.modelValue).toEqual(40);
  });

  test("render showDots test", async () => {
    const wrapper = mount(LaySlider, {
      props: {
        showDots: true,
        step: 10,
      },
    });
    expect(wrapper.findAll(".layui-slider-stop").length).toEqual(9);
  });
  test("render is-follow-mark and mark test", async () => {
    const marksValue = ref({
      0: "0°C",
      8: "8°C",
      37: "37°C",
      50: {
        style: {
          color: "#f50",
        },
        label: "50°C",
      },
    });

    const wrapper = mount(LaySlider, {
      props: {
        marks: marksValue.value,
      },
    });
    await nextTick();

    const getMark = wrapper.findAll(".layui-slider-mark-text");
    const getStop = wrapper.findAll(".layui-slider-stop");
    const slider = wrapper.findComponent({ name: "LaySlider" });
    const LaySliderBar = wrapper.findComponent({ name: "LaySliderBar" });

    vi.spyOn(
      wrapper.find(".layui-slider").element,
      "getBoundingClientRect"
    ).mockImplementation(() => {
      return {
        width: 200,
        height: 4,
        left: 0,
      } as DOMRect;
    });
    slider.vm.handClick(new MouseEvent("mousedown", { clientX: 46 }));
    await nextTick();
    expect(getMark.length).toEqual(4);
    expect(getStop.length).toEqual(4);
    expect(getMark[getMark.length - 1].attributes().style).toContain(
      "color: #f50"
    );
    expect(wrapper.find(".layui-slider-bar").attributes().style).toContain(
      "width: 37%"
    );
    expect(wrapper.find(".layui-slider-handle").attributes().style).toContain(
      "left: 37%"
    );
    expect(LaySliderBar.vm.modelValue).toEqual(37);
  });
  test("render reverse test", async () => {
    const wrapper = mount(LaySlider, {
      props: {
        reverse: true,
      },
    });
    expect(wrapper.classes("is-reverse")).toBeTruthy();
  });

  test("render tooltip-props	test", async () => {
    const tooltipProps = reactive({
      isDark: false,
      placement: "top",
      disabled: false,
    });
    const wrapper = mount(LaySlider, {
      props: {
        tooltipProps: tooltipProps,
      },
    });
    const LaySliderBar = wrapper.findComponent({ name: "LaySliderBar" });
    expect(LaySliderBar.vm.isDark).toBeFalsy();
    expect(LaySliderBar.vm.disabled).toBeFalsy();
    expect(LaySliderBar.vm.placement).toEqual("top");
    tooltipProps.placement = "bottom";
    await nextTick();
    expect(LaySliderBar.vm.placement).toEqual("bottom");
  });

  test("render format-tooltip	test", async () => {
    const formatTooltip = (val: number) => `@${val}`;
    const value = ref(10);
    const wrapper = mount(LaySlider, {
      props: {
        formatTooltip,
        modelValue: value.value,
      },
    });
    await nextTick();
    const LaySliderBar = wrapper.findComponent({ name: "LaySliderBar" });
    expect(LaySliderBar.vm.formatValue).toEqual("@10");
  });

  test("render slot  thumb test", async () => {
    const value = ref(10);
    const wrapper = mount(LaySlider, {
      props: {
        modelValue: value.value,
      },
      slots: {
        thumb: () => "按钮",
      },
    });
    expect(wrapper.find(".layui-slider-handle-thumb").text()).toEqual("按钮");
  });

  test("render slot  custom test", async () => {
    const value = ref(10);
    const marks = ref({
      0: "0°C",
      8: "8°C",
      37: "37°C",
      50: {
        style: {
          color: "#1989FA",
        },
        label: "50°C",
      },
      100: "100",
    });
    const wrapper = mount(LaySlider, {
      props: {
        modelValue: value.value,
        marks: marks.value,
      },
      slots: {
        mark: () => "mark",
      },
    });
    await nextTick();
    expect(wrapper.findAll(".layui-slider-mark-text")[0].text()).toEqual(
      "mark"
    );
  });
});
