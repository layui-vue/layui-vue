/**
 * Layui-vue Resolver
 *
 * √ On-demand import components for @layui/layui-vue
 * √ component and style resolver for @layui/icons-vue
 * √ layer API
 */
const matchComponents = [
  // done
  {
    pattern: /^LayAvatar$/,
    styleDir: "avatar",
  },
  {
    pattern: /^LayAvatarList$/,
    styleDir: "avatar",
  },
  {
    pattern: /^LayBackTop$/,
    styleDir: "backTop",
  },
  {
    pattern: /^LayBadge$/,
    styleDir: "badge",
  },
  {
    pattern: /^LayBody$/,
    styleDir: "body",
  },
  {
    pattern: /^LayBreadcrumb$/,
    styleDir: "breadcrumb",
  },
  {
    pattern: /^LayBreadcrumbItem$/,
    styleDir: "breadcrumb",
  },
  {
    pattern: /^LayButton$/,
    styleDir: "button",
  },
  {
    pattern: /^LayButtonContainer$/,
    styleDir: "buttonContainer",
  },
  {
    pattern: /^LayButtonGroup$/,
    styleDir: "buttonGroup",
  },
  {
    pattern: /^LayCard$/,
    styleDir: "card",
  },
  {
    pattern: /^(LayCarouselItem)$/,
    styleDir: "carousel",
  },
  {
    pattern: /^(LayCarousel)$/,
    styleDir: "carousel",
  },
  {
    pattern: /^(LayCheckboxGroup)$/,
    styleDir: "checkbox",
  },
  {
    pattern: /^(LayCheckbox)$/,
    styleDir: "checkbox",
  },
  {
    pattern: /^LayRow$/,
    styleDir: "row",
  },
  {
    pattern: /^LayCol$/,
    styleDir: "row",
  },
  {
    pattern: /^(LayCollapseItem)$/,
    styleDir: "collapse",
  },
  {
    pattern: /^(LayCollapse)$/,
    styleDir: "collapse",
  },
  {
    pattern: /^(LayColorPicker)$/,
    styleDir: "colorPicker",
  },
  {
    pattern: /^LayContainer$/,
    styleDir: "container",
  },
  {
    pattern: /^LayCountUp$/,
    styleDir: "",
  },
  {
    pattern: /^LayDatePicker$/,
    styleDir: "datePicker",
  },
  {
    pattern: /^(LayDropdownMenuItem)$/,
    styleDir: "dropdown",
  },
  {
    pattern: /^(LayDropdownMenu)$/,
    styleDir: "dropdown",
  },
  {
    pattern: /^(LayDropdown)$/,
    styleDir: "dropdown",
  },
  {
    pattern: /^LayEmpty$/,
    styleDir: "empty",
  },
  {
    pattern: /^LayException$/,
    styleDir: "exception",
  },
  {
    pattern: /^LayField$/,
    styleDir: "field",
  },
  {
    pattern: /^LayFooter$/,
    styleDir: "footer",
  },
  {
    pattern: /^(LayFormItem)$/,
    styleDir: "form",
  },
  {
    pattern: /^(LayForm)$/,
    styleDir: "form",
  },
  {
    pattern: /^(LayFullscreen)$/,
    styleDir: "fullscreen",
  },
  {
    pattern: /^(LayHeader)$/,
    styleDir: "header",
  },
  {
    pattern: /^(LayIconPicker)$/,
    styleDir: "iconPicker",
  },
  {
    pattern: /^(LayInput)$/,
    styleDir: "input",
  },
  {
    pattern: /^(LayInputNumber)$/,
    styleDir: "inputNumber",
  },
  {
    pattern: /^LayLayout$/,
    styleDir: "layout",
  },
  {
    pattern: /^LayLine$/,
    styleDir: "line",
  },
  {
    pattern: /^LayLogo$/,
    styleDir: "logo",
  },
  {
    pattern: /^(LayMenu|LayMenuItem|LaySubMenu)$/,
    styleDir: "menu",
  },
  {
    pattern: /^LayNoticeBar$/,
    styleDir: "noticeBar",
  },
  {
    pattern: /^LayPage$/,
    styleDir: "page",
  },
  {
    pattern: /^LayPanel$/,
    styleDir: "panel",
  },
  {
    pattern: /^LayProgress$/,
    styleDir: "progress",
  },
  {
    pattern: /^LayQuote$/,
    styleDir: "quote",
  },
  {
    pattern: /^LayRadio$/,
    styleDir: "radio",
  },
  {
    pattern: /^LayRate$/,
    styleDir: "rate",
  },
  {
    pattern: /^LayResult$/,
    styleDir: "result",
  },
  {
    pattern: /^LayRipple$/,
    styleDir: "ripple",
  },
  {
    pattern: /^LayScroll$/,
    styleDir: "scroll",
  },
  {
    pattern: /^LaySelectOption$/,
    styleDir: "select",
  },
  {
    pattern: /^LaySelect$/,
    styleDir: "select",
  },
  {
    pattern: /^LaySide$/,
    styleDir: "side",
  },
  {
    pattern: /^LaySkeletonItem$/,
    styleDir: "skeleton",
  },
  {
    pattern: /^LaySkeleton$/,
    styleDir: "skeleton",
  },
  {
    pattern: /^LaySlider$/,
    styleDir: "slider",
  },
  {
    pattern: /^LaySplitPanelItem$/,
    styleDir: "splitPanel",
  },
  {
    pattern: /^LaySplitPanel$/,
    styleDir: "splitPanel",
  },
  {
    pattern: /^LayStepItem$/,
    styleDir: "step",
  },
  {
    pattern: /^LayStep$/,
    styleDir: "step",
  },
  {
    pattern: /^LaySwitch$/,
    styleDir: "switch",
  },
  {
    pattern: /^(LayTab|LayTabItem)$/,
    styleDir: "tab",
  },
  {
    pattern: /^(LayTable)$/,
    styleDir: "table",
  },
  {
    pattern: /^(LayTextarea)$/,
    styleDir: "textarea",
  },
  {
    pattern: /^LayTimelineItem$/,
    styleDir: "timeline",
  },
  {
    pattern: /^LayTimeline$/,
    styleDir: "timeline",
  },
  {
    pattern: /^LayTolltip$/,
    styleDir: "popper",
  },
  {
    pattern: /^LayTransfer$/,
    styleDir: "transfer",
  },
  {
    pattern: /^LayTransition$/,
    styleDir: "transition",
  },
  {
    pattern: /^LayTree$/,
    styleDir: "tree",
  },
  {
    pattern: /^LayUpload$/,
    styleDir: "upload",
  },
];

export interface LayuiVueResolverOptions {
  /**
   * import style along with components
   *
   * @default 'css'
   */
  importStyle?: boolean | "css";

  /**
   * resolve `@layui/layui-vue' icons
   * requires package `@layui/icons-vue`
   *
   * @default false
   */
  resolveIcons?: boolean;

  /**
   * exclude components that do not require automatic import
   * @default []
   *
   */
  exclude?: string[];
}

const libRE = /^Lay[A-Z]/;
const layerRE = /^(layer|LayLayer)$/;
const iconsRE = /^([A-Z][\w]+Icon|LayIcon)$/;
const esComponentsFolder = "@layui/layui-vue/esm";

function lowerCamelCase(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function getSideEffects(importName: string, options: LayuiVueResolverOptions) {
  const { importStyle = true } = options;
  if (!importStyle) return;
  let styleDir: string | undefined = undefined;
  if (importName.match(iconsRE)) {
    return `@layui/icons-vue/lib/index.css`;
  } else if (importName.match(layerRE)) {
    return `@layui/layer-vue/lib/index.css`;
  } else if (importName.match(libRE)) {
    styleDir = lowerCamelCase(importName.slice(3)); // LayBackTop -> backTop
    for (const item of matchComponents) {
      if (item.pattern.test(importName)) {
        styleDir = item.styleDir;
        break;
      }
    }
    return styleDir ? `${esComponentsFolder}/${styleDir}/index.css` : undefined;
  }
}

function resolveComponent(name: string, options: LayuiVueResolverOptions) {
  let importName: string | undefined = undefined;
  let path: string = `@layui/layui-vue`;
  let sideEffects: string | string[] | undefined;

  if (options.resolveIcons && name.match(iconsRE)) {
    importName = name;
    path = `@layui/icons-vue`;
    sideEffects = getSideEffects(name, options);
  } else if (name.match(layerRE)) {
    importName = name;
    path = `@layui/layer-vue`;
    sideEffects = getSideEffects(name, options);
  } else if (name.match(libRE) && !options?.exclude?.includes(name)) {
    importName = name;
    path = `@layui/layui-vue`;
    sideEffects = getSideEffects(name, options);
  }

  return importName ? { importName, path, sideEffects } : null;
}

/**
 * Resolver for layui-vue
 *
 * @param options
 * @returns
 */
export function LayuiVueResolver(options: LayuiVueResolverOptions = {}) {
  return {
    type: "component",
    resolve: (name: string) => {
      return resolveComponent(name, options);
    },
  };
}
