declare module "*.vue" {
  import { DefineComponent } from "vue";
  const comp: DefineComponent;
  export default comp;
}

declare module "@layui/layui-vue/es/button/index" {}
declare module "@layui/layui-vue/es/input/index" {}
declare module "@layui/layui-vue/es/textarea/index" {}

declare module "*.md" {
  import { DefineComponent } from "vue";
  const comp: DefineComponent;
  export default comp;
}

declare module "prismjs";
declare module "prismjs/components/index";
declare module "escape-html";

interface ImportMeta {
  env: {
    MODE: string;
    BASE_URL: string;
    PROD: boolean;
    DEV: boolean;
    SSR: boolean;
  };
}
