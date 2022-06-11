<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import ProgressBar from './progress-bar'
import useMode from './use-mode'
import useFavorite from './use-favorite'
import usePlayHistory from './use-play-history'
import { PLAY_MODE } from '@/assets/js/constant'

// data
const audioRef = ref(null)
const barRef = ref(null)
const songReady = ref(false)
const currentTime = ref(0)
let progressChanging = false

// vuex
const store = useStore()
const fullScreen = computed(() => store.state.fullScreen)
const currentSong = computed(() => store.getters.currentSong)
const playing = computed(() => store.state.playing)
const currentIndex = computed(() => store.state.currentIndex)
const playMode = computed(() => store.state.playMode)

// hooks
const { modeIcon, changeMode } = useMode()
const { getFavoriteIcon, toggleFavorite } = useFavorite()
// placeholder
const { savePlay } = usePlayHistory()

// computed
const playlist = computed(() => store.state.playlist)

const playIcon = computed(() => {
  return playing.value ? 'icon-media-pause' : 'icon-media-play'
})

const progress = computed(() => {
  return currentTime.value / currentSong.value.duration
})

const disableCls = computed(() => {
  return songReady.value ? '' : 'disable'
})

// watch
watch(currentSong, (newSong) => {
  if (!newSong.id || !newSong.url) {
    return
  }
  currentTime.value = 0
  songReady.value = false
  const audioEl = audioRef.value
  audioEl.src = newSong.url
  audioEl.play()
  store.commit('setPlayingState', true)
})

watch(playing, (newPlaying) => {
  if (!songReady.value) {
    return
  }
  const audioEl = audioRef.value
  if (newPlaying) {
    audioEl.play()
    // playLyric()
  } else {
    audioEl.pause()
    // stopLyric()
  }
})

watch(fullScreen, async (newFullScreen) => {
  if (newFullScreen) {
    await nextTick()
    barRef.value.setOffset(progress.value)
  }
})

// methods
function goBack() {
  store.commit('setFullScreen', false)
}

function togglePlay() {
  if (!songReady.value) {
    return
  }
  store.commit('setPlayingState', !playing.value)
}

function pause() {
  store.commit('setPlayingState', false)
}

function prev() {
  const list = playlist.value
  if (!songReady.value || !list.length) {
    return
  }

  if (list.length === 1) {
    loop()
  } else {
    let index = currentIndex.value - 1
    if (index === -1) {
      index = list.length - 1
    }
    store.commit('setCurrentIndex', index)
  }
}

function next() {
  const list = playlist.value
  if (!songReady.value || !list.length) {
    return
  }

  if (list.length === 1) {
    loop()
  } else {
    let index = currentIndex.value + 1
    if (index === list.length) {
      index = 0
    }
    store.commit('setCurrentIndex', index)
  }
}

function loop() {
  const audioEl = audioRef.value
  audioEl.currentTime = 0
  audioEl.play()
  store.commit('setPlayingState', true)
}

function ready() {
  if (songReady.value) {
    return
  }
  songReady.value = true
  savePlay(currentSong.value)
}

function error() {
  songReady.value = true
}

function updateTime(e) {
  if (!progressChanging) {
    currentTime.value = e.target.currentTime
  }
}

function onProgressChanging(progress) {
  progressChanging = true
  currentTime.value = currentSong.value.duration * progress
}

function onProgressChanged(progress) {
  progressChanging = false
  audioRef.value.currentTime = currentTime.value = currentSong.value.duration * progress
  if (!playing.value) {
    store.commit('setPlayingState', true)
  }
}

function end() {
  currentTime.value = 0
  if (playMode.value === PLAY_MODE.loop) {
    loop()
  } else {
    next()
  }
}
</script>

<template>
  <div class="player" v-show="playlist.length">
    <transition>
      <div class="normal-player">
        <div class="player-header">
          <div class="shrink" @click="goBack">
            <i class="icon-back_android"></i>
          </div>
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
          <progress-bar ref="barRef" :progress="progress" @progress-changing="onProgressChanging"
            @progress-changed="onProgressChanged"></progress-bar>
        </div>
        <div class="operators">
          <div class="btn">
            <i class="icon-suijibofang1" @click="changeMode" :class="modeIcon"></i>
          </div>
          <div class="btn">
            <i @click="prev" class="icon-media-previous"></i>
          </div>
          <div class="btn" :class="disableCls">
            <i @click="togglePlay" :class="playIcon"></i>
          </div>
          <div class="btn" :class="disableCls">
            <i @click="next" class="icon-media-next"></i>
          </div>
          <div class="btn" :class="disableCls">
            <i @click="toggleFavorite(currentSong)" :class="getFavoriteIcon(currentSong)"></i>
          </div>
        </div>
        <div class="swipper">
          <div class="swip-icon"></div>
          <div class="swip-title">上划查看歌词</div>
        </div>
      </div>
    </transition>
    <audio ref="audioRef" @pause="pause" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
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
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    box-sizing: border-box;

    .player-header {
      position: relative;
      padding: 10px;
      display: flex;
      justify-content: center;

      .shrink {
        position: absolute;
        left: 0;

        [class^=icon-] {
          font-size: 24px;
        }
      }
    }

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

    .progress-wrapper {
      padding: 10px 0;
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
          color: $color-dark-7;

          &.disable {
            color: $-color-transparent-5;
          }
        }

        .icon-media-pause,
        .icon-media-play {
          background-color: $color-violet-8;
          color: #fff;
        }
      }
    }
  }
}
</style>