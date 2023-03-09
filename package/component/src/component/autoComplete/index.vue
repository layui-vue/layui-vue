<template>
  <div class="lay-autocomplete">
    <lay-dropdown ref="dropdownRef">
      <lay-input :model-value="innerValue" :placeholder="placeholder" :allow-clear="allowClear" @input="inputHandler"></lay-input>
      <template #content>
        <template v-if="innerOptions.length > 0">
          <lay-dropdown-menu>
            <template v-for="(option, index) in innerOptions">
              <lay-dropdown-menu-item
                class="lay-autocomplete-option"
                :class="{
                  selected: selectedIndex == index,
                  equals: innerValue == option,
                }"
              >
                {{ option }}
              </lay-dropdown-menu-item>
            </template>
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
import { ref, watch, reactive, onMounted, onUnmounted } from "vue";

export interface AvatarProps {
  modalValue?: string;
  options?: string[];
  placeholder?: string;
  allowClear?: boolean;
}

const props = withDefaults(defineProps<AvatarProps>(), {});

const visible = ref(false);
const innerValue = ref(props.modalValue);
const innerOptions = reactive<string[]>([]);
const dropdownRef = ref();
const selectedIndex = ref();

watch(
  () => props.modalValue,
  () => {
    innerValue.value = props.modalValue;
  }
);

const inputHandler = function (value: string) {
  innerValue.value = value;
  dropdownRef.value.show();
};

watch([innerValue, props.options], () => {
  innerOptions.splice(0);
  props.options?.forEach((option) => {
    if (innerValue.value && option.indexOf(innerValue.value) != -1) {
      innerOptions.push(option);
    }
  });
  if (innerOptions.length > 0) {
    selectedIndex.value = 0;
  }
});

onMounted(() => {
  document.addEventListener("keyup", function (e) {
    if (e.key === "ArrowUp") {
      if (selectedIndex.value > 0) {
        selectedIndex.value = selectedIndex.value - 1;
      }
    }
    if (e.key === "ArrowDown") {
      if (selectedIndex.value <= innerOptions.length - 2) {
        selectedIndex.value = selectedIndex.value + 1;
      }
    }
    if (e.key === "Enter") {
      innerValue.value = innerOptions[selectedIndex.value];
      dropdownRef.value.hide();
    }
  });
});

onUnmounted(() => {
  document.removeEventListener("keyup", function(){
    // 注销 keyup 监听
  });
})
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
  background-color: var(--global-neutral-color-2);
}

.lay-autocomplete-option.equals {
  background-color: var(--global-neutral-color-2) !important;
  color: var(--global-checked-color) !important;
  font-weight: 700 !important;
}
</style>
