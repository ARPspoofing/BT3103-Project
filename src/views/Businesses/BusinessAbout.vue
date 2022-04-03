<template>
  <BusinessNavBar :search=true :Heading="Heading" :header=true />
  <div @click="check" ref="formWrap" class="form-wrap flex flex-column" id="mainBody">
      <form @submit.prevent="submitForm" class="content">
          <div class="profile-pic-outer">
              <img class="profile-pic" :src="finalProfile"/>
          </div>
          <div class="profile-icon">
              <input id = "profilepic" style="display:none" ref="profileUpload" type="file" @change="onFileSelected">
              <h6 @click="$refs.profileUpload.click()">Profile</h6>
          </div>

          <div class="personal-details flex flex-column">
            <h4>Company name</h4>
            <div class="input flex flex-column">                    
                <input type="text" id="name" v-model="name">
            </div>

            <div class="errorMsg" v-if="nameErrorPresent">{{this.errorMessage}}</div>

            <h4>Industry</h4>   
            <div class="input flex flex-column">
                
                <input type="text" id="industry" v-model="industry">
            </div>

            <div class="errorMsg" v-if="industryErrorPresent">{{this.errorMessage}}</div>

            <h4>Description</h4> 
            <div>
              <textarea name="" id="desc" cols="107" rows="5" v-model="description"></textarea>
            </div>
          </div> 
          <!--Save Exit-->
          <div class="save" id="buttons">
              <div class="right">
                <button type="submit" class="green" data-bs-toggle="modal" data-bs-target="#saveModal" >Save</button>                  
              </div>
              <div class="modal fade" id="saveModal" tabindex="-1" aria-labelledby="saveModalLabel" aria-hidden="true" 
                data-bs-backdrop="false">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-body">
                      <div class="words">
                      <i class="fa-solid fa-circle-check" id="tickIcon"></i>
                      <p>Edit changes?</p>
                      </div>
                      <span>
                        <div class = "applybtns">
                          <button type="button" id="yesbtn" data-bs-dismiss="modal" @click="save()">Yes</button>
                          <button type="button" id="nobtn" data-bs-dismiss="modal">No</button>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </form>
  </div>
</template>

<script>
import BusinessNavBar from '../../components/BusinessNavBar.vue'
import {signOut, getAuth, onAuthStateChanged} from "firebase/auth"
import firebaseApp from '../../firebase.js';
import { getFirestore, collection, doc, setDoc, deleteDoc, getDocs, updateDoc, getDoc, update, query, where } from "firebase/firestore"
import { writeBatch} from "firebase/firestore";
const db = getFirestore(firebaseApp);
import { v4 as uuidv4 } from 'uuid';
import {mapState} from "vuex"
import {mapMutations} from "vuex"
import PopUp from '../../components/PopUp.vue'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default {
  name: 'BusinessAbout',

  components: {
    BusinessNavBar,
  },
  computed: {
    ...mapState(['userEmail'])
  },
  data() {
    return {
        name:'',
        industry:'',
        description:'',
        popUp:false,
        industryErrorPresent:false,
        nameErrorPresent:false,
        user:false,
        errorMessage:'',
        finalProfile: "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",   
        profileImage: null,
        projectIds: [],
    }
  },
  
  props:{
      Heading: String,
      search: Boolean,
      header: Boolean,
  },

  methods:  {
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

    async save() {             
      this.nameErrorPresent = false;
      this.industryErrorPresent = false;  
      if (this.name == '') {
          this.nameErrorPresent = true;  
          this.errorMessage = "Please fill in your Company's name"
      } else if (this.industry == '') {
          this.industryErrorPresent = true;  
          this.errorMessage = "Please fill in your company's industry"
      } else {
          const auth = getAuth()
          const email = auth.currentUser.email;
          //accessing the current user and setting the elements
          await updateDoc(doc(db,'businesses',String(email)), {
              finalProfile: this.finalProfile,
              name: this.name,
              industry: this.industry,
              description: this.description,
              finalProfile: this.finalProfile,
          })

          //const projects = query(collection(db, "Project"), where('poster_id', '==', email));
          // let querySnapshot = await getDocs(collection(db, "Project"));
          // //console.log(querySnapshot)
          // querySnapshot.forEach((doc) => {
          //   var data = doc.data()
          //   var projId = doc.id
          //   if (doc.data().poster_id == email)
          //    doc.update({profPicture: this.finalProfile})
          // });


          let snapshot = await getDocs(collection(db, "Project"));

          snapshot.forEach(async (docs) => {
            let data = docs.data()
            var projId = docs.id

            if (data.poster_id == email) {
              this.projectIds.push(projId)
              console.log(this.projectIds)
            }
          });

          for (var i = 0; i < this.projectIds.length; i++) {
            await updateDoc(doc(db, "Project", this.projectIds[i]), {
              profPicture: this.finalProfile
            });
          }

          this.$router.push({name:"BusinessHomePage"})

      }
      alert("save data")
    },
  },

  mounted() {
    /*
    const auth = getAuth();
    var userEmail = auth.currentUser.email;
    */
    
    //var userEmail = window.localStorage.getItem('emailForSignIn')
    var userEmail = this.userEmail
    console.log(userEmail)
    const that = this;
    async function getApplicant(email) {
      const docSnap = await getDoc(doc(db, "businesses", email));
      console.log("doc: "+ docSnap)
      let data = docSnap.data();
      console.log(data)
      that.finalProfile = data.finalProfile
      that.name = data.name
      that.finalProfile = data.finalProfile
      that.industry = data.industry
      that.description = data.description
      /*
      if (!data.description) {
        that.description = data.description
      }
      */
    }
    getApplicant(userEmail)
  }
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

#saveModal {
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
    text-align: center;
    width: 180px;
    margin-left: 48px;
  }
</style>