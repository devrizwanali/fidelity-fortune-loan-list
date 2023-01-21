import axios from '@/axios'

const state = {
  branchCodes: []
}

const mutations = {
  'SET_BRANCH'(state, branchCodes) {
    state.branchCodes = branchCodes
  }
}

const actions = {
  fetchBrachCodes({commit}) {
    axios.get('/branch').then(res => {
      commit('SET_BRANCH', res.data.response)
    }).catch(error => console.log(error))
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
  }
}

const getters = {
  branchCodes: state => state.branchCodes
}

export default {
  state,
  getters,
  actions,
  mutations
};
