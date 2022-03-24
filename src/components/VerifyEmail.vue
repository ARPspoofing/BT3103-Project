<template>
    <Loading v-if="loading"/>
    <div class="popup">
        <div class="content">
            <div class="input">
                <p><b>{{msg}}</b></p>
            </div>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getFirestore,getDoc, collection, doc,setDoc,updateDoc} from 'firebase/firestore';
import {getAuth,sendPasswordResetEmail,sendSignInLinkToEmail,isSignInWithEmailLink} from "firebase/auth"
import {useRouter} from "vue-router"
import Loading from './Loading.vue'


const db = getFirestore(firebaseApp)
const router = useRouter()

export default {
    name:'VerifyEmail',
    data() {
        return {
            email: '',
            notSent: true,
            msg: 'Please check your email inbox and click on the link sent by us to verify your email. You will have to verify your email to proceed.',
            notEntered: true,
            loading: false,
        }
    },
    mounted() {
        const that = this
        async function check() {
            const auth = getAuth()
            let email = window.localStorage.getItem('emailForSignIn');
            const docRef = doc(db,"businesses",String(email))
            const docs = await getDoc(docRef)
            const formFilled = docs.data().profileFormCreated
            const verifyEmail = docs.data().verifyEmail
            if (verifyEmail) {
                if(formFilled) {  
                    console.log("formFilled")      
                    that.$router.push({name:'BusinessHomePage'})
                } else {
                    that.$router.push({name:'BusinessProfileForm'})
                }
            }
            console.log("CHECK",isSignInWithEmailLink(auth, window.location.href))
            if (isSignInWithEmailLink(auth, window.location.href)) {
                let email = window.localStorage.getItem('emailForSignIn');
                console.log("link email",email)
                if (!email) {
                    // User opened the link on a different device. 
                    email = window.prompt('Please provide your email for confirmation');
                }
                else {
                    that.loading = true
                    const docRef = doc(db,"businesses",String(email))
                    const docs = await getDoc(docRef)
                    const formFilled = docs.data().profileFormCreated
                    await updateDoc(docRef, {
                    verifyEmail: true
                    });
                    if(formFilled) {  
                        console.log("formFilled")      
                        that.$router.push({name:'BusinessHomePage'})
                    } else {
                        that.$router.push({name:'BusinessHomePage'})
                        //that.$router.push({name:'BusinessProfileForm'})
                    }
                }
            }
        }
        check()
    },
    methods: {
        reset() {
            if (this.email != '') {        
                const auth = getAuth()
                sendPasswordResetEmail(getAuth(),this.email).then(() => {}).catch(() => {})
                auth.currentUser.emailVerified
                this.notEntered = false
                this.msg = 'Please check your email inbox or the junk folder'
                setTimeout(() => {
                    this.notSent = false
                }, 3500)
            }
        }
    },
}
</script>

<style scoped>
.popup {
    z-index:100;
    position:fixed;
    display:flex;
    justify-content:center;
    align-items:center;
    height:80vh;
    width:100%;
}

.content {
    border-radius: 20px;
    padding: 80px 60px;
    background-color: lightseagreen;
}

.cross {
    display: flex;
    align-items: flex-start;
    margin-top:-80px;
    margin-left:-30px;
    color:red;
    cursor:pointer;
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
        background-color: white;
        color:black;
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

p {
    text-align:center;
}

.red {
    background-color: #ec5757;
}
.green {
    background-color: #33d69f;
}

button,
    .button {
    cursor: pointer;
    padding: 16px 24px;
    border-radius: 30px;
    margin-top:30px;
    border: none;
    font-size: 12px;
    margin-right: 8px;
    color: #fff;
    }

</style>