export interface ColorPickerProps {
  /**
   * 默认颜色，不管你是使用 hex、rgb 还是 rgba 的格式输入，最终会以指定的格式显示。
   * v-model:color
   */
  color: string;
  /**
   * 颜色显示/输入格式，可选值： hex、rgb
   * 若在 rgb 格式下开启了透明度，格式会自动变成 rgba。在没有输入颜色的前提下，组件会默认为 #000 也就是黑色。
   * default: hex（即 16 进制色值）
   */
  format: "hex" | "rgb";
  /**
   * 是否开启透明度，若不开启，则不会显示透明框。开启了透明度选项时，当你的默认颜色为 hex 或 rgb 格式，
   * 组件会默认加上值为 1 的透明度。相同的，当你没有开启透明度，却以 rgba 格式设置默认颜色时，组件会默认没有透明度。
   * 注意：该参数必须配合 rgba 颜色值使用
   * default: false
   */
  alpha: boolean;
  /**
   * 预定义颜色是否开启
   * default: false
   */
  predefine: boolean;
  /**
   * 预定义颜色，此参数需配合 predefine: true 使用。
   * 此处列举一部分：['#ff4500','#1e90ff','rgba(255, 69, 0, 0.68)','rgb(255, 120, 0)']
   */
  colors: string[];
  /**
   * 下拉框大小，可以选择：lg、sm、xs。
   */
  size: "lg" | "sm" | "xs";
}
