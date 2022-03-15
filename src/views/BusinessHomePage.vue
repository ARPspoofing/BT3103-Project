<template>
  <!--
  <nav class="navbar navbar-expand-lg navbar-custom">
    <img src="../assets/Pathfinders.png" class="d-inline-block align-top" width=250 alt="logo">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <h2 id="title"><b>MY PROJECTS</b></h2>
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
    <router-link class="floating-right-bottom-btn" :to="{name:'BusinessAddProject'}">
      <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
    </router-link>
    <h1 id="interest">
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
      <div class="card-body" @click="indivproj">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
      </div>
      
      <div class="card-body" @click="indivproj">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content" @click="indivproj">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
      </div>

      <div class="card-body" @click="indivproj">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
      </div>
      <div :key="item.key" v-for="item in testCollection" @click="indivproj">
        <Card :projectTitle = "item.projectTitle" :description="item.description"/>
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
    indivproj() {
      this.$router.push('project')
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
            description: data.Description
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

  .card-text {
    width: 100%;
    margin: 15px;
  }

  .card-body {
    background-color: #F2F5F7;
    border-radius: 8px;
    width: 30%;
    float: left;
    padding: 20px;
    border: 2px solid #0E8044;
    margin: 10px;
    box-shadow: 1px 1px grey;
  }

  .card-body:hover {
    background-color: rgba(236, 236, 236, 0.993);
  }

  .card-title {
    display: inline-block;
  }

  .card-content {
    text-align: left;
    margin-bottom: 10px;
  }

  .clogo {
    text-align: left;
  }

  .logo {
    vertical-align: left;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>