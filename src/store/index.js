import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import  VuexPersistence from 'vuex-persistedstate'
import {getFirestore} from "firebase/firestore"
import firebaseApp from "../firebase.js"

import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

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
    name: '',
    userEmail: '',
    cardItems: null,
    recent: false,
    oldest: false,
    shortest: false,
    longest: false,
    highest: false,
    lowest: false,
    searchString: "",
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
    CLEAR_HIGHEST(state) {
      state.highestPriorityIds = []
    },
    CLEAR_TOP_THREE(state) {
      state.highestPriorityIds = []
      state.secondPriorityIds = []
      state.thirdPriorityIds = []
    },
    CLEAR_FILTER(state) {
      state.recent = false,
      state.oldest = false,
      state.shortest = false,
      state.longest = false,
      state.highest = false,
      state.lowest = false
    },
    SET_FILTER(state,payload) {
      if (payload == "recent") {
        state.recent = true
      } else if (payload == "oldest") {
        state.oldest = true
      } else if (payload == "shortest") {
        state.shortest = true
      } else if (payload == "longest") {
        state.longest = true
      } else if (payload == "highest") {
        state.highest = true
      } else if (payload == "lowest") {
        state.lowest = true
      }
    },
    SET_SEARCH_DATA(state,payload) {
      state.searchData.push(...payload)
      state.searchData = state.searchData.filter((x, i, a) => a.indexOf(x) === i)
      console.log("searchData",state.searchData)
    },
    SET_SEARCH_STRING(state,payload) {
      state.searchString = payload
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
    },
    SET_NAME(state,payload) {
      state.name = payload
    },
    SET_USEREMAIL(state,payload) {
      state.userEmail = payload
    },
    SET_CARDITEMS(state,payload) {
      state.cardItems = payload
    },
    CLEAR_CARDITEMS(state) {
      state.cardItems = null
    },
  },
  modules: {
  }
})
