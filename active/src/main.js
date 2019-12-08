import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import { version } from './assets/js/util'

const dsn = 'https://7e20a6bd316744f1aa4dccc10262c0e8@sentry.io/1448413'
Sentry.init({
  dsn,
  release: version,
  integrations: [
    new Integrations.Vue({
      Vue,
      attachProps: true
    })
  ]
})
import App from './App.vue'
import 'normalize.css'
import './assets/css/main.scss'
import router from './router'
import store from './store'
import Toast from './components/Toast/toast'
import { Indicator, MessageBox, DatetimePicker } from 'mint-ui'
import { nativePlugin } from './assets/js/native'
import { Popup } from 'mint-ui';
import { Picker } from 'mint-ui';
import vueEsign from 'vue-esign'
Vue.use(vueEsign)

Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.use(nativePlugin)
Vue.prototype.$toast = Toast
Vue.prototype.$loading = Indicator
Vue.prototype.$confirm = MessageBox
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
