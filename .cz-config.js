"use strict";
module.exports = {
  types: [
    { value: "feat", name: "特性:    一个新的特性" },
    { value: "fix", name: "修复:    修复一个Bug" },
    { value: "chore", name: "杂项:    其他修改" },
    { value: "style", name: "样式:    样式的调整" },
    { value: "docs", name: "文档:    变更的只有文档" },
    { value: "test", name: "测试:    添加一个测试" },
    { value: "perf", name: "性能:    提升性能" },
    { value: "refactor", name: "重构:    代码重构，注意和特性、修复区分开" },
    { value: "ci", name: "工具:    开发工具变动(构建、脚手架工具等)" },
    { value: "revert", name: "回滚:    代码回退" },
    { value: "wip", name: "进行中:    编码中" },
  ],
  // scopes: [
  //   { name: "component" },
  // ],
  messages: {
    type: "选择一种你的提交类型:",
    // scope: "选择一个scope (可选):",
    customScope: "输入修改的组件(不需要加括号):",
    subject: "短说明:\n",
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: "非兼容性说明 (可选):\n",
    footer: "关联关闭的issue，例如：#31, #34(可选):\n",
    confirmCommit: "确定提交说明?",
  },
  skipEmptyScopes: true,
  allowCustomScopes: true,
  allowBreakingChanges: ["特性", "修复"],
  subjectLimit: 100,
};
