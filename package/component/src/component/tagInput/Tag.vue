<script lang="ts">
export default {
  name: "Tag",
};
</script>
<script lang="ts" setup>
import { ref } from "vue";

export interface LayTagProps {
  theme?: string;
  closable?: boolean;
  size?: string;
}

const props = withDefaults(defineProps<LayTagProps>(), {
  closable: true,
});

const emit = defineEmits(["close"]);

const visible = ref(true);

const handleClose = (e: MouseEvent) => {
  visible.value = false;
  emit("close", e);
};
</script>
<template>
  <lay-badge v-if="visible" theme="green">
    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
      <lay-icon
        v-if="closable"
        type="layui-icon-close"
        @click.stop="handleClose"
      ></lay-icon>
    </template>
  </lay-badge>
</template>

<!-- <template v-for="(item, index) in selectItem.label" :key="index">
            <lay-badge theme="green">
              <span>{{ item }}</span>
              <i
                :class="['layui-icon', { 'layui-icon-close': true }]"
                v-if="
                  !disabled &&
                  !(
                    Array.isArray(selectItem.value) &&
                    selectItem.value.length > 0 &&
                    disabledItemMap[selectItem.value[index]]
                  )
                "
                @click="
                  removeItemHandle($event, {
                    label: item,
                    value: Array.isArray(selectItem.value)
                      ? selectItem.value[index]
                      : null,
                  })
                "
              ></i>
            </lay-badge>
          </template> -->
