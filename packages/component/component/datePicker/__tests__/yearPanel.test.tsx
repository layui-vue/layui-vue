import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, test } from "vitest";
import { nextTick, ref } from "vue";
import { sleep } from "../../../test-utils";

import LayDatePicker from "../index.vue";
import LayDropdown from "../../dropdown/index.vue";
import Year from "../component/common/Year.vue";
import Footer from "../component/common/Footer.vue";
import Shortcuts from "../component/common/Shortcuts.vue";
import { getYears } from "../util";

const mockInputClick = async (wrapper: any) => {
  await wrapper.find(".layui-input").trigger("click");
  await nextTick();
  await sleep();
};

describe("LayDatePicker year type", () => {
  afterEach(() => {
    document.querySelectorAll(".layui-popper").forEach((el) => el.remove());
  });

  test("year render", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        type: "year",
        modelValue: "2024/10/01 10:00:00",
      },
    });

    const datePickerInstance = wrapper.findComponent(LayDatePicker);
    const dropdownInstance = datePickerInstance.findComponent(LayDropdown);
    await nextTick();

    await datePickerInstance.find(".layui-input").trigger("click");
    await nextTick();
    await sleep();

    const yearPanelInstance = datePickerInstance.findComponent(Year);

    expect(dropdownInstance.exists()).toBe(true);
    expect((dropdownInstance.vm as any).open).toBe(true);
    expect(yearPanelInstance.findAll("li").length).toBe(getYears().length);
  });

  test("year 外部修改modelValue 内部状态更新", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        type: "year",
        modelValue: "2024/10/01 10:00:00",
      },
    });

    const datePickerInstance = wrapper.findComponent(LayDatePicker);
    await nextTick();
    await datePickerInstance.find(".layui-input").trigger("click");
    await nextTick();
    await sleep();

    const yearPanelInstance = datePickerInstance.findComponent(Year);
    expect(yearPanelInstance.exists()).toBe(true);
    expect((yearPanelInstance.vm as any).currentYear).toBe(2024);

    wrapper.setProps({
      modelValue: "2023/10/01 10:00:00",
    });
    await nextTick();
    await sleep();

    expect((yearPanelInstance.vm as any).currentYear).toBe(2023);
  });

  test("year yearPage", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        type: "year",
        yearPage: 20,
      },
    });

    await mockInputClick(wrapper);

    const yearLis = wrapper
      .findComponent(Year)
      .findAll(".laydate-year-list li");

    expect(yearLis.length).toBe(20);
  });

  test("year 点击年份 触发update:modelValue and change emit", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        type: "year",
      },
    });

    await mockInputClick(wrapper);

    const yearLis = wrapper
      .findComponent(Year)
      .findAll(".laydate-year-list li");

    await yearLis[0].trigger("click");

    const datePicker = wrapper.findComponent(LayDatePicker);

    const confirmBtn = wrapper
      .findComponent(Footer)
      .find(".laydate-footer-btns .laydate-btns-confirm");

    await confirmBtn.trigger("click");

    expect(datePicker.emitted()).toHaveProperty("update:modelValue");
    expect(datePicker.emitted()).toHaveProperty("change");

    expect(datePicker.emitted().change[0]).toEqual(["2011"]);
    expect(datePicker.emitted()["update:modelValue"][0]).toEqual(["2011"]);
  });

  test("year 手动改变input 触发改变modelValue", async () => {
    const dateValue = ref();
    const wrapper = mount({
      setup() {
        return () => (
          <LayDatePicker type="year" v-model={dateValue.value}></LayDatePicker>
        );
      },
    });

    const inputDom = wrapper.find("input");

    inputDom.element.value = "2025";
    await inputDom.trigger("input");
    await inputDom.trigger("change");

    await sleep();
    const datePicker = wrapper.findComponent(LayDatePicker);
    expect(datePicker.props("modelValue")).toEqual("2025");

    await mockInputClick(wrapper);
    const YearInstance = wrapper.findComponent(Year);
    const currentLi = YearInstance.find(".laydate-year-list .layui-this");
    expect(currentLi.text()).toEqual("2025");
  });

  test("year simple", async () => {
    const dateValue = ref();
    const wrapper = mount({
      setup() {
        return () => (
          <LayDatePicker
            type="year"
            v-model={dateValue.value}
            simple={true}
          ></LayDatePicker>
        );
      },
    });

    await mockInputClick(wrapper);

    const FooterInstance = wrapper.findComponent(Footer);

    const confirmBtn = FooterInstance.find(
      ".laydate-footer-btns .laydate-btns-confirm"
    );

    expect(confirmBtn.exists()).toBeFalsy();

    const YearInstance = wrapper.findComponent(Year);
    const lis = YearInstance.findAll(".laydate-year-list li");
    await lis[0].trigger("click");

    const datePicker = wrapper.findComponent(LayDatePicker);
    expect(datePicker.props("modelValue")).toBe("2011");
  });

  test("year min/max", async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <LayDatePicker
            type="year"
            min="2023"
            max="2024"
            modelValue={"2024"}
          ></LayDatePicker>
        );
      },
    });

    await mockInputClick(wrapper);

    const YearInstance = wrapper.findComponent(Year);
    const currentLi = YearInstance.find(".laydate-year-list .layui-this");

    const preLi =
      currentLi.element.previousElementSibling?.previousElementSibling;
    const nextLi = currentLi.element.nextElementSibling;

    expect(preLi?.className).toContain("layui-disabled");
    expect(nextLi?.className).toContain("layui-disabled");
  });

  test("year shortcuts", async () => {
    const dateValue = ref();

    const wrapper = mount({
      setup() {
        const shortcuts = [
          {
            text: "明年",
            value: "2025",
          },
          {
            text: "后年",
            value: "2026",
          },
        ];

        return () => (
          <LayDatePicker
            type="year"
            v-model={dateValue.value}
            shortcuts={shortcuts}
          ></LayDatePicker>
        );
      },
    });

    await mockInputClick(wrapper);

    const DatePicker = wrapper.findComponent(LayDatePicker);
    const ShortcutsDom = wrapper.findComponent(Shortcuts);
    const YearInstance = wrapper.findComponent(Year);
    const FooterInstance = wrapper.findComponent(Footer);
    const ShortcutsLi = ShortcutsDom.findAll("li");

    expect(ShortcutsLi.length).toBe(2);

    await ShortcutsLi[1].trigger("click");

    const thisLi = YearInstance.find(".layui-this");
    expect(thisLi.text()).toBe("2026");

    const confirmBtn = FooterInstance.find(
      ".laydate-footer-btns .laydate-btns-confirm"
    );

    await confirmBtn.trigger("click");

    expect(DatePicker.props("modelValue")).toBe("2026");
  });

  test("year disabled-date", async () => {
    const wrapper = mount({
      setup() {
        const disabledDate = (date: Date): boolean => {
          return !!(date.getFullYear() % 2);
        };

        return () => (
          <LayDatePicker
            modelValue="2024"
            type="year"
            disabledDate={disabledDate}
          ></LayDatePicker>
        );
      },
    });

    await mockInputClick(wrapper);

    const YearInstance = wrapper.findComponent(Year);
    const currentLi = YearInstance.find(".laydate-year-list .layui-this");

    const preLi = currentLi.element.previousElementSibling;
    const nextLi = currentLi.element.nextElementSibling;

    expect(preLi?.className).toContain("layui-disabled");
    expect(nextLi?.className).toContain("layui-disabled");

    const inputDom = wrapper.find("input");

    inputDom.element.value = "2025";
    await inputDom.trigger("input");
    await inputDom.trigger("change");

    await sleep();
    const datePicker = wrapper.findComponent(LayDatePicker);
    expect(datePicker.props("modelValue")).toEqual("2024");
  });
});
