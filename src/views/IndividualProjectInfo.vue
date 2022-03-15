<template>
  <!--
  <nav class="navbar navbar-expand-lg navbar-custom">
    <img src="../assets/Pathfinders.png" class="d-inline-block align-top" width=250 alt="logo">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <h2 id="title"><b>MY PROJECTS</b></h2>
    <ul class="navbar-nav ms-auto">
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Navigate
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <router-link class="nav-item nav-link active" :to="{name:'StudentHomePage'}" >Home</router-link>
            <div class="dropdown-divider"></div>
            <router-link class="nav-item nav-link active" :to="{name:'About'}">About</router-link>
            <div class="dropdown-divider"></div>
            <router-link class="nav-item nav-link active" :to="{name:'BusinessHomePage'}">Business Home</router-link>
        </div>
        </div>
    </ul>
  </nav>-->
  <NavBar :search=true :header=false />
  <div class="mainBody">
    <router-link class="floating-right-bottom-btn" :to="{name:'BusinessAddProject'}">
      <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
    </router-link>
    <h1 id="interest">
      <span class="options">
        <b>PROJECT INFO</b>
      </span>
      <span>
        <router-link class="optionsOff" :to="{name:'IndividualProjectNewApps'}" ><b>NEW APPLICANTS</b></router-link>
      </span>
      <span>
        <router-link class="optionsOff" :to="{name:'IndividualProjectAccApps'}" ><b>ACCEPTED APPLICANTS</b></router-link>
      </span>
      <span>
        <router-link class="optionsOff" :to="{name:'IndividualProjectRejApps'}" ><b>REJECTED APPLICANTS</b></router-link>
      </span>
    </h1>
    <hr/>
    <div>
      <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
            Company Name <br>
            Tags
          </span>
          <span>
            <button href="#" class="edit-proj">EDIT PROJECT DETAILS</button> <br>
            <button href="#" class="close-proj">CLOSE PROJECT</button> <br>
            <button href="#" class="del-proj">DELETE PROJECT</button> 
          </span>
      </div>
      <div class = "projInfo">

      </div>
    </div>

  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
  name: 'IndividualProjectInfo',
  components: {
    NavBar
  },
  data() {
    return {
      Heading: " "
    }
  },

  data() {
    return {
      Heading: "MY PROJECTS",
      testCollection: [],
    }
  }
}
</script>

<style scoped>
  .navbar-custom {
    background-color: #004A23;
  }

  #title {
      color: white;
      margin-left:30px;
      margin-right: 30px;
      margin-bottom: 0px;
  }

  .btn {
      margin: 10px;
  }

  .mainBody {
    background-color: #F5F5F5;
    width: 100%;
    height: 100%;
    position: fixed;
  }

  #interest {
    text-align: left;
    font-size: 28px;
    margin: 30px 30px 0px 30px;
    color: #606060;
  }

  hr {
    border: 0;
    border-top: 2px solid #606060;
    width: 90%;
    margin: 5px 0px 16px 38px;
  }

  .options {
    font-size: 15px;
    padding: 10px 25px;
    margin-left: 15px;
    border-radius: 30px; /* or 50% */
    background-color: #0E8044;
    color: white;
    text-align: center;
  }

  .optionsOff {
    font-size: 15px;
    padding: 10px 25px;
    margin-left: 15px;
    border-radius: 30px; /* or 50% */
    background-color: F5F5F5;
    text-align: center;
    color: #606060;
    text-decoration: none;
  }

  .floating-right-bottom-btn {
    position : fixed;
    right : 40px;
    bottom : 50px;
    background-color: white;
    border-width: 0px;
    height: 70px;
    width: 70px;
    z-index: 110;
    border-radius: 50%;
    padding: 0px;
    background: #F8F8F8; 
  }

  #plusIcon {
    height: 70px;
    width: 70px;
    color: #004A23;
  }

  .logo {
    vertical-align: left;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
  }

  .clogo {
    text-align: left;
    margin: 20px;
  }

  .edit-proj {
    background-color: #0E8044;
    color: white;
    border-radius: 8px;
    width: 30%
  }

  .close-proj {
    background-color: #E58686;
    color: white;
    border-radius: 8px;
    width: 30%
  }

  .del-proj {
    background-color: #D23333;
    color: white;
    border-radius: 8px;
    width: 30%
  }
</style>