<template>
  <NavBar :Heading="Heading" :header=true />
  <div class="mainBody">
    <router-link class="floating-right-bottom-btn" :to="{name:'BusinessAddProject'}">
      <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
    </router-link>
    <h1 id="interest">
      <span>
        <router-link class="optionsOff" :to="{name:'BusinessHomePage'}" ><b>POSTED</b></router-link>
      </span>
      <span>
        <router-link class="optionsOff" :to="{name:'BusinessInProgress'}" ><b>IN PROGRESS</b></router-link>
      </span>
      <span class="options">
        <b>COMPLETED</b>
      </span>
    </h1>
    <hr>
</div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import NavBar from '../../components/BusinessNavBar.vue'
export default {
  name: 'BusinessCompleted',
  components: {
    Multiselect, 
    NavBar
  },
  data() {
    return {
      Heading: "MY PROJECTS"
    }
  }
}
</script>


<style scoped>
  .dropdown {
    width: 50%;
  }
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
    padding: 5px 25px;
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
  }

  #plusIcon {
    height: 70px;
    width: 70px;
    color: #004A23;
  }

  .multiselect-tag.is-user {
    padding: 5px 8px;
    border-radius: 22px;
    background: #BBDFCC;
    margin: 3px 3px 8px;
    width: 350px;
  }
</style>