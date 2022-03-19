<template>
<div id="nav">
<router-link :to="{name:'Home'}">Home</router-link>
<router-link :to="{name:'BusinessLogin'}">Login</router-link>
<router-link :to="{name:'BusinessSignup'}">Signup</router-link>
</div>
<div class="form-wrap">
        <form class="login">
            <div class="inputs">
                <div class="input">
                    <h1>Welcome Back Business!</h1>
                </div>
                <div class="input">
                    <h4>Login with your details</h4>
                </div>
                <div class="inputLabel">
                    <h4>Email</h4>
                </div>
                <div class="input">
                    <input type="text" v-model="email">
                    <img class="icon" src="../../assets/envelope.png">
                </div>
                <div class="errorMsg" v-if="emailErrorPresent">{{this.errorMessage}}</div>
                <div class="inputLabel">
                    <h4>Password</h4>
                </div>
                <div class="input">
                    <input type="password" v-model="password">
                    <img class="icon" src="../../assets/lock.png">
                </div>
                <div class="errorMsg" v-if="passwordErrorPresent">{{this.errorMessage}}</div>
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
            passwordErrorPresent:false
            
        }
    },       

    methods: {
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
        width:30%;
    }

    .input {
        position: relative;
        display: flex;
        justify-content: left;
        align-items: center;
        
        margin-bottom:5px;
    }

    input {
        width: 100%;
        border: 2px solid darkgreen;
        background-color: white;
        padding: 4px 4px 4px 30px;
        height: 35px;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        margin:5px;
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
        width: 100%;
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

    .errorMsg {
        color: red;
        margin-top:5px;
    }

     h1 {
        text-align: left;
        margin-top: 20px;
    }

    h4 {
        font-size: 16px;
        margin-bottom: 0px;
    }

    .inputLabel {
        margin-bottom: 0px;
        text-align: left;
    }
</style>