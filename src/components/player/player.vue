<script setup>
import { computed } from 'vue'
import store from '@/store'
import ProgressBar from './progress-bar.vue'
const currentSong = computed(() => store.getters.currentSong)
const playlist = computed(() => store.state.playlist)
</script>

<template>
  <div class="player" v-show="playlist.length">
    <transition>
      <div class="normal-player">
        <div class="player-header">
          <div class="shink"></div>
          <div class="title">正在播放</div>
        </div>
        <div class="album-cover">
          <img :src="currentSong.pic">
        </div>
        <div class="middle-t">
          <div class="song-detail">
            <div class="name">{{ currentSong.name }}</div>
            <div class="singer">{{ currentSong.singer }}</div>
          </div>
        </div>
        <div class="progress-wrapper">
          <progress-bar>

          </progress-bar>
        </div>
        <div class="operators">
          <div class="btn">
            <i class="icon-suijibofang1"></i>
          </div>
          <div class="btn">
            <i class="icon-media-previous"></i>
          </div>
          <div class="btn">
            <div class="icon-media-pause"></div>
          </div>
          <div class="btn">
            <div class="icon-media-next"></div>
          </div>
          <div class="btn">
            <div class="icon-shoucang"></div>
          </div>
        </div>
        <div class="swipper">
          <div class="swip-icon"></div>
          <div class="swip-title">上划查看歌词</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.player {
  position: absolute;
  top: 0;

  .normal-player {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 30;
    background-color: $color-gray-2;
    // background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    box-sizing: border-box;

    .album-cover {
      width: 100%;
      aspect-ratio: 1/1;
      font-size: 0;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 20px $color-transparent-2;

      img {
        width: 100%;
        object-fit: cover;
      }
    }

    .operators {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .btn {
        [class^=icon-] {
          border-radius: 50%;
          padding: 10px;
          font-size: 24px;
        }

        .icon-media-pause {
          background-color: $color-violet-8;
          color: #fff;
        }
      }
    }
  }
}
</style>