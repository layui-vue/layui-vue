export type {
  AlignedPlacement,
  Alignment,
  AutoPlacementOptions,
  AutoUpdateOptions,
  Axis,
  Boundary,
  ClientRectObject,
  ComputePositionConfig,
  ComputePositionReturn,
  Coords,
  DetectOverflowOptions,
  Dimensions,
  ElementContext,
  ElementRects,
  Elements,
  FlipOptions,
  FloatingElement,
  HideOptions,
  InlineOptions,
  Length,
  Middleware,
  MiddlewareArguments,
  MiddlewareData,
  MiddlewareReturn,
  MiddlewareState,
  NodeScroll,
  OffsetOptions,
  Padding,
  Placement,
  Platform,
  Rect,
  ReferenceElement,
  RootBoundary,
  ShiftOptions,
  Side,
  SideObject,
  SizeOptions,
  Strategy,
  VirtualElement,
} from "@floating-ui/dom";

import type { Strategy, Placement, Middleware } from "@floating-ui/dom";

export type UsePopperOptions = {
  // isAutoUpdate？
  transform?: boolean;

  /**
   * @default absolute
   *
   * */
  strategy?: Strategy;
  /**
   * @default bottom
   *
   * */
  placement?: Placement;
  middleware?: Middleware[];
};
