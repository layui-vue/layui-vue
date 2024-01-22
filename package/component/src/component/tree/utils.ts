import {
  ReplaceFieldsOptionsOptional,
  ReplaceFieldsOptions,
} from "./tree.type";

export const fillFieldNames = (
  replaceFields?: ReplaceFieldsOptionsOptional
): ReplaceFieldsOptions => {
  const { id, title, children } = replaceFields || {};

  return {
    id: id || "id",
    title: title || "title",
    children: children || "children",
  };
};
