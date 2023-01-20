import axios from '@/axios'

const state = {
  user: null,
  isAuthenticated: false
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  }
}

const actions = {
  login({ commit }, user) {
    return new Promise( (resolve, reject) => {
      axios.post('/auth/login', user).then(res => {
      const token = res.data.response.accessToken
      localStorage.setItem('token', token)
      commit('SET_USER', res.data.response)
      resolve(res)
    }).catch(error => {
      console.log(error)
      reject(error)
    })
    })
  },

  logOut({ commit }) {
    return new Promise((resolve, reject)=> {
      localStorage.removeItem('token')
      commit('SET_USER', null)
      resolve()
    })
  }
}

const getters = {
  user: state => state.user,
  isAuthenticated: state => !!state.user || localStorage.getItem('token')
}

export default {
  state,
  getters,
  actions,
  mutations
};
