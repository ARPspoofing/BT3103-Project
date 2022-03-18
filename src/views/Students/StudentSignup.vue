<template>
<div id="nav">
<router-link :to="{name:'Home'}">Home</router-link>
<router-link :to="{name:'StudentLogin'}">Login</router-link>
<router-link :to="{name:'StudentSignup'}">Signup</router-link>
</div>
        <Loading v-if="loading"/>
        <router-view/>
    <div class="form-wrap">
        <form class="signup">
            <div class="inputs">
                <div class="input">
                    <h1>Welcome Student!</h1>
                </div>
                <div class="input">
                    <h4>Signup with your NUS email</h4>
                </div>
                <div class="inputLabel">
                    <h4>Email</h4>
                </div>
                <div class="input">
                    <input :class="{shake:emailErrorPresent,'input-error':emailErrorPresent}" type="text" v-model="email" placeholder="e1234567@u.nus.edu" >
                    <img class="icon" src="../../assets/envelope.png">
                </div>
                <div class="errorMsg" v-if="emailErrorPresent">{{this.errorMessage}}</div>
                <div class="inputLabel">
                    <h4>Password</h4>
                </div>
                <div class="input">
                    <input :class="{shake:passwordErrorPresent,'input-error':passwordErrorPresent}" type="password" v-model="password">
                    <img class="icon" src="../../assets/lock.png">
                </div>
                <div class="errorMsg" v-if="passwordErrorPresent">{{this.errorMessage}}</div>
                <div class="inputLabel">
                    <h4>Confirm Password</h4>
                </div>
                <div class="input">
                    <input :class="{shake:confirmPasswordErrorPresent,'input-error':confirmPasswordErrorPresent}" type="password" v-model="confirmPassword">
                    <img class="icon" src="../../assets/lock.png">
                </div>
                <div class="errorMsg" v-if="confirmPasswordErrorPresent">{{this.errorMessage}}</div>
                <div class="input">
                    <button @click="register"><b>Sign Up</b></button>
                </div>
            </div>
        </form>
    </div>
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
var validEmail = []
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
    created() {
      this.getValidEmail()
      console.log("validEmail",validEmail)
    },
    components: {
        Loading,
    },
    methods: {
        async getValidEmail() {
          let database = await getDocs(collection(db,"nusEmails"))
          database.forEach((doc) => {
              var data = doc.data()
              validEmail.push(data.email)
              //console.log(validEmail)
              })
      },
        register() { 
                if(this.email == '') {
                    this.errorMessage = 'email field is empty'
                    this.emailErrorPresent = true
                    setTimeout(() => {
                        this.emailErrorPresent = false
                    }, 1500)
                } else if(this.password == '') {
                    this.errorMessage = 'password field is empty'
                    this.passwordErrorPresent = true
                    setTimeout(() => {
                        this.passwordErrorPresent = false
                    }, 1500)
                } else if (this.confirmPassword == '') {
                    this.errorMessage = 'confirm password field is empty'
                    this.confirmPasswordErrorPresent = true
                    setTimeout(() => {
                        this.confirmPasswordErrorPresent = false
                    }, 1500)
                } else if(this.confirmPassword != this.password) {
                    this.errorMessage = 'Password and confirm password do not match'
                    this.passwordErrorPresent = true
                    setTimeout(() => {
                        this.passwordErrorPresent = false
                    }, 1500) 
                    /*
                } else if (this.email == '' && this.password == '') {
                    this.errorMessage = 'email field is empty'
                    this.emailErrorPresent = true
                    setTimeout(() => {
                        this.emailErrorPresent = false
                    }, 1500)
                    this.errorMessage = 'password field is empty'
                    this.passwordErrorPresent = true
                    setTimeout(() => {
                        this.passwordErrorPresent = false
                    }, 1500)
                }else if(this.email == '' && this.confirmPassword == '') {
                    this.errorMessage = 'email field is empty'
                    this.emailErrorPresent = true
                    setTimeout(() => {
                        this.emailErrorPresent = false
                    }, 1500)
                    this.errorMessage = 'Confirm password field is empty'
                    this.confirmPasswordErrorPresent = true
                    setTimeout(() => {
                        this.confirmPasswordErrorPresent = false
                    }, 1500)
                } else if (this.password == '' && this.confirmPassword == '') {
                    this.errorMessage = 'Confirm password field is empty'
                    this.confirmPasswordErrorPresent = true
                    setTimeout(() => {
                        this.confirmPasswordErrorPresent = false
                    }, 1500)
                    this.errorMessage = 'password field is empty'
                    this.passwordErrorPresent = true
                    setTimeout(() => {
                        this.passwordErrorPresent = false
                    }, 1500)
                } else if(this.email == '' && this.password == '' && this.confirmPassword == '') {
                    this.errorMessage = 'email field is empty'
                    this.emailErrorPresent = true
                    setTimeout(() => {
                        this.emailErrorPresent = false
                    }, 1500)
                    this.errorMessage = 'Confirm password field is empty'
                    this.confirmPasswordErrorPresent = true
                    setTimeout(() => {
                        this.confirmPasswordErrorPresent = false
                    }, 1500)
                    this.errorMessage = 'password field is empty'
                    this.passwordErrorPresent = true
                    setTimeout(() => {
                        this.passwordErrorPresent = false
                    }, 1500)
                    */
                }else if (!validEmail.includes(this.email)) {
                    this.errorMessage = 'Unregistered NUS email'
                    this.emailErrorPresent = true
                    setTimeout(() => {
                        this.emailErrorPresent = false
                    }, 1500)
                } else {
                    this.loading = true               
                    createUserWithEmailAndPassword(getAuth(),this.email,this.password)
                    .then((data) => {
                         setDoc(doc(db,"students",this.email),{
                            email:this.email,
                            password:this.password,
                            //when a user logs in when this attribute is false, he/she will be directed to the 
                            //profile page otherwise will be directed to the landing page
                            profileFormCreated:false,

                })
                    this.$router.push({name:'StudentProfileForm'})
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
                        this.loading = false
                    })
                }
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
        display:flex;
        height:105%;
        width:100%;
        background: url("../../assets/signupBG.png") no-repeat center center fixed;
        overflow:hidden;
        /* overflow:hidden;
        display:flex;
        height:80vh;
        justify-content: center;
        align-self: center;
        margin: 0 auto;
        width:90%;
        background-image:url("../../assets/signupBG.png");
        background-repeat: no-repeat; */
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

    .errorMsg {
        color: red;
        margin-top:10px;
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
        margin-top:5vh;
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