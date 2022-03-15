<template>
<div id="nav">
<router-link :to="{name:'BusinessLogin'}">Login</router-link>
<router-link :to="{name:'BusinessSignup'}">Signup</router-link>
</div>
        <Loading v-if="loading"/>
    <div class="form-wrap">
        <form class="signup">
            <div class="inputs">
                <div class="input">
                    <h1>Welcome Business!</h1>
                </div>
                <div class="input">
                    <h4>Signup with your NUS email</h4>
                </div>
                <div class="input">
                    <h4>Email</h4>
                </div>
                <div class="input">
                    <input :class="{shake:emailErrorPresent,'input-error':emailErrorPresent}" type="text" v-model="email" placeholder="e1234567@u.nus.edu" >
                    <img class="icon" src="../../assets/envelope.png">
                </div>
                <div class="input">
                    <h4>Password</h4>
                </div>
                <div class="input">
                    <input :class="{shake:passwordErrorPresent,'input-error':passwordErrorPresent}" type="password" v-model="password">
                    <img class="icon" src="../../assets/lock.png">
                </div>
                <div class="input">
                    <h4>Confirm Password</h4>
                </div>
                <div class="input">
                    <input type="password" v-model="confirmPassword">
                    <img class="icon" src="../../assets/lock.png">
                </div>
                <div class="input">
                    <button @click="register"><b>Sign Up</b></button>
                </div>
            </div>
        </form>
    </div>
    <span>{{this.errorMessage}}</span>
</template>

<script>
import firebaseApp from '../../firebase.js';
import {getFirestore} from 'firebase/firestore';
import {doc,setDoc,collection,getDocs,deleteDoc} from 'firebase/firestore';
import {ref} from "vue"
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"
import {useRouter} from "vue-router"
import Loading from '../../components/Loading.vue'

//Style 

const db = getFirestore(firebaseApp)
const router = useRouter()
export default {
    data() {
        return {
            email:'',
            password:'',
            confirmPassword:'',
            error:'',
            emailErrorPresent:false,
            passwordErrorPresent:false,
            confirmPasswordErrorPresent:false,
            errorMessage:'',
            loading: null,
        }
    },
    components: {
        Loading,
    },
    methods: {
        register() { 
                this.loading = true               
                createUserWithEmailAndPassword(getAuth(),this.email,this.password)
                .then((data) => {
                    this.$router.push({name:'BusinessProfileForm'})
                    setDoc(doc(db,"businesses",this.email),{
                            email:this.email,
                            //when a user logs in when this attribute is false, he/she will be directed to the 
                            //profile page otherwise will be directed to the landing page
                            profilePageCreated:false,

                })
                    this.loading = false
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

    a {
        font-weight: bold;
        color: #2c3e50;
        text-decoration: none;
    }

    a.router-link-exact-active {
        color: #42b983;
        font-weight:700px;
    }

    .form-wrap {
        overflow:hidden;
        display:flex;
        height:80vh;
        justify-content: center;
        align-self: center;
        margin: 0 auto;
        width:90%;
        background-image:url("../../assets/signupBG.png");
        background-repeat: no-repeat;
    }

    form {
        padding: 0 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: top;
        align-items: left;
        flex: 1;
        margin-left:12vw;

    }

    .inputs {
        width:30%;
    }

    .input {
        position: relative;
        display: flex;
        justify-content: left;
        align-items: center;
        margin-bottom:-10px;
    }

    input {
        width: 100%;
        border: none;
        background-color: aquamarine;
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

    .icon {
        width:12px;
        position:absolute;
        margin-left:5px;
    }

    button {
        margin-top:5vh;
        width: 100%;
        border: none;
        display:flex;
        align-items: center;
        align-items: center;
        justify-content: center;
        background-color: green;
        height: 30px;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        color: white;
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
</style>