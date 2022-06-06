<script setup>
import { ref, defineExpose } from 'vue'
const title = ref('抱歉，没有结果')

function setTitle(tt) {
  title.value = tt
}

defineExpose({
  setTitle
})
</script>

<template>
  <div class="no-result">
    <div class="no-result-content">
      <div class="icon"></div>
      <p class="text">{{ title }}</p>
    </div>
  </div>
</template>