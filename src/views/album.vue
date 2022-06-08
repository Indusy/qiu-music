<script>
import createDetailComponent from '@/assets/js/create-detail-component'
import { getAlbum } from '@/service/recommend'
import { ALBUM_KEY } from '@/assets/js/constant'

export default createDetailComponent('album', ALBUM_KEY, getAlbum)

</script>

<template>
  <div class="album">
    <music-list :songs="songs" :title="title" :pic="pic" :loading="loading"></music-list>
  </div>
</template>

<style lang="scss" scoped>
.album {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: linear-gradient(to right, $color-gray-2, $color-violet-1, $color-red-1, $color-green-1, $color-yellow-1);
}
</style>