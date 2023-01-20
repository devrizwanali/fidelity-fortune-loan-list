import axios from '@/axios'

const state = {
  isBusy: true,
  parameters: []
}

const mutations = {
  'SET_PARAMETERS'(state, parameters) {
    state.parameters = parameters
  },

  'SET_BUSY'(state, isBusy) {
    state.isBusy = isBusy
  }
}

const actions = {
  fetchParameters({commit}) {
    commit('SET_BUSY', true)
    axios.get('/parameter').then(res => {
      commit('SET_PARAMETERS', res.data.response)
      commit('SET_BUSY', false)
    }).catch(error => {
      commit('SET_BUSY', false)
      console.log(error)
    })
  },

  deleteApplication({commit}, id) {
  }
}

const getters = {
  parameters:  state => state.parameters,
  busy: state => state.isBusy
}

export default {
  state,
  getters,
  actions,
  mutations
};
