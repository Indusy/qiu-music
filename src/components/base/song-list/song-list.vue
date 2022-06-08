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

<style lang="scss" scoped>
.song-list {
  margin: 0;
  padding: 0;

  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: 14px;

    .rank {
      flex: 0 0 25px;
      width: 25px;
      margin-right: 20px;
      text-align: center;

      .text {
        font-size: 16px;
      }

      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;

        &.icon0 {
          background-image: url(./first.png);
        }

        &.icon1 {
          background-image: url(./second.png);
        }

        &.icon2 {
          background-image: url(./third.png);
        }
      }
    }

    .content {
      flex: 1;
      overflow: hidden;

      .name {
        margin: 0;
        @include no-wrap();
        font-size: 18px;
        color: $color-dark-9;
      }

      .desc {
        margin: 0;
        @include no-wrap();
        margin-top: 4px;
        font-size: 12px;
        color: $color-dark-8;
      }
    }
  }

}
</style>