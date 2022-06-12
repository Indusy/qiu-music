<script>
import { useStore } from 'vuex'
import { computed, reactive } from 'vue'

export default {
  name: 'mini-player',
  props: {
    togglePlay: Function,
    next: Function,
    prev: Function,
    playIcon: String,
    playing: Boolean,
  },
  setup(props) {
    const touch = reactive({})
    const miniStyle = reactive({
      transform: ``
    })
    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)

    function showNormalPlayer() {
      store.commit('setFullScreen', true)
    }

    function onTouchStart(e) {
      touch.y1 = e.touches[0].pageY
    }
    function onTouchMove(e) {
      touch.y2 = e.touches[0].pageY
      if (touch.y2 - touch.y1 > 0) {
        const delta = Math.min((touch.y2 - touch.y1), 10)
      miniStyle.transform = `translateY(${delta}px)`
      }
    }
    function onTouchEnd() {
      if (props.playing) {
        miniStyle.transform = ''

      } else {
        if (touch.y2 - touch.y1 > 50) {
          miniStyle.transform = 'translateY(100px)'
          setTimeout(() => {
            clearList()
            miniStyle.transform = ''
          }, 600)
        }
      }

      touch.y1 = undefined
      touch.y2 = undefined
    }

    function clearList() {
      store.commit('setPlaylist', [])
    }

    return {
      fullScreen,
      currentSong,
      showNormalPlayer,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      miniStyle
    }
  }
}
</script>

<template>
  <transition name="mini">
    <div class="mini-player" v-show="!fullScreen" @click="showNormalPlayer" @touchstart="onTouchStart"
      @touchmove="onTouchMove" @touchend="onTouchEnd" :style="miniStyle">
      <div class="cd-wrapper">
        <div ref="cdRef" class="cd">
          <img ref="cdImageRef" width="40" height="40" :src="currentSong.pic">
        </div>
      </div>
      <div class="song-wrapper">
        <div class="name">{{ currentSong.name }}</div>
      </div>
      <div class="control-wrapper" @click.stop>
        <div class="btn">
          <i @click="prev" class="icon-media-previous"></i>
        </div>
        <div class="btn">
          <i @click="togglePlay" :class="playIcon"></i>
        </div>
        <div class="btn">
          <i @click="next" class="icon-media-next"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.mini-player {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 50px;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: $bg-image-l;
  box-shadow: 0 0 10px $color-gray-4;
  padding: 0 20px;
  box-sizing: border-box;
  transition: all 0.6s;

  .cd-wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding-right: 10px;

    .cd {
      height: 100%;
      width: 100%;

      img {
        border-radius: 10px;

        &.playing {
          animation: rotate 10s linear infinite;
        }

        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }

  .song-wrapper {
    flex: 1;
    overflow: hidden;

    padding-right: 10px;

    .name {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    
    }
  }

  .control-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0 0 100px;
    justify-self: flex-end;

    .btn {
      i {
        font-size: 24px;
        color: $color-dark-5;
      }
    }
  }

  &.mini-enter-active,
  &.mini-leave-active {
    transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
  }

  &.mini-enter-from,
  &.mini-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0)
  }
}
</style>
