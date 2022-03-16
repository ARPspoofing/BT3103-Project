<template>
  <NavBar :Heading="Heading" :header=true />
  <div class="mainBody">
    <router-link class="floating-right-bottom-btn" :to="{name:'BusinessAddProject'}">
      <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
    </router-link>
    <h1 id="status">
      <span class="options">
        <b>POSTED</b>
      </span>
      <span>
        <router-link class="optionsOff" :to="{name:'BusinessInProgress'}" ><b>IN PROGRESS</b></router-link>
      </span>
      <span>
        <router-link class="optionsOff" :to="{name:'BusinessCompleted'}" ><b>COMPLETED</b></router-link>
      </span>
    </h1>
    <hr/>
      <div class="projectContainer">
        <div :key="item.key" v-for="(item, key) in testCollection">
          <Card :apply=false :projectTitle = "item.projectTitle" :description="item.description" @click="indivproj(key)"/>
        </div>
      </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Card from '../components/Card.vue'
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore"
const db = getFirestore(firebaseApp);

export default {
  name: 'BusinessHomePage',
  components: {
    NavBar,
    Card
  },

  data() {
    return {
      Heading: "MY PROJECTS",
      testCollection: [],
    }
  },

  methods: {
    indivproj(key) {
      this.$router.push({
        name:'IndividualProjectInfo', 
        params: {
          /*
          projectTitle: this.testCollection[key].projectTitle,
          description:this.testCollection[key].description,
          vacancies: this.testCollection[key].vacancies,
          allowance: this.testCollection[key].allowance,
          position: this.testCollection[key].position,
          projectStart: this.testCollection[key].projectStart,
          projectEnd: this.testCollection[key].projectEnd,
          tasks: JSON.stringify(this.testCollection[key].tasks),
          tags: JSON.stringify(this.testCollection[key].tags),*/
          items: JSON.stringify(this.testCollection[key]),
        },
      })
      console.log(key)
      console.log(this.testCollection[key])
  }
  },

  mounted() {
    const that = this;
    async function fetchProject() {
      let snapshot = await getDocs(collection(db, "Project"))
      const testCollection = [];
      snapshot.forEach((docs) => {
        let data = docs.data()
        testCollection.push({ 
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
        });
      });
      that.testCollection = testCollection
      console.log(testCollection)
    }
    fetchProject();
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
    background: #F8F8F8; 
  }

  #plusIcon {
    height: 70px;
    width: 70px;
    color: #004A23;
  }
</style>