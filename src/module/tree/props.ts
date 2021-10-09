import { TreeEmits, TreeProps } from '/@src/module/tree/type'

export const treeProps = withDefaults(defineProps<TreeProps>(), {
  showCheckbox: false,
  accordion: false,
  onlyIconControl: false,
  isJump: false,
  showLine: true,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  edit: true
})

export const emit = defineEmits<TreeEmits>()
