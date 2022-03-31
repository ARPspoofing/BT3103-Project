<template>
  <BusinessNavBar :Heading="Heading" :header="true" />
  <div @click="check" ref="formWrap" class="form-wrap flex flex-column" id="mainBody">
        <button @click="goback" id="backButton">Back to Applicants</button>
        <form @submit.prevent="submitForm" class="content">
            <div class="profile-pic-outer">
                <img class="profile-pic" :src="finalProfile"/>
            </div>
            <div class="accRejButtons" v-if="stat == 'showbtns'">
            <!-- <div class="accRejButtons" v-show=true> -->
                <button id="accButton" @click="acceptbtn">Accept</button>
                <button id="rejButton" @click="rejectbtn">Reject</button>
            </div>

            <!--Personal Details-->
            <div class="personal-details flex flex-column">
                <h4>Personal Details</h4>
                <div class="input flex flex-column">
                    <label for="name">Name</label> 
                    <input type="text" id="name" v-model="name" readonly>
                </div>

                <div class="input flex flex-column">
                    <label for="faculty">Faculty</label>
                    <input disabled type="text" id="faculty" value="School of Computing" readonly>
                </div>
                <div class="input flex flex-column">
                    <label for="course">Course</label>
                    <input type="text" id="course" v-model="course" readonly>                     
                </div>
                <div class="input flex flex-column">
                    <label for="year">Year</label>
                    <input type="text" id="year" v-model="year" readonly>
                </div>
                <div class="flex flex-row">
                    <div style="margin-top: 5px;width: 100%;">
                        <ul  style="display: grid;grid-template-columns:repeat(5,1fr);">
                            <li v-for="(item,index) in interests" style="width: 20%;display: inline" >
                                <div class="interest-flex">
                                    <label class = "labelTag" for="interest">Interest</label>                            
                                    <input class="inputTag" type="text" id="interest" v-model="item.value" readonly>   
            
                                </div>
                            </li>
                        </ul>     
                    </div> 
                </div> 
            </div>

            <!--Contact Details-->
            <div class="contact-details flex flex-column">
                <h4>Contact Details</h4>
                <div class="input flex flex-column">
                    <label for="schoolEmail">School Email</label>
                    <input type="text" id="schoolEmail" v-model="schoolEmail" readonly>
                </div>
                <div class="input flex flex-column">
                    <label for="personalEmail">Personal Email</label>
                    <input type="text" id="personalEmail" v-model="personalEmail" readonly>
                </div>
                <div class="input flex flex-column">
                    <label for="contactNo">Contact Number</label>
                    <input type="text" id="contactNo" v-model="contactNo" readonly>
                </div>
            </div>
            <!--Work Details-->
            <div class="work flex flex-column">
                <h4>File Details</h4>
              <div class="input flex flex-column">
                    <label for="resume">Resume</label>
                    <a v-bind:href="resumeLink" target="_blank" class="but">View Resume</a>
                </div>
              <div class="input flex flex-column">
                  <label for="transcript">Transcript</label>
                    <a v-bind:href="transcriptLink" target="_blank" class="but">View Transcript</a>
              </div>
            </div>

            <!--Description-->
            <div class="description flex flex-column">
                <h4>Please limit your description to 500 characters</h4>
              <div class="input flex flex-column">
                    <label for="description">Description</label>
                    <textarea type="text" id="description" rows="4" cols="50" maxlength="500" v-model="description" readonly></textarea> 
                </div>
            </div>
        </form>
    </div>

</template>

<script>
import BusinessNavBar from '../components/BusinessNavBar.vue'
import {signOut, getAuth, onAuthStateChanged} from "firebase/auth"
import {useRouter} from "vue-router"
import * as moment from 'moment'
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { collection, doc, setDoc, deleteDoc, getDocs, getDoc, updateDoc } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid';
const db = getFirestore(firebaseApp);
const router = useRouter()
export default {
    name:'BusinessViewStudentInfo',
    components: {
        BusinessNavBar,
    },
    created() {
        this.interests.push({
            id:uuidv4(),
            value: "",
        })
        console.log(this.interests.target)
    },
    // props: {
    //     buttonShow: Boolean,
    // },
    methods: {
        goback() {
            //this.$router.push({name: "IndividualProjectNewApps"})
        },
        async acceptbtn() {
            var theaccApplicant = this.newApplicant[this.theKey];
            console.log(theaccApplicant)
            var offered = this.offer;
            var name = this.applicant.name;
            var projTitle = this.item["projectTitle"];
            var projId = this.item["projectId"];
            var applied = this.apply;
            //console.log("bef" + applied)

            if (!this.accApplicant) {
                var accApplicants = [];
                accApplicants.push(theaccApplicant);
                this.accApplicant = accApplicants;
            } else {
                this.accApplicant.push(theaccApplicant);
            }

            var index = applied.indexOf(projId)
            applied.splice(index, 1)
            //console.log("after" + applied)

            offered.push(projId);
            //console.log(offered);
            this.newApplicant.splice(this.theKey, 1);
            // this.allApplicant.splice(this.theKey, 1);
            // this.offer.splice(this.theKey, 1);
            // this.apply.splice(this.theKey, 1);
            // console.log(this.accApplicant)
            // console.log(this.newApplicant)
            // console.log(offered)
            // console.log(this.offer)
            // console.log(applied)
            // console.log(this.apply)
            // console.log(this.theKey)

            alert("Accepting applicant: " + name);
            try {
                const docRef = await updateDoc(doc(db, "Project", projId), {
                    Acc_Applicants: this.accApplicant,
                    New_Applicants: this.newApplicant,
                });
                const docRef2 = await updateDoc(doc(db, "students", theaccApplicant), {
                    offeredProjects: offered,
                    appliedProjects: applied
                });
                console.log(docRef);
                this.$emit("updated"); 
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        },

        async rejectbtn() {
            var therejApplicant = this.newApplicant[this.theKey];
            // var therejApplicant = this.newApplicant;
            //var rejecting = this.rejectted

            var rejected = this.reject;
            var name = this.applicant.name;
            var projTitle = this.item["projectTitle"];
            var projId = this.item["projectId"];
            var applied = this.apply;
            //console.log("bef" + applied)

            if (!this.rejApplicant) {
                var rejApplicants = [];
                rejApplicants.push(therejApplicant);
                this.rejApplicant = rejApplicants;
            } else {
                this.rejApplicant.push(therejApplicant);
            }

            var index = applied.indexOf(projId)
            applied.splice(index, 1)
            //console.log("aft" + applied)

            rejected.push(projId);

            // this.reject.splice(key, 1);
            this.newApplicant.splice(this.theKey, 1);
            // this.applicant.splice(key, 1);
            // this.apply.splice(key, 1);
            // console.log(this.rejApplicant)
            // console.log(this.newApplicant)
            // console.log(rejected)
            // console.log(this.reject)
            // console.log(applied)
            // console.log(this.apply)
            // console.log(this.theKey)


            alert("Rejecting applicant: " + name);

            try {
                const docRef = await updateDoc(doc(db, "Project", projId), {
                    Rej_Applicants: this.rejApplicant,
                    New_Applicants: this.newApplicant,
                });

                const docRef2 = await updateDoc(doc(db, "students", therejApplicant), {
                    rejectedProjects: rejected,
                    appliedProjects: applied
                });

                console.log(docRef);
                this.$emit("updated");
            } catch (error) {
                console.error("Error updating document: ", error);
            }
            //console.log(this.rejApplicant);
            //console.log(key);
        },
    },
    data() {
        return {
            Heading: "STUDENT INFORMATION",
            stat: '',
            name: '',
            course: '',
            year:'',
            interest1:'',
            interest2:'',
            interest3:'',
            schoolEmail:'',
            personalEmail:'',
            contactNo:'',
            interests: [],
            //change to firebase later
            finalProfile: "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
            errorMessage:"",
            resumeLink:'',
            transcriptLink:'',
            description: '',
            newApplicant: [],
            accApplicant: [],
            rejApplicant: [],
            allApplicant: [],
            applicant: [],
            theKey: '',
            offer: [],
            reject: [],
            apply: [],
            // showButton: false,
        }
    },
    mounted() {
        const auth = getAuth();
        var userEmail = auth.currentUser.email;
        this.applicant = JSON.parse(this.$route.params.applicants)
        this.allApplicant = JSON.parse(this.$route.params.allApplicants)
        // this.showButton = JSON.parse(this.$route.params.buttonShow)
        this.newApplicant = JSON.parse(this.$route.params.newApplicants)
        this.accApplicant = JSON.parse(this.$route.params.accApplicants)
        this.rejApplicant = JSON.parse(this.$route.params.rejApplicants)
        // this.offer = JSON.parse(this.$route.params.offered)
        // this.reject = JSON.parse(this.$route.params.rejected)
        // this.apply = JSON.parse(this.$route.params.applied)
        this.item = JSON.parse(this.$route.params.items)
        this.theKey = JSON.parse(this.$route.params.key)
        console.log(this.accApplicant)
        this.stat = JSON.parse(this.$route.params.stat)

        var email = JSON.parse(this.$route.params.applicants).email
        const that = this;
        async function getApplicant(email) {
            const docSnap = await getDoc(doc(db, "students", email));
            console.log("doc: "+ docSnap)
            let data = docSnap.data();
            console.log(data)
            that.finalProfile = data.finalProfile 
            that.name = data.name
            that.course = data.course
            that.year = data.year
            that.interests = data.interests
            that.schoolEmail = data.email
            that.personalEmail = data.personalEmail
            that.contactNo = data.contactNo
            that.resumeLink = data.resumeDownloadLink
            that.transcriptLink = data.transcriptDownloadLink
            if (!data.description) {
                that.description = data.description
            }
        }
        getApplicant(email)
    },
}
</script>

<style scoped>
#mainBody {
    background-color: #F5F5F5;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow-y: scroll;
    padding-bottom: 150px;
    padding-top: 20px;
  }

h3 {
    font-family: verdana;
    text-align: center;
}

h1 {
    color: rgba(0, 0, 0, 0.829);
    font-family: verdana;
    font-size: 170%;
    text-align: center;
    padding: 8px
}

nav {
  background-color: "#004A23";
}
    
.form-wrap {
  position:fixed;
  background-color: transparent;
  width:100%;
  height:100vh;
  overflow:scroll;
  margin-bottom: 30px;
}

input,
select {
    margin-bottom: 20px;
    margin-left:10px;
}

.interest-flex {
    width:300px;
    
}

input,
select,
textarea {
    width:70%;
    background-color: #BBDFCC;
    border: none;
    outline:none;
    font-family: 'Poppins', sans-serif;
    margin-left: auto;
    margin-right: auto;
}

textarea {
    margin-bottom: 8px;
}

.labelTag,
.inputTag {
    border-radius:20px;
    width: 260px;
    text-align: center;
}

label {
    text-align: left;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3px;
}

.addBtn {
    margin-top: 6vh;
}

.interest {
    gap:10px;
    div {
        flex: 1;
    }
}

img {
    width:40px;
    height:40px;
}

select{
    padding-left:0.55rem;
}

.delete {
    margin-top:-45px;
    margin-left:35px;
    color:red;
}

.profile-pic {
    border-radius: 50%;
    margin:10px 0px;
    width:120px;
    height: 120px;

}

.errorMsg {
    color: red;
    margin-top:5px;
}


button,
.button {
cursor: pointer;
padding: 2px 24px;
border-radius: 30px;
border: none;
font-size: 14px;
margin-right: 8px;
margin-left: 20px;
color: #fff;
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
    width: max-content;
    float: right;
    margin-left: 20px;  
    margin-right: 180px;
    margin-top: 20px;
}

.dark-purple {
background-color: #252945;
}
.red {
background-color: #ec5757;
}
.purple {
background-color: #7c5dfa;
}
.green {
background-color: #0E8044;
}
.orange {
background-color: #ff8f00;
}
.flex {
display: flex;
}
.flex-column {
flex-direction: column;
}

.flex-row {
    flex-direction: row;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0px;
}

.container {
width: 100%;
padding: 40px 10px;
max-width: 850px;
margin: 0 auto;
@media (min-width: 900px) {
    padding-top: 72px;
}
}
.nav-link {
text-decoration: none;
color: initial;
}

li {
    cursor: pointer;
}

ul {
    padding-left: 0px;
}

.uploadIcon {
    border-radius: 10%;
    background-color:green;
    width:100px;
    text-align: center;
    margin-top:-5px;
}

.profile-icon h4 {
    display: grid;
    place-items: center;
    cursor:pointer;
    color:blue;
} 

 #applyModal {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    background-color: #BBDFCC;
    border: none;
  }

  .words {
    width: max-content;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    height: 50px;
  }

  .applybtns {
    width: max-content;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }

  #yesbtn, #nobtn {
    margin: 10px;
    border: none;
    border-radius: 10px;
    background-color:#89ca9a;
    color: #3f3f3f;
    width: 120px;
    height: 30px;
    font-size: 18px;
  }

  #tickIcon {
    height: 38px;
    width: 38px;
    color: #3D9956;
    float: left;
  }

  .modal-body p {
    font-size: 18px;
    text-align: center;
    width: 180px;
    margin-left: 48px;
    color: #3f3f3f;
  }

  .but {
      text-decoration: none;
      background: #0E8044;
      padding: 4px;
      border-radius: 8px;
      color: white;
      width: 180px;
      margin-left: 15%;
      margin-right: auto;
  }

  #backButton {
      background: #0E8044;
      width: 180px;
      height: 50px;
  }
  
  #accButton {
      background: #89ca9a;
      margin-bottom: 15px;
      font-size: 16px;
  }

  #rejButton {
      background: #ec5757;
        margin-bottom: 15px;
        font-size: 16px;

  }
</style>