export const useEmit = (emit) => {
  const rowClick = function (data: any, evt: MouseEvent) {
    emit("row", data, evt);
  };

  const rowDoubleClick = function (data: any, evt: MouseEvent) {
    emit("row-double", data, evt);
  };

  const rowContextmenu = function (data: any, evt: MouseEvent) {
    emit("row-contextmenu", data, evt);
  };

  const cellDoubleClick = function (data: any, evt: MouseEvent) {
    emit("cell-double", data, evt);
  };

  const rowExpand = function (data: any, evt: PointerEvent) {
    emit("expand-change", data, evt);
  };

  return {
    rowClick,
    rowDoubleClick,
    rowContextmenu,
    cellDoubleClick,
    rowExpand,
  };
};
