import axios from '@/axios'

const state = {
  managers: []
}

const mutations = {
  'SET_MANAGERS'(state, managers) {
    state.managers = managers
  }
}

const actions = {
  fetchManagers({commit}) {
    axios.get('/managers').then(res => {
      commit('SET_MANAGERS', res.data.response)
    }).catch(error => console.log(error))
  }
}

const getters = {
  managers: state => state.managers
}

export default {
  state,
  getters,
  actions,
  mutations
};
