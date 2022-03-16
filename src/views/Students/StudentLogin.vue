<template>

<div class="form-wrap">
        <form class="login">
            <div class="inputs">
                <div class="input">
                    <h1>Welcome Back!</h1>
                </div>
                <div class="input">
                    <h4>Login with your details</h4>
                </div>
                <div class="input">
                    <h4>Email</h4>
                </div>
                <div class="input">
                    <input type="text" v-model="email">
                    <img class="icon" src="../../assets/envelope.png">
                </div>
                <div class="input">
                    <h4>Password</h4>
                </div>
                <div class="input">
                    <input type="password" v-model="password">
                    <img class="icon" src="../../assets/lock.png">
                </div>
                <div class="input">
                    <button @click="login"><b>Log In</b></button>
                </div>
            </div>
        </form>
    </div>
    <span>{{this.errorMessage}}</span>
</template>

<script setup>
import {ref} from "vue"
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"
import {useRouter} from "vue-router"
import {getFirestore} from "firebase/firestore"
import firebaseApp from "../../firebase.js"
import {getDoc, collection, doc} from "firebase/firestore"

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
            router.push({name:'StudentLandingPage'})

        }
    } ).catch((error) => {
        console.log(error)
    })

    }
}


</script>

<style scoped>
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
</style>