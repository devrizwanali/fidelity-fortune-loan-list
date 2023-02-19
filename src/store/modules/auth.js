import axios from '@/axios'

const state = {
  user: null,
  isAuthenticated: false,
  token: null
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_TOKEN(state, toekn) {
    state.token = toekn
  }
}

const actions = {
  login({ commit }, user) {
    return new Promise( (resolve, reject) => {
      axios.post('/auth/login', user).then(res => {
      const token = res.data.response.accessToken
      localStorage.setItem('token', token)
      commit('SET_TOKEN', res.data.response)
      resolve(res)
    }).catch(error => {
      console.log(error)
      reject(error)
    })
    })
  },

  fetchUser({ commit }) {
    axios.get('/user').then(res => {
      let user = res.data.response
      commit('SET_USER', user)
      localStorage.setItem('user', JSON.stringify(user))
    }).catch(err => {
      console.log(err)
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
  user: state => state.user || JSON.parse(localStorage.getItem('user')),
  isAuthenticated: state => !!state.user || localStorage.getItem('token')
}

export default {
  state,
  getters,
  actions,
  mutations
};
