import axios from '@/axios'

const state = {
  branchCodes: [],
  bBusy: true
}

const mutations = {
  'SET_BRANCH'(state, branchCodes) {
    state.branchCodes = branchCodes
  },

  'SET_BUSY'(state, isBusy) {
    state.bBusy = isBusy
  }
}

const actions = {
  fetchBrachCodes({commit}) {
    commit('SET_BUSY', true)
    axios.get('/branch').then(res => {
      commit('SET_BRANCH', res.data.response)
      commit('SET_BUSY', false)
    }).catch(error => {
      commit('SET_BUSY', false)
      console.log(error)
    })
  },

  updateBranch({commit, state}, branch) {
    return new Promise((resolve, reject) => {
      axios.put(`/branch/${branch.id}`, branch)
        .then(res => {
          const index = state.branchCodes.findIndex(x => x.id == branch.id)
          let branchCodes = [...state.branchCodes]
          let updatedBranch = {...branchCodes[index], ...res.data.response}
          branchCodes[index] = updatedBranch
          commit('SET_BRANCH', branchCodes)
          resolve(res)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },

  addBranch({commit, state}, branch) {
    return new Promise((resolve, reject) => {
      axios.post(`/branch`, branch)
        .then(res => {
          debugger
          let branches = [res.data.response].concat(state.branchCodes)
          commit('SET_BRANCH', branches)
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
  branchCodes: state => state.branchCodes,
  bBusy: state => state.bBusy
}

export default {
  state,
  getters,
  actions,
  mutations
};
