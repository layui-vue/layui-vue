import type { App, Plugin } from "vue";

import "./theme/index.less";
import "@layui/layer-vue/lib/index.css";
import "@layui/icons-vue/lib/index.css";
import { layer } from "@layui/layer-vue";
import layerInstall from "@layui/layer-vue";
import i18n, { useI18n } from "./language";

import LayBacktop from "./component/backTop/index";
import LayAvatar from "./component/avatar/index";
import LayAvatarList from "./component/avatarList/index";
import LayRadio from "./component/radio/index";
import LayRadioGroup from "./component/radioGroup/index";
import LayButton from "./component/button/index";
import LayButtonContainer from "./component/buttonContainer/index";
import LayButtonGroup from "./component/buttonGroup/index";
import LayIcon from "./component/icon/index";
import LayIconPicker from "./component/iconPicker/index";
import LayCard from "./component/card/index";
import LayLayout from "./component/layout/index";
import LaySide from "./component/side/index";
import LayBody from "./component/body/index";
import LayHeader from "./component/header/index";
import LayFooter from "./component/footer/index";
import LayLogo from "./component/logo/index";
import LayPanel from "./component/panel/index";
import LayProgress from "./component/progress/index";
import LayCol from "./component/col/index";
import LayRow from "./component/row/index";
import LayInput from "./component/input/index";
import LayBadge from "./component/badge/index";
import LayQuote from "./component/quote/index";
import LayLine from "./component/line/index";
import LayTimeline from "./component/timeline/index";
import LayTimelineItem from "./component/timelineItem/index";
import LayTextarea from "./component/textarea/index";
import LaySwitch from "./component/switch/index";
import LayCollapse from "./component/collapse/index";
import LayCollapseItem from "./component/collapseItem/index";
import LayContainer from "./component/container/index";
import LayCountUp from "./component/countUp/index";
import LayMenu from "./component/menu/index";
import LayMenuItem from "./component/menuItem/index";
import LayCheckbox from "./component/checkbox/index";
import LayCheckboxGroup from "./component/checkboxGroup/index";
import LayForm from "./component/form/index";
import LayBreadcrumb from "./component/breadcrumb/index";
import LayBreadcrumbItem from "./component/breadcrumbItem/index";
import LayField from "./component/field/index";
import LaySelect from "./component/select/index";
import LaySelectOption from "./component/selectOption/index";
import LayScroll from "./component/scroll/index";
import LayEmpty from "./component/empty/index";
import LayFormItem from "./component/formItem/index";
import LayRate from "./component/rate/index";
import LayDropdown from "./component/dropdown/index";
import LayDropdownMenu from "./component/dropdownMenu/index";
import LayDropdownMenuItem from "./component/dropdownMenuItem/index";
import LayDropdownSubMenu from "./component/dropdownSubMenu/index";
import LayTab from "./component/tab/index";
import LayTabItem from "./component/tabItem/index";
import LayTree from "./component/tree/index";
import LayTreeSelect from "./component/treeSelect/index";
import LayTable from "./component/table/index";
import LayPage from "./component/page/index";
import LayTransfer from "./component/transfer/index";
import LaySlider from "./component/slider/index";
import LayCarousel from "./component/carousel/index";
import LayCarouselItem from "./component/carouselItem/index";
import LayColorPicker from "./component/colorPicker/index";
import LayTooltip from "./component/tooltip/index";
import LayInputNumber from "./component/inputNumber/index";
import LaySkeleton from "./component/skeleton/index";
import LaySkeletonItem from "./component/skeletonItem/index";
import LayStep from "./component/step/index";
import LayStepItem from "./component/stepItem/index";
import LaySubMenu from "./component/subMenu/index";
import LaySplitPanel from "./component/splitPanel/index";
import LaySplitPanelItem from "./component/splitPanelItem/index";
import LayException from "./component/exception/index";
import LayResult from "./component/result/index";
import LayFullscreen from "./component/fullscreen/index";
import LayDatePicker from "./component/datePicker/index";
import LayTransition from "./component/transition/index";
import LayUpload from "./component/upload/index";
import LayRipple from "./component/ripple/index";
import LayNoticeBar from "./component/noticeBar/index";
import LayPageHeader from "./component/pageHeader/index";
import LayCascader from "./component/cascader/index";
import LayAffix from "./component/affix/index";
import LaySpace from "./component/space/index";
import LayTag from "./component/tag/index";
import LayTagInput from "./component/tagInput/index";
import LayQrcode from "./component/qrcode/index";
import LayBarcode from "./component/barcode/index";
import LayConfigProvider from "./provider";
import { InstallOptions } from "./types";

const components: Record<string, Plugin> = {
  LaySplitPanel,
  LaySplitPanelItem,
  LayRadio,
  LayRadioGroup,
  LayButton,
  LayIcon,
  LayBacktop,
  LayLayout,
  LaySide,
  LayHeader,
  LayBody,
  LayFooter,
  LayLogo,
  LayPanel,
  LayCard,
  LayProgress,
  LayButtonGroup,
  LayButtonContainer,
  LayRow,
  LayCol,
  LayInput,
  LayBadge,
  LayQuote,
  LayLine,
  LayTimeline,
  LayTimelineItem,
  LayTextarea,
  LaySwitch,
  LayCollapse,
  LayCollapseItem,
  LayContainer,
  LayMenu,
  LayMenuItem,
  LayCheckbox,
  LayForm,
  LayBreadcrumb,
  LayBreadcrumbItem,
  LayAvatar,
  LayAvatarList,
  LayField,
  LaySelect,
  LayScroll,
  LaySelectOption,
  LayEmpty,
  LayFormItem,
  LayRate,
  LayDropdown,
  LayDropdownMenu,
  LayDropdownMenuItem,
  LayDropdownSubMenu,
  LayTab,
  LayTabItem,
  LayIconPicker,
  LayTree,
  LayTable,
  LayPage,
  LayTransfer,
  LayCheckboxGroup,
  LaySlider,
  LayCarousel,
  LayCarouselItem,
  LayColorPicker,
  LayTooltip,
  LayInputNumber,
  LaySkeleton,
  LaySkeletonItem,
  LayCountUp,
  LayStep,
  LayStepItem,
  LaySubMenu,
  LayException,
  LayResult,
  LayFullscreen,
  LayConfigProvider,
  LayDatePicker,
  LayTransition,
  LayUpload,
  LayRipple,
  LayNoticeBar,
  LayPageHeader,
  LayCascader,
  LayAffix,
  LaySpace,
  LayTag,
  LayTagInput,
  LayTreeSelect,
  LayQrcode,
  LayBarcode,
};

const install = (app: App, options?: InstallOptions): void => {
  for (const key of Object.keys(components)) {
    app.use(components[key], options);
  }
  app.use(i18n);
  app.use(layerInstall);
};

export {
  LaySplitPanel,
  LaySplitPanelItem,
  LayRadio,
  LayRadioGroup,
  LayButton,
  LayIcon,
  LayBacktop,
  LayLayout,
  LaySide,
  LayHeader,
  LayBody,
  LayFooter,
  LayLogo,
  LayPanel,
  LayCard,
  LayProgress,
  LayButtonGroup,
  LayButtonContainer,
  LayRow,
  LayCol,
  LayInput,
  LayBadge,
  LayQuote,
  LayLine,
  LayTimeline,
  LayTimelineItem,
  LayTextarea,
  LaySwitch,
  LayCollapse,
  LayCollapseItem,
  LayContainer,
  LayMenu,
  LayMenuItem,
  LayCheckbox,
  LayForm,
  LayBreadcrumb,
  LayBreadcrumbItem,
  LayAvatar,
  LayAvatarList,
  LayField,
  LaySelect,
  LayScroll,
  LaySelectOption,
  LayEmpty,
  LayFormItem,
  LayRate,
  LayDropdown,
  LayDropdownMenu,
  LayDropdownMenuItem,
  LayDropdownSubMenu,
  LayTab,
  LayTabItem,
  LayIconPicker,
  LayTree,
  LayTable,
  LayPage,
  LayTransfer,
  LayCheckboxGroup,
  LaySlider,
  LayCarousel,
  LayCarouselItem,
  LayColorPicker,
  LayTooltip,
  LayInputNumber,
  LaySkeleton,
  LaySkeletonItem,
  LayCountUp,
  LayStep,
  LayStepItem,
  LaySubMenu,
  LayException,
  LayResult,
  LayFullscreen,
  LayConfigProvider,
  LayDatePicker,
  LayTransition,
  LayUpload,
  LayRipple,
  LayNoticeBar,
  LayPageHeader,
  LayCascader,
  LayAffix,
  LaySpace,
  LayTag,
  LayTagInput,
  LayTreeSelect,
  LayQrcode,
  LayBarcode,
  install,
};

export { layer, useI18n };

export default { install };

export type {} from "./components.ts";
