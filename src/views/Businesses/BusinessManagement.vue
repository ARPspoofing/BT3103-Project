<template>
<BusinessNavBar :Heading="Heading" :header=true />
<button @click="goback" id="backButton">Back to Projects</button>
<div v-if="toDoTask.length > 0" class="wrapper-outer">
    <div class="wrapper">
        <h4>TO-DO</h4>
        <ToDo v-if="toDoTask" v-for="(task,index) in toDoTask" :task="task" :key="index"/>
        <div v-else>
        <img src="../../assets/empty.png">   
        <h3>Congratulations, you do not have any tasks to do</h3>
        
    </div>
    </div>
    <div class="wrapper">
        <h4>IN PROGRESS</h4>
        <InProgress v-if="inProgressTask" v-for="(task,index) in inProgressTask" :task="task" :key="index"/>
         <div v-else>
         
        <h3>You currently do not have any in-progress tasks. Please update the status of To-Do tasks if you are working on anything</h3>
        
    </div>
    </div>
    <div class="wrapper">
        <h4>PENDING REVIEW</h4>
        <PendingReview v-if="pendingReviewTask" v-for="(task,index) in pendingReviewTask" :task="task" :key="index"/>
        <div v-else>
         
        <h3>You do not have any tasks awaiting review. Please update the status of your tasks if you would like to send them for review.</h3>
        
    </div>
    </div>
    <div class="wrapper">
        <h4>COMPLETED</h4>
        <Completed v-if="completedTask" v-for="(task,index) in completedTask" :task="task" :key="index"/>
        <div v-else>
          
        <h3>No task has been completed yet.</h3>
        
        </div>
    </div>
    
</div>
   
</template>

<script>
import ToDo from '../../components/ToDo.vue'
import InProgress from "../../components/InProgress.vue" 
import PendingReview from "../../components/PendingReview.vue" 
import Completed from "../../components/Completed.vue"
import firebaseApp from '../../firebase.js';
import {getFirestore} from 'firebase/firestore';
import {getDoc, doc,setDoc,collection,getDocs,deleteDoc} from 'firebase/firestore';
import {ref} from "vue"
import {useRouter} from "vue-router"
import Loading from '../../components/Loading.vue'
const db = getFirestore(firebaseApp)
const router = useRouter()
import BusinessNavBar from "../../components/BusinessNavBar.vue";


export default {
  name: "BusinessManagement",
  components: {
    BusinessNavBar,
    ToDo,
    InProgress,
    PendingReview,
    Completed,
  },
  props: {
    //So that this page can easily access the project that it is clicked on
    projectName: String,
  },
  data() {
    return {
      Heading: "",
      toDoTask: [],
      inProgressTask: [],
      pendingReviewTask: [],
      completedTask: [],
      projectId: "",
    };
  },
  methods: {
    goback() {
      this.$router.push({
        name: "BusinessInProgress",
        params: {},
      });
    },
  },
  mounted() {
    this.Heading = JSON.parse(this.$route.params.projectTitle);
    this.projectId = JSON.parse(this.$route.params.projectId);
    const curr = this;
    
    async function getTasks() {
      //Change "To-Do" to props later
      //Later, each project needs to have its list of tasks
      //The code here is just temporary
      //   let database = await getDocs(collection(db,"Tasks"))
      var toDoTask = [];
      var inProgressTask = [];
      var pendingReviewTask = [];
      var completedTask = [];
      const docSnap = await getDoc(doc(db, "Project", curr.projectId));
      let data = docSnap.data();
      var tasks = data.Tasks;
      //   console.log(curr.tasks.length)
      for (var i = 0; i < tasks.length; i++) {
        let taskstatus = tasks[i]["taskStatus"];
        if (taskstatus == "To do") {
          toDoTask.push({
            projectId: curr.projectId,
            projectTitle: curr.Heading,
            taskId: i,
            shortdescription: tasks[i]["taskDescription"],
            duedate: tasks[i]["taskDueDate"],
            taskname: tasks[i]["taskName"],
            status: tasks[i]["taskStatus"],
            issueDate: tasks[i]["taskIssueDate"],
            todo: true,
            inprogress: false,
            pendingreview: false,
            completed: false,
          });
        } else if (taskstatus == "InProgress") {
          inProgressTask.push({
            projectId: curr.projectId,
            projectTitle: curr.Heading,
            taskId: i,
            shortdescription: tasks[i]["taskDescription"],
            duedate: tasks[i]["taskDueDate"],
            taskname: tasks[i]["taskName"],
            status: tasks[i]["taskStatus"],
            issueDate: tasks[i]["taskIssueDate"],
            todo: true,
            inprogress: false,
            pendingreview: false,
            completed: false,
          });
        } else if (taskstatus == "PendingReview") {
          pendingReviewTask.push({
            projectId: curr.projectId,
            projectTitle: curr.Heading,
            taskId: i,
            shortdescription: tasks[i]["taskDescription"],
            duedate: tasks[i]["taskDueDate"],
            taskname: tasks[i]["taskName"],
            status: tasks[i]["taskStatus"],
            issueDate: tasks[i]["taskIssueDate"],
            todo: true,
            inprogress: false,
            pendingreview: false,
            completed: false,
          });
        } else {
          completedTask.push({
            projectId: curr.projectId,
            projectTitle: curr.Heading,
            taskId: i,
            shortdescription: tasks[i]["taskDescription"],
            duedate: tasks[i]["taskDueDate"],
            taskname: tasks[i]["taskName"],
            status: tasks[i]["taskStatus"],
            issueDate: tasks[i]["taskIssueDate"],
            todo: true,
            inprogress: false,
            pendingreview: false,
            completed: false,
          });
        }
      }
      curr.toDoTask = toDoTask;
      curr.inProgressTask = inProgressTask;
      curr.pendingReviewTask = pendingReviewTask;
      curr.completedTask = completedTask;
          
        //   database.forEach((document) => {
        //       //Change to dynamic props later
        //       const data = document.data()
        //       if (data.status == "ToDo") {
                
        //         console.log(data)
        //         toDoTask.push({
        //             id: data.id,
        //             comments: data.comments,
        //             documents: data.documents,
        //             currState: data.currState,
        //             duedate: data.duedate,
        //             taskname: data.taskname,
        //             todo: data.todo,
        //             inprogress: data.inprogress,
        //             pendingreview: data.pendingreview,
        //             completed: data.completed,
        //             shortdescription: data.shortdescription,
                    
        //         })
        //       } else if (data.status == "InProgress") {
                 
        //           console.log(data)
        //           inProgressTask.push({
        //             id: data.id,
        //             comments: data.comments,
        //             documents: data.documents,
        //             currState: data.currState,
        //             duedate: data.duedate,
        //             taskname: data.taskname,
        //             todo: data.todo,
        //             inprogress: data.inprogress,
        //             pendingreview: data.pendingreview,
        //             completed: data.completed,
        //             shortdescription: data.shortdescription,
                    
        //         })
        //       } else if (data.status == "PendingReview") {
        //           console.log(data) 
        //           pendingReviewTask.push({
        //               id: data.id,
        //             comments: data.comments,
        //             documents: data.documents,
        //             currState: data.currState,
        //             duedate: data.duedate,
        //             taskname: data.taskname,
        //             todo: data.todo,
        //             inprogress: data.inprogress,
        //             pendingreview: data.pendingreview,
        //             completed: data.completed,
        //             shortdescription: data.shortdescription,
        //           })
        //       } else if (data.status == "Completed") {
        //           console.log(data) 
        //           completedTask.push({
        //               id: data.id,
        //             comments: data.comments,
        //             documents: data.documents,
        //             currState: data.currState,
        //             duedate: data.duedate,
        //             taskname: data.taskname,
        //             todo: data.todo,
        //             inprogress: data.inprogress,
        //             pendingreview: data.pendingreview,
        //             completed: data.completed,
        //             shortdescription: data.shortdescription,                      
        //           })
        //       }
        //     })
        // console.log(pendingReviewTask)
        // console.log(completedTask)

        // console.log(pendingReviewTask)
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
    .wrapper-outer {
        display: flex;
        flex-direction: row;
        position: fixed;
        overflow-y: scroll;
        padding-bottom: 100px;
        margin: 20px;
        width: 98%;
        padding: 20px;
    }
    
    .wrapper {
        background-color:#DBEBE3; /* rgb(195, 238, 197);*/
        /* height:100vh; */
        flex:1;
        align-items: center;
        justify-content: center;
        align-content: center;
        justify-items: center;
        margin-right:5px;
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