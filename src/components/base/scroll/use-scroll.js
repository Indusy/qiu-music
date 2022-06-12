import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import {
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated,
  ref,
  reactive,
  computed,
  watch,
} from 'vue'
import { useStore } from 'vuex'

BScroll.use(ObserveDOM)

export default function useScroll(wrapperRef, options, emit) {
  const scroll = ref(null)
  const store = useStore()
  const scrollStyle = reactive({})

  const playlist = computed(() => store.state.playlist)

  function updateHeight() {
    if (playlist.value.length) {
      scrollStyle.height = `${
        parseInt(getComputedStyle(wrapperRef.value).height) - 60
      }px`
    } else {
      scrollStyle.height = ''
    }
  }

  watch(playlist, updateHeight)

  watch(scrollStyle, () => {
    wrapperRef.value.style.height = scrollStyle.height
    scroll.value.refresh()
  })

  onMounted(() => {
    const scrollVal = (scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      ...options,
    }))

    if (options.probeType > 0) {
      scrollVal.on('scroll', (pos) => {
        emit('scroll', pos)
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  onActivated(() => {
    scroll.value.enable()
    updateHeight()
    scroll.value.refresh()
  })

  onDeactivated(() => {
    scroll.value.disable()
  })

  return scroll
}
