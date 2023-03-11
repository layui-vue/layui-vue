<template>
  <div class="lay-autocomplete">
    <lay-dropdown ref="dropdownRef">
      <lay-input
        :name="name"
        :model-value="innerValue"
        :allow-clear="allowClear"
        :placeholder="placeholder"
        @click="clickHandler"
        @input="inputHandler"
        @blur="blurHandler"
        @focus="focusHandler"
        @compositionstart="onCompositionstart"
        @compositionend="onCompositionend"
      ></lay-input>
      <template #content>
        <template v-if="innerOptions.length > 0">
          <lay-dropdown-menu>
            <template v-for="(option, index) in innerOptions">
              <lay-dropdown-menu-item
                @click="clickOptions(option)"
                :class="['lay-autocomplete-option', {
                  selected: selectedIndex == index,
                  equals: innerValue == option,
                }]"
              >
                {{ option }}
              </lay-dropdown-menu-item>
            </template>
          </lay-dropdown-menu>
        </template>
      </template>
    </lay-dropdown>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayAutocomplete",
};
</script>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";

export interface AutocompleteProps {
  modelValue: string;
  fetchSuggestions: Function;
  placeholder?: string;
  allowClear?: boolean;
  name?: string;
}

const props = withDefaults(defineProps<AutocompleteProps>(), {});

interface AutocompleteEmits {
  (e: "update:modelValue", value: string): void;
}

const emits = defineEmits<AutocompleteEmits>();

const isFocus = ref(false);
const innerValue = ref(props.modelValue);
const innerOptions = ref<string[]>([]);
const selectedIndex = ref(-1);
const dropdownRef = ref();
const composing = ref(false);

const onCompositionstart = () => {
  composing.value = true;
};

const onCompositionend = (eventParam: Event) => {
  composing.value = false;
  inputHandler((eventParam.target as HTMLInputElement).value);
};

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue;
  }
);

const inputHandler = function (value: string) {
  if (!composing.value) {
    emits("update:modelValue", value);
    props.fetchSuggestions(value).then((suggestions: any[]) => {
      innerOptions.value = suggestions || [];
    })
  }
};

const clickHandler = function () {
  nextTick(() => {
    dropdownRef.value.hide();
  });
};

const clickOptions = function (value: string) {
  innerValue.value = value;
}

const blurHandler = function () {
  isFocus.value = false;
};

const focusHandler = function () {
  isFocus.value = true;
};

watch([innerValue, innerOptions], () => {
  let isEquals = false;
  if (innerValue.value != undefined && innerValue.value != "") {
    innerOptions.value.forEach((option, index) => {
      if (innerValue.value === option) {
        selectedIndex.value = index;
        isEquals = true;
      }
    });
  }
  if (isEquals === false) {
    selectedIndex.value = -1;
  }
});

watch(innerOptions, () => {
  if(innerOptions.value.length > 0) {
    dropdownRef.value.show();
  } else {
    dropdownRef.value.hide();
  }
})

onMounted(() => {
  document.addEventListener("keyup", function (e) {
    if (isFocus.value === true) {
      if (e.key === "ArrowDown") {
        if (selectedIndex.value <= innerOptions.value.length - 2) {
          selectedIndex.value++;
        }
      }
      if (e.key === "ArrowUp") {
        if (selectedIndex.value > 0) {
          selectedIndex.value--;
        }
      }
      if (e.key === "Enter") {
        innerValue.value = innerOptions.value[selectedIndex.value];
        dropdownRef.value.hide();
      }
    }
  });
});

onUnmounted(() => {
  document.removeEventListener("keyup", function () {
    // 注销 keyup 监听
  });
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
  background-color: var(--global-neutral-color-2);
}

.lay-autocomplete-option.equals {
  background-color: var(--global-neutral-color-2) !important;
  color: var(--global-checked-color) !important;
  font-weight: 700 !important;
}
</style>
