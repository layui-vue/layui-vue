import type { pointType } from "./interface";

export const pointMiddleware = (point: pointType) => {
  return {
    name: "pointMiddleware",
    fn: () => {
      return {
        x: point.x,
        y: point.y,
      };
    },
  };
};
