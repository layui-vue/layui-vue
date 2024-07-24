<script setup lang="ts">
import type { DescriptionsItemProps as _DescriptionsItemProps } from "./interface";

export type DescriptionsItemProps = _DescriptionsItemProps;

const props = withDefaults(defineProps<DescriptionsItemProps>(), {
  span: 1,
});

defineOptions({
  name: "LayDescriptionsItem",
});
</script>
