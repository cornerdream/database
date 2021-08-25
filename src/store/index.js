import Vue from 'vue'
import Vuex from 'vuex'


import theme from './modules/theme'
import tumor from './modules/tumor'
import load from './modules/loading'
import getters from './getters'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {

    theme,
    tumor,
    load,
  },
  getters
})
