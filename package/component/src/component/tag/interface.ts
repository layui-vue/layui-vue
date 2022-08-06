export const TAG_COLORS = [
  "red",
  "orange",
  "green",
  "cyan",
  "blue",
  "black",
  "gray",
] as const;

export type TagColor = typeof TAG_COLORS[number];
