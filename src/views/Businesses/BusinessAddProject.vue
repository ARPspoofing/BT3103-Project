<template>
  <BusinessNavBar :Heading="Heading" :header="true" />
  <div class="mainBody">
    <button @click="goback" id="backButton">
      <i class="fa-solid fa-angles-left"></i>
      Back to Projects
    </button>
    <form id="projectForm">
      <div class="inputs">
        <label for="projectTitle">Project Title*</label>
        <input
          type="text"
          id="projectTitle"
          required=""
          placeholder="Project Title"
        />
        <div class="errorMsg" v-if="projectTitleErrorPresent">
          {{ this.projectTitleErrorMessage }}
        </div>
        <br /><br />

        <label for="position">Position*</label>
        <input type="text" id="position" required="" placeholder="Position" />
        <div class="errorMsg" v-if="positionErrorPresent">
          {{ this.positionErrorMessage }}
        </div>
        <br /><br />

        <label for="noOfVacancies">Number of Vacancies*</label>
        <input
          type="number"
          id="noOfVacancies"
          required=""
          placeholder="Number of Vacancies"
        />
        <div class="errorMsg" v-if="vacancyErrorPresent">
          {{ this.vacancyErrorMessage }}
        </div>
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
        />
        <p>to</p>
        <input
          type="date"
          id="projectPeriodEnd"
          required=""
          placeholder="Choose End Date"
          style="width: 228px; margin-left: 15px"
        />
        <div class="errorMsg" v-if="projectPeriodErrorPresent">
          {{ this.projectPeriodErrorMessage }}
        </div>
        <br /><br />

        <label for="projectAllowance">Allowance (in SGD)*</label>
        <input
          type="number"
          id="projectAllowance"
          required=""
          placeholder="Allowance"
        />
        <div class="errorMsg" v-if="allowanceErrorPresent">
          {{ this.allowanceErrorMessage }}
        </div>
        <br /><br />

        <label for="projectTags">Tags*</label>
        <select
          v-model="selected"
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
        <div class="errorMsg" v-if="tagsErrorPresent">
          {{ this.tagsErrorMessage }}
        </div>
        <br /><br />

        <label for="projectDescription">Description</label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          rows="4"
          cols="60"
          placeholder="Project Description"
        ></textarea>
        <br /><br />

        <label for="projectDeliverables">Deliverables*</label>
        <button id="addDeliverableButton" @click="addTask">
          <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
          <p>Add deliverables</p>
        </button>
        <br />
        <br />
        <div
          class="previous"
          v-for="(task, counter) in tasks"
          v-bind:key="counter"
        >
          <button id="deleteDeliverable" @click="deleteTask(counter)">
            <i class="fa fa-times" id="crossIcon"></i>
          </button>
          <br />
          <div class="errorMsg" v-if="deliverablesErrorPresent">
            {{ this.deliverablesErrorMessage }}
          </div>

          <label for="duration">Task Name*</label>
          <input type="text" v-model.lazy="task.taskName" required />
          <div class="errorMsg" v-if="deliverableTaskErrorPresent">
            {{ this.deliverableTaskErrorMessage }}
          </div>
          <br /><br />
          <label for="description">Description</label>
          <input type="text" v-model.lazy="task.taskDescription" required />
          <br /><br />
          <label for="duedate">Due Date*</label>
          <input type="date" v-model.lazy="task.taskDueDate" required />
          <div class="errorMsg" v-if="deliverableDueDateErrorPresent">
            {{ this.deliverableDueDateErrorMessage }}
          </div>
        </div>
      </div>
      <button
        id="saveButton"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#saveModal"
      >
        Save
      </button>
      <div
        class="modal fade"
        id="saveModal"
        tabindex="-1"
        aria-labelledby="saveModalLabel"
        aria-hidden="true"
        data-bs-backdrop="false"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="words">
                <i class="fa-solid fa-circle-plus" id="addIcon"></i>
                <p>Add project?</p>
              </div>
              <span>
                <div class="applybtns">
                  <button
                    type="button"
                    id="yesbtn"
                    data-bs-dismiss="modal"
                    v-on:click="saveProject()"
                  >
                    Yes
                  </button>
                  <button type="button" id="nobtn" data-bs-dismiss="modal">
                    No
                  </button>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BusinessNavBar from "../../components/BusinessNavBar.vue";
import firebaseApp from "../../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
const db = getFirestore(firebaseApp);
const auth = getAuth();
//console.log(auth.currentUser);

export default {
  data() {
    return {
      Heading: "ADD PROJECT",
      selected: [],
      tasks: [
        {
          taskName: "",
          taskDescription: "",
          taskDueDate: "",
          taskStatus: "To do",
          taskIssueDate: new Date().toISOString().split("T")[0],
        },
      ],
      projectTitleErrorPresent: false,
      positionErrorPresent: false,
      vacancyErrorPresent: false,
      allowanceErrorPresent: false,
      projectPeriodErrorPresent: false,
      tagsErrorPresent: false,
      //deliverablesErrorPresent: false,
      deliverableTaskErrorPresent: false,
      deliverableDueDateErrorPresent: false,
      projectTitleErrorMessage: "",
      positionErrorMessage: "",
      vacancyErrorMessage: "",
      projectPeriodErrorMessage: "",
      tagsErrorMessage: "",
      allowanceErrorMessage: "",
      //deliverablesErrorMessage: "",
      deliverableTaskErrorErrorMessage: "",
      deliverableDueDateErrorErrorMessage: "",
    };
  },
  computed: {
    ...mapState(["userEmail"]),
  },
  mounted() {
    var email = this.userEmail;
  },
  methods: {
    goback() {
      this.$router.push({
        name: "BusinessHomePage",
        params: {},
      });
    },
    addTask() {
      this.tasks.push({
        taskName: "",
        taskDescription: "",
        taskDueDate: "",
        taskStatus: "To do",
        taskIssueDate: new Date().toISOString().split("T")[0],
        comments: [],
      });
    },
    deleteTask(counter) {
      this.tasks.splice(counter, 1);
    },

    async saveProject() {
      this.projectTitleErrorPresent = false;
      this.positionErrorPresent = false;
      this.vacancyErrorPresent = false;
      this.projectPeriodErrorPresent = false;
      this.tagsErrorPresent = false;
      this.deliverablesErrorPresent = false;
      this.allowanceErrorPresent = false;
      this.deliverableTaskErrorPresent = false;
      this.deliverableDueDateErrorPresent = false;
      var a = document.getElementById("projectTitle").value;
      var b = document.getElementById("position").value;
      var c = document.getElementById("noOfVacancies").value;
      var d = document.getElementById("projectPeriodStart").value;
      var e = document.getElementById("projectPeriodEnd").value;
      var f = document.getElementById("projectAllowance").value;

      if (typeof this.selected == String) {
        const tagArray = new Array();
        tagArray.push(this.selected);
        var g = tagArray;
      } else {
        var g = this.selected;
      }

      //console.log(g);
      var h = document.getElementById("projectDescription").value;
      var i = this.tasks;
      var j = [];
      var k = [];
      var l = [];
      // var today = new Date();
      // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var m = new Date();

      if (a == "") {
        this.projectTitleErrorPresent = true;
        this.projectTitleErrorMessage = "Please enter a Project Title";
      }
      if (b == "") {
        this.positionErrorPresent = true;
        this.positionErrorMessage = "Please enter a Position";
      }
      if (c == "") {
        this.vacancyErrorPresent = true;
        this.vacancyErrorMessage = "Please enter the Number of Vacancies";
      }
      if (d == "" || e == "") {
        this.projectPeriodErrorPresent = true;
        this.projectPeriodErrorMessage = "Please enter the Project Period";
      }
      if (f == "") {
        this.allowanceErrorPresent = true;
        this.allowanceErrorMessage = "Please enter an Allowance amount";
      }
      if (this.selected.length == 0) {
        this.tagsErrorPresent = true;
        this.tagsErrorMessage = "Please select at least 1 tag";
      } else if (this.selected.length > 3) {
        this.tagsErrorPresent = true;
        this.tagsErrorMessage = "Please select at most 3 tags";
      }
      /*console.log(this.tasks.length)
      if (i.length < 1 ) {
        this.deliverablesErrorPresent = true;
        this.deliverablesErrorMessage = "Please enter at least one Deliverable";
      }*/

      /*for (i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].taskName == "") {
        this.deliverableTaskErrorPresent = true;
        this.deliverableTaskErrorMessage = "Please enter Task Name";
      }  
      if (this.tasks[i].taskDueDate == "") {
        this.deliverableDueDateErrorPresent = true;
        this.deliverableDueDateErrorMessage = "Please enter Task Due Date";
      }
    }*/

      if (
        !this.projectTitleErrorPresent &&
        !this.positionErrorPresent &&
        !this.vacancyErrorPresent &&
        !this.projectPeriodErrorPresent &&
        !this.tagsErrorPresent &&
        !this.allowanceErrorPresent
      ) {
        const docSnap1 = await getDoc(doc(db, "businesses", this.userEmail));
        let data1 = docSnap1.data();
        var pictureprof = data1.finalProfile;
        if (typeof pictureprof === "undefined") {
          pictureprof =
            "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png";
        }

        try {
          const docRef = await addDoc(collection(db, "Project"), {
            poster_id: this.userEmail,
            Project_Title: a,
            Position: b,
            Num_Of_Vacancies: c,
            Project_Start: d,
            Project_End: e,
            Allowance: f,
            Tags: g,
            Description: h,
            Tasks: i,
            New_Applicants: j,
            Acc_Applicants: k,
            Rej_Applicants: l,
            Posted_Date: m,
            profPicture: pictureprof,
            Status: "open",
            Application: "open",
          });

          //console.log(docRef);
          document.getElementById("projectForm").reset();
          this.$emit("added");
          this.$router.push({ name: "BusinessHomePage" });
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      }
    },
  },
  components: {
    BusinessNavBar,
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
  color: #004a23;
}

#saveModal {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #bbdfcc;
  border: none;
}

.modal-body p {
  text-align: center;
  color: #004a23;
  font-size: 22px;
}

.applybtns {
  width: max-content;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
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
}
.words {
  width: max-content;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  height: 40px;
}

#addIcon {
  height: 33px;
  width: 33px;
  color: #3d9956;
  float: left;
}

.modal-body p {
  text-align: center;
  width: 180px;
  margin-left: 15px;
}

.errorMsg {
  color: red;
  margin-top: 5px;
  text-align: left;
  margin-left: 210px;
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
