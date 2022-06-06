<script setup>
import { defineProps, defineEmits, toRefs } from 'vue'
import MScroll from '@/components/wrap-scroll'
import useFixed from './use-fixed'
import useShortcut from './use-shortcut'

const props = defineProps({
  data: {
    type: Array,
    default() {
      return []
    }
  }
})
const { data } = toRefs(props)

const emits = defineEmits(['select'])

const { groupRef, onScroll, fixedTitle, fixedStyle, currentIndex } = useFixed(props)
const { shortcutList, scrollRef, onShortcutTouchStart, onShortcutTouchMove } = useShortcut(props, groupRef)

function onItemClick(item) {
  emits('select', item)
}

</script>

<template>
  <m-scroll class="index-list" :probe-type="3" @scroll="onScroll" ref="scrollRef">
    <ul ref="groupRef">
      <li v-for="group in data" :key="group.title" class="group">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li v-for="item in group.list" :key="item.id" @click="onItemClick(item)" class="item">
            <img class="avatar" v-lazy="item.pic">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed" v-show="fixedTitle" :style="fixedStyle">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
    <div class="shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove"
      @touchend.stop.prevent>
      <ul>
        <li v-for="(item, index) in shortcutList" :key="item" :data-index="index"
          :class="{ 'current': currentIndex === index }" class="item" :data-i="currentIndex">
          {{ item }}
        </li>
      </ul>
    </div>
  </m-scroll>
</template>

<style lang="scss" scoped>
.index-list {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .group {
    ul {
      padding: 15px 30px;
    }

    .title {
      margin: 0;
      font-size: 20px;
      background-color: $color-gray-4;
      backdrop-filter: blur(2px);
      box-shadow: 0 0 2px $color-transparent-2;
      padding-left: 30px;
      line-height: 44px;
      height: 44px;
    }

    .item {
      padding: 10px 0;
      
      display: flex;
      align-items: center;

      .avatar {
        width: 45px;
        height: 45px;
        border-radius: 10px;
        margin-right: 10px;
        box-shadow: 0 0 5px $color-transparent-2;

      }

      .name {
        font-size: 16px;
        text-shadow: 0 0 5px $color-transparent-2;
      }
    }
  }

  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 44px;
      line-height: 44px;
      padding-left: 30px;
      font-size: 20px;
      font-weight: bold;
      background-color: $color-gray-4;
    }
  }

  .shortcut {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background-image: linear-gradient(to bottom, rgba($color: $color-red-3, $alpha: 0.8), rgba($color: $color-violet-3, $alpha: 0.8));
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      font-size: 13px;
      color: white;
      font-weight: bold;

      &.current {
        color: $color-dark-4;
      }

    }
  }
}
</style>