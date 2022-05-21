import {
  r as t,
  o as k,
  h as i,
  e as a,
  d as e,
  f as n,
  g as s,
} from "./vendor.e7911ee1.js";
const r = { class: "markdown-body" },
  g = n(
    "pre",
    null,
    [
      n("code", { "v-pre": "" }, [
        n("span", { class: "token tag" }, [
          n("span", { class: "token tag" }, [
            n("span", { class: "token punctuation" }, "<"),
            s("template"),
          ]),
          n("span", { class: "token punctuation" }, ">"),
        ]),
        s(`
  `),
        n("span", { class: "token tag" }, [
          n("span", { class: "token tag" }, [
            n("span", { class: "token punctuation" }, "<"),
            s("lay-step"),
          ]),
          n("span", { class: "token punctuation" }, ">"),
        ]),
        s(`
    `),
        n("span", { class: "token tag" }, [
          n("span", { class: "token tag" }, [
            n("span", { class: "token punctuation" }, "<"),
            s("lay-step-item"),
          ]),
          n("span", { class: "token punctuation" }, ">"),
        ]),
        n("span", { class: "token tag" }, [
          n("span", { class: "token tag" }, [
            n("span", { class: "token punctuation" }, "</"),
            s("lay-step-item"),
          ]),
          n("span", { class: "token punctuation" }, ">"),
        ]),
        s(`
    `),
        n("span", { class: "token tag" }, [
          n("span", { class: "token tag" }, [
            n("span", { class: "token punctuation" }, "<"),
            s("lay-step-item"),
          ]),
          n("span", { class: "token punctuation" }, ">"),
        ]),
        n("span", { class: "token tag" }, [
          n("span", { class: "token tag" }, [
            n("span", { class: "token punctuation" }, "</"),
            s("lay-step-item"),
          ]),
          n("span", { class: "token punctuation" }, ">"),
        ]),
        s(`
    `),
        n("span", { class: "token tag" }, [
          n("span", { class: "token tag" }, [
            n("span", { class: "token punctuation" }, "<"),
            s("lay-step-item"),
          ]),
          n("span", { class: "token punctuation" }, ">"),
        ]),
        n("span", { class: "token tag" }, [
          n("span", { class: "token tag" }, [
            n("span", { class: "token punctuation" }, "</"),
            s("lay-step-item"),
          ]),
          n("span", { class: "token punctuation" }, ">"),
        ]),
        s(`
  `),
        n("span", { class: "token tag" }, [
          n("span", { class: "token tag" }, [
            n("span", { class: "token punctuation" }, "</"),
            s("lay-step"),
          ]),
          n("span", { class: "token punctuation" }, ">"),
        ]),
        s(`
`),
        n("span", { class: "token tag" }, [
          n("span", { class: "token tag" }, [
            n("span", { class: "token punctuation" }, "</"),
            s("template"),
          ]),
          n("span", { class: "token punctuation" }, ">"),
        ]),
        s(`

`),
        n("span", { class: "token tag" }, [
          n("span", { class: "token tag" }, [
            n("span", { class: "token punctuation" }, "<"),
            s("script"),
          ]),
          n("span", { class: "token punctuation" }, ">"),
        ]),
        n("span", { class: "token script" }, [
          n("span", { class: "token language-javascript" }, [
            s(`
`),
            n("span", { class: "token keyword" }, "import"),
            s(),
            n("span", { class: "token punctuation" }, "{"),
            s(" ref "),
            n("span", { class: "token punctuation" }, "}"),
            s(),
            n("span", { class: "token keyword" }, "from"),
            s(),
            n("span", { class: "token string" }, "'vue'"),
            n("span", { class: "token punctuation" }, ";"),
            s(`

`),
            n("span", { class: "token keyword" }, "export"),
            s(),
            n("span", { class: "token keyword" }, "default"),
            s(),
            n("span", { class: "token punctuation" }, "{"),
            s(`
  `),
            n("span", { class: "token function" }, "setup"),
            n("span", { class: "token punctuation" }, "("),
            n("span", { class: "token punctuation" }, ")"),
            s(),
            n("span", { class: "token punctuation" }, "{"),
            s(`

    `),
            n("span", { class: "token keyword" }, "return"),
            s(),
            n("span", { class: "token punctuation" }, "{"),
            s(`
    `),
            n("span", { class: "token punctuation" }, "}"),
            s(`
  `),
            n("span", { class: "token punctuation" }, "}"),
            s(`
`),
            n("span", { class: "token punctuation" }, "}"),
            s(`
`),
          ]),
        ]),
        n("span", { class: "token tag" }, [
          n("span", { class: "token tag" }, [
            n("span", { class: "token punctuation" }, "</"),
            s("script"),
          ]),
          n("span", { class: "token punctuation" }, ">"),
        ]),
        s(`
`),
      ]),
    ],
    -1
  ),
  w = {
    setup(m, { expose: c }) {
      return (
        c({ frontmatter: {} }),
        (d, y) => {
          const o = t("lay-step-item"),
            p = t("lay-step"),
            l = t("lay-code"),
            u = t("lay-comment");
          return (
            k(),
            i("div", r, [
              a(l, null, {
                code: e(() => [g]),
                default: e(() => [
                  a(p, null, { default: e(() => [a(o), a(o), a(o)]), _: 1 }),
                ]),
                _: 1,
              }),
              a(u),
            ])
          );
        }
      );
    },
  };
export { w as default };
