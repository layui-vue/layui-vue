import type { pointType } from "./interface";

export function pointMiddleware(point: pointType) {
  return {
    name: "pointMiddleware",
    fn: () => {
      return {
        x: point.x,
        y: point.y,
      };
    },
  };
}
