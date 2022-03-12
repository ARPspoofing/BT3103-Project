<template>
    Register
    <p><input :class="{shake:emailErrorPresent,'input-error':emailErrorPresent}" type="text" v-model="email" ></p>
    <p><input :class="{shake:passwordErrorPresent,'input-error':passwordErrorPresent}" type="password" v-model="password"></p>
    <span>{{this.errorMessage}}</span>
    <p><button @click="register">Submit</button></p>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getFirestore} from 'firebase/firestore';
import {doc,setDoc,collection,getDocs,deleteDoc} from 'firebase/firestore';
import {ref} from "vue"
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"
import {useRouter} from "vue-router"
const db = getFirestore(firebaseApp)
const router = useRouter()
export default {
    data() {
        return {
            email:'',
            password:'',
            error:'',
            emailErrorPresent:false,
            passwordErrorPresent:false,
            confirmPasswordErrorPresent:false,
            errorMessage:'',
        }
    },
    methods: {
        register() {                
                createUserWithEmailAndPassword(getAuth(),this.email,this.password)
                .then((data) => {
                    this.$router.push('/home')
                    setDoc(doc(db,"students",this.email),{
                            email:this.email,
                })
                }).catch((err) => {
                    this.error = err.code
                    if (this.error === "auth/invalid-email") {
                        this.errorMessage = 'Invalid email'
                        this.emailErrorPresent = true
                        setTimeout(() => {
                            this.emailErrorPresent = false
                        }, 1500)
                    } else if (this.error === "auth/email-already-in-use") {
                        this.errorMessage = 'Email already registered. Please login'
                        this.emailErrorPresent = true
                        setTimeout(() => {
                            this.emailErrorPresent = false
                        }, 1500)
                    } else if (this.error === "auth/weak-password") {
                        this.errorMessage = 'Weak password'
                        this.passwordErrorPresent = true
                        setTimeout(() => {
                            this.passwordErrorPresent = false
                        }, 1500)
                    }
                    console.log(this.error)
                })
        }    
    },
}
</script>

<style scoped>
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
        border: 2px solid red;
    }
</style>