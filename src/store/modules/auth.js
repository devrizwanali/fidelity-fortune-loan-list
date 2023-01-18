import axios from '@/axios'

const state = {
  user: null,
  isAuthenticated: false
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  }
}

const actions = {
  login({commit}, user) {
    console.log(user)
  }
}

const getters = {
  user: state => state.user,
  isAuthenticated: state => !!state.user
}

export default {
  state,
  getters,
  actions,
  mutations
};
