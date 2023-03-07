<template>
    <lay-dropdown>
        <lay-input :model-value="props.modalValue" @input="inputHandler"></lay-input>
        <template #content>
            <lay-dropdown-menu>
                <lay-dropdown-menu-item v-for="option in innerOptions">{{ option }}</lay-dropdown-menu-item>
            </lay-dropdown-menu>
        </template>
    </lay-dropdown>
</template>

<script lang="ts">
export default {
    name: "LayAutoComplete"
}
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

watch(() => props.modalValue, () => {
    innerValue.value = props.modalValue;
})

const inputHandler = function(value: string) {
    innerValue.value = value;
}

watch([innerValue, props.options], () => {
    innerOptions.splice(0);
    props.options?.forEach((option) => {
        if(innerValue.value && option.indexOf(innerValue.value) != -1) {
            innerOptions.push(option);
        }
    });
})
</script>

<style lang="less">
.lay-autocomplete {

}
</style>