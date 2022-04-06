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
                    <h6>Signup with your NUS email</h6>
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
import {mapState} from "vuex"
import {mapMutations} from "vuex"
import Loading from '../../components/Loading.vue'

//Style 

const db = getFirestore(firebaseApp)
const router = useRouter()
//var validEmail = []
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
            validEmail: []
        }
    },
    computed: {
    ...mapState(['userEmail']),
    },
    mounted() {
    const curr = this
    async function getValidEmail() {
        var validEmail = []
          let database = await getDocs(collection(db,"nusEmails"))
          database.forEach((doc) => {
              var data = doc.data()
              validEmail.push(data.email)
              //console.log(validEmail)
              })
      curr.validEmail = validEmail
      console.log(curr.validEmail)
      }
      getValidEmail()
    },
    components: {
        Loading,
    },
    methods: {
        ...mapMutations(['SET_USEREMAIL']),
        register() { 
            console.log(this.validEmail)
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
                }else if (!this.validEmail.includes(this.email)) {
                    this.errorMessage = 'Unregistered NUS email'
                    console.log(this.validEmail)
                    this.emailErrorPresent = true
                    setTimeout(() => {
                        this.emailErrorPresent = false
                    }, 1500)
                } else if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(this.password) == false) {
                    this.passwordErrorPresent = true
                    this.loading = false
                    this.errorMessage = "Weak Password"
                    setTimeout(() => {
                        this.passwordErrorPresent = false
                    }, 1500)
                } else {
                    this.loading = true               
                    createUserWithEmailAndPassword(getAuth(),this.email,this.password)
                    .then((data) => {
                        this.SET_USEREMAIL(this.email)
                        //window.localStorage.setItem('emailForSignIn', this.email);
                         setDoc(doc(db,"students",this.email),{
                            email:this.email,
                            //password:this.password,
                            //when a user logs in when this attribute is false, he/she will be directed to the 
                            //profile page otherwise will be directed to the landing page
                            profileFormCreated:false,

                })
                    this.$router.push({name:'StudentHomePage'})
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
        margin-top:10px;
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
        margin:10px;
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
</style>