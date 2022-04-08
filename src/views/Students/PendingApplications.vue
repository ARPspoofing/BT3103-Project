<template>
  <StudentNavBar :header="true" :Heading="Heading" />
  <div class="mainBody">
    <h1 id="status">
      <router-link class="optionsOff" :to="{ name: 'OfferedApplications' }">
        <b>OFFERED</b>
      </router-link>
      <span>
        <span class="options">
          <b>PENDING</b>
        </span>
      </span>
      <span>
        <router-link class="optionsOff" :to="{ name: 'RejectedApplications' }"
          ><b>REJECTED</b></router-link
        >
      </span>
    </h1>
    <hr />
    <div
      class="projectContainer"
      :key="item.key"
      v-for="(item, index) in projects"
    >
      <Card
        :apply="false"
        :offered="false"
        :projectTitle="item.projectTitle"
        :description="item.description"
        :stat="stat"
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
  getDoc,
} from "firebase/firestore";
import { mapState } from "vuex";
const db = getFirestore(firebaseApp);
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "PendingApplications",
  components: {
    StudentNavBar,
    Card,
  },
  data() {
    return {
      Heading: "MY APPLICATIONS",
      stat: "pending",
      applied: [],
      projects: [],
    };
  },
  computed: {
    ...mapState(["userEmail"]),
  },
  mounted() {
    /*
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
    this.userEmail = auth.currentUser.email;
    */
    var userEmail = this.userEmail;
    const that = this;
    async function getAppliedProjects() {
      const ref = doc(db, "students", userEmail);
      const docSnap = await getDoc(ref);

      const response = await Promise.all(
        docSnap.data().appliedProjects.map(async (item) => {
          console.log("nested", item);
          if (item) {
            const finalResult = await getDoc(doc(db, "Project", item));
            that.projects.push({
              projectTitle: finalResult.data().Project_Title,
              description: finalResult.data().Description,
            });
          }
        })
      );
    }
    getAppliedProjects();

    async function getProject(proj) {
      const ref = doc(db, "Project", proj);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      return {
        projectTitle: data.Project_Title,
        description: data.Description,
      };
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
  padding: 5px 25px;
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

#appstatus {
  text-align: left;
  display: block;
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
}
</style>
