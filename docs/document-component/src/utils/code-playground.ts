const MAIN_FILE_NAME = "App.vue";

function utoa(data: string): string {
  return btoa(unescape(encodeURIComponent(data)));
}

export const openPlayground = (source: string) => {
  const code = decodeURIComponent(source);
  const originCode = {
    [MAIN_FILE_NAME]: code,
  };

  const encoded = utoa(JSON.stringify(originCode));
  const link = `https://layui-vue.github.io/layui-vue-playground/#${encoded}`;
  return {
    encoded,
    link,
  };
};
