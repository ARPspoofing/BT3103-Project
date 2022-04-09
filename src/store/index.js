import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
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
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],

  state: {
    filterModal: null,
    //searchData for debugging to store all the ids in one array
    searchData: [],
    highestPriorityIds: [],
    secondPriorityIds: [],
    thirdPriorityIds: [],
    counter:0,
    businessCounter:0,
    name: null,
    userEmail: '',
    cardItems: null,
    recent: false,
    oldest: false,
    shortest: false,
    longest: false,
    highest: false,
    lowest: false,
    searchString: "",
    key: null,
    studentInfo: {},
    studentToDo: null,
    studentInProgress:null,
    studentPendingReview:null,
    studentCompleted:null,
    studentProjectId:null,
    studentTaskId:null,
    studentTask:null,
    studentProjectTitle:null,
    businessToDo: null,
    businessInProgress:null,
    businessPendingReview:null,
    businessCompleted:null,
    businessProjectId:null,
    businessTaskId:null,
    businessTask:null,
    businessProjectTitle:null,
    //Addtional things for business only. 
    businessInProgProjects:null,
    businessCompletedProjects:null,
    businessStudents:null,
    businessStudentsInProg:null,
    businessStudentsComp:null, 
    TaskComments:null,
  },
  //getter for debugging
  getters: {
    GET_SEARCH_DATA(state) {
      return state.searchData;
    },
  },
  mutations: {
    SET_COUNTER(state) {
      state.counter = 1
    },
    SET_BUSINESS_COUNTER(state) {
      state.businessCounter = 1
    },
    TOGGLE_FILTER(state) {
      state.filterModal = !state.filterModal;
    },
    CLEAR_ALL(state) {
      (state.searchData = []),
        (state.highestPriorityIds = []),
        (state.secondPriorityIds = []),
        (state.thirdPriorityIds = []);
    },
    CLEAR_HIGHEST(state) {
      state.highestPriorityIds = [];
    },
    CLEAR_TOP_THREE(state) {
      state.highestPriorityIds = [];
      state.secondPriorityIds = [];
      state.thirdPriorityIds = [];
    },
    CLEAR_FILTER(state) {
      (state.recent = false),
        (state.oldest = false),
        (state.shortest = false),
        (state.longest = false),
        (state.highest = false),
        (state.lowest = false);
    },
    SET_KEY(state, payload) {
      state.key = payload;
    },
    SET_FILTER(state, payload) {
      if (payload == "recent") {
        state.recent = true;
      } else if (payload == "oldest") {
        state.oldest = true;
      } else if (payload == "shortest") {
        state.shortest = true;
      } else if (payload == "longest") {
        state.longest = true;
      } else if (payload == "highest") {
        state.highest = true;
      } else if (payload == "lowest") {
        state.lowest = true;
      }
    },
    SET_SEARCH_DATA(state, payload) {
      state.searchData.push(...payload);
      state.searchData = state.searchData.filter(
        (x, i, a) => a.indexOf(x) === i
      );
      console.log("searchData", state.searchData);
    },
    SET_SEARCH_STRING(state, payload) {
      state.searchString = payload;
    },
    SET_HIGHEST_PRIORITYIDS(state, payload) {
      state.highestPriorityIds.push(...payload);
      state.highestPriorityIds = state.highestPriorityIds.filter(
        (x, i, a) => a.indexOf(x) === i
      );
    },
    SET_SECOND_PRIORITYIDS(state, payload) {
      state.secondPriorityIds.push(...payload);
      state.secondPriorityIds = state.secondPriorityIds.filter(
        (x, i, a) => a.indexOf(x) === i
      );
    },
    SET_THIRD_PRIORITYIDS(state, payload) {
      state.thirdPriorityIds.push(...payload);
      state.thirdPriorityIds = state.thirdPriorityIds.filter(
        (x, i, a) => a.indexOf(x) === i
      );
    },
    GET_SEARCH_DATA(state) {
      return state.searchData;
    },
    SET_NAME(state, payload) {
      state.name = payload;
    },
    SET_USEREMAIL(state, payload) {
      state.userEmail = payload;
    },
    SET_CARDITEMS(state, payload) {
      state.cardItems = payload;
    },
    CLEAR_CARDITEMS(state) {
      state.cardItems = null;
    },
    SET_STUDENT_INFO(state,payload) {
      state.studentInfo = payload
    },
    SET_NEW_CARD(state,payload) {
      state.cardItems = JSON.stringify(payload[state.key])
    },
    SET_STUDENT_PROJECT_ID(state,payload) {
      state.studentProjectId = payload
    },
    SET_STUDENT_TASK_ID(state,payload) {
      state.studentTaskId = payload
    },
    SET_STUDENT_TASK(state,payload) {
      state.studentTask = payload
    },
    SET_STUDENT_PROJECT_TITLE(state,payload) {
      state.studentProjectTitle = payload
    },
    SET_STUDENT_TO_DO(state,payload) {
      state.studentToDo = payload
    },
    SET_STUDENT_IN_PROGRESS(state,payload) {
      state.studentInProgress = payload
    },
    SET_STUDENT_PENDING_REVIEW(state,payload) {
      state.studentPendingReview = payload
    },
    SET_STUDENT_COMPLETED(state,payload) {
      state.studentCompleted = payload
    },
    SET_BUSINESS_PROJECT_ID(state,payload) {
      state.businessProjectId = payload
    },
    SET_BUSINESS_PROJECT_TITLE(state,payload) {
      state.businessProjectTitle = payload
    },
    SET_BUSINESS_TASK_ID(state,payload) {
      state.businessTaskId = payload
    },
    SET_BUSINESS_TASK(state,payload) {
      state.businessTask = payload
    },
    SET_BUSINESS_TO_DO(state,payload) {
      state.businessToDo = payload
    },
    SET_BUSINESS_IN_PROGRESS(state,payload) {
      state.businessInProgress = payload
    },
    SET_BUSINESS_PENDING_REVIEW(state,payload) {
      state.businessPendingReview = payload
    },
    SET_BUSINESS_COMPLETED(state,payload) {
      state.businessCompleted = payload
    },
    SET_BUSINESS_IN_PROG_PROJECTS(state,payload) {
      state.businessInProgProjects = payload
    },
    SET_BUSINESS_COMPLETED_PROJECTS(state,payload) {
      state.businessCompletedProjects = payload
    },
    SET_BUSINESS_STUDENTS(state,payload) {
      state.businessStudents = payload
    },
    SET_BUSINESS_STUDENTS_IN_PROG(state,payload) {
      state.businessStudentsInProg = payload
    },
    SET_BUSINESS_STUDENTS_COMP(state,payload) {
      state.businessStudentsComp = payload
    },
    SET_TASK_COMMENTS(state,payload) {
      state.TaskComments = payload
    },

    
  },
  actions: {
    async GET_NEW_CARD({ commit, state }) {
      var businessEmail = state.userEmail;
      var testCollectionItems = [];
      //order projects by posted date, from latest to oldest
      let projects = query(
        collection(db, "Project"),
        orderBy("Posted_Date", "desc")
      );
      let snapshot = await getDocs(projects);
      const testCollection = [];
      const docSnap = await getDoc(doc(db, "businesses", businessEmail));
      let data1 = docSnap.data();
      var pictureprof = data1.finalProfile;
      if (typeof pictureprof === "undefined") {
        pictureprof =
          "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png";
      }
      snapshot.forEach((docs) => {
        let data = docs.data();
        var id = docs.id;
        testCollectionItems.push({
          projectId: id,
          projectTitle: data.Project_Title,
          description: data.Description,
          vacancies: data.Num_Of_Vacancies,
          allowance: data.Allowance,
          position: data.Position,
          projectStart: data.Project_Start,
          projectEnd: data.Project_End,
          tasks: data.Tasks,
          tags: data.Tags,
          newApplicants: data.New_Applicants,
          accApplicants: data.Acc_Applicants,
          rejApplicants: data.Rej_Applicants,
          posterId: data.poster_id,
          profilePicture: pictureprof,
        });
      });
      commit("SET_NEW_CARD", testCollectionItems);
    },
  },
  modules: {},
});
