<template>
    
       <router-link :to="{name:'StudentManagement', params:{projectId:this.$route.params.projectId,projectTitle:this.$route.params.projectTitle}}">
           <img src='../../assets/back.png'> Go Back
       </router-link> -->
       <!--
       <div class="header flex">
           <div class="left flex">
               <Span>Status</Span>
               <div class="status-button flex todo">
                   ToDo
               </div>
           </div>
           <div class="right flex">
                <button @click="toggleState" class="dark-purple">Edit</button>
               <button @click="Save" class="green">Save</button>
               <button @click="Delete" class="red">Delete</button>
           </div>
       </div>
       -->
       <div class="details flex flex-column">
           <div class="top flex">
               <div class="left flex">
                   <p>#<span></span>{{task_id}} for {{projectTitle}}</p>
                  
               </div>
               <div class="right flex flex-column">
                       <label>Change status</label>
                       <select v-model="status">                  
                           <option value="To do">To Do</option>
                           <option value="In progress">In Progress</option>
                           <option value="Pending review">Send for review</option>                          
                       </select>
               </div>
           </div>
           <div class="top-middle flex">
                <div class="date flex flex-column">
                    <!-- Task issue date necessary? -->
                   <h4>Task Issue Date: {{duedate}}</h4>
                   <h4>Task Due Date: {{duedate}}</h4>
               </div>
           </div>
           <div class="middle flex">
               <div id="description" class="description flex flex-column">
                   <p>Full Task Description</p>
                   <p>{{this.shortdescription}}</p>
               </div>
           </div>
           <div class="middle-bottom flex">
               <div class="documents flex flex-column">
                   <p>Relevant Documents:</p>
                   <img src="../../assets/document.jpeg">
               </div>
           </div>
           <div class="bottom flex flex-column">
               <h4>Please limit additional comments to 500 characters</h4>
               <div class="input flex flex-column">
                   <textarea required type="text" id="comments" rows="4" cols="50" maxlength="500" v-model="comments"></textarea>
               </div>
           </div>
       </div>
   
 
   <!-- {{task_id}}
   {{taskname}}
   {{formatDate(duedate)}}
   {{documents}}
   {{comments}} -->
</template>
 
<script>
import firebaseApp from '../../firebase.js';
import {getFirestore} from 'firebase/firestore';
import {doc,setDoc,collection,getDocs,getDoc,deleteDoc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
import {update} from 'firebase/database';
import {ref} from "vue"
import {useRouter} from "vue-router"
import Loading from '../../components/Loading.vue'
const db = getFirestore(firebaseApp)
const router = useRouter()
import * as moment from 'moment'
 
   export default {
       name: 'ToDoView',
       data() {
           return {
               name: '',
               task_id: this.$route.params.taskId,
               projectId: this.$route.params.projectId,
               projectTitle: this.$route.params.projectTitle,
               duedate: this.$route.params.duedate,
               task:this.$route.params.task,
               extend: '',
               documents: '',
               comments: '',
               long: '',
               status: '',
               dateOptions: {year: "numeric", month: "short", day: "numeric"},
           }
       },

       
       watch: {
           extend() {
               const extendedDate = new Date()
               this.duedate = extendedDate.setDate(extendedDate.getDate() + parseInt(this.extend))
               this.duedate = new Date(this.duedate).toLocaleDateString('en-us',this.dateOptions)
           },

            //Use a watcher to track the status and change it when the status changes
           status() {              
               this.updateStatus()
            },
       },
       methods: {
           formatDate(date) {
                return moment(date).format("DD MMMM YYYY");
            },

            //This function handles the changing of status
            async updateStatus() {
               //Capture the status
               const currStatus = this.status;
               console.log(currStatus)
               //Get the project ref
               let ref = await doc(db,"Project", this.projectId);
               let project = await getDoc(ref);

                //Extract the tasks
               var tasks = await project.data().Tasks
              //Variable to store the old task to remove from array
               var toRemove = {}
               //Variable to store the updated task
              var newTask = {}

               for(let i = 0; i < tasks.length; i++) {
                   //Current task is the ith index
                   let currTask = tasks[i]; 
                    console.log(this.task_id)
                    //If task name mathces the name of the current view
                   if(currTask.taskName == this.task_id) {
                       //create a shallow copy of the old task (so that can remove later)
                       toRemove = { ...currTask }
                       //update the new taskStatus with the current status and store in variable
                       currTask.taskStatus = currStatus
                       newTask = currTask
                   }
               }   
               
               
                //First remove old task
               await updateDoc(ref, {Tasks: arrayRemove(toRemove)
               })

                //Then update the new task
               await updateDoc(ref, {Tasks: arrayUnion(newTask)})

                //Replace the current task with the new task to allow multiple updates
               this.task = newTask;
           },

            

            async updateTask() {
                try {
                    const docRef = await updateDoc(doc(db, "Project", this.projectId), {
                        
                    });

                    console.log(docRef);
                    this.$emit("updated");
                } catch (error) {
                    console.error("Error updating document: ", error);
                }
            }
       },

       mounted() {
           const curr = this
           const taskId = curr.$route.params.taskId
           const projectId = curr.$route.params.projectId
           const projectTitle = curr.$route.params.projectTitle
           console.log(projectTitle) 
           async function getTasksDetails() {
           //Change "To-Do" to props later
           const docRef = await doc(db, "Project", projectId)
           let project = await getDoc(docRef)
           var tasks = await project.data().Tasks
           console.log(tasks)
           var currTask = {}

           for(let i = 0; i < tasks.length; i++) {
               let thisTask = tasks[i];
               if(thisTask.taskName == taskId) {
                   currTask = thisTask;
                   break;
               }

           }

          /* database.forEach((doc) => {
               //Change to dynamic props later
               if (doc.id == ("ToDo" + curr.task_id)) {
                   var data = doc.data()
                   console.log(data) 
                   temp.push({
                       name: data.taskname,
                       duedate: data.duedate,
                       documents: data.documents,
                       comments: data.comments, 
                       long: data.longdescription,
                   })
               }
               }) */
           curr.name = currTask.taskName
           curr.duedate = currTask.taskDueDate
           curr.projectTitle = projectTitle
          // curr.duedate = (new Date(temp[0]['duedate'].seconds * 1000)).toLocaleDateString('en-us',curr.dateOptions)
           //curr.documents = temp[0]['documents']
           //Edit later once the doc has proper comments
           curr.comments = "This is a test comment"
           //Edit later once the task has a proper long description
           curr.long = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32."
       }
       getTasksDetails()
   },
      
   }
</script>
 
<style scoped>
  
   .flex {
       display: flex;
   }
 
   .flex-column {
       flex-direction: column;
   }
 
  
   nav-link {
       margin-bottom:12px;
       align-items:center;
       color:white;
       font-size:12px;
   }
 
   img {
       margin-right:16px;
       width:7px;
       height: 10px;
   }
 
   .details {
       padding: 48px;
       margin-top:24px;
       /*background-color:rgb(11, 167, 115);*/
       background-color: #B3CABE;
       border-radius:20px;
   }
 
   .top div {
       flex:1
   }
 
   .left {
       font-size: 12px;
   }
 
   .left p:first-child {
       font-size: 24px;
       text-transform:uppercase;
       margin-bottom:8px;
   }
 
   .left p:nth-child(2) {
       font-size: 16px;
   }
 
   span {
       color: black;
   }
 
   .right {
       font-size:12px;
       align-items:flex-end;
   }
 
   .middle {
       margin-top:50px;
       color: black;
       gap:16px;
   }
 
   h4 {
       font-size:12px;
       font-weight: 400;
       margin-bottom:5px;
   }
 
   p {
       font-size: 16px;
   }
 
   date h4 {
       margin-top:20px;
   }
 
   .description {
       margin-left:20px;
       text-align: justify;
        text-justify: inter-word;
   }

    textarea {
        -webkit-border-radius: 12px;
        -moz-border-radius: 12px;
        border-radius: 12px;
        outline: none;
    }

   .bottom {

   }

   #backButton {
    background: #0e8044;
    /*width: 190px;
    height: 30px;*/
    color: white;
    margin: 20px;
    border-radius: 30px;
    border: none;
    padding: 10px 25px;
    font-size: 14px;
   }

   #duedate {
    text-align: left;
   }
</style>