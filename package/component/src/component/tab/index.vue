<script lang="ts">
export default {
  name: "LayTab",
};
</script>

<script setup lang="ts">
import "./index.less";
import tabItem from "../tabItem/index.vue";
import {
  Component,
  computed,
  useSlots,
  provide,
  VNode,
  Ref,
  ref,
  watch,
} from "vue";

export type tabPositionType = "top" | "bottom" | "left" | "right";

export interface LayTabProps {
  type?: string;
  modelValue: string;
  allowClose?: boolean;
  tabPosition?: tabPositionType;
  beforeClose?: Function;
  beforeLeave?: Function;
}

const slot = useSlots();
const slots = slot.default && slot.default();
const childrens: Ref<VNode[]> = ref([]);
const slotsChange = ref(true);

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

const props = withDefaults(defineProps<LayTabProps>(), {
  tabPosition: "top",
});

const emit = defineEmits(["update:modelValue", "change", "close"]);

const active = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const change = function (id: any) {
  if (props.beforeLeave && props.beforeLeave(id) === false) {
    return;
  }
  emit("update:modelValue", id);
  emit("change", id);
};

const close = function (index: number, id: any) {
  if (props.beforeClose && props.beforeClose(id) === false) {
    return;
  }
  childrens.value.splice(index, 1);
  if (active.value === id) {
    const nextChildren = childrens.value[index === childrens.value.length ? 0 : index];
    change(nextChildren && nextChildren.props ? nextChildren.props.id : "");
  }
  emit("close", id);
};

watch(slotsChange, function () {
  childrens.value = [];
  setItemInstanceBySlot((slot.default && slot.default()) as VNode[]);
}, { immediate: true });

provide("active", active);
provide("slotsChange", slotsChange);
</script>

<template>
  <div
    class="layui-tab"
    :class="[
      type ? 'layui-tab-' + type : '',
      props.tabPosition ? `is-${tabPosition}` : '',
    ]"
  >
    <div
      :class="['layui-tab-head', props.tabPosition ? `is-${tabPosition}` : '']"
    >
      <ul
        :class="[
          'layui-tab-title',
          props.tabPosition ? `is-${tabPosition}` : '',
        ]"
      >
        <li
          v-for="(children, index) in childrens"
          :key="children.props?.id"
          :class="[children.props?.id === active ? 'layui-this' : '']"
          @click.stop="change(children.props?.id)"
        >
          {{ children.props?.title }}
          <i
            v-if="allowClose && children.props?.closable != false"
            class="layui-icon layui-icon-close layui-unselect layui-tab-close"
            @click.stop="close(index, children.props?.id)"
          ></i>
        </li>
      </ul>
    </div>
    <div class="layui-tab-content">
      <slot></slot>
    </div>
  </div>
</template>
