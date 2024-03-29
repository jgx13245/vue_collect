
import toastcom from './toast.vue'
const toast = {}
toast.install = vue => {
  const ToastCon = vue.extend(toastcom)
  const ins = new ToastCon()
  ins.$mount(document.createElement('div'))
  document.body.appendChild(ins.$el)
  vue.prototype.$toast = (msg, duration = 1000) => {
    ins.message = msg
    ins.visible = true
    setTimeout(() => {
      ins.visible = false
    }, duration)
  }
}
export default toast
