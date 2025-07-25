<script setup lang="ts">
import type { CheckCard } from "./interface";

import {
  computed,
  inject,
  ref,
  useSlots,
  watch,
} from "vue";
import "./index.less";

export type { CheckCard };

defineOptions({
  name: "LayCheckcard",
});

const props = withDefaults(defineProps<CheckCard>(), {
  disabled: false,
  modelValue: false,
});

const emit = defineEmits(["change", "update:modelValue"]);

const slot = useSlots();
const initValue = ref(props.modelValue);
const checkcardGroup: any = inject("checkcardGroup", {});
const getIsGroup = computed(
  () => checkcardGroup && checkcardGroup.name === "LayCheckCardGroup",
);
const disabledValue = computed(() => {
  return props.disabled || checkcardGroup.disabled?.value;
});
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
      }
      else {
        return checkcardGroup.modelVal.value.includes(props.value);
      }
    }
    else {
      return initValue.value;
    }
  },
  set(val) {
    if (getIsGroup.value) {
      if (!Array.isArray(checkcardGroup.modelVal.value)) {
        checkcardGroup.modelVal.value = props.value;
      }
      else {
        checkcardGroup.modelVal.value = getNewArr();
      }
    }
    else {
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
  return [];
});
function getNewArr() {
  const newsArr = [...getValArr.value];
  const findIndex = newsArr.findIndex(key => key === props.value);
  if (findIndex < 0) {
    newsArr.push(props.value);
  }
  else {
    newsArr.splice(findIndex, 1);
  }
  return newsArr;
}

function handleCheck() {
  if (!disabledValue.value) {
    getCheckState.value = !getCheckState.value;
  }
}

watch(
  () => props.modelValue,
  (val) => {
    initValue.value = val;
  },
);

const classes = computed(() => {
  return [
    "layui-checkcard",
    "layui-checkcard-bordered",
    {
      "layui-checkcard-checked": getCheckState.value,
      "layui-checkcard-disabled": disabledValue.value,
    },
  ];
});
</script>

<template>
  <div :class="classes" @click="handleCheck">
    <div v-if="$slots.cover || cover" class="layui-checkcard-is-cover">
      <img v-if="cover" :src="cover">
      <slot v-if="$slots.cover" name="cover">
        {{ cover }}
      </slot>
    </div>
    <div v-else :class="getContentStyle">
      <div v-if="$slots.avatar || avatar" class="layui-checkcard-left">
        <span v-if="avatar" class="layui-checkcard-avatar">
          <img :src="avatar">
        </span>
        <slot v-if="$slots.avatar" name="avatar">
          {{ avatar }}
        </slot>
      </div>
      <div class="layui-checkcard-right">
        <div v-if="$slots.title || title" class="layui-checkcard-header">
          <span :class="getExtraStyle">
            <slot name="title">{{ title }}</slot>
          </span>
          <div v-if="$slots.extra" class="layui-checkcard-extra">
            <slot name="extra">
              {{ extra }}
            </slot>
          </div>
        </div>
        <div
          v-if="$slots.description || description"
          class="layui-checkcard-desc"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
