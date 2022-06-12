<script>
import vhCheck from 'vh-check'
import Player from './components/player/player'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import { mapState } from 'vuex'

export default {
  components: {
    Player,
    MHeader: Header,
    MFooter: Footer
  },
  computed: {
    viewStyle() {
      const bottom = this.playlist.length ? '60px' : '0'
      return {
        bottom
      }
    },
    ...mapState([
      'playlist'
    ])
  },
  mounted() {
    const offset = vhCheck().offset
    document.documentElement.style.setProperty('--vh-offset', `${offset}px`)
  }
}
</script>

<template>
  <m-header />
  <Suspense>
    <router-view :style="viewStyle" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </Suspense>
  <router-view :style="viewStyle" name="user" v-slot="{ Component }">
    <transition appear name="slide">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <player></player>
  <m-footer />
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
}
</style>