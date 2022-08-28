import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: []
  },
  mutations: {
    SET_CONTACTS_TO_STORE (state, contacts) {
      state.contacts = contacts
    }
  },
  actions: {
    GET_CONTACTS_FROM_API ({ commit }) {
      return axios.get('https://json-server-host.herokuapp.com/contacts')
        .then((contacts) => {
          commit('SET_CONTACTS_TO_STORE', contacts.data)
        })
    },
    SET_MESSAGE_TO_CHAT ({ commit }, { userID, user }) {
      return axios.put('https://json-server-host.herokuapp.com/contacts/' + userID, user)
        .then((response) => {
          return response
        })
    }
  },
  modules: {
  }
})
