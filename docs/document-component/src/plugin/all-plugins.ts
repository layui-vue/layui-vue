import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Markdown from "vite-plugin-md";
import container from "markdown-it-container";
import preWrapper from "./pre-wrapper";
import highlight from "./highlight";
import snippet from "./snippet";
import demo from "./create-demo";
import createTitle from "./create-title";
import createQuote from "./create-quote";
import createDescribe from "./create-describe";
import createTable from "./create-table";
import createAnchor from "./create-anchor";
import createPreviousNext from "./create-previous-next";
import createContributor from "./create-contributor";

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
