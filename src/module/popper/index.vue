<template>
  <transition v-show="innerVisible">
    <div
      ref="popper"
      :class="['layui-popper', { 'layui-dark': innnerIsDark }]"
      :style="style"
      :position="innnerPosition"
    >
      <slot>{{ content.value }}</slot>
      <div class="layui-popper-arrow"></div>
    </div>
  </transition>
</template>
<script lang="ts">
const NAME = "LayPopper";
export default {
  name: NAME,
};
</script>

<script setup lang="ts">
import "./index.less";
import postionFns from "./calcPosition";
import {
  CSSProperties,
  ref,
  watch,
  onUpdated,
  defineEmits,
  onMounted,
  Ref,
} from "vue";
import { on } from "../../tools/domUtil";
const props = withDefaults(
  defineProps<{
    el: any;
    content?: Ref<string | Number>;
    position?: Ref<string>;
    trigger?: string;
    enterable?: boolean;
    isDark?: Ref<boolean>;
    disabled?: Ref<boolean>;
    visible?: Ref<boolean>;
    isCanHide?: Ref<boolean>;
    updateVisible?: Function;
  }>(),
  {
    enterable: true,
    trigger: "hover",
  }
);

const EVENT_MAP: any = {
  hover: ["mouseenter", null, "mouseleave", false],
  click: ["click", document, "click", true],
};

const triggerArr = EVENT_MAP[props.trigger];
if (!triggerArr) {
  console.error(`${NAME} render error!cause: 'Trigger' must be 'hover/click' `);
}

const style = ref<CSSProperties>({ top: -window.innerHeight + "px", left: 0 });
const checkTarget = ref(false);
const popper = ref<HTMLDivElement>({} as HTMLDivElement);
const tempPosition = props.position ?? ref("top");
const innnerPosition = ref(tempPosition.value);
const innnerIsDark = ref(props.isDark ?? true);
const innnerDisabled = ref(props.disabled ?? false);
const innerVisible = ref(props.visible ?? true);

watch(innerVisible, (val) => {
  invokeShowPosistion();
  props.updateVisible && props.updateVisible(val);
});
watch(innnerDisabled, (val) => {
  innerVisible.value = false;
});
watch(
  () => props.content?.value,
  (val) => {
    innerVisible.value && invokeShowPosistion();
  }
);

const doShow = function () {
  if (!innnerDisabled.value) {
    innerVisible.value = true;
  }
};

const doHidden = function (e: MouseEvent) {
  if (
    (checkTarget.value && props.el.contains(e.target)) ||
    (props.enterable && popper.value.contains(e.target as Node))
  )
    return;
  // style.value = {top: (-window.innerHeight) + 'px',left:0};
  // popper.value.remove();
  if (props.isCanHide?.value !== false) {
    innerVisible.value = false;
  }
  innnerPosition.value = tempPosition.value;
};

// 事件绑定
on(props.el, triggerArr[0], doShow);
on(triggerArr[1] ?? props.el, triggerArr[2], doHidden);
checkTarget.value = triggerArr[3];

// 计算位置显示
const showPosistion = function () {
  postionFns[tempPosition.value] &&
    (style.value = postionFns[tempPosition.value](
      props.el,
      popper.value,
      innnerPosition
    ));
};
const invokeShowPosistion = function () {
  if (innerVisible.value) {
    popper.value.offsetWidth === 0
      ? setTimeout(showPosistion, 0)
      : showPosistion();
    // 延时确保计算位置正确
    setTimeout(() => innerVisible.value && showPosistion(), 2);
  }
};
onMounted(() => {
  invokeShowPosistion();
});
</script>
