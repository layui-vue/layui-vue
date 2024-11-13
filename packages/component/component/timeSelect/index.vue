<template>
  <div class="layui-time-select">
    <lay-select
      v-bind="_selectBinds"
      @change="$emit('change', $event)"
      v-model="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      @clear="$emit('clear', $event)"
    >
      <template #prepend>
        <lay-icon type="layui-icon-time"></lay-icon>
      </template>
      <lay-select-option
        v-for="(d, i) in _timeList"
        :key="i"
        :label="formatter(_inputFormat, d)"
        :value="formatter(_format, d)"
      ></lay-select-option>
      <slot></slot>
    </lay-select>
  </div>
</template>

<script setup lang="ts">
import { Ref, computed, nextTick, onMounted, ref, watch } from "vue";
import { TimeSelectProps } from "./interfaces";
import {
  TimeSelectDateTime,
  calcInterval,
  fromTime,
  timeInterval,
  toTime,
} from "./util";
import LayIcon from "../icon/index";
import LaySelect from "../select/index";
import LaySelectOption from "../selectOption/index";
import { SelectProps } from "../select/index.vue";

defineOptions({
  name: "LayTimeSelect",
});
defineEmits(["change", "update:modelValue", "clear"]);

const props = withDefaults(defineProps<TimeSelectProps>(), {
  interval: "00:30:00",
  format: "H:i",
  valueFormat: "H:i",
  start: "00:00:00",
  end: "00:00:00",
  withStartTime: true,
  withEndTime: true,
  collapseTagsTooltip: true,
  minCollapsedNum: 3,
  autoFitWidth: true,
  autoFitMinWidth: true,
});

type Distinct<T, K extends keyof any> = {
  [K in keyof T]?: T[K];
};
/**
 * LaySelect 参数
 */
const _selectBinds: Distinct<SelectProps, keyof TimeSelectProps> = props;
/**
 * 绑定值
 */
const modelValue = ref(props.modelValue);
/**
 * 起始时间
 */
const _start = ref(props.start ?? "00:00:00");
/**
 * 结束时间
 */
const _end = ref(props.end ?? "00:00:00");
/**
 * 时间间隔
 */
const _interval = ref(props.interval ?? "00:30:00");
/**
 * 列表包含开始时间
 */
const _withStartTime = ref(props.withStartTime ?? true);
/**
 * 列表包含结束时间
 */
const _withEndTime = ref(props.withEndTime ?? true);
/**
 * 间隔时间转成时分秒的数组
 */
const _intervalDigitArr = computed(() =>
  Array.from(_interval.value?.matchAll(/:?(\d+)/g) ?? []).map((a) =>
    Number(a[1])
  )
);
/**
 * 开始时间转成时分秒的数组
 */
const _fromTime = computed(() =>
  typeof _start.value === "string"
    ? Array.from(_start.value?.matchAll(/:?(\d+)/g) ?? []).map((a) =>
        Number(a[1])
      )
    : (() => {
        let { hour, minute, second } = fromTime(_start.value);
        return [hour, minute, second];
      })()
);
/**
 * 结束时间转成时分秒的数组
 */
const _endTime = computed(() =>
  typeof _end.value === "string"
    ? Array.from(_end.value?.matchAll(/:?(\d+)/g) ?? []).map((a) =>
        Number(a[1])
      )
    : (() => {
        let { hour, minute, second } = fromTime(_end.value);
        return [hour, minute, second];
      })()
);
/**
 * 时间间隔转成秒数
 */
const _intervalSeconds = computed(() =>
  _intervalDigitArr.value
    .map((a, i) =>
      a ? (a / 60) * 60 ** (_intervalDigitArr.value.length - i) : 0
    )
    .reduce((a, b) => a + b)
);
/**
 * 显示值格式化字符串
 */
const _inputFormat = ref(props.inputFormat ?? "H:i");
/**
 * 绑定值格式化字符串
 */
const _format = ref(props.format ?? "H:i");
/**
 * 时间列表
 */
const _timeList: Ref<Array<TimeSelectDateTime>> = ref([]);
/**
 * 跳过的时间点
 */
const _skip = ref(props.skip);
/**
 * 格式化方法，仅支持 `Y m d H i s` 共 6 个格式
 */
const formatter = (format: string, time: TimeSelectDateTime) => {
  return format.replace(/(Y|m|d|H|i|s|a)/g, (a) => {
    switch (a) {
      case "Y":
        return `${time.year! < 10 ? "0" : ""}${time.year}`;
      case "m":
        return `${time.month! < 10 ? "0" : ""}${time.month}`;
      case "d":
        return `${time.day! < 10 ? "0" : ""}${time.day}`;
      case "H":
        return `${time.hour! < 10 ? "0" : ""}${time.hour}`;
      case "i":
        return `${time.minute! < 10 ? "0" : ""}${time.minute}`;
      case "s":
        return `${time.second! < 10 ? "0" : ""}${time.second}`;
      case "a":
        return `${toTime(time).getTime()}`;
      default:
        return a;
    }
  });
};
/**
 * 初始化时间列表
 *
 * @description 通过开始时间、结束时间和时间间隔计算出 ticks，然后从迭代器中收集时间点列表
 */
const init = () => {
  nextTick(() => {
    let _targetTime = computed(() =>
      toTime(
        fromTime(new Date(), {
          hour: _fromTime.value.at(-3),
          minute: _fromTime.value.at(-2),
          second: _fromTime.value.at(-1),
        })
      )
    );
    let _targetTimeEnd = ref(
      toTime(
        fromTime(new Date(), {
          hour: _endTime.value.at(-3),
          minute: _endTime.value.at(-2),
          second: _endTime.value.at(-1),
        })
      )
    );

    /**
     * 如果结束时间全部为 0，就跳到第二天
     */
    if (_endTime.value.reduce((a, b) => a + b) === 0) {
      _targetTimeEnd.value = new Date(
        _targetTimeEnd.value.getTime() + 24 * 60 * 60 * 1000
      );
    }

    let _tick = calcInterval(
      _targetTime.value,
      _targetTimeEnd.value,
      _intervalSeconds.value
    );
    const _i = timeInterval(_targetTime.value, _intervalSeconds.value * 1000);
    _timeList.value = (() => {
      const list = [];
      if (_tick && !_withStartTime.value) {
        _i.next();
        _tick--;
      }
      if (_tick && _withEndTime.value) _tick++;
      while (_tick-- > 0) {
        let item = fromTime(_i.next().value);
        if (_skip.value?.includes(formatter(_format.value, item))) continue;
        list.push(item);
      }
      return list;
    })();
  });
};

watch(
  () => props.modelValue,
  (val) => {
    modelValue.value = val;
    init();
  }
);

watch(
  () => [props.interval, props.start, props.end],
  ([interval, start, end]) => {
    _interval.value = interval;
    _start.value = start;
    _end.value = end;
    init();
  }
);

watch(
  () => [props.start, props.end],
  ([start, end]) => {
    _start.value = start;
    _end.value = end;
    init();
  }
);

watch(
  () => [props.withStartTime, props.withEndTime],
  ([withStartTime, withEndTime]) => {
    console.log(withStartTime, withEndTime);
    _withStartTime.value = withStartTime;
    _withEndTime.value = withEndTime;
    init();
  }
);

watch(
  () => [props.skip],
  ([skip]) => {
    _skip.value = skip;
    init();
  }
);

watch(
  () => [props.inputFormat, props.format],
  ([inputFormat, format]) => {
    _inputFormat.value = inputFormat!;
    _format.value = format!;
    init();
  }
);

onMounted(() => {
  nextTick(() => {
    init();
  });
});
</script>
