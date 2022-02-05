<script lang="ts">
export default {
	name: "LaySelectOption",
};
</script>

<script setup lang="ts">
import LayCheckbox from "../checkbox";
import { SelectItem, SelectItemHandle, SelectItemPush } from "../../types";
import { computed, inject, onMounted, Ref } from "vue";

export interface LaySelectOptionProps {
    value: string | null | undefined;
    label?: string;
    disabled?: boolean;
}

const props = withDefaults(defineProps<LaySelectOptionProps>(),
	{
		disabled: false,
	}
);

const selectItemHandle = inject("selectItemHandle") as SelectItemHandle;
const selectItem = inject("selectItem") as Ref<SelectItem>;
const selectItemPush = inject("selectItemPush") as Ref<SelectItemPush>;

const selectHandle = function () {
	!props.disabled && callSelectItemHandle(!selected.value);
};
const callSelectItemHandle = function (isChecked?: boolean) {
	// console.log("callSelectItemHandle");
	selectItemHandle(
		{
			value: props.value,
			label: props.label,
			disabled: props.disabled,
		},
		isChecked
	);
};
const selected = computed({
	get() {
		const selectValues = selectItem.value.value;
		if (Array.isArray(selectValues)) {
			return (selectValues as any[]).indexOf(props.value) > -1;
		}
		return selectItem.value.value === props.value;
	},
	set(val) {},
});
const callSelectItemPush = function () {
	let item = {
		value: props.value,
		label: props.label,
		disabled: props.disabled,
	};
	// @ts-ignore
	selectItemPush(item);
};
onMounted(() => {
	callSelectItemPush();
	selected.value && callSelectItemHandle();
});
</script>

<template>
	<dd
		:value="value"
		:class="[{ 'layui-this': selected }, { 'layui-disabled': disabled }]"
		@click="selectHandle"
	>
		<template v-if="selectItem.multiple">
			<lay-checkbox
				skin="primary"
				v-model="selected"
				@change="selectHandle"
				label=""
			/>
		</template>
		<slot>{{ label }}</slot>
	</dd>
</template>