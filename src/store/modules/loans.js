import axios from '@/axios'

const state = {
  loans: [],
  totalLoans: 0,
  totalElements: 0,
  totalPages: 1,
  isBusy: true,
};

const mutations = {
  'SET_LOANS'(state, payload) {
    state.loans = payload.content
    // state.totalLoans = payload.length
    // state.totalElements = payload.totalElements
    // state.totalPages = payload.totalPages
  },

  'SET_BUSY'(state, isBusy) {
    state.isBusy = isBusy
  }
};

const actions = {
  async fetchLoans({ commit, state }) {
    commit('SET_BUSY', true)
    let size = 10
    let page = 0

    for(let i = 0; i < 5; i++) {
          console.log('========', i)

        await axios.get(`http://35.176.190.21:8080/lms/api/loan/page?size=${size}&page=${page}`)
        .then(res => {
          let newAr = [...state.loans, res.data.response]
          commit('SET_LOANS', newAr)
          commit('SET_BUSY', false)
          page += 1;
        })
        .catch(error => {
          commit('SET_BUSY', false)
          console.log(error)
        })
    }
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
