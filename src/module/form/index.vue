<template>
  <form class="layui-form" @submit="submit">
    <slot />
  </form>
</template>

<script setup name="LayForm" lang="ts">

const props = withDefaults(
  defineProps<{
    model?: object
  }>(),
  {
    model: function(){
      return {}
    }
  }
)

const emit = defineEmits(['submit'])

const submit = function () {
  emit('submit',props.model)
}
</script>
