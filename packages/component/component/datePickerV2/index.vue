<script setup lang="ts">
import "./index.less";
import dayjs from "dayjs";
import type {
  DatePickerProps as _DatePickerProps,
  DatePickerType,
  DatePickerEmits,
} from "./interface";

import { useDateCommon } from "./hook/useDateCommon";
import { useDatePicker } from "./hook/useDatePicker";

import InputBlock from "./component/common/InputBlock.vue";
import LayRender, { AsyncRenderer } from "../_components/render";
import { computed, h, inject, useAttrs } from "vue";
import Range from "./component/common/Range.vue";
import Footer from "./component/common/Footer.vue";
import Header from "./component/common/Header.vue";
import { PICKER_CONTEXT } from "./component/interface";

export type DatePickerProps = _DatePickerProps;

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: "",
  type: "year",
  disabled: false,
  readonly: false,
  allowClear: false,
  simple: false,
  range: false,
  rangeSeparator: "至",
  prefixIcon: "layui-icon-date",
  suffixIcon: "",
  timestamp: false,
  yearPage: 15,
  yearStep: 1,
});

// const emits = defineEmits<DatePickerEmits>();
const attrs = useAttrs();
// const { commonBlockProps } = useDateCommon(props, attrs);

/**
 * 使用钩子，并且在钩子里对各个 Panel 的数据做注入
 */
const {
  currentData,
  currentType,
  RenderHeader,
  RenderComponent,
  RenderFooter,
  renderComponentProps,
} = useDatePicker(
  props
  // emits
);

/**
 * 组件工厂
 * @param count 生成的数量
 * @param initProps 初始化信息
 */
const componentFactory = (count: number, initProps: any) =>
  Array(count).fill(
    h(RenderComponent.value, {
      ...renderComponentProps.value,
      ...initProps,
    })
  );
/**
 * 渲染头部
 */
const RenderHeaderComponent = AsyncRenderer(RenderHeader.value ?? Header);
/**
 * 渲染内容
 * @param initDate 初始化日期
 * @param onPick 选择回调
 */
const renderContent = (
  initDate: dayjs.Dayjs | Array<dayjs.Dayjs>,
  onPick: (item: any) => void
) => {
  const comps = componentFactory(props.range ? 2 : 1, {
    modelValue: initDate,
    onPick,
  });
  return props.range
    ? h(
        Range,
        {
          ...renderComponentProps.value,
        },
        {
          left: () => comps.at(0),
          right: () => comps.at(-1),
        }
      )
    : comps.at(0);
};
/**
 * 渲染底部
 */
const RenderFooterComponent = AsyncRenderer(RenderFooter.value ?? Footer);

const handleNow = () => {
  currentData.value = dayjs();
};

const handleConfirm = (isConfirm = false) => {};

const format = computed<string>(() => {
  return props.inputFormat ?? renderComponentProps.value.inputFormat!;
});

defineOptions({
  name: "LayDatePickerV2",
});
</script>

<template>
  <InputBlock v-bind="{ ...props, ...$attrs }" :format="format">
    <template #default="{ initDate, onPick }">
      <div
        class="layui-laydate"
        :class="[
          props.range
            ? `layui-laydate-range layui-laydate-range-${props.type}`
            : '',
        ]"
      >
        <RenderHeaderComponent></RenderHeaderComponent>
        <LayRender :render="() => renderContent(initDate, onPick)"></LayRender>
        <RenderFooterComponent
          @now="handleNow"
          @confirm="handleConfirm"
        ></RenderFooterComponent>
      </div>
    </template>
  </InputBlock>
</template>
