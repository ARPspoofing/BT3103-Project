<template>
        <img class="loading" src="https://cutewallpaper.org/21/loading-gif-transparent-background/CBP-Portal.gif">
        <button @click="viewTasks"> Click me
        </button>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore, query, where } from "firebase/firestore";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import {mapState} from "vuex"
import {mapMutations} from "vuex"
const db = getFirestore(firebaseApp);
const curr = this
const that = this
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {

  name: 'managementLoading',
  computed: {
    ...mapState(['studentTaskId','userEmail','studentProjectId','studentProjectTitle','studentToDo','studentInProgress','studentPendingReview','studentCompleted']),
  },
  data() {
    return {
      Heading: "MY PROJECTS",
      inProgProjects: [],
      STUDENT_TO_DO_TEMP:[],
      STUDENT_IN_PROGRESS_TEMP:[],
      STUDENT_PENDING_REVIEW_TEMP:[],
      STUDENT_COMPLETED_TEMP:[],
    };
  },
  mounted() {
    var id = this.studentProjectId
    var title = this.studentProjectTitle
  },
  methods: {
      ...mapMutations(['SET_STUDENT_TO_DO','SET_STUDENT_IN_PROGRESS','SET_STUDENT_PENDING_REVIEW','SET_STUDENT_COMPLETED']),
      async viewTasks() {
        let docRef = await doc(db,"Project",this.studentProjectId)
        let project = await getDoc(docRef)
        let tasks = project.data().Tasks
        var toDoTask = []
        var inProgressTask = []
        var pendingReviewTask = []
        var completedTask = []
        tasks.forEach((document) => {  
            console.log('document',document)   
            if (document.taskStatus == "To do") {
                toDoTask.push({
                id: document.taskName,
              /*
              projectTitle: that.projectTitle,
              projectId: that.projectId,
              */
                comments: document.comments,
                documents: document.documents,
                currStatus: document.taskStatus,
                duedate: document.taskDueDate,
                taskname: document.taskName,                    
                shortdescription: document.taskDescription,
                })
            } else if (document.taskStatus == "In progress") {
                inProgressTask.push({
                id: document.taskName,
              /*
              projectTitle: that.projectTitle,
              projectId: that.projectId,
              */
                comments: document.comments,
                documents: document.documents,
                status: document.taskStatus,
                duedate: document.taskDueDate,
                taskname: document.taskName,                  
                shortdescription: document.taskDescription,   
                })
            } else if (document.taskStatus == "Pending review") {
                pendingReviewTask.push({
                id: document.taskName,
              /*
              projectTitle: that.projectTitle,
              projectId: that.projectId,
              */
                comments: document.comments,
                documents: document.documents,
                status: document.taskStatus,
                duedate: document.taskDueDate,
                taskname: document.taskName,                   
                shortdescription: document.taskDescription,
                })
            } else if (document.taskStatus == "Completed") {
                completedTask.push({
                id: document.id,
                comments: document.comments,
              /*
              projectTitle: that.projectTitle,
              projectId: that.projectId,
              */
                documents: document.documents,
                status: document.taskStatus,
                duedate: document.taskDueDate,
                taskname: document.taskName,
                shortdescription: document.taskDescription,                      
                })
            }
        })
        console.log("student todo",toDoTask)
        console.log("student in progress",inProgressTask)
        console.log("student pending",pendingReviewTask)
        console.log("student todo",completedTask)
        this.SET_STUDENT_TO_DO(toDoTask)
        this.SET_STUDENT_IN_PROGRESS(inProgressTask)
        this.SET_STUDENT_PENDING_REVIEW(pendingReviewTask)
        this.SET_STUDENT_COMPLETED(completedTask)
        console.log("vuex todo",this.studentToDo)
        console.log("vuex in prog",this.studentInProgress)
        console.log("vuex pending",this.studentPendingReview)
        console.log("vuex completed",this.studentCompleted)
        this.$router.push({name:'StudentManagement'})
    }
  }
};        
</script>

<style scoped>
    .loading {
        z-index: 999;
        height: 30%;
        width: 30%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        left:30vw;
        top:40vh;
    }
</style>