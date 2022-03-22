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
            Navigate
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <router-link class="nav-item nav-link active" :to="{name:'StudentHomePage'}" >Home</router-link>
            <div class="dropdown-divider"></div>
            <router-link class="nav-item nav-link active" :to="{name:'StudentAbout'}">About</router-link>
            <div class="dropdown-divider"></div>
            <router-link class="nav-item nav-link active" :to="{name:'StudentLogin'}"><span @click="logOut">Log Out</span></router-link>
            
        </div>
        </div>
    </ul>
  </nav>
</template>

<script>
import {signOut, getAuth} from "firebase/auth"
export default {

    props:{
        Heading: String,
        search: Boolean,
        header: Boolean,
    },

    methods:  {   
    
    async logOut() {
        const auth = getAuth()
        await signOut(auth) 
        this.$router.push({"name":"StudentLogin"})

      },

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
</style>