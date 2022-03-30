import { useFetch } from "@vueuse/core";

export function getLayuiVueVersion() {
  const { data } = useFetch(`https://data.jsdelivr.com/v1/package/npm/@layui/layui-vue`, {
    timeout: 1000 * 2,
    initialData: '',
    afterFetch: (ctx) => ((ctx.data = ctx.data.tags.latest), ctx)
  }).json()
  return data;
}