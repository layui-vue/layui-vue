<!--
 * @Author: baobaobao
 * @Date: 2023-04-24 16:23:33
 * @LastEditTime: 2023-05-21 23:17:11
 * @LastEditors: baobaobao
-->
<template>
  <div :style="containerStyle" :class="getStyle" @click="handleCheck">
    <div class="layui-checkcard-is-cover" v-if="$slots.cover || cover">
      <img :src="cover" v-if="cover" />
      <slot name="cover" v-if="$slots.cover">
        {{ cover }}
      </slot>
    </div>
    <div :class="getContentStyle" v-else>
      <div class="layui-checkcard-left" v-if="$slots.avatar || avatar">
        <span class="layui-checkcard-avatar" v-if="avatar">
          <img :src="avatar" />
        </span>
        <slot name="avatar" v-if="$slots.avatar">
          {{ avatar }}
        </slot>
      </div>
      <div class="layui-checkcard-right">
        <div class="layui-checkcard-header" v-if="$slots.title || title">
          <span :class="getExtraStyle">
            <slot name="title">{{ title }}</slot>
          </span>
          <div class="layui-checkcard-extra" v-if="$slots.extra">
            <slot name="extra">{{ extra }}</slot>
          </div>
        </div>
        <div
          class="layui-checkcard-desc"
          v-if="$slots.description || description"
        >
          <slot name="description">{{ description }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "LayCheckcard",
};
</script>
<script lang="ts" setup>
import {
  ref,
  onMounted,
  watch,
  computed,
  StyleValue,
  useAttrs,
  inject,
  useSlots,
  onBeforeMount,
} from "vue";
import "./index.less";
export interface CheckCard {
  title?: string;
  avatar?: string;
  description?: string;
  cover?: string;
  extra?: string;
  disabled?: boolean;
  value?: string | number;
  modelValue?: boolean;
}
const attrs = useAttrs();
const slot = useSlots();
const emit = defineEmits(["change", "update:modelValue"]);
const props = withDefaults(defineProps<CheckCard>(), {
  disabled: false,
  modelValue: false,
});
const initValue = ref(props.modelValue);
const checkcardGroup: any = inject("checkcardGroup", {});
const getIsGroup = computed(
  () => checkcardGroup && checkcardGroup.name === "LayCheckCardGroup"
);

const containerStyle = computed(() => attrs.style as StyleValue);
const getDisabled = ref<boolean | undefined>(
  props.disabled || checkcardGroup.disabled
);
const getContentStyle = computed(() => {
  return {
    "layui-checkcard-is-description": !props.description && !slot.description,
    "layui-checkcard-content": true,
  };
});
const getExtraStyle = computed(() => {
  return {
    "layui-checkcard-title": true,
    "layui-checkcard-is-extra": slot.extra,
  };
});
const getCheckState = computed({
  get() {
    if (getIsGroup.value) {
      if (!Array.isArray(checkcardGroup.modelVal.value)) {
        return checkcardGroup.modelVal.value === props.value;
      } else {
        return checkcardGroup.modelVal.value.includes(props.value);
      }
    } else {
      return initValue.value;
    }
  },
  set(val) {
    if (getIsGroup.value) {
      if (!Array.isArray(checkcardGroup.modelVal.value)) {
        checkcardGroup.modelVal.value = props.value;
      } else {
        checkcardGroup.modelVal.value = getNewArr();
      }
    } else {
      initValue.value = val;
      emit("change", val);
      emit("update:modelValue", val);
    }
  },
});
const getValArr = computed(() => {
  if (getIsGroup.value) {
    return checkcardGroup.modelVal.value;
  }
});
const getNewArr = () => {
  let newsArr = [...getValArr.value];
  const findIndex = newsArr.findIndex((key) => key === props.value);
  if (findIndex < 0) {
    newsArr.push(props.value);
  } else {
    newsArr.splice(findIndex, 1);
  }
  return newsArr;
};

const handleCheck = (event: Event) => {
  if (!getDisabled.value) {
    getCheckState.value = !getCheckState.value;
  }
};
watch(
  () => props.disabled,
  (val) => {
    if (!getIsGroup.value) {
      getDisabled.value = val;
    }
  }
);
const getStyle = computed(() => {
  return {
    "layui-checkcard-checked": getCheckState.value,
    "layui-checkcard": true,
    "layui-checkcard-bordered": true,
    "layui-checkcard-disabled": getDisabled.value,
  };
});
</script>
