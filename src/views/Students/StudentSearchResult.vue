<template>
  <StudentNavBar :search=true :header=true />
  <div v-if="loading">
    Loading
  </div>
  <div v-if="!loading" class="mainBody">   
    <!-- <button class="purple button" @click="toggleFilterMenu">Filter</button> -->
    <!--
    <button @click="closeFilterMenu"> close filter menu </button>
    -->

  <transition name="filter">
     <Filter @submitFilter=closeFilterMenu v-if="filterModal"/>
  </transition>
  
      
    <div @click="openFilter" ref="filterWrap" class="filter-wrap flex flex-column">
    
    </div> 
    <h1 id="status" class="searchDisplay" v-if = "!noProjectsPresent">
      <button class="button" @click="toggleFilterMenu">Filter</button>
      <button class="button" @click="toggleSortMenu">Sort</button>
      Search results for {{receivedSearch}}:
      <hr/>
    </h1>
    
     <div v-if="noProjectsPresent" class = "noProject">
         <h1 class = "noProjectsText">Sorry, no projects matched your search <span style="color: green">{{receivedSearch}}</span>. <br> ensure that you have spelled your search correctly.</h1>
          <!-- {{GET_SEARCH_DATA}} -->        
     </div>
      <div v-else class="projectContainer">
        <div :key="item.key" v-for="(item, key) in highestPriority">
          <Card :apply=true :projectTitle = "item.projectTitle" :description="item.description" @clickCard="indivprojFirst(key /*+ 2*6*/)" @applicantbtn="addApplicantFirst(key + 2*6)"/>
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
import {mapGetters} from "vuex"
import Filter from '../../components/Filter.vue'
const db = getFirestore(firebaseApp);

export default {
  name: 'StudentSearchResult2',
  components: {
    StudentNavBar,
    Card,
    Filter,
  },
  
  computed: {
    ...mapState(['filterModal','searchData','highestPriorityIds','secondPriorityIds','thirdPriorityIds']),
    ...mapGetters(['GET_SEARCH_DATA']),
    
  },

  data() {
    return {
     
      highestPriority: [],
      secondPriority:[],
      thirdPriority:[],
      noProjectsPresent:true,
      receivedSearch:'',
      loading:false,
      //store all id in one array
      searchId: null,
      //store all id in separate arrays
    }
  },

  methods: {
    ...mapMutations(['TOGGLE_FILTER']),
    alertFunc() {
      this.$refs.toggle.$el.click()
    },
    toggleFilterMenu() {
      this.TOGGLE_FILTER()
    },
    closeFilterMenu(e) {
      alert('close')
      this.TOGGLE_FILTER()
    },
    /*
    populateSearch() {
      this.searchId = this.searchData
    },
    */
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
    //data variable = state variable 
    this.searchId = this.searchData
    this.highestPriority = this.highestPriorityIds
    this.secondPriority = this.secondPriorityIds
    this.thirdPriority = this.thirdPriorityIds
    /*
    alert(this.highestPriority)
    alert(this.secondPriority)
    alert(this.thirdPriority)
    */
    
    async function setProjects() {
      //Non VUEX version. Uncomment if VUEX does not work
      /*
      const highestPriorityIds = that.$route.params.displayFirst;
      const secondPriorityIds = that.$route.params.displaySecond;
      const thirdPriorityIds = that.$route.params.displayThird;
      */
     //VUEX version
      //const highestPriorityIds = that.searchId
      const highestPriorityIds = that.highestPriority
      const secondPriorityIds = that.secondPriority
      const thirdPriorityIds = that.thirdPriority
      //const highestPriorityIds = that.searchData
      

      const highestPriority = [];
      const secondPriority = [];  
      const thirdPriority = [];
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
    /*flex-grow: 1;
    display: flex; */
    flex-direction: row; 
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
    transform:translateX(700px);
    /*transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);*/
  }

  .filter-leave-to {
    transform:translateX(700px);
    /*transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);*/
  }
  
  #status {
    text-align: left;
    font-size: 28px;
    margin: 30px 30px 0px 40px;
    color: #606060;
  }

  hr {
    border: 0;
    border-top: 2px solid #606060;
    width: 83%;
    margin: 5px 0px 16px 0px;
    position: sticky;
    z-index: -1;
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



  /* GENERAL STYLES */
.visuallyHidden {
    position: absolute; 
    overflow: hidden; 
    clip: rect(0 0 0 0); 
    height: 1px; width: 1px; 
    margin: -1px; padding: 0; border: 0; 
}

h1 {
    text-align: center;
    margin: 30px 30px 0px 50px;
}

.container {
    width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}

button,
    .button {
    cursor: pointer;
    padding: 8px 44px;
    border-radius: 8px;
    border: none;
    font-size: 16px;
    margin-right: 20px;
    color:white;
    float: right;
    background-color: #ec9f39;
    img {
            margin-right: 4px;
          }
    }

    .save {
        div {
            flex:1;
        }
    }

    .right {
        margin-left:80%;
    }

    
</style>