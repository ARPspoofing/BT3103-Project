<template>
    Loading please be patient ... 
</template>

<script>
import firebaseApp from '../firebase.js';
import {getFirestore} from 'firebase/firestore';
import {doc,setDoc,collection,getDoc,deleteDoc} from 'firebase/firestore';
import {ref} from "vue"
import {getAuth,createUserWithEmailAndPassword,sendSignInLinkToEmail,isSignInWithEmailLink, signInWithEmailLink,GoogleAuthProvider,signInWithPopup} from "firebase/auth"
import {useRouter} from "vue-router"
const db = getFirestore(firebaseApp)
const router = useRouter()

export default {
    name:'GoogleLoading',
    data() {
        return {
            userEmail: '',
        }
    },
    created() {
        var that = this
        var userEmail
        var currUser = getAuth().onAuthStateChanged(function (user) {
        if (user) {
        //this.profileFormCreated = currUser.email
        //console.log(this.profileFormCreated)
            userEmail = user.email
        }
        })
        async function checkToRoute() {
            const docRef = doc(db,"businesses",String(userEmail))
            console.log("doccccccc",docRef)
            //console.log(await getDoc(docRef))
            const docs = await getDoc(docRef)
            console.log("doc exists:",docs.exists())
            if (!docs.exists()) {
                await setDoc(doc(db,"businesses",String(userEmail)),{
                    profileFormCreated:false,
                    verifyEmail:false,
                })
                const auth = getAuth()
                const actionCodeSettings = {
                // URL you want to redirect back to. The domain (www.example.com) for this
                // URL must be in the authorized domains list in the Firebase Console.
                    url: 'http://localhost:8080/?#/business/verify',
                // This must be true.
                    handleCodeInApp: true,
                    iOS: {
                        bundleId: 'com.example.ios'
                    },
                    android: {
                        packageName: 'com.example.android',
                        installApp: true,
                        minimumVersion: '12'
                    }
                };
                sendSignInLinkToEmail(auth, userEmail, actionCodeSettings)
                .then(() => {
                    // The link was successfully sent. Inform the user.
                    // Save the email locally so you don't need to ask the user for it again
                    // if they open the link on the same device.
                    window.localStorage.setItem('emailForSignIn', userEmail);
                    
                    that.$router.push({name:'BusinessVerify'})
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    console.log("email",userEmail)
                    // ...
                });
            //that.$router.push({name:'BusinessVerify'})
            } else {
                that.$router.push({name:'BusinessHomePage'})
            }
            
        }
                /*
                console.log(docs.data())
                if (!docs.data().profileFormCreated || !docs.data().verifyEmail) {
                    setDoc(doc(db,"businesses",String(this.email)),{
                    profileFormCreated:false,
                    verifyEmail:false,
                    })
                }
                const formFilled = docs.data().profileFormCreated
                const verifyEmail = docs.data().verifyEmail
                cosole.log("verifyEmail",verifyEmail)
                // The signed-in user info.
                console.log("token",token)
                if (!verifyEmail) {
                    that.$router.push({name:'BusinessVerify'})
                } else {
                    that.$router.push({name:'BusinessHomePage'})
                }
                */
               checkToRoute();
    },
}
</script>

<style scoped>
    
</style>