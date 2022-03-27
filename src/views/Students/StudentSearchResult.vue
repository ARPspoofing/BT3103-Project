<template>
  <StudentNavBar :search=true :header=true />
  <div v-if="loading">
    Loading
  </div>
  <div v-if="!loading" class="mainBody">   
    <button @click="toggleFilterMenu"> Open filter menu </button>
    <button @click="closeFilterMenu"> close filter menu </button>

  <transition name="filter">
     <Filter v-if="filterModal"/>
  </transition>
  
      
    <div @click="openFilter" ref="filterWrap" class="filter-wrap flex flex-column">
    
    </div> 
    <h1 id="status" class="searchDisplay" v-if = "!noProjectsPresent">
      Search results for {{receivedSearch}}:
    </h1>
   
    <hr/>
     <div v-if="noProjectsPresent" class = "noProject">
         <h1 class = "noProjectsText">Sorry, no projects matched your search {{receivedSearch}}. Please ensure that you have spelled your search correctly.</h1>
     </div>
      <div v-else class="projectContainer">
        <div :key="item.key" v-for="(item, key) in highestPriority">
          <Card :apply=true :projectTitle = "item.projectTitle" :description="item.description" @clickCard="indivprojFirst(key + 2*6)" @applicantbtn="addApplicantFirst(key + 2*6)"/>
        </div>

        <div :key="item.key" v-for="(item, key) in secondPriority">
          <Card :apply=true :projectTitle = "item.projectTitle" :description="item.description" @clickCard="indivprojSecond(key)" @applicantbtn="addApplicantSecond(key + 2*6)"/>
        </div>

        <div :key="item.key" v-for="(item, key) in thirdPriority">
          <Card :apply=true :projectTitle = "item.projectTitle" :description="item.description" @clickCard="indivprojThird(key)" @applicantbtn="addApplicantThird(key + 2*6)"/>
        </div>

        
        </div>
      </div>
 
</template>

<script>
import StudentNavBar from '../../components/StudentNavBar.vue'
import Card from '../../components/Card.vue'
import firebaseApp from '../../firebase.js';
import { getFirestore } from "firebase/firestore"
import { collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore"
import {signOut} from "firebase/auth"
import {mapState} from "vuex"
import {mapMutations} from "vuex"
import Filter from '../../components/Filter.vue'
const db = getFirestore(firebaseApp);

export default {
  name: 'StudentSearchResult',
  components: {

    StudentNavBar,
    Card,
    Filter
  },
  
  computed: {
    ...mapState(['filterModal'])
  },

  data() {
    return {
     
      highestPriority: [],
      secondPriority:[],
      thirdPriority:[],
      noProjectsPresent:true,
      receivedSearch:'',
      loading:false,

    }
  },

  methods: {
    ...mapMutations(['TOGGLE_FILTER']),
    toggleFilterMenu() {
      this.TOGGLE_FILTER()
    },
    closeFilterMenu() {
      this.TOGGLE_FILTER()
    },
    indivprojFirst(key) {
      this.$router.push({
        name:'StudentViewProjectInfo', 
        params: {
          items: JSON.stringify(this.highestPriority[key]),
        },
      })
      console.log(key)
      console.log(this.highestPriority[key])
  },

  indivprojSecond(key) {
      this.$router.push({
        name:'StudentViewProjectInfo', 
        params: {
          items: JSON.stringify(this.secondPriority[key]),
        },
      })
      console.log(key)
      console.log(this.secondPriority[key])
  },

  indivprojThird(key) {
      this.$router.push({
        name:'StudentViewProjectInfo', 
        params: {
          items: JSON.stringify(this.thirdPriority[key]),
        },
      })
      console.log(key)
      console.log(this.thirdPriority[key])
  },
    
  },

  mounted() {
    const that = this;
    const gottenSearch = that.$route.params.searched;
    this.receivedSearch = gottenSearch;
        
    
    async function setProjects() {
        
      const highestPriorityIds = that.$route.params.displayFirst;
      const secondPriorityIds = that.$route.params.displaySecond;
      const thirdPriorityIds = that.$route.params.displayThird;
      const highestPriority = [];
      const secondPriority = [];  
      const thirdPriority = []
      console.log(highestPriorityIds)
      let snapshot = await getDocs(collection(db, "Project"))
      const testCollection = [];
      snapshot.forEach((docs) => {
        let data = docs.data()
        if (highestPriorityIds.includes(docs.id)) {
        highestPriority.push({ 
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
        } else if (secondPriorityIds.includes(docs.id)) {
          secondPriority.push({ 
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

        } else if (thirdPriorityIds.includes(docs.id)) {
            thirdPriority.push({ 
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

        }
        
      });


      that.highestPriority = highestPriority
      that.secondPriority = secondPriority
      that.thirdPriority = thirdPriority
      if(highestPriority.length > 0 || secondPriority.length > 0 || thirdPriority.length > 0) {
          that.noProjectsPresent = false;
      } 
      
    }
    setProjects();
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
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  /*
    Transition for filter menu
  */
  .filter-enter-active {
    transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
  }

  .filter-leave-active {
    transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
  }

  .filter-enter-from {
    transform:translateX(-700px);
    /*transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);*/
  }

  .filter-leave-to {
    transform:translateX(-700px);
    /*transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);*/
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

  .noProject{
      flex:left;  
      font-size:30px;
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