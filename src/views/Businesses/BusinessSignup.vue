<template>
  <div id="nav">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'BusinessLogin' }">Login</router-link>
    <router-link :to="{ name: 'BusinessSignup' }">Signup</router-link>
  </div>
  <Loading v-if="loading" />
  <div class="form-wrap">
    <form class="signup">
      <div class="inputs">
        <div class="input">
          <h1>Welcome Business!</h1>
        </div>
        <div class="input">
          <h6>Signup with your Organization email</h6>
        </div>
        <div class="inputLabel">
          <h4>Email</h4>
        </div>
        <div class="input">
          <input
            :class="{
              shake: emailErrorPresent,
              'input-error': emailErrorPresent,
            }"
            type="text"
            v-model="email"
            placeholder="user@organization.com"
          />
          <img class="icon" src="../../assets/envelope.png" />
        </div>
        <div class="errorMsg" v-if="emailErrorPresent">
          {{ this.errorMessage }}
        </div>
        <div class="inputLabel">
          <h4>Password</h4>
        </div>
        <div class="input">
          <input
            :class="{
              shake: passwordErrorPresent,
              'input-error': passwordErrorPresent,
            }"
            type="password"
            v-model="password"
          />
          <img class="icon" src="../../assets/lock.png" />
        </div>
        <div class="errorMsg" v-if="passwordErrorPresent">
          {{ this.errorMessage }}
        </div>
        <div class="inputLabel">
          <h4>Confirm Password</h4>
        </div>

        <div class="input">
          <input
            :class="{
              shake: confirmPasswordErrorPresent,
              'input-error': confirmPasswordErrorPresent,
            }"
            type="password"
            v-model="confirmPassword"
          />
          <img class="icon" src="../../assets/lock.png" />
        </div>
        <div class="errorMsg" v-if="confirmPasswordErrorPresent">
          {{ this.errorMessage }}
        </div>
        <div class="input">
          <button @click="register"><b>Sign Up</b></button>
        </div>
        <div class="google">
          <GoogleButton @click="google" msg="sign up" />
        </div>
        <div class="input">
          <p>
            Users who signed up with Google must sign in with their Google
            account
          </p>
        </div>
      </div>
    </form>

    <!--
        <button @click="googleSignIn">google</button>
         <div id="firebaseui-auth-container"></div>
         -->
  </div>
</template>

<script>
import firebaseApp from "../../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import Loading from "../../components/Loading.vue";
import VerifyEmail from "../../components/VerifyEmail.vue";
import GoogleButton from "../../components/GoogleButton.vue";
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "https://www.example.com/finishSignUp?cartId=1234",
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
  dynamicLinkDomain: "example.page.link",
};
const db = getFirestore(firebaseApp);
const router = useRouter();
const that = this;
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      emailErrorPresent: false,
      passwordErrorPresent: false,
      confirmPasswordErrorPresent: false,
      errorMessage: "",
      loading: null,
      verifiedEmail: false,
    };
  },
  components: {
    Loading,
    VerifyEmail,
    GoogleButton,
  },
  computed: {
    ...mapState(["userEmail"]),
  },
  methods: {
    ...mapMutations(["SET_USEREMAIL"]),
    async google() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          this.SET_USEREMAIL(user.email);
          this.$router.push({ name: "businessLoading" });
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
    /*
        googleSignIn() {
            var ui = firebaseui.auth.AuthUI.getInstance();
            if (!ui) {
                ui = new firebaseui.auth.AuthUI(firebase.auth())
            }
            var uiConfig = {
                signInSuccessUrl: '//business/profileForm',
                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    firebase.auth.EmailAuthProvider.PROVIDER_ID,
                ]
            };
            ui.start('#firebaseui-auth-container',uiConfig)
        },
        */

    register() {
      this.loading = true;
      if (
        this.email == "" ||
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email) ==
          false
      ) {
        this.emailErrorPresent = true;
        this.loading = false;
        this.errorMessage = "Please enter a valid email address";
        setTimeout(() => {
          this.emailErrorPresent = false;
        }, 1500);
      } else if (this.password == "") {
        this.passwordErrorPresent = true;
        this.loading = false;
        this.errorMessage = "Please enter a password";
        setTimeout(() => {
          this.passwordErrorPresent = false;
        }, 1500);
      } else if (this.confirmPassword == "") {
        this.confirmPasswordErrorPresent = true;
        this.loading = false;
        this.errorMessage = "Please confirm your password above";
        setTimeout(() => {
          this.confirmPasswordErrorPresent = false;
        }, 1500);
      } else if (this.confirmPassword != this.password) {
        this.confirmPasswordErrorPresent = true;
        this.loading = false;
        this.errorMessage =
          "Please ensure that your password and confirm password match";
        setTimeout(() => {
          this.confirmPasswordErrorPresent = false;
        }, 1500);
      } else if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
          this.password
        ) == false
      ) {
        this.passwordErrorPresent = true;
        this.loading = false;
        this.errorMessage = "Weak Password";
        setTimeout(() => {
          this.passwordErrorPresent = false;
        }, 1500);
      } else if (this.password == this.confirmPassword) {
        /*
                const actionCodeSettings = {
                // URL you want to redirect back to. The domain (www.example.com) for this
                // URL must be in the authorized domains list in the Firebase Console.
                url: 'http://localhost:8080/?#/business/profileForm',
                // This must be true.
                handleCodeInApp: true,
                dynamicLinkDomain: 'example.page.link'
                };
                const auth = getAuth()
                sendSignInLinkToEmail(getAuth(),this.email, actionCodeSettings)
                .then(() => {
                    // The link was successfully sent. Inform the user.
                    // Save the email locally so you don't need to ask the user for it again
                    // if they open the link on the same device.
                    window.localStorage.setItem('emailForSignIn', this.email);
                    // ...
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ...
                });
                */

        createUserWithEmailAndPassword(getAuth(), this.email, this.password)
          .then((data) => {
            this.SET_USEREMAIL(this.email);
            console.log("in method");
            setDoc(doc(db, "businesses", String(this.email)), {
              profileFormCreated: false,
              verifyEmail: false,
            });
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
            sendSignInLinkToEmail(auth, this.email, actionCodeSettings)
              .then(() => {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                this.SET_USEREMAIL(this.email);

                this.$router.push({ name: "BusinessVerify" });
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                console.log("email", this.email);
              });
            console.log("uploaded to firebase");
            //this.$router.push({name:'BusinessProfileForm',params: {email}})
            //this.$router.push({name:'BusinessProfileForm'})
            this.loading = false;
          })
          .catch((err) => {
            this.error = err.code;
            if (this.error === "auth/invalid-email" || this.email == "") {
              this.errorMessage = "Invalid email";
              this.loading = false;
              this.emailErrorPresent = true;
              setTimeout(() => {
                this.emailErrorPresent = false;
              }, 1500);
            } else if (this.error === "auth/email-already-in-use") {
              this.errorMessage = "Email already registered. Please login";
              this.emailErrorPresent = true;
              this.loading = false;
              setTimeout(() => {
                this.emailErrorPresent = false;
              }, 1500);
            } else if (
              this.error === "auth/weak-password" ||
              this.password == ""
            ) {
              this.errorMessage = "Weak password";
              this.loading = false;
              this.passwordErrorPresent = true;
              setTimeout(() => {
                this.passwordErrorPresent = false;
              }, 1500);
            }
            console.log(this.error);
          });
      }
    },
  },
};
</script>

<style scoped>
a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

a.router-link-exact-active {
  color: #42b983;
  font-weight: 700px;
}

.form-wrap {
  display: flex;
  height: 105%;
  width: 100%;
  background: url("../../assets/signupBG.png") no-repeat center center fixed;
  overflow: hidden;
}

form {
  padding: 0 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: left;
  flex: 1;
  margin-left: 12vw;
}

.inputs {
  width: 40%;
}

.input {
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
}

.errorMsg {
  color: red;
  margin-top: 10px;
}

input {
  width: 80%;
  border: 2px solid darkgreen;
  background-color: white;
  padding: 4px 4px 4px 30px;
  height: 35px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  margin: 10px;
}

input:focus {
  outline: none;
}

.icon {
  width: 12px;
  position: absolute;
  margin-left: 20px;
}

button {
  margin-top: 5vh;
  margin-left: 10px;
  width: 80%;
  border: none;
  display: flex;
  align-items: center;
  align-items: center;
  justify-content: center;
  background-color: green;
  height: 35px;
  border-radius: 25px;
  color: white;
}

.google {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 400px;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
.input-error {
  order: 2px solid red;
}

h1 {
  text-align: left;
  margin-top: 20px;
  margin-left: 15px;
}
h4 {
  font-size: 16px;
  margin-bottom: 0px;
  margin-top: 5px;
  margin-left: 15px;
}
.inputLabel {
  margin-bottom: 0px;
  text-align: left;
}

h6 {
  margin-left: 15px;
}

p {
  width: 400px;
  font-size: 13px;
}
</style>
