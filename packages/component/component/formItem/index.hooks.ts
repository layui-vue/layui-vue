import { LayFormContext } from "../../types";
import { computed, inject } from "vue";
import { normalizeValue } from "../../utils";

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
    return normalizeValue([props.labelWidth, formContext.labelWidth, 95])[0];
  });

  const labelPosition = computed(() => {
    const formContext = inject("LayForm", {} as LayFormContext);
    return props.labelPosition || formContext.labelPosition;
  });

  const isRequired = computed(() => {
    const formContext = inject("LayForm", {} as LayFormContext);
    return props.required || formContext.required;
  });

  const tooltipProps = computed(() => {
    const formContext = inject("LayForm", {} as LayFormContext);
    return props.tooltipProps || formContext.tooltipProps;
  });

  const isLabelTooltip = computed(() => {
    const formContext = inject("LayForm", {} as LayFormContext);
    return formContext.isLabelTooltip;
  });

  const inlineWidth = computed(() => {
    const formContext = inject("LayForm", {} as LayFormContext);
    return normalizeValue([
      props.inlineWidth,
      formContext.inlineWidth,
      "auto",
    ])[0];
  });

  return {
    size,
    mode,
    labelWidth,
    labelPosition,
    isRequired,
    tooltipProps,
    isLabelTooltip,
    inlineWidth,
  };
}
