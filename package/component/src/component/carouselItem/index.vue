<script lang="ts">
export default {
  name: "LayCarouselItem",
};
</script>

<script setup lang="ts">
import { inject, Ref, computed, ref } from "vue";

const props = defineProps<{
  id: string;
}>();

const active = inject("active");
const slotsChange: Ref<boolean> = inject("slotsChange") as Ref<boolean>;
slotsChange.value = !slotsChange.value;

const anim = inject("anim");
const item = ref();
const getStyle = computed<any>(() => {
  if (item.value) {
    let allChild = item.value.parentNode.children;
    let allChildNum = allChild.length;

    let activeIndex,
      currentIndex = 0;
    for (let index = 0; index < allChild.length; index++) {
      const element = allChild[index];
      // @ts-ignore
      if (element.getAttribute("data-id") === active.value) {
        activeIndex = index;
      }
      if (element.getAttribute("data-id") === props.id) {
        currentIndex = index;
      }
    }
    // @ts-ignore
    let prevIndex = activeIndex > 0 ? activeIndex - 1 : allChildNum - 1;
    // @ts-ignore
    let nextIndex = activeIndex + 1 < allChildNum ? activeIndex + 1 : 0;
    // @ts-ignore
    let animation = anim.value;
    //状态 上一个 当前 下一个
    if (activeIndex === currentIndex) {
      if (animation === "updown") {
        return {
          transform: "translateY(0)",
          visibility: "inherit",
        };
      } else if (animation.includes("fade")) {
        return {
          opacity: 1,
          visibility: "inherit",
        };
      } else {
        return {
          transform: "translateX(0)",
          visibility: "inherit",
        };
      }
    }

    if (prevIndex === currentIndex) {
      if (animation === "updown") {
        return {
          transform: "translateY(-100%)",
        };
      } else if (animation.includes("fade")) {
        return {
          opacity: 0,
        };
      } else {
        return {
          transform: "translateX(-100%)",
        };
      }
    }
    if (nextIndex === currentIndex) {
      if (animation === "updown") {
        return {
          transform: "translateY(100%)",
        };
      } else if (animation.includes("fade")) {
        return {
          opacity: 0,
        };
      } else {
        return {
          transform: "translateX(100%)",
        };
      }
    }

    return {
      display: "none",
    };
  }
});
</script>

<template>
  <li ref="item" :style="getStyle" :data-id="id">
    <slot></slot>
  </li>
</template>
