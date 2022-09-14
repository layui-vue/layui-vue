export const TAG_COLORS = ["primary", "normal", "warm", "danger"] as const;

export type tagType = typeof TAG_COLORS[number];
