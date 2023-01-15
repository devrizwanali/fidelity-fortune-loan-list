import Vue from 'vue';
import Vuex from 'vuex';
import loans from './modules/loans';
import auth from './modules/auth';


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loans,
    auth
  }
})
