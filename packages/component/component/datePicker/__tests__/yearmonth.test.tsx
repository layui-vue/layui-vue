import { mount, VueWrapper } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import LayDatePicker from "../index.vue";
import { nextTick } from "vue";
import { sleep } from "../../../test-utils";
import { getYears } from "../util";

const getInputElementValue = (el: VueWrapper) => el.get("input").element.value;
const getInstanceModelValue = (el: VueWrapper) =>
  (el.vm.$props as any).modelValue!;
const clickInput = async (el: VueWrapper) => {
  await el.get(".layui-input").trigger("click");
  await nextTick();
  await sleep();
};
const getPopperElement = () => document.body.querySelector(".layui-popper");
const openYearPanel = async () => {
  const popperElement = getPopperElement();
  if (popperElement) {
    try {
      popperElement
        .querySelector(".laydate-set-ym span")!
        .dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      // do nothing
    }
    await nextTick();
    await sleep();
  }
};
const closeYearPanel = async () => {
  const popperElement = getPopperElement();
  if (popperElement) {
    try {
      popperElement
        .querySelector(".laydate-year-list li.layui-this")!
        .dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      // do nothing
    }
    await nextTick();
    await sleep();
  }
};
const selectYear = async (year: number) => {
  const popperElement = getPopperElement();
  if (popperElement) {
    await openYearPanel();
    Array.from(popperElement.querySelectorAll(`.laydate-year-list li`)!)
      .find((el) => el.textContent === year.toString())!
      .dispatchEvent(new MouseEvent("click"));
    await nextTick();
    await sleep();
    await closeYearPanel();
  }
};
const yearRange = async () => {
  await openYearPanel();
  const popperElement = getPopperElement();
  let r: Array<Number> = [];
  if (popperElement) {
    r = Array.from(
      popperElement.querySelectorAll(`.laydate-year-list li`)!
    ).map((el) => Number(el.textContent));
  }
  await closeYearPanel();
  return r;
};
const selectMonth = async (month: number) => {
  const popperElement = getPopperElement();
  if (popperElement) {
    await closeYearPanel();
    Array.from(popperElement.querySelectorAll(`.laydate-month-list li`)!)
      .find((el) => `${el.textContent}` === `${month.toString()}月`)!
      .dispatchEvent(new MouseEvent("click"));
    await nextTick();
    await sleep();
  }
};
const clickOk = async () => {
  const popperElement = getPopperElement();
  if (popperElement) {
    try {
      popperElement
        .querySelector(".laydate-btns-confirm")!
        .dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      // do nothing
    }
    await nextTick();
    await sleep();
  }
};

describe("LayDatePicker yearmonth type", () => {
  afterEach(() => {
    document.querySelectorAll(".layui-popper").forEach((el) => el.remove());
  });

  it("render", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        type: "yearmonth",
        modelValue: "",
      },
    });

    await nextTick();

    const datePickerInstance = wrapper.findComponent(LayDatePicker);
    expect(datePickerInstance.exists()).toBeTruthy();
    expect(getInputElementValue(datePickerInstance)).toBe("");
    expect(getInstanceModelValue(datePickerInstance)).toBe("");

    wrapper.setProps({
      modelValue: "2024-10",
    });

    await nextTick();
    expect(getInstanceModelValue(datePickerInstance)).toBe("2024-10");
    expect(getInputElementValue(datePickerInstance)).toBe("2024-10");

    await clickInput(wrapper);
    expect(getPopperElement()).toBeTruthy();
  });

  it("on simple mode", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        type: "yearmonth",
        modelValue: "2024-10",
        simple: true,
      },
    });

    await nextTick();

    const datePickerInstance = wrapper.findComponent(LayDatePicker);
    expect(datePickerInstance.exists()).toBeTruthy();
    expect(getInputElementValue(datePickerInstance)).toBe("2024-10");

    await clickInput(wrapper);
    const popperElement = getPopperElement();
    expect(popperElement).toBeTruthy();
    const years = await yearRange();
    expect(years).toEqual(getYears(2024));
    await selectYear(2022);
    await selectMonth(4);
    expect(datePickerInstance.emitted("update:modelValue")![0][0]).toBe(
      "2022-04"
    );
  });
});
