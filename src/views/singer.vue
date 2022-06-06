<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSingerList } from '@/service/singer'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
import IndexList from '@/components/index-list/index-list'

const singers = ref([])
const selectedSinger = ref(null)

const router = useRouter()

const result = await getSingerList()
singers.value = result.singers

function cacheSinger(singer) {
  storage.session.set(SINGER_KEY, singer)
}

function selectSinger (singer) {
  selectedSinger.value = singer
  cacheSinger(singer)
  router.push({
    path: `/singers/${singer.mid}`
  })
}

</script>

<template>
  <div class="singer">
    <index-list :data="singers" @select="selectSinger">
    </index-list>
  </div>
</template>

<style lang="scss" scoped>
.singer {
  height: calc(100% - 95px);
}
</style>