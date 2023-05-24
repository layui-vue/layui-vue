<script lang="ts">
export default {
  name: "LayJsonSchemaForm",
};
</script>

<script lang="ts" setup>
export interface JsonSchemaFormProps {
  jsonSchema: any;
  model: any;
  space: number;
}

const props = withDefaults(defineProps<JsonSchemaFormProps>(), {});

defineExpose({});
</script>

<template>
  <lay-form :model="model">
    <lay-row :space="space">
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