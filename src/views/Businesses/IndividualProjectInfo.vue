z<template>
  <BusinessNavBar :Heading="Heading" :header="true" />
  <div class="mainBody">
    <router-link
      class="floating-right-bottom-btn"
      :to="{ name: 'BusinessAddProject' }"
    >
      <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
    </router-link>
    <!-- <h3>{{items}}</h3> -->
    <h1 id="interest">
      <span class="options">
        <b>PROJECT INFO</b>
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
            },
          }"
          ><b>REJECTED APPLICANTS</b></router-link
        >
      </span>
    </h1>
    <hr />
    <div>
      <div class="clogo">
        <img :src="profilePicture" alt="Logo" class="logo" />
        <span>
          <div class="projTitle">
            {{ items.projectTitle }} <br />
            <h5 id="companyName">name</h5> <br />
            <!--Tags-->
            <div id="tagsbox">
              <div id="tags" :key="item.key" v-for="(item, index) in tags">
                {{ item }}
              </div>
            </div>
          </div>
        </span>
        <span>
          <div class="projButtons">
            <button class="edit-proj" @click="editProject()">
              EDIT PROJECT DETAILS
            </button>
            <br />
            <button
              href="#"
              class="close-proj"
              data-bs-toggle="modal"
              data-bs-target="#closeModal"
            >
              CLOSE PROJECT
            </button>
            <br />
            <div
              class="modal fade"
              id="closeModal"
              tabindex="-1"
              aria-labelledby="closeModalLabel"
              aria-hidden="true"
              data-bs-backdrop="false"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-body">
                    <div class="words">
                      <i
                        class="fa-solid fa-triangle-exclamation"
                        id="warningIcon"
                      ></i>
                      <p>
                        Are you sure you want to <br />
                        <span style="color: red"> close </span> this project?<br />
                        This action is not reversible.
                      </p>
                    </div>
                    <span>
                      <div class="applybtns">
                        <button
                          type="button"
                          @click="closeProject()"
                          id="yesbtn"
                          data-bs-dismiss="modal"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          id="nobtn"
                          data-bs-dismiss="modal"
                        >
                          No
                        </button>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!--<button href="#" class="del-proj" data-bs-toggle="modal" data-bs-target="#delModal">DELETE PROJECT</button>
            <div class="modal fade" id="delModal" tabindex="-1" aria-labelledby="delModalLabel" aria-hidden="true" 
              data-bs-backdrop="false">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-body">
                    <div class="words">
                    <i class="fa-solid fa-triangle-exclamation" id="warningIcon"></i>
                    <p>Are you sure you want to <br>
                    <span style="color: red"> delete </span> this project?<br>
                    This action is not reversible. </p>
                    </div>
                    <span>
                      <div class = "applybtns">
                        <button type="button" id="yesbtn" data-bs-dismiss="modal">Yes</button>
                        <button type="button" id="nobtn" data-bs-dismiss="modal">No</button>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>-->
          </div>
        </span>
      </div>
    </div>
    <br />
    <div class="projInfo">
      <span>
        <div class="projLabels">
          Position <br />
          Number of Vacancies <br />
          Project Period <br />
          Payment Amount <br />
        </div>
      </span>
      <span>
        <div class="projDetails">
          {{ items.position }} <br />
          {{ items.vacancies }} <br />
          {{ formatDate(items.projectStart) }} -
          {{ formatDate(items.projectEnd) }} <br />
          SGD {{ items.allowance }} <br />
        </div>
      </span>
    </div>
    <br />
    <div class="projDesc">
      <span>
        <div class="projDescLabel">Description <br /></div>
        <div class="projDescContent">
          {{ this.items.description }}
        </div>
      </span>
    </div>
    <br />
    <div class="projDeliverable">
      <span>
        <div class="projDescLabel">Deliverables <br /></div>
      </span>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="delicard">
              <div class="delicard-body">
                <div id="delicontent">
                  <ul
                    class="timeline"
                    :key="item.key"
                    v-for="(item, index) in tasks"
                  >
                    <Deliverable
                      :data-date="formatDate(item.taskDueDate)"
                      :description="item.taskDescription"
                      :title="item.taskName"
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br /><br />
  </div>
</template>

<script>
import BusinessNavBar from "../../components/BusinessNavBar.vue";
import Deliverable from "../../components/Deliverable.vue";
import * as moment from "moment";
import firebaseApp from "../../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

const db = getFirestore(firebaseApp);

export default {
  name: "IndividualProjectInfo",
  //props: ['items'],
  components: {
    BusinessNavBar,
    Deliverable,
  },
  computed: {
    ...mapState(["cardItems"]),
  },
  data() {
    return {
      Heading: "PROJECT INFORMATION",
      testCollection: [],
      props: ["items"],
      tags: [],
      tasks: [],
      items: [],
      newApplicants: [],
      accApplicants: [],
      rejApplicants: [],
      profilePicture: "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
    };
  },
  mounted() {
    //Non Vuex version
    /*
    this.tasks = JSON.parse(this.$route.params.items).tasks
    this.tags = JSON.parse(this.$route.params.items).tags
    this.items = JSON.parse(this.$route.params.items)
    this.newApplicants = JSON.parse(this.$route.params.items).newApplicants
    this.accApplicants = JSON.parse(this.$route.params.items).accApplicants
    this.rejApplicants = JSON.parse(this.$route.params.items).rejApplicants

    if (this.$route.params.newApplicants) {
      this.newApplicants = JSON.parse(this.$route.params.newApplicants)
    }
    if (this.$route.params.accApplicants) {
      this.accApplicants = JSON.parse(this.$route.params.accApplicants)
    }
    if (this.$route.params.rejApplicants) {
      this.rejApplicants = JSON.parse(this.$route.params.rejApplicants)
    }
    */
    //Vuex version
    this.tasks = JSON.parse(this.cardItems).tasks;
    this.tags = JSON.parse(this.cardItems).tags;
    this.items = JSON.parse(this.cardItems);
    console.log(JSON.parse(this.cardItems).posterId)
    this.newApplicants = JSON.parse(this.cardItems).newApplicants;
    this.accApplicants = JSON.parse(this.cardItems).accApplicants;
    this.rejApplicants = JSON.parse(this.cardItems).rejApplicants;
    this.profilePicture = JSON.parse(this.cardItems).profilePicture;

    async function getApplicant(userEmail) {
      const docSnap = await getDoc(doc(db, "businesses", userEmail));
      let data = docSnap.data();
      var name = data.name;
      companyName.innerHTML = name;
      
      return { name: data.name };
    }
    getApplicant(JSON.parse(this.cardItems).posterId);

    if (this.$route.params.newApplicants) {
      this.newApplicants = JSON.parse(this.$route.params.newApplicants);
    }
    if (this.$route.params.accApplicants) {
      this.accApplicants = JSON.parse(this.$route.params.accApplicants);
    }
    if (this.$route.params.rejApplicants) {
      this.rejApplicants = JSON.parse(this.$route.params.rejApplicants);
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD MMMM YYYY");
    },

    async closeProject() {
      var projId = this.items["projectId"];

      try {
        const docRef = await updateDoc(doc(db, "Project", projId), {
          Status: "closed",
          Application: "closed",
        });

        //console.log(docRef);
        this.$emit("updated");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },

    editProject() {
      //console.log(this.items);
      this.$router.push({
        name: "BusinessEditProject",
        params: {
          items: JSON.stringify(this.items),
        },
      });
    },
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
  padding-bottom: 150px;
}
#tagsbox {
  width: 450px;
  word-wrap: break-word;
  margin-top: -30px;
}

#tags {
  font-size: 12px;
  background-color: #ffe0b1;
  margin-top: 5px;
  padding: 3px 20px;
  text-align: center;
  border-radius: 20px;
  font-weight: bold;
  display: inline;
  margin-right: 5px;
  white-space: nowrap;
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

.logo {
  vertical-align: left;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-left: 170px;
  margin-right: 10px;
  float: left;
}

.clogo {
  text-align: left;
  margin: 40px 20px 20px 20px;
  height: 100px;
}

.projTitle {
  width: max-content;
  float: left;
  margin-left: 20px;
}

.edit-proj {
  background-color: #0e8044;
  color: white;
  border-radius: 15px;
  width: 250px;
  border-width: 0px;
  font-size: 18px;
}

.close-proj {
  background-color: #e58686;
  color: white;
  border-radius: 15px;
  width: 250px;
  border-width: 0px;
  font-size: 18px;
}

.del-proj {
  background-color: #d23333;
  color: white;
  border-radius: 15px;
  width: 250px;
  border-width: 0px;
  font-size: 18px;
}

.projButtons {
  width: max-content;
  float: right;
  margin-right: 200px;
}

.projInfo {
  margin: auto;
  width: 800px;
  height: 150px;
  background-color: #dbebe3;
  border-radius: 10px;
  border: 2px solid rgba(14, 128, 68, 0.54);
  margin-top: 15px;
}

.projDesc,
.projDeliverable {
  margin: auto;
  width: 800px;
  height: max-content;
}

.projLabels,
.projDescLabel {
  text-align: left;
  width: max-content;
  font-weight: bold;
  float: left;
  margin: 10px 20px 5px 100px;
  line-height: 30px;
}

.projDescContent {
  text-align: left;
  width: 650px;
  float: left;
  margin: 0px 20px 20px 100px;
}

.projDetails {
  text-align: left;
  width: max-content;
  float: left;
  margin: 10px 20px 20px 30px;
  line-height: 30px;
}

#delicontent {
  margin-top: 50px;
}

.timeline {
  border-left: 3px solid #004a23;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  background: #dbebe3;
  margin: 0px;
  letter-spacing: 0.2px;
  position: relative;
  line-height: 1.4em;
  font-size: 1.03em;
  padding: 50px 35px 50px 50px;
  list-style: none;
  text-align: left;
  max-width: 65%;
  margin-top: 10px;
  margin-left: 40px;
}

.timeline h1 {
  font-weight: 300;
  font-size: 1.4em;
}

.timeline h2,
.timeline h3 {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
  text-align: left;
}

.timeline p {
  font-size: 14px;
}

.timeline .event {
  border-bottom: 1px dashed #e8ebf1;
  padding-bottom: 25px;
  margin-bottom: 25px;
  position: relative;
}

.timeline .event:last-of-type {
  padding-bottom: 0;
  margin-bottom: 0;
  border: none;
}

.timeline .event:before,
.timeline .event:after {
  position: absolute;
  display: block;
  top: 0;
}

.timeline .event:before {
  left: -207px;
  content: attr(data-date);
  text-align: right;
  font-weight: 550;
  font-size: 0.9em;
  min-width: 120px;
}

.timeline .event:after {
  -webkit-box-shadow: 0 0 0 3px #004a23;
  box-shadow: 0 0 0 3px #004a23;
  left: -55.8px;
  background: #fff;
  border-radius: 50%;
  height: 9px;
  width: 9px;
  content: "";
  top: 5px;
}

#closeModal,
#delModal {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #ffe9c8;
  border: none;
}

.words {
  width: max-content;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
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
  background-color: #ffc875;
  color: #3f3f3f;
  width: 120px;
  height: 30px;
  font-size: 18px;
}

#warningIcon {
  height: 60px;
  width: 60px;
  color: #ffab2c;
  float: left;
}

.modal-body p {
  text-align: center;
  width: 300px;
}
</style>
