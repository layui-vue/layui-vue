<template>
  <div
    class="layui-tab"
    :class="[type ? 'layui-tab-' + type : '']"
    v-if="active"
  >
    <ul class="layui-tab-title">
      <li
        v-for="(children, index) in childrens"
        :key="children"
        :class="[children.props.id === active ? 'layui-this' : '']"
        @click.stop="change(children.props.id)"
      >
        {{ children.props.title }}
        <i
          v-if="allowClose"
          class="layui-icon layui-icon-close layui-unselect layui-tab-close"
          @click.stop="close(index, children.props.id)"
        ></i>
      </li>
    </ul>
    <div class="layui-tab-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayTab",
};
</script>

<script setup lang="ts">
import tabItem from "../tabItem/index.vue";
import {
  defineProps,
  Component,
  computed,
  useSlots,
  provide,
  VNode,
  Ref,
  ref,
  watch,
} from "vue";

const slot = useSlots();
const slots = slot.default && slot.default();
const childrens: Ref<VNode[]> = ref([]);

const setItemInstanceBySlot = function (nodeList: VNode[]) {
  nodeList?.map((item) => {
    let component = item.type as Component;
    if (component.name != tabItem.name) {
      setItemInstanceBySlot(item.children as VNode[]);
    } else {
      childrens.value.push(item);
    }
  });
};

const props = defineProps<{
  type?: string;
  modelValue: string;
  allowClose?: boolean;
  beforeClose?: Function;
  beforeLeave?: Function;
}>();

const emit = defineEmits(["update:modelValue", "change", "close"]);

const active = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
const slotsChange = ref(true);

const change = function (id: any) {
  // 回调切换标签之前的回调钩子函数，只要不是return false, 则进行切换该tab
  if (props.beforeLeave && props.beforeLeave(id) === false) {
    return;
  }
  emit("update:modelValue", id);
  emit("change", id);
};

const close = function (index: number, id: any) {
  // 回调关闭之前的回调函数，只要不是return false, 则进行关闭该tab
  if (props.beforeClose && props.beforeClose(id) === false) {
    return;
  }

  // 删除当前tab
  childrens.value.splice(index, 1);
  // 点击的是当前激活的tab，则需要切换到下一个tab
  if (active.value === id) {
    const nextChildren =
      childrens.value[index === childrens.value.length ? 0 : index];
    change(nextChildren && nextChildren.props ? nextChildren.props.id : "");
  }
  emit("close", id);
};

watch(slotsChange, function () {
  childrens.value = [];
  setItemInstanceBySlot((slot.default && slot.default()) as VNode[]);
});

provide("active", active);
provide("slotsChange", slotsChange);
</script>
