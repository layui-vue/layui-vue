<script setup lang="ts">
import type { CSSProperties, Ref, StyleValue } from "vue";
import type { ContentProps } from "../types";

import { onClickOutside } from "@vueuse/core";
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  useSlots,
  watch,
} from "vue";
import { CONTENT_INJECTION_KEY } from "../types";
import { flip, hide, offset, shift, usePopper } from "../usePopper/index";

import {
  arrowMiddleware,
  getArrowOffer,
  getArrowPlacement,
  POPPER_INJECTION_KEY,
} from "../utils";

const props = withDefaults(defineProps<ContentProps>(), {});

const ContentRef = ref<HTMLElement | null>(null);
const ArrowRef = ref<HTMLDivElement | null>(null);

const currentContents: Array<Ref<HTMLElement>> = [];

const { TriggerRef, onShow, onHidden } = inject(POPPER_INJECTION_KEY)!;
const { allContents: parentAllContents = [] } = inject(
  CONTENT_INJECTION_KEY,
  {},
);

const isExist = ref(props.modelValue);
const _visible = ref(false);
const innerVisible = ref(props.modelValue);
const slots = useSlots();
// content slot中是否有内容
const hasDefaultContent = computed(() => {
  return slots.default!()[0].children?.length;
});

watch(
  () => [props.modelValue, _visible.value],
  () => {
    if (!props.disabled) {
      if (!isExist.value) {
        isExist.value = props.modelValue || _visible.value;
      }
      innerVisible.value = props.modelValue || _visible.value;
    }
  },
);

const teleportProps = computed(() => {
  return Object.assign({}, { to: "body", disabled: false }, props.teleportProps);
});

const {
  popperStyle: _popperStyle,
  middlewareData,
  update,
  stopAutoUpdate,
  startAutoUpdate,
} = usePopper(TriggerRef as Ref<HTMLElement>, ContentRef as Ref<HTMLElement>, {
  placement: props.placement,
  middleware: props.middlewares ?? [
    offset(props.offset),
    shift(),
    flip(),
    arrowMiddleware({
      arrowRef: ArrowRef,
      padding: 5,
    }),
    getArrowPlacement(),
    getArrowOffer({ arrowRef: ArrowRef }),
    hide(),
  ],
});

const classes = computed(() => {
  return ["layui-popper", "layui-anim", props.popperClass];
});

const stylees = computed(() => {
  return [_popperStyle.value as CSSProperties, props.popperStyle] as StyleValue;
});

watch(
  () => middlewareData.value.hide,
  (data) => {
    if (ContentRef.value) {
      Object.assign(ContentRef.value.style, {
        display: data!.referenceHidden
          ? "none"
          : !innerVisible.value
              ? "none"
              : "block",
      });
    }
  },
);

watch(innerVisible, () => {
  if (innerVisible.value) {
    startAutoUpdate.value && startAutoUpdate.value();
  }
  else {
    stopAutoUpdate.value && stopAutoUpdate.value();
  }
});

function removeCurrentContentLink() {
  /**
   * 删除当前 `currentContents` 管理的队列
   */
  parentAllContents.splice(
    parentAllContents.findIndex(contents => contents === currentContents),
    1,
  );

  /**
   * 删除在其他队列中的当前 `ContentRef`
   */
  parentAllContents.forEach((contents) => {
    contents.splice(
      contents.findIndex(content => content.value === ContentRef.value),
      1,
    );
  });
}

onBeforeUnmount(() => {
  stopAutoUpdate.value && stopAutoUpdate.value();

  removeCurrentContentLink();
});

onClickOutside(ContentRef, (event: PointerEvent) => {
  if (
    !props.clickOutsideToClose
    || !innerVisible.value
    || (TriggerRef.value as HTMLElement).contains(event.target as HTMLElement)
  ) {
    return;
  }

  for (const item of currentContents) {
    if (item.value?.contains(event.target as HTMLElement)) {
      return;
    }
  }

  onHidden();
});

function onContentEnter() {
  if (props.enterable && props.trigger?.includes("hover")) {
    onShow();
  }
}

function onContentLeave() {
  if (props.trigger?.includes("hover")) {
    onHidden();
  }
}

function show() {
  onShow();
  _visible.value = true;
}

function hidden() {
  // TODO 兼容popConfirm组件使用当前函数关闭popper，造成modelValue未改变弹窗依然显示
  onHidden();
  _visible.value = false;
}

onMounted(() => {
  parentAllContents.forEach((content) => {
    content.push(ContentRef as Ref<HTMLElement>);
  });
});

provide(CONTENT_INJECTION_KEY, {
  allContents: [...parentAllContents, currentContents],
});

defineExpose({ show, hidden, update });
</script>

<template>
  <Teleport
    v-if="isExist && hasDefaultContent"
    :to="teleportProps.to"
    :disabled="teleportProps.disabled"
  >
    <div
      v-show="innerVisible"
      ref="ContentRef"
      :class="classes"
      :style="stylees"
      @mouseenter="onContentEnter"
      @mouseleave="onContentLeave"
    >
      <slot />
      <div v-if="showArrow" ref="ArrowRef" data-popper-arrow />
    </div>
  </Teleport>
</template>
