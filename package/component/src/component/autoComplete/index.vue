<template>
  <div class="lay-autocomplete">
    <lay-dropdown>
      <lay-input
        :model-value="props.modalValue"
        @input="inputHandler"
      ></lay-input>
      <template #content>
        <template v-if="innerOptions.length > 0">
          <lay-dropdown-menu>
            <lay-dropdown-menu-item
              class="lay-autocomplete-option"
              :class="{ selected: selectedOption == option }"
              v-for="option in innerOptions"
            >
              {{ option }}
            </lay-dropdown-menu-item>
          </lay-dropdown-menu>
        </template>
        <template v-else>
          <div class="lay-autocomplete-empty">暂无内容</div>
        </template>
      </template>
    </lay-dropdown>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayAutoComplete",
};
</script>

<script lang="ts" setup>
import { ref, watch, reactive } from "vue";

export interface AvatarProps {
  modalValue?: string;
  options?: string[];
}

const props = withDefaults(defineProps<AvatarProps>(), {});

const innerValue = ref(props.modalValue);
const innerOptions = reactive<string[]>([]);
const selectedOption = ref();

watch(
  () => props.modalValue,
  () => {
    innerValue.value = props.modalValue;
  }
);

const inputHandler = function (value: string) {
  innerValue.value = value;
};

watch([innerValue, props.options], () => {
  innerOptions.splice(0);
  props.options?.forEach((option) => {
    if (innerValue.value && option.indexOf(innerValue.value) != -1) {
      innerOptions.push(option);
    }
  });
  if (innerOptions.length > 0) {
    selectedOption.value = innerOptions[0];
  }
});
</script>

<style lang="less">
.lay-autocomplete {
  width: 220px;
}

.lay-autocomplete-empty {
  text-align: center;
  padding: 15px;
}

.lay-autocomplete-option.selected {
  background-color: gray;
}
</style>
