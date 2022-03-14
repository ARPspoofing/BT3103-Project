<template>
    Register
    <p><input type="text" v-model="email"></p>
    <p><input type="password" v-model="password"></p>
    <!-- After writing a proper authentication, change the function --> 
    <p><button @click="test">Submit</button></p>
</template>

<script setup>
import {ref} from "vue"
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"
import {useRouter} from "vue-router"
/*
import {getFirestore} from 'firebase/firestore';
import {doc, setDoc} from 'firebase/firestore';
const db = getFirestore(firebaseApp)
*/

const email = ref("")
const password = ref("")
const router = useRouter()
const register = () => {
    signInWithEmailAndPassword(getAuth(), email.value,password.value)
    .then((data) => {

        router.push('/about')
    } ).catch((error) => {
        console.log(error)
    })
}

const test = () => {
    router.push('/student/profileForm')
}
</script>

<style lang='sass'>
    
</style>