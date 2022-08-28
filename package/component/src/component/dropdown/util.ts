import { DropdownPlacement } from "./interface";

export const transformPlacement = (
  placement: DropdownPlacement
): DropdownPlacement => {
  const shouldTransform = placement.includes("-");
  const placementMap: any = {
    top: "start",
    left: "start",
    bottom: "end",
    right: "end",
  };

  if (shouldTransform) {
    const separated = placement.split("-");
    return `${separated[0]}-${
      placementMap[separated[1]] || separated[1]
    }` as DropdownPlacement;
  }

  return placement;
};
