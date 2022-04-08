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
      <span class="options">
        <b>ACCEPTED APPLICANTS</b>
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
            :buttons="false"
            :applicantName="item.name"
            :applicantCourse="item.course"
            :accepted="true"
            :status="item.status"
            @clickCard="indvApplicant(key)"
          />
        </div>
      </div>
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
  query,
  where,
} from "firebase/firestore";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
const db = getFirestore(firebaseApp);
import { getAuth } from "firebase/auth";

export default {
  name: "IndividualProjectAccApps",
  components: {
    BusinessNavBar,
    ApplicantsCard,
  },
  computed: {
    ...mapState(['cardItems','studentInfo']),
  },
  data() {
    return {
      Heading: "ACCEPTED APPLICANTS",
      //status: "pending",
      items: [],
      newApplicants: [],
      accApplicants: [],
      rejApplicants: [],
      applicant: [],
      projectId: "",
      offered: [],
      rejected: [],
      applied: [],
    };
  },

  methods: {
    ...mapActions(['GET_NEW_CARD',]),
    ...mapMutations(['SET_STUDENT_INFO',]),
    indvApplicant(key) {
      console.log(this.applicant[key])
      console.log(this.offered)
      /*
      this.SET_STUDENT_INFO('applicants',JSON.stringify(this.applicant[key]))
      this.SET_STUDENT_INFO('allApplicants', JSON.stringify(this.applicant))
      this.SET_STUDENT_INFO('newApplicants', JSON.stringify(this.newApplicants))
      this.SET_STUDENT_INFO('accApplicants',JSON.stringify(this.accApplicants))
      this.SET_STUDENT_INFO('rejApplicants', JSON.stringify(this.rejApplicants))
      this.SET_STUDENT_INFO('offered', JSON.stringify(this.offered))
      this.SET_STUDENT_INFO('rejected', JSON.stringify(this.rejected))
      this.SET_STUDENT_INFO('applied',JSON.stringify(this.applied))
      this.SET_STUDENT_INFO('items', JSON.stringify(this.items))
      this.SET_STUDENT_INFO('key', JSON.stringify(key))
      this.SET_STUDENT_INFO('stat', JSON.stringify(""))
      */
      this.SET_STUDENT_INFO({
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
        })
      console.log("currStudentInfo", this.studentInfo)

      //Non vuex
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
    },
  },

  mounted() {
    //Non-vuex
    /*
    this.items = JSON.parse(this.$route.params.items);
    this.projectId = JSON.parse(this.$route.params.items).projectId;
    console.log(this.$route.params.newApplicants);
    console.log(this.$route.params.accApplicants);
    if (this.$route.params.newApplicants) {
      this.newApplicants = JSON.parse(this.$route.params.newApplicants);
    }
    if (this.$route.params.accApplicants) {
      this.accApplicants = JSON.parse(this.$route.params.accApplicants);
      for (var i = 0; i < this.accApplicants.length; i++) {
        getApplicant(this.accApplicants[i]).then((res) => {
          this.applicant.push(res);
        });
      }
    }
    if (this.$route.params.rejApplicants) {
      this.rejApplicants = JSON.parse(this.$route.params.rejApplicants);
    }
    */
    //console.log(this.accApplicants);
    //console.log(this.newApplicants);
    //console.log(this.applicant);

    //vuex
    this.items = JSON.parse(this.cardItems);
    console.log(this.cardItems);
    console.log(this.cardItems);
    console.log("below carditems", this.items["accApplicants"]);
    this.projectId = JSON.parse(this.cardItems).projectId;
    if (this.items["accApplicants"]) {
      this.accApplicants = this.items['accApplicants'];
      for (var i = 0; i < this.accApplicants.length; i++) {
        getApplicant(this.accApplicants[i]).then((res) => {
          this.applicant.push(res);
        });
      }
    }

    const that = this;
    async function getApplicant(app) {
      const stuRef = collection(db, "students");
      const ref = doc(db, "students", app);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      console.log("studata", data.declineProjects);
      var stat = "pending";
      var inProg = data.inProgProjects;
      var declined = data.rejectedProjects;
      if (data.inProgProjects) {
        inProg = data.inProgProjects;
      }
      if (data.declinedProjects) {
        declined = data.declinedProjects;
      }

      //console.log(that.projectId)
      //console.log(inProg)
      //console.log(inProg.includes(that.projectId),String(that.projectId) , inProg )
      if (inProg.includes(that.projectId)) {
        stat = "accepted";
      } else if (declined.includes(that.projectId)) {
        stat = "declined";
      }
      //let result = await data.name
      return {
        name: data.name,
        course: data.course,
        status: stat,
        email: data.email,
      };
    }
    // console.log(this.newApplicants)
    // console.log(this.rejApplicants)
    console.log(this.applicant);
    // console.log(this.accApplicants)
    // console.log(this.offered)
    // console.log(this.rejected)
    // console.log(this.applied)
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
