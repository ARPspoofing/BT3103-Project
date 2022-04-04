<template>
  <nav class="navbar navbar-expand-lg navbar-custom">
    <img src="../assets/Pathfinders.png" class="d-inline-block align-top" width=250 alt="logo">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <h2 v-show=header id="title"><b>{{Heading}}</b></h2>
    <div v-show=search class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <form v-show=search class="form-inline my-2 my-lg-0">
        <input v-show=search class="form-control-inline mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button v-show=search class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
    <ul class="navbar-nav ms-auto">
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{username}}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          
            <router-link class="nav-item nav-link active" :to="{name:'BusinessHomePage'}" >Home</router-link>
            <div class="dropdown-divider"></div>
            <router-link class="nav-item nav-link active" :to="{name:'BusinessAbout'}">About</router-link>
            <div class="dropdown-divider"></div>
            
            <router-link class="nav-item nav-link active" :to="{name:'BusinessLogin'}"><span @click="logOut">Log Out</span></router-link>
            
        </div>
        </div>
        <div class="profile-pic-outer">
            <img id="profilepic" src="https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"/>
        </div>
    </ul>
  </nav>
</template>

<script>
import firebaseApp from '../firebase.js';
import {signOut, getAuth, onAuthStateChanged} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { collection, doc, setDoc, deleteDoc, getDocs, updateDoc, getDoc } from "firebase/firestore"
import {mapState} from "vuex"
import {mapMutations} from "vuex"
const db = getFirestore(firebaseApp);
export default {

    props:{
        Heading: String,
        search: Boolean,
        header: Boolean,
    },
    data() {
      return {
        username: '',
      }
    },

    methods:  {   
    async logOut() {
        const auth = getAuth()
        await signOut(auth) 
        this.$router.push({"name":"BusinessLogin"})
      },
    }, 
    computed: {
      ...mapState(['name','userEmail']),
    },
    mounted() {
      
      /*
      const auth = getAuth();
      var userEmail = auth.currentUser.email;
      console.log(userEmail)
      */
      //const userEmail = window.localStorage.getItem('emailForSignIn')
      this.username = this.userEmail
      const userEmail = this.userEmail
      async function getApplicant(userEmail) {
        const docSnap = await getDoc(doc(db, "businesses", userEmail));
        console.log("doc: "+ docSnap)
        let data = docSnap.data();
        console.log(data)
        //name =  data.name;
        //console.log("name: "+ name)
        //let result = await data.name
        var name = data.name;
        dropdownMenuButton.innerHTML = name
        var picture = data.finalProfile;
        console.log(typeof picture === 'undefined')
        if (typeof picture === 'undefined') {
          document.getElementById("profilepic").src = "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"
        } else {
          document.getElementById("profilepic").src = picture
        }
        return {name: data.name}
      }
      getApplicant(userEmail)
    }
}
</script>

<style scoped>
  .navbar-custom {
    background-color: #004A23;
  }

  input[type="search"]::placeholder {  
    text-align: center; 
  } 

  input {
    border-radius: 5px;
    border-width: 0px;
    height: 35px;
    width: 350px;
    margin-left:30px;
  }

  .btn {
    margin: 10px;
    background-color: transparent;
    text-decoration: underline;
    border: none;
  }

  .btn:hover {
    background-color: transparent;
    border: none;
    color: rgb(241, 184, 25);
  }

  #title {
      color: white;
      margin-left:30px;
      margin-right: 30px;
      margin-bottom: 0px;
  }

  .mainBody {
    background-color: #F5F5F5;
    width: 100%;
    height: 100%;
    position: fixed;
  }

  #profilepic {
    width: 40px;
    height: 40px;
    float: right;
    margin: 10px 20px 10px 0px;
    border-radius: 50%;
  }
</style>