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
               
                    <h4>Email</h4>
                </div>
                <div class="input">
                    <input type="text" v-model="email">
                    <img class="icon" src="../../assets/envelope.png">
                </div>
                
                <div class="input">
                    <input type="password" v-model="password">
                    <img class="icon" src="../../assets/lock.png">
                </div>
                <div @click="forgot" class="forgot">
                    <h4>Forgot Password</h4>
                </div>
                
                <div class="input">
                    <button @click="login"><b>Log In</b></button>
                </div>
            </div>
        </form>
    </div>
    <span>{{this.errorMessage}}</span>
</template>

<script>
import {ref} from "vue"
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"
import {useRouter} from "vue-router"
import {getFirestore} from "firebase/firestore"
import firebaseApp from "../../firebase.js"
import {getDoc, collection, doc} from "firebase/firestore"
import ResetPassword from '../../components/ResetPassword.vue'

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()
const db = getFirestore(firebaseApp)

const login = async () => {

    if(email != '' && password != '') {
        
        console.log(email.value)
    const docRef = doc(db,"students",String(email.value))
    const docs = await getDoc(docRef)
    const formFilled = docs.data().profileFormCreated
    console.log(formFilled)
    signInWithEmailAndPassword(auth, email.value,password.value)
    .then((data) => {
        if(!formFilled) {
            router.push({name:'StudentProfileForm'})
        } else {
            router.push({name:'StudentHomePage'})

        }
    } ).catch((error) => {
        console.log(error)
    })

    }
}

export default {
    name:'StudentLogin',
    data() {
        return {
            forgetPassword: false
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
        }
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

    .forgot {
        font-size: 12px;
        color:darkgreen;
        cursor: pointer;
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
</style>