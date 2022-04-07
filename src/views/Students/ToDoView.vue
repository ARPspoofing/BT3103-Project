<template>

    <router-link
      :to="{
        name: 'StudentManagement',
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
    <div class="details flex flex-column">
      <div class="top flex">
        <div class="left flex">
          <p>
            <strong>{{ task_id }}</strong>
          </p>
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
        <div id="duedate" class="date flex flex-column">
          <!-- Task issue date necessary? -->
          <p><b>Task Issue Date: </b> {{ duedate }}</p>
          <p><b>Task Due Date:</b> {{ formatDate(duedate) }}</p>
        </div>
      </div>
      <!--<div class="top-middle flex">
                <div id="duedate" class="date flex flex-column">
                   <p><b>Task Issue Date :</b> {{formatDate(issuedate)}}</p>
                   <p><b>Due Date :</b> {{formatDate(duedate)}}</p>
               </div>
           </div>-->
      <div class="middle flex">
        <div id="description" class="description flex flex-column">
          <p><b>Task Description</b></p>
          <p>{{ this.description }}</p>
        </div>
      </div>
      <!--<div class="middle-bottom flex">
               <div class="documents flex flex-column">
                   <p>Relevant Documents:</p>
                   <img src="../../assets/document.jpeg">
               </div>
           </div>-->
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
            <input
              type="file"
              multiple
              name="files[]"
              id="files"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import {mapState} from 'vuex'
import Loading from "../../components/Loading.vue";
const db = getFirestore(firebaseApp);
const router = useRouter();
import * as moment from "moment";

export default {
  name: "ToDoView",
  computed: {
    ...mapState(['userEmail',]),
  },
  data() {
    return {
      name: "",
      task_id: '1',
      projectId: '1',
      projectTitle: '1',
      duedate: '1',
      task: '1',
      description: '1',
      /*
      task_id: this.$route.params.taskId,
      projectId: this.$route.params.projectId,
      projectTitle: this.$route.params.projectTitle,
      duedate: this.$route.params.duedate,
      task: this.$route.params.task,
      description: this.$route.params.description,
      */
      extend: "",
      documents: "",
      comment: [],
      long: "",
      status: "",
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      email: this.userEmail,
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
  methods: {
    formatDate(date) {
      return moment(date).format("DD MMMM YYYY");
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
      console.log(this.userEmail);

      let ref2 = doc(db, "students", this.userEmail);
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
      let ref = await doc(db, "Project", this.projectId);
      let project = await getDoc(ref);

      var tasks = await project.data().Tasks;
      console.log("ok");
      console.log(this.task);
      console.log(tasks);
      console.log(tasks.length);
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
  },

  mounted() {
    const curr = this;
    const taskId = curr.$route.params.taskId;
    console.log(curr.$route.params.taskId);
    const projectId = curr.$route.params.projectId;
    const projectTitle = curr.$route.params.projectTitle;
    console.log(curr.$route.params);

    async function getComments() {
      const docRef = doc(db, "Project", projectId);
      let project = await getDoc(docRef);
      var tasks = await project.data().Tasks;
      var currTask = {};
      for (let i = 0; i < tasks.length; i++) {
        let thisTask = tasks[i];
        if (thisTask.taskName == taskId) {
          currTask = thisTask;
          curr.comment = currTask.comments.reverse();
          break;
        }
      }
      console.log(curr.comment);
    }
    getComments();
    console.log(curr.comment);

    async function getTasksDetails() {
      //Change "To-Do" to props later
      const docRef = await doc(db, "Project", projectId);
      let project = await getDoc(docRef);
      var tasks = await project.data().Tasks;
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
      curr.duedate = currTask.taskDueDate;
      curr.projectTitle = projectTitle;
      // curr.duedate = (new Date(temp[0]['duedate'].seconds * 1000)).toLocaleDateString('en-us',curr.dateOptions)
      //curr.documents = temp[0]['documents']
      curr.comments = "This is a test comment";
      //Edit later once the task has a proper long description
      curr.long =
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.";
    }
    getTasksDetails();
  },
};
</script>

<style scoped>
/*
.mainBody {
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: scroll;
  padding-bottom: 150px;
}
*/

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

  margin-top: 24px;
  /*background-color:rgb(11, 167, 115);*/
  background-color: #b3cabe;
  border-radius: 20px;
  margin-left: 60px;
  margin-right: 60px;
  width:50%;
  height:50%;

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

.date h4 {
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
#eachComment {
  text-align: left;
  position: centre;
  margin: 10px;
  padding: 5px;
  background-color: lightgoldenrodyellow;
  border-radius: 30px;
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

</style>