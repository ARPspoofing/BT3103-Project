<template>
<div id="nav">
<router-link :to="{name:'Home'}">Home</router-link>
<router-link :to="{name:'BusinessLogin'}">Login</router-link>
<router-link :to="{name:'BusinessSignup'}">Signup</router-link>
</div>
<div class="form-wrap">
    <ResetPassword @close="close" v-if="forgetPassword"/>
        <form class="login">
            <div class="inputs">
                <div class="input">
                    <h1>Welcome Back Business!</h1>
                </div>
                <div class="input">
                    <h4>Dont't have an account?&nbsp;</h4>
                    <router-link class="link" :to="{name:'BusinessSignup'}">Signup</router-link>
                    <router-view/>
                </div>
                <div class="input">
                    <h4>Email</h4>
                </div>
                <div class="input">
                    <input type="text" v-model="email">
                    <img class="icon" src="../../assets/envelope.png">
                </div>
                <div class="errorMsg" v-if="emailErrorPresent">{{this.errorMessage}}</div>
                <div class="input">
                    <h4>Password</h4>
                </div>
                <div class="input">
                    <input type="password" v-model="password">
                    <img class="icon" src="../../assets/lock.png">
                </div>
                <div class="errorMsg" v-if="passwordErrorPresent">{{this.errorMessage}}</div>
                <div @click="forgot">
                    <h4 class="forgot">Forgot Password</h4>
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
import ResetPassword from '../../components/ResetPassword.vue'


const router = useRouter()
const db = getFirestore(firebaseApp)

export default {
    name:"BusinessLogin",
    data() {
        return {
            email:'',
            password:'',
            errorMessage:'',
            emailErrorPresent:false,
            passwordErrorPresent:false,
            forgetPassword: false,
            
        }
    },   
    components: {
        ResetPassword,
    },    
    methods: {
    forgot() {
        this.forgetPassword = true
    },
    close(e) {
        this.forgetPassword = false
    }, 
    async login(){
        console.log("In method")
        if(this.email == '') {
            this.emailErrorPresent = true
            this.errorMessage = "Please fill in your email"  
            setTimeout(() => {
                this.emailErrorPresent = false
            },1500)

        } else if (this.password == '') {
            this.passwordErrorPresent = true
            this.errorMessage = "Please fill in your password" 
            setTimeout(() => {
                this.passwordErrorPresent = false
            },1500)

        }else if(this.email != '' && this.password != '') {
            const docRef = doc(db,"businesses",String(this.email))
            const docs = await getDoc(docRef)
            if(!docs.exists()) {
            this.emailErrorPresent = true
            this.errorMessage = "Email not registered, please create an account first"
            setTimeout(() => {
                this.emailErrorPresent = false
            }, 1500)        
            } else {
            console.log(docs.data())
            const formFilled = docs.data().profileFormCreated
        signInWithEmailAndPassword(getAuth(), this.email,this.password)
        .then((data) => {
            if(formFilled) {  
                console.log("formFilled")      
                this.$router.push({name:'BusinessHomePage'})
            } else {
                this.$router.push({name:'BusinessProfileForm'})
            }
        } ).catch((error) => {
            if(error.code === "auth/wrong-password") {
                this.passwordErrorPresent = true;
                this.errorMessage = "You have entered an incorrect password"
                setTimeout(() => {
                    this.passwordErrorPresent = false
                }, 1500)
            } else if (error.code === "auth/user-not-found") {
                this.emailErrorPrsent = true  
                this.errorMessage = "The email does not exist please sign up first"
                 setTimeout(() => {
                    this.emailErrorPresent = false
                }, 1500)
            }
    })
    }
        
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
    }

    h4 {
        font-size: 18px;
        margin-left:15px;
        font-weight:bolder;

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
        width: 100%;
        border: none;
        background-color: aquamarine;
        padding: 4px 4px 4px 30px;
        height: 25px;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        margin:10px
    }

    input:focus {
        outline: none;
    }

    .icon {
        width:12px;
        position:absolute;
        margin-left:15px;
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

    .forgot {
        font-size:14px;
        color: darkgreen;
        font-weight:bolder;
        cursor: pointer;
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