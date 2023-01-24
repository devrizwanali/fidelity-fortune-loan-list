import axios from '@/axios'

const state = {
  loans: [],
  totalLoans: 0,
  totalElements: 0,
  totalPages: 0,
  isBusy: true,
};

const mutations = {
  'SET_LOANS'(state, payload) {
    const loans = [...state.loans, ...payload.content]
    state.loans = loans
    state.totalLoans = payload.length
    state.totalElements = payload.totalElements
    state.totalPages = payload.totalPages
  },

  'SET_BUSY'(state, isBusy) {
    state.isBusy = isBusy
  },

  SET_SEARCH_LOANS(state, payload) {
    state.loans = payload.content
    state.totalElements = payload.totalElements
    state.totalLoans = payload.content.length
    state.totalPages = payload.totalPages
  }
};

const actions = {
  async fetchLoans({ commit }, params) {
    commit('SET_BUSY', true)
    await axios.get(`/loan/page?size=${params.size}&page=${params.page}`)
    .then(res => {
      commit('SET_LOANS', res.data.response)
      commit('SET_BUSY', false)
    })
    .catch(error => {
      commit('SET_BUSY', false)
      console.log(error)
    })
  },

  search({commit, state}, params) {
    commit('SET_BUSY', true)
    return new Promise((resolve, reject) => {
      axios.get(`/loan/page?size=${params.size}&page=${params.page}&search=${params.query}`)
        .then(res => {
          commit('SET_SEARCH_LOANS', res.data.response)
          commit('SET_BUSY', false)
        })
        .catch(error => {
          commit('SET_BUSY', false)
          console.log(error)
        })
    })
  }
};

const getters = {
  loans: state => state.loans,
  totalLoans: state => state.totalLoans,
  totalPages: state => state.totalPages,
  totalElements: state => state.totalElements,
  isBusy: state => state.isBusy
};

export default {
  state,
  getters,
  actions,
  mutations
};
