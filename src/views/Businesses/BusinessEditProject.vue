<template>
  <BusinessNavBar :search="false" :Heading="Heading" :header="true" />
  <div class="mainBody">
    <!-- <div>{{this.item.projectTitle}}</div> -->
    <form id="projectForm">
      <div class="inputs">
        <label for="projectTitle">Project Title*</label>
        <input
          type="text"
          id="projectTitle"
          required=""
          placeholder="Project Title"
          v-model="item.projectTitle"
        />
        <br /><br />

        <label for="position">Position*</label>
        <input
          type="text"
          id="position"
          required=""
          placeholder="Position"
          v-model="item.position"
        />
        <br /><br />

        <label for="noOfVacancies">Number of Vacancies*</label>
        <input
          type="number"
          id="noOfVacancies"
          required=""
          placeholder="Number of Vacancies"
          v-model="item.vacancies"
        />
        <br /><br />

        <label for="projectPeriodStart, projectPeriodEnd"
          >Project Period*</label
        >
        <input
          type="date"
          id="projectPeriodStart"
          required=""
          placeholder="Choose Start Date"
          style="width: 228px; margin-right: 15px"
          v-model="item.projectStart"
        />
        <p>to</p>
        <input
          type="date"
          id="projectPeriodEnd"
          required=""
          placeholder="Choose End Date"
          style="width: 228px; margin-left: 15px"
          v-model="item.projectEnd"
        />
        <br /><br />

        <label for="projectAllowance">Allowance (in SGD)*</label>
        <input
          type="number"
          id="projectAllowance"
          required=""
          placeholder="Allowance"
          v-model="item.allowance"
        />
        <br /><br />

        <label for="projectTags">Tags*</label>
        <select
          v-model="item.tags"
          name="tagSelect"
          multiple
          size="5"
          id="tagSelect"
          required=""
        >
          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>
          <option value="Scientific Computing Applications">
            Scientific Computing Applications
          </option>
          <option value="Data Structures Algorithms">
            Data Structures and Algorithms
          </option>
          <option value="Computer Architecture">Computer Architecture</option>
          <option value="Computer Networks">Computer Networks</option>
          <option value="Computer Database">Computer Database</option>
          <option value="Database Mining">Database Mining</option>
          <option value="Data Analytics">Data Analytics</option>
          <option value="Computer Graphics Visualisation">
            Computer Graphics and Visualisation
          </option>
          <option value="Image Sound Processing">
            Image and Sound Processing
          </option>
          <option value="Distributed Computing">Distributed Computing</option>
          <option value="Human Computer Interaction">
            Human Computer Interaction
          </option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Information Coding Theory">
            Information and Coding Theory
          </option>
        </select>
        <br /><br />

        <label for="projectDescription">Description</label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          rows="4"
          cols="65"
          placeholder="Project Description"
          v-model="item.description"
        ></textarea>
        <br /><br />

        <label for="projectDeliverables">Deliverables</label>
        <button id="addDeliverableButton" @click="addTaskEdit()">
          <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
          <p>Add deliverables</p>
        </button>
        <div
          class="previous"
          v-for="(task, counter) in item.tasks"
          v-bind:key="counter"
        >
          <button id="deleteDeliverable" @click="deleteTaskEdit(counter)">
            <i class="fa fa-times" id="crossIcon"></i>
          </button>
          <br />
          <label for="duration">Task Name*</label>
          <input type="text" v-model.lazy="task.taskName" required />
          <br /><br />
          <label for="description">Description</label>
          <input type="text" v-model.lazy="task.taskDescription" required />
          <br /><br />
          <label for="duedate">Due Date*</label>
          <input type="date" v-model.lazy="task.taskDueDate" required />
        </div>
      </div>
      <!-- old
      <button id="saveButton" type="button" v-on:click="updateProject()">
        -->
        <button id="saveButton" type="button" data-bs-toggle="modal" data-bs-target="#saveModal">
        Save
      </button>
      <div class="modal fade" id="saveModal" data-bs-backdrop="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"></h5>
              <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
            </div>
            <div class="modal-body">
              <i class="fa-solid fa-box-archive" id="box"></i>
              <br>
              Save details for <span style="color: #0e8044"
                        ><strong>{{ item.projectTitle }} </strong></span>?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="yesbtn" data-bs-dismiss="modal" v-on:click="updateProject()">Save</button>
              <button type="button" class="btn btn-secondary" id="nobtn" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <!-- <button id="saveButton" type="button" v-on:click="updateProject()">
        Save
      </button> -->
    </form>
  </div>
</template>

<script>
import BusinessNavBar from "../../components/BusinessNavBar.vue";
import * as moment from "moment";
import firebaseApp from "../../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);
import { getAuth } from "firebase/auth";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "BusinessEditProject",
  props: ["items"],
  components: {
    BusinessNavBar,
  },
  computed: {
    ...mapState(["cardItems"]),
  },
  data() {
    return {
      Heading: "EDIT PROJECT",
      props: ["items"],
      item: {
        projectTitle: "",
        description: "",
        position: "",
        vacancies: 0,
        allowance: 0,
        projectStart: "",
        projectEnd: "",
        tags: [],
        tasks: [],
      },
      previousTitle: "",
    };
  },
  mounted() {
    //Non-vuex
    //this.items = JSON.parse(this.$route.params.items)
    /*
        this.item = JSON.parse(this.$route.params.items)
        var prevTitle = JSON.parse(this.$route.params.items).projectId
        this.previousTitle = prevTitle
        console.log(this.item)
        */
    // console.log(this.item.tasks.push({
    //         taskName:'hi',
    //         taskDescription: 'hi',
    //         taskDueDate: ''
    //     }))
    //vuex
    this.item = JSON.parse(this.cardItems);
    var prevTitle = JSON.parse(this.cardItems).projectId;
    this.previousTitle = prevTitle;
    console.log(this.item);
  },
  methods: {
    addTaskEdit() {
      this.item.tasks.push({
        taskName: "",
        taskDescription: "",
        taskDueDate: "",
        taskStatus: "To do",
        taskIssueDate: new Date().toISOString().split("T")[0],
      });
    },
    deleteTaskEdit(counter) {
      this.item.tasks.splice(counter, 1);
    },
    async updateProject() {
      var a = document.getElementById("projectTitle").value;
      var b = document.getElementById("position").value;
      var c = document.getElementById("noOfVacancies").value;
      var d = document.getElementById("projectPeriodStart").value;
      var e = document.getElementById("projectPeriodEnd").value;
      var f = document.getElementById("projectAllowance").value;
      //var g = document.getElementById("tagSelect").value;
      if (typeof this.selected == String) {
        const tagArray = new Array();
        tagArray.push(this.item.tags);
        var g = tagArray;
      } else {
        var g = this.item.tags;
      }
      console.log(g);
      var h = document.getElementById("projectDescription").value;
      var i = this.item.tasks;

      alert("Updating your data for Project: " + a);

      try {
        const docRef = await updateDoc(doc(db, "Project", this.previousTitle), {
          Project_Title: a,
          Position: b,
          Num_Of_Vacancies: c,
          Project_Start: d,
          Project_End: e,
          Allowance: f,
          Tags: g,
          Description: h,
          Tasks: i,
        });

        console.log(docRef);
        document.getElementById("projectForm");
        this.$emit("updated");
        this.$router.push({ name: "IndividualProjectInfo" });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
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
  padding-bottom: 100px;
}

#projectForm {
  text-align: center;
  margin-bottom: 20px;
}

#projectForm .inputs {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  text-align: right;
}

#projectForm .inputs input {
  margin-left: 30px;
  width: 500px;
  background-color: #bbdfcc;
  border-width: 0px;
}

#projectForm .inputs textarea {
  margin-left: 30px;
  background-color: #bbdfcc;
  border-width: 0px;
}

p {
  display: inline;
}

#addDeliverableButton {
  background-color: #bbdfcc;
  margin-left: 30px;
  border-width: 0px;
  width: 500px;
  height: 28px;
  text-align: left;
  color: #797979;
}

#tagSelect {
  background-color: #bbdfcc;
  margin-left: 30px;
  border-width: 0px;
  width: 500px;
}

#addDeliverableBtn {
  background-color: #004a23;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}

#saveButton {
  background-color: #004a23;
  border-width: 0px;
  border-radius: 8px;
  color: white;
  width: 200px;
  height: 35px;
  margin-top: 10px;
  margin-left: 490px;
}

#projectForm .previous {
  background-color: #bbdfcc;
  width: 500px;
  text-align: right;
  margin: 20px 0px 0px auto;
  padding: 10px 10px 15px 10px;
}

#projectForm .previous input {
  width: 354px;
  background-color: white;
}

#deleteDeliverable {
  background-color: transparent;
  border-width: 0px;
  padding-bottom: 5px;
}

#crossIcon:hover {
  color: #004a23;
}
	.modal-content {
  background-color: #bbdfcc;
}
.modal-header {
  border-bottom: none;
}
.modal-footer {
  border-top: none;
  justify-content: center;
}
#yesbtn,
#nobtn {
  margin: 10px;
  border: none;
  border-radius: 10px;
  background-color: #89ca9a;
  color: #3f3f3f;
  width: 120px;
  height: 30px;
  font-size: 18px;
  padding-top: 3px;
}
#box {
  height: 35px;
  width: 35px;
  color: #3d9956;
}
#saveModal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
