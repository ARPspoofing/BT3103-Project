import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState({
      storage: window.sessionStorage,
  })],
  state: {
    filterModal: null,
    //searchData for debugging to store all the ids in one array 
    searchData: [],
    highestPriorityIds: [],
    secondPriorityIds: [],
    thirdPriorityIds: [],
  },
  //getter for debugging
  getters: {
    GET_SEARCH_DATA(state) {
      return state.searchData
    },
  },
  mutations: {
    TOGGLE_FILTER(state) {
      state.filterModal = !state.filterModal
    },
    CLEAR_ALL(state) {
      state.searchData = [],
      state.highestPriorityIds = [],
      state.secondPriorityIds = [],
      state.thirdPriorityIds = []
    },
    SET_SEARCH_DATA(state,payload) {
      state.searchData.push(...payload)
      state.searchData = state.searchData.filter((x, i, a) => a.indexOf(x) === i)
      console.log("searchData",state.searchData)
    },
    SET_HIGHEST_PRIORITYIDS(state,payload) {
      state.highestPriorityIds.push(...payload)
      state.highestPriorityIds = state.highestPriorityIds.filter((x, i, a) => a.indexOf(x) === i)

    },
    SET_SECOND_PRIORITYIDS(state,payload) {
      state.secondPriorityIds.push(...payload)
      state.secondPriorityIds = state.secondPriorityIds.filter((x, i, a) => a.indexOf(x) === i)
    
    },
    SET_THIRD_PRIORITYIDS(state,payload) {
      state.thirdPriorityIds.push(...payload)
      state.thirdPriorityIds = state.thirdPriorityIds.filter((x, i, a) => a.indexOf(x) === i)
      
    },
    GET_SEARCH_DATA(state) {
      return state.searchData
    }
  },
  actions: {
  },
  modules: {
  }
})
