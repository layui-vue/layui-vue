<template>
  <div class="layui-layer-notifiy-wrapper" ref="notifyRef">
    <h2 class="title">
      <i v-if="icon" :class="iconClass"></i>
      {{ title }}
    </h2>
    <div class="content" v-if="!isHtmlFragment">
      <p>{{ content }}</p>
    </div>
    <div class="content" v-html="content" v-else></div>
    <CloseBtnVue @click="close"></CloseBtnVue>
  </div>
</template>
<script lang="ts">
export default {
  name: "Notifiy",
};
</script>
<script lang="ts" setup>
import { nextTick, onMounted, ref, shallowRef } from "vue";
import CloseBtnVue from "./CloseBtn.vue";

export interface LayNotifyProps {
  title: any;
  content: any;
  isHtmlFragment?: boolean;
  icon?: string | number | undefined;
  iconClass: string[];
}

const props = withDefaults(defineProps<LayNotifyProps>(), {
  isHtmlFragment: false,
});

const emit = defineEmits(["close"]);
const notifyRef = shallowRef<HTMLElement | null>(null);

const close = () => {
  emit("close");
};

function addClass(obj: HTMLElement, cls: string) {
  //获取 class 内容.
  let obj_class = obj.className,
    //判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    blank = obj_class != "" ? " " : "";
  let added = obj_class + blank + cls; //组合原来的 class 和需要添加的 class.
  obj.className = added; //替换原来的 class.
}

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      //此处延迟加载class，以免影响弹出效果
      if (!notifyRef.value?.parentElement?.parentElement) return;
      addClass(
        notifyRef.value?.parentElement?.parentElement,
        "layui-layer-notifiy-transition"
      );
    }, 300);
  });
});
</script>
