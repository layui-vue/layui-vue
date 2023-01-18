<script lang="ts">
export default {
  name: "LayForm",
};
</script>

<script setup lang="ts">
import "./index.less";
import { toRefs, provide, reactive, onMounted } from "vue";
import { Rule, ValidateError, ValidateMessages } from "async-validator";
import { LayFormItemContext, FormCallback, modelType } from "../../types/form";

export interface FormProps {
  model?: modelType;
  required?: boolean;
  rules?: Rule;
  initValidate?: boolean;
  requiredIcons?: string;
  requiredErrorMessage?: string;
  validateMessage?: ValidateMessages;
  useCN?: boolean;
}

const props = withDefaults(defineProps<FormProps>(), {
  model: function () {
    return {};
  },
  useCN: true,
  requiredIcons: "",
  initValidate: false,
});

const formItems: LayFormItemContext[] = [];
const formItemMap: { [key: string]: LayFormItemContext } = {};

const emit = defineEmits(["submit"]);

// 初始化表单就进行校验
onMounted(() => {
  props.initValidate && validate()?.catch((err) => {});
});

// 原生提交表单事件
const submit = function () {
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
const validate = function (
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
  validateItems.forEach((filed) => {
    filed.validate((errors, _fields) => {
      errorsArrs = errorsArrs.concat(errors as ValidateError[]);
    });
  });
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
  for (const key in props.model) {
    props.model[key] = null;
  }
  // 重新校验
  setTimeout(() => validate()?.catch((err) => {}), 0);
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
  <form class="layui-form" :onsubmit="submit">
    <slot></slot>
  </form>
</template>
