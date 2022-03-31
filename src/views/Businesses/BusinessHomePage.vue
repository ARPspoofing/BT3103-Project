<template>
  <BusinessNavBar :Heading="Heading" :header=true />
  <BusinessProfileForm @success='close' v-if='!profileFormCreated'/>
  <div :class="{blur:!profileFormCreated,mainBody:foreverTrue}">
    <router-link class="floating-right-bottom-btn" :to="{name:'BusinessAddProject'}">
      <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
    </router-link>
    <h1 id="status">
      <span class="options">
        <b>POSTED</b>
      </span>
      <span>
        <router-link class="optionsOff" :to="{ name: 'BusinessInProgress' }"
          ><b>IN PROGRESS</b></router-link
        >
      </span>
      <span>
        <router-link class="optionsOff" :to="{ name: 'BusinessCompleted' }"
          ><b>COMPLETED</b></router-link
        >
      </span>
    </h1>
    <hr />
    <h1></h1>
    <div class="projectContainer">
      <div :key="item.key" v-for="(item, key) in testCollection">
        <Card
          v-if="isEqual(item.posterId)"
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
import {useRouter} from "vue-router"
import {mapState} from "vuex"
import {mapMutations} from "vuex"
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
const router = useRouter();

export default {
  name: "BusinessHomePage",
  components: {
    BusinessNavBar,
    Card,
    BusinessProfileForm
  },
  data() {
    return {
      Heading: "MY PROJECTS",
      testCollection: [],
      profileFormCreated: true,
      foreverTrue: true,    
      businessEmail: '',
    };
  },
  computed: {
    ...mapState(['userEmail']),
  },
  methods: {
    close(e) {
      this.profileFormCreated = e
      this.$router.push({name:'BusinessHomePage'})

    },
    indivproj(key) {
      this.$router.push({
        name: "IndividualProjectInfo",
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
      });
      console.log(key);
      console.log(this.testCollection[key]);
    },

    isEqual(email) {
      return email == this.businessEmail;
    },
  },

  created() {
    var that = this
    /*
    var userEmail
    var currUser = getAuth().onAuthStateChanged(function (user) {
      if (user) {
        //this.profileFormCreated = currUser.email
        //console.log(this.profileFormCreated)
        userEmail = user.email
      }
    })
    */
    var userEmail = this.userEmail
    //var userEmail = window.localStorage.getItem('emailForSignIn')
     async function profileFormCreatedCheck() {
      var profileFormCreated = false;
      
      let snapshot = await getDocs(collection(db,'businesses'))
      /*
      if (snapshot.profileFormCreated == true) {
        profileFormCreated = true
      }
      that.profileFormCreated = profileFormCreated
      */
     snapshot.forEach((doc) => (doc.id==userEmail) ? profileFormCreated = doc.data().profileFormCreated : profileFormCreated = profileFormCreated )
     that.profileFormCreated = profileFormCreated
    }
    profileFormCreatedCheck()


    /*
    var currUser = getAuth().currentUser
    this.profileFormCreated = currUser.email
    */

  },
  mounted() {
    /*
    const auth = getAuth().currentUser.email
    console.log("curr user",auth)
    */
    //console.log("auth",auth)
    /*
    const auth = getAuth();
    this.businessEmail = auth.currentUser.email;
    console.log("email: " + this.businessEmail);
    */
    const that = this;
  
    async function fetchProject() {
      //var businessEmail = auth.currentUser.email;
      //var businessEmail = window.localStorage.getItem('emailForSignIn')
      var businessEmail = that.userEmail
      //order projects by posted date, from latest to oldest
      let projects = query(collection(db, "Project"), orderBy("Posted_Date", "desc"));
      let snapshot = await getDocs(projects);
      const testCollection = [];
      const docSnap = await getDoc(doc(db, "businesses", businessEmail));
      let data1 = docSnap.data();
      var pictureprof = data1.finalProfile;
      if (typeof pictureprof === "undefined") {
        pictureprof =
          "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png";
      }

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
    fetchProject();
    /*
    profileFormCreatedCheck();
    */
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

  .blur {
  filter: blur(5px); 
  }

  .mainBody {
    background-color: #F5F5F5;
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
