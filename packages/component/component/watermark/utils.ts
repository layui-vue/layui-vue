export const reRendering = (
  mutation: MutationRecord,
  watermarkElement?: HTMLDivElement
) => {
  let flag = false;
  // Whether to delete the watermark node
  if (mutation.removedNodes.length && watermarkElement) {
    flag = Array.from(mutation.removedNodes).includes(watermarkElement);
  }
  // Whether the watermark dom property value has been modified
  if (mutation.type === "attributes" && mutation.target === watermarkElement) {
    flag = true;
  }
  return flag;
};
