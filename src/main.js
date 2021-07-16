import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

import Message from './modules/Message'


import './styles/index.scss'
Vue.config.productionTip = false
Vue.use(Message)
// Vue.prototype.$message = Message


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
