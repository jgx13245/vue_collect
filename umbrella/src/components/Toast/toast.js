import Vue from 'vue'
import toastVue from './toast.vue'

const ToastConstructor = Vue.extend(toastVue)

let instance = null

const getInstance = () => {
  if (instance) {
    return instance
  }
  return instance = new ToastConstructor({
    el: document.createElement('div')
  })
}

const removeElement = (e) => {
  const p = e.target.parentNode
  if (p) {
    p.removeChild(e.target)
  }
}

const clearTimer = (instance) => {
  if (instance.timer) {
    clearTimeout(instance.timer)
    instance.timer = null
  }
}

ToastConstructor.prototype.close = function () {
  this.visible = false
  this.$el.addEventListener('transitionend', removeElement, false)
}

const Toast = (options) => {
  const instance = getInstance()
  if (instance.visible) {
    return instance
  }
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  const duration = options.duration || 2000
  instance.message = options.message
  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.visible = true
    instance.$el.removeEventListener('transitionend', removeElement)

    instance.timer = setTimeout(() => {
      instance.close()
      clearTimer(instance)
    }, duration)

  })

  return instance
}

export default Toast