<template>
  <div class="layui-form-item" ref="formItemRef">
    <label class="layui-form-label">
      <span
        v-if="props.prop && isRequired"
        :class="
          ['layui-required', 'layui-icon'].concat(layForm.requiredIcons ?? '')
        "
      >
        <slot name="required" :props="{ ...props, model: layForm.model }">{{
          layForm.requiredIcons ? "" : "*"
        }}</slot>
      </span>
      <slot name="label" :props="{ ...props, model: layForm.model }">
        {{ label }}
      </slot>
    </label>
    <div :class="[mode ? 'layui-input-' + mode : '']">
      <div ref="slotParent">
        <slot :props="{ ...props, model: layForm.model }"></slot>
      </div>
      <span
        v-if="errorStatus"
        :class="[
          'layui-error-message',
          { 'layui-error-message-anim': errorStatus },
        ]"
        >{{ errorMsg }}</span
      >
    </div>
  </div>
</template>
<script setup name="LayFormItem" lang="ts">
import "./index.less";
import {
  defineProps,
  inject,
  withDefaults,
  ref,
  reactive,
  toRefs,
  onMounted,
  computed,
  watch,
} from "vue";
import {
  layFormKey,
  LayFormContext,
  LayFormItemContext,
  FieldValidateError,
} from "../type/form";
import Schema, {
  Rule,
  RuleItem,
  Rules,
  ValidateCallback,
  ValidateError,
  ValidateMessages,
} from "async-validator";
import cnValidateMessage from "./cnValidateMessage";

const props = withDefaults(
  defineProps<{
    prop?: string;
    mode?: string;
    label?: string;
    errorMessage?: string;
    rules?: Rule;
    required?: boolean;
  }>(),
  {
    mode: "block",
  }
);

const layForm = inject(layFormKey, {} as LayFormContext);
const formItemRef = ref<HTMLDivElement>();
const slotParent = ref<HTMLDivElement>();

// 是否必填
const isRequired = computed(() => {
  return props.required || layForm.required;
});

// 拼接校验规则
const ruleItems = computed(() => {
  const prop = props.prop;
  if (!prop) {
    return {};
  }

  let rulesArrs: RuleItem[] = [];
  if (isRequired.value) {
    rulesArrs.push({ required: true });
  }
  if (props.rules) {
    rulesArrs = rulesArrs.concat(props.rules as RuleItem | RuleItem[]);
  }
  if (layForm.rules && layForm.rules[prop]) {
    rulesArrs = rulesArrs.concat(layForm.rules[prop] as RuleItem | RuleItem[]);
  }
  return rulesArrs;
});

// 值 计算 和 监听
const filedValue = computed(() =>
  props.prop ? layForm.model[props.prop] : undefined
);
watch(
  () => filedValue.value,
  (val) => validate(),
  { deep: true }
);

// 错误状态和信息
const errorStatus = ref(false);
const errorMsg = ref();
// 校验数据有效性
const validate = (callback?: ValidateCallback) => {
  if (props.prop && (ruleItems.value as RuleItem[]).length > 0) {
    // 校验规则
    const descriptor: Rules = {};
    descriptor[layForm.useCN ? props.label || props.prop : props.prop] =
      ruleItems.value;
    const validator = new Schema(descriptor);

    let model: { [key: string]: any } = {};
    let validateMessage = null;
    // 使用中文错误提示
    if (layForm.useCN) {
      validateMessage = Object.assign(
        {},
        cnValidateMessage,
        layForm.validateMessage
      );
      model[props.label || props.prop] = filedValue.value;
    } else {
      layForm.validateMessage && (validateMessage = layForm.validateMessage);
      model[props.prop] = filedValue.value;
    }
    // 自定义校验消息
    layForm.requiredErrorMessage &&
      (validateMessage = Object.assign(validateMessage, {
        required: layForm.requiredErrorMessage,
      }));
    validateMessage && validator.messages(validateMessage);

    // 开始校验
    validator.validate(model, (errors, fields) => {
      errorStatus.value = errors !== null && errors.length > 0;
      const slotParentDiv = slotParent.value as HTMLDivElement;
      if (errorStatus.value) {
        const _errors = errors as FieldValidateError[];
        // 如果是中文,将错误信息转换成FieldValidateError类型
        layForm.useCN &&
          _errors.forEach((error) => {
            error.label = props.label;
            error.field = props.prop;
          });
        errorMsg.value = props.errorMessage ?? _errors[0].message;
        slotParentDiv.childElementCount > 0 &&
          slotParentDiv.firstElementChild?.classList.add("layui-form-danger");
        callback && callback(_errors, fields);
      } else {
        clearValidate();
      }
    });
  }
};

// 清除校验
const clearValidate = () => {
  errorStatus.value = false;
  errorMsg.value = "";
  const slotParentDiv = slotParent.value as HTMLDivElement;
  slotParentDiv.childElementCount > 0 &&
    slotParentDiv.firstElementChild?.classList.remove("layui-form-danger");
};

defineExpose({ validate, clearValidate });

onMounted(() => {
  if (props.prop) {
    layForm.addField(
      reactive({
        ...toRefs(props),
        $el: formItemRef,
        validate,
        clearValidate,
      }) as LayFormItemContext
    );
  }
});
</script>
