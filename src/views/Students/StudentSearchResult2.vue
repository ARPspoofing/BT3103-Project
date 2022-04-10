<template>
  <StudentNavBar :search="true" :header="true" />

  <div v-if="!loading" class="mainBody">
    <!-- <button class="purple button" @click="toggleFilterMenu">Filter</button> -->
    <!--
    <button @click="closeFilterMenu"> close filter menu </button>
    -->

    <div>
      <div class="right"></div>
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
                <p>Apply to {{ currProject }}?</p>
              </div>
              <span>
                <div class="applybtns">
                  <button
                    type="button"
                    id="yesbtn"
                    data-bs-dismiss="modal"
                    @click="confirmYes(true)"
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
      <button
        style="visibility: hidden"
        type="submit"
        ref="confirmModal"
        class="green"
        data-bs-toggle="modal"
        data-bs-target="#saveModal"
      >
        Save
      </button>
    </div>

    <transition name="filter">
      <Filter @submitFilter="closeFilterMenu" v-if="filterModal" />
    </transition>

    <div
      @click="openFilter"
      ref="filterWrap"
      class="filter-wrap flex flex-column"
    ></div>
    <h1 id="status" class="searchDisplay" v-if="!noProjectsPresent">
      <button class="button" @click="toggleFilterMenu">Filter</button>
      <nav class="menu">
        <ol>
          <li class="menu-item">
            <a>Sort By</a>
            <ol class="sub-menu">
              <li @click="fetchProjectOrder('recent')" class="menu-item">
                <a href="#0">Recent</a>
              </li>
              <li @click="fetchProjectOrder('oldest')" class="menu-item">
                <a href="#0">Oldest</a>
              </li>
              <li @click="fetchProjectOrder('shortest')" class="menu-item">
                <a href="#0">Longest</a>
              </li>
              <li @click="fetchProjectOrder('longest')" class="menu-item">
                <a href="#0">Shortest</a>
              </li>
              <li @click="fetchProjectOrder('highest')" class="menu-item">
                <a href="#0">Lowest</a>
              </li>
              <li @click="fetchProjectOrder('lowest')" class="menu-item">
                <a href="#0">Highest</a>
              </li>
            </ol>
          </li>
        </ol>
      </nav>

      <div v-if="stopLoader">Search results for {{ receivedSearch }}:</div>
      <hr />
    </h1>
    <div v-if="noProjectsPresent" class="noProject">
      <PathfinderLoading v-if="!stopLoader" />
      <h1 v-if="stopLoader" class="noProjectsText">
        Sorry, no projects matched your search
        <span style="color: green">{{ receivedSearch }}</span
        >. <br />
        Ensure that you have spelled your search correctly.
      </h1>
      <!-- {{GET_SEARCH_DATA}} -->
    </div>
    <PathfinderLoading v-if="!stopLoader" />
    <div v-if="stopLoader" class="projectContainer">
      <div :key="item.key" v-for="(item, key) in highestPriority">
        <!--
        <Card
          :apply="true"
          :projectTitle="item.projectTitle"
          :picture="item.profilePicture"
          :description="item.description"
          @clickCard="indivprojFirst(key)"
          @applicantbtn="addApplicantFirst(key + 2 * 6)"
        />
        -->
        <Card
          :apply="true"
          :like="true"
          :latest="false"
          :projectTitle="item.projectTitle"
          :description="item.description"
          :appstat="item.appstat"
          @applicantbtn="addApplicantFirst(key)"
          @clickCard="indivprojFirst(key)"
          @applying="applyingFirst($event, key)"
          :picture="item.profilePicture"
        />
      </div>

      <div :key="item.key" v-for="(item, key) in secondPriority">
        <!--
        <Card
          :apply="true"
          :projectTitle="item.projectTitle"
          :picture="item.profilePicture"
          :description="item.description"
          @clickCard="indivprojSecond(key)"
          @applicantbtn="addApplicantSecond(key + 2 * 6)"
        />
        -->
        <Card
          :apply="true"
          :like="true"
          :latest="false"
          :projectTitle="item.projectTitle"
          :description="item.description"
          :appstat="item.appstat"
          @applicantbtn="addApplicantSecond(key)"
          @clickCard="indivprojSecond(key)"
          @applying="applyingSecond($event, key)"
          :picture="item.profilePicture"
        />
      </div>

      <div :key="item.key" v-for="(item, key) in thirdPriority">
        <!--
        <Card
          :apply="true"
          :projectTitle="item.projectTitle"
          :picture="item.profilePicture"
          :description="item.description"
          @clickCard="indivprojThird(key)"
          @applicantbtn="addApplicantThird(key + 2 * 6)"
        />
        -->
        <Card
          :apply="true"
          :like="true"
          :latest="false"
          :projectTitle="item.projectTitle"
          :description="item.description"
          :appstat="item.appstat"
          @applicantbtn="addApplicantThird(key)"
          @clickCard="indivprojThird(key)"
          @applying="applyingThird($event, key)"
          :picture="item.profilePicture"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StudentNavBar from "../../components/StudentNavBar.vue";
import Card from "../../components/Card.vue";
import firebaseApp from "../../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  orderBy,
  query,
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  getDoc,
  where,
  arrayUnion,
} from "firebase/firestore";
import { signOut, getAuth } from "firebase/auth";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import Filter from "../../components/Filter.vue";
import PathfinderLoading from "../../components/PathfinderLoading.vue";
const db = getFirestore(firebaseApp);
const that = this;

export default {
  name: "StudentSearchResult2",
  components: {
    StudentNavBar,
    Card,
    Filter,
    PathfinderLoading,
  },

  computed: {
    ...mapState([
      "searchString",
      "filterModal",
      "searchData",
      "highestPriorityIds",
      "secondPriorityIds",
      "thirdPriorityIds",
      "recent",
      "oldest",
      "shortest",
      "longest",
      "highest",
      "lowest",
      "cardItems",
      "userEmail",
    ]),
    //...mapState(['filterModal','searchData','highestPriorityIds','secondPriorityIds','thirdPriorityIds','recent','oldest','highest','lowest','longest','shortest']),
    ...mapGetters(["GET_SEARCH_DATA"]),
  },

  data() {
    return {
      highestPriority: [],
      secondPriority: [],
      thirdPriority: [],
      noProjectsPresent: true,
      receivedSearch: "",
      loading: false,
      //store all id in one array
      searchId: null,
      stopLoader: false,
      appliedProjects: [],
      currKey: null,
      rank: null,
      projTitleApply: null,
      currProject: null,
      //store all id in separate arrays
    };
  },

  methods: {
    ...mapMutations([
      "TOGGLE_FILTER",
      "CLEAR_ALL",
      "SET_HIGHEST_PRIORITYIDS",
      "CLEAR_FILTER",
      "SET_FILTER",
      "CLEAR_HIGHEST",
      "SET_CARDITEMS",
      "CLEAR_CARDITEMS",
    ]),
    alertFunc() {
      this.$refs.toggle.$el.click();
    },
    toggleFilterMenu() {
      this.TOGGLE_FILTER();
    },
    closeFilterMenu(e) {
      //alert('close')
      this.TOGGLE_FILTER();
    },
    applyingFirst(event, key) {
      this.$refs.confirmModal.click();
      this.applyConfirm = true;
      this.currKey = key;
      this.currProject = this.highestPriority[key]["projectTitle"];
      this.rank = "first";
    },
    applyingSecond(event, key) {
      this.$refs.confirmModal.click();
      this.applyConfirm = true;
      this.currKey = key;
      this.currProject = this.secondPriority[key]["projectTitle"];
      this.rank = "second";
    },
    applyingThird(event, key) {
      this.$refs.confirmModal.click();
      this.applyConfirm = true;
      this.currKey = key;
      this.currProject = this.thirdPriority[key]["projectTitle"];
      this.rank = "third";
    },
    confirmYes(e) {
      if (e == true && this.rank == "first") {
        this.addApplicantFirst(this.currKey);
      } else if (e == true && this.rank == "second") {
        this.addApplicantSecond(this.currKey);
      } else if (e == true && this.rank == "third") {
        this.addApplicantThird(this.currKey);
      }
      //console.log("yes");
      this.applyConfirm = false;
    },
    async addApplicantFirst(key) {
      //alert(key);
      /*
      console.log("ADDING!", this.firstPriority);
      console.log("ADDING!", this.secondPriority);
      console.log("ADDING!", this.thirdPriority);
      */
      var testCollection = this.firstPriority;
      //console.log(this.testCollection[key]);
      var newApplicants = testCollection[key]["newApplicants"];
      //console.log(newApplicants);
      var projTitle = testCollection[key]["projectTitle"];
      //that.projTitleApply = projTitle
      //newApplicants.push(this.userEmail);
      //var applied = this.applied;
      //console.log(applied);
      var projectId = testCollection[key]["projectId"];
      //console.log(projectId);
      //applied.push(projectId);
      // applied.push(projTitle);
      //testCollection[key]["appstat"] = "applied";

      // alert("Applying for proj: " + projTitle);

      //const auth = getAuth();
      //this.fbuser = auth.currentUser.email;

      try {
        const docRef = await updateDoc(doc(db, "Project", projectId), {
          New_Applicants: arrayUnion(this.userEmail),
        });

        const docRef2 = await updateDoc(doc(db, "students", this.userEmail), {
          appliedProjects: arrayUnion(projectId),
        });

        //console.log(docRef)
        this.$emit("updated");
        window.location.reload();
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
    async addApplicantSecond(key) {
      //alert(key);
      //console.log("ADDING!", this.secondPriority);
      var testCollection = this.secondPriority;
      //console.log(this.testCollection[key]);
      var newApplicants = testCollection[key]["newApplicants"];
      //console.log(newApplicants);
      var projTitle = testCollection[key]["projectTitle"];
      //that.projTitleApply = projTitle
      //newApplicants.push(this.userEmail);
      //var applied = this.applied;
      //console.log(applied);
      var projectId = testCollection[key]["projectId"];
      //console.log(projectId);
      //applied.push(projectId);
      // applied.push(projTitle);
      //testCollection[key]["appstat"] = "applied";

      // alert("Applying for proj: " + projTitle);

      //const auth = getAuth();
      //this.fbuser = auth.currentUser.email;

      try {
        const docRef = await updateDoc(doc(db, "Project", projectId), {
          New_Applicants: arrayUnion(this.userEmail),
        });

        const docRef2 = await updateDoc(doc(db, "students", this.userEmail), {
          appliedProjects: arrayUnion(projectId),
        });

        //console.log(docRef)
        this.$emit("updated");
        window.location.reload();
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
    async addApplicantThird(key) {
      //alert(key);
      //console.log("ADDING!", this.thirdPriority);
      var testCollection = this.thirdPriority;
      //console.log(this.testCollection[key]);
      var newApplicants = testCollection[key]["newApplicants"];
      //console.log(newApplicants);
      var projTitle = testCollection[key]["projectTitle"];
      //that.projTitleApply = projTitle
      //newApplicants.push(this.userEmail);
      //var applied = this.applied;
      //console.log(applied);
      var projectId = testCollection[key]["projectId"];
      //console.log(projectId);
      //applied.push(projectId);
      // applied.push(projTitle);
      //testCollection[key]["appstat"] = "applied";

      // alert("Applying for proj: " + projTitle);

      //const auth = getAuth();
      //this.fbuser = auth.currentUser.email;

      try {
        const docRef = await updateDoc(doc(db, "Project", projectId), {
          New_Applicants: arrayUnion(this.userEmail),
        });

        const docRef2 = await updateDoc(doc(db, "students", this.userEmail), {
          appliedProjects: arrayUnion(projectId),
        });

        //console.log(docRef)
        this.$emit("updated");
        window.location.reload();
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
    /*
    populateSearch() {
      this.searchId = this.searchData
    },
    */
    indivprojFirst(key) {
      this.CLEAR_CARDITEMS();
      console.log("click card", this.highestPriority);
      this.SET_CARDITEMS(JSON.stringify(this.highestPriority[key]));
      this.$router.push({
        name: "StudentViewProjectInfo",
        params: {
          items: JSON.stringify(this.highestPriority[key]),
        },
      });
      /*
      console.log(key);
      console.log(this.highestPriority[key]);
      */
    },

    indivprojSecond(key) {
      this.CLEAR_CARDITEMS();
      console.log("click card", this.secondPriority);
      this.SET_CARDITEMS(JSON.stringify(this.secondPriority[key]));
      this.$router.push({
        name: "StudentViewProjectInfo",
        params: {
          items: JSON.stringify(this.secondPriority[key]),
        },
      });
      /*
      console.log(key);
      console.log(this.secondPriority[key]);
      */
    },

    indivprojThird(key) {
      this.CLEAR_CARDITEMS();
      this.SET_CARDITEMS(JSON.stringify(this.thirdPriority[key]));
      this.$router.push({
        name: "StudentViewProjectInfo",
        params: {
          items: JSON.stringify(this.thirdPriority[key]),
        },
      });
      /*
      console.log(key);
      console.log(this.thirdPriority[key]);
      */
    },
    async fetchProjectOrder(order) {
      //var businessEmail = auth.currentUser.email;
      //var businessEmail = window.localStorage.getItem('emailForSignIn')
      //order projects by posted date, from latest to oldest
      //alert(order)
      var projects = null;
      if (order == "recent") {
        //alert("true!!")
        this.CLEAR_FILTER();
        this.SET_FILTER("recent");
        projects = query(
          collection(db, "Project"),
          where("Status", "not-in", ["closed", "completed"]),
          orderBy("Status", "asc"),
          orderBy("Posted_Date", "desc")
        );
      } else if (order == "oldest") {
        this.CLEAR_FILTER();
        this.SET_FILTER("oldest");
        projects = query(
          collection(db, "Project"),
          where("Status", "not-in", ["closed", "completed"]),
          orderBy("Status", "asc"),
          orderBy("Posted_Date")
        );
      } else if (order == "highest") {
        this.CLEAR_FILTER();
        this.SET_FILTER("highest");
        projects = query(
          collection(db, "Project"),
          where("Status", "not-in", ["closed", "completed"]),
          orderBy("Status", "asc"),
          orderBy("Allowance", "desc")
        );
      } else if (order == "lowest") {
        this.CLEAR_FILTER();
        this.SET_FILTER("lowest");
        projects = query(
          collection(db, "Project"),
          where("Status", "not-in", ["closed", "completed"]),
          orderBy("Status", "asc"),
          orderBy("Allowance")
        );
      } else if (order == "longest") {
        this.CLEAR_FILTER();
        this.SET_FILTER("longest");
        projects = query(
          collection(db, "Project"),
          where("Status", "not-in", ["closed", "completed"]),
          orderBy("Status", "asc"),
          orderBy("Project_End")
        );
      } else if (order == "shortest") {
        this.CLEAR_FILTER();
        this.SET_FILTER("shortest");
        projects = query(
          collection(db, "Project"),
          where("Status", "not-in", ["closed", "completed"]),
          orderBy("Status", "asc"),
          orderBy("Project_End", "desc")
        );
      } else {
        this.CLEAR_FILTER();
        this.SET_FILTER("shortest");
        projects = query(
          collection(db, "Project"),
          where("Status", "not-in", ["closed", "completed"]),
          orderBy("Status", "asc"),
          orderBy("Project_End", "desc")
        );
      }
      var temp = [];
      //searchData is a dictionary of {0:projectId,1:projectId...}
      //convert values into an array
      var searchDataCopy = this.searchData;
      //console.log("copyyy", searchDataCopy);

      var values = Object.keys(searchDataCopy).map(function (key) {
        return searchDataCopy[key];
      });

      //But the values arr is 2d
      //To flatten use ES6 spread
      var newValues = [];
      /*
      console.log("searchData", this.searchData);
      console.log("values", values);
      */
      newValues = newValues.concat(...values);
      //console.log("newValues", newValues);
      let snapshot = await getDocs(projects);
      snapshot.forEach((docs) => {
        let data = docs.data();
        var id = docs.id;
        if (newValues.includes(id)) {
          temp.push(id);
        }
      });
      //console.log("searchDataValues", this.newValues);
      this.CLEAR_HIGHEST();
      this.SET_HIGHEST_PRIORITYIDS(temp);
      //console.log("temp", temp);
      this.$router.push({
        name: "StudentSearchResult2",
        params: { searched: this.searchString },
      });
    },
  },

  mounted() {
    const that = this;
    const auth = getAuth();
    that.appliedProjects = [];
    const email = this.userEmail;
    //const email = auth.currentUser.email
    setTimeout(() => {
      this.stopLoader = true;
    }, 2500);
    const gottenSearch = that.$route.params.searched;
    this.receivedSearch = gottenSearch;
    //data variable = state variable
    this.searchId = this.searchData;
    //console.log("searchData", this.searchData);
    this.highestPriority = this.highestPriorityIds;
    this.secondPriority = this.secondPriorityIds;
    this.thirdPriority = this.thirdPriorityIds;
    /*
    alert(this.highestPriority)
    alert(this.secondPriority)
    alert(this.thirdPriority)
    */
    async function getAppliedProjects() {
      const ref = doc(db, "students", email);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      //console.log(data.id)
      var appliedProjects = data.appliedProjects;
      var inProgressProjects = data.inProgProjects;
      var offeredProjects = data.offeredProjects;
      var rejectedProjects = data.rejectedProjects;

      that.appliedProjects = that.appliedProjects.concat(appliedProjects);
      that.appliedProjects = that.appliedProjects.concat(inProgressProjects);
      that.appliedProjects = that.appliedProjects.concat(offeredProjects);
      that.appliedProjects = that.appliedProjects.concat(rejectedProjects);
    }
    getAppliedProjects();
    //console.log(that.appliedProjects);
    async function setProjects() {
      //Non VUEX version. Uncomment if VUEX does not work
      /*
      const highestPriorityIds = that.$route.params.displayFirst;
      const secondPriorityIds = that.$route.params.displaySecond;
      const thirdPriorityIds = that.$route.params.displayThird;
      */
      //VUEX version
      //const highestPriorityIds = that.searchId
      const highestPriorityIds = that.highestPriority;
      const secondPriorityIds = that.secondPriority;
      const thirdPriorityIds = that.thirdPriority;
      //const highestPriorityIds = that.searchData
      const highestPriority = [];
      const secondPriority = [];
      const thirdPriority = [];
      //console.log(highestPriorityIds);
      //let snapshot = await getDocs(collection(db, "Project"))
      if (that.recent == true) {
        //alert("recent")
        var snapshot = query(
          collection(db, "Project"),
          where("Status", "not-in", ["closed", "completed"]),
          orderBy("Status", "asc"),
          orderBy("Posted_Date", "desc")
        );
      } else if (that.oldest == true) {
        //alert("oldest")
        var snapshot = query(
          collection(db, "Project"),
          where("Status", "not-in", ["closed", "completed"]),
          orderBy("Status", "asc"),
          orderBy("Posted_Date")
        );
      } else if (that.highest == true) {
        //alert("highest")
        var snapshot = query(
          collection(db, "Project"),
          where("Status", "not-in", ["closed", "completed"]),
          orderBy("Status", "asc"),
          orderBy("Allowance", "desc")
        );
      } else if (that.lowest == true) {
        //alert("lowest")
        var snapshot = query(
          collection(db, "Project"),
          where("Status", "not-in", ["closed", "completed"]),
          orderBy("Status", "asc"),
          orderBy("Allowance")
        );
      } else if (that.longest == true) {
        //alert("longest")
        var snapshot = query(
          collection(db, "Project"),
          where("Status", "not-in", ["closed", "completed"]),
          orderBy("Status", "asc"),
          orderBy("Project_End")
        );
      } else if (that.shortest == true) {
        //alert("shortest")
        var snapshot = query(
          collection(db, "Project"),
          where("Status", "not-in", ["closed", "completed"]),
          orderBy("Status", "asc"),
          orderBy("Project_End", "desc")
        );
        //Just Order by project end date if no filter
      } else {
        //alert("else")
        var snapshot = query(
          collection(db, "Project"),
          where("Status", "not-in", ["closed", "completed"]),
          orderBy("Status", "asc"),
          orderBy("Project_End", "desc")
        );
      }
      snapshot = await getDocs(snapshot);
      /*
      highestPriorityIds.forEach(async (docId) => {
        const currSnapshot = await getDoc(doc(db, 'Project', docId))  
        let data = currSnapshot.data()
        highestPriority.push({ 
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
        });
      })
      secondPriorityIds.forEach(async (docId) => {
        const currSnapshot = await getDoc(doc(db, 'Project', docId))  
        let data = currSnapshot.data()
        highestPriority.push({ 
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
        });
      })
      thirdPriorityIds.forEach(async (docId) => {
        const currSnapshot = await getDoc(doc(db, 'Project', docId))  
        let data = currSnapshot.data()
        highestPriority.push({ 
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
        });
      })
      */

      const testCollection = [];

      //console.log("passed the query");
      snapshot.forEach((docs) => {
        let data = docs.data();
        let appstat = "";
        console.log(that.appliedProjects);
        if (that.appliedProjects.includes(docs.id)) {
          appstat = "applied";
        } else {
          appstat = "apply";
        }
        //console.log("searchResultone", highestPriorityIds);
        if (highestPriorityIds.includes(docs.id)) {
          highestPriority.push({
            company: docs.poster_id,
            projectId: docs.id,
            projectTitle: data.Project_Title,
            description: data.Description,
            vacancies: data.Num_Of_Vacancies,
            allowance: data.Allowance,
            position: data.Position,
            projectStart: data.Project_Start,
            projectEnd: data.Project_End,
            tasks: data.Tasks,
            tags: data.Tags,
            appstat: appstat,
            newApplicants: data.New_Applicants,
            accApplicants: data.Acc_Applicants,
            rejApplicants: data.Rej_Applicants,
            profilePicture: data.profPicture,
          });
        } else if (secondPriorityIds.includes(docs.id)) {
          secondPriority.push({
            company: docs.poster_id,
            projectId: docs.id,
            projectTitle: data.Project_Title,
            description: data.Description,
            vacancies: data.Num_Of_Vacancies,
            allowance: data.Allowance,
            position: data.Position,
            projectStart: data.Project_Start,
            projectEnd: data.Project_End,
            tasks: data.Tasks,
            tags: data.Tags,
            appstat: appstat,
            newApplicants: data.New_Applicants,
            accApplicants: data.Acc_Applicants,
            rejApplicants: data.Rej_Applicants,
            profilePicture: data.profPicture,
          });
        } else if (thirdPriorityIds.includes(docs.id)) {
          thirdPriority.push({
            company: docs.poster_id,
            projectId: docs.id,
            projectTitle: data.Project_Title,
            description: data.Description,
            vacancies: data.Num_Of_Vacancies,
            allowance: data.Allowance,
            position: data.Position,
            projectStart: data.Project_Start,
            projectEnd: data.Project_End,
            tasks: data.Tasks,
            tags: data.Tags,
            appstat: appstat,
            newApplicants: data.New_Applicants,
            accApplicants: data.Acc_Applicants,
            rejApplicants: data.Rej_Applicants,
            profilePicture: data.profPicture,
          });
        }
      });

      that.highestPriority = highestPriority;
      that.secondPriority = secondPriority;
      that.thirdPriority = thirdPriority;
      console.log("mountedFirst", highestPriority);
      console.log("mountedSecond", secondPriority);
      console.log("mountedThird", thirdPriority);

      if (
        highestPriority.length > 0 ||
        secondPriority.length > 0 ||
        thirdPriority.length > 0
      ) {
        that.noProjectsPresent = false;
      }
    }
    setProjects();
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

.projectContainer {
  margin-left: 30px;
  /*flex-grow: 1;
    display: flex; */
  flex-direction: row;
}

/*
    Transition for filter menu
  */
.filter-enter-active {
  transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
}

.filter-leave-active {
  transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
}

.filter-enter-from {
  transform: translateX(-700px);
  /*transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);*/
}

.filter-leave-to {
  transform: translateX(-700px);
  /*transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);*/
}

#status {
  text-align: left;
  font-size: 28px;
  margin: 30px 30px 0px 40px;
  color: #606060;
}

hr {
  border: 0;
  border-top: 2px solid #606060;
  width: 83%;
  margin: 5px 0px 16px 0px;
  position: sticky;
  z-index: -1;
}

.options {
  font-size: 15px;
  padding: 10px 25px;
  margin-left: 15px;
  border-radius: 30px; /* or 50% */
  background-color: #0e8044;
  color: white;
  text-align: center;
}

.noProject {
  flex: left;
  font-size: 30px;
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

/* GENERAL STYLES */
.visuallyHidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

h1 {
  text-align: center;
  margin: 30px 30px 0px 50px;
}

.container {
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

button,
.button {
  cursor: pointer;
  padding: 8px 44px;
  border-radius: 0px;
  border: none;
  font-size: 16px;
  margin-right: 20px;
  color: white;
  float: right;
  background-color: #ec9f39;
}

.right {
  margin-left: 80%;
}

.menu ol {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #ec9f39;
}
.menu ol:first-child {
  width: 10%;
  max-width: 960px;
  margin: 1rem auto 0 auto;
  margin-left: 75%;
  align-items: right;
}
.menu-item {
  border-top: 2px solid #de8614;
  position: relative;
  transition: background 0.3s ease-in-out;
}

.menu-item:nth-child(1) > a::before {
  font-size: 1.2rem;
  display: block;
  margin-bottom: 1rem;
  font-weight: 900;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
  color: #de8614;
}

.menu-item .sub-menu {
  position: absolute;
  top: 100%;
  width: 100%;
  transform-origin: top;
  transform: rotateX(-90deg);
  transition: transform 0.3s linear;
  background-color: #ec9f39;
}
.menu-item .sub-menu .menu-item {
  border-color: rgba(255, 255, 255, 0.15);
}
.menu-item:hover,
.menu-item.active {
  border-top: 2px solid #ec9f39;
  background-color: rgba(255, 255, 255, 0.15);
}
.menu-item:hover a::before,
.menu-item.active a::before {
  color: #ec9f39;
}
.menu-item:hover .sub-menu {
  transform: rotateX(0deg);
}
.menu-item a {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  height: 35.2px;
  width: 125px;
  padding: 8px 6px;
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

#saveModal {
  background-color: rgba(0, 0, 0, 0.5);
}

button[data-v-17303342], .button[data-v-17303342] {
  margin-left: -100px;
}
</style>
