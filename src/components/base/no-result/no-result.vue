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
      <p class="text">{{ title }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .no-result {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    .no-result-content {
      text-align: center;
      .text {
        margin-top: 30px;
        font-size: 16px;
        color: $color-dark-7;
      }
    }
  }
</style>
