import type { Dayjs } from "dayjs";
import type { DatePickerModelValueSingleType, Shortcuts } from "../interface";
import { inject } from "vue";

import { isFunction } from "../../../utils";
import { DATE_PICKER_CONTEXT } from "../interface";
import { normalizeDayjsValue } from "../util";

export function useShortcutsRange() {
  const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;

  const handleChangeShortcut = (shortcuts: Shortcuts): Array<Dayjs> => {
    const dates = (
      isFunction(shortcuts.value) ? shortcuts.value() : shortcuts.value
    ) as Array<DatePickerModelValueSingleType>;

    return [
      normalizeDayjsValue(dates[0], DatePickerContext.format!),
      normalizeDayjsValue(dates[1], DatePickerContext.format!),
    ].filter(Boolean) as Array<Dayjs>;
  };

  return handleChangeShortcut;
}
