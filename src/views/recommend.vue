<script setup>
import Slider from '@/components/slider/slider'
import { computed, ref } from 'vue'
  import { getRecommend } from '@/service/recommend'

// data
const sliders = ref([])
const albums = ref([])

// computed
const loading = computed(() => {
  return sliders.value.length && !albums.value.length
})

const result = await getRecommend()
sliders.value = result.sliders
albums.value = result.albums

</script>

<template>
  <div class="recommend">
    <div class="slider-wrapper">
      <div class="slider-content">
        <slider v-if="sliders.length" :sliders="sliders"></slider>
        <div class="placeholder">
          {{ loading }}
          {{ sliders.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slider-wrapper {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;

  .slider-content {
    width: 100%;
  }
}
</style>