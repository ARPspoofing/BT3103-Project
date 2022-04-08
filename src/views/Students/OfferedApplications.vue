<template>
  <StudentNavBar :header="true" :Heading="Heading"/>
  <div class="modal fade" id="saveModalAccept" tabindex="-1" aria-labelledby="saveModalLabel" aria-hidden="true" data-bs-backdrop="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="words">
                <i class="fa-solid fa-circle-check" id="tickIcon"></i>
                  <p>Accept {{modalName}}?</p>
              </div>
              <span>
                <div class = "applybtns">
                  <button type="button" id="yesbtn" data-bs-dismiss="modal" @click="confirmYesAccept">Yes</button>
                  <button type="button" id="nobtn" data-bs-dismiss="modal">No</button>
                </div>
              </span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="saveModalReject" tabindex="-1" aria-labelledby="saveModalLabel" aria-hidden="true" data-bs-backdrop="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="words">
                <i class="fa-solid fa-times-circle" id="tickIcon"></i>
                  <p>Reject {{modalName}}?</p>
              </div>
              <span>
                <div class = "applybtns">
                  <button type="button" id="yesbtn" data-bs-dismiss="modal" @click="confirmYesReject">Yes</button>
                  <button type="button" id="nobtn" data-bs-dismiss="modal">No</button>
                </div>
              </span>
              </div>
            </div>
          </div>
        </div>








  <div class="mainBody">

    <h1 id="status">
      <span class="options">
        <b>OFFERED</b>
      </span>
      <span>
        <router-link class="optionsOff" :to="{ name: 'PendingApplications' }"
          ><b>PENDING</b></router-link
        >
      </span>
      <span>
        <router-link class="optionsOff" :to="{ name: 'RejectedApplications' }"
          ><b>REJECTED</b></router-link
        >
      </span>
    </h1>
    <hr />
    <div
      class="projectContainer"
      :key="item.key"
      v-for="(item, key) in projects"
    >
      <Card
        :apply="false"
        :projectTitle="item.projectTitle"
        :description="item.description"
        :stat="stat2"
        :offered="true"
        @acceptBtn="acceptProj(key)"
        @declineBtn="declineProj(key)"
        @firstClick="firstClick"
        :popUpConfirm="this.popUpConfirm"    
      />
    </div>
  </div>
  <button type="submit" style="visibility:hidden;" ref="confirmModalAccept" class="green" data-bs-toggle="modal" data-bs-target="#saveModalAccept" >Accept</button>                  
  <button type="submit" style="visibility:hidden;" ref="confirmModalReject" class="green" data-bs-toggle="modal" data-bs-target="#saveModalReject" >Reject</button>  
</template>

<script>
import StudentNavBar from "../../components/StudentNavBar.vue";
import Card from "../../components/Card.vue";
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
  arrayUnion,
  arrayRemove,
  writeBatch,
} from "firebase/firestore";
import { mapState } from "vuex";
const db = getFirestore(firebaseApp);
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "OfferedApplications",
  components: {
    StudentNavBar,
    Card,
  },
  data() {
    return {
      Heading: "MY APPLICATIONS",
      stat2: "offered",
      //userEmail: "",
      offered: [],
      projects: [],
      accepted: [],
      declined: [],
      bizProjects: [],
      popUpConfirm: null,
      modalName:null,
    };
  },
  computed: {
    ...mapState(["userEmail"]),
  },
  methods: {
    firstClick(event,name) {
      this.modalName = name
      if (event == true) {
        this.$refs.confirmModalAccept.click()
      } else {
        this.$refs.confirmModalReject.click()
      }
    },
    confirmYesAccept() {
      this.popUpConfirm = true
    },
    confirmYesReject() {
      this.popUpConfirm = false
    },
    async acceptProj(key) {
      var projId = this.offered[key];
      var projName = this.projects[key].projectTitle;
      alert(projName);
      var business = this.projects[key].business;
      var biz = this.bizProjects[key];

      if (!this.accepted) {
        var accepted = [];
        accepted.push(projId);
        this.accepted = accepted;
      } else {
        this.accepted.push(projId);
      }

      if (!biz) {
        var biz = [];
        biz.push(projId);
      } else {
        biz.push(projId);
      }
      biz = [...new Set(biz)];
      for (var i = 0; i < this.projects.length; i++) {
        console.log(business, this.projects[i].business === business);
        if (this.projects[i].business === business) {
          console.log("projId", projId);
          //this.bizProjects[i].push(projId)
          this.bizProjects.push(projId);
        }
      }
      //this.bizProjects[key] = biz
      console.log(this.bizProjects);

      this.projects.splice(key, 1);
      this.offered.splice(key, 1);
      this.bizProjects.splice(key, 1);
      /*for(var i = 0; i < this.projects.length; i++) {
        if (this.projects[i].business === business) {
          this.bizProjects[i].push(projId)
        }
      }*/

      alert("Accepting Project: " + projName);
      try {
        const docRef = await updateDoc(doc(db, "students", this.userEmail), {
          inProgProjects: this.accepted,
          offeredProjects: this.offered,
        });

        const docRef2 = await updateDoc(doc(db, "businesses", business), {
          inProgProjects: biz,
        });

        //console.log(docRef)
        this.$emit("updated");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },

    async declineProj(key) {
      var projId = this.offered[key];
      var projName = this.projects[key].projectTitle;
      console.log("projId", projId, "projName", projName, "key", key);

      if (!this.declined) {
        var declined = [];
        declined.push(projId);
        this.declined = declined;
      } else {
        this.declined.push(projId);
      }
      console.log("declineee", this.declined);
      this.projects.splice(key, 1);
      this.offered.splice(key, 1);

      alert("Declining Project: " + projName);
      try {
        /*
        const docRef = doc(db,"students",this.userEmail)
        const batch = writeBatch(db);
        console.log("before array union",this.declined)
        batch.update(docRef, {rejectedProjects: arrayUnion(...this.declined)});
        batch.update(docRef, {offeredProjects: arrayUnion(...this.offered)});

        batch.commit()
          .then(() => console.log('Success!'))
          .catch(err => console.error('Failed!', err));
        this.$emit("updated")
        */

        const docRef = await updateDoc(doc(db, "students", this.userEmail), {
          rejectedProjects: this.declined,
          offeredProjects: this.offered,
        });
        //console.log(docRef)
        this.$emit("updated");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
  },
  mounted() {
    /*
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
    */
    //this.userEmail = auth.currentUser.email;
    //console.log(this.userEmail)
    var userEmail = this.userEmail;
    const that = this;
    async function getOfferedProjects() {
      const ref = doc(db, "students", userEmail);
      const docSnap = await getDoc(ref);
      that.offered = docSnap.data().offeredProjects;
      //const data = docSnap.data();
      const response = await Promise.all(
        docSnap.data().offeredProjects.map(async (item) => {
          console.log("nested", item);
          const finalResult = await getDoc(doc(db, "Project", item));
          console.log(finalResult.data());
          that.projects.push({
            projectTitle: finalResult.data().Project_Title,
            description: finalResult.data().Description,
          });
        })
      );
      /*
      if (data.offeredProjects) {
        for(var i = 0; i < data.offeredProjects.length; i++) {
          getProject(data.offeredProjects[i]).then((res)=>{that.projects.push(res)})
        }
      }
      */
    }
    getOfferedProjects();

    async function getInProgProjects() {
      const ref = doc(db, "students", userEmail);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      that.accepted = data.inProgProjects;
      //console.log(that.accepted)
    }
    getInProgProjects();

    async function getDeclinedProjects() {
      const ref = doc(db, "students", userEmail);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      that.declined = data.declinedProjects;
      //console.log(that.accepted)
    }
    getDeclinedProjects();

    async function getBizProjects(email) {
      const ref = doc(db, "businesses", that.userEmail);
      const docSnap = await getDoc(ref);

      //const data = docSnap.data();
      //return data.inProgProjects;
    }
    getBizProjects(this.userEmail);

    async function getProject(proj) {
      const ref = doc(db, "Project", proj);
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      getBizProjects(data.poster_id).then((res) => {
        that.bizProjects.push(res);
      });
      return {
        projectTitle: data.Project_Title,
        description: data.Description,
        business: data.poster_id,
      };
    }
  },
};
</script>

<style>
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
}

#status {
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

#applyModal {
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
    font-size: 18px;
    text-align: center;
    width: 180px;
    margin-left: 48px;
    color: #3f3f3f;
  }




</style>
