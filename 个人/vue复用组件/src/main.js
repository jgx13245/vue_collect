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
import { Popup } from 'mint-ui';
import { Picker } from 'mint-ui';
import {
  Container,
  Aside, Menu,
  MenuItem,
  Submenu,
  Header,
  Main,
  Tooltip,
  Row,
  Col,
  Button,
  ButtonGroup,
  DatePicker,
  Select,
  Option,
  OptionGroup,
  Table,
  TableColumn,
  Pagination,
  Popover,
  CheckboxGroup,
  Checkbox,
  Alert,
  Input,
  InputNumber,
} from 'element-ui'

Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Header)
Vue.use(Main)
Vue.use(Submenu)
Vue.use(Tooltip)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(ButtonGroup)
Vue.use(Pagination)
Vue.use(Popover)
Vue.use(Alert)
Vue.use(Input)
Vue.use(InputNumber)
Vue.config.productionTip = false

Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.use(Toast)
// Vue.prototype.$toast = Toast
Vue.prototype.$loading = Indicator
Vue.prototype.$confirm = MessageBox
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
