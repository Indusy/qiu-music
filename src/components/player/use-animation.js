import animations from 'create-keyframe-animation'

export default function useAnimation() {
  let entering = false
  let leaving = false

  function enter() {
    if (leaving) {
      afterLeave()
    }
    entering = true
    const { x, y, scale } = getPosAndScale()

    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      },
      100: {
        transform: 'translate3d(0, 0, 0) scale(1)'
      }
    }

    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 600,
        easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
      }
    })
  }

  function afterEnter() {
    entering = false
    animations.unregisterAnimation('move')
  }

  function leave() {
    if (entering) {
      afterEnter()
    }
    leaving = true
  }

  function afterLeave() {
    leaving = false
  }

  function getPosAndScale() {
    const targetWidth = 40
    const paddingLeft = 40
    const paddingBottom = 30
    const paddingTop = 80
    const width = window.innerWidth * 0.8
    const x = -(window.innerWidth / 2 - paddingLeft)
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    const scale = targetWidth / width

    return {
      x,
      y,
      scale
    }
  }

  return {
    enter,
    afterEnter,
    leave,
    afterLeave
  }
}
