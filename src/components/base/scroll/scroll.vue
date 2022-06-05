<script setup>
import useScroll from './use-scroll'
import { ref, defineProps, defineEmits } from 'vue'

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
useScroll(rootRef, props, emits)

</script>

<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>