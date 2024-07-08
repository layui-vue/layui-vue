import { StyleValue } from "vue";
import { LayCodePanelProps } from "./ILayCodePanel";

export interface LayCodeProps extends LayCodePanelProps {
  layout?: ("code" | "preview")[];
  preview?: boolean;
  previewStyle?: StyleValue;
  text?: {
    code?: string;
    preview?: string;
  }
}