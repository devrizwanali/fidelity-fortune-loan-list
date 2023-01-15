import axios from '@/axios'

const state = {
  user: null
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
  user: state => state.user
}

export default {
  state,
  getters,
  actions,
  mutations
};
