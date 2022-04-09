<template>
  <Loading v-if="loading" />
  <div class="popup">
    <div class="content">
      <img src="../assets/Pathfinders.png" />
      <div class="input">
        <h3><b>Please verify your email</b></h3>
      </div>
      <div class="input">
        <p>
          You're almost there! We sent as email to<b>
            <br />
            {{ email }}</b
          ><br />Just click on the link in the email to complete your signup<br />
          If you don't see it, you may need to: <br />
          Check <b>your spam folder, mark it as safe, and remove spam label</b>
        </p>
      </div>
      <div class="input">
        <p>Still can't find the email?</p>
      </div>
      <div class="button">
        <button @click="resend" class="green">Resend Email</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import {
  getFirestore,
  getDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
} from "firebase/auth";
import { useRouter } from "vue-router";
import Loading from "./Loading.vue";
import {mapState} from "vuex";


const db = getFirestore(firebaseApp);
const router = useRouter();

export default {
  name: "VerifyEmail",
  data() {
    return {
      email: "",
      notSent: true,
      msg: "Please check your email inbox and click on the link sent by us to verify your email. You will have to verify your email to proceed.",
      notEntered: true,
      loading: false,
    };
  },
  computed: {
    ...mapState(['userEmail',]),
  },
  mounted() {
    const that = this;
    async function check() {
      const auth = getAuth();
      let email = this.userEmail
      that.email = email;
      const docRef = doc(db, "businesses", String(email));
      const docs = await getDoc(docRef);
      const formFilled = docs.data().profileFormCreated;
      const verifyEmail = docs.data().verifyEmail;
      if (verifyEmail) {
        if (formFilled) {
          //console.log("formFilled");
          that.$router.push({ name: "BusinessHomePage" });
        } else {
          that.$router.push({ name: "BusinessHomePage" });
        }
      }
      //console.log("CHECK", isSignInWithEmailLink(auth, window.location.href));
      if (isSignInWithEmailLink(auth, window.location.href)) {
        //let email = window.localStorage.getItem("emailForSignIn");
        //console.log("link email", email);
        if (!email) {
          // User opened the link on a different device.
          email = window.prompt("Please provide your email for confirmation");
        } else {
          that.loading = true;
          const docRef = doc(db, "businesses", String(email));
          const docs = await getDoc(docRef);
          const formFilled = docs.data().profileFormCreated;
          await updateDoc(docRef, {
            verifyEmail: true,
          });
          if (formFilled) {
            //console.log("formFilled");
            that.$router.push({
              name: "BusinessHomePage",
              params: { formFilled: true },
            });
          } else {
            that.$router.push({
              name: "BusinessHomePage",
              params: { formFilled: false },
            });
            //that.$router.push({name:'BusinessProfileForm'})
          }
        }
      }
    }
    check();
  },
  methods: {
    reset() {
      if (this.email != "") {
        const auth = getAuth();
        sendPasswordResetEmail(auth, this.email)
          .then(() => {})
          .catch(() => {});
        auth.currentUser.emailVerified;
        this.notEntered = false;
        this.msg = "Please check your email inbox or the junk folder";
        setTimeout(() => {
          this.notSent = false;
        }, 3500);
      }
    },
    resend() {
      const auth = getAuth();
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: "http://localhost:8080/?#/business/verify",
        // This must be true.
        handleCodeInApp: true,
        iOS: {
          bundleId: "com.example.ios",
        },
        android: {
          packageName: "com.example.android",
          installApp: true,
          minimumVersion: "12",
        },
      };
      sendSignInLinkToEmail(auth, this.email, actionCodeSettings);
    },
  },
};
</script>

<style scoped>
.popup {
  z-index: 100;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
}

.content {
  border-radius: 20px;
  padding: 80px 60px;
  background-color: lightseagreen;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cross {
  display: flex;
  align-items: flex-start;
  margin-top: -80px;
  margin-left: -30px;
  color: red;
  cursor: pointer;
}

.input {
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
}

input {
  width: 100%;
  border: none;
  background-color: white;
  color: black;
  padding: 4px 4px 4px 30px;
  height: 25px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}

input:focus {
  outline: none;
}

p {
  text-align: center;
}

.red {
  background-color: #ec5757;
}
.green {
  background-color: #33d69f;
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
}
</style>
