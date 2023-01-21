import Vue from 'vue';
import Vuex from 'vuex';
import loans from './modules/loans';
import auth from './modules/auth';
import branch from './modules/branch';
import parameter from './modules/parameter';
import manager from './modules/manager';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loans,
    auth,
    branch,
    parameter,
    manager
  }
})
