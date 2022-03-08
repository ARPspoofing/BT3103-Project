<template>
    Register
    <p><input type="text" v-model="email"></p>
    <p><input type="password" v-model="password"></p>
    <p><button @click="register">Submit</button></p>
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
    } )
}    
</script>

<style lang='sass'>
    
</style>