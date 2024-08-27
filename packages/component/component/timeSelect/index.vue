<template>
	<lay-select :allowClear="_allowClear" :disabled="_disabled" :placeholder="_placeholder" :size="_size" :multiple="_multiple"
	 @change="$emit('change', $event)" v-model="modelValue" @update:model-value="$emit('update:model-value', $event)">
		<lay-select-option v-for="(d, i) in _timeList" :key="i" :label="formatter(_format, d)" :value="formatter(_valueFormat, d)"></lay-select-option>
	</lay-select>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { TimeSelectProps } from './interfaces';
import { TimeSelectDateTime, calcInterval, fromTime, timeInterval, toTime } from './useTime';
import LaySelect from '../select/index';
import LaySelectOption from '../selectOption/index';

defineOptions({
  name: 'LayTimeSelect'
});

const props = withDefaults(defineProps<TimeSelectProps>(), {
  interval: "00:30:00",
  format: "H:i:s",
  valueFormat: "H:i",
  start: "00:00:00",
  end: "00:00:00",
});

const modelValue = ref(props.modelValue);
const _allowClear = ref(props.allowClear);
const _disabled = ref(props.disabled);
const _placeholder = ref(props.placeholder);
const _size = ref(props.size);
const _multiple = ref(props.multiple);
const _start = ref(props.start ?? "00:00:00");
const _end = ref(props.end ?? "00:00:00");
const _interval = computed(() => Array.from(props.interval?.matchAll(/:?(\d+)/g) ?? []).map(a => Number(a[1])));
const _fromTime = computed(() => typeof _start.value === "string" ? Array.from(_start.value?.matchAll(/:?(\d+)/g) ?? []).map(a => Number(a[1])) : (() => { let { hour, minute, second } = fromTime(_start.value); return [hour, minute, second]; })());
const _endTime = computed(() => typeof _end.value === "string" ? Array.from(_end.value?.matchAll(/:?(\d+)/g) ?? []).map(a => Number(a[1])) : (() => { let { hour, minute, second } = fromTime(_end.value); return [hour, minute, second]; })());
const _intervalSeconds = computed(() => _interval.value.map((a, i) => a ? a / 60 * (60 ** (_interval.value.length - i)) : 0).reduce((a, b) => a + b));

const _format = computed(() => props.valueFormat ?? "HH:mm:ss");
const _valueFormat = computed(() => props.valueFormat ?? "HH:mm:ss");

const formatter = (format: string, time: TimeSelectDateTime) => {
  const _format = format.replace(/(Y|m|d|H|i|s)/g, (a) => {
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
      default:
        return a;
    }
  });
  return _format;
}

let _targetTime = toTime(
  fromTime(new Date(), {
    hour: _fromTime.value.at(-3),
    minute: _fromTime.value.at(-2),
    second: _fromTime.value.at(-1)
  })
);
let _targetTimeEnd = toTime(
  fromTime(new Date(), {
    hour: _endTime.value.at(-3),
    minute: _endTime.value.at(-2),
    second: _endTime.value.at(-1)
  })
);

if (_endTime.value.reduce((a, b) => a + b) === 0) {
  _targetTimeEnd = new Date(_targetTimeEnd.getTime() + 24 * 60 * 60 * 1000);
}

let _tick = calcInterval(_targetTime, _targetTimeEnd, _intervalSeconds.value);
const _i = timeInterval(_targetTime, _intervalSeconds.value * 1000);
let _timeList: Array<TimeSelectDateTime> = [];
while (Math.abs(_tick--) > 0) {
  _timeList.push(fromTime(_i.next().value));
}

</script>