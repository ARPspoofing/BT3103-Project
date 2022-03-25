<template>
  <StudentNavBar :search=true :Heading="Heading" :header=true />
  <PopUp @return="close" v-if="popUp"/>
    <div @click="check" ref="formWrap" class="form-wrap flex flex-column">
        <form @submit.prevent="submitForm" class="content">
            <div class="profile-pic-outer">
                <img class="profile-pic" :src="finalProfile"/>
            </div>
            <div class="profile-icon">
                <input id = "profilepic" style="display:none" ref="profileUpload" type="file" @change="onFileSelected">
                <h6 @click="$refs.profileUpload.click()">Profile</h6>
            </div>

            <!--Personal Details-->
            <div class="personal-details flex flex-column">
                <h4>Personal Details</h4>
                <div class="input flex flex-column">
                    <label for="name">Name</label> 
                    <input type="text" id="name" v-model="name">
                </div>

                <div class="errorMsg" v-if="nameErrorPresent">{{this.errorMessage}}</div>

                <div class="input flex flex-column">
                    <label for="faculty">Faculty</label>
                    <input disabled type="text" id="faculty" value="School of Computing" readonly>
                </div>
                <div class="input flex flex-column">
                    <label for="course">Course</label>
                    <select type="text" id="course" v-model="course" >                   
                      <option value="Business Analytics">Business Analytics</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Security">Information Security</option>
                      <option value="Information Systems">Information Systems</option>
                      </select>   
                </div>
                 <div class="errorMsg" v-if="courseErrorPresent">{{this.errorMessage}}</div>
                <div class="input flex flex-column">
                    <label for="year">Year</label>
                    <input type="text" id="year" v-model="year">
                </div>
                <div class="errorMsg" v-if="yearErrorPresent">{{this.errorMessage}}</div>
                <div class="flex flex-row">
                    <div style="margin-top: 5px;width: 100%;">
                        <ul  style="display: grid;grid-template-columns:repeat(5,1fr);">
                            <li v-for="(item,index) in interests" style="width: 20%;display: inline" >
                                <div class="interest-flex">
                                    <label class = "labelTag" for="interest">Interest</label>                            
                                    <select class="inputTag" type="text" id="interest" v-model="item.value" >   
                                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                                        <option value="Scientific Computing">Scientific Computing</option>
                                        <option value="Data Structures">Data Structures</option>
                                        <option value="Computer Architecture">Computer Architecture</option>
                                        <option value="Computer Networks">Computer Networks</option>
                                        <option value="Computer Database">Computer Database</option>
                                        <option value="Database Mining">Database Mining</option>
                                        <option value="Data Analytics">Data Analytics</option>
                                        <option value="Computer Graphics">Computer Graphics</option>
                                        <option value="Image/Sound Processing">Image/Sound Processing</option>
                                        <option value="Distributed Computing">Distributed Computing</option>
                                        <option value="Human-Computer Interaction">Human-Computer Interaction</option>
                                        <option value="Software Engineering">Software Engineering</option>
                                        <option value="Information Theory">Information Theory</option>                        
                                    </select>
                                </div>
                                <p class="delete" @click="deleteInterest(item.id)">x</p>
                            </li>
                        </ul>     
                    </div> 

                    <div class="addBtn">
                    <img @click="add" src="../../assets/add.png" alt="add button">                                                                   
                    </div>
                </div> 
                <div class="errorMsg" v-if="interestErrorPresent">{{this.errorMessage}}</div>
            </div>

            <!--Contact Details-->
            <div class="contact-details flex flex-column">
                <h4>Contact Details</h4>
                <div class="input flex flex-column">
                    <label for="schoolEmail">School Email</label>
                    <input type="text" id="schoolEmail" v-model="schoolEmail">
                </div>
                <div class="errorMsg" v-if="schoolEmailErrorPresent">{{this.errorMessage}}</div>
                <div class="input flex flex-column">
                    <label for="personalEmail">Personal Email</label>
                    <input type="text" id="personalEmail" v-model="personalEmail">
                </div>
                <div class="errorMsg" v-if="personalEmailErrorPresent">{{this.errorMessage}}</div>
                <div class="input flex flex-column">
                    <label for="contactNo">Contact Number</label>
                    <input type="text" id="contactNo" v-model="contactNo">
                </div>
                <div class="errorMsg" v-if="contactNumberErrorPresent">{{this.errorMessage}}</div>
            </div>
            <!--Work Details-->
            <div class="work flex flex-column">
                <h4>File Details</h4>
              <div class="input flex flex-column">
                    <label for="resume">Resume</label>
                    <input type="file" multiple name="files[]" id="resume" accept=".jpeg,.pdf,.docx" v-on:change="changeResume">
                </div>
             <div class="errorMsg" v-if="resumeErrorPresent">{{this.errorMessage}}</div>
              <div class="input flex flex-column">
                  <label for="transcript">Transcript</label>
                  <input type="file" multiple name="files[]" id="transcript" accept=".jpeg,.pdf,.docx" v-on:change="changeTranscript">
              </div>
            <div class="errorMsg" v-if="transcriptErrorPresent">{{this.errorMessage}}</div>
            </div>

            <!--Description-->
            <div class="description flex flex-column">
                <h4>Please limit your description to 500 characters</h4>
              <div class="input flex flex-column">
                    <label for="description">Description</label>
                    <textarea type="text" id="description" rows="4" cols="50" maxlength="500" v-model="description"></textarea> 
                </div>
            </div>

            <!--Save Exit-->
            <div class="save flex">
                <div class="left">
                  <button type="button" @click="showPopUp" class="red">Cancel</button>
                </div>
                <div class="right flex">
                  <button type="submit" @click="save" class="green">Save</button>                  
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import StudentNavBar from '../../components/StudentNavBar.vue'
import {signOut, getAuth, onAuthStateChanged} from "firebase/auth"
import firebaseApp from '../../firebase.js';
import { getFirestore, collection, doc, setDoc, deleteDoc, getDocs, updateDoc, getDoc } from "firebase/firestore"
const db = getFirestore(firebaseApp);


export default {
  name: 'StudentAbout',
  components: {
    StudentNavBar
  },

  data() {
    return {
      Heading: "PROFILE",
    }
  },
  
  props:{
      Heading: String,
      search: Boolean,
      header: Boolean,
  },

  methods:  {   
    
  },

  mounted() {
    // const auth = getAuth();
    // var userEmail = auth.currentUser.email;
    // console.log(userEmail)

    // async function getApplicant(userEmail) {
    //   const docSnap = await getDoc(doc(db, "students", userEmail));
    //   console.log("doc: "+ docSnap)
    //   let data = docSnap.data();
    //   console.log(data)
    //   //name =  data.name;
    //   //console.log("name: "+ name)
    //   //let result = await data.name
    //   var name = data.name;
    //   var picture = data.finalProfile;
    //   console.log(picture)
    //   document.getElementById("profilepic").src = picture
    //   return {name: data.name}
    // }
    // getApplicant(userEmail)
  }
}
</script>

<style scoped>
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
    width:200px;
    
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
padding: 16px 24px;
border-radius: 30px;
border: none;
font-size: 12px;
margin-right: 8px;
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
    margin-left:80%;
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
</style>