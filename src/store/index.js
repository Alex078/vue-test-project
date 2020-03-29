import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
  },
  mutations: {
    SET_DATA (state, { type, data }) {
      state[type] = data;
    },
  },
  actions: {
    setLoading ({ commit }, loading) {
      commit('SET_DATA', {
        data: loading,
        type: 'loading'
      });
    },
  }
})
