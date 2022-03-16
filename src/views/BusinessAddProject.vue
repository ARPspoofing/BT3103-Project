<template>
  <NavBar :Heading="Heading" :header=true />
  <div class="mainBody">
    <form id="projectForm">
        <div class="inputs">
            <label for="projectTitle">Project Title*</label>
            <input type="text" id="projectTitle" required="" placeholder="Project Title"> <br><br>

            <label for="position">Position*</label>
            <input type="text" id="position" required="" placeholder="Position"> <br><br>

            <label for="noOfVacancies">Number of Vacancies*</label>
            <input type="number" id="noOfVacancies" required="" placeholder="Number of Vacancies"> <br><br>

            <label for="projectPeriodStart, projectPeriodEnd">Project Period*</label>
            <input type="date" id="projectPeriodStart" required="" placeholder="Choose Start Date"
              style="width: 228px; margin-right: 15px; ">
            <p>to</p>
            <input type="date" id="projectPeriodEnd" required="" placeholder="Choose End Date"
              style="width: 228px; margin-left: 15px;"> <br><br>

            <label for="projectAllowance">Allowance (in SGD)*</label>
            <input type="number" id="projectAllowance" required="" placeholder="Allowance"> <br><br>

            <label for="projectTags">Tags*</label>
            <select v-model="selected" name="tagSelect" multiple size="5" id="tagSelect" required="">
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Scientific Computing Applications">Scientific Computing Applications</option>
              <option value="Data Structures Algorithms">Data Structures and Algorithms</option>
              <option value="Computer Architecture">Computer Architecture</option>
              <option value="Computer Networks">Computer Networks</option>
              <option value="Computer Database">Computer Database</option>
              <option value="Database Mining">Database Mining</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Computer Graphics Visualisation">Computer Graphics and Visualisation</option>
              <option value="Image Sound Processing">Image and Sound Processing</option>
              <option value="Distributed Computing">Distributed Computing</option>
              <option value="Human Computer Interaction">Human-Computer Interaction</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Information Coding Theory">Information and Coding Theory</option>
            </select> <br><br>

            <label for="projectDescription">Description</label>
            <textarea id="projectDescription" name="projectDescription" rows="4" cols="60" placeholder="Project Description"></textarea> <br><br>

            <label for="projectDeliverables">Deliverables</label>
            <button id="addDeliverableButton" @click="addTask">
              <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
              <p> Add deliverables</p>
            </button>
            <br>
            <br>
            <div class="previous"
            v-for="(task, counter) in tasks"
            v-bind:key="counter">
              <button id="deleteDeliverable" @click="deleteTask(counter)"> 
                <i class="fa fa-times" id="crossIcon"></i>
              </button> <br>
              <label for="duration">Task Name*</label>
              <input type="text" v-model.lazy="task.taskName" required> <br><br>
              <label for="description">Description</label>
              <input type="text" v-model.lazy="task.taskDescription" required> <br><br>
              <label for="duedate">Due Date*</label>
              <input type="date" v-model.lazy="task.taskDueDate" required>
            </div>
             <!----->

            <!-- <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" 
              data-bs-backdrop="false" style="background: rgba(0, 0, 0, 0.5);">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Deliverable</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div id="deliverableInput">
                      <label for="taskName">Task Name*</label>
                      <input type="text" id="taskName" required="" placeholder="Task Name"> <br><br>
                      <label for="taskDescription">Description</label>
                      <textarea id="taskDescription" name="taskDescription" rows="4" cols="37" placeholder="Task Description"></textarea> <br><br>
                      <label for="taskDueDate">Due Date*</label>
                      <input type="date" id="taskDueDate" required="" placeholder="Choose Due Date">
                    </div>
                  </div>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="addDeliverableBtn">Add Deliverable</button>
                </div>
              </div>
             </div> -->
            </div>
        <button id="saveButton" type="button" v-on:click="saveProject()">Save</button>
    </form>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore"
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      Heading: "ADD PROJECT", 
      selected:[],
      /*tasks: [
        {
        taskName: "", 
        taskDescription: "", 
        taskDueDate: ""
        }
      ],*/
      tasks:[
       {
        taskName: '',
        taskDescription:'',
        taskDueDate: ''
       }
     ]
    }
  },
  methods: {
    /*add(){
      this.tasks.push({
        taskName: "", 
        taskDescription: "", 
        taskDueDate: ""
      })
    },
    delete(counter){
      this.tasks.splice(counter,1);
    },*/
    addTask(){
      this.tasks.push({
        taskName:'',
        taskDescription: '', 
        taskDueDate: ''
      })
    },
    deleteTask(counter){
      this.tasks.splice(counter,1);
    },
    async saveProject() {
      var a = document.getElementById("projectTitle").value;
      var b = document.getElementById("position").value;
      var c = document.getElementById("noOfVacancies").value;
      var d = document.getElementById("projectPeriodStart").value;
      var e = document.getElementById("projectPeriodEnd").value;
      var f = document.getElementById("projectAllowance").value;
      //var g = document.getElementById("tagSelect").value;
      var g = this.selected;
      var h = document.getElementById("projectDescription").value;
      var i = this.tasks;

      alert("Saving your data for Project: " + a);

      try {
        const docRef = await setDoc(doc(db, "Project", a), {
          Project_Title: a,
          Position: b,
          Num_Of_Vacancies: c,
          Project_Start: d,
          Project_End: e,
          Allowance: f,
          Tags: g,
          Description: h,
          Tasks: i,
        })

        console.log(docRef)
        document.getElementById("projectForm").reset();
        this.$emit("added")
      }
      catch(error) {
        console.error("Error adding document: ", error);
      }
    }
  },
  components: {
    NavBar
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
    padding-bottom: 100px;
  }

  #projectForm{
      text-align: center;
      margin-bottom: 20px;
  }

  #projectForm .inputs{
      margin-top: 20px;
      margin-left: auto;
      margin-right: auto;
      width: max-content;
      text-align: right;
  }

  #projectForm .inputs input{
      margin-left: 30px;
      width: 500px;
      background-color: #BBDFCC;
      border-width: 0px;
  }

  #projectForm .inputs textarea{
      margin-left: 30px;
      background-color: #BBDFCC;
      border-width: 0px;
  }

  p {
    display: inline;
  }

  #addDeliverableButton {
    background-color: #BBDFCC;
    margin-left: 30px;
    border-width: 0px;
    width: 500px;
    height: 28px;
    text-align: left;
    color: #797979;
  }

  #tagSelect  {
    background-color: #BBDFCC;
    margin-left: 30px;
    border-width: 0px;
    width: 500px;
  }

  #addDeliverableBtn {
    background-color: #004A23;
    width: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }

  #saveButton {
    background-color: #004A23;
    border-width: 0px;
    border-radius: 8px;
    color: white;
    width: 200px;
    height: 35px;
    margin-top: 10px;
    margin-left: 490px;
  }

  #projectForm .previous {
    background-color: #BBDFCC;
    width: max-content;
    text-align: right;
    margin: 0px 0px 20px auto;
    padding: 10px 10px 15px 10px;
  }

  #projectForm .previous input {
    width: 364px;
    background-color: white;
  }

  #deleteDeliverable {
    background-color: transparent;
    border-width: 0px;
    padding-bottom: 5px;
  }

  #crossIcon:hover {
    color: #004A23;
  }
</style>