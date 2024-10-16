import { nextTick, reactive, h } from "vue";

import { describe, expect, test, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { sleep } from "@layui/component/test-utils";

import LayForm from "../form";

describe("LayJsonSchemaForm", () => {
  afterEach(() => {
    const popperDom = document.body.querySelector(".layui-popper");
    if (popperDom) {
      popperDom.remove();
    }
  });

  test("label width", async () => {
    const wrapper = mount({
      setup() {
        const schema = reactive({
          text1: {
            label: "输入框",
            type: "input",
            props: {
              type: "text",
            },
            colProps: {
              md: 12,
            },
          },
          text2: {
            label: "输入框",
            type: "input",
            labelWidth: 100,
            props: {
              type: "text",
            },
            colProps: {
              md: 12,
            },
          },
        });

        return () => <LayForm schema={schema} label-width={"90px"}></LayForm>;
      },
    });

    await nextTick();
    const childrenWrapper = wrapper.findAll<HTMLElement>(".layui-form-label");

    expect(childrenWrapper[0].element.style.width).toEqual("90px");
    expect(childrenWrapper[1].element.style.width).toEqual("100px");
  });

  test("grid layout", async () => {
    const wrapper = mount({
      setup() {
        const schema = reactive({
          text1: {
            label: "输入框",
            type: "input",
            props: {
              type: "text",
            },
            colProps: {
              md: 12,
            },
          },
          text2: {
            label: "输入框",
            type: "input",
            props: {
              type: "text",
            },
            colProps: {
              md: 12,
            },
          },
          text3: {
            label: "输入框",
            type: "input",
            props: {
              type: "text",
            },
            colProps: {
              md: 6,
            },
          },
          text4: {
            label: "输入框",
            type: "input",
            props: {
              type: "text",
            },
            colProps: {
              md: 6,
            },
          },
          text5: {
            label: "输入框",
            type: "input",
            props: {
              type: "text",
            },
            colProps: {
              md: 6,
            },
          },
          text6: {
            label: "输入框",
            type: "input",
            props: {
              type: "text",
            },
            colProps: {
              md: 6,
            },
          },
        });

        return () => <LayForm schema={schema}></LayForm>;
      },
    });

    await nextTick();
    const childrenWrapper = wrapper.findAll(".layui-col");

    expect(childrenWrapper[0].classes("layui-col-md12")).toBe(true);
    expect(childrenWrapper[2].classes("layui-col-md6")).toBe(true);
  });

  test("model v-model", async () => {
    const wrapper = mount({
      setup() {
        const schema = reactive({
          text1: {
            label: "输入框",
            type: "input",
            props: {
              type: "text",
            },
            colProps: {
              md: 12,
            },
          },
          select1: {
            label: "选择框",
            type: "select",
            props: {
              options: [
                { label: "篮球", value: "1" },
                { label: "rep", value: "2" },
              ],
            },
            colProps: {
              md: 12,
            },
          },
          date1: {
            label: "日期",
            type: "date",
            props: {
              type: "date",
            },
            colProps: {
              md: 12,
            },
          },
        });

        const model = reactive({
          text1: "123",
          select1: "1",
          date1: "2024-03-04",
        });

        return () => <LayForm model={model} schema={schema}></LayForm>;
      },
    });

    await nextTick();

    const inputDom = wrapper.find(".layui-input").find("input");
    const selectDom = wrapper.find(".layui-select").find("input");
    const dateDom = wrapper.find(".layui-date-picker").find("input");
    expect(inputDom.element.value).toBe("123");
    expect(selectDom.element.value).toBe("篮球");
    expect(dateDom.element.value).toBe("2024-03-04");

    inputDom.setValue("456");
    dateDom.setValue("2024-03-05");
    await nextTick();
    await nextTick();
    expect(inputDom.element.value).toBe("456");
    expect(dateDom.element.value).toBe("2024-03-05");

    // 仿select options展开点击操作
    await wrapper
      .find(".layui-select")
      .find<HTMLDivElement>(".layui-unselect")
      .element.click();
    await nextTick();
    await sleep(300);

    const optionsDom = wrapper.findAllComponents(".layui-select-option");
    await (optionsDom[1].element as HTMLElement).click();
    await nextTick();

    const selectDom1 = wrapper.find(".layui-select").find("input");
    expect(selectDom1.element.value).toBe("rep");
  });

  test("show message", async () => {
    const wrapper = mount({
      setup() {
        const schema = reactive({
          text1: {
            label: "输入框",
            type: "input",
            props: {
              type: "text",
            },
            colProps: {
              md: 12,
            },
          },
        });

        return () => <LayForm schema={schema} required={true}></LayForm>;
      },
    });

    const form = wrapper.findComponent(LayForm).vm;

    const valid = await form
      .validate()
      .then(() => true)
      .catch(() => false);

    await nextTick();
    expect(valid).toBe(false);
    expect(wrapper.find(".layui-error-message").exists()).toBe(true);
  });

  test("reset model", async () => {
    const model = reactive({
      text1: "",
      select1: "",
    });

    const wrapper = mount({
      setup() {
        const schema = reactive({
          text1: {
            label: "输入框",
            type: "input",
            props: {
              type: "text",
            },
            colProps: {
              md: 12,
            },
          },
          select1: {
            label: "选择框",
            type: "select",
            props: {
              options: [
                { label: "篮球", value: "1" },
                { label: "rep", value: "2" },
              ],
            },
            colProps: {
              md: 12,
            },
          },
        });

        return () => (
          <LayForm schema={schema} model={model} required={true}></LayForm>
        );
      },
    });

    model.text1 = "123";
    model.select1 = "1";

    const form = wrapper.getComponent(LayForm);

    await nextTick();

    expect(form.props("model")).toEqual({
      text1: "123",
      select1: "1",
    });

    form.vm.resetFields();

    await nextTick();
    expect(model.text1).toBe(null);
    expect(model.select1).toBe(null);
    await nextTick();
    expect(wrapper.findAll(".layui-error-message")).toHaveLength(0);
  });

  test("slot customRender render", async () => {
    const wrapper = mount({
      setup() {
        const schema = reactive({
          slot1: {
            label: "slot customRender string",
            slots: {
              customRender: "slot1",
            },
          },
          slot2: {
            label: "slot customRender function",
            slots: {
              customRender: () =>
                h("div", {
                  class: "slot-custom-render-function",
                }),
            },
          },
        });

        const model = reactive({
          slot1: "123",
        });

        return () => (
          <LayForm
            model={model}
            schema={schema}
            v-slots={{
              slot1: ({ schemaKey, schemaValue, model }) => (
                <div class="slot-custom-render-string">
                  <div class="slot-custom-render-string-schemaKey">
                    {schemaKey}
                  </div>
                  <div class="slot-custom-render-string-model">
                    {model[schemaKey]}
                  </div>
                </div>
              ),
            }}
          ></LayForm>
        );
      },
    });
    await nextTick();

    expect(wrapper.findAll(".slot-custom-render-string")).toHaveLength(1);
    expect(wrapper.findAll(".slot-custom-render-function")).toHaveLength(1);

    expect(wrapper.find(".slot-custom-render-string-schemaKey").text()).toBe(
      "slot1"
    );
    expect(wrapper.find(".slot-custom-render-string-model").text()).toBe("123");
  });

  test("component slot render", async () => {
    const wrapper = mount({
      setup() {
        const schema = reactive({
          input1: {
            label: "input prepend slot",
            type: "input",
            slots: {
              type: "text",
              prepend: "prependslot",
              append: "appendslot",
            },
          },
        });

        return () => (
          <LayForm
            schema={schema}
            v-slots={{
              prependslot: () => <div class="prependslot"></div>,
              appendslot: () => <div class="appendslot"></div>,
            }}
          ></LayForm>
        );
      },
    });
    await nextTick();

    expect(wrapper.findAll(".prependslot")).toHaveLength(1);
    expect(wrapper.findAll(".appendslot")).toHaveLength(1);
  });
});
