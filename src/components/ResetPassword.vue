<template>
  <div v-if="notSent" class="popup">
    <div class="content">
      <div @click="$emit('close')" class="cross">
        <h3>x</h3>
      </div>
      <div class="input">
        <p>
          <b>{{ msg }}</b>
        </p>
      </div>
      <div v-if="notEntered" class="input">
        <input type="text" v-model="email" />
      </div>
      <div v-if="notEntered" class="action">
        <button class="green" @click="reset">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { useRouter } from "vue-router";
export default {
  name: "ResetPassword",
  data() {
    return {
      email: "",
      notSent: true,
      msg: "Enter your registered email below. You will receive a reset password link",
      notEntered: true,
    };
  },
  methods: {
    reset() {
      if (this.email != "") {
        const auth = getAuth();
        sendPasswordResetEmail(getAuth(), this.email)
          .then(() => {})
          .catch(() => {});
        //auth.currentUser.emailVerified
        this.notEntered = false;
        this.msg = "Please check your email inbox or the junk folder";
        setTimeout(() => {
          this.notSent = false;
        }, 3500);
      }
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
  padding: 80px 60px 40px 60px;
  background-color: #bbdfcc;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.35);
}

.cross {
  display: flex;
  align-items: flex-start;
  margin-top: -60px;
  margin-left: -30px;
  color: black;
  cursor: pointer;
}

.input {
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: -10px;
}

input {
  width: 100%;
  border: none;
  background-color: white;
  color: black;
  padding: 4px 4px 4px 30px;
  height: 30px;
  border-radius: 10px;
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
  background-color: #0e8044;
}

button,
.button {
  cursor: pointer;
  padding: 8px 34px;
  border-radius: 15px;
  margin-top: 30px;
  border: none;
  font-size: 14px;
  margin-right: 8px;
  color: #fff;
}
</style>
