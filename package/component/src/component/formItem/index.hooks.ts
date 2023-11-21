import { LayFormContext } from "../../types";
import { computed, inject } from "vue";

export default function useProps(props: any) {
  const size = computed(() => {
    const formContext = inject("LayForm", {} as LayFormContext);

    return props.size || formContext.size || "md";
  });

  const mode = computed(() => {
    const formContext = inject("LayForm", {} as LayFormContext);

    return props.mode || formContext.mode || "block";
  });

  const labelWidth = computed(() => {
    const formContext = inject("LayForm", {} as LayFormContext);
    return props.labelWidth || formContext.labelWidth || 95;
  });

  const labelPosition = computed(() => {
    const formContext = inject("LayForm", {} as LayFormContext);
    return props.labelPosition || formContext.labelPosition;
  });

  const isRequired = computed(() => {
    const formContext = inject("LayForm", {} as LayFormContext);
    return props.required || formContext.required;
  });

  return { size, mode, labelWidth, labelPosition, isRequired };
}
