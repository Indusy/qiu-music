import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import {
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated,
  ref,
  computed,
  watch,
  reactive,
} from 'vue'
import { useStore } from 'vuex'

BScroll.use(ObserveDOM)

export default function useScroll(wrapperRef, options, emit) {
  const scroll = ref(null)
  const store = useStore()
  const miniHeight = 60
  const wrapperStyle = reactive({
    height: '',
  })

  const playlist = computed(() => store.state.playlist)

  const watchStyle = () => {
    if (playlist.value.length) {
      wrapperStyle.height = 
      `${parseFloat(getComputedStyle(wrapperRef.value).height) - miniHeight}px`
    } else {
      wrapperStyle.height = ''
    }
    scroll.value.refresh()
  }
  watch(playlist, watchStyle)

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
    watchStyle()
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  onActivated(() => {
    scroll.value.enable()
    watchStyle()
  })

  onDeactivated(() => {
    scroll.value.disable()
  })

  return { scroll, wrapperStyle }
}
