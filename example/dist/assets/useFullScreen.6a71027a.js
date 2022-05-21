import{r as a,o as u,h as k,e as s,d as e,g as t,f as n}from"./vendor.e7911ee1.js";const i={class:"markdown-body"},r=t("\u4F7F \u7528 useMove \u4E3A \u5143 \u7D20 \u63D0 \u4F9B \u62D6 \u62FD \u652F \u6301"),d=n("div",{class:"language-vue"},[n("pre",null,[n("code",{"v-pre":""},[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("template")]),n("span",{class:"token punctuation"},">")]),t(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("lay-button")]),t(),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("fullScreen"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),t("\u5168\u5C4F\u5207\u6362"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("lay-button")]),n("span",{class:"token punctuation"},">")]),t(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("template")]),n("span",{class:"token punctuation"},">")]),t(`

`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[t(`
`),n("span",{class:"token keyword"},"import"),t(),n("span",{class:"token punctuation"},"{"),t(" useFullScreen "),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token keyword"},"from"),t(),n("span",{class:"token string"},"'@layui/hooks-vue'"),t(`

`),n("span",{class:"token keyword"},"export"),t(),n("span",{class:"token keyword"},"default"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token function"},"setup"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token punctuation"},"{"),t(`
    `),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token punctuation"},"{"),t(" fullScreen"),n("span",{class:"token punctuation"},","),t(" isFullScreen "),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token function"},"useFullScreen"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(`

    `),n("span",{class:"token function"},"watch"),n("span",{class:"token punctuation"},"("),t("isFullScreen"),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
      console`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'\u5168\u5C4F\u5207\u6362'"),n("span",{class:"token punctuation"},")"),t(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),t(`

    `),n("span",{class:"token keyword"},"return"),t(),n("span",{class:"token punctuation"},"{"),t(`
      fullScreen`),n("span",{class:"token punctuation"},","),t(`
      isFullScreen`),n("span",{class:"token punctuation"},","),t(`
    `),n("span",{class:"token punctuation"},"}"),t(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
`),n("span",{class:"token punctuation"},"}"),t(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("script")]),n("span",{class:"token punctuation"},">")]),t(`
`)])])],-1),g=n("table",null,[n("thead",null,[n("tr",null,[n("th",null,"\u4E8B\u4EF6"),n("th",null,"\u63CF\u8FF0"),n("th",null,"\u7C7B\u578B")])]),n("tbody",null,[n("tr",null,[n("td",null,"fullScreen"),n("td",null,"\u5168\u5C4F\u5207\u6362"),n("td",null,"Function")]),n("tr",null,[n("td",null,"isFullScreen"),n("td",null,"\u5F53\u524D\u72B6\u6001"),n("td",null,"Ref")])])],-1),h={setup(_,{expose:l}){return l({frontmatter:{}}),(f,y)=>{const o=a("lay-field"),c=a("lay-block"),p=a("lay-table-box");return u(),k("div",i,[s(o,{title:"\u57FA\u7840\u4F7F\u7528",style:{"margin-top":"20px","margin-bottom":"20px"}}),s(c,{style:{"margin-left":"8px","margin-bottom":"40px"}},{default:e(()=>[r]),_:1}),d,s(o,{title:"\u4F7F\u7528\u5907\u6CE8",style:{"margin-top":"20px","margin-bottom":"20px"}}),s(p,null,{default:e(()=>[g]),_:1})])}}};export{h as default};
