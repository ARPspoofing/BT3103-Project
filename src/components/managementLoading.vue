<template>
  <div class="mainBody">
    <div class="lds-hourglass"></div>
    <button style="visibility: hidden" ref="clickMe" @click="viewTasks">
      Click me
    </button>
  </div>
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
import { mapState } from "vuex";
import { mapMutations } from "vuex";
const db = getFirestore(firebaseApp);
const curr = this;
const that = this;
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "managementLoading",
  computed: {
    ...mapState([
      "studentTaskId",
      "userEmail",
      "studentProjectId",
      "studentProjectTitle",
      "studentToDo",
      "studentInProgress",
      "studentPendingReview",
      "studentCompleted",
    ]),
  },
  data() {
    return {
      Heading: "MY PROJECTS",
      inProgProjects: [],
      STUDENT_TO_DO_TEMP: [],
      STUDENT_IN_PROGRESS_TEMP: [],
      STUDENT_PENDING_REVIEW_TEMP: [],
      STUDENT_COMPLETED_TEMP: [],
      click: false,
    };
  },
  mounted() {
    var id = this.studentProjectId;
    var title = this.studentProjectTitle;
    setTimeout(() => {
      this.$refs.clickMe.click();
    }, 2500);
  },
  methods: {
    ...mapMutations([
      "SET_STUDENT_TO_DO",
      "SET_STUDENT_IN_PROGRESS",
      "SET_STUDENT_PENDING_REVIEW",
      "SET_STUDENT_COMPLETED",
    ]),
    async viewTasks() {
      let docRef = await doc(db, "Project", this.studentProjectId);
      let project = await getDoc(docRef);
      let tasks = project.data().Tasks;
      var toDoTask = [];
      var inProgressTask = [];
      var pendingReviewTask = [];
      var completedTask = [];
      tasks.forEach((document) => {
        console.log("document", document);
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
          });
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
          });
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
          });
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
          });
        }
      });
      console.log("student todo", toDoTask);
      console.log("student in progress", inProgressTask);
      console.log("student pending", pendingReviewTask);
      console.log("student todo", completedTask);
      this.SET_STUDENT_TO_DO(toDoTask);
      this.SET_STUDENT_IN_PROGRESS(inProgressTask);
      this.SET_STUDENT_PENDING_REVIEW(pendingReviewTask);
      this.SET_STUDENT_COMPLETED(completedTask);
      console.log("vuex todo", this.studentToDo);
      console.log("vuex in prog", this.studentInProgress);
      console.log("vuex pending", this.studentPendingReview);
      console.log("vuex completed", this.studentCompleted);
      this.$router.push({ name: "StudentManagement" });
    },
  },
};
</script>

<style scoped>
.mainBody {
  background-color: #c3eec5;
  width: 100vw;
  height: 200vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #004a23;
  border-color: #004a23 transparent #004a23 transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>