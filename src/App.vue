<script setup>
import vhCheck from 'vh-check'
import { onMounted } from 'vue'
import MHeader from '@/components/header/header'
import MFooter from '@/components/footer/footer'

  onMounted(() => {
    const offset = vhCheck().offset
    document.documentElement.style.setProperty('--vh-offset', `${offset}px`)
  })
</script>

<template>
  <m-header />
  <Suspense>
    <router-view/>
  </Suspense>
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