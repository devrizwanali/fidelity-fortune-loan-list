import axios from '@/axios'

const state = {
  loans: [],
  totalElements: 0,
  totalPages: 0,
  isBusy: false,
  customerLoans: [],
  liquidTypes: [
    {value:'FULL', text: 'Full'},
    {value: 'PARTIAL', text: 'Partial'}
  ],
  loanModels: [
    {value: 'STANDARD', text: 'Standard'},
    {value: 'FLEXI', text: 'Flexi'}
  ],
  calculatedLiquiLoan: null
};

const mutations = {
  SET_LOANS(state, payload) {
    const loans = [...state.loans, ...payload.content]
    state.loans = loans
    state.totalElements = payload.totalElements
    state.totalPages = payload.totalPages
  },

  SET_BUSY(state, isBusy) {
    state.isBusy = isBusy
  },

  SET_SEARCH_LOANS(state, payload) {
    state.loans = payload.content
    state.totalElements = payload.totalElements
    state.totalPages = payload.totalPages
  },

  SET_CUSTOMERS_LOAN(state, payload) {
    state.customerLoans = payload
  },

  SET_CALCULATED_LIQUI_LOAN(state, loan) {
    state.calculatedLiquiLoan = loan
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

  computeLoan({ commit }, data) {
    return new Promise((resolve, reject) => {
      const id = data['loanId']
      delete data['loanId']
      axios.post(`/loan/liquidate/${id}/compute`, data)
      .then(res => {
        commit('SET_CALCULATED_LIQUI_LOAN', res.data.response)
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
  customerLoans: state => state.customerLoans,
  liquidTypes: state => state.liquidTypes,
  loanModels: state => state.loanModels,
  calculatedLiquiLoan: state => state.calculatedLiquiLoan
};

export default {
  state,
  getters,
  actions,
  mutations
};
