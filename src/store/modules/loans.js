import axios from 'axios'

const state = {
  loans: [],
  totalLoans: 0
};

const mutations = {
  'SET_LOANS'(state, payload) {
    state.loans = payload
    state.totalLoans = payload.length
  }
};

const actions = {
  async fetchLoans({ commit }) {
    await axios.get("https://5ca88ead-2c7d-4577-a4d4-2b63825870e4.mock.pstmn.io/lms/api/loan/page")
    .then(res => {
      commit('SET_LOANS', res.data.response.content)
    })
    .catch(error => console.log(error))
  }
};

const getters = {
  loans: state => state.loans,
  totalLoans: state => state.totalLoans
};

export default {
  state,
  getters,
  actions,
  mutations
};
