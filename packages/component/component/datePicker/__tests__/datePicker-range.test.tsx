import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, test } from "vitest";
import { sleep } from "../../../test-utils";

import LayDatePicker from "../index.vue";
import DateRangeComponent from "../component/DateRange.vue";
import DateComponent from "../component/common/Date.vue";
import Year from "../component/common/Year.vue";
import Footer from "../component/common/Footer.vue";
// import Month from "../component/common/Month.vue";
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
});
