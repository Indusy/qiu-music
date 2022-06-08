<script setup>
import MScroll from '@/components/wrap-scroll'
import { getTopList } from '@/service/top-list'
import { TOP_KEY } from '@/assets/js/constant'
import storage from 'good-storage'
import { ref, defineExpose } from 'vue'
import { useRouter } from 'vue-router'

const topList = ref([])
const loading = ref(true)
const selectedTop = ref(null)
const router = useRouter()

const result = await getTopList()
topList.value = result.topList
loading.value = false


function selectItem(top) {
  selectedTop.value = top
  cacheTop(top)
  router.push({
    path: `/top-list/${top.id}`
  })
}

function cacheTop(top) {
  storage.session.set(TOP_KEY, top)
}

defineExpose({
  cacheTop
})

</script>

<template>
  <div class="top-list" v-loading="loading">
    <m-scroll class="top-list-content">
      <ul>
        <li class="item" v-for="item in topList" :key="item.id" @click="selectItem(item)">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.pic" />
          </div>
          <ul class="song-list">
            <li class="song" v-for="(song, index) in item.songList" :key="song.id">
              <span>{{ index + 1 }}. </span>
              <span>{{ song.songName }}-{{ song.singerName }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </m-scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedTop" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.top-list {
  width: 100%;
  height: calc(100% - 95px);
  position: fixed;
  top: 45px;

  .top-list-content {
    height: 100%;
    overflow: hidden;

    ul {
      width: 100%;
      float: left;
      box-sizing: border-box;
    }

    .item {
      display: flex;
      height: 100px;
      border-radius: 10px;
      overflow: hidden;
      margin: 20px;
      box-shadow: 0 0 5px $color-transparent-1;

      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
        font-size: 0;
      }

      .song-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: $bg-image;
        color: $color-dark-8;
        font-size: 14px;
        text-shadow: 0 0 5px $color-transparent-2;


        .song {
          @include no-wrap();
          line-height: 26px;
        }
      }
    }
  }
}
</style>
