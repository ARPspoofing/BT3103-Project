<template>
<!--
  <nav class="navbar navbar-expand-lg navbar-custom">
    <img src="../assets/Pathfinders.png" class="d-inline-block align-top" width=250 alt="logo">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <h2 id="title"><b>ADD PROJECT</b></h2>
    <ul class="navbar-nav ms-auto">
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Navigate
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <router-link class="nav-item nav-link active" :to="{name:'StudentHomePage'}" >Home</router-link>
            <div class="dropdown-divider"></div>
            <router-link class="nav-item nav-link active" :to="{name:'About'}">About</router-link>
            <div class="dropdown-divider"></div>
            <router-link class="nav-item nav-link active" :to="{name:'BusinessHomePage'}">Business Home</router-link>
        </div>
        </div>
    </ul>
  </nav>-->
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
              style="width: 228px; margin-right: 15px">
            <p>to</p>
            <input type="date" id="projectPeriodEnd" required="" placeholder="Choose End Date"
              style="width: 228px; margin-left: 15px;"> <br><br>

            <label for="projectAllowance">Allowance (in SGD)*</label>
            <input type="number" id="projectAllowance" required="" placeholder="Allowance"> <br><br>

            <label for="projectTags">Tags*</label>
            <select v-model="selected" name="tagSelect" multiple size="5" id="tagSelect" required="">
              <option value="ArtificialIntelligence">Artificial Intelligence</option>
              <option value="ScientificComputingApplications">Scientific Computing Applications</option>
              <option value="DataStructuresAlgorithms">Data Structures and Algorithms</option>
              <option value="ComputerArchitecture">Computer Architecture</option>
              <option value="ComputerNetworks">Computer Networks</option>
              <option value="ComputerDatabase">Computer Database</option>
              <option value="DatabaseMining">Database Mining</option>
              <option value="DataAnalytics">Data Analytics</option>
              <option value="ComputerGraphicsVisualisation">Computer Graphics and Visualisation</option>
              <option value="ImageSoundProcessing">Image and Sound Processing</option>
              <option value="DistributedComputing">Distributed Computing</option>
              <option value="HumanComputerInteraction">Human-Computer Interaction</option>
              <option value="SoftwareEngineering">Software Engineering</option>
              <option value="InformationCodingTheory">Information and Coding Theory</option>
            </select> <br><br>

            <label for="projectDescription">Description</label>
            <textarea id="projectDescription" name="projectDescription" rows="4" cols="60" placeholder="Project Description"></textarea> <br><br>

            <label for="projectDeliverables">Deliverables</label>
            <button id="addDeliverableButton" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
              <p> Add deliverables</p>
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" 
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
             </div>
            
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
      selected:[]
    }
  },
  methods: {
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
          Description: h
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

  /*
  .navbar-custom {
    background-color: #004A23;
  }

  #title {
      color: white;
      margin-left:30px;
      margin-right: 30px;
      margin-bottom: 0px;
  }

  .btn {
      margin: 10px;
  }*/

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

  .modal-body {
    max-width: max-content; 
    padding-left: 40px;
  }

  .modal-content {
    background-color: #BBDFCC;
  }

  .modal-body #deliverableInput label {
    color: #797979;
  }

  .modal-body #deliverableInput input {
    background-color: white;
    width:317px; 
    margin-left: 15px;
  }

  .modal-body #deliverableInput textarea {
    background-color: white;
    margin-left: 15px;
  }

  #saveButton {
    background-color: #004A23;
    border-width: 0px;
    border-radius: 8px;
    color: white;
    width: 200px;
    height: 35px;
    margin-top: 20px;
    margin-left: 490px;
  }

</style>