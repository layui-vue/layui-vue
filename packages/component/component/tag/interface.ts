export const TAG_COLORS = ["primary", "normal", "warm", "danger"] as const;

export type TagType = typeof TAG_COLORS[number];

export type TagShape = "square" | "round";

export type TagVariant = "dark" | "light" | "plain";
