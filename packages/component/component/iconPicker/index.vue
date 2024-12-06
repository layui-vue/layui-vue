<script setup lang="ts">
import "./index.less";
import type { DropdownTeleportProps } from "../dropdown/interface";
import { computed, h, ref, StyleValue } from "vue";
import { LayIconList as icons, LayIcon } from "@layui/icons-vue";
import LayDropdown from "../dropdown/index.vue";
import useProps from "./index.hooks";
import LayRender from "../_components/render";
import LayTab from "../tab/index";
import LayTabItem from "../tabItem/index";
import LayIconPickerWrapper from "./wrapper.vue";
import { watch } from "vue";

export interface IconProp {
  name: string;
  class: string;
  prefix?: string;
}

export interface IconSets {
  name: string;
  title?: string;
  prefix?: string;
  icons: IconProp[];
}

export interface IconPickerProps {
  modelValue?: string;
  prefix?: string;
  page?: boolean;
  size?: string;
  showSearch?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
  contentClass?: string | Array<string | object> | object;
  contentStyle?: StyleValue;
  /**
   * 图标集
   * @version 2.19.1
   */
  iconSets?: Array<string | IconSets>;
  /**
   * 当前图标集
   * @version 2.19.1
   */
  currentIconSet?: string;
  /**
   * 是否显示图标集
   * @version 2.19.1
   */
  showIconSets?: boolean;
  teleportProps?: DropdownTeleportProps;
}

defineOptions({
  name: "LayIconPicker",
});

const props = withDefaults(defineProps<IconPickerProps>(), {
  modelValue: "layui-icon-face-smile",
  disabled: false,
  page: false,
  iconSets: () => ["layui"],
});

const _iconSets = new Map<string, IconSets>();
props.iconSets?.forEach((element) => {
  if (typeof element === "string") {
    // 注册内建图标
    switch (element) {
      case "layui":
        _iconSets.set("layui", {
          name: "layui",
          title: "Layui",
          icons,
        });
        break;

      default:
        break;
    }
  } else {
    // 注册自定义图标
    _iconSets.set(element.name, element);
  }
});

const _currentIconSet = computed(() => props.currentIconSet);
const { size } = useProps(props);
const emit = defineEmits(["update:modelValue", "change"]);
const selectedIcon = computed(() => props.modelValue);
const dropdownRef = ref<any>(null);
const openState = ref<boolean>(false);
const _tabIndex = ref(_currentIconSet.value ?? _iconSets.keys().next().value);

watch(
  () => _currentIconSet.value,
  (val) => _iconSets.has(val ?? "") && (_tabIndex.value = val)
);

const selectIcon = function (icon: string, prefix: string): void {
  emit("update:modelValue", icon, prefix);
  emit("change", icon, prefix);
  dropdownRef.value?.hide();
};

const onClear = function (): void {
  emit("update:modelValue", "");
};

const hasContent = computed(
  () => props.modelValue != null && props.modelValue != ""
);

const IconPickerFactory = (icons: IconSets) => {
  return h(LayIconPickerWrapper, {
    icones: icons.icons,
    prefix: icons.prefix,
    selectedIcon: selectedIcon.value,
    showSearch: props.showSearch,
    page: props.page,
    onSelectIcon: selectIcon,
  });
};

const renderWrapper = () => {
  let wrapper;
  if (!props.showIconSets) {
    wrapper = IconPickerFactory(
      _iconSets.get(props.currentIconSet ?? "layui")!
    );
  } else {
    wrapper = h(
      LayTab,
      {
        type: "brief",
        modelValue: _tabIndex.value ?? "layui",
        "onUpdate:modelValue": (index) => (_tabIndex.value = index),
        tabPosition: "left",
      },
      () =>
        Array.from(_iconSets.entries()).map(([k, s]) => {
          return h(
            LayTabItem,
            { id: k, title: s.title ?? s.name },
            { default: () => IconPickerFactory(s) }
          );
        })
    );
  }

  return wrapper;
};
</script>

<template>
  <lay-dropdown
    ref="dropdownRef"
    :disabled="disabled"
    :contentClass="contentClass"
    :contentStyle="contentStyle"
    :teleportProps="teleportProps"
    @hide="openState = false"
    @show="openState = true"
  >
    <div
      class="layui-border-box layui-iconpicker layui-iconpicker-split"
      :class="[
        {
          'layui-iconpicker-disabled': disabled,
          'has-content': hasContent,
          'has-clear': !disabled && allowClear,
        },
      ]"
      :size="size"
    >
      <div class="layui-iconpicker-main">
        <i class="layui-icon" :class="[selectedIcon]"></i>
      </div>
      <span class="layui-icon-picker-clear">
        <lay-icon type="layui-icon-close-fill" @click.stop="onClear"></lay-icon>
      </span>
      <span class="layui-iconpicker-suffix"
        ><i
          class="layui-icon layui-icon-down"
          :class="[openState ? 'transform' : '']"
        ></i
      ></span>
    </div>
    <template #content>
      <lay-render v-if="openState" :render="renderWrapper"></lay-render>
    </template>
  </lay-dropdown>
</template>
