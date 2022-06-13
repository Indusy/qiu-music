<script setup>
import useScroll from './use-scroll'
import { ref, defineProps, defineEmits, defineExpose } from 'vue'

const props = defineProps({
  click: {
    type: Boolean,
    default: true
  },
  probeType: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['scroll'])

const rootRef = ref(null)
const {scroll, wrapperStyle } = useScroll(rootRef, props, emits)

defineExpose({
  scroll,
  wrapperStyle
})

</script>

<template>
  <div ref="rootRef" :style="wrapperStyle" class="haha">
    <slot></slot>
  </div>
</template>