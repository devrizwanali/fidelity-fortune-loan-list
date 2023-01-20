import axios from '@/axios'

const state = {
  branchCodes: [
        {
            "id": 52,
            "delFlag": "N",
            "version": 0,
            "created": "2021-05-04T11:34:44.878",
            "updated": "2021-05-04T11:34:44.878",
            "createdBy": "Chinyere.ib",
            "updatedBy": "Chinyere.ib",
            "userAction": null,
            "userIp": null,
            "name": "HEAD OFFICE",
            "code": "001",
            "oldCode": "70500"
        },
        {
            "id": 57,
            "delFlag": "N",
            "version": 0,
            "created": "2021-05-04T11:39:54.23",
            "updated": "2021-05-04T11:39:54.23",
            "createdBy": "Chinyere.ib",
            "updatedBy": "Chinyere.ib",
            "userAction": null,
            "userIp": null,
            "name": "ASHAKA",
            "code": "002",
            "oldCode": "71000"
        }]
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
