<template>
    <button @click="goback" id="backButton">Back to Management</button>
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
                   <p>#<span></span>{{taskId}} {{taskname}}</p>
                  
               </div>
               <div class="right flex flex-column">
                       <label>Extend Due Date</label>
                       <select v-model="extend">                  
                           <option value="1 day">1 day</option>
                           <option value="3 days">3 days</option>
                           <option value="5 days">5 days</option>
                           <option value="7 days">1 week</option>
                       </select>
               </div>
           </div>
           <div class="top-middle flex">
                <div class="date flex flex-column">
                   <h4>Task Issue Date: {{formatDate(duedate)}}</h4>
                   <h4>Task Due Date: {{formatDate(duedate)}}</h4>
               </div>
           </div>
           <div class="middle flex">
               <div class="description flex flex-column">
                   <h4>Full Task Description</h4>
                   <p>{{long}}</p>
               </div>
           </div>
           <div class="middle-bottom flex">
               <div class="documents flex flex-column">
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
           }
       },
       watch: {
           extend() {
               const extendedDate = new Date()
               this.duedate = extendedDate.setDate(extendedDate.getDate() + parseInt(this.extend))
               this.duedate = new Date(this.duedate).toLocaleDateString('en-us',this.dateOptions)
           }
       },
       methods: {
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
            }
       },

       mounted() {
           this.projectId = this.$route.params.projectId
           this.projectTitle = this.$route.params.projectTitle
           this.taskname = this.$route.params.taskname
           this.taskId = this.$route.params.taskId
           this.duedate = this.$route.params.duedate
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
       background-color: #77c79e;
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
    width: 190px;
    height: 30px;
    color: white;
    margin: 20px;
   }

 
</style>