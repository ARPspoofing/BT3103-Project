<template>
  <h1>This is a test landing page for students</h1>
  <button @click = "logOut">Log Out</button>
</template>

<script>
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth'


export default {
    name: 'StudentLandingPage', 

    data() {
        return {
            user:false,
        }
    }, 

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user ) => {
            if(user) {
                this.user = user;
            }
        })
    },

    methods: {
        logOut() {
            const auth = getAuth();
            const user = auth.currentUser;  
            signOut(auth, user) 
            this.$router.push({name:'StudentLogin'})   
        }
    }

}
</script>

<style>

</style>