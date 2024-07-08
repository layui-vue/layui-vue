import { CSSProperties } from "vue";

export interface LayCodePanelProps {
  /**
   * 代码文本
   */
  code?: string;
  /**
   * 全局样式补充
   */
  style?: CSSProperties | string[];
  /**
   * 代码样式补充，会覆盖全局样式
   */
  codeStyle?: CSSProperties | string[];
  /**
   * 代码容器样式
   */
  className?: string[] | string;
  /**
   * 允许复制
   */
  copy?: boolean;
  /**
   * 界面文字描述
   */
  text?: {
    code?: string;
  };
  /**
   * 开启头部
   */
  header?: boolean;
  /**
   * 显示行号
   */
  ln?: boolean;
  /**
   * 主题样式
   */
  theme?: "light" | "dark";
  /**
   * HTML 转码
   */
  encode?: boolean;
  /**
   * 代码语言
   */
  lang?: string;
  /**
   * 显示代码语言
   */
  langMarker?: boolean;
  /**
   * 自动换行
   */
  wordWrap?: boolean;
  /**
   * 高亮器
   */
  highlighter?: string | "hljs" | "prism" | "shiki";
  /**
   * 是否允许选择高亮器
   */
  isCanChooseHighlighter?: boolean;
  /**
   * 是否允许选择代码
   */
  isAllowCodeSelect?: boolean;
  /**
   * 允许加载远程脚本
   */
  isAllowRemoteScript?: boolean;
}