<template>
  <StudentNavBar :search=true :header=false :key="componentKey"/>
  <div>
  <button type="button" @click="submitTest">Submittttttttt</button>




   <div class="right">
                  <button type="submit" ref="submitBtn" class="green" data-bs-toggle="modal" data-bs-target="#saveModal" >Save</button>                  
                </div>
                <div class="modal fade" id="saveModal" tabindex="-1" aria-labelledby="saveModalLabel" aria-hidden="true" 
                  data-bs-backdrop="false">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-body">
                        <div class="words">
                        <i class="fa-solid fa-circle-check" id="tickIcon"></i>
                        <p>Save changes?</p>
                        </div>
                        <span>
                          <div class = "applybtns">
                            <button type="button" id="yesbtn" data-bs-dismiss="modal" @click="save">Yes</button>
                            <button type="button" id="nobtn" data-bs-dismiss="modal">No</button>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
              </div>





  </div>
  <!--div class="modal-overlay" v-if="applyConfirm"></div>-->
  <StudentProfileForm @cancel='cancel' @success='close' v-if='!profileFormCreated'/>
  <div v-if='profileFormCreated' :class="{blur:!profileFormCreated,mainBody:foreverTrue}">  
  
    <h1 id="interest">Projects You May Like</h1>
    <transition name="applyConfirm" mode="out-in">
    <ApplyConfirm @confirmYes="confirmYes" v-if="applyConfirm" :projectTitle='currProject'/>
    </transition>

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
            <div :key="item.key" v-for="(item, key) in testCollection">
              <!-- <h2>"item.projectTitle"</h2> -->
              <Card v-if="key <= 5" 
                :apply=true 
                :like=true
                :latest=false
                :projectTitle = "item.projectTitle" 
                :description="item.description" 
                :appstat="item.appstat"
                @applicantbtn="addApplicant(key)"
                @clickCard="indivproj(key)"
                @applying="applying($event,key)"
                :picture = "item.profilePicture"/>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="carouContainer">
            <div :key="item.key" v-for="(item, key) in testCollection.slice(6)">
              <Card v-if="key <= 5" 
                :apply=true 
                :like=true
                :latest=false
                :projectTitle = "item.projectTitle" 
                :description="item.description" 
                :appstat="item.appstat"
                @applicantbtn="addApplicant(key + 6)" 
                @clickCard="indivproj(key + 6)"
                @applying="applying($event,key)"
                :picture = "item.profilePicture"/>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="carouContainer">
            <div :key="item.key" v-for="(item, key) in testCollection.slice(12)">
              <Card v-if="key <= 5" 
              :apply=true 
              :like=true
              :latest=false
              :projectTitle = "item.projectTitle" 
              :description="item.description" 
              :appstat="item.appstat"
              @applicantbtn="addApplicant(key + 2*6)" 
              @clickCard="indivproj(key + 2*6)"
              @applying="applying($event,key)"
              :picture = "item.profilePicture"/>
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
    <div id="carouselExampleControls1" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="carouContainer">
            <div :key="item.key" v-for="(item, key) in wholeTestCollection">
              <Card v-if="key <= 5" 
                :apply=true 
                :like=false
                :latest=true
                :projectTitle = "item.projectTitle" 
                :description="item.description" 
                :appstat="item.appstat"
                @applicantbtn="addApplicant(key)" 
                @clickCard="indivprojlatest(key)"
                @applying="applying($event,key)"
                :picture = "item.profilePicture"/>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="carouContainer">
            <div :key="item.key" v-for="(item, key) in wholeTestCollection.slice(6)">
              <Card v-if="key <= 5" 
                :apply=true 
                :like=false
                :latest=true
                :projectTitle = "item.projectTitle" 
                :description="item.description" 
                :appstat="item.appstat"
                @applicantbtn="addApplicant(key + 6)" 
                @clickCard="indivprojlatest(key + 6)"
                @applying="applying($event,key)"
                :picture = "item.profilePicture"/>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="carouContainer">
            <div :key="item.key" v-for="(item, key) in wholeTestCollection.slice(12)">
              <Card v-if="key <= 5" 
              :apply=true 
              :like=false
              :latest=true
              :projectTitle = "item.projectTitle" 
              :description="item.description" 
              :appstat="item.appstat"
              @applicantbtn="addApplicant(key + 2*6)" 
              @clickCard="indivprojlatest(key + 2*6)"
              @applying="applying($event,key)"
              :picture = "item.profilePicture"/>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls1" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls1" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>  
</template>

<script>
import StudentNavBar from '../../components/StudentNavBar.vue'
import ApplyConfirm from '../../components/ApplyConfirm.vue'
import Card from '../../components/Card.vue'
import firebaseApp from '../../firebase.js';
import { getFirestore, query, where } from "firebase/firestore"
import { collection, doc, setDoc, deleteDoc, getDocs, updateDoc, getDoc } from "firebase/firestore"
import {mapState} from "vuex"
import {mapMutations} from "vuex"

const db = getFirestore(firebaseApp);
import StudentProfileForm from './StudentProfileForm.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'StudentHomePage',
  components: {
    StudentNavBar, 
    Card,
    StudentProfileForm,
    ApplyConfirm,

  },
  emits: ['cancel'],
  computed: {
    ...mapState(['userEmail','cardItems']),
  },
  data() {
    return {
      Heading: " ",
      testCollection: [],
      wholeTestCollection: [],
      newApplicants:[],
      foreverTrue:true,
      profileFormCreated: true,
      cancel: false,
      user: false, 
      userEmailData: "", 
      applied: [],
      studentTags: [],
      allApplied: [],
      applyConfirm: false,
      currProject: '',
      currKey:null,
      like:false,
      latest:false,
      componentKey:0,
    }
  },
  
  methods: {
    ...mapMutations(['SET_CARDITEMS','CLEAR_CARDITEMS']),
    submitTest() {  
      this.$refs.submitBtn.click();
    },
    forceRender() {
      this.componentKey += 1
    },
    close(e) {
      this.profileFormCreated = true;
      this.forceRender();
    },
    cancel(e) {
      this.cancel = e;
      console.log("eeeeeeeeeeeeeeee")
    },
    applying(event,key) {
      alert(key)
      this.applyConfirm = true
      this.currKey = key
      if (event) {
        this.currProject = this.testCollection[key]["projectTitle"]
        tbis.like = true
        this.latest = false
      } else {
        this.currProject = this.wholeTestCollection[key]["projectTitle"]
        this.like = false
        this.latest = true
      }
      
    },
    confirmYes(e) {
      if (e == true) {
        this.addApplicant(this.currKey)
      }
      console.log("yes")
      this.applyConfirm = false
    },
    async addApplicant(key) {
      alert(key)
      if (this.like) {
        console.log(this.testCollection[key])
        var newApplicants = this.testCollection[key]["newApplicants"]
        console.log(newApplicants)
        var projTitle = this.testCollection[key]["projectTitle"]
        newApplicants.push(this.userEmail);
        var applied = this.applied
        console.log(applied);
        var projectId = this.testCollection[key]["projectId"]
        console.log(projectId);
        applied.push(projectId);
        // applied.push(projTitle);
        this.testCollection[key]["appstat"] = "applied"

        // alert("Applying for proj: " + projTitle);
        
        //const auth = getAuth();
        //this.fbuser = auth.currentUser.email;
        
        try {
            const docRef = await updateDoc(doc(db, "Project", projectId), {
                New_Applicants: newApplicants
            })

            const docRef2 = await updateDoc(doc(db, "students", this.userEmail), {
                  appliedProjects: applied
              })

            //console.log(docRef)
            this.$emit("updated")
        }
          catch(error) {
            console.error("Error updating document: ", error);
        }
      } else if (this.latest) {
        console.log(this.wholeTestCollection[key])
        var newApplicants = this.wholeTestCollection[key]["newApplicants"]
        console.log(newApplicants)
        var projTitle = this.wholeTestCollection[key]["projectTitle"]
        newApplicants.push(this.userEmail);
        var applied = this.applied
        console.log(applied);
        var projectId = this.wholeTestCollection[key]["projectId"]
        console.log(projectId);
        applied.push(projectId);
        // applied.push(projTitle);
        this.wholeTestCollection[key]["appstat"] = "applied"

        // alert("Applying for proj: " + projTitle);
        
        //const auth = getAuth();
        //this.fbuser = auth.currentUser.email;
        
        try {
            const docRef = await updateDoc(doc(db, "Project", projectId), {
                New_Applicants: newApplicants
            })

            const docRef2 = await updateDoc(doc(db, "students", this.userEmail), {
                  appliedProjects: applied
              })

            //console.log(docRef)
            this.$emit("updated")
        }
          catch(error) {
            console.error("Error updating document: ", error);
        }
      }
      
      //console.log(newApplicants);
      //console.log(key)
      //console.log(this.testCollection[key])
      //console.log(appliedProjects)
      // var applicants = testCollection[key]["Applicants"]
    },
    
    indivproj(key) {
      //Vuex Version
      alert(key)
      this.CLEAR_CARDITEMS()
      this.SET_CARDITEMS(JSON.stringify(this.testCollection[key]))
      this.$router.push({
        name:'StudentViewProjectInfo', 
        //Non-Vuex version
        params: {
          items: JSON.stringify(this.testCollection[key]),
        },
      })
      console.log(key)
      console.log(this.testCollection[key])
    }, 

    indivprojlatest(key) {
      alert(key)
      //Vuex version
      this.CLEAR_CARDITEMS()
      this.SET_CARDITEMS(JSON.stringify(this.wholeTestCollection[key]))
      this.$router.push({
        name:'StudentViewProjectInfo', 
        //Non-Vuex version
        params: {
          items: JSON.stringify(this.wholeTestCollection[key]),
        },
      })
      console.log(key)
      console.log(this.wholeTestCollection[key])
    }, 

    // interestProjects() {
    //   var intProjects = []
    //   for (var item in this.testCollection) {
    //     var itemTags = item.tags;
    //     for (var eachitem in itemTags) {
    //       if (this.studentTags.includes(eachitem) && !intProjects.includes(item)) {
    //         intProjects.push(item)
    //       }
    //     }
    //   }
    //   return intProjects;
    // }
  },
  created() {
    var that = this
    this.userEmailData = this.userEmail
    var userEmail = this.userEmail
    /*
    var currUser = getAuth().onAuthStateChanged(function (user) {
      if (user) {
        //this.profileFormCreated = currUser.email
        //console.log(this.profileFormCreated)
        userEmail = user.email
      }
    })
    */

     async function profileFormCreatedCheck() {
      var profileFormCreated = false;
      
      let snapshot = await getDocs(collection(db,'students'))
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
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user) {
        this.user = user;
      }
    })
    this.userEmail = auth.currentUser.email;
    */
    this.userEmailData = this.userEmail

    const that = this;

    async function getAppliedProjects() {
      const ref = doc(db, "students", that.userEmailData);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      console.log(data.appliedProjects)
      that.applied = data.appliedProjects  
    }
    getAppliedProjects();

    async function getAllAppliedProjects() {
      const ref = doc(db, "students", that.userEmailData);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      //console.log(data.appliedProjects)
      that.allApplied = data.appliedProjects
      that.allApplied = that.allApplied.concat(data.completedProjects)
      that.allApplied = that.allApplied.concat(data.inProgProjects)
      that.allApplied = that.allApplied.concat(data.offeredProjects)
      that.allApplied = that.allApplied.concat(data.rejectedProjects)    
    }

    async function fetchProject() {
      const ref = doc(db, "students", that.userEmailData);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      var array = []
      array.push(Object.values(data.interests))
      var returnArray = []
      for (var i = 0; i < array[0].length; i++) {
        returnArray.push(array[0][i]["value"])
      }
      console.log(returnArray)

      const projects = query(collection(db, "Project"), where('Tags', 'array-contains-any', returnArray));
      let snapshot = await getDocs(projects)
      let wholeSnapshot = await getDocs(collection(db, "Project"))
      const wholeTestCollection = [];
      const testCollection = [];
      //console.log(that.applied)
      snapshot.forEach( async (docs) => {
        let data = docs.data()
        var id = docs.id
        // var comp = data.poster_id;
        // const docSnap1 = await getDoc(doc(db, "businesses", comp));
        // let data1 = docSnap1.data();
        // var pictureprof = data1.finalProfile;
        //   if (typeof pictureprof === 'undefined') {
        //     pictureprof = "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"
        //   }
        if (that.allApplied.includes(id)) {
          console.log("pic is: " + data.profPicture)
          testCollection.push({ 
            /*projectTitle: data.Project_Title, 
            description: data.Description,
            newApplicants: data.New_Applicants*/
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
            appstat: "applied",
            timestamp: data.Posted_Date,
            company: data.poster_id,
            profilePicture: data.profPicture,
          });
        } else {
          testCollection.push({ 
            /*projectTitle: data.Project_Title, 
            description: data.Description,
            newApplicants: data.New_Applicants*/
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
            appstat: "apply",
            timestamp: data.Posted_Date,
            company: data.poster_id,
            profilePicture: data.profPicture,
          });
        }
        
      });
      wholeSnapshot.forEach( async (docs) => {
        let data = docs.data()
        var id = docs.id
        // var comp = data.poster_id;
        // const docSnap1 = await getDoc(doc(db, "businesses", comp));
        // let data1 = docSnap1.data();
        // var pictureprof = data1.finalProfile;
        //   if (typeof pictureprof === 'undefined') {
        //     pictureprof = "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"
        //   }
        if (that.allApplied.includes(id)) {
          wholeTestCollection.push({ 
            /*projectTitle: data.Project_Title, 
            description: data.Description,
            newApplicants: data.New_Applicants*/
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
            appstat: "applied",
            timestamp: data.Posted_Date,
            company: data.poster_id,
            profilePicture: data.profPicture,
          });
        } else {
          wholeTestCollection.push({ 
            /*projectTitle: data.Project_Title, 
            description: data.Description,
            newApplicants: data.New_Applicants*/
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
            appstat: "apply",
            timestamp: data.Posted_Date,
            company: data.poster_id,
            profilePicture: data.profPicture,
          });
        }
        
      });
      that.testCollection = testCollection
      that.wholeTestCollection = wholeTestCollection
      console.log(testCollection)
      console.log(wholeTestCollection)
      wholeTestCollection.sort(function(x, y){
        return y.timestamp - x.timestamp;
      })
      console.log(wholeTestCollection)
    }
    
    //console.log("email is : "+ this.userEmail)
    // getTags(this.userEmail).then((res) => {this.studentTags.push(res)})
    // console.log(this.studentTags)

    // async function getTags(app) {
    //   const ref = doc(db, "students", app);
    //   const docSnap = await getDoc(ref);
    //   const data = docSnap.data();
    //   var array = []
    //   array.push(Object.values(data.interests))
    //   //console.log(array)
    //   var returnArray = []
    //   for (var i = 0; i < array[0].length; i++) {
    //     returnArray.push(array[0][i]["value"])
    //   }
    //   console.log(returnArray)
    //   //let result = await data.name
    //   return returnArray;
    // }
    //console.log(getTags(this.userEmail))


    // getTags(this.userEmail).then((res)=>{this.studentTags.push(res)})
    // console.log(this.studentTags)
    
    // getTags(this.userEmail).then((res)=>{console.log(res.map((x) => x["value"]))})
    
    getAllAppliedProjects()
    fetchProject();
    //console.log(that.applied)
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
    padding-bottom: 250px;
  }

  .carouContainer {
    margin-left: 30px;
  }

  .blur {
  filter: blur(5px); 
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
    height: 500px; 
  }

  .carousel-control-next,
  .carousel-control-prev  {
    filter: invert(100%);
  }

  .applyConfirm-enter-active {
  
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
  }

  .applyConfirm-leave-active {
    
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
  }

  .applyConfirm-enter-from {
    opacity: 0;
    transform:translateY(-700px);
    /*transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);*/
  }

  .applyConfirm-leave-to {
    opacity: 0;
    transform:translateY(-700px);
    /*transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);*/
  }

  .modal-overlay {
  content: '';
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}

</style>
