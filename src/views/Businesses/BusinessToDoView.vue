<template>
<!--
  <div class="mainBody">
    -->
    <!--
    <router-link
      :to="{
        name: 'BusinessManagement',
        params: {
          projectId: this.$route.params.projectId,
          projectTitle: this.$route.params.projectTitle,
        },
      }"
    >
      <button id="backButton">
        <i class="fa-solid fa-angles-left"></i> Back to Management
      </button>
    </router-link>
    -->

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
            <p>
              <strong>{{ task_id }}</strong>
            </p>
          </div>
          <!--<div class="right flex flex-column">
            <label>Extend Due Date</label>
            <select v-model="extend" id="input">
              <option value="1 day">1 day</option>
              <option value="3 days">3 days</option>
              <option value="5 days">5 days</option>
              <option value="7 days">1 week</option>
            </select>
          </div>-->
          <div class="right flex flex-column" id="rightmost">
            <label>Change status</label>
            <select v-model="status">
              <option value="To do">To Do</option>
              <option value="Pending review">Send for review</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div class="top-middle flex">
          <div id="duedate" class="date flex flex-column">
            <!--       Don't need issue date
            <p><b>Task Issue Date :</b> {{ formatDate(issuedate) }}</p>
            -->
            <p><b>Due Date :</b> {{ formatDate(duedate) }}</p>
          </div>
        </div>
        <div class="middle flex">
          <div id="description" class="description flex flex-column">
            <p><b>Task Description</b></p>
            <p>{{ this.description }}</p>
          </div>
        </div>
        <div class="middle-bottom flex">
          <div class="documents flex flex-column">
            <p><b>Submit Relevant Documents :</b></p>
            <!--<button id="addFileButton" @click="addFile">
              <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
              Add Files
            </button>-->
            <input
              type="file"
              multiple
              name="files[]"
              id="files"
              accept=".jpeg,.pdf,.docx"
              v-on:change="uploadFiles"
            />
            <div
              class="previous"
              v-for="(task, counter) in files"
              v-bind:key="counter"
            >
              <button id="deleteFile" @click="deleteFile(counter)">
                <i class="fa fa-times" id="crossIcon"></i>
              </button>
              <input
                type="file"
                multiple
                name="files[]"
                id="files"
                accept=".jpeg,.pdf,.docx"
                v-on:change="uploadFiles"
              />
            </div>
          </div>
        </div>
        <div class="bottom flex flex-column">
          <label for="comments">Comments</label>
          <h4>Please limit additional comments to 500 characters</h4>
          <div class="input flex flex-column">
            <textarea
              id="comments"
              name="comments"
              rows="4"
              cols="60"
              placeholder="Please enter your comment"
              maxlength="500"
            ></textarea>
            <button id="commentButton" @click="addComment">Add Comment</button>
            <!--<textarea required type="text" id="comments" rows="4" cols="50" maxlength="500" v-model="comments"></textarea>-->
          </div>
        </div>
        <div
          class="projectContainer"
          :key="item.key"
          v-for="(item, key) in comment"
        >
          <div id="eachComment">
            <img v-bind:src="item.profPic" alt="Logo" class="logo" />
            <p>
              <strong>{{ item["name"] }}</strong
              >: {{ item["comment"] }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--
  </div>
  -->
</template>

<script>
import firebaseApp from "../../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { update } from "firebase/database";
//import { ref } from "vue";
import { useRouter } from "vue-router";
import Loading from "../../components/Loading.vue";
const db = getFirestore(firebaseApp);
const router = useRouter();
import * as moment from "moment";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
  storageRef,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'

export default {
  name: "BusinessToDoView",
  data() {
    return {
      name: "",
      /*
      task_id: this.$route.params.taskId,
      projectId: this.$route.params.projectId,
      projectTitle: this.$route.params.projectTitle,
      duedate: this.$route.params.duedate,
      task: this.$route.params.task,
      description: this.$route.params.description,
      */
      number: this.$route.params.key,
      extend: "",
      documents: "",
      comment: [],
      long: "",
      status: "",
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      email: this.userEmail,
      file: null,
      files: [],
      fileLink: "",
    };
  },
  props: ['task_id','projectId','projectTitle','duedate','task','description'],
  watch: {
    extend() {
      const extendedDate = new Date();
      this.duedate = extendedDate.setDate(
        extendedDate.getDate() + parseInt(this.extend)
      );
      this.duedate = new Date(this.duedate).toLocaleDateString(
        "en-us",
        this.dateOptions
      );
    },
    status() {
      var self = this;
      self.updateStatus();
    },
  },
  computed: {
    taskIndex() {
      return parseInt(this.number) + 1;
    },
  },

  methods: {
    formatDate(date) {
      return moment(date).format("DD MMMM YYYY");
    },

    async updateFile() {
      let proj = await doc(db, "Project", this.projectId);
      let project = await getDoc(proj);

      var dat = await project.data();
      var tasks = dat.Tasks;
      var toRemove = {};
      var newTask = {};

      for (let i = 0; i < tasks.length; i++) {
        let currTask = tasks[i];
        console.log(this.task_id);
        if (currTask.taskName == this.task_id) {
          toRemove = { ...currTask };
          newTask = currTask;
        }
      }

      await updateDoc(ref, { Tasks: arrayRemove(toRemove) });
      if (newTask.files) {
        newTask.files.push(this.fileLink);
      } else {
        newTask.files = [];
        newTask.files.push(this.fileLink);
      }
      this.files.push(this.fileLink);

      await updateDoc(ref, { Tasks: arrayUnion(newTask) });
    },

    async uploadFiles(event) {
      //Add code to upload the resume somewhere
      this.file = event.target.files[0];
      const storage = getStorage();
      const fileref = ref(storage, this.file.name);
      const uploadTask = uploadBytesResumable(fileref, this.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("File available at", (this.fileLink = url));
          });
        }
      );
      updateFile();
    },

    async addComment() {
      var a = document.getElementById("comments").value;
      let ref = await doc(db, "Project", this.projectId);
      let project = await getDoc(ref);

      var dat = await project.data();
      var tasks = dat.Tasks;
      var toRemove = {};
      var newTask = {};

      for (let i = 0; i < tasks.length; i++) {
        let currTask = tasks[i];
        console.log(this.task_id);
        if (currTask.taskName == this.task_id) {
          toRemove = { ...currTask };
          newTask = currTask;
        }
      }
      console.log(toRemove);
      console.log(newTask);
  

      let ref2 = doc(db, "businesses", this.userEmail);
      let biz = await getDoc(ref2);
      var da = biz.data();
      console.log(da);

      await updateDoc(ref, { Tasks: arrayRemove(toRemove) });
      if (newTask.comments) {
        newTask.comments.push({
          user: this.userEmail,
          comment: a,
          date: new Date(),
          name: da.name,
          profPic: da.finalProfile,
        });
      } else {
        newTask.comments = [];
        newTask.comments.push({
          user: this.userEmail,
          comment: a,
          date: new Date(),
          name: da.name,
          profPic: da.finalProfile,
        });
      }
      this.comment.unshift({
        user: this.userEmail,
        comment: a,
        date: new Date(),
        name: da.name,
        profPic: da.finalProfile,
      });

      await updateDoc(ref, { Tasks: arrayUnion(newTask) });

      this.task = newTask;
      document.getElementById("comments").value = "";
    },

    async updateStatus() {
      const currStatus = this.status;
      console.log(currStatus);
      console.log(this.projectId);
      let ref = await doc(db, "Project", this.projectId);
      let project = await getDoc(ref);

      var dat = await project.data();
      //console.log(dat);
      var tasks = dat.Tasks;
      //console.log("ok");
      //console.log(this.task);
      //console.log(tasks);
      //console.log(tasks.length);
      var toRemove = {};

      var newTask = {};

      for (let i = 0; i < tasks.length; i++) {
        console.log(i);
        let currTask = tasks[i];
        console.log(this.task_id);
        if (currTask.taskName == this.task_id) {
          toRemove = { ...currTask };
          currTask.taskStatus = currStatus;
          newTask = currTask;
        }
      }

      console.log(tasks);
      console.log(newTask);

      await updateDoc(ref, { Tasks: arrayRemove(toRemove) });

      await updateDoc(ref, { Tasks: arrayUnion(newTask) });

      this.task = newTask;
    },

    async updateTask() {
      try {
        const docRef = await updateDoc(doc(db, "Project", this.projectId), {});

        console.log(docRef);
        this.$emit("updated");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
    //    addFile() {
    //         this.files.push(
    //             ''
    //         );
    //     },
    //     deleteFile(counter) {
    //         this.files.splice(counter, 1);
    //     },

    //    formatDate(date) {
    //         return moment(date).format("DD MMMM YYYY");
    //     },

    //     goback() {
    //         console.log(JSON.stringify(this.projectId))
    //         this.$router.push({
    //             name: "BusinessManagement",
    //             params: {
    //                 projectId: JSON.stringify(this.projectId),
    //                 projectTitle: JSON.stringify(this.projectTitle),
    //                 taskname: JSON.stringify(this.taskname),
    //                 taskId: JSON.stringify(this.taskId),
    //                 duedate: JSON.stringify(this.duedate),
    //                 issuedate: JSON.stringify(this.issuedate),
    //                 shortdescription: JSON.stringify(this.shortdescription),
    //                 status: JSON.stringify(this.status),
    //                 todo: JSON.stringify(this.todo),
    //                 inprogress: JSON.stringify(this.inprogress),
    //                 pendingreview: JSON.stringify(this.pendingreview),
    //                 completed: JSON.stringify(this.completed),
    //             },
    //         });
    //     },

    //     async updateTask() {
    //         try {
    //             const docRef = await updateDoc(doc(db, "Project", this.projectId), {

    //             });

    //             console.log(docRef);
    //             this.$emit("updated");
    //         } catch (error) {
    //             console.error("Error updating document: ", error);
    //         }
    //     },

    //     uploadFiles(event) {
    //      this.files = event.target.files[0]
    //      const storage = getStorage();
    //      const filesRef = ref(storage, this.email +'/' + this.files.name )
    //      const uploadTask = uploadBytesResumable(filesRef, this.files)
    //      uploadTask.on('state_changed', (snapshot) => {}, (error)=> {
    //          console.log(error)
    //      },() => {
    //          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //              console.log("File available at", this.filesLink = url)
    //          })
    //      })
    //  },
  },

  mounted() {
    const curr = this;
    const taskId = curr.$route.params.taskId;
    const projectId = curr.$route.params.projectId;
    console.log(curr.$route.params);
    console.log(curr.$route.params.comments);
    const projectTitle = curr.$route.params.projectTitle;

    async function updateFile() {
      let proj = await doc(db, "Project", this.projectId);
      let project = await getDoc(proj);

      var dat = await project.data();
      var tasks = dat.Tasks;
      var toRemove = {};
      var newTask = {};

      for (let i = 0; i < tasks.length; i++) {
        let currTask = tasks[i];
        console.log(this.task_id);
        if (currTask.taskName == this.task_id) {
          toRemove = { ...currTask };
          newTask = currTask;
        }
      }

      await updateDoc(ref, { Tasks: arrayRemove(toRemove) });
      if (newTask.files) {
        newTask.files.push(this.fileLink);
      } else {
        newTask.files = [];
        newTask.files.push(this.fileLink);
      }
      this.files.push(this.fileLink);

      await updateDoc(ref, { Tasks: arrayUnion(newTask) });
    }

    async function getComments() {
      const docRef = doc(db, "Project", projectId);
      let project = await getDoc(docRef);
      var tasks = await project.data().Tasks;
      var currTask = {};
      for (let i = 0; i < tasks.length; i++) {
        let thisTask = tasks[i];
        if (thisTask.taskName == taskId) {
          currTask = thisTask;
          if (currTask.comments) {
            curr.comment = currTask.comments.reverse();
          } else {
            curr.comment = [];
          }
          break;
        }
      }
      console.log(curr.comment);
    }
    console.log(curr.comment);

    async function getTasksDetails() {
      //Change "To-Do" to props later
      const docRef = await doc(db, "Project", projectId);
      let project = await getDoc(docRef);
      var tasks = await project.data().Tasks;
      console.log(project.data());
      console.log(tasks);
      var currTask = {};

      for (let i = 0; i < tasks.length; i++) {
        let thisTask = tasks[i];
        if (thisTask.taskName == taskId) {
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
      curr.name = currTask.taskName;
      //curr.duedate = currTask.taskDueDate;
      curr.projectTitle = projectTitle;
      console.log(projectTitle);
      // curr.duedate = (new Date(temp[0]['duedate'].seconds * 1000)).toLocaleDateString('en-us',curr.dateOptions)
      //curr.documents = temp[0]['documents']
      //curr.comments = "This is a test comment";
      //Edit later once the task has a proper long description
      curr.long =
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.";
    }
    getComments();
    getTasksDetails();
    //    this.projectId = this.$route.params.projectId
    //    this.projectTitle = this.$route.params.projectTitle
    //    this.taskname = this.$route.params.taskname
    //    this.taskId = this.$route.params.taskId
    //    this.duedate = this.$route.params.duedate
    //    this.issuedate = this.$route.params.issuedate
    //    this.shortdescription = this.$route.params.shortdescription
    //    this.status = this.$route.params.status
    //    this.todo = this.$route.params.todo
    //    this.inprogress = this.$route.params.inprogress
    //    this.pendingreview = this.$route.params.pendingreview
    //    this.completed = this.$route.params.completed
    //    console.log(this.taskname)

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

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

nav-link {
  margin-bottom: 12px;
  align-items: center;
  color: white;
  font-size: 12px;
}

img {
  margin-right: 16px;
  width: 7px;
  height: 10px;
}

.details {
  padding: 48px;
  margin-top: 24px;
  /*background-color:rgb(11, 167, 115);*/
  background-color: #b3cabe;
  border-radius: 20px;
}

.top div {
  flex-grow: 1;
}

.left {
  font-size: 12px;
}

.left p:first-child {
  font-size: 24px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.left p:nth-child(2) {
  font-size: 16px;
}

span {
  color: black;
}

.right {
  font-size: 12px;
  align-items: flex-end;
}

.middle {
  margin-top: 30px;
  color: black;
  gap: 16px;
}

h4 {
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 5px;
  margin-top: 20px;
}

p {
  font-size: 16px;
}

date h4 {
  margin-top: 20px;
}

.description {
  margin-left: 0px;
  text-align: justify;
  text-justify: inter-word;
  color: #2c3e50;
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
  background: #f5f5f5;
  width: 700px;
  margin-bottom: 10px;
}

#addFileButton {
  background: transparent;
  border: none;
  color: #2c3e50;
  width: 120px;
  padding-bottom: 7px;
}

#deleteFile {
  background: transparent;
  border: none;
  color: rgb(214, 28, 28);
}

#commentButton {
  background: #0e8044;
  color: white;
  margin: 20px;
  border-radius: 30px;
  border: none;
  padding: 8px;
  font-size: 14px;
  width: 180px;
  position: right;
}

.logo {
  vertical-align: left;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-left: 0px;
  margin-right: 10px;
  margin-top: -2.5px;
  float: left;
}

#eachComment {
  text-align: left;
  position: centre;
  margin: 10px;
  padding: 5px;
  background-color: lightgoldenrodyellow;
  border-radius: 30px;
}
</style>
