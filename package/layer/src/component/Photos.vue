<template>
  <div class="layui-layer-phimg">
    <img :src="imgList[index].src" />
    <div class="layui-layer-imgsee" v-if="imgList.length > 0">
      <span class="layui-layer-imguide" v-if="imgList.length > 1">
        <a
          href="javascript:;"
          class="layui-layer-iconext layui-layer-imgprev"
          @click="changeIndex(-1)"
        ></a>
        <a
          href="javascript:;"
          class="layui-layer-iconext layui-layer-imgnext"
          @click="changeIndex(1)"
        ></a>
      </span>
      <div
        class="layui-layer-imgbar"
        style="display: block"
        v-if="imgList.length > 1 || imgList[index].alt"
      >
        <span class="layui-layer-imgtit">
          <span v-if="imgList[index].alt">{{ imgList[index].alt }}</span>
          <em v-if="imgList.length > 1"
            >{{ index + 1 }} / {{ imgList.length }}</em
          >
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "Photos",
};
</script>
<script lang="ts" setup>
import { watch, ref } from "vue";

export interface LayPhotoProps {
  imgList: { src: string; alt: string }[];
  startIndex: number;
}
const emit = defineEmits(["resetCalculationPohtosArea"]);
const props = withDefaults(defineProps<LayPhotoProps>(), {
  startIndex: 0,
});
const index = ref(props.startIndex);
watch(index, () => {
  //当图片索引改变的时候 重新计算弹层的大小
  emit("resetCalculationPohtosArea", index.value);
});

const changeIndex = (step: number) => {
  let nowIndex = index.value;
  let next = nowIndex + step;
  if (next < 0) {
    next = props.imgList.length - 1;
  }
  if (next >= props.imgList.length) {
    next = 0;
  }
  index.value = next;
};
</script>
