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
      return axios.get('http://localhost:3000/contacts')
        .then((contacts) => {
          commit('SET_CONTACTS_TO_STORE', contacts.data)
        })
    },
    SET_MESSAGE_TO_CHAT ({ commit }, { userID, user }) {
      return axios.put('http://localhost:3000/contacts/' + userID, user)
        .then((response) => {
          return response
        })
    }
  },
  modules: {
  }
})
