<template>
  <BusinessNavBar :Heading="Heading" :header="true" />

  <div
    class="modal fade"
    id="saveModalAccept"
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
            <p>Accept {{ modalName }}?</p>
          </div>
          <span>
            <div class="applybtns">
              <button
                type="button"
                id="yesbtn"
                data-bs-dismiss="modal"
                @click="confirmYesAccept"
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

  <div
    class="modal fade"
    id="saveModalReject"
    tabindex="-1"
    aria-labelledby="saveModalLabel"
    aria-hidden="true"
    data-bs-backdrop="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div class="words">
            <i class="fa-solid fa-times-circle" id="tickIcon"></i>
            <p>Reject {{ modalName }}?</p>
          </div>
          <span>
            <div class="applybtns">
              <button
                type="button"
                id="yesbtn"
                data-bs-dismiss="modal"
                @click="confirmYesReject"
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

  <div class="mainBody">
    <router-link
      class="floating-right-bottom-btn"
      :to="{ name: 'BusinessAddProject' }"
    >
      <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
    </router-link>
    <h1 id="interest">
      <span>
        <router-link
          class="optionsOff"
          :to="{
            name: 'IndividualProjectInfo',
            params: {
              items: JSON.stringify(this.items),
              newApplicants: JSON.stringify(this.newApplicants),
              accApplicants: JSON.stringify(this.accApplicants),
              rejApplicants: JSON.stringify(this.rejApplicants),
              offered: JSON.stringify(this.offered),
              rejected: JSON.stringify(this.rejected),
              applied: JSON.stringify(this.applied),
            },
          }"
          ><b>PROJECT INFO</b></router-link
        >
      </span>
      <span class="options">
        <b>NEW APPLICANTS</b>
      </span>
      <span>
        <router-link
          class="optionsOff"
          :to="{
            name: 'IndividualProjectAccApps',
            params: {
              items: JSON.stringify(this.items),
              newApplicants: JSON.stringify(this.newApplicants),
              accApplicants: JSON.stringify(this.accApplicants),
              rejApplicants: JSON.stringify(this.rejApplicants),
              offered: JSON.stringify(this.offered),
              rejected: JSON.stringify(this.rejected),
              applied: JSON.stringify(this.applied),
            },
          }"
          ><b>ACCEPTED APPLICANTS</b></router-link
        >
      </span>
      <span>
        <router-link
          class="optionsOff"
          :to="{
            name: 'IndividualProjectRejApps',
            params: {
              items: JSON.stringify(this.items),
              newApplicants: JSON.stringify(this.newApplicants),
              accApplicants: JSON.stringify(this.accApplicants),
              rejApplicants: JSON.stringify(this.rejApplicants),
              offered: JSON.stringify(this.offered),
              rejected: JSON.stringify(this.rejected),
              applied: JSON.stringify(this.applied),
            },
          }"
          ><b>REJECTED APPLICANTS</b></router-link
        >
      </span>
    </h1>
    <hr />
    <div>
      <div class="appContainer">
        <div :key="item.key" v-for="(item, key) in applicant">
          <ApplicantsCard
            :buttons="true"
            :applicantName="item.name"
            :applicantCourse="item.course"
            @acceptbtn="accApplicant(key)"
            @rejectbtn="rejApplicant(key)"
            @clickCard="indvApplicant(key)"
            @firstClick="firstClick"
            :popUpConfirm="this.popUpConfirm"
          />
        </div>
      </div>
    </div>
  </div>
  <button
    type="submit"
    style="visibility: hidden"
    ref="confirmModalAccept"
    class="green"
    data-bs-toggle="modal"
    data-bs-target="#saveModalAccept"
  >
    Accept
  </button>
  <button
    type="submit"
    style="visibility: hidden"
    ref="confirmModalReject"
    class="green"
    data-bs-toggle="modal"
    data-bs-target="#saveModalReject"
  >
    Reject
  </button>
</template>

<script>
import BusinessNavBar from "../../components/BusinessNavBar.vue";
import ApplicantsCard from "../../components/ApplicantsCard.vue";
import BusinessViewStudentInfo from "./BusinessViewStudentInfo.vue";
import firebaseApp from "../../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

const db = getFirestore(firebaseApp);
import { getAuth } from "firebase/auth";

export default {
  name: "IndividualProjectNewApps",
  components: {
    BusinessNavBar,
    ApplicantsCard,
    BusinessViewStudentInfo,
  },
  computed: {
    ...mapState(["cardItems", "userEmail", "key"]),
  },
  data() {
    return {
      Heading: "NEW APPLICANTS",
      projectId: "",
      items: [],
      newApplicants: [],
      accApplicants: [],
      rejApplicants: [],
      applicant: [],
      offered: [],
      rejected: [],
      applied: [],
      popUpConfirm: null,
      modalName: null,
    };
  },

  methods: {
    ...mapActions(["GET_NEW_CARD"]),
    //...mapMutations(['SET_KEY',]),
    firstClick(event, name) {
      this.modalName = name;
      if (event == true) {
        this.$refs.confirmModalAccept.click();
      } else {
        this.$refs.confirmModalReject.click();
      }
    },
    confirmYesAccept() {
      this.popUpConfirm = true;
    },
    confirmYesReject() {
      this.popUpConfirm = false;
    },
    indvApplicant(key) {
      alert("key " + key);
      console.log(this.applicant[key]);
      console.log(this.offered[key]);
      this.$router.push({
        name: "BusinessViewStudentInfo",
        params: {
          applicants: JSON.stringify(this.applicant[key]),
          allApplicants: JSON.stringify(this.applicant),
          newApplicants: JSON.stringify(this.newApplicants),
          accApplicants: JSON.stringify(this.accApplicants),
          rejApplicants: JSON.stringify(this.rejApplicants),
          offered: JSON.stringify(this.offered[key]),
          rejected: JSON.stringify(this.rejected[key]),
          applied: JSON.stringify(this.applied[key]),
          items: JSON.stringify(this.items),
          key: JSON.stringify(key),
          stat: JSON.stringify("showbtns"),
        },
      });
    },

    async accApplicant(key) {
      //this.SET_KEY(key)
      //this.GET_NEW_CARD()
      //TBC this.$refs.confirmModal.click()
      alert("key " + key);
      var accApplicant = this.newApplicants[key];
      var offered = this.offered[key];
      var name = this.applicant[key].name;
      var projTitle = this.items["projectTitle"];
      var projId = this.items["projectId"];
      var applied = this.applied[key];

      if (!this.accApplicants) {
        var accApplicants = [];
        accApplicants.push(accApplicant);
        this.accApplicants = accApplicants;
      } else {
        this.accApplicants.push(accApplicant);
      }

      var index = applied.indexOf(projId);
      applied.splice(index, 1);

      offered.push(projId);
      this.newApplicants.splice(key, 1);
      this.applicant.splice(key, 1);
      this.offered.splice(key, 1);
      this.applied.splice(key, 1);

      alert("Accepting applicant: " + name);
      try {
        const docRef = await updateDoc(doc(db, "Project", projId), {
          Acc_Applicants: this.accApplicants,
          New_Applicants: this.newApplicants,
        });
        const docRef2 = await updateDoc(doc(db, "students", accApplicant), {
          offeredProjects: offered,
          appliedProjects: applied,
        });
        console.log(docRef);
        this.GET_NEW_CARD();
        this.$emit("updated");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },

    async rejApplicant(key) {
      //this.SET_KEY(key)
      //this.GET_NEW_CARD()
      alert("key " + key);
      var rejApplicant = this.newApplicants[key];
      var rejected = this.rejected[key];
      var name = this.applicant[key].name;
      var projTitle = this.items["projectTitle"];
      var projId = this.items["projectId"];
      var applied = this.applied[key];
      console.log("bef" + applied);

      if (!this.rejApplicants) {
        var rejApplicants = [];
        rejApplicants.push(rejApplicant);
        this.rejApplicants = rejApplicant;
      } else {
        this.rejApplicants.push(rejApplicant);
      }

      var index = applied.indexOf(projId);
      applied.splice(index, 1);
      console.log("aft" + applied);

      rejected.push(projId);

      this.rejected.splice(key, 1);
      this.newApplicants.splice(key, 1);
      this.applicant.splice(key, 1);
      this.applied.splice(key, 1);

      alert("Rejecting applicant: " + name);

      try {
        const docRef = await updateDoc(doc(db, "Project", projId), {
          Rej_Applicants: this.rejApplicants,
          New_Applicants: this.newApplicants,
        });

        const docRef2 = await updateDoc(doc(db, "students", rejApplicant), {
          rejectedProjects: rejected,
          appliedProjects: applied,
        });
        this.GET_NEW_CARD();
        this.$emit("updated");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
  },

  mounted() {
    //Non-vuex
    /*
    this.items = JSON.parse(this.$route.params.items);
    this.projectId = JSON.parse(this.$route.params.items).projectId;
    this.newApplicants = JSON.parse(this.$route.params.items).newApplicants;
    this.accApplicants = JSON.parse(this.$route.params.items).accApplicants;
    this.rejApplicants = JSON.parse(this.$route.params.items).rejApplicants;
    */
    //vuex
    console.log(this.cardItems);
    this.items = JSON.parse(this.cardItems);
    this.projectId = JSON.parse(this.cardItems).projectId;
    this.newApplicants = JSON.parse(this.cardItems).newApplicants;
    this.accApplicants = JSON.parse(this.cardItems).accApplicants;
    this.rejApplicants = JSON.parse(this.cardItems).rejApplicants;
    //Non-vuex
    /*
    if (this.$route.params.newApplicants) {
      this.newApplicants = JSON.parse(this.$route.params.newApplicants);
      for (var i = 0; i < this.newApplicants.length; i++) {
        getApplicant(this.newApplicants[i]).then((res) => {
          this.applicant.push(res);
        });
        getOfferedProjects(this.newApplicants[i]).then((res) => {
          this.offered.push(res);
        });
        getRejectedProjects(this.newApplicants[i]).then((res) => {
          this.rejected.push(res);
        });
        getAppliedProjects(this.newApplicants[i]).then((res) => {
          this.applied.push(res);
        });
        console.log(this.applicant);
      }
    }
    if (this.$route.params.accApplicants) {
      this.accApplicants = JSON.parse(this.$route.params.accApplicants);
    }
    if (this.$route.params.rejApplicants) {
      this.rejApplicants = JSON.parse(this.$route.params.rejApplicants);
    }
    */

    //Vuex
    if (this.newApplicants) {
      for (var i = 0; i < this.newApplicants.length; i++) {
        getApplicant(this.newApplicants[i]).then((res) => {
          this.applicant.push(res);
        });
        getOfferedProjects(this.newApplicants[i]).then((res) => {
          this.offered.push(res);
        });
        getRejectedProjects(this.newApplicants[i]).then((res) => {
          this.rejected.push(res);
        });
        getAppliedProjects(this.newApplicants[i]).then((res) => {
          this.applied.push(res);
        });
        console.log(this.applicant);
      }
    }

    async function getApplicant(app) {
      const ref = doc(db, "students", app);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      return { name: data.name, course: data.course, email: data.email };
    }

    async function getOfferedProjects(app) {
      const ref = doc(db, "students", app);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      return data.offeredProjects;
    }

    async function getRejectedProjects(app) {
      const ref = doc(db, "students", app);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      return data.rejectedProjects;
    }

    async function getAppliedProjects(app) {
      const ref = doc(db, "students", app);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      return data.appliedProjects;
    }
  },
};
</script>

<style scoped>
.navbar-custom {
  background-color: #004a23;
}

.mainBody {
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: scroll;
  padding-bottom: 550px;
}

.appContainer {
  margin-left: 30px;
}

#title {
  color: white;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 0px;
}

.btn {
  margin: 10px;
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
  padding: 5px 25px;
  margin-left: 15px;
  border-radius: 30px; /* or 50% */
  background-color: #0e8044;
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

.optionsOff:hover {
  color: #0e8044;
}

.floating-right-bottom-btn {
  position: fixed;
  right: 40px;
  bottom: 50px;
  background-color: white;
  border-width: 0px;
  height: 70px;
  width: 70px;
  z-index: 110;
  border-radius: 50%;
  padding: 0px;
  background: #f8f8f8;
}

#plusIcon {
  height: 70px;
  width: 70px;
  color: #004a23;
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
}

#tickIcon {
  height: 38px;
  width: 38px;
  color: #3d9956;
  float: left;
}

.modal-body p {
  font-size: 18px;
  text-align: center;
  width: 180px;
  margin-left: 48px;
  color: #3f3f3f;
}
</style>
