<script setup>
import { defineProps, defineEmits, toRefs } from 'vue'
const props = defineProps({
  songs: {
    type: Array,
    default() {
      return []
    }
  },
  rank: Boolean
})

const { songs, rank } = toRefs(props)

const emits = defineEmits(['select'])

function getDesc(song) {
  return `${song.singer}·${song.album}`
}
function selectItem(song, index) {
  emits('select', { song, index })
}
function getRankCls(index) {
  if (index <= 2) {
    return `icon icon${index}`
  } else {
    return 'text'
  }
}
function getRankText(index) {
  if (index > 2) {
    return index + 1
  }
}

</script>

<template>
  <ul class="song-list">
    <li class="item" v-for="(song, index) in songs" :key="song.id" @click="selectItem(song, index)">
      <div class="rank" v-if="rank">
        <span :class="getRankCls(index)">{{ getRankText(index) }}</span>
      </div>
      <div class="content">
        <h2 class="name">{{ song.name }}</h2>
        <p class="desc">{{ getDesc(song) }}</p>
      </div>
    </li>
  </ul>
</template>