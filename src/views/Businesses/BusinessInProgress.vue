<template>
  <BusinessNavBar :Heading="Heading" :header="true" />
  <div class="mainBody">
    <router-link
      class="floating-right-bottom-btn"
      :to="{ name: 'BusinessAddProject' }"
    >
      <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
    </router-link>
    <h1 id="interest">
      <span>
        <router-link class="optionsOff" :to="{ name: 'BusinessHomePage' }"
          ><b>POSTED</b></router-link
        >
      </span>
      <span class="options">
        <b>IN PROGRESS</b>
      </span>
      <span>
        <router-link class="optionsOff" :to="{ name: 'BusinessCompleted' }"
          ><b>COMPLETED</b></router-link
        >
      </span>
    </h1>
    <hr />
    <div class="projectContainer">
      <div :key="item.key" v-for="(item) in testCollection">
        <Card
          :apply="false"
          :projectTitle="item.projectTitle"
          :description="item.description"
          :inProgress="true"
          @viewTasks="viewTasks(item.projectId, item.projectTitle)"
          :picture="item.profilePicture"
          :stat="item.status"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BusinessNavBar from "../../components/BusinessNavBar.vue";
import Card from "../../components/Card.vue";
import firebaseApp from "../../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  getDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import BusinessProfileForm from "./BusinessProfileForm.vue";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
const db = getFirestore(firebaseApp);

export default {
  name: "BusinessInProgress",
  components: {
    BusinessNavBar,
    Card,
  },
  computed: {
    ...mapState([
      "userEmail",
      "businessTaskId",
      "businessProjectId",
      "businessProjectTitle",
      "businessToDo",
      "businessInProgress",
      "businessPendingReview",
      "businessCompleted",
      "businessInProgProjects",
      "businessCompletedProjects",
      "businessStudents",
      "businessStudentsInProg",
      "businessStudentsComp",
    ]),
  },
  data() {
    return {
      Heading: "MY PROJECTS",
      testCollection: [],
      businessEmail: "",
      inProgProjects: [],
      BUSINESS_TO_DO_TEMP: [],
      BUSINESS_IN_PROGRESS_TEMP: [],
      BUSINESS_PENDING_REVIEW_TEMP: [],
      BUSINESS_COMPLETED_TEMP: [],
    };
  },
  methods: {
    ...mapMutations([
      "SET_BUSINESS_TASK_ID",
      "SET_BUSINESS_PROJECT_ID",
      "SET_BUSINESS_PROJECT_TITLE",
      "SET_BUSINESS_TO_DO",
      "SET_BUSINESS_IN_PROGRESS",
      "SET_BUSINESS_PENDING_REVIEW",
      "SET_BUSINESS_COMPLETED",
      "SET_BUSINESS_IN_PROG_PROJECTS",
      "SET_BUSINESS_COMPLETED_PROJECTS",
      "SET_BUSINESS_STUDENTS",
      "SET_BUSINESS_STUDENTS_IN_PROG",
      "SET_BUSINESS_STUDENTS_COMP",
    ]),

    // The function indivproj(key) isn't used for now
    indivproj(key) {
      console.log(JSON.stringify(this.testCollection[key].tasks));
      console.log(JSON.stringify(this.testCollection[key].projectId));
      this.$router.push({
        name: "BusinessManagement",
        params: {
          projectId: JSON.stringify(this.testCollection[key].projectId),
          projectTitle: JSON.stringify(this.testCollection[key].projectTitle),
        },
      });
      //console.log(key);
      //console.log(this.testCollection[key]);
    },
    //This function is not used
    isEqual(email) {
      return email == this.businessEmail;
    },

    async getProjects() {
      const ref = doc(db, "businesses", this.userEmail);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      this.SET_BUSINESS_IN_PROG_PROJECTS(data.inProgProjects);
      this.SET_BUSINESS_COMPLETED_PROJECTS(data.completedProjects);
    },

    async getStudents(id) {
      const projects = query(
        collection(db, "students"),
        where("inProgProjects", "array-contains", id)
      );
      let snapshot = await getDocs(projects);
      var students = [];
      var studentsInProg = [];
      var studentsComp = [];
      console.log(snapshot);
      snapshot.forEach(async (docs) => {
        let data = docs.data();
        students.push(data.email);
        studentsInProg.push(data.inProgProjects);
        studentsComp.push(data.completedProjects);
      });
      this.SET_BUSINESS_STUDENTS(students);
      this.SET_BUSINESS_STUDENTS_IN_PROG(studentsInProg);
      this.SET_BUSINESS_STUDENTS_COMP(studentsComp);
    },
    async viewTasks(projectId, projectTitle) {
      this.getStudents(projectId);
      this.getProjects();
      this.SET_BUSINESS_PROJECT_ID(projectId);
      this.SET_BUSINESS_PROJECT_TITLE(projectTitle);
      console.log("projectId", projectId);
      console.log("projectTitle", projectTitle);
      var id = projectId;
      var title = projectTitle;

      let docRef = await doc(db, "Project", id);
      let project = await getDoc(docRef);
      let tasks = project.data().Tasks;
      var toDoTask = [];
      var inProgressTask = [];
      var pendingReviewTask = [];
      var completedTask = [];
      tasks.forEach((document) => {
        console.log("document", document);
        if (document.taskStatus == "To do") {
          toDoTask.push({
            id: document.taskName,
            /*
              projectTitle: that.projectTitle,
              projectId: that.projectId,
              */
            comments: document.comments,
            documents: document.documents,
            currStatus: document.taskStatus,
            duedate: document.taskDueDate,
            taskname: document.taskName,
            shortdescription: document.taskDescription,
          });
        } else if (document.taskStatus == "In progress") {
          inProgressTask.push({
            id: document.taskName,
            /*
              projectTitle: that.projectTitle,
              projectId: that.projectId,
              */
            comments: document.comments,
            documents: document.documents,
            status: document.taskStatus,
            duedate: document.taskDueDate,
            taskname: document.taskName,
            shortdescription: document.taskDescription,
          });
        } else if (document.taskStatus == "Pending review") {
          pendingReviewTask.push({
            id: document.taskName,
            /*
              projectTitle: that.projectTitle,
              projectId: that.projectId,
              */
            comments: document.comments,
            documents: document.documents,
            status: document.taskStatus,
            duedate: document.taskDueDate,
            taskname: document.taskName,
            shortdescription: document.taskDescription,
          });
        } else if (document.taskStatus == "Completed") {
          completedTask.push({
            id: document.taskName,
            comments: document.comments,
            /*
              projectTitle: that.projectTitle,
              projectId: that.projectId,
              */
            documents: document.documents,
            status: document.taskStatus,
            duedate: document.taskDueDate,
            taskname: document.taskName,
            shortdescription: document.taskDescription,
          });
        }
      });
      console.log("business todo", toDoTask);
      console.log("business in progress", inProgressTask);
      console.log("business pending", pendingReviewTask);
      console.log("business todo", completedTask);
      this.SET_BUSINESS_TO_DO(toDoTask);
      this.SET_BUSINESS_IN_PROGRESS(inProgressTask);
      this.SET_BUSINESS_PENDING_REVIEW(pendingReviewTask);
      this.SET_BUSINESS_COMPLETED(completedTask);
      console.log("vuex todo", this.businessToDo);
      console.log("vuex in prog", this.businessInProgress);
      console.log("vuex pending", this.businessPendingReview);
      console.log("vuex completed", this.businessCompleted);
      this.$router.push({ name: "BusinessManagement" });
      //console.log(key);
      //console.log(this.testCollection[key]);
    },
  },
  mounted() {
    /*
    const auth = getAuth();
    this.businessEmail = auth.currentUser.email;
    console.log("email: " + this.businessEmail);
    */
    var userEmail = this.userEmail;
    const that = this;

    async function getInProgProjects() {
      const ref = doc(db, "businesses", userEmail);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      //console.log(data)
      that.inProgProjects = data.inProgProjects;
      var inProgProjects = data.inProgProjects;
      //console.log("inproglen",inProgProjects)
      for (var i = 0; i < inProgProjects.length; i++) {
        getProject(inProgProjects[i]).then((res) => {
          that.testCollection.push(res);
        });
      }
      console.log("inprogprojects", that.inProgProjects);
    }
    getInProgProjects();

    async function getProject(proj) {
      const ref = doc(db, "Project", proj);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      console.log(data);
      /*const docSnap2 = await getDoc(doc(db, "businesses", auth.currentUser.email));
      let data1 = docSnap2.data();
      var pictureprof = data1.finalProfile;
      if (typeof pictureprof === "undefined") {
        pictureprof =
          "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png";
      }
      console.log(that.testCollection)*/

      return {
        projectId: proj,
        projectTitle: data.Project_Title,
        description: data.Description,
        vacancies: data.Num_Of_Vacancies,
        allowance: data.Allowance,
        position: data.Position,
        projectStart: data.Project_Start,
        projectEnd: data.Project_End,
        tasks: data.Tasks,
        tags: data.Tags,
        newApplicants: data.New_Applicants,
        accApplicants: data.Acc_Applicants,
        rejApplicants: data.Rej_Applicants,
        posterId: data.poster_id,
        profilePicture: data.profPicture,
        status: data.Status,
      };
    }
    console.log(that.testCollection);

    /*async function fetchProject(identity) {
      let projects = collection(db, "Project", identity)
      let snapshot = await getDocs(projects);
      //const testCollection = [];
      const docSnap = await getDoc(doc(db, "businesses", businessEmail));
      let data1 = docSnap.data();
      var pictureprof = data1.finalProfile;
      if (typeof pictureprof === "undefined") {
        pictureprof =
          "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png";
      }
      return 
      snapshot.forEach((docs) => {
        let data = docs.data();
        var id = docs.id;
        testCollection.push({
          projectId: id,
          projectTitle: data.Project_Title,
          description: data.Description,
          vacancies: data.Num_Of_Vacancies,
          allowance: data.Allowance,
          position: data.Position,
          projectStart: data.Project_Start,
          projectEnd: data.Project_End,
          tasks: data.Tasks,
          tags: data.Tags,
          newApplicants: data.New_Applicants,
          accApplicants: data.Acc_Applicants,
          rejApplicants: data.Rej_Applicants,
          posterId: data.poster_id,
          profilePicture: pictureprof,
        });
      });
      that.testCollection = testCollection;
      console.log(testCollection);
    }
    fetchProject();*/
  },
};
</script>

<style scoped>
.navbar-custom {
  background-color: #004a23;
}

#title {
  color: white;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 0px;
}

.btn {
  margin: 10px;
}

.mainBody {
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: scroll;
  padding-bottom: 550px;
  /*
    filter: blur(5px);
    */
}

.projectContainer {
  margin-left: 30px;
}

#interest {
  text-align: left;
  font-size: 28px;
  margin: 30px 30px 0px 30px;
  color: #606060;
}

hr {
  border: 0;
  border-top: 2px solid #606060;
  width: 90%;
  margin: 5px 0px 16px 38px;
}

.options {
  font-size: 15px;
  padding: 5px 25px;
  margin-left: 15px;
  border-radius: 30px; /* or 50% */
  background-color: #0e8044;
  color: white;
  text-align: center;
}

.optionsOff {
  font-size: 15px;
  padding: 10px 25px;
  margin-left: 15px;
  border-radius: 30px; /* or 50% */
  background-color: F5F5F5;
  text-align: center;
  color: #606060;
  text-decoration: none;
}

.floating-right-bottom-btn {
  position: fixed;
  right: 40px;
  bottom: 50px;
  background-color: white;
  border-width: 0px;
  height: 70px;
  width: 70px;
  z-index: 110;
  border-radius: 50%;
  padding: 0px;
}

#plusIcon {
  height: 70px;
  width: 70px;
  color: #004a23;
}

.optionsOff:hover {
  color: #0e8044;
}
</style>
