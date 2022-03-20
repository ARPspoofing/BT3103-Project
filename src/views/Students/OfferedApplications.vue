<template>
  <StudentNavBar :header="true" :Heading="Heading" />
  <div class="mainBody">
    <h1 id="status">
      <span class="options">
        <b>OFFERED</b>
      </span>
      <span>
        <router-link class="optionsOff" :to="{ name: 'PendingApplications' }"
          ><b>PENDING</b></router-link
        >
      </span>
      <span>
        <router-link class="optionsOff" :to="{ name: 'RejectedApplications' }"
          ><b>REJECTED</b></router-link
        >
      </span>
    </h1>
    <hr />
    <div class="projectContainer" :key="item.key" v-for="(item, index) in projects">
      <Card
        :apply="false"
        :projectTitle="item.projectTitle"
        :description="item.description"
        :stat="stat"
        offered
      />
    </div>
  </div>
</template>

<script>
import StudentNavBar from "../../components/StudentNavBar.vue";
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
  getDoc
} from "firebase/firestore";
const db = getFirestore(firebaseApp);
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "OfferedApplications",
  components: {
    StudentNavBar,
    Card,
  },
  data() {
    return {
      Heading: "MY APPLICATIONS",
      stat: "offered",
      userEmail: "",
      offered: [],
      projects: [],
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
    this.userEmail = auth.currentUser.email;
    //console.log(this.userEmail)

    const that = this
    async function getOfferedProjects() {
      const ref = doc(db, "students", auth.currentUser.email);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      that.offered = data.offeredProjects
      for(var i = 0; i < data.offeredProjects.length; i++) {
        getProject(data.offeredProjects[i]).then((res)=>{that.projects.push(res)})
      }
      console.log(that.projects)
      //console.log(that.applied)
    }
    getOfferedProjects()
    
    async function getProject(proj) {
      const ref = doc(db, "Project", proj);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      return {projectTitle: data.Project_Title, description: data.Description}
    }
  },
};
</script>

<style>
.mainBody {
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: scroll;
  padding-bottom: 550px;
}

.projectContainer {
  margin-left: 30px;
}

#status {
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
  padding: 10px 25px;
  margin-left: 15px;
  border-radius: 30px; /* or 50% */
  background-color: #0e8044;
  color: white;
  text-align: center;
  text-decoration: none;
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
</style>
