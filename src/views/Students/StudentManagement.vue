<template>
<StudentNavBar :search ="false" :Heading="fullTitle" :header="true"/>
<div class="mainBody">
<button @click="goback" id="backButton">
    <i class="fa-solid fa-angles-left"></i>
    Back to Projects</button>
<div v-if="toDoTask.length > 0" class="wrapper-outer">
    <div class="wrapper">
        <h4>To-Do</h4>
        <ToDo v-if ="toDoTask"  v-for="(task,index) in toDoTask" :task="task" :key="index" :projectTitle="projectTitle" :projectId="projectId" :user="Student"/>
       <div v-else>
           
        <h3>Congratulations, you do not have any tasks to do</h3>
        
    </div> 
    </div>
    <div class="wrapper">
        <h4>IN PROGRESS</h4>
        <InProgress v-if="inProgressTask" v-for="(task,index) in inProgressTask" :task="task" :key="index" :user="Student"
        :projectTitle="projectTitle" :projectId = "projectId"/>
         <div v-else>
         
        <h3>You currently do not have any in-progress tasks. Please update the status of To-Do tasks if you are working on anything</h3>
        
    </div>
    </div>
    <div class="wrapper">
        <h4>PENDING REVIEW</h4>
        <PendingReview v-if="pendingReviewTask" v-for="(task,index) in pendingReviewTask" :task="task" :key="index" :user="Student"
        :projectTitle="projectTitle" :projectId = "projectId"/>
        <div v-else>
         
        <h3>You do not have any tasks awaiting review. Please update the status of your tasks if you would like to send them for review.</h3>
        
    </div>
    </div>
    <div class="wrapper">
        <h4>COMPLETED</h4>
        <Completed v-if="completedTask" v-for="(task,index) in completedTask" :task="task" :key="index" :user="Student"
        :projectTitle="projectTitle" :projectId="projectId"/>
        <div v-else>
          
        <h3>No task has been completed yet.</h3>
        
        </div>
    </div>
    
</div>
</div>
   
</template>

<script>
import StudentNavBar from "../../components/StudentNavBar.vue"
import ToDo from '../../components/ToDo.vue'
import InProgress from "../../components/InProgress.vue" 
import PendingReview from "../../components/PendingReview.vue" 
import Completed from "../../components/Completed.vue"
import firebaseApp from '../../firebase.js';
import {getFirestore} from 'firebase/firestore';
import {doc,setDoc,collection,getDocs,deleteDoc, getDoc} from 'firebase/firestore';
import {ref} from "vue"
import {useRouter} from "vue-router"
import {mapState} from "vuex"
import {mapMutations} from "vuex"
import Loading from '../../components/Loading.vue'
const db = getFirestore(firebaseApp)
const router = useRouter()
export default {
    name: "StudentManagement",
    props: {
        //So that this page can easily access the project that it is clicked on
        projectName:String,
    },
    components: {
        StudentNavBar,
    },
    data() {
        return {
            projectId:'',
            projectTitle:'',
            toDoTask: [],
            inProgressTask:[],  
            pendingReviewTask:[],
            completedTask:[],
            fullTitle:'',
            Student: 'student',
            
        }
    },
    methods: {
        goback() {
            this.$router.push({name:'StudentInProgressProjects'})
        }
    },
    computed: {
       ...mapState(['name','userEmail']),
    },
    mounted() {
        const curr = this
        // var email = auth.currentUser.email;
        // console.log(email)
        // this.username = this.userEmail
        // const userEmail = this.userEmail
        // console.log(userEmail)
        curr.projectId = curr.$route.params.projectId
        curr.projectTitle = curr.$route.params.projectTitle
        curr.fullTitle = "Tasks for " + curr.projectTitle 
        console.log(curr.fullTitle)
        async function getTasks() {
          //Change "To-Do" to props later
          //Later, each project needs to have its list of tasks
          //The code here is just temporary
          let docRef = await doc(db,"Project",curr.projectId)
          let project = await getDoc(docRef)
          let tasks = project.data().Tasks
          console.log(tasks)
          var toDoTask = []
          var inProgressTask = []
          var pendingReviewTask = []
          var completedTask = []
          
          tasks.forEach((document) => {
              //Change to dynamic props later
             
              if (document.taskStatus == "To do") {
                
                console.log(document)
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
                })
              } else if (document.taskStatus == "In progress") {
                 
                  console.log(document)
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
                    
                })
              } else if (document.taskStatus == "Pending review") {
                  console.log(document) 
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
                  })
              } else if (document.taskStatus == "Completed") {
                  console.log(document) 
                  completedTask.push({
                    id: document.id,
                    projectId: curr.projectId,
                    comments: document.comments,
                    projectTitle: curr.projectTitle,
                    documents: document.documents,
                    status: document.taskStatus,
                    duedate: document.taskDueDate,
                    taskname: document.taskName,
                    shortdescription: document.taskDescription,                      
                  })
              }
            })
        console.log(inProgressTask)
        console.log(completedTask)
        console.log(pendingReviewTask)
        curr.toDoTask = toDoTask
        curr.inProgressTask = inProgressTask
        curr.pendingReviewTask = pendingReviewTask
        curr.completedTask = completedTask
      }
      getTasks()
    },
    components: {
        ToDo,
        InProgress,
        PendingReview,
        Completed
    },
}
</script>

<style scoped>
    .mainBody {
    background-color: #F5F5F5;
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

    .empty {
        align-items: center;
    }   

    h3 {
        margin-top:-100px;
        font-size: 20px;  
    }

    p {
        text-align: center;
        font-size:12px;
        font-weight:300;
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
</style>