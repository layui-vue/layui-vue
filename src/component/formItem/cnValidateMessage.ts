import { ValidateMessages } from "async-validator";
// 中文翻译 --> 根据 async-validator 中 ValidateMessages 进行翻译
export default {
  default: "%s验证失败",
  required: "%s不能为空",
  enum: "%s不在枚举%s里面",
  whitespace: "%s不能为空",
  date: {
    format: "%s日期%s不是一个有效格式的日期%s",
    parse: "%s无法解析为日期,%s是无效的",
    invalid: "%s日期%s是无效的",
  },
  types: {
    number: "%s不是一个有效的数字",
    boolean: "%s不是一个有效的布尔类型",
    method: "%s不是一个有效的方法",
    regexp: "%s不是一个有效的正则表达式",
    integer: "%s不是一个有效的整型数字",
    float: "%s不是一个有效的浮点小数",
    array: "%s不是一个有效的数组",
    object: "%s不是一个有效的对象",
    enum: "%s不是一个有效的枚举",
    date: "%s不是一个有效的日期",
    url: "%s不是一个有效的url",
    hex: "%s不是一个有效的十六进制",
    email: "%s不是一个有效的邮箱",
  },
  string: {
    len: "%s必须是长度为%s个字符",
    min: "%s最小长度为%s个字符",
    max: "%s最长%s个字符",
    range: "%s字符长度需要在%s和%s之间",
  },
  number: {
    len: "%s长度必须为%s",
    min: "%s必须小于%s",
    max: "%s必须大于%s",
    range: "%s需要在%s和%s之间",
  },
  array: {
    len: "%s长度必须为%s",
    min: "%s长度必须小于%s",
    max: "%s长度必须大于%s",
    range: "%s长度需要在%s和%s之间",
  },
  pattern: {
    mismatch: "%s值%s不能匹配%s",
  },
} as ValidateMessages;
