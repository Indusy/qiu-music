<script setup>
import Slider from '@/components/slider/slider'
import MScroll from '@/components/wrap-scroll'
import { computed, ref } from 'vue'
import { getRecommend } from '@/service/recommend'
import { useRouter } from 'vue-router'

// data
const sliders = ref([])
const albums = ref([])
const selectedAlbum = ref(null)

// computed
const loading = computed(() => {
  return sliders.value.length && !albums.value.length
})

const router = useRouter()

function selectItem(album) {
  selectedAlbum.value = album
  router.push({
    path: `/recommend/${album.id}`
  })
}

const result = await getRecommend()
sliders.value = result.sliders
albums.value = result.albums

</script>

<template>
  <div class="recommend">
    <m-scroll class="recommend-content">
      <div class="slider-wrapper">
        <div class="slider-content">
          <slider v-if="sliders.length" :sliders="sliders"></slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title" v-show="!loading">Popular</h1>
          <ul>
            <li class="item" v-for="item in albums" :key="item.id" @click="selectItem(item)">
              <div class="icon">
                <img v-lazy="item.pic" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.username }}
                </h2>
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </m-scroll>
  </div>
</template>

<style lang="scss" scoped>
.recommend {
  height: calc(100% - 95px);

  .recommend-content {
    height: 100%;

    .slider-wrapper {
      width: 100%;
      padding: 12px;
      box-sizing: border-box;

      .slider-content {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.recommend-list {
  .list-title {
    font-size: 16px;
  }

  ul {
    list-style: none;
    padding: 0 12px;

    .item {
      display: flex;
      margin: 30px 0;
      .icon {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        overflow: hidden;
        margin-right: 10px;
        box-shadow: 0 0 2px $color-transparent-4;
      }

      .text {
        flex: 1;
        text-shadow: 0 0 5px $color-transparent-2;
        .name {
          margin: 6px 0;
          font-size: 16px;
          color: $color-dark-9;
        }
        .title {
          margin: 0;
          font-size: 14px;
          color: $color-dark-8;
        }
      }
    }
  }
}

.placeholder {
  height: 200vh;
}
</style>