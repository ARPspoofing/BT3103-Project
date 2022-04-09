<template>
  <BusinessNavBar :Heading="Heading" :header="true" />

  <button @click="blurBg" style = "visibility:hidden" type="submit" ref="confirmModal" class="green" data-bs-toggle="modal" data-bs-target="#saveModal" >Save</button>                  
  <div class="modal fade" id="saveModal" tabindex="-1" aria-labelledby="saveModalLabel" aria-hidden="true" data-bs-backdrop="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">    

               <BusinessToDoView :description="this.longdescription" :duedate="this.duedate" :task_id="this.id" :projectTitle="this.projectTitle" :projectId="this.projectId" :task="this.task"/>
                
        <button @click="unblurBg" type="button" id="nobtn" data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>

  <!--<div :class="{blurCss:toBlur,mainBody:foreverTrue}">-->
    <div :class="{blurCss:toBlur}">
    <button @click="goback" id="backButton">
      <i class="fa-solid fa-angles-left"></i>
      Back to Projects
    </button>
    <button id="completeButton" @click="completeProject()">
      Complete Project
    </button>
    <div class="wrapper-outer">
      <div class="wrapper">
        <h4>TO-DO</h4>
        <ToDo
          @getData="capture"
          v-if="toDoTask"
          v-for="(task, index) in toDoTask"
          :task="task"
          :key="index"
          :projectTitle="projectTitle"
          :projectId="projectId"
          :user="Business"
        />
        <div v-else>
          <img src="../../assets/empty.png" />
          <h3>Congratulations, you do not have any tasks to do</h3>
        </div>
      </div>
      <div class="wrapper">
        <h4>IN PROGRESS</h4>
        <InProgress
          @getData="capture"
          v-if="inProgressTask"
          v-for="(task, index) in inProgressTask"
          :task="task"
          :key="index"
          :user="Business"
        />
        <div v-else>
          <h3>
            You currently do not have any in-progress tasks. Please update the
            status of To-Do tasks if you are working on anything
          </h3>
        </div>
      </div>
      <div class="wrapper">
        <h4>PENDING REVIEW</h4>
        <PendingReview
          @getData="capture"
          v-if="pendingReviewTask"
          v-for="(task, index) in pendingReviewTask"
          :task="task"
          :key="index"
          :user="Business"
        />
        <div v-else>
          <h3>
            You do not have any tasks awaiting review. Please update the status
            of your tasks if you would like to send them for review.
          </h3>
        </div>
      </div>
      <div class="wrapper">
        <h4>COMPLETED</h4>
        <Completed
          @getData="capture"
          v-if="completedTask"
          v-for="(task, index) in completedTask"
          :task="task"
          :key="index"
          :user="Business"
        />        
        <div v-else>
          <h3>No task has been completed yet.</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToDo from "../../components/ToDo.vue";
import InProgress from "../../components/InProgress.vue";
import PendingReview from "../../components/PendingReview.vue";
import Completed from "../../components/Completed.vue";
import firebaseApp from "../../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  getDoc,
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import Loading from "../../components/Loading.vue";
const db = getFirestore(firebaseApp);
const router = useRouter();
import BusinessNavBar from "../../components/BusinessNavBar.vue";
import { getAuth } from "firebase/auth";
import BusinessToDoView from '../Businesses/BusinessToDoView.vue'
import ToDoView from '../Students/ToDoView.vue'


export default {
  name: "BusinessManagement",
  components: {
    BusinessNavBar,
    ToDo,
    InProgress,
    PendingReview,
    Completed,
    BusinessToDoView,
    ToDoView,
  },
  props: {
    //So that this page can easily access the project that it is clicked on
    projectName: String,
  },
  computed: {
    ...mapState(['userEmail','businessTask','businessProjectId','businessProjectTitle','businessToDo','businessInProgress','businessPendingReview','businessCompleted','businessInProgProjects','businessCompletedProjects','businessStudents','businessStudentsInProg','businessStudentsComp']),
  },

  data() {
    return {
      task:null,
      projectTitle: "",
      toDoTask: [],
      inProgressTask: [],
      pendingReviewTask: [],
      completedTask: [],
      id:null,
      duedate:null,
      projectId: "",
      Business: "business",
      inProgProjects: [],
      completedProjects: [],
      email: this.userEmail,
      students: [],
      studentsInProg: [],
      studentsComp: [],
      toBlur:false,
      comment:null,
    };
  },
  methods: {
    ...mapMutations(['SET_BUSINESS_TASK','SET_BUSINESS_PROJECT_ID','SET_BUSINESS_PROJECT_TITLE','SET_BUSINESS_TO_DO','SET_BUSINESS_IN_PROGRESS','SET_BUSINESS_PENDING_REVIEW','SET_BUSINESS_COMPLETED','SET_BUSINESS_IN_PROG_PROJECTS','SET_BUSINESS_COMPLETED_PROJECTS','SET_BUSINESS_STUDENTS','SET_BUSINESS_STUDENTS_IN_PROG','SET_BUSINESS_STUDENTS_COMP',]),
    //...mapMutations(['SET_BUSINESS_TASK','SET_BUSINESS_PROJECT_ID','SET_BUSINESS_PROJECT_TITLE','SET_BUSINESS_TO_DO','SET_BUSINESS_IN_PROGRESS','SET_BUSINESS_PENDING_REVIEW','SET_BUSINESS_COMPLETED',]),
    goback() {
      this.$router.push({
        name: "BusinessInProgress",
        params: {},
      });
    },
    blurBg() {
      this.toBlur = true
    },
    unblurBg() {
      this.toBlur = false
    },
    attempt() {
      this.openModal = true
    },
    async capture(task_emit) {
      const curr = this
        this.task = task_emit
        this.SET_BUSINESS_TASK(task_emit)
        //this.SET_BUSINESS_TASK(task_emit)
        this.id = task_emit['id']
        this.projectId = this.businessProjectId
        //this.projectId = task_emit['projectId']
        this.projectTitle = task_emit['projectTitle']
        this.longdescription = task_emit['longdescription']
        this.duedate = task_emit['duedate']
        console.log("task emit full",task_emit)
        console.log("task emit",task_emit['id'])
        
        //retrieve all the comments for all the task first
        const docRef = doc(db, "Project", this.businessProjectId);
        let project = await getDoc(docRef);
        var tasks = await project.data().Tasks;
        var currTask = {};
        console.log("taskComments",tasks)
        for (let i = 0; i < tasks.length; i++) {        
          let thisTask = tasks[i];
          if (thisTask.taskName == task_emit['id']) {
            currTask = thisTask;
          if (currTask.comments) {
            curr.comment = currTask.comments.reverse();
            console.log("comments",currTask.comments.reverse())
          } else {
            curr.comment = [];
          }
          break;
        }
      }
      console.log("current comments",curr.comment)
        
        
        
        this.openModal = true
        this.$refs.confirmModal.click();
        


        







    },
    async completeProject() {
      if (this.completedProjects) {
        this.completedProjects.push(this.businessProjectId);
      } else {
        this.completedProjects = [];
        this.completedProjects.push(this.businessProjectId);
      }
      //console.log(this.inProgProjects)
      var key = this.inProgProjects.indexOf(this.businessProjectId);
      //console.log(this.inProgProjects)
      this.inProgProjects.splice(key, 1);
      //console.log(this.inProgProjects)

      try {
        const docRef = await updateDoc(doc(db, "Project", this.businessProjectId), {
          Status: "completed",
        });

        const docRef2 = await updateDoc(doc(db, "businesses", this.userEmail), {
          completedProjects: this.completedProjects,
          inProgProjects: this.inProgProjects,
        });

        for (let i = 0; i < this.students.length; i++) {
          var stuComp = this.studentsComp[i];
          var stuInProg = this.studentsInProg[i];
          var ind = stuInProg.indexOf(this.businessProjectId);
          stuInProg.splice(ind, 1);
          if (stuComp) {
            stuComp.push(this.businessProjectId);
          } else {
            stuComp = [this.businessProjectId];
          }
          console.log(this.students[i]);
          console.log(stuInProg);
          console.log(stuComp);
          const docRef2 = await updateDoc(
            doc(db, "students", this.students[i]),
            {
              completedProjects: stuComp,
              inProgProjects: stuInProg,
            }
          );
        }

        this.$emit("updated");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
  },
  mounted() {
    const curr = this;
    // var email = auth.currentUser.email;
    // console.log(email)
    // this.username = this.userEmail
    // const userEmail = this.userEmail
    // console.log(userEmail)

    //Previously route params
    /*
    this.projectId = this.businessProjectId
    this.projectTitle = this.businessProjectTitle
    */

    //Previously assigned in getProjects()
    this.inProgProjects = this.businessInProgProjects
    this.completedProjects = this.businessCompletedProjects

    //Previously assigned in getStudents()
    this.students = this.businessStudents
    this.studentsInProg = this.businessStudentsInProg
    this.studentsComp = this.businessStudentsComp

    this.projectId = this.businessProjectId
    this.projectTitle = this.businessProjectTitle
    this.fullTitle = "Tasks for " + this.projectTitle 
    this.toDoTask = this.businessToDo
    this.inProgressTask = this.businessInProgress
    this.pendingReviewTask = this.businessPendingReview
    this.completedTask = this.businessCompleted



    //Non vuex
    /*
    curr.projectId = curr.$route.params.projectId;
    curr.projectTitle = curr.$route.params.projectTitle;
    console.log(curr.projectId);
    */

    /*To be commented out once shifted to business In Progress
    async function getProjects() {
      const ref = doc(db, "businesses", email);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      curr.inProgProjects = data.inProgProjects;
      curr.completedProjects = data.completedProjects;
      console.log(curr.inProgProjects);
      console.log(curr.completedProjects);
      //var inProgProjects = data.inProgProjects;
    }
    getProjects();
    */

    /*To be commented out once shifted to business in progress
    async function getStudents() {
      const projects = query(
        collection(db, "students"),
        where("inProgProjects", "array-contains", curr.projectId)
      );
      let snapshot = await getDocs(projects);
      console.log(snapshot);
      snapshot.forEach(async (docs) => {
        let data = docs.data();
        curr.students.push(data.email);
        curr.studentsInProg.push(data.inProgProjects);
        curr.studentsComp.push(data.completedProjects);
      });
      console.log(curr.students);
      console.log(curr.studentsInProg);
      console.log(curr.studentsComp);
    }
    getStudents();
    */
    //To be commented out once it is shifted to business In Progress
    /*
    async function getTasks() {
      let docRef = await doc(db, "Project", curr.projectId);
      let project = await getDoc(docRef);
      let tasks = project.data().Tasks;
      console.log(tasks);
      var toDoTask = [];
      var inProgressTask = [];
      var pendingReviewTask = [];
      var completedTask = [];

      tasks.forEach((document) => {
        //Change to dynamic props later

        if (document.taskStatus == "To do") {
          console.log(document);
          toDoTask.push({
            id: document.taskName,
            projectTitle: curr.projectTitle,
            projectId: curr.projectId,
            comments: document.comments,
            documents: document.documents,
            currStatus: document.taskStatus,
            duedate: document.taskDueDate,
            taskname: document.taskName,
            shortdescription: document.taskDescription,
          });
        } else if (document.taskStatus == "In progress") {
          console.log(document);
          inProgressTask.push({
            id: document.taskName,
            projectId: curr.projectId,
            projectTitle: curr.projectTitle,
            comments: document.comments,
            documents: document.documents,
            status: document.taskStatus,
            duedate: document.taskDueDate,
            taskname: document.taskName,
            shortdescription: document.taskDescription,
          });
        } else if (document.taskStatus == "Pending review") {
          console.log(document);
          pendingReviewTask.push({
            id: document.taskName,
            projectId: curr.projectId,
            projectTitle: curr.projectTitle,
            comments: document.comments,
            documents: document.documents,
            status: document.taskStatus,
            duedate: document.taskDueDate,
            taskname: document.taskName,
            shortdescription: document.taskDescription,
          });
        } else if (document.taskStatus == "Completed") {
          console.log(document);
          completedTask.push({
            id: document.taskName,
            projectId: curr.projectId,
            projectTitle: curr.projectTitle,
            comments: document.comments,
            documents: document.documents,
            status: document.taskStatus,
            duedate: document.taskDueDate,
            taskname: document.taskName,
            shortdescription: document.taskDescription,
          });
        }
      });
      console.log(pendingReviewTask);
      console.log(completedTask);

      console.log(pendingReviewTask);
      curr.toDoTask = toDoTask;
      curr.inProgressTask = inProgressTask;
      curr.pendingReviewTask = pendingReviewTask;
      curr.completedTask = completedTask;
    }
    getTasks();
    */
  },
};
</script>

<style scoped>
.mainBody {
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: scroll;
  padding-bottom: 150px;
  /*
    filter: blur(5px);
   */
}
.wrapper-outer {
  display: flex;
  flex-direction: row;
  /* position: fixed; */
  /* overflow-y: scroll; */
  padding-bottom: 100px;
  margin: 20px;
  width: 98%;
  padding: 20px;
}

.wrapper {
  background-color: #dbebe3; /* rgb(195, 238, 197);*/
  /* height:100vh; */
  flex: 1;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
  margin-right: 5px;
  padding: 15px;
}

.empty {
  align-items: center;
}

h3 {
  margin-top: -100px;
  font-size: 20px;
}

p {
  text-align: center;
  font-size: 12px;
  font-weight: 300;
}

h4 {
  font-weight: bold;
}

#backButton {
  background: #0e8044;
  color: white;
  margin-top: 20px;
  border: none;
  border-radius: 15px;
  border-radius: 30px;
  padding: 10px 25px;
  font-size: 14px;
}

#completeButton {
  background: #ffab2c;
  color: white;
  margin-top: 20px;
  border: none;
  border-radius: 15px;
  border-radius: 30px;
  padding: 10px 25px;
  font-size: 14px;
  margin-left: 50px;
}


#applyModal {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    background-color: #b3cabe;
    border: none;
  }

  .words {
    width: max-content;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    height: 50px;
  }

  .applybtns {
    width: max-content;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }

  #yesbtn, #nobtn {
    margin: 10px;
    border: none;
    border-radius: 10px;
    background-color:#89ca9a;
    color: #3f3f3f;
    width: 120px;
    height: 30px;
    font-size: 18px;
  }

  .modal-body p {
    font-size: 18px;
    text-align: center;
    color: #3f3f3f;
  }

  .blurCss {
      filter: blur(5px); 
  }

  .mainBody {
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: scroll;
  padding-bottom: 150px;
  /*
    filter: blur(5px);
   */
}
.wrapper-outer {
  display: flex;
  flex-direction: row;
  /* position: fixed; */
  /* overflow-y: scroll; */
  /* padding-bottom: 150px; */
  margin: 20px;
  margin-top: 0px;
  width: 98%;
  padding: 20px;
  padding-bottom: 150px;
}
.wrapper {
  background-color: #dbebe3; /* rgb(195, 238, 197);*/
  /* height:100vh; */
  flex: 1;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
  margin-right: 5px;
  padding: 15px;
}



.modal-overlay {
  content: '';
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}


#applyModal {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    background-color: #b3cabe;
    border: none;
  }

  .words {
    width: max-content;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    height: 50px;
  }

  .applybtns {
    width: max-content;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }

  #yesbtn, #nobtn {
    margin: 10px;
    border: none;
    border-radius: 10px;
    background-color:#89ca9a;
    color: #3f3f3f;
    width: 120px;
    height: 30px;
    font-size: 18px;
  }

  .modal-body p {
    font-size: 18px;
    text-align: center;
    color: #3f3f3f;
  }

  .blurCss {
      filter: blur(5px); 
  }

  #backButton {
    background: #0e8044;
  /*width: 190px;
        height: 30px;*/
    color: white;
    margin-top: 20px;
    border: none;
    border-radius: 15px;
    border-radius: 30px;
    padding: 10px 25px;
    font-size: 14px;
}

</style>
