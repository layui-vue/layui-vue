"use strict";
module.exports = {
  types: [
    { value: "✨", name: "特性:    一个新的特性" },
    { value: "🐛", name: "修复:    修复一个Bug" },
    { value: "📝", name: "文档:    变更的只有文档" },
    { value: "💄", name: "格式:    空格, 分号等格式修复" },
    { value: "♻️", name: "重构:    代码重构，注意和特性、修复区分开" },
    { value: "🌀", name: "样式:    样式的调整" },
    { value: "⚡️", name: "性能:    提升性能" },
    { value: "✅", name: "测试:    添加一个测试" },
    { value: "🔧", name: "工具:    开发工具变动(构建、脚手架工具等)" },
    { value: "⏪", name: "回滚:    代码回退" },
    { value: "⬆️", name: "升级:    依赖升级" },
    { value: "⬇️", name: "降级:    依赖降级" },
  ],
  scopes: [
    { name: "component" },
  ],
  messages: {
    type: "选择一种你的提交类型:",
    scope: "选择一个scope (可选):",
    customScope: "Denote the SCOPE of this change:",
    subject: "短说明:\n",
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: "非兼容性说明 (可选):\n",
    footer: "关联关闭的issue，例如：#31, #34(可选):\n",
    confirmCommit: "确定提交说明?",
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["特性", "修复"],
  subjectLimit: 100,
};
