<template>
  <StudentNavBar :header="true" :Heading="Heading" />
  <div class="mainBody">
    <h1 id="status">
      <span class="options">
        <b>IN PROGRESS</b>
      </span>
      <span>
        <router-link
          class="optionsOff"
          :to="{ name: 'StudentCompletedProjects' }"
          ><b>COMPLETED</b></router-link
        >
      </span>
    </h1>
    <hr />
    <h1></h1>
    <div class="projectContainer">
      <div :key="key" v-for="(item,key) in inProgProjects">
        <Card
          :apply="false"
          :projectTitle="item.projectTitle"
          :projectId="item.id"
          :description="item.description"
          :picture="item.profilePicture"
          :inProgress="true"
          @viewTasks="viewTasks(item.id, item.projectTitle)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StudentNavBar from "../../components/StudentNavBar.vue";
import Card from "../../components/Card.vue";
import firebaseApp from "../../firebase.js";
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
  name: "StudentInProgressProjects",
  components: {
    StudentNavBar,
    Card,
  },
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
    var userEmail = this.userEmail;
    const that = this;
    async function getinProgProjects() {
      const ref = doc(db, "students", userEmail);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      //var projects = data.inProgProjects
      //that.inProgProjects = data.inProgProjects
      if (data) {
        for (var i = 0; i < data.inProgProjects.length; i++) {
          getProject(data.inProgProjects[i]).then((res) => {
            that.inProgProjects.push(res);
          });
        }
        console.log(that.inProgProjects);
      }
    }
    getinProgProjects();

    async function getProject(proj) {
      const ref = doc(db, "Project", proj);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      return {
        projectTitle: data.Project_Title,
        description: data.Description,
        profilePicture: data.profPicture,
        id: docSnap.id,
      };
    }
    /*
    async function populateStore() {
      let docRef = await doc(db,"Project",'hi jack')
      let project = await getDoc(docRef)
      let tasks = project.data().Tasks
      var toDoTask = []
      var inProgressTask = []
      var pendingReviewTask = []
      var completedTask = []
      tasks.forEach((document) => {  
        console.log('hello')   
        if (document.taskStatus == "To do") {
            toDoTask.push({
              id: document.taskName,
              projectTitle: that.projectTitle,
              projectId: that.projectId,
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
              projectId: that.projectId,
              projectTitle: that.projectTitle,
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
              projectId: that.projectId,
              projectTitle: that.projectTitle,
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
              projectId: that.projectId,
              comments: document.comments,
              projectTitle: that.projectTitle,
              documents: document.documents,
              status: document.taskStatus,
              duedate: document.taskDueDate,
              taskname: document.taskName,
              shortdescription: document.taskDescription,                      
            })
          }
      })
        console.log("student todo",toDoTask)
    }

    populateStore()
    */

  },

  methods: {
    ...mapMutations(['SET_STUDENT_TASK_ID','SET_STUDENT_PROJECT_ID','SET_STUDENT_PROJECT_TITLE','SET_STUDENT_TO_DO','SET_STUDENT_IN_PROGRESS','SET_STUDENT_PENDING_REVIEW','SET_STUDENT_COMPLETED',]),
    async viewTasks(id, title) {
      console.log("in method")
      console.log(title)
      this.SET_STUDENT_PROJECT_ID(id)
      this.SET_STUDENT_PROJECT_TITLE(title)


      let docRef = await doc(db,"Project",id)
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
              id: document.taskName,
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
        console.log("student completed",completedTask)
        this.SET_STUDENT_TO_DO(toDoTask)
        this.SET_STUDENT_IN_PROGRESS(inProgressTask)
        this.SET_STUDENT_PENDING_REVIEW(pendingReviewTask)
        this.SET_STUDENT_COMPLETED(completedTask)
        console.log("vuex todo",this.studentToDo)
        console.log("vuex in prog",this.studentInProgress)
        console.log("vuex pending",this.studentPendingReview)
        console.log("vuex completed",this.studentCompleted)
        this.$router.push({name:'StudentManagement'})
        //this.$router.push({name:'StudentManagement'/*,params:{projectId:id, projectTitle:title}*/})
    }
  }
};
</script>

<style>
#title {
  color: white;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 0px;
}

.btn {
  margin: 10px;
}

.mainBody {
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: scroll;
  padding-bottom: 1000px;
  margin-bottom: 100px;
}

.projectContainer {
  margin-left: 30px;
}

#status {
  text-align: left;
  font-size: 28px;
  margin: 30px 30px 0px 30px;
  color: #606060;
}

hr {
  border: 0;
  border-top: 2px solid #606060;
  width: 90%;
  margin: 5px 0px 16px 38px;
}

.options {
  font-size: 15px;
  padding: 5px 25px;
  margin-left: 15px;
  border-radius: 30px; /* or 50% */
  background-color: #0e8044;
  color: white;
  text-align: center;
}

.optionsOff {
  font-size: 15px;
  padding: 10px 25px;
  margin-left: 15px;
  border-radius: 30px; /* or 50% */
  background-color: F5F5F5;
  text-align: center;
  color: #606060;
  text-decoration: none;
}
</style>
