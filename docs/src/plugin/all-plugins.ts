import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// @ts-expect-error TODO
import container from "markdown-it-container";
import Markdown from "vite-plugin-md";
import createAnchor from "./create-anchor";
import createContributor from "./create-contributor";
import demo from "./create-demo";
import createDescribe from "./create-describe";
import createPreviousNext from "./create-previous-next";
import createQuote from "./create-quote";
import createTable from "./create-table";
import createTitle from "./create-title";
import highlight from "./highlight";
import preWrapper from "./pre-wrapper";
import snippet from "./snippet";

const plugins = [
  vue({
    include: [/\.vue$/, /\.md$/],
  }),
  vueJsx(),
  Markdown({
    markdownItOptions: {
      html: true,
      linkify: true,
      typographer: true,
      highlight,
    },
    markdownItSetup(md) {
      md.use(snippet)
        .use(preWrapper)
        .use(container, "demo", demo)
        .use(...createTable("table"))
        .use(...createQuote("quote"))
        .use(...createTitle("title"))
        .use(...createDescribe("describe"))
        .use(...createAnchor("anchor"))
        .use(...createPreviousNext("previousNext"))
        .use(...createContributor("contributor"));
    },
  }),
] as any;

export default plugins;
