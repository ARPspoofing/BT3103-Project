<template>
<BusinessNavBar :Heading="Heading" :header=true />
  <div class="mainBody">
    <router-link class="floating-right-bottom-btn" :to="{name:'BusinessAddProject'}">
      <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
    </router-link>
    <h1 id="interest">
      <span>
        <router-link class="optionsOff" :to="{name:'BusinessHomePage'}" ><b>POSTED</b></router-link>
      </span>
      <span class="options">
        <b>IN PROGRESS</b>
      </span>
      <span>
        <router-link class="optionsOff" :to="{name:'BusinessCompleted'}" ><b>COMPLETED</b></router-link>
      </span>
    </h1>
    <hr/>
    <div class="projectContainer">
      <div :key="item.key" v-for="(item, key) in testCollection">
        <Card
          :apply="false"
          :projectTitle="item.projectTitle"
          :description="item.description"
          @clickCard="indivproj(key)"
          :picture="item.profilePicture"
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
import BusinessProfileForm from './BusinessProfileForm.vue'
const db = getFirestore(firebaseApp);

export default {
  name: 'BusinessInProgress',
  components: {
    BusinessNavBar,
    Card,
  },
  data() {
    return {
      Heading: "MY PROJECTS",
      testCollection: [],  
      businessEmail: "",
      inProgProjects: [],
    }
  },
  methods: {
    indivproj(key) {
      this.$router.push({
        name: "IndividualProjectInfo",
        params: {
          items: JSON.stringify(this.testCollection[key]),
        },
      });
      //console.log(key);
      //console.log(this.testCollection[key]);
    },

    isEqual(email) {
      return email == this.businessEmail;
    },
  },
  mounted() {
    const auth = getAuth();
    this.businessEmail = auth.currentUser.email;
    console.log("email: " + this.businessEmail);

    const that = this;

    async function getInProgProjects() {
      const ref = doc(db, "businesses", auth.currentUser.email);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      that.inProgProjects = data.inProgProjects 
      var inProgProjects = data.inProgProjects
      for (var i = 0; i < inProgProjects.length; i++) {
        getProject(inProgProjects[i]).then((res) => {that.testCollection.push(res)})
      }
      console.log(that.inProgProjects)
    }
    getInProgProjects();

    async function getProject(proj) {
      const ref = doc(db, "Project", proj);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();

      /*const docSnap2 = await getDoc(doc(db, "businesses", auth.currentUser.email));
      let data1 = docSnap2.data();
      var pictureprof = data1.finalProfile;
      if (typeof pictureprof === "undefined") {
        pictureprof =
          "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png";
      }
      console.log(that.testCollection)*/

      return {projectId: proj,
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
          profilePicture: data.profPicture,}
    }
    console.log(that.testCollection)
    
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
  }
}
</script>

<style scoped>
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
  }

  .mainBody {
    background-color: #F5F5F5;
    width: 100%;
    height: 100%;
    position: fixed;
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
    background-color: #0E8044;
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
    position : fixed;
    right : 40px;
    bottom : 50px;
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
    color: #004A23;
  }
</style>