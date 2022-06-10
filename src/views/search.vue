<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex';
import MScroll from '@/components/wrap-scroll'
import SearchInput from '@/components/search/search-input'
import Suggest from '@/components/search/suggest'
const scrollRef = ref(null)
const hotKeys = ref([])
const query = ref('')
const selectedSinger = ref(null)

const store = useStore()

const searchHistory = computed(() => store.state.searchHistory)
</script>

<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <m-scroll class="search-content" ref="scrollRef" v-show="!query">
      <div>
        <div class="hot-keys">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" v-for="item in hotKeys" :key="item.id">
              <span>{{ item.key }}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
      </div>
    </m-scroll>
    <div class="search-result" v-show="query">
      <suggest :query="query"></suggest>
    </div>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>