import { VueDirective } from "../types";

const vRelativeTime: VueDirective = {
  mounted(el, bindings, vnode) {
    let value = bindings.value,
      compareDate = new Date(),
      limit = undefined;

    if (typeof bindings.value === "object") {
      value = bindings.value.value;
      if (bindings.value?.compareDate)
        compareDate = new Date(bindings.value.compareDate);
      if (bindings.value?.limit) limit = parseInt(bindings.value.limit);
    }

    if (isNaN(new Date(value).getTime())) {
      return;
    }

    const diff = compareDate.getTime() - new Date(value).getTime();
    const absDiff = Math.abs(diff) / 1000;

    if (limit && absDiff > limit) return;

    let str = `很久之`;
    let raw = false;

    if (absDiff < 60) {
      str = diff > 0 ? "刚刚" : diff < 0 ? "稍后" : "现在";
      raw = true;
    } else if (absDiff < 3600) {
      str = `${Math.trunc(absDiff / 60)}分钟`;
    } else if (absDiff < 86400) {
      str = `${Math.trunc(absDiff / 3600)}小时`;
    } else if (absDiff < 604800) {
      if (absDiff < 172800) {
        str = `昨天`;
        raw = true;
      } else if (absDiff < 259200) {
        str = `前天`;
        raw = true;
      } else {
        str = `${Math.trunc(absDiff / 86400)}天`;
      }
    } else if (absDiff < 2419200) {
      str = `${Math.trunc(absDiff / 604800)}周`;
    } else if (absDiff < 31557600) {
      if (absDiff < 4838400) {
        str = diff > 0 ? "上个月" : "下个月";
        raw = true;
      } else {
        str = `${Math.trunc(absDiff / 2419200)}个月`;
      }
    } else if (absDiff < 157788000) {
      if (absDiff < 63115200) {
        str = diff > 0 ? "去年" : "明年";
        raw = true;
      } else str = `${Math.trunc(absDiff / 31557600)}年`;
    }

    el.innerText = `${raw ? str : `${str}${diff > 0 ? "前" : "后"}`}`;
  },
};

export { vRelativeTime };
