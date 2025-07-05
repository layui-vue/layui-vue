<script setup lang="ts">
import type { Dayjs } from "dayjs";
import type {
  DatePickerValueNotArray,
  Shortcuts as ShortcutsType,
} from "../interface";
import type { RangePickerProps } from "./interface";
import LayDropdown from "@layui/component/component/dropdown";
import LayIcon from "@layui/component/component/icon";
import { useI18n } from "@layui/component/language";
import dayjs from "dayjs";
import { computed, ref, watch } from "vue";

import { useBaseDatePicker } from "../hook/useBaseDatePicker";
import { useShortcutsRange } from "../hook/useShortcutsRange";
import DatePickerRender from "./common/DatePickerRender.vue";
import Footer from "./common/Footer.vue";
import Month from "./common/Month.vue";
import Shortcuts from "./common/Shortcuts.vue";
import Year from "./common/Year.vue";

const props = withDefaults(defineProps<RangePickerProps>(), {});
const emits = defineEmits(["pick"]);

const { t } = useI18n();
const {
  getDefaultValue,
} = useBaseDatePicker(props);
const hookChangeShortcut = useShortcutsRange();

const startDate = ref<DatePickerValueNotArray>();
const endDate = ref<DatePickerValueNotArray>();
const leftDate = ref(dayjs());
const rightDate = ref(dayjs());

const yearLeftRef = ref<InstanceType<typeof LayDropdown>>();
const yearRightRef = ref<InstanceType<typeof LayDropdown>>();

const hoverMonth = ref<Dayjs | undefined>();

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
    rightDate.value = leftDate.value.add(1, "year");
  },
  { immediate: true },
);

const classes = computed(() => {
  return (Date: Dayjs) => {
    const _endDate = hoverMonth.value || endDate.value;

    return {
      "layui-this":
        !!(startDate.value?.isSame(Date, "month")
          || endDate.value?.isSame(Date, "month")),
      "laydate-range-hover":
        !!(
          startDate.value
          && Date.isSameOrAfter(startDate.value, "month")
          && Date.isSameOrBefore(_endDate, "month")
        )
        || !!(
          startDate.value
          && Date.isSameOrBefore(startDate.value, "month")
          && Date.isSameOrAfter(_endDate, "month")
        ),
    };
  };
});

const isYearMonth = computed(() => props.type === "yearmonth");

function handleMonthPick(date: Dayjs) {
  if (!startDate.value || (startDate.value && endDate.value)) {
    startDate.value = date;
    endDate.value = undefined;
  }
  else if (date.isSameOrBefore(startDate.value, "month")) {
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

function handleMonthHover(date: Dayjs) {
  if (!startDate.value || endDate.value) {
    hoverMonth.value = undefined;
    return;
  }

  hoverMonth.value = date;
}

function handleLeftYearChange(year: Dayjs) {
  leftDate.value = year;
  yearLeftRef.value?.hide();
}

function handleRightYearChange(year: Dayjs) {
  leftDate.value = year.subtract(1, "year");
  yearRightRef.value?.hide();
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
  <div class="layui-laydate" :class="{ 'layui-laydate-range': isYearMonth }">
    <div class="layui-laydate-range-main">
      <Shortcuts @change-shortcut="handleChangeShortcut" />

      <Month
        :model-value="startDate"
        :show-date="leftDate"
        :classes="classes"
        :date-type="props.type"
        @pick="handleMonthPick"
        @hover-cell="handleMonthHover"
      >
        <template #header>
          <template v-if="isYearMonth">
            <LayIcon
              type="layui-icon-prev"
              @click="leftDate = leftDate.subtract(1, 'year')"
            />

            <LayDropdown ref="yearLeftRef">
              <div class="laydate-set-ym">
                <span>{{ leftDate.year() }} {{ t("datePicker.year") }}</span>
              </div>
              <template #content>
                <Year
                  class="layui-laydate"
                  :model-value="leftDate"
                  :show-date="leftDate"
                  @pick="handleLeftYearChange"
                />
              </template>
            </LayDropdown>
          </template>
          <div v-else class="laydate-set-ym">
            <span>选择月份范围</span>
          </div>
        </template>
      </Month>
      <Month
        v-if="isYearMonth"
        :model-value="endDate"
        :show-date="rightDate"
        :date-type="props.type"
        :classes="classes"
        @pick="handleMonthPick"
        @hover-cell="handleMonthHover"
      >
        <template #header>
          <LayDropdown ref="yearRightRef">
            <div class="laydate-set-ym">
              <span>
                {{ leftDate.add(1, "year").year() }}
                {{ t("datePicker.year") }}</span>
            </div>
            <template #content>
              <Year
                class="layui-laydate"
                :model-value="rightDate"
                :show-date="rightDate"
                @pick="handleRightYearChange"
              />
            </template>
          </LayDropdown>

          <LayIcon
            type="layui-icon-next"
            @click="leftDate = leftDate.add(1, 'year')"
          />
        </template>
      </Month>
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
