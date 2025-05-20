<script setup lang="ts">
import type { Dayjs } from "dayjs";
import type {
  DatePickerValueNotArray,
  Shortcuts as ShortcutsType,
} from "../interface";
import type { RangePickerProps } from "./interface";
import LayIcon from "@layui/component/component/icon";
import dayjs from "dayjs";
import { computed, ref, watch } from "vue";

import { useBaseDatePicker } from "../hook/useBaseDatePicker";
import { useShortcutsRange } from "../hook/useShortcutsRange";
import DatePickerRender from "./common/DatePickerRender.vue";
import Footer from "./common/Footer.vue";
import Shortcuts from "./common/Shortcuts.vue";
import Year from "./common/Year.vue";

const props = withDefaults(defineProps<RangePickerProps>(), {});
const emits = defineEmits(["pick"]);

const { getDefaultValue } = useBaseDatePicker(props);
const hookChangeShortcut = useShortcutsRange();

const startDate = ref<DatePickerValueNotArray>();
const endDate = ref<DatePickerValueNotArray>();
const leftDate = ref(dayjs());
const rightDate = ref(dayjs());

const hoverYear = ref<Dayjs | undefined>();

watch(
  () => props.modelValue,
  () => {
    const [start, end] = props.modelValue;
    startDate.value = start;
    endDate.value = end;

    leftDate.value = start || getDefaultValue();
  },
  { immediate: true },
);

watch(
  () => leftDate.value,
  () => {
    rightDate.value = leftDate.value.add(props.yearPage!, "year");
  },
  { immediate: true },
);

const classes = computed(() => {
  return (Date: Dayjs) => {
    const _endDate = hoverYear.value || endDate.value;

    return {
      "layui-this":
        !!(startDate.value?.isSame(Date, "year")
          || endDate.value?.isSame(Date, "year")),
      "laydate-range-hover":
        !!(
          startDate.value
          && Date.isSameOrAfter(startDate.value, "year")
          && Date.isSameOrBefore(_endDate, "year")
        )
        || !!(
          startDate.value
          && Date.isSameOrBefore(startDate.value, "year")
          && Date.isSameOrAfter(_endDate, "year")
        ),
    };
  };
});

function handleYearPick(date: Dayjs) {
  if (!startDate.value || (startDate.value && endDate.value)) {
    startDate.value = date;
    endDate.value = undefined;
  }
  else if (date.isSameOrBefore(startDate.value, "year")) {
    endDate.value = startDate.value;
    startDate.value = date;
  }
  else {
    endDate.value = date;
  }
  if (props.simple && startDate.value && endDate.value) {
    handleConfirm();
  }
}

function handleYearHover(date: Dayjs) {
  if (!startDate.value || endDate.value) {
    hoverYear.value = undefined;
    return;
  }

  hoverYear.value = date;
}

function handleChangeShortcut(shortcuts: ShortcutsType) {
  const shortcutsValues = hookChangeShortcut(shortcuts);

  leftDate.value = shortcutsValues[0];
  rightDate.value = shortcutsValues[1];

  startDate.value = shortcutsValues[0];
  endDate.value = shortcutsValues[1];

  if (props.simple)
    handleConfirm();
}

function handleConfirm() {
  emits("pick", [startDate.value, endDate.value]);
}
</script>

<template>
  <div class="layui-laydate layui-laydate-range">
    <div class="layui-laydate-range-main">
      <Shortcuts @change-shortcut="handleChangeShortcut" />

      <Year
        :model-value="leftDate"
        :show-date="leftDate"
        :classes="classes"
        @pick="handleYearPick"
        @hover-cell="handleYearHover"
      >
        <template #header="{ yearList }">
          <LayIcon
            type="layui-icon-prev"
            @click="leftDate = leftDate.subtract(yearPage!, 'year')"
          />
          <div class="laydate-set-ym">
            <span class="laydate-time-text">
              {{ yearList.join(" - ") }}
            </span>
          </div>
          <LayIcon type="layui-icon-next" style="visibility: hidden" />
        </template>
      </Year>
      <Year
        :model-value="rightDate"
        :show-date="rightDate"
        :classes="classes"
        @pick="handleYearPick"
        @hover-cell="handleYearHover"
      >
        <template #header="{ yearList }">
          <LayIcon type="layui-icon-prev" style="visibility: hidden" />
          <div class="laydate-set-ym">
            <span class="laydate-time-text">
              {{ yearList.join(" - ") }}
            </span>
          </div>
          <LayIcon
            type="layui-icon-next"
            @click="leftDate = leftDate.add(yearPage!, 'year')"
          />
        </template>
      </Year>
    </div>
    <Footer
      :show-now="false"
      :show-confirm="!props.simple"
      @confirm="handleConfirm"
    >
      <DatePickerRender render="footer" :start="startDate" :end="endDate">
        {{ startDate?.format(props.inputFormat) }}
        {{ props.rangeSeparator }}
        {{ endDate?.format(props.inputFormat) }}
      </DatePickerRender>
    </Footer>
  </div>
</template>
