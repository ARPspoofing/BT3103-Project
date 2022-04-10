<template>
  <button ref="clickMe" click="moveOn" style="visibility: hidden"></button>
</template>

<script>
import BusinessNavBar from "../../components/BusinessNavBar.vue";
import Card from "../../components/Card.vue";
import firebaseApp from "../../firebase.js";
import { getFirestore } from "firebase/firestore";
import { useRouter } from "vue-router";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  getDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import BusinessProfileForm from "./BusinessProfileForm.vue";
const db = getFirestore(firebaseApp);
const router = useRouter();

export default {
  name: "BusinessReRoute",
  computed: {
    ...mapState(["userEmail", "key"]),
  },
  data() {
    return {
      testCollection: [],
    };
  },
  methods: {
    ...mapMutations(["SET_CARDITEMS"]),
    async moveOn() {
      const that = this;
      this.businessEmail = this.userEmail;
      var businessEmail = this.userEmail;
      let projects = query(
        collection(db, "Project"),
        where("Status", "!=", "completed"),
        orderBy("Status", "asc"),
        orderBy("Posted_Date", "desc")
      );
      let snapshot = await getDocs(projects);
      const testCollection = [];
      const docSnap = await getDoc(doc(db, "businesses", businessEmail));
      let data1 = docSnap.data();
      var pictureprof = data1.finalProfile;
      if (typeof pictureprof === "undefined") {
        pictureprof =
          "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png";
      }
      snapshot.forEach((docs) => {
        let data = docs.data();
        var id = docs.id;
        testCollection.push({
          projectId: id,
          projectTitle: data.Project_Title,
          description: data.Description,
          vacancies: data.Num_Of_Vacancies,
          allowance: data.Allowance,
          position: data.Position,
          projectStart: data.Project_Start,
          projectEnd: data.Project_End,
          tasks: data.Tasks,
          tags: data.Tags,
          newApplicants: data.New_Applicants,
          accApplicants: data.Acc_Applicants,
          rejApplicants: data.Rej_Applicants,
          posterId: data.poster_id,
          profilePicture: pictureprof,
          status: data.Status,
          application: data.Application,
        });
      });
      //that.testCollection = testCollection;
      this.SET_CARDITEMS(JSON.stringify(testCollection[this.key]));
      that.$router.push({
        name: "IndividualProjectInfo",
        params: {
          /*
          projectTitle: this.testCollection[key].projectTitle,
          description:this.testCollection[key].description,
          vacancies: this.testCollection[key].vacancies,
          allowance: this.testCollection[key].allowance,
          position: this.testCollection[key].position,
          projectStart: this.testCollection[key].projectStart,
          projectEnd: this.testCollection[key].projectEnd,
          tasks: JSON.stringify(this.testCollection[key].tasks),
          tags: JSON.stringify(this.testCollection[key].tags),*/
          items: JSON.stringify(testCollection[this.key]),
        },
      });
    },
  },
  beforeMount() {
    this.fetchProject();
  },
  /*
  mounted() {
    const that = this;
    this.businessEmail = this.userEmail;
    var businessEmail = this.userEmail;
    async function fetchProject() {
      let projects = query(
        collection(db, "Project"),
        where("Status", "!=", "completed"),
        orderBy("Status", "asc"),
        orderBy("Posted_Date", "desc")
      );
      let snapshot = await getDocs(projects);
      const testCollection = [];
      const docSnap = await getDoc(doc(db, "businesses", businessEmail));
      let data1 = docSnap.data();
      var pictureprof = data1.finalProfile;
      if (typeof pictureprof === "undefined") {
        pictureprof =
          "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png";
      }
      snapshot.forEach((docs) => {
        let data = docs.data();
        var id = docs.id;
        testCollection.push({
          projectId: id,
          projectTitle: data.Project_Title,
          description: data.Description,
          vacancies: data.Num_Of_Vacancies,
          allowance: data.Allowance,
          position: data.Position,
          projectStart: data.Project_Start,
          projectEnd: data.Project_End,
          tasks: data.Tasks,
          tags: data.Tags,
          newApplicants: data.New_Applicants,
          accApplicants: data.Acc_Applicants,
          rejApplicants: data.Rej_Applicants,
          posterId: data.poster_id,
          profilePicture: pictureprof,
          status: data.Status,
          application: data.Application,
        });
      });
      that.testCollection = testCollection;
    }
    fetchProject();
    alert(this.key)
    this.$router.push({
        name: "IndividualProjectInfo",
        params: {
          items: JSON.stringify(this.testCollection[this.key - 6]),
        },
      });
  },
  */
};
</script>

<style scoped>
</style>

