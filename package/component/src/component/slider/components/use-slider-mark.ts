import { computed, isVNode } from "vue"
import { Mark, SliderProps } from "../types/sliderType";


export const useSliderMark = (props: SliderProps) => {
  const marksList = computed(() => {
    if (!props.marks) {
      return []
    }
    const getAllkeys = Object.keys(props.marks).map(parseFloat)
    const getMarkList = getAllkeys.sort((a, b) => a - b)
    .filter(item => item >= props.min && item <= props.max)
    .map((pos): Mark => {
      let mark:any = {}
      if (typeof props.marks![pos] === 'object' && !isVNode(props.marks![pos])) {
        const { label, style } = props.marks![pos]
        mark = {
          label,
          style,
          point: pos
        }
      } else {
        mark = {
          label: props.marks![pos],
          point: pos
        }
      }
      return {
        pos: (pos - props.min) * 100 / (props.max - props.min),
        mark
      }      
    })
    return getMarkList
  })
  return {
    marksList
  }
}