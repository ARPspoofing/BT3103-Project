<template>
<div class="mainBody">
    <button @click="goback" id="backButton">
        <i class="fa-solid fa-angles-left"></i>
        Back to Management</button>
   <div class="view container">

       <!-- <router-link :to="{name:'BusinessManagement'}">
           
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
                   <p>#<span></span><strong>{{task_id}} for {{projectTitle}}</strong></p>
                  
               </div>
               <div class="right flex flex-column">
                       <label>Extend Due Date</label>
                       <select v-model="extend" id="input">                  
                           <option value="1 day">1 day</option>
                           <option value="3 days">3 days</option>
                           <option value="5 days">5 days</option>
                           <option value="7 days">1 week</option>
                       </select>
               </div>
               <!--<div class="right flex flex-column" id="rightmost">
                       <label>Change Task Status</label>
                       <select v-model="extend" id="input">
                            change accordingly 
                           <option value="1 day">1 day</option>
                           <option value="3 days">3 days</option>
                           <option value="5 days">5 days</option>
                           <option value="7 days">1 week</option>
                           </select>
                   <p>#<span></span>{{task_id}} for {{projectTitle}}</p>
               </div>-->
               <div class="right flex flex-column" id="rightmost">
                       <label>Change Task Status</label>
                       <select v-model="extend" id="input">                
                           <option value="To do">To Do</option>
                           <option value="In progress">In Progress</option>
                           <option value="Pending review">Send for review</option>                          
                       </select>
               </div>
           </div>
           <div class="top-middle flex">
                <div id="duedate" class="date flex flex-column">
                   <p><b>Task Issue Date :</b> {{formatDate(issuedate)}}</p>
                   <p><b>Due Date :</b> {{formatDate(duedate)}}</p>
               </div>
           </div>
           <div class="middle flex">
               <div id="description" class="description flex flex-column">
                   <p><b>Task Description</b></p>
                   <p>{{this.shortdescription}}</p>
               </div>
           </div>
           <div class="middle-bottom flex">
               <div class="documents flex flex-column">
                   <p><b>Submit Relevant Documents :</b></p>
                   <button id="addFileButton" @click="addFile">
                    <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
                    Add Files
                    </button>
                    <div
                    class="previous"
                    v-for="(task, counter) in files"
                    v-bind:key="counter"
                    >
                    <button id="deleteFile" @click="deleteFile(counter)">
                        <i class="fa fa-times" id="crossIcon"></i>
                    </button>
                   <input type="file" multiple name="files[]" id="files" v-on:change="uploadFiles">
                   </div>
               </div>
           </div>
           <div class="bottom flex flex-column">
               <h4>Please limit additional comments to 500 characters</h4>
               <div class="input flex flex-column">
                   <textarea required type="text" id="comments" rows="4" cols="50" maxlength="500" v-model="comments"></textarea>
               </div>
           </div>
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
import { getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";
 
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
               files: [],
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
       computed: {
           taskIndex() {
               return parseInt(this.taskId) + 1;
           }
       },

       methods: {
           addFile() {
                this.files.push(
                    ''
                );
            },
            deleteFile(counter) {
                this.files.splice(counter, 1);
            },

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

            goback() {
                console.log(JSON.stringify(this.projectId))
                this.$router.push({
                    name: "BusinessManagement",
                    params: {
                        projectId: JSON.stringify(this.projectId),
                        projectTitle: JSON.stringify(this.projectTitle),
                        taskname: JSON.stringify(this.taskname),
                        taskId: JSON.stringify(this.taskId),
                        duedate: JSON.stringify(this.duedate),
                        issuedate: JSON.stringify(this.issuedate),
                        shortdescription: JSON.stringify(this.shortdescription),
                        status: JSON.stringify(this.status),
                        todo: JSON.stringify(this.todo),
                        inprogress: JSON.stringify(this.inprogress),
                        pendingreview: JSON.stringify(this.pendingreview),
                        completed: JSON.stringify(this.completed),
                    },
                });
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
            },

            uploadFiles(event) {
             this.files = event.target.files[0]
             const storage = getStorage();   
             const filesRef = ref(storage, this.email +'/' + this.files.name )
             const uploadTask = uploadBytesResumable(filesRef, this.files)
             uploadTask.on('state_changed', (snapshot) => {}, (error)=> {
                 console.log(error)
             },() => {
                 getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                     console.log("File available at", this.filesLink = url)
                 })
             })
         },
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
       flex-grow: 1
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
       margin-top:30px;
       color: black;
       gap:16px;
   }

   h4 {
       font-size:12px;
       font-weight: 400;
       margin-bottom:5px;
       margin-top: 20px;
   }
 
   p {
       font-size: 16px;
   }
 
   date h4 {
       margin-top:20px;
   }
 
   .description {
       margin-left:0px;
       text-align: justify;
        text-justify: inter-word;
        color: #2C3E50;
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

   label {
       font-size: 14px;
       font-weight: bold;
       margin-bottom: 7px;
   }

   #input {
       width: 150px;
       height: 25px;
   }

   .documents {
       text-align: left;
   }

   #files {
       background: #F5F5F5;
       width: 700px;
       margin-bottom: 10px;
   }

   #addFileButton {
       background: transparent;
       border: none;
       color: #2C3E50;
       width: 120px;
       padding-bottom: 7px;
   }

   #deleteFile {
       background: transparent;
       border: none;
       color: rgb(214, 28, 28);
   }
</style>