import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

import Message from './modules/Message'
import Alert from './modules/Alert/alert'
import Loading from './modules/Loading/loading'

import './styles/index.scss'
Vue.config.productionTip = false

Vue.use(Message)
Vue.component(Alert)
Vue.component(Loading)
// Vue.prototype.$message = Message
Vue.prototype.$EventBus = new Vue()

// Vue.prototype.baseUrl = process.env.NODE_ENV !== 'development'?'':'http://192.168.1.218:8001';

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
