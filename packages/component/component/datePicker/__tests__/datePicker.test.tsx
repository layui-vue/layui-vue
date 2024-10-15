import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, test } from "vitest";
import { sleep } from "../../../test-utils";

import LayDatePicker from "../index.vue";
import Date from "../component/common/Date.vue";
import Year from "../component/common/Year.vue";
import Footer from "../component/common/Footer.vue";
// import Month from "../component/common/Month.vue";
import { nextTick } from "vue";
import { dayjsToString } from "../util";

const mockInputClick = async (wrapper: any) => {
  await wrapper.find(".layui-input").trigger("click");
  await nextTick();
  await sleep();
};

describe("LayDatePicker date type", () => {
  afterEach(() => {
    document.querySelectorAll(".layui-popper").forEach((el) => el.remove());
  });

  test("modelValue", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        modelValue: "2025/11/12 10:00:00",
      },
    });

    await mockInputClick(wrapper);

    const component = wrapper.findComponent(LayDatePicker);
    const DateInstance = wrapper.findComponent(Date);

    const [YearSpan, MonthSpan] = DateInstance.findAll(
      ".layui-laydate-header .laydate-set-ym span"
    );

    expect((component.props() as any).modelValue).toBe("2025/11/12 10:00:00");

    expect(YearSpan.text()).toContain("2025");
    expect(MonthSpan.text()).toContain("11");

    const dateCurrent = DateInstance.find(".layui-laydate-content .layui-this");

    expect(dateCurrent.exists()).toBeTruthy();
    expect(dateCurrent.text()).toBe("12");

    await YearSpan.trigger("click");
    await sleep();

    const YearInstance = wrapper.findComponent(Year);

    expect((YearInstance.vm as any).currentYear).toBe(2025);

    const YearCurrent = YearInstance.find(".layui-laydate-content .layui-this");

    expect(YearCurrent.exists()).toBeTruthy();
    expect(YearCurrent.text()).toBe("2025");
  });

  test("外部修改 modelValue 内部选中改变", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        modelValue: "2025/11/12",
      },
    });

    await mockInputClick(wrapper);

    await wrapper.setProps({
      modelValue: "2024/10/02",
    });

    await nextTick();

    const component = wrapper.findComponent(LayDatePicker);

    expect((component.props() as any).modelValue).toBe("2024/10/02");

    const DateInstance = wrapper.findComponent(Date);
    const [YearSpan, MonthSpan] = DateInstance.findAll(
      ".layui-laydate-header .laydate-set-ym span"
    );
    const dateCurrent = DateInstance.find(".layui-laydate-content .layui-this");

    expect(YearSpan.text()).toContain("2024");
    expect(MonthSpan.text()).toContain("10");
    expect(dateCurrent.text()).toBe("2");

    await YearSpan.trigger("click");
    await sleep();

    const YearInstance = wrapper.findComponent(Year);

    expect((YearInstance.vm as any).currentYear).toBe(2024);
  });

  test("update:modelValue", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        modelValue: "2025/11/12",
      },
    });
    const datePicker = wrapper.findComponent(LayDatePicker);

    await mockInputClick(wrapper);
    const DateInstance = wrapper.findComponent(Date);

    const dateCurrent = DateInstance.findAll(
      ".layui-laydate-content td:not(.laydate-day-prev)"
    );

    // click 2号
    await dateCurrent[1].trigger("click");

    const confirmBtn = wrapper
      .findComponent(Footer)
      .find(".laydate-footer-btns .laydate-btns-confirm");

    await confirmBtn.trigger("click");

    expect(datePicker.emitted()).toHaveProperty("update:modelValue");
    expect(datePicker.emitted()["update:modelValue"][0]).toEqual([
      "2025-11-02",
    ]);
  });

  test("min/max", async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <LayDatePicker min="2024/10/2" max="2024/10/13"></LayDatePicker>
        );
      },
    });

    await mockInputClick(wrapper);
    const DateInstance = wrapper.findComponent(Date);

    const dateCurrent = DateInstance.findAll(
      ".layui-laydate-content td:not(.laydate-day-prev)"
    );

    expect(
      dateCurrent[0].element.classList.contains("layui-disabled")
    ).toBeTruthy();
    expect(
      dateCurrent[13].element.classList.contains("layui-disabled")
    ).toBeTruthy();

    expect(
      dateCurrent[12].element.classList.contains("layui-disabled")
    ).toBeFalsy();
  });

  test("shortcuts", async () => {
    const time = new window.Date();
    const wrapper = mount({
      setup() {
        return () => (
          <LayDatePicker
            type="date"
            simple={true}
            shortcuts={[
              {
                text: "今天",
                value: time,
              },
              {
                text: "昨天",
                value: () => time.getTime() - 86400000,
              },
            ]}
          ></LayDatePicker>
        );
      },
    });

    const datePickerInstance = wrapper.findComponent(LayDatePicker);
    await mockInputClick(wrapper);
    const shortcuts = document.body.querySelectorAll(
      ".layui-laydate-shortcut li"
    );

    await shortcuts[1].dispatchEvent(new MouseEvent("click"));
    await nextTick();
    await sleep();

    expect(document.body.querySelector(".layui-this")?.textContent).toBe(
      dayjsToString(time.getTime() - 86400000, "D")
    );
  });
});
