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

  deleteApplication({commit, state}, id) {
    return new Promise((resolve, reject) => {
      axios.delete(`/parameter/delete/${id}`).then(res => {
        const parameters = state.parameters.filter(x => x.id == id)
        commit('SET_PARAMETERS', parameters)
        resolve(res)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  updateApplication({commit, state}, parameter) {
    return new Promise((resolve, reject) => {
      axios.put(`/parameter/${parameter.id}`, parameter)
        .then(res => {
          const index = state.parameters.findIndex(x => x.id == parameter.id)
          let parameters = [...state.parameters]
          parameters[index] = res.data.response
          commit('SET_PARAMETERS', parameters)
          resolve(res)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
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
