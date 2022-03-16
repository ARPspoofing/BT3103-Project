<template>
  <NavBar :search=true :header=false />
  <div class="mainBody">
    <h1 id="interest">Projects You May Like</h1>
    <!--
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else>
    <div v-for="(project, index) in projectList" v-bind:key=index >
      {{project.projectTitle}}
      {{project.description}}
        <Card :projectTitle=project.projectTitle :description=project.description />
      </div>
      </div>-->
    <hr/>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="carouContainer">
            <div :key="item.key" v-for="(item, index) in testCollection">
              <Card v-if="index <= 5" :projectTitle = "item.projectTitle" :description="item.description"/>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="carouContainer">
            <div :key="item.key" v-for="(item, index) in testCollection.slice(6)">
              <Card v-if="index <= 5" :projectTitle = "item.projectTitle" :description="item.description"/>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="carouContainer">
            <div :key="item.key" v-for="(item, index) in testCollection.slice(12)">
              <Card v-if="index <= 5" :projectTitle = "item.projectTitle" :description="item.description"/>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <br><br>
  
    <h1 id="latest">Latest Projects</h1>
    <hr/>
    <div class="carouContainer">
      <div :key="item.key" v-for="(item, index) in testCollection">
        <Card v-if="index <= 5" :projectTitle = "item.projectTitle" :description="item.description"/>
      </div>
    </div>
<<<<<<< HEAD

    <div class="card-text">
      <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <button href="#" class="btn-apply">Apply Now</button>
      </div>
      
      <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <button href="#" class="btn-apply">Apply Now</button>
      
      </div>
      <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <button href="#" class="btn-apply">Apply Now</button>
      </div>
    </div>
    <div :key="item.key" v-for="item in testCollection">
      <Card :projectTitle = "item.projectTitle" :description="item.description"/>
    </div>
=======
>>>>>>> emily
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
  name: 'StudentHomePage',
  components: {
    NavBar, 
    Card
  },

  data() {
    return {
      Heading: " ",
      testCollection: [],
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

  .mainBody {
    background-color: #F5F5F5;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow-y: scroll;
    padding-bottom: 550px;
  }

  .carouContainer {
    margin-left: 30px;
  }

  #interest, #latest {
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

  .carousel-item {
    height: 450px; 
  }

  .carousel-control-next,
  .carousel-control-prev  {
    filter: invert(100%);
  }

</style>
