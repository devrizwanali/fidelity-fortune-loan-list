import axios from '@/axios'

const state = {
  loans: [],
  totalElements: 0,
  totalPages: 0,
  isBusy: false,
  customerLoans: []
};

const mutations = {
  'SET_LOANS'(state, payload) {
    const loans = [...state.loans, ...payload.content]
    state.loans = loans
    state.totalElements = payload.totalElements
    state.totalPages = payload.totalPages
  },

  'SET_BUSY'(state, isBusy) {
    state.isBusy = isBusy
  },

  SET_SEARCH_LOANS(state, payload) {
    state.loans = payload.content
    state.totalElements = payload.totalElements
    state.totalPages = payload.totalPages
  },

  SET_CUSTOMERS_LOAN(state, payload) {
    state.customerLoans = payload
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

  fetchCustomerLoans({ commit }, id) {
    commit('SET_CUSTOMERS_LOAN', [])
    return new Promise((resolve, reject) => {
      axios.get(`/loan/list/${id}`)
      .then(res => {
        commit('SET_CUSTOMERS_LOAN', res.data.response)
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
    })
  },

  payLoan({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.post(`/transaction/create`, data)
      .then(res => {
        resolve(res)
      })
      .catch(error => reject(error))
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
  totalPages: state => state.totalPages,
  totalElements: state => state.totalElements,
  isBusy: state => state.isBusy,
  customerLoans: state => state.customerLoans
};

export default {
  state,
  getters,
  actions,
  mutations
};
