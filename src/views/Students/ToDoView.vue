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
                   <p>#<span></span><strong>{{taskIndex}} {{taskname}}</strong></p>
                  
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
               <div class="right flex flex-column" id="rightmost">
                       <label>Change Task Status</label>
                       <select v-model="extend" id="input">
                           <!-- change accordingly -->
                           <option value="1 day">1 day</option>
                           <option value="3 days">3 days</option>
                           <option value="5 days">5 days</option>
                           <option value="7 days">1 week</option>
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
import {doc,setDoc,collection,getDocs,deleteDoc} from 'firebase/firestore';
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
               projectId: '',
               projectTitle: '',
               taskname: '',
               taskId: '',
               duedate: '',
               shortdescription: '',
               status: '',
               todo: '',
               inprogress: '',
               pendingreview: '',
               completed: '',
               extend: '',
               documents: '',
               comments: '',
               long: '',
               dateOptions: {year: "numeric", month: "short", day: "numeric"},
               files: [],
           }
       },
       watch: {
           extend() {
               const extendedDate = new Date()
               this.duedate = extendedDate.setDate(extendedDate.getDate() + parseInt(this.extend))
               this.duedate = new Date(this.duedate).toLocaleDateString('en-us',this.dateOptions)
           }
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
           this.projectId = this.$route.params.projectId
           this.projectTitle = this.$route.params.projectTitle
           this.taskname = this.$route.params.taskname
           this.taskId = this.$route.params.taskId
           this.duedate = this.$route.params.duedate
           this.issuedate = this.$route.params.issuedate
           this.shortdescription = this.$route.params.shortdescription
           this.status = this.$route.params.status
           this.todo = this.$route.params.todo
           this.inprogress = this.$route.params.inprogress
           this.pendingreview = this.$route.params.pendingreview
           this.completed = this.$route.params.completed
           console.log(this.taskname)

    //        const curr = this
    //        async function getTasksDetails() {
    //        //Change "To-Do" to props later
    //        let database = await getDocs(collection(db,"Tasks"))
    //        var temp = []
    //        database.forEach((doc) => {
    //            //Change to dynamic props later
    //            if (doc.id == ("ToDo" + curr.taskId)) {
    //                var data = doc.data()
    //                console.log(data) 
    //                temp.push({
    //                    taskname: data.taskname,
    //                    duedate: data.duedate,
    //                    documents: data.documents,
    //                    comments: data.comments, 
    //                    long: data.longdescription,
    //                })
    //            }
    //            })
    //        curr.taskname = temp[0]['taskname']
    //        curr.duedate = temp[0]['duedate']
    //        curr.duedate = (new Date(temp[0]['duedate'].seconds * 1000)).toLocaleDateString('en-us',curr.dateOptions)
    //        curr.documents = temp[0]['documents']
    //        curr.comments = temp[0]['comments']
    //        curr.long = temp[0]['long']
    //    }
    //    getTasksDetails()
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