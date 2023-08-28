import { createStore } from 'vuex'

export default createStore({
  state: {
    isRouterSetUp:false,
  },
  getters: {
  },
  mutations: {
    changeRouterSetUp(state,value) {
      state.isRouterSetUp = value
    },
  },
  actions: {
  },
  modules: {
  }
})
