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
    axios.get('/manager').then(res => {
      commit('SET_MANAGERS', res.data.response)
    }).catch(error => console.log(error))
  },

  updateManager({commit, state}, manager) {
    return new Promise((resolve, reject) => {
      axios.put(`/manager/${manager.id}`, manager)
        .then(res => {
          const index = state.managers.findIndex(x => x.id == manager.id)
          let managers = [...state.managers]
          managers[index] = res.data.response
          commit('SET_MANAGERS', managers)
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
  managers: state => state.managers
}

export default {
  state,
  getters,
  actions,
  mutations
};
