import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, test } from "vitest";
import { nextTick } from "vue";
import { sleep } from "../../../test-utils";

import LayDatePicker from "../index.vue";
import LayDropdown from "../../dropdown/index.vue";
import YearPanel from "../components/YearPanel.vue";
import { getYears } from "../day";

describe("YearPanel", () => {
  afterEach(() => {
    document.querySelectorAll(".layui-popper").forEach((el) => el.remove());
  });

  test("render", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        type: "year",
        modelValue: "2024/10/01 10:00:00",
      },
    });

    const datePickerInstance = wrapper.findComponent(LayDatePicker);
    const dropdownInstance = datePickerInstance.findComponent(LayDropdown);
    await nextTick();
    datePickerInstance.find(".layui-input").trigger("click");
    await nextTick();
    await sleep();
    const yearPanelInstance = datePickerInstance.findComponent(YearPanel);
    expect(dropdownInstance.exists()).toBe(true);
    expect((dropdownInstance.vm as any).open).toBe(true);
    expect(yearPanelInstance.findAll("li").length).toBe(getYears().length);
  });

  test("year 修改", async () => {
    const wrapper = mount(LayDatePicker, {
      props: {
        type: "year",
        modelValue: "2024/10/01 10:00:00",
      },
    });

    const datePickerInstance = wrapper.findComponent(LayDatePicker);
    await nextTick();
    datePickerInstance.find(".layui-input").trigger("click");
    await nextTick();
    await sleep();
    const yearPanelInstance = datePickerInstance.findComponent(YearPanel);
    expect(yearPanelInstance.exists()).toBe(true);
    expect((yearPanelInstance.vm as any).Year).toBe(2024);

    wrapper.setProps({
      modelValue: "2023/10/01 10:00:00",
    });
    await nextTick();
    // FIXME : 修改 modelValue 后，YearPanel 的 Year 属性没有更新
    // expect((yearPanelInstance.vm as any).Year).toBe(2023);
  });
});
