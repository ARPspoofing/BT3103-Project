<template>
  <StudentNavBar :search="true" :Heading="Heading" :header="true" />
  <PopUp @return="close" v-if="popUp" />
  <div
    @click="check"
    ref="formWrap"
    class="form-wrap flex flex-column"
    id="mainBody"
  >
    <form @submit.prevent="submitForm" class="content">
      <div class="profile-pic-outer">
        <img class="profile-pic" :src="finalProfile" />
      </div>
      <div class="profile-icon">
        <input
          id="profilepic"
          style="display: none"
          ref="profileUpload"
          type="file"
          @change="onFileSelected"
        />
        <h6 @click="$refs.profileUpload.click()">Profile</h6>
      </div>

      <!--Personal Details-->
      <div class="personal-details flex flex-column">
        <h4>Personal Details</h4>
        <div class="input flex flex-column">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" />
        </div>

        <div class="errorMsg" v-if="nameErrorPresent">
          {{ this.errorMessage }}
        </div>

        <div class="input flex flex-column">
          <label for="faculty">Faculty</label>
          <input
            disabled
            type="text"
            id="faculty"
            value="School of Computing"
            readonly
          />
        </div>
        <div class="input flex flex-column">
          <label for="course">Course</label>
          <select type="text" id="course" v-model="course">
            <option value="Business Analytics">Business Analytics</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Security">Information Security</option>
            <option value="Information Systems">Information Systems</option>
          </select>
        </div>
        <div class="errorMsg" v-if="courseErrorPresent">
          {{ this.errorMessage }}
        </div>
        <div class="input flex flex-column">
          <label for="year">Year</label>
          <input type="text" id="year" v-model="year" />
        </div>
        <div class="errorMsg" v-if="yearErrorPresent">
          {{ this.errorMessage }}
        </div>
        <div class="flex flex-row">
          <div style="margin-top: 5px; width: 100%">
            <ul style="display: grid; grid-template-columns: repeat(5, 1fr)">
              <li
                v-for="(item, index) in interests"
                style="width: 20%; display: inline"
              >
                <div class="interest-flex">
                  <label class="labelTag" for="interest">Interest</label>
                  <select
                    class="inputTag"
                    type="text"
                    id="interest"
                    v-model="item.value"
                  >
                    <option value="Artificial Intelligence">
                      Artificial Intelligence
                    </option>
                    <option value="Scientific Computing">
                      Scientific Computing
                    </option>
                    <option value="Data Structures">Data Structures</option>
                    <option value="Computer Architecture">
                      Computer Architecture
                    </option>
                    <option value="Computer Networks">Computer Networks</option>
                    <option value="Computer Database">Computer Database</option>
                    <option value="Database Mining">Database Mining</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Computer Graphics">Computer Graphics</option>
                    <option value="Image/Sound Processing">
                      Image/Sound Processing
                    </option>
                    <option value="Distributed Computing">
                      Distributed Computing
                    </option>
                    <option value="Human Computer Interaction">
                      Human Computer Interaction
                    </option>
                    <option value="Software Engineering">
                      Software Engineering
                    </option>
                    <option value="Information Theory">
                      Information Theory
                    </option>
                  </select>
                </div>
                <p class="delete" @click="deleteInterest(item.id)">x</p>
              </li>
            </ul>
          </div>

          <div class="addBtn">
            <img @click="add" src="../../assets/add.png" alt="add button" />
          </div>
        </div>
        <div class="errorMsg" v-if="interestErrorPresent">
          {{ this.errorMessage }}
        </div>
      </div>

      <!--Contact Details-->
      <div class="contact-details flex flex-column">
        <h4>Contact Details</h4>
        <div class="input flex flex-column">
          <label for="schoolEmail">School Email</label>
          <input type="text" id="schoolEmail" v-model="schoolEmail" />
        </div>
        <div class="errorMsg" v-if="schoolEmailErrorPresent">
          {{ this.errorMessage }}
        </div>
        <div class="input flex flex-column">
          <label for="personalEmail">Personal Email</label>
          <input type="text" id="personalEmail" v-model="personalEmail" />
        </div>
        <div class="errorMsg" v-if="personalEmailErrorPresent">
          {{ this.errorMessage }}
        </div>
        <div class="input flex flex-column">
          <label for="contactNo">Contact Number</label>
          <input type="text" id="contactNo" v-model="contactNo" />
        </div>
        <div class="errorMsg" v-if="contactNumberErrorPresent">
          {{ this.errorMessage }}
        </div>
      </div>
      <!--Work Details-->
      <div class="work flex flex-column">
        <h4>File Details</h4>
        <div class="input flex flex-column">
          <label for="resume">Resume</label>
          <a v-bind:href="this.resumeLink" target="_blank" class="but"
            >View Resume</a
          >
          <input
            type="file"
            multiple
            name="files[]"
            id="resume"
            accept=".jpeg,.pdf,.docx"
            v-on:change="changeResume"
          />
        </div>
        <div class="errorMsg" v-if="resumeErrorPresent">
          {{ this.errorMessage }}
        </div>
        <div class="input flex flex-column">
          <label for="transcript">Transcript</label>
          <a v-bind:href="transcriptLink" target="_blank" class="but"
            >View Transcript</a
          >
          <input
            type="file"
            multiple
            name="files[]"
            id="transcript"
            accept=".jpeg,.pdf,.docx"
            v-on:change="changeTranscript"
          />
        </div>
        <div class="errorMsg" v-if="transcriptErrorPresent">
          {{ this.errorMessage }}
        </div>
      </div>

      <!--Description-->
      <div class="description flex flex-column">
        <h4>Please limit your description to 500 characters</h4>
        <div class="input flex flex-column">
          <label for="description">Description</label>
          <textarea
            type="text"
            id="description"
            rows="4"
            cols="50"
            maxlength="500"
            v-model="description"
          ></textarea>
        </div>
      </div>

      <!--Save Exit-->
      <div class="save" id="buttons">
        <div class="right">
          <button
            type="submit"
            class="green"
            data-bs-toggle="modal"
            data-bs-target="#saveModal"
          >
            Save
          </button>
        </div>
        <div
          class="modal fade"
          id="saveModal"
          tabindex="-1"
          aria-labelledby="saveModalLabel"
          aria-hidden="true"
          data-bs-backdrop="false"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <div class="words">
                  <i class="fa-solid fa-circle-check" id="tickIcon"></i>
                  <p>Save changes?</p>
                </div>
                <span>
                  <div class="applybtns">
                    <button
                      type="button"
                      id="yesbtn"
                      data-bs-dismiss="modal"
                      @click="save"
                    >
                      Yes
                    </button>
                    <button type="button" id="nobtn" data-bs-dismiss="modal">
                      No
                    </button>
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
import StudentNavBar from "../../components/StudentNavBar.vue";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../../firebase.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  getDoc,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);
import { v4 as uuidv4 } from "uuid";
import PopUp from "../../components/PopUp.vue";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "StudentAbout",
  created() {
    this.interests.push({
      id: uuidv4(),
      value: "",
    });
    console.log(this.interests.target);
  },
  components: {
    StudentNavBar,
    PopUp,
  },
  computed: {
    ...mapState(["userEmail"]),
  },
  data() {
    return {
      Heading: "PROFILE",
      name: "",
      course: "",
      year: "",
      interest1: "",
      interest2: "",
      interest3: "",
      schoolEmail: "",
      personalEmail: "",
      contactNo: "",
      interests: [],
      popUp: false,
      menu: false,
      //change to default later
      profileImage: null,
      resume: null,
      transcript: null,
      nameErrorPresent: false,
      courseErrorPresent: false,
      yearErrorPresent: false,
      interestErrorPresent: false,
      schoolEmailErrorPresent: false,
      personalEmailErrorPresent: false,
      contactNumberErrorPresent: false,
      resumeErrorPresent: false,
      transcriptErrorPresent: false,
      transcriptPresent: false,
      resumePresent: false,

      //change to firebase later
      finalProfile:
        "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
      errorMessage: "",
      resumeLink: "",
      transcriptLink: "",
      description: "",
    };
  },

  props: {
    Heading: String,
    search: Boolean,
    header: Boolean,
  },

  methods: {
    add() {
      const maxSize = 3;
      if (this.interests.length + 1 <= 3) {
        this.interests.push({
          id: uuidv4(),
          value: "",
        });
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

    changeResume(event) {
      this.resumePresent = true;
      //Add code to upload the resume somewhere
      var email = this.userEmail;
      this.resume = event.target.files[0];
      const storage = getStorage();
      const resumeRef = ref(storage, email + "/" + this.resume.name);
      const uploadTask = uploadBytesResumable(resumeRef, this.resume);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("File available at", (this.resumeLink = url));
            this.resumeLink = url;
            console.log(this.resumeLink);
          });
        }
      );
    },

    changeTranscript(event) {
      this.transcriptPresent = true;
      //Add code to upload the transcript somewhere
      var email = this.userEmail;
      this.transcript = event.target.files[0];
      const storage = getStorage();
      const transcriptRef = ref(storage, email + "/" + this.transcript.name);
      const uploadTask = uploadBytesResumable(transcriptRef, this.transcript);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("File available at", (this.transcriptLink = url));
          });
        }
      );
    },
    deleteInterest(id) {
      if (this.interests.length - 1 > 0) {
        this.interests = this.interests.filter((interest) => interest.id != id);
      }
    },

    showPopUp() {
      this.popUp = true;
      console.log(this.popUp);
    },

    close(leave) {
      if (leave === false) {
        this.popUp = false;
        this.$router.push({ name: "StudentHomePage" });
      } else {
        this.popUp = false;
      }
    },

    allInterestsEmpty() {
      for (let i = 0; i < this.interests.length; i++) {
        if (this.interests[i].value != "") {
          return false;
        }
      }

      return true;
    },
    async save() {
      this.nameErrorPresent = false;
      this.courseErrorPresent = false;
      this.yearErrorPresent = false;
      this.interestErrorPresent = false;
      this.schoolEmailErrorPresent = false;
      this.personalEmailErrorPresent = false;
      this.contactNumberErrorPresent = false;
      this.resumeErrorPresent = false;
      this.transcriptErrorPresent = false;

      if (this.name == "") {
        this.nameErrorPresent = true;
        this.errorMessage = "Please fill out your name";
      } else if (this.course == "") {
        this.courseErrorPresent = true;
        this.errorMessage =
          "Please select your course from the options provided";
      } else if (this.year == "") {
        this.yearErrorPresent = true;
        this.errorMessage = "Please fill out your current year of study";
      } else if (parseInt(this.year) > 4 || parseInt(this.year) < 1) {
        this.yearErrorPresent = true;
        this.errorMessage =
          "Please fill out a valid year of study (Must be between 1 and 4 inclusive)";
      } else if (this.allInterestsEmpty()) {
        this.interestErrorPresent = true;
        this.errorMessage = "Please select at least one area of interest";
      } else if (this.schoolEmail == "") {
        this.schoolEmailErrorPresent = true;
        this.errorMessage = "Please enter your school email";
      } else if (this.personalEmail == "") {
        this.personalEmailErrorPresent = true;
        this.errorMessage = "Please enter your personal email";
      } else if (this.contactNo == "") {
        this.contactNumberErrorPresent = true;
        this.errorMessage = "Please enter your contact number";
      } else if (this.contactNo.toString().length != 8) {
        console.log(this.contactNo.length);
        this.contactNumberErrorPresent = true;
        this.errorMessage = "Please enter a valid contact number";
      } else if (!this.resumePresent && this.resumeLink == "") {
        this.resumeErrorPresent = true;
        this.errorMessage = "Please upload your resume";
      } else if (!this.transcriptPresent && this.transcriptLink == "") {
        this.transcriptErrorPresent = true;
        this.errorMessage = "Please upload your transcript";
      } else {
        console.log("link ", this.resumeLink);
        updateDoc(doc(db, "students", String(this.schoolEmail)), {
          email: this.schoolEmail,
          name: this.name,
          course: this.course,
          year: this.year,
          interests: this.interests,
          personalEmail: this.personalEmail,
          contactNo: this.contactNo,
          finalProfile: this.finalProfile,
          resumeDownloadLink: this.resumeLink,
          transcriptDownloadLink: this.transcriptLink,
          description: this.description,
        });
        this.$router.push({ name: "StudentHomePage" });
      }
      // alert("save data");
    },
  },

  mounted() {
    /*
    const auth = getAuth();
    var userEmail = auth.currentUser.email;
    console.log(userEmail)
    */
    var userEmail = this.userEmail;
    const that = this;
    async function getApplicant(userEmail) {
      const docSnap = await getDoc(doc(db, "students", userEmail));
      console.log("doc: " + docSnap);
      let data = docSnap.data();
      console.log(data);
      that.finalProfile = data.finalProfile;
      that.name = data.name;
      that.course = data.course;
      that.year = data.year;
      that.interests = data.interests;
      that.schoolEmail = data.email;
      that.personalEmail = data.personalEmail;
      that.contactNo = data.contactNo;
      that.resumeLink = data.resumeDownloadLink;
      that.transcriptLink = data.transcriptDownloadLink;
      that.description = data.description;
      /*
      if (!data.description) {
        that.description = data.description
      }
      */
    }
    getApplicant(userEmail);
  },
};
</script>

<style scoped>
#mainBody {
  background-color: #f5f5f5;
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
  padding: 8px;
}

nav {
  background-color: "#004A23";
}

.form-wrap {
  position: fixed;
  background-color: transparent;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  margin-bottom: 30px;
}

input,
select {
  margin-bottom: 20px;
  margin-left: 10px;
}

.interest-flex {
  width: 200px;
}

input,
select,
textarea {
  width: 70%;
  background-color: #bbdfcc;
  border: none;
  outline: none;
  font-family: "Poppins", sans-serif;
  margin-left: auto;
  margin-right: auto;
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

.addBtn {
  margin-top: 6vh;
}

.interest {
  gap: 10px;
  div {
    flex: 1;
  }
}

img {
  width: 40px;
  height: 40px;
}

select {
  padding-left: 0.55rem;
}

.delete {
  margin-top: -45px;
  margin-left: 35px;
  color: red;
}

.profile-pic {
  border-radius: 50%;
  margin: 10px 0px;
  width: 120px;
  height: 120px;
}

.errorMsg {
  color: red;
  margin-top: 5px;
}

button,
.button {
  cursor: pointer;
  padding: 7px 44px;
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
    flex: 1;
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
  background-color: #0e8044;
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
  background-color: green;
  width: 100px;
  text-align: center;
  margin-top: -5px;
}

.profile-icon h4 {
  display: grid;
  place-items: center;
  cursor: pointer;
  color: blue;
}

#applyModal {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #bbdfcc;
  border: none;
}

.words {
  width: max-content;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  height: 50px;
}

.applybtns {
  width: max-content;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}

#yesbtn,
#nobtn {
  margin: 10px;
  border: none;
  border-radius: 10px;
  background-color: #89ca9a;
  color: #3f3f3f;
  width: 120px;
  height: 30px;
  font-size: 18px;
  padding-top: 3px;
}

#tickIcon {
  height: 38px;
  width: 38px;
  color: #3d9956;
}

.modal-body p {
  text-align: center;
  width: max-content;
  margin-bottom: 20px;
}

.but {
  text-decoration: none;
  background: #0e8044;
  padding: 4px;
  border-radius: 8px;
  color: white;
  width: 180px;
  margin-left: 15%;
  margin-right: auto;
  margin-bottom: 5px;
}

#saveModal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
