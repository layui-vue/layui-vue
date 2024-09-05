<script setup lang="ts">
import type { CommonBlockProps } from "../interface";

const props = withDefaults(defineProps<CommonBlockProps>(), {});

const dateValue = "";
const startPlaceholder = "";
const endPlaceholder = "";

const onChange = () => {};
const handleClear = () => {};
</script>

<template>
  <div :class="classes" :size="size">
    <lay-dropdown
      ref="dropdownRef"
      :disabled="disabled"
      :autoFitMinWidth="false"
      :contentClass="contentClass"
      :contentStyle="contentStyle"
    >
      <lay-input
        :name="name"
        :readonly="readonly"
        :placeholder="startPlaceholder"
        :prefix-icon="prefixIcon"
        :suffix-icon="suffixIcon"
        :disabled="disabled"
        v-model="dateValue"
        v-if="!range"
        @change="onChange"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        :allow-clear="!disabled && allowClear"
        :size="size"
        @clear="handleClear"
      >
      </lay-input>
      <div class="laydate-range-inputs" v-else>
        <lay-input
          :readonly="readonly"
          :name="name"
          v-model="dateValue[0]"
          :placeholder="startPlaceholder"
          :disabled="disabled"
          @change="onChange"
          @blur="$emit('blur')"
          @focus="$emit('focus')"
          class="start-input"
          :size="size"
        >
        </lay-input>
        <span class="range-separator">{{ rangeSeparator }}</span>
        <lay-input
          :readonly="readonly"
          :name="name"
          :allow-clear="!disabled && allowClear"
          :placeholder="endPlaceholder"
          v-model="dateValue[1]"
          :disabled="disabled"
          @change="onChange"
          @blur="$emit('blur')"
          @focus="$emit('focus')"
          class="end-input"
          :size="size"
          @clear="handleClear"
        >
        </lay-input>
      </div>
      <template #content>
        <slot></slot>
      </template>
    </lay-dropdown>
  </div>
</template>
