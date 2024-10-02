<template>
  <div class="layui-iconpicker-view layui-iconpicker-scroll">
    <div v-if="showSearch" class="layui-iconpicker-search">
      <lay-input
        @input="search"
        @clear="clear"
        autocomplete="true"
        :allow-clear="true"
      >
        <template #prefix>
          <i class="layui-icon layui-icon-search"></i>
        </template>
      </lay-input>
    </div>
    <div class="layui-iconpicker-list">
      <lay-scroll style="height: 200px" thumbColor="rgb(238, 238, 238)">
        <ul>
          <li
            v-for="(icon, k) in icones"
            :key="k"
            :class="[selectedIcon === icon.class ? 'layui-this' : '']"
            @click="emit('selectIcon', icon.class, icon.prefix ?? prefix)"
          >
            <i
              class="layui-icon"
              :class="[icon.prefix ?? prefix, icon.class]"
            ></i>
            <p class="layui-elip">
              {{ icon.name }}
            </p>
          </li>
        </ul>
      </lay-scroll>
    </div>
    <div v-if="page" class="layui-iconpicker-page">
      <div id="layui-laypage-1" class="layui-laypage layui-laypage-default">
        <span class="layui-laypage-count"> 共 {{ total }} 个</span>
        <a
          href="javascript:;"
          class="layui-laypage-prev"
          :class="[currentPage === 1 ? 'layui-disabled' : '']"
          @click="prev()"
        >
          <i class="layui-icon layui-icon-left"></i>
        </a>
        <span class="layui-laypage-curr">
          <em class="layui-laypage-em"></em>
          <em>{{ currentPage }} / {{ totalPage }}</em>
        </span>
        <span class="layui-laypage-spr">…</span>
        <a href="javascript:;" class="layui-laypage-last" title="尾页">
          {{ totalPage }}
        </a>
        <a
          href="javascript:;"
          :class="[currentPage === totalPage ? 'layui-disabled' : '']"
          class="layui-laypage-next"
          @click="next()"
        >
          <i class="layui-icon layui-icon-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, Ref, ref, watch } from "vue";
import LayScroll from "../scroll/index.vue";
import LayInput from "../input/index.vue";
import { IconProp } from "./index.vue";

defineOptions({
  name: "LayIconPickerWrapper",
});

const emit = defineEmits(["selectIcon"]);
const props = withDefaults(
  defineProps<{
    showSearch?: boolean;
    icones: IconProp[];
    prefix?: string;
    selectedIcon?: string;
    page?: boolean;
    total?: number;
    currentPage?: number;
    totalPage?: number;
  }>(),
  {}
);

const iconSrc = computed(() => props.icones);
const icones: Ref<Array<IconProp>> = ref(iconSrc.value);
const total: Ref<number> = ref(icones.value.length);
const totalPage: Ref<number> = ref(Math.ceil(total.value / 12));
const currentPage: Ref<number> = ref(1);

const pager = (page: number) => {
  if (page < 1 || page > totalPage.value) return;
  const start = (page - 1) * 12;
  const end = start + 12;
  icones.value = iconSrc.value.slice(start, end);
};

watch(
  () => currentPage.value,
  (newVal) => pager(newVal)
);

const next = () => {
  if (currentPage.value === totalPage.value) return;
  currentPage.value = currentPage.value + 1;
};

const prev = () => {
  if (currentPage.value === 1) return;
  currentPage.value = currentPage.value - 1;
};

const search = (text: string) => {
  currentPage.value = 1;
  const result = searchList(text);
  total.value = result.length;
  if (props.page) {
    icones.value = result.slice(0, 12);
    totalPage.value = Math.ceil(result.length / 12);
  } else {
    icones.value = result;
    totalPage.value = result.length;
  }
};

const searchList = (str: string) => {
  if (!str) return iconSrc.value;
  const reg = new RegExp(str, "g");
  return iconSrc.value.filter(
    (a) => a.class.match(reg)?.length || a.name.match(reg)?.length
  );
};

const clear = () => search("");

if (props.page) {
  pager(1);

  props.selectedIcon &&
    (currentPage.value =
      Math.ceil(
        iconSrc.value.findIndex((a) => a.class === props.selectedIcon) / 12
      ) || 1);
}
</script>
