<script setup>
import { ref, defineExpose } from 'vue'

const title = ref('正在载入...')
function setTitle(tt) {
  title.value = tt
}
defineExpose({
  setTitle
})
</script>

<template>
  <div class="loading">
    <div class="loading-content">
      <img width="24" height="24" src="./loading.gif">
      <p class="desc">{{ title }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);

    .loading-content {
      text-align: center;

      .desc {
        line-height: 20px;
        font-size: 12px;
        color: $color-dark-7;
      }
    }
  }
</style>