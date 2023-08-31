import { createStore } from 'vuex'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({ isCollapsed: state.isCollapsed }),
})

const store = new Vuex.Store({
  state: {
    isRouterSetUp: false,
    isCollapsed: false,
  },
  getters: {},
  mutations: {
    changeRouterSetUp(state, value) {
      state.isRouterSetUp = value
    },
    changeCollapsed(state) {
      state.isCollapsed = !state.isCollapsed
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
})

export default store
