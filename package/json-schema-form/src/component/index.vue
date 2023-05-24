<script lang="ts">
export default {
  name: "LayJsonSchemaForm",
};
</script>

<script lang="ts" setup>
import { LayForm } from "@layui/layui-vue";
import "@layui/layui-vue/es/form/index.css";

export interface JsonSchemaFormProps {
  jsonSchema: any;
  model: any;
}

const props = withDefaults(defineProps<JsonSchemaFormProps>(), {});

defineExpose({});
</script>

<template>
  <lay-form :model="model">
    <lay-row>
      <template v-for="(val, key, index) in jsonSchema" :key="index">
        <lay-col v-bind="val.grid">
          <lay-form-item :label="val.label">
            <template v-if="val.slots && val.slots.customRender">
              <slot
                :name="val.slots.customRender"
                :schema="val"
                :model="model[key]"
              ></slot>
            </template>
            <template v-else>
              <component
                :is="val.type"
                v-bind="val.props"
                v-model="model[key]"
              ></component>
            </template>
          </lay-form-item>
        </lay-col>
      </template>
    </lay-row>
  </lay-form>
</template>
