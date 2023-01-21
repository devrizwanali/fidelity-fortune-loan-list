import axios from '@/axios'

const state = {
  managers: [],
  mBusy: true
}

const mutations = {
  'SET_MANAGERS'(state, managers) {
    state.managers = managers
  },

  'SET_BUSY'(state, isBusy) {
    state.mBusy = isBusy
  }
}

const actions = {
  fetchManagers({commit}) {
    commit('SET_BUSY', true)
    axios.get('/manager').then(res => {
      commit('SET_MANAGERS', res.data.response)
      commit('SET_BUSY', false)
    }).catch(error => {
      console.log(error)
      commit('SET_BUSY', false)
    })
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
  },

  addManager({commit, state}, manager) {
    return new Promise((resolve, reject) => {
      axios.post(`/manager`, manager)
        .then(res => {
          let managers = [res.data.response].concat(state.managers)
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
  managers: state => state.managers,
  mBusy: state => state.mBusy
}

export default {
  state,
  getters,
  actions,
  mutations
};
