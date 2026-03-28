let intervalId

const mouseover = event => {
  event.target.style.color = 'black'
}

const mouseout = event => {
  event.target.style.color = 'white'
}

export default {
  mounted(el, binding) {
    el.style.color = binding.value

    if (binding.modifiers.blink) {
      let flag = true
      intervalId = setInterval(() => {
        el.style.color = flag ? 'white' : binding.value
        flag = !flag
      }, 1000)
    }

    if (binding.modifiers.hover) {
      el.addEventListener('mouseover', mouseover)
      el.addEventListener('mouseout', mouseout)
    }
  },

  updated(el, binding) {
    el.style.color = binding.value
  },

  unmounted(el, binding) {
    clearInterval(intervalId)

    el.removeEventListener('mouseover', mouseover)
    el.removeEventListener('mouseout', mouseout)
  }
}
