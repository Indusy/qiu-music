<script>
import createDetailComponent from '@/assets/js/create-detail-component'
import { getSingerDetail } from '@/service/singer'
import { SINGER_KEY } from '@/assets/js/constant'

export default createDetailComponent('singer-detail', SINGER_KEY, getSingerDetail)

</script>

<template>
  <div class="singer-detail">
    <music-list :songs="songs" :title="title" :pic="pic" :loading="loading"></music-list>
  </div>
</template>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: linear-gradient(to right, $color-gray-2, $color-violet-1, $color-red-1, $color-green-1, $color-yellow-1);
}
</style>