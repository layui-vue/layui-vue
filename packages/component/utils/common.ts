import type { Ref } from "vue";

const CLASS_PREFIX_NAME = "layui";

export const clsPrefix = (cls: string) => `${CLASS_PREFIX_NAME}-${cls}`;
export function select(...branches: Array<() => [boolean, any]>) {
  return branches.map(branch => branch()).find(([a, _]) => a);
}
export function delayCompare(source: Ref<any>, delay: number): Promise<[boolean, any, any]> {
  return new Promise((resolve) => {
    const that = source.value;
    setTimeout(() => {
      resolve([source.value === that, source.value, that]);
    }, delay);
  });
}
