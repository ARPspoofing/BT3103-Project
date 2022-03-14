<template>    
    <PopUp @return="close" v-if="popUp"/>
    <div @click="check" ref="formWrap" class="form-wrap flex flex-column">
        <form @submit.prevent="submitForm" class="content">
            <div class="profile-pic-outer">
                <img class="profile-pic" :src="finalProfile"/>
            </div>
            <div class="profile-icon">
                <input style="display:none" ref="profileUpload" type="file" @change="onFileSelected">
                <h4 @click="$refs.profileUpload.click()">Pick Profile</h4>
            </div>
            <!--Personal Details-->
            <div class="personal-details flex flex-column">
                <h4>Personal Details</h4>
                <div class="input flex flex-column">
                    <label for="name">Name</label> 
                    <input required type="text" id="name" v-model="name">
                </div>
                <div class="input flex flex-column">
                    <label for="faculty">Faculty</label>
                    <input disabled type="text" id="faculty" value="School of Computing" readonly>
                </div>
                <div class="input flex flex-column">
                    <label for="course">Course</label>
                    <select required type="text" id="course" v-model="course" >                   
                      <option value="Business Analytics">Business Analytics</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Security">Information Security</option>
                      <option value="Information Systems">Information Systems</option>
                      </select>   
                </div>
                <div class="input flex flex-column">
                    <label for="year">Year</label>
                    <input required type="text" id="year" v-model="year">
                </div>
                <div class="flex flex-row">
                    <div style="margin-top: 5px;width: 100%;">
                        <ul  style="display: grid;grid-template-columns:repeat(5,1fr);">
                            <li v-for="(item,index) in interests" style="width: 20%;display: inline" >
                                <div class="interest-flex">
                                    <label class = "labelTag" for="interest">Interest</label>                            
                                    <select class="inputTag" required type="text" id="interest" v-model="item.value" >   
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
                <!--
                <div class="interest flex">
                    <div class="input flex flex-column">
                        <label for="interest1">Interest1</label>
                        <input reuired type="text" id="interest1" v-model="interest1" >
                    </div>
                    <div class="input flex flex-column">
                        <label for="interest2">Interest2</label>
                        <input required type="text" id="interest2" v-model="interest2" >
                    </div>
                    <div class="input flex flex-column">
                        <label for="interest1">Interest3</label>
                        <input required type="text" id="interest3" v-model="interest3" >
                    </div>
                </div>
                -->
            </div>
            <!--Contact Details-->
            <div class="contact-details flex flex-column">
                <h4>Contact Details</h4>
                <div class="input flex flex-column">
                    <label for="schoolEmail">School Email</label>
                    <input required type="text" id="schoolEmail" v-model="schoolEmail">
                </div>
                <div class="input flex flex-column">
                    <label for="personalEmail">Personal Email</label>
                    <input required type="text" id="personalEmail" v-model="personalEmail">
                </div>
                <div class="input flex flex-column">
                    <label for="contactNo">Contact Number</label>
                    <input required type="text" id="contactNo" v-model="contactNo">
                </div>
            </div>
            <!--Work Details-->
            <div class="work flex flex-column">
                <h4>File Details</h4>
              <div class="input flex flex-column">
                    <label for="resume">Resume</label>
                    <input type="file" multiple name="files[]" id="resume" accept=".jpeg,.pdf,.docx" v-on:change="changeResume">
                </div>
              <div class="input flex flex-column">
                  <label for="transcript">Transcript</label>
                  <input type="file" multiple name="files[]" id="transcript" accept=".jpeg,.pdf,.docx" v-on:change="changeTranscript">
              </div>
            </div>
            <!--
            <div class="interest flex" v-for="(item,index) in interests" :key="index">
                <div @click="toggleMenu" class="dropdown flex">
                    <span>Select Interest</span>
                    <ul v-show="menu" class="dropdown-menu">
                        <li @click="try">Artificial Intelligence</li>
                        <li>Scientific Computing Applications</li>
                        <li>Data Structures and Algorithms</li>
                        <li>Computer Architecture</li>
                        <li>Computer Networks</li>
                        <li>Computer Database</li>
                        <li>Database Mining</li>
                        <li>Data Analytics</li>
                        <li>Computer Graphics and Visualisation</li>
                        <li>Image and Sound Processing</li>
                        <li>Distributed Computing</li>
                        <li>Human-Computer Interaction</li>
                        <li>Software Engineering</li>
                        <li>Information and Coding Theory</li>
                    </ul>
                </div>
                
                <img class="delete" @click="deleteInterest(item.id)" src="../../assets/bin.png" alt="del button">
            </div>
            -->
            
            <!--
            <div class="interest flex" v-for="(item,index) in interests" :key="index">
                <div class="interest-flex">
                    <label class = "labelTag" for="interest">Interest</label>
                    <select class="inputTag" required type="text" id="interest" v-model="item.value" >   
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Scientific Computing Applications">Scientific Computing Applications</option>
                        <option value="Data Structures and Algorithms">Data Structures and Algorithms</option>
                        <option value="Computer Architecture">Computer Architecture</option>
                        <option value="Computer Networks">Computer Networks</option>
                        <option value="Computer Database">Computer Database</option>
                        <option value="Database Mining">Database Mining</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Computer Graphics and Visualisation">Computer Graphics and Visualisation</option>
                        <option value="Image and Sound Processing">Image and Sound Processing</option>
                        <option value="Distributed Computing">Distributed Computing</option>
                        <option value="Human-Computer Interaction">Human-Computer Interaction</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Information and Coding Theory">Information and Coding Theory</option>                        
                    </select>
                </div>
                <img class="delete" @click="deleteInterest(item.id)" src="../../assets/bin.png" alt="del button">
            </div>
            -->

            <!--Description-->
            <div class="description flex flex-column">
                <h4>Please limit your description to 500 characters</h4>
              <div class="input flex flex-column">
                    <label for="description">Description</label>
                    <textarea required type="text" id="schoolEmail" rows="4" cols="50" maxlength="500" v-model="description"></textarea> 
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
import firebaseApp from '../../firebase.js';
import {getFirestore} from 'firebase/firestore';
import {doc,setDoc,collection,getDocs,deleteDoc} from 'firebase/firestore';

import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"

const db = getFirestore(firebaseApp)

import { v4 as uuidv4 } from 'uuid';
import PopUp from '../../components/PopUp.vue'
import {useRouter} from "vue-router"
//import axios from 'axios'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const user = getAuth().currentUser
console.log(user)
const router = useRouter()
export default {
    //Fetch data from Firebase afterwards
    name: 'ProfileForm',
    created() {
        this.interests.push({
            id:uuidv4(),
            value: "",
        })
    },
    data() {
        return {
            name:'',
            course:'',
            year:'',
            interest1:'',
            interest2:'',
            interest3:'',
            schoolEmail:'',
            personalEmail:'',
            contactNo:'',
            interests: [],
            popUp:false,
            menu:false,
            //change to default later
            profileImage: null,
            //change to firebase later
            finalProfile: "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
        }
    },
    //Change to remove from firebase later
    methods: {
         add() {
             const maxSize = 3
             if (this.interests.length + 1 <= 3) {
                this.interests.push({
                    id:uuidv4(),
                    value: "",
                })
             }
             
         },
         onUpload() {
             /*
             const data = new FormData()
             data.append('image',this.profileImage,this.profileImage.name)
             axios.post(,data, {
                 onUploadProgress: uploadEvent => {
                     console.log("progress" + Math.round(uploadEvent.loaded/uploadEvent.total * 100) + '%')
                 }
             }).then((res) => {
                 console.log("success")
             })
             */

         },
         onFileSelected(event) {
            this.profileImage = event.target.files[0]
            const storage = getStorage();
            const profileRef = ref(storage, this.profileImage.name);
            const uploadTask = uploadBytesResumable(profileRef, this.profileImage)
            uploadTask.on('state_changed', (snapshot) => {}, (error) => {}, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', this.finalProfile = downloadURL);
                });
            }
            );
         },
         deleteInterest(id) {
             if (this.interests.length -1 > 0) {
                 this.interests = this.interests.filter(interest => interest.id != id)
             }
         },
         showPopUp() {
             this.popUp = true
         },
         close(leave) {
             if (leave === false) {
                 //TBC
              
                 this.popUp = false
                 this.$router.push({name:'StudentLogin'})
             } else {
                 
                 this.popUp = false
             }
         },
         toggleMenu() {
             this.menu = !this.menu
         },
         save() {
            setDoc(doc(db,"students",this.schoolEmail),{
                email:this.schoolEmail,
                name:this.name,
                course:this.course,
                year:this.year,
                interests:this.interests,
                personalEmail:this.personalEmail,
                contactNo:this.contactNo,
                finalProfile:this.finalProfile,
            })
         },
    },
    components: {
        PopUp,
    }
} 
</script>

<style scoped>
    
    .form-wrap {
      position:fixed;
      top:0;
      left:0%;
      background-color: transparent;
      width:100%;
      height:100vh;
      overflow:scroll;
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
        width:100%;
        background-color: #33d69f;
        border: none;
        outline:none;
        font-family: 'Poppins', sans-serif;
    }

    textarea {
        margin-bottom: 8px;
    }

    .labelTag,
    .inputTag {
        border-radius:20px;
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

    .content {
      position:relative;
      padding:50px;
      width:90%;
      background-color: green;
      color:aliceblue;
    }

    img {
        width:40px;
        height:40px;
    }

    .addBtn {
    
  
    }
    
    select{
        padding-left:0.55rem;
    }

    .delete {
        margin-top:-42px;
        margin-right:-15px;
        color:red;
    }

    .profile-pic {
        border-radius: 50%;
        margin-top:10px;
        width:10%;
        height:10%;

    }

    button,
    .button {
    cursor: pointer;
    padding: 16px 24px;
    border-radius: 30px;
    borer: none;
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
    background-color: #33d69f;
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