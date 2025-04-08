import type { App, Plugin } from "vue";

import type { InstallOptions } from "./types";
import layerInstall, { layer } from "@layui/layer-vue";
import LayAffix from "./component/affix/index";
import LayAutocomplete from "./component/autoComplete/index";
import LayAvatar from "./component/avatar/index";
import LayAvatarList from "./component/avatarList/index";
import LayBacktop from "./component/backTop/index";
import LayBadge from "./component/badge/index";
import LayBarcode from "./component/barcode/index";
import LayBody from "./component/body/index";
import LayBreadcrumb from "./component/breadcrumb/index";
import LayBreadcrumbItem from "./component/breadcrumbItem/index";
import LayButton from "./component/button/index";
import LayButtonContainer from "./component/buttonContainer/index";
import LayButtonGroup from "./component/buttonGroup/index";
import LayCard from "./component/card/index";
import LayCarousel from "./component/carousel/index";
import LayCarouselItem from "./component/carouselItem/index";
import LayCascader from "./component/cascader/index";
import LayCascaderPanel from "./component/cascaderPanel/index";
import LayCheckbox from "./component/checkbox/index";
import LayCheckboxGroup from "./component/checkboxGroup/index";
import LayCheckcard from "./component/checkcard/index";
import LayCheckcardGroup from "./component/checkcardGroup/index";
import LayCol from "./component/col/index";
import LayCollapse from "./component/collapse/index";
import LayCollapseItem from "./component/collapseItem/index";
import LayColorPicker from "./component/colorPicker/index";
import LayContainer from "./component/container/index";
import LayCountUp from "./component/countUp/index";
import LayDatePicker from "./component/datePicker/index";
import LayDescriptions from "./component/descriptions/index";
import LayDescriptionsItem from "./component/descriptionsItem/index";
import LayDropdown from "./component/dropdown/index";
import LayDropdownMenu from "./component/dropdownMenu/index";
import LayDropdownMenuItem from "./component/dropdownMenuItem/index";
import LayDropdownSubMenu from "./component/dropdownSubMenu/index";
import LayEmpty from "./component/empty/index";
import LayException from "./component/exception/index";
import LayField from "./component/field/index";
import LayFooter from "./component/footer/index";
import LayForm from "./component/form/index";
import LayFormItem from "./component/formItem/index";
import LayFullscreen from "./component/fullscreen/index";
import LayHeader from "./component/header/index";
import LayIcon from "./component/icon/index";
import LayIconPicker from "./component/iconPicker/index";
import LayInput from "./component/input/index";
import LayInputNumber from "./component/inputNumber/index";
import LayLayout from "./component/layout/index";
import LayLine from "./component/line/index";
import LayLoading from "./component/loading/index";
import LayLogo from "./component/logo/index";
import LayMenu from "./component/menu/index";
import LayMenuItem from "./component/menuItem/index";
import LayNoticeBar from "./component/noticeBar/index";
import LayPage from "./component/page/index";
import LayPageHeader from "./component/pageHeader/index";
import LayPanel from "./component/panel/index";
import LayPopconfirm from "./component/popconfirm/index";
import LayPopper from "./component/popper/index";
import LayProgress from "./component/progress/index";
import LayQrcode from "./component/qrcode/index";
import LayQuote from "./component/quote/index";
import LayRadio from "./component/radio/index";
import LayRadioButton from "./component/radioButton/index";
import LayRadioGroup from "./component/radioGroup/index";
import LayRate from "./component/rate/index";
import LayResult from "./component/result/index";
import LayRipple from "./component/ripple/index";
import LayRow from "./component/row/index";
import LayScroll from "./component/scroll/index";
import LaySegmented from "./component/segmented/index";
import LaySelect from "./component/select/index";
import LaySelectOption from "./component/selectOption/index";
import LaySelectOptionGroup from "./component/selectOptionGroup/index";
import LaySide from "./component/side/index";
import LaySkeleton from "./component/skeleton/index";
import LaySkeletonItem from "./component/skeletonItem/index";
import LaySlider from "./component/slider/index";
import LaySpace from "./component/space/index";
import LaySplitPanel from "./component/splitPanel/index";
import LaySplitPanelItem from "./component/splitPanelItem/index";
import LayStep from "./component/step/index";
import LayStepItem from "./component/stepItem/index";
import LaySubMenu from "./component/subMenu/index";
import LaySwitch from "./component/switch/index";
import LayTab from "./component/tab/index";
import LayTabItem from "./component/tabItem/index";
import LayTable from "./component/table/index";
import LayTag from "./component/tag/index";
import LayTagInput from "./component/tagInput/index";
import LayTextarea from "./component/textarea/index";
import LayTimeline from "./component/timeline/index";
import LayTimelineItem from "./component/timelineItem/index";
import LayTimeSelect from "./component/timeSelect/index";
import LayTooltip from "./component/tooltip/index";
import LayTransfer from "./component/transfer/index";
import LayTransition from "./component/transition/index";
import LayTree from "./component/tree/index";
import LayTreeSelect from "./component/treeSelect/index";
import LayUpload from "./component/upload/index";
import LayWatermark from "./component/watermark/index";
import i18n, { useI18n } from "./language";
import LayConfigProvider from "./provider";
import "./theme/index.less";
import "@layui/layer-vue/lib/index.css";
import "@layui/icons-vue/lib/index.css";

const components: Record<string, Plugin> = {
  LayAffix,
  LayAutocomplete,
  LayAvatar,
  LayAvatarList,
  LayBacktop,
  LayBadge,
  LayBarcode,
  LayBody,
  LayBreadcrumb,
  LayBreadcrumbItem,
  LayButton,
  LayButtonContainer,
  LayButtonGroup,
  LayCard,
  LayCarousel,
  LayCarouselItem,
  LayCascader,
  LayCascaderPanel,
  LayCheckbox,
  LayCheckboxGroup,
  LayCheckcard,
  LayCheckcardGroup,
  LayCol,
  LayCollapse,
  LayCollapseItem,
  LayColorPicker,
  LayConfigProvider,
  LayContainer,
  LayCountUp,
  LayDatePicker,
  LayDescriptions,
  LayDescriptionsItem,
  LayDropdown,
  LayDropdownMenu,
  LayDropdownMenuItem,
  LayDropdownSubMenu,
  LayEmpty,
  LayException,
  LayField,
  LayFooter,
  LayForm,
  LayFormItem,
  LayFullscreen,
  LayHeader,
  LayIcon,
  LayIconPicker,
  LayInput,
  LayInputNumber,
  LayLayout,
  LayLine,
  LayLoading,
  LayLogo,
  LayMenu,
  LayMenuItem,
  LayNoticeBar,
  LayPage,
  LayPageHeader,
  LayPanel,
  LayPopconfirm,
  LayPopper,
  LayProgress,
  LayQrcode,
  LayQuote,
  LayRadio,
  LayRadioButton,
  LayRadioGroup,
  LayRate,
  LayResult,
  LayRipple,
  LayRow,
  LayScroll,
  LaySegmented,
  LaySelect,
  LaySelectOption,
  LaySelectOptionGroup,
  LaySide,
  LaySkeleton,
  LaySkeletonItem,
  LaySlider,
  LaySpace,
  LaySplitPanel,
  LaySplitPanelItem,
  LayStep,
  LayStepItem,
  LaySubMenu,
  LaySwitch,
  LayTab,
  LayTabItem,
  LayTable,
  LayTag,
  LayTagInput,
  LayTextarea,
  LayTimeline,
  LayTimelineItem,
  LayTimeSelect,
  LayTooltip,
  LayTransfer,
  LayTransition,
  LayTree,
  LayTreeSelect,
  LayUpload,
  LayWatermark,
};

function install(app: App, options?: InstallOptions): void {
  for (const key of Object.keys(components)) {
    app.use(components[key], options);
  }
  app.use(i18n);
  app.use(layerInstall, options);
}

export {
  install,
  LayAffix,
  LayAutocomplete,
  LayAvatar,
  LayAvatarList,
  LayBacktop,
  LayBadge,
  LayBarcode,
  LayBody,
  LayBreadcrumb,
  LayBreadcrumbItem,
  LayButton,
  LayButtonContainer,
  LayButtonGroup,
  LayCard,
  LayCarousel,
  LayCarouselItem,
  LayCascader,
  LayCascaderPanel,
  LayCheckbox,
  LayCheckboxGroup,
  LayCheckcard,
  LayCheckcardGroup,
  LayCol,
  LayCollapse,
  LayCollapseItem,
  LayColorPicker,
  LayConfigProvider,
  LayContainer,
  LayCountUp,
  LayDatePicker,
  LayDescriptions,
  LayDescriptionsItem,
  LayDropdown,
  LayDropdownMenu,
  LayDropdownMenuItem,
  LayDropdownSubMenu,
  LayEmpty,
  LayException,
  LayField,
  LayFooter,
  LayForm,
  LayFormItem,
  LayFullscreen,
  LayHeader,
  LayIcon,
  LayIconPicker,
  LayInput,
  LayInputNumber,
  LayLayout,
  LayLine,
  LayLoading,
  LayLogo,
  LayMenu,
  LayMenuItem,
  LayNoticeBar,
  LayPage,
  LayPageHeader,
  LayPanel,
  LayPopconfirm,
  LayPopper,
  LayProgress,
  LayQrcode,
  LayQuote,
  LayRadio,
  LayRadioButton,
  LayRadioGroup,
  LayRate,
  LayResult,
  LayRipple,
  LayRow,
  LayScroll,
  LaySegmented,
  LaySelect,
  LaySelectOption,
  LaySelectOptionGroup,
  LaySide,
  LaySkeleton,
  LaySkeletonItem,
  LaySlider,
  LaySpace,
  LaySplitPanel,
  LaySplitPanelItem,
  LayStep,
  LayStepItem,
  LaySubMenu,
  LaySwitch,
  LayTab,
  LayTabItem,
  LayTable,
  LayTag,
  LayTagInput,
  LayTextarea,
  LayTimeline,
  LayTimelineItem,
  LayTimeSelect,
  LayTooltip,
  LayTransfer,
  LayTransition,
  LayTree,
  LayTreeSelect,
  LayUpload,
  LayWatermark,
};

export { layer, useI18n };

export default { install };

export type {} from "./components.ts";
