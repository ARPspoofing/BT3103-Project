<template>
<!--
<ToDoViewTest/>
-->


<StudentNavBar :search ="false" :Heading="fullTitle" :header="true"/>
<!-- Modal -->
  <button style = "visibility:hidden" type="submit" ref="confirmModal" class="green" data-bs-toggle="modal" data-bs-target="#saveModal" >Save</button>                  


<!-- Modal -->
<div class="modal fade" id="saveModal" tabindex="-1" aria-labelledby="saveModalLabel" aria-hidden="true" data-bs-backdrop="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
          <!--
        <ToDoView :task="task" :task_id="task['id']" :projectId="task['projectId']" :projectTitle="task['projectTitle']"/>
        -->
        <ToDoView :description="this.longdescription" :duedate="this.duedate" :task_id="this.id" :projectTitle="this.projectTitle" :projectId="this.projectId"/>
        <button type="button" id="nobtn" data-bs-dismiss="modal">No</button>
      </div>
    </div>
  </div>
</div>

<!--
<ToDoView v-if="openModal" :task_id="task['id']" :task=task :projectTitle="this.task['projectTitle']" :projectId="task['projectId']" :duedate="this.duedate"/>
-->

<!--
Proxy {id: 'hi jack', projectTitle: 'hijack place', projectId: 'BoI9Ie13dAUjtq95A0LM', comments: Array(3), documents: undefined, …}
-->

<button @click="goback" id="backButton">Back to Projects</button>
<div v-if="toDoTask.length >= 0" class="wrapper-outer">
    <div class="wrapper">
        <h4>To-Do</h4>
        <ToDo @getData="capture" v-for="(task,index) in toDoTask" :task="task" :key="index" :projectTitle="projectTitle" :projectId="projectId"/>    </div>
    <div class="wrapper">
        <h4>IN PROGRESS</h4>
        <InProgress @getData="capture" v-if="inProgressTask" v-for="(task,index) in inProgressTask" :task="task" :key="index"
        :projectTitle="projectTitle" :projectId = "projectId"/>
         <div v-else>
         
        <h3>You currently do not have any in-progress tasks. Please update the status of To-Do tasks if you are working on anything</h3>
        
    </div>
    </div>
    <div class="wrapper">
        <h4>PENDING REVIEW</h4>
        <PendingReview @getData="capture" v-if="pendingReviewTask" v-for="(task,index) in pendingReviewTask" :task="task" :key="index"
        :projectTitle="projectTitle" :projectId = "projectId"/>
        <div v-else>
         
        <h3>You do not have any tasks awaiting review. Please update the status of your tasks if you would like to send them for review.</h3>
        
    </div>
    </div>
    <div class="wrapper">
        <h4>COMPLETED</h4>
        <Completed v-if="completedTask" v-for="(task,index) in completedTask" :task="task" :key="index"
        :projectTitle="projectTitle" :projectId="projectId"/>
        <div v-else>
          
        <h3>No task has been completed yet.</h3>
        
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
import Loading from '../../components/Loading.vue'
import ToDoView from '../Students/ToDoView.vue'
const db = getFirestore(firebaseApp)
const router = useRouter()


export default {
    name: "StudentManagement",
    props: {
        //So that this page can easily access the project that it is clicked on
        projectName:String,

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
            task:null,
            duedate:null,
            openModal:false,
            id:null,
            projectId:null,
            projectTitle:null,
            longdescription:null,
        }
    },
    methods: {
        goback() {
            this.$router.push({name:'StudentInProgressProjects'})
        },
        capture(task_emit) {
            this.task = task_emit
            this.id = task_emit['id']
            this.projectId = task_emit['projectId']
            this.projectTitle = task_emit['projectTitle']
            this.longdescription = task_emit['longdescription']
            this.duedate = task_emit['duedate']
            console.log("task emit full",task_emit)
            console.log("task emit",task_emit['id'])
            this.openModal = true
            this.$refs.confirmModal.click();
        },
        attempt() {
            this.openModal = true
        },
        trying() {
            console.log("trying")
        }
    },

    computed: {

       


    },
    mounted() {
        const curr = this

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
        console.log(pendingReviewTask)
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
        Completed,
        StudentNavBar,
        ToDoView,
    },

}
</script>

<style scoped>
    .wrapper-outer {
        display: flex;
        flex-direction: row;
    }
    
    .wrapper {
        background-color: rgb(195, 238, 197);
        height:100vh;
        flex:1;
        align-items: center;
        justify-content: center;
        align-content: center;
        justify-items: center;
        margin-right:5px;
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

</style>