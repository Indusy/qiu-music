<script setup>
import { ref, defineProps, toRefs } from 'vue'
import useSlider from './use-slider'

const rootRef = ref(null)
const { currentPageIndex } = useSlider(rootRef)

const props = defineProps({
  sliders: {
    type: Array,
    default() {
      return []
    }
  }
})

const { sliders } = toRefs(props)

</script>

<template>
  <div class="slider" ref="rootRef">
    <div class="slider-group">
      <div class="slider-page" v-for="item in sliders" :key="item.id">
        <a :href="item.link">
          <img :src="item.pic" />
        </a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span class="dot" v-for="(item, index) in sliders" :key="item.id"
        :class="{ 'active': currentPageIndex === index }"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slider {
  overflow: hidden;
  border-radius: 10px;
  font-size: 0;
  box-shadow: 0px 0px 10px $color-transparent-2;
  touch-action: pan-y;
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.slider-group {
  width: 100%;
  overflow: hidden;

  .slider-page {
    display: inline-block;

    a {
      display: inline-block;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
    }
  }
}

.dots-wrapper {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 5px;

  bottom: 12px;
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50px;
    background-color: $-color-transparent-5;

    &.active {
      width: 16px;
    }
  }
}
</style>