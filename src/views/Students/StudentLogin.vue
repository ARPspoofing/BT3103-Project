<template>
<div id="nav">
<router-link :to="{name:'Home'}">Home</router-link>
<router-link :to="{name:'StudentLogin'}">Login</router-link>
<router-link :to="{name:'StudentSignup'}">Signup</router-link>
</div>
<div class="form-wrap">
    <ResetPassword @close="close" v-if="forgetPassword"/>
        <form class="login">
            <div class="inputs">
                <div class="input">
                    <h1>Welcome Back Student!</h1>
                </div>
                <div class="input">
                    <h4>Dont't have an account?&nbsp;</h4>
                    <router-link class="link" :to="{name:'StudentSignup'}">Signup</router-link>
                    <router-view/>
                </div>
                <div class="inputLabel">
                    <h4>Email</h4>
                </div>
                <div class="input">
                    <input :class="{shake:emailError,'input-error':emailError}" type="text" v-model="email" placeholder="e1234567@u.nus.edu">
                    <img class="icon" src="../../assets/envelope.png">
                </div>
                <div class="errorMsg" v-if="emailError">{{this.errorMessage}}</div>
                <div class="inputLabel">
                    <h4>Password</h4>
                </div>
                <div class="input">
                    <input :class="{shake:passwordError,'input-error':passwordError}" type="password" v-model="password">
                    <img class="icon" src="../../assets/lock.png">
                </div>
                <div class="errorMsg" v-if="passwordError">{{this.errorMessage}}</div>
                <div @click="forgot">
                    <h4  class="forgot">Forgot Password</h4>
                </div>
                
                <div class="input">
                    <button @click="login"><b>Log In</b></button>
                </div>
            </div>
        </form>
    </div>
    
</template>

<script>
import {ref} from "vue"
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"
import {useRouter} from "vue-router"
import {getFirestore} from "firebase/firestore"
import firebaseApp from "../../firebase.js"
import {getDoc, collection, doc} from "firebase/firestore"
import {mapState} from "vuex"
import {mapMutations} from "vuex"
import ResetPassword from '../../components/ResetPassword.vue'

const router = useRouter()
const auth = getAuth()
const db = getFirestore(firebaseApp)   


export default {
    name:'StudentLogin',
    data() {
        return {
            email:'',
            password:'',            
            forgetPassword: false,
            errorMessage:'',
            emailError: false,
            passwordError:false
        }
    },
    components: {
        ResetPassword,
    },
    computed: {
    ...mapState(['userEmail']),
    },
    methods: {
        ...mapMutations(['SET_USEREMAIL']),
        forgot() {
            this.forgetPassword = true
        },
        close(e) {
            this.forgetPassword = false
        }, 
        
    
    async login() {   
    console.log(this.email)
    const docRef = doc(db,"students",String(this.email))
    const docs = await getDoc(docRef)
    if(!docs.exists()) {
        this.emailError = true
        this.errorMessage = "Email not registered please sign up first"
        setTimeout(() =>{
            this.emailError = false
        }, 1500)
    }
    else {
    const formFilled = docs.data().profileFormCreated
    console.log(formFilled)
    await signInWithEmailAndPassword(auth, this.email,this.password)
    .then((data) => {
        this.SET_USEREMAIL(this.email)
        //window.localStorage.setItem('emailForSignIn', this.email);
        if(!formFilled) {
            this.$router.push({name:'StudentHomePage'})
            //this.$router.push({name:'StudentProfileForm'})
        } else {
            this.$router.push({name:'StudentHomePage'})

        }
    } ).catch((error) => {
            if(error.code === "auth/wrong-password") {
                this.passwordError = true;
                this.errorMessage = "You have entered an incorrect password"
                setTimeout(() => {
                    this.passwordError = false
                }, 1500)
            } else if (error.code === "auth/user-not-found") {
                this.emailError = true  
                this.errorMessage = "The email does not exist please sign up first"
                 setTimeout(() => {
                    this.emailError = false
                }, 1500)
            }
       
    })
    }
    },
  }
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

    .link {
        font-weight: bold;
        color: blue;
        align-self: flex-start;
        margin-top: 5px;
        margin-bottom: 8px;
    }
    h4 {
        font-size: 18px;
        margin-left:15px;
        font-weight:bolder;

    }

    .form-wrap {
        display:flex;
        height:105%;
        width:100%;
        background: url("../../assets/signupBG.png") no-repeat center center fixed;
        overflow:hidden;
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
        width:40%;
    }

    .input {
        position: relative;
        display: flex;
        justify-content: left;
        align-items: center;       
    }
    .errorMsg {
        color: red;
        font-size: 15px;
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
        margin:5px;
        margin-left: 10px;
    }

    input:focus {
        outline: none;
    }

    .icon {
        width:12px;
        position:absolute;
        margin-left:20px;
    }

    button {
        margin-top:3vh;
        margin-left: 10px;
        width: 80%;
        border: none;
        display:flex;
        align-items: center;
        align-items: center;
        justify-content: center;
        background-color: green;
        height: 35px;
        border-radius: 25px;
        color: white;
    }

    .forgot {
        font-size:14px;
        color: darkgreen;
        font-weight:bolder;
        cursor: pointer;
        width: 80%;
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
        margin-top: 5px;

    }
    .inputLabel {
        margin-bottom: 0px;
        text-align: left;
    }


</style>