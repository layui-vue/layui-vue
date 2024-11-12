<script setup lang="ts">
import "../tooltip/index.less";
import type { FormItemProps as _FormItemProps } from "./types";
import type { StyleValue } from "vue";
import {
  inject,
  ref,
  reactive,
  toRefs,
  onMounted,
  computed,
  watch,
  onUnmounted,
  useSlots,
} from "vue";
import {
  LayFormContext,
  LayFormItemContext,
  FieldValidateError,
  FormItemValidateReturn,
} from "../../types/form";
import type { RuleItem, Rules, ValidateCallback } from "async-validator";
import Schema from "async-validator";
import cnValidateMessage from "./cnValidateMessage";
import useProps from "./index.hooks";
import layTooltip from "../tooltip/index.vue";
import LayFormItemLabel from "./FormItemLabel";
import { isNumber } from "../../utils";

defineOptions({
  name: "LayFormItem",
});

const props = withDefaults(defineProps<FormItemProps>(), {
  // mode: "block",
  tips: "",
});

export type FormItemProps = _FormItemProps;

const {
  size,
  mode,
  labelWidth,
  labelPosition,
  isRequired,
  tooltipProps,
  isLabelTooltip,
  inlineWidth,
} = useProps(props);

const layForm = inject("LayForm", {} as LayFormContext);
const formItemRef = ref<HTMLDivElement>();
const slotParent = ref<HTMLDivElement>();

// 拼接校验规则
const ruleItems = computed(() => {
  const prop = props.prop;
  if (!prop) {
    return {};
  }
  let rulesArrs: RuleItem[] = [];
  if (props.required || layForm.required) {
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

/**
 * 根据 prop 配置获取 model 字段值
 */
const filedValue = computed(() => {
  if (props.prop) {
    if (props.prop.indexOf(".") != -1) {
      // loadsh
      return get(layForm.model, props.prop);
    } else {
      return layForm.model[props.prop];
    }
  } else {
    return undefined;
  }
});

function get(source: any, path: string, defaultValue = undefined) {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\d+)\]/g, ".\$1").split(".");
  let result = source;
  for (const p of paths) {
    result = Object(result)[p];
    if (result === undefined) {
      return defaultValue;
    }
  }
  return result;
}

watch(
  () => filedValue.value,
  (val) => validate(),
  { deep: true }
);

// 错误状态和信息
const errorMsg = ref();
const errorStatus = ref(false);

// 校验数据有效性
const validate = (
  callback?: ValidateCallback
): Promise<FormItemValidateReturn> => {
  return new Promise((resolve) => {
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
      // 自定义消息验证
      layForm.requiredErrorMessage &&
        // @ts-ignore
        (validateMessage = Object.assign(validateMessage, {
          required: layForm.requiredErrorMessage,
        }));

      props.requiredErrorMessage &&
        // @ts-ignore
        (validateMessage = Object.assign(validateMessage, {
          required: props.requiredErrorMessage,
        }));

      validateMessage && validator.messages(validateMessage);

      // 开始校验
      validator.validate(model, (errors, fields) => {
        errorStatus.value = errors !== null && errors.length > 0;
        const slotParentDiv = slotParent.value as HTMLDivElement;
        if (errorStatus.value) {
          const _errors = errors as FieldValidateError[];
          // 如果是中文,将错误信息转换成 FieldValidateError 类型
          layForm.useCN &&
            _errors.forEach((error) => {
              error.label = props.label;
              error.field = props.prop;
            });
          errorMsg.value = props.errorMessage ?? _errors[0].message;
          slotParentDiv?.childElementCount > 0 &&
            slotParentDiv?.firstElementChild?.classList.add(
              "layui-form-danger"
            );
          callback && callback(_errors, fields);
          resolve({ errors: _errors, fields });
        } else {
          resolve(undefined);
          clearValidate();
        }
      });
    } else {
      resolve(undefined);
    }
  });
};

// 清除校验
const clearValidate = () => {
  errorStatus.value = false;
  errorMsg.value = "";
  const slotParentDiv = slotParent.value as HTMLDivElement;
  slotParentDiv?.childElementCount > 0 &&
    slotParentDiv?.firstElementChild?.classList.remove("layui-form-danger");
};

defineExpose({ validate, clearValidate });

/**
 * 注册信息到 form 组件
 */
onMounted(() => {
  if (props.prop) {
    layForm.addField(
      // @ts-ignore
      reactive({
        ...toRefs(props),
        $el: formItemRef,
        validate,
        clearValidate,
      }) as LayFormItemContext
    );
  }
});

/**
 * 从 form 组件中卸载
 */
onUnmounted(() => {
  if (props.prop) {
    layForm.removeField(
      // @ts-ignore
      reactive({
        ...toRefs(props),
        $el: formItemRef,
        validate,
        clearValidate,
      }) as LayFormItemContext
    );
  }
});

const slots = useSlots();

const labelRef = ref<HTMLLabelElement | null>();

const showLabel = computed(() => {
  return (slots.label || props.label) && labelRef.value?.style.width !== "0px";
});

const labelStyles = computed<StyleValue>(() => {
  return {
    width: isNumber(labelWidth.value)
      ? `${labelWidth.value}px`
      : labelWidth.value,
  };
});

const modeStyles = computed<StyleValue>(() => {
  if (mode.value === "inline") {
    return {
      width: isNumber(inlineWidth.value)
        ? `${inlineWidth.value}px`
        : inlineWidth.value,
    };
  }
  return {};
});
</script>

<template>
  <div
    class="layui-form-item"
    :class="[`layui-form-item-${labelPosition}`, `layui-form-item-${mode}`]"
    :size="size"
    ref="formItemRef"
  >
    <label
      class="layui-form-label"
      v-if="showLabel"
      :style="labelStyles"
      ref="labelRef"
    >
      <lay-tooltip
        v-if="isLabelTooltip"
        v-bind="tooltipProps"
        :content="label"
        :isAutoShow="true"
      >
        <LayFormItemLabel
          :item-slots="slots"
          :isRequired="isRequired"
          :outProps="props"
        ></LayFormItemLabel>
      </lay-tooltip>
      <LayFormItemLabel
        v-else
        :item-slots="slots"
        :isRequired="isRequired"
        :outProps="props"
      ></LayFormItemLabel>
    </label>
    <div :class="[mode ? 'layui-input-' + mode : '']" :style="modeStyles">
      <div ref="slotParent">
        <slot :props="{ ...props, model: layForm.model }"></slot>
      </div>
      <span v-if="tips" class="layui-form-tips">
        {{ tips }}
      </span>
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
