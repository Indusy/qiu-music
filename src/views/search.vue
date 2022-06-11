<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import MScroll from '@/components/wrap-scroll'
import storage from 'good-storage'
import { useRouter } from 'vue-router'
import { getHotKeys } from '@/service/search'
import SearchInput from '@/components/search/search-input'
import Suggest from '@/components/search/suggest'
import SearchList from '@/components/base/search-list/search-list'
import useSearchHistory from '@/components/search/use-search-history'
import { SINGER_KEY } from '@/assets/js/constant'


const query = ref('')
const hotKeys = ref([])
const selectedSinger = ref(null)
const scrollRef = ref(null)

const store = useStore()
const searchHistory = computed(() => store.state.searchHistory)

const router = useRouter()

const { saveSearch, deleteSearch, clearSearch } = useSearchHistory()

getHotKeys().then((result) => {
  hotKeys.value = result.hotKeys
})

watch(query, async (newQuery) => {
  if (!newQuery) {
    await nextTick()
    refreshScroll()
  }
})

function refreshScroll() {
  scrollRef.value.scroll.refresh()
}

function addQuery(s) {
  query.value = s
}

function selectSong(song) {
  saveSearch(query.value)
  store.dispatch('addSong', song)
}

function selectSinger(singer) {
  saveSearch(query.value)
  selectedSinger.value = singer
  cacheSinger(singer)

  router.push({
    path: `/search/${singer.mid}`
  })
}

function cacheSinger(singer) {
  storage.session.set(SINGER_KEY, singer)
}
</script>

<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <m-scroll ref="scrollRef" class="search-content" v-show="!query">
      <div>
        <div class="hot-keys">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" v-for="item in hotKeys" :key="item.id" @click="addQuery(item.key)">
              <span>{{ item.key }}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="clearSearch">
              <i class="icon-trash"></i>
            </span>
          </h1>
          <search-list :searches="searchHistory" @select="addQuery" @delete="deleteSearch"></search-list>
        </div>
      </div>
    </m-scroll>
    <div class="search-result" v-show="query">
      <suggest :query="query" @select-song="selectSong" @select-singer="selectSinger"></suggest>
    </div>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.search {
  padding: 0 20px;
  width: 100%;
  height: calc(100% - 95px);
  box-sizing: border-box;

  .search-input-wrapper {
    padding: 20px 0 10px 0;
    background-image: $bg-image;
    z-index: 20;
  }

  .search-content {
    .hot-keys {
      overflow: hidden;

      .title {
        font-size: 16px;
        color: $color-dark-7;

      }

      ul {
        clear: both;

        .item {
          float: left;
          font-size: 13px;
          color: $color-dark-4;
          padding: 5px 10px;
          background-color: #fff;
          margin: 0 20px 10px 0;
          border-radius: 5px;
          box-shadow: 1px 1px 5px $color-gray-3;
        }
      }
    }

    .search-history {
      .title {
        font-size: 16px;
        color: $color-dark-7;
        display: flex;
        justify-content: space-between;
              .clear {
        
      }
      }
    }
  }

  .search-result {
    width: 100%;
    height: calc(100% - 70px);
    box-sizing: border-box;
  }

}
</style>