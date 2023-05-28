<script lang="ts">
export default {
  name: "LayJsonSchemaForm",
};
</script>

<script lang="ts" setup>
export interface JsonSchemaFormProps {
  jsonSchema: any;
  model: any;
  pane: boolean;
  space: number;
}

const props = withDefaults(defineProps<JsonSchemaFormProps>(), {});

defineExpose({});
</script>

<template>
  <lay-form :model="model" :pane="pane">
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
              <template v-if="val.type === 'lay-checkbox'">
                <lay-checkbox-group v-model="model[key]">
                  <template v-for="option in val.props.options">
                    <lay-checkbox
                      :label="option.label"
                      :value="option.value"
                      :disabled="option.disabled"
                      skin="primary"
                    ></lay-checkbox>
                  </template>
                </lay-checkbox-group>
              </template>
              <template v-else-if="val.type === 'lay-radio'">
                <lay-radio-group v-model="model[key]">
                  <template v-for="option in val.props.options">
                    <lay-radio
                      :label="option.label"
                      :value="option.value"
                      :disabled="option.disabled"
                    ></lay-radio>
                  </template>
                </lay-radio-group>
              </template>
              <template v-else>
                <component
                  :is="val.type"
                  v-bind="val.props"
                  v-model="model[key]"
                ></component>
              </template>
            </template>
          </lay-form-item>
        </lay-col>
      </template>
    </lay-row>
  </lay-form>
</template>
