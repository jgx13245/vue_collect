import Vue from 'vue'
import {
  Container,
  Aside, Menu,
  MenuItem,
  Submenu,
  Header,
  Main,
  Tooltip,
  Icon,
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
  MessageBox,
  Message,
} from 'element-ui'
import moment from 'moment'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.prototype.$moment = moment
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Icon)
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
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$message = Message
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
