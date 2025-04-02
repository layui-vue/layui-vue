import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, test } from "vitest";
import { sleep } from "../../../test-utils";

import LayDropdown from "../../dropdown/index.vue";
import LayDatePicker from "../index.vue";
import DateRangeComponent from "../component/DateRange.vue";
import Shortcuts from "../component/common/Shortcuts.vue";
// import DateComponent from "../component/common/Date.vue";
// import Year from "../component/common/Year.vue";
// import Footer from "../component/common/Footer.vue";
import Month from "../component/common/Month.vue";
import { nextTick } from "vue";
import { dayjsToString } from "../util";

const mockInputClick = async (wrapper: any, inputClass = ".start-input") => {
  await wrapper.find(inputClass).trigger("click");
  await nextTick();
  await sleep();
};

describe("LayDatePicker date type", () => {
  afterEach(() => {
    document.querySelectorAll(".layui-popper").forEach((el) => el.remove());
  });

  test("初始化modelValue 右侧看板日期错误", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        range: true,
        modelValue: ["2024-10-01", "2024-10-31"],
      },
    });

    await mockInputClick(wrapper);

    const DateRangeInstance = wrapper.findComponent(DateRangeComponent);

    const [leftDate, rigDate] = DateRangeInstance.findAll(
      ".layui-laydate-range-main .layui-laydate-main"
    );

    const [leftYear, leftMonth] = leftDate.findAll(
      ".layui-laydate-header .laydate-set-ym span"
    );

    expect(parseInt(leftYear.text())).toBe(2024);
    expect(parseInt(leftMonth.text())).toBe(10);

    const [rightYear, rightMonth] = rigDate.findAll(
      ".layui-laydate-header .laydate-set-ym span"
    );

    expect(parseInt(rightYear.text())).toBe(2024);
    expect(parseInt(rightMonth.text())).toBe(11);
  });

  test("simple模式 点击快捷选项下拉关闭", async () => {
    const shortcuts = [
      {
        text: "两年",
        value: ["2024", "2025"],
      },
    ];

    const wrapper = mount(LayDatePicker, {
      props: {
        range: true,
        simple: true,
        modelValue: [],
        shortcuts,
      },
    });

    await mockInputClick(wrapper);

    const dropdownInstance1 = wrapper.findComponent(LayDropdown);
    expect((dropdownInstance1.vm as any).open).toBeTruthy();

    const shortcut = wrapper.findComponent(Shortcuts);
    const lis = shortcut.findAll("li");
    expect(lis.length).toBe(1);

    await (lis[0] as any).trigger("click");
    await sleep();
    const dropdownInstance2 = wrapper.findComponent(LayDropdown);
    expect((dropdownInstance2.vm as any).open).toBeFalsy();
  });

  // https://gitee.com/layui-vue/layui-vue/issues/IB5P5N
  test("min 月份禁用错误", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        range: true,
        simple: true,
        defaultValue: "2024-11-01",
        min: "2019-11-20",
        max: "2024-11-20",
      },
    });

    await mockInputClick(wrapper);

    const DateRangeInstance = wrapper.findComponent(DateRangeComponent);

    const [leftDate] = DateRangeInstance.findAll(
      ".layui-laydate-range-main .layui-laydate-main"
    );

    const [_, leftMonth] = leftDate.findAll(
      ".layui-laydate-header .laydate-set-ym span"
    );

    await leftMonth.trigger("click");
    await sleep(200);

    const MonthInstance = wrapper.findComponent(Month);
    const monthLis = MonthInstance.findAll(".laydate-month-list li") as any[];

    expect(
      monthLis.at(-1).element.classList.contains("layui-disabled")
    ).toBeTruthy(); // 12月
    expect(
      monthLis.at(-3).element.classList.contains("layui-disabled")
    ).toBeFalsy(); // 10月
  });
});
