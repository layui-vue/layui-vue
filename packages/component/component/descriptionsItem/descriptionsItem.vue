<script setup lang="ts">
import type { DescriptionsItemProps as _DescriptionsItemProps } from "./interface";

export type DescriptionsItemProps = _DescriptionsItemProps;

withDefaults(defineProps<DescriptionsItemProps>(), {
  span: 1,
  align: "left",
  labelAlign: "left",
});

defineOptions({
  name: "LayDescriptionsItem",
});
</script>
