<template>
  <BusinessNavBar :Heading="Heading" :header="true" />
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
      <span>
        <router-link
          class="optionsOff"
          :to="{
            name: 'IndividualProjectNewApps',
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
          ><b>NEW APPLICANTS</b></router-link
        >
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
      <span class="options">
        <b>REJECTED APPLICANTS</b>
      </span>
    </h1>
    <hr />
    <div class="appContainer">
      <div :key="item.key" v-for="(item, key) in applicant">
        <ApplicantsCard
          :buttons="false"
          :applicantName="item.name"
          :applicantCourse="item.course"
          @clickCard="indvApplicant(key)"
          :picture="item.finalProfile"
        />
      </div>
      <!--       
        <ApplicantsCard :buttons=false />
        <ApplicantsCard :buttons=false />
        <ApplicantsCard :buttons=false /> -->
    </div>
  </div>
</template>

<script>
import BusinessNavBar from "../../components/BusinessNavBar.vue";
import ApplicantsCard from "../../components/ApplicantsCard.vue";
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
const db = getFirestore(firebaseApp);
import { getAuth } from "firebase/auth";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "IndividualProjectRejApps",
  components: {
    BusinessNavBar,
    ApplicantsCard,
  },
  data() {
    return {
      Heading: "REJECTED APPLICANTS",
      items: [],
      newApplicants: [],
      accApplicants: [],
      rejApplicants: [],
      applicant: [],
      offered: [],
      rejected: [],
      applied: [],
    };
  },
  computed: {
    ...mapState(["cardItems"]),
  },

  methods: {
    ...mapMutations(["SET_CARDITEMS", "CLEAR_CARDITEMS"]),
    indvApplicant(key) {
      console.log(this.applicant[key]);
      console.log(this.offered);
      this.CLEAR_CARDITEMS();
      //To fix ...
      this.$router.push({
        name: "BusinessViewStudentInfo",
        params: {
          applicants: JSON.stringify(this.applicant[key]),
          allApplicants: JSON.stringify(this.applicant),
          newApplicants: JSON.stringify(this.newApplicants),
          accApplicants: JSON.stringify(this.accApplicants),
          rejApplicants: JSON.stringify(this.rejApplicants),
          offered: JSON.stringify(this.offered),
          rejected: JSON.stringify(this.rejected),
          applied: JSON.stringify(this.applied),
          items: JSON.stringify(this.items),
          key: JSON.stringify(key),
          stat: JSON.stringify(""),
        },
      });
      this.SET_CARDITEMS({
        applicants: JSON.stringify(this.applicant[key]),
        allApplicants: JSON.stringify(this.applicant),
        newApplicants: JSON.stringify(this.newApplicants),
        accApplicants: JSON.stringify(this.accApplicants),
        rejApplicants: JSON.stringify(this.rejApplicants),
        offered: JSON.stringify(this.offered),
        rejected: JSON.stringify(this.rejected),
        applied: JSON.stringify(this.applied),
        items: JSON.stringify(this.items),
        key: JSON.stringify(key),
        stat: JSON.stringify(""),
      });
    },
  },

  mounted() {
    console.log("mounted");
    console.log("rej", this.cardItems["rejApplicants"]);
    this.items = JSON.parse(this.cardItems);
    console.log("test", this.items["rejApplicants"]);
    //non-vuex
    /*
    this.items = JSON.parse(this.$route.params.items)
    console.log(this.items)
    if (this.$route.params.newApplicants) {
      this.newApplicants = JSON.parse(this.$route.params.newApplicants)
    }
    if (this.$route.params.accApplicants) {
      this.accApplicants = JSON.parse(this.$route.params.accApplicants)
    }
    if (this.$route.params.rejApplicants) {
      this.rejApplicants = JSON.parse(this.$route.params.rejApplicants)
      for(var i = 0; i < this.rejApplicants.length; i++) {
        getApplicant(this.rejApplicants[i]).then((res)=>{this.applicant.push(res)})
      }
    }
    */
    //console.log(this.newApplicants)
    //console.log(this.accApplicants)
    //console.log(this.rejApplicants)
    //Veux
    this.items = JSON.parse(this.cardItems);
    if (this.items["rejApplicants"]) {
      //Get values of JSON dictionary
      var rejCopy = this.items["rejApplicants"];
      var rejValues = Object.keys(rejCopy).map(function (key) {
        return rejCopy[key];
      });
      //But the values arr is 2d
      //To flatten use ES6 spread
      var rej = [];
      rej = rej.concat(...rejValues);
      this.rejApplicants = rej;

      for (var i = 0; i < this.rejApplicants.length; i++) {
        getApplicant(this.rejApplicants[i]).then((res) => {
          this.applicant.push(res);
        });
      }
    }

    async function getApplicant(app) {
      const ref = doc(db, "students", app);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      //let result = await data.name
      return { name: data.name, course: data.course, email: data.email,finalProfile: data.finalProfile};
    }
    console.log(this.applicant);
  },
};
</script>

<style scoped>
.navbar-custom {
  background-color: #004a23;
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
</style>
