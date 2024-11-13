import { nextTick, ref, reactive } from "vue";
import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { sleep } from "../../../test-utils";

import LayForm from "../index.vue";
import LayFormItem from "../../formItem/index.vue";
import LayInput from "../../input/index.vue";

describe("LayForm", () => {
  describe("asyncValidator", () => {
    function createForm() {
      const model = reactive({
        password: "",
      });

      const rules = {
        password: {
          asyncValidator: async (rule: any, value: any, callback: any) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                if (value == "123") {
                  callback();
                }
                callback(new Error(`${rule.field}重复`));
              }, 200);
            });
          },
        },
      } as any;

      const wrapper = mount({
        setup() {
          return () => (
            <LayForm model={model} rules={rules}>
              <LayFormItem label="密码" prop="password">
                <LayInput v-model={model.password}></LayInput>
              </LayFormItem>
            </LayForm>
          );
        },
      });

      return wrapper;
    }

    test("是否显示错误信息", async () => {
      const wrapper = createForm();

      expect(
        wrapper
          .find(".layui-form-item .layui-input-block .layui-error-message")
          .exists()
      ).toBeFalsy();

      const inputComponent = wrapper.findComponent(LayInput);
      inputComponent.setValue("1");

      await sleep(300);
      expect(
        wrapper
          .find(".layui-form-item .layui-input-block .layui-error-message")
          .exists()
      ).toBeTruthy();
    });

    test("form validate Promise用法", async () => {
      const wrapper = createForm();

      const formComponent = wrapper.findComponent(LayForm);

      async function validate() {
        return await formComponent.vm
          .validate()
          .then(() => true)
          .catch(() => false);
      }

      let result = await validate();

      await sleep(300);
      expect(result).toBeFalsy();

      const inputComponent = wrapper.findComponent(LayInput);
      inputComponent.setValue("123");

      await nextTick();
      result = await validate();

      await sleep(300);
      expect(result).toBeTruthy();
    });

    test("form validate callback用法", async () => {
      const wrapper = createForm();

      const formComponent = wrapper.findComponent(LayForm);

      let fn = vi.fn();

      formComponent.vm.validate(fn);

      await sleep(300);
      expect(fn.mock.calls[0][0]).toBeFalsy();

      const inputComponent = wrapper.findComponent(LayInput);
      inputComponent.setValue("123");

      fn = vi.fn();

      formComponent.vm.validate(fn);
      await sleep(300);
      expect(fn.mock.calls[0][0]).toBeTruthy();
    });
  });

  describe("validator", () => {
    function createForm() {
      const model = reactive({
        account: "",
        password: "",
      });

      const wrapper = mount({
        setup() {
          return () => (
            <LayForm model={model}>
              <LayFormItem label="账号" prop="account">
                <LayInput v-model={model.account}></LayInput>
              </LayFormItem>
              <LayFormItem label="密码" prop="password" required={true}>
                <LayInput v-model={model.password}></LayInput>
              </LayFormItem>
            </LayForm>
          );
        },
      });

      return wrapper;
    }

    test("单个 required form-item是否触发校验", async () => {
      const wrapper = createForm();

      const formComponent = wrapper.findComponent(LayForm);

      const fn = vi.fn();

      formComponent.vm.validate(fn);
      await sleep(300);

      expect(fn).toHaveBeenCalled();
      expect(fn.mock.calls[0][0]).toBeFalsy();
    });
  });
});
