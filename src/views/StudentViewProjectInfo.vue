<template>
  <StudentNavBar :search=true :header=false />
  <div class="mainBody">
    <div>
      <div class = "clogo">
        <img src="../assets/google-logo.png" alt="Logo" class = "logo">
        <span>
          <div class="projTitle">
            {{items.projectTitle}}  <br>
            Company Name <br>
            <!--Tags-->
            <div id="tagsbox">
            <div id="tags" :key="item.key" v-for="(item, index) in tags">
              {{item}}
            </div>
            </div>
          </div>
          
        </span>
        <span>
          <div class="projButtons" >
            <button class="applyProj" data-bs-toggle="modal" data-bs-target="#applyModal" >APPLY NOW</button> <br>
          </div> 
          <div class="modal fade" id="applyModal" tabindex="-1" aria-labelledby="applyModalLabel" aria-hidden="true" 
              data-bs-backdrop="false">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-body">
                    <p>Apply for {{ items.projectTitle }}?</p>
                    <span>
                      <div class = "applybtns">
                        <button type="button" id="yesbtn" data-bs-dismiss="modal" @click="addApplicant()">Yes</button>
                        <button type="button" id="nobtn" data-bs-dismiss="modal">No</button>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
        </span>
      </div>
    </div>
    <br>
    <div class = "projInfo">
      <span>
        <div class="projLabels">
          Position <br>
          Number of Vacancies <br>
          Project Period <br>
          Payment Amount <br>            
        </div>
      </span>
      <span>
        <div class="projDetails">
          {{items.position}} <br>
          {{items.vacancies}} <br>
          {{formatDate(items.projectStart)}} - {{formatDate(items.projectEnd)}} <br>
          SGD {{items.allowance}} <br>            
        </div>
      </span>
    </div>
    <br>
    <div class = "projDesc">
      <span>
        <div class="projDescLabel">
          Description <br> 
            
        </div>
        <div class="projDescContent">
          {{this.items.description}}    
        </div>
      </span>
    </div>
    <br>
    <div class = "projDeliverable">
      <span>
        <div class="projDescLabel">
          Deliverables <br>          
        </div>
      </span>
      <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="delicard">
                    <div class="delicard-body">
                        <div id="delicontent">
                            <ul class="timeline" :key="item.key" v-for="(item, index) in tasks">
                                <Deliverable :data-date="formatDate(item.taskDueDate)" :description="item.taskDescription" :title="item.taskName"/>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
    </div>
    <br><br>
  </div>
</template>

<script>
import StudentNavBar from '../components/StudentNavBar.vue'
import Deliverable from '../components/Deliverable.vue'
import * as moment from 'moment'
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { collection, doc, setDoc, deleteDoc, getDocs, updateDoc, getDoc } from "firebase/firestore"
const db = getFirestore(firebaseApp);
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'StudentViewProjectInfo',
  //props: ['items'],
  components: {
    StudentNavBar,
    Deliverable
  },
  data() {
    return {
      Heading: "MY PROJECTS",
      testCollection: [],
      //props: ['items'],
      tags: [],
      tasks: [],
      items: [],
      user: false, 
      userEmail: "", 
      applied: [],
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user) {
        this.user = user;
      }
    })
    this.userEmail = auth.currentUser.email;
    console.log(this.userEmail)
    this.tasks = JSON.parse(this.$route.params.items).tasks
    this.tags = JSON.parse(this.$route.params.items).tags
    this.newApplicants = JSON.parse(this.$route.params.items).newApplicants
    this.projTitle = JSON.parse(this.$route.params.items).projectTitle
    this.items = JSON.parse(this.$route.params.items)

    const that = this
    async function getAppliedProjects() {
      const ref = doc(db, "students", auth.currentUser.email);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      //console.log(data.id)
      that.applied = data.appliedProjects
    }
    getAppliedProjects()

    /*console.log(JSON.parse(this.$route.params.tasks))*/
    //console.log(this.projTitle)
    //console.log(this.tags);
    //console.log(this.newApplicants);
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD MMMM YYYY");
    },
    async addApplicant() {
        var newApplicants = this.newApplicants
        console.log(newApplicants)
        var projTitle = this.projTitle
        newApplicants.push(this.userEmail);
        var projTitle = this.projTitle
        newApplicants.push(this.userEmail);
        var applied = this.applied
        applied.push(projTitle);

        try {
            const docRef = await updateDoc(doc(db, "Project", projTitle), {
                New_Applicants: newApplicants
            })

            const docRef2 = await updateDoc(doc(db, "students", this.userEmail), {
                appliedProjects: applied
            })
            
            console.log(docRef)
            this.$emit("updated")
        }
        catch(error) {
            console.error("Error updating document: ", error);
        }
        console.log(newApplicants);
        // var applicants = testCollection[key]["Applicants"]
    },
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
    padding-bottom: 150px;
  }
  #tagsbox {
    width: 450px;
    word-wrap: break-word; 
  }

  #tags {
    font-size: 12px;
    background-color: #FFE0B1;
    margin-top: 5px;
    padding: 3px 20px;
    text-align: center;
    border-radius: 20px;
    font-weight: bold;
    display: inline;
    margin-right: 5px;
    white-space: nowrap;

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

  .logo {
    vertical-align: left;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-left: 170px;
    margin-right: 10px;
    float: left;
  }

  .clogo {
    text-align: left;
    margin: 40px 20px 20px 20px;
    height: 100px;
  }

  .projTitle {
    width: max-content;
    float: left;
    margin-left: 20px;
  }

  .applyProj {
    background-color: #0E8044;
    color: white;
    border-radius: 15px;
    width: 250px;
    border-width: 0px;
    font-size: 18px;
  }

  .projButtons {
    width: max-content;
    float: right;
    margin-right: 200px;
    margin-top: 50px;
  }

  .projInfo {
    margin: auto;
    width: 800px;
    height: 150px;
    background-color: #DBEBE3;
    border-radius: 10px;
    border: 2px solid rgba(14, 128, 68, 0.54);
    margin-top: 15px;
  }

  .projDesc, .projDeliverable {
    margin: auto;
    width: 800px;
    height: max-content;
  }

  .projLabels, .projDescLabel {
    text-align: left;
    width: max-content;
    font-weight: bold;
    float: left;
    margin: 10px 20px 5px 100px;
    line-height: 30px;
  }

  .projDescContent {
    text-align: left;
    width: 650px;
    float: left;
    margin: 0px 20px 20px 100px;
  }

  .projDetails {
    text-align: left;
    width: max-content;
    float: left;
    margin: 10px 20px 20px 30px;
    line-height: 30px;
  }

  #delicontent {
    margin-top: 50px;
  }

  .timeline {
    border-left: 3px solid #004A23;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    background: #DBEBE3;
    margin: 0px;
    letter-spacing: 0.2px;
    position: relative;
    line-height: 1.4em;
    font-size: 1.03em;
    padding: 50px 35px 50px 50px;
    list-style: none;
    text-align: left;
    max-width: 65%;
    margin-top: 10px;
    margin-left:40px;
  }

  .timeline h1 {
      font-weight: 300;
      font-size: 1.4em;
  }

  .timeline h2,
  .timeline h3 {
      font-weight:600;
      font-size: 16px;
      margin-bottom: 10px;
      text-align: left;
  }

  .timeline p {
      font-size: 14px;
  }

  .timeline .event {
      border-bottom: 1px dashed #e8ebf1;
      padding-bottom: 25px;
      margin-bottom: 25px;
      position: relative;
  }

  .timeline .event:last-of-type {
      padding-bottom: 0;
      margin-bottom: 0;
      border: none;
  }

  .timeline .event:before,
  .timeline .event:after {
      position: absolute;
      display: block;
      top: 0;
  }

  .timeline .event:before {
      left: -207px;
      content: attr(data-date);
      text-align: right;
      font-weight: 550;
      font-size: 0.9em;
      min-width: 120px;
  }

  .timeline .event:after {
      -webkit-box-shadow: 0 0 0 3px #004A23;
      box-shadow: 0 0 0 3px #004A23;
      left: -55.8px;
      background: #fff;
      border-radius: 50%;
      height: 9px;
      width: 9px;
      content: "";
      top: 5px;
  }

</style>