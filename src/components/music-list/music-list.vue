<script setup>
import SongList from '@/components/base/song-list/song-list'
import MScroll from '@/components/wrap-scroll'
import { defineProps, toRefs } from 'vue'

const props = defineProps({
  songs: {
    type: Array,
    default() {
      return []
    }
  },
  title: String,
  pic: String,
  loading: Boolean,
})

const { songs, loading } = toRefs(props)

</script>

<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" ref="bgImage">
      <div class="play-btn-wrapper">
        <div class="play-btn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <m-scroll class="list" v-loading="loading" :probe-type="3">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </m-scroll>
  </div>
</template>