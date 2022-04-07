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
      <span>
        <router-link class="optionsOff" :to="{ name: 'BusinessInProgress' }"
          ><b>IN PROGRESS</b></router-link
        >
      </span>
      <span class="options">
        <b>COMPLETED</b>
      </span>
    </h1>
    <hr />
    <div class="projectContainer">
      <div :key="item.key" v-for="(item, key) in testCollection">
        <Card
          :apply="false"
          :projectTitle="item.projectTitle"
          :description="item.description"
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
} from "firebase/firestore";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import BusinessProfileForm from "./BusinessProfileForm.vue";
import { mapState } from "vuex";
const db = getFirestore(firebaseApp);

export default {
  name: "BusinessCompleted",
  components: {
    BusinessNavBar,
    Card,
  },
  computed: {
    ...mapState(["userEmail"]),
  },
  data() {
    return {
      Heading: "MY PROJECTS",
      testCollection: [],
      businessEmail: "",
      completedProjects: [],
    };
  },
  mounted() {
    var userEmail = this.userEmail;
    const that = this;

    async function getCompletedProjects() {
      const ref = doc(db, "businesses", userEmail);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      that.completedProjects = data.completedProjects;
      var completedProjects = data.completedProjects;
      for (var i = 0; i < completedProjects.length; i++) {
        getProject(completedProjects[i]).then((res) => {
          that.testCollection.push(res);
        });
      }
    }
    getCompletedProjects();

    async function getProject(proj) {
      const ref = doc(db, "Project", proj);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      console.log(data);

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
  },
};
</script>

<style scoped>
.dropdown {
  width: 50%;
}
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
  padding-bottom: 1000px;
  margin-bottom: 100px;
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

.optionsOff:hover {
  color: #0e8044;
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

.multiselect-tag.is-user {
  padding: 5px 8px;
  border-radius: 22px;
  background: #bbdfcc;
  margin: 3px 3px 8px;
  width: 350px;
}
</style>
