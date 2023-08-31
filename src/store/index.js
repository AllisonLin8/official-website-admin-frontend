import { createStore } from 'vuex'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    isCollapsed: state.isCollapsed,
    userInfo: state.userInfo,
  }),
})

const store = new Vuex.Store({
  state: {
    isRouterSetUp: false,
    isCollapsed: false,
    userInfo: {},
  },
  getters: {},
  mutations: {
    changeRouterSetUp(state, value) {
      state.isRouterSetUp = value
    },
    changeCollapsed(state) {
      state.isCollapsed = !state.isCollapsed
    },
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value,
      }
    },
    clearUserInfo(state) {
      state.userInfo = {}
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
})

export default store
