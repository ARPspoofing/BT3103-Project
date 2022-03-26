import { createStore } from 'vuex'

export default createStore({
  state: {
    filterModal: null,
  },
  mutations: {
    TOGGLE_FILTER(state) {
      state.filterModal = !state.filterModal
    }
  },
  actions: {
  },
  modules: {
  }
})
