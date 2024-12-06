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
            v-for="(icon, k) in _iconList"
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
        <span class="layui-laypage-count"> 共 {{ _total }} 个</span>
        <a
          href="javascript:;"
          class="layui-laypage-prev"
          :class="[_currentPage === 1 ? 'layui-disabled' : '']"
          @click="prev()"
        >
          <i class="layui-icon layui-icon-left"></i>
        </a>
        <span class="layui-laypage-curr">
          <em class="layui-laypage-em"></em>
          <em>{{ _currentPage }} / {{ _totalPage }}</em>
        </span>
        <span class="layui-laypage-spr">…</span>
        <a href="javascript:;" class="layui-laypage-last" title="尾页">
          {{ _totalPage }}
        </a>
        <a
          href="javascript:;"
          :class="[_currentPage === _totalPage ? 'layui-disabled' : '']"
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
import { computed, Ref, ref, watch } from "vue";
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

const _iconSrc = computed(() => props.icones);
const _iconList: Ref<Array<IconProp>> = ref(_iconSrc.value);
const _total: Ref<number> = ref(_iconList.value.length);
const _totalPage: Ref<number> = ref(Math.ceil(_total.value / 12));
const _currentPage: Ref<number> = ref(1);

const pager = (page: number) => {
  if (page < 1 || page > _totalPage.value) return;
  const start = (page - 1) * 12;
  const end = start + 12;
  _iconList.value = _iconSrc.value.slice(start, end);
};

watch(
  () => _currentPage.value,
  (newVal) => pager(newVal)
);

const next = () => {
  if (_currentPage.value === _totalPage.value) return;
  _currentPage.value = _currentPage.value + 1;
};

const prev = () => {
  if (_currentPage.value === 1) return;
  _currentPage.value = _currentPage.value - 1;
};

const search = (text: string) => {
  _currentPage.value = 1;
  const result = searchList(text);
  _total.value = result.length;
  if (props.page) {
    _iconList.value = result.slice(0, 12);
    _totalPage.value = Math.ceil(result.length / 12);
  } else {
    _iconList.value = result;
    _totalPage.value = result.length;
  }
};

const searchList = (str: string) => {
  if (!str) return _iconSrc.value;
  const reg = new RegExp(str, "g");
  return _iconSrc.value.filter(
    (a) => a.class.match(reg)?.length || a.name.match(reg)?.length
  );
};

const clear = () => search("");

if (props.page) {
  pager(1);

  props.selectedIcon &&
    (_currentPage.value =
      Math.ceil(
        _iconSrc.value.findIndex((a) => a.class === props.selectedIcon) / 12
      ) || 1);
}
</script>
