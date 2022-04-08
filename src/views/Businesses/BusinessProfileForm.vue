<template>
  <PopUp @return="close" v-if="popUp" />
  <div @click="check" ref="formWrap" class="form-wrap flex flex-column">
    <form @submit.prevent="submitForm" class="content">
      <div class="profile-pic-outer">
        <img class="profile-pic" :src="finalProfile" />
      </div>
      <div class="profile-icon">
        <input
          style="display: none"
          ref="profileUpload"
          type="file"
          @change="onFileSelected"
        />
        <h6 @click="$refs.profileUpload.click()">Pick Profile</h6>
      </div>
      <!--Personal Details-->
      <div class="personal-details flex flex-column">
        <h4>Company name</h4>
        <div class="input flex flex-column">
          <input type="text" id="name" v-model="name" />
        </div>

        <div class="errorMsg" v-if="nameErrorPresent">
          {{ this.errorMessage }}
        </div>

        <h4>Industry</h4>
        <div class="input flex flex-column">
          <input type="text" id="industry" v-model="industry" />
        </div>

        <div class="errorMsg" v-if="industryErrorPresent">
          {{ this.errorMessage }}
        </div>

        <h4>Description</h4>
        <div>
          <textarea
            name=""
            id="desc"
            cols="30"
            rows="10"
            v-model="description"
          ></textarea>
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
import { v4 as uuidv4 } from "uuid";
import PopUp from "../../components/PopUp.vue";
import { useRouter } from "vue-router";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import firebaseApp from "../../firebase.js";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
const router = useRouter();
const db = getFirestore(firebaseApp);
export default {
  //Fetch data from Firebase afterwards
  name: "BusinessProfileForm",
  data() {
    return {
      name: "",
      industry: "",
      description: "",
      popUp: false,
      industryErrorPresent: false,
      nameErrorPresent: false,
      user: false,
      completedProjects: [],
      inProgressProjects: [],
      errorMessage: "",
      finalProfile:
        "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
    };
  },
  computed: {
    ...mapState(["name", "userEmail"]),
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  //Change to remove from firebase later
  methods: {
    ...mapMutations(["SET_NAME"]),

    try() {
      console.log("testc");
    },

    showPopUp() {
      this.popUp = true;
    },
    close(leave) {
      if (!leave) {
        //TBC
        //Need to add functionality to log out the user first
        const auth = getAuth();
        const user = auth.currentUser;
        signOut(auth, user);
        this.$router.push({ name: "BusinessLogin" });
        this.popUp = false;
      } else {
        this.popUp = false;
      }
    },
    toggleMenu() {
      this.menu = !this.menu;
    },

    async save() {
      this.nameErrorPresent = false;
      this.industryErrorPresent = false;
      if (this.name == "") {
        this.nameErrorPresent = true;
        this.errorMessage = "Please fill in your Company's name";
      } else if (this.industry == "") {
        this.industryErrorPresent = true;
        this.errorMessage = "Please fill in your company's industry";
      } else {
        this.SET_NAME(this.name);
        //Previous version of retrieving email. Have some problem
        /*
                 const auth = getAuth()
                 const email = auth.currentUser.email;
                 */
        //New version
        var email = this.userEmail;
        //const email = window.localStorage.getItem('emailForSignIn')
        //window.localStorage.setItem('businessName',this.name)

        //accessing the current user and setting the elements
        await setDoc(doc(db, "businesses", String(email)), {
          name: this.name,
          industry: this.industry,
          description: this.description,
          profileFormCreated: true,
          verifyEmail: true,
          finalProfile: this.finalProfile,
          inProgressProjects: this.inProgressProjects,
          completedProjects: this.completedProjects,
        });
        this.$emit("success", true);

        this.$router.push({ name: "BusinessHomePage" });
      }
    },
    onFileSelected(event) {
      this.profileImage = event.target.files[0];
      const storage = getStorage();
      const profileRef = ref(storage, this.profileImage.name);
      const uploadTask = uploadBytesResumable(profileRef, this.profileImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", (this.finalProfile = downloadURL));
          });
        }
      );
    },

    //save method would go to the landing page of the business
  },
  components: {
    PopUp,
  },
};
</script>

<style scoped>
.form-wrap {
  top: 0;
  left: 0;
  z-index: 101;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
}

::-webkit-scrollbar {
  display: none;
}

input,
select {
  margin-bottom: 20px;
  margin-left: 10px;
}

.interest-flex {
  width: 200px;
  margin-left: 10px;
}

input,
select,
textarea {
  width: 100%;
  background-color: #33d69f;
  border: none;
  outline: none;
}

textarea {
  margin-bottom: 8px;
}

.labelTag,
.inputTag {
  border-radius: 20px;
}

label {
  text-align: left;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3px;
}

.interest {
  gap: 5px;
  div {
    flex: 1;
  }
}

.content {
  position: relative;
  padding: 50px;
  width: 80%;
  background-color: #bbdfcc;
  color: black;
  border-radius: 5%;
}
img {
  position: absolute;
  width: 20px;
  height: 20px;
  left: 10px;
  right: 0px;
}

.addBtn {
  margin-left: 70%;
  margin-top: -50px;
}

select {
  padding-left: 0.55rem;
}

.delete {
  margin-top: -42px;
  margin-right: -15px;
  color: red;
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
    flex: 1;
  }
}

.right {
  margin-left: 80%;
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

.errorMsg {
  color: red;
  margin-top: 5px;
}

.profile-icon h6 {
  display: grid;
  place-items: center;
  cursor: pointer;
  color: blue;
  margin-top: 130px;
}

.profile-pic {
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  width: 120px;
  height: 120px;
}
</style>
