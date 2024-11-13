<script setup lang="ts">
import "./index.less";

import type { FormProps as _FormProps } from "./interface";

import { toRefs, provide, reactive, onMounted, nextTick } from "vue";
import { ValidateError } from "async-validator";
import { LayFormItemContext, FormCallback } from "../../types/form";

export type FormProps = _FormProps;

defineOptions({
  name: "LayForm",
});

const props = withDefaults(defineProps<FormProps>(), {
  model: function () {
    return {};
  },
  pane: false,
  initValidate: false,
  useCN: true,
  requiredIcons: "",
  labelPosition: "right",
  isLabelTooltip: false,
});

const formItems: LayFormItemContext[] = [];
const formItemMap: { [key: string]: LayFormItemContext } = {};

const emit = defineEmits(["submit"]);

// 初始化表单就进行校验
onMounted(() => {
  props.initValidate && validate()?.catch((err) => {});
});

// 原生提交表单事件
const submit = function (e: SubmitEvent) {
  e.preventDefault();
  let _isValidate = false;
  validate((isValidate, model, errors) => {
    _isValidate = isValidate as boolean;
    emit("submit", isValidate, model, errors);
  });

  // 如果表单失败则阻止提交表单，成功则进行提交表单
  return _isValidate;
};

/**
 * 校验表单数据
 * @param fields 需要校验的表单字段(string|string[]); 该字段如果为function, 则默认为回调函数，校验全部字段;
 * @param callback 校验表单之后的回调函数
 **/
const validate = async function (
  fields?: string | string[] | FormCallback | null,
  callback?: FormCallback | null
) {
  // 根据参数识别需要校验的表单项
  let validateItems: LayFormItemContext[] = formItems;
  if (typeof fields === "function") {
    callback = fields;
  } else if (
    typeof fields === "string" ||
    (Array.isArray(fields) && fields.length > 0)
  ) {
    validateItems = [];
    const validateFields = !fields ? [] : ([] as string[]).concat(fields);
    validateFields.forEach(
      (field) => formItemMap[field] && validateItems.push(formItemMap[field])
    );
  }
  // 通过调用每个子项进行校验
  let errorsArrs: ValidateError[] = [];

  for (const filed of validateItems) {
    const result = await filed.validate();

    errorsArrs = errorsArrs
      .concat(result?.errors as ValidateError[])
      .filter(Boolean);
  }
  const isValidate = errorsArrs.length === 0;
  // 有回调则进行回调
  if (typeof callback === "function") {
    isValidate
      ? callback(true, props.model, null)
      : callback(false, props.model, errorsArrs);
    return null;
  }

  // 没有回调则创建一个Promise的链式调用
  return new Promise((resolve, reject) => {
    const callbackParams = {
      isValidate,
      model: props.model,
      errors: isValidate ? null : errorsArrs,
    };
    callbackParams.isValidate
      ? resolve(callbackParams)
      : reject(callbackParams);
  });
};

/**
 * 清除校验
 * @param fields 需要进行清除校验的表单字段(string|string[]); 该字段如果为null, 则默认为全部字段清除校验;
 **/
const clearValidate = function (fields?: string | string[]) {
  const clearFields = !fields ? [] : ([] as string[]).concat(fields);
  if (clearFields.length === 0) {
    formItems.forEach((filed) => filed.clearValidate());
  } else {
    clearFields.forEach(
      (field) => formItemMap[field] && formItemMap[field].clearValidate()
    );
  }
};

/**
 * 重置表单所有值
 **/
const reset = function () {
  resetObject(props.model);
  nextTick(() => clearValidate());
};

function resetObjectForProp(path: string, object: any): any {
  const paths = path.replace(/\[(\d+)\]/g, ".\$1").split(".");
  const prop = paths.shift();

  if (prop === undefined) {
    return undefined; // 如果路径为空，直接返回 undefined
  }

  if (object === undefined || object === null || typeof object !== "object") {
    return null; // 如果对象为空或不是对象，则返回 null
  }

  // 如果路径只有一个属性，将该属性值设为空，并返回对象
  if (paths.length === 0) {
    if (object[prop] instanceof Array) {
      object[prop] = [];
    } else {
      object[prop] = null;
    }
    return object;
  }

  // 递归地调用 reset 方法，继续清空路径中的下一个属性
  object[prop] = resetObjectForProp(paths.join("."), object[prop]);
  return object;
}

// 根据 prop 重置 model 对象
const resetObject = (obj: { [key: string]: unknown }): void => {
  for (var i = 0; i < formItems.length; i++) {
    if (formItems[i].prop != undefined) {
      resetObjectForProp(formItems[i].prop as string, obj);
    }
  }
};

// 添加子项
const addField = function (item: LayFormItemContext) {
  formItems.push(item);
  formItemMap[item.prop as string] = item;
};

/**
 * 删除 field 项
 *
 * @remark 在 1.8.5 新增内置方法，用于解决 form-item 在 unmounted 后验证仍生效的问题
 */
const removeField = function (item: LayFormItemContext) {
  // 删除 formItems 与 formItemMap 中激活的字段
  for (var i = 0; i < formItems.length; i++) {
    if (formItems[i].prop == item.prop) {
      formItems.splice(i, 1);
    }
  }
  // 使用 Es6 特性 Reflect.deleteProperty 清除
  item.prop != undefined && Reflect.deleteProperty(formItemMap, item.prop);
};

defineExpose({ validate, clearValidate, reset });

provide(
  "LayForm",
  reactive({
    formItems,
    addField,
    removeField,
    clearValidate,
    validate,
    ...toRefs(props),
  })
);
</script>

<template>
  <form :class="['layui-form', { 'layui-form-pane': pane }]" :onsubmit="submit">
    <slot></slot>
  </form>
</template>
