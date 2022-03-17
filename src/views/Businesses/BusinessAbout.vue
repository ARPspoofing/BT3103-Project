<template>
<!--
<nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <img src="../assets/Pathfinders.png" class="d-inline-block align-top" width=200 alt="logo">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    <div class="navbar-nav">
      <router-link class="nav-item nav-link active" :to="{name:'Home'}" >Home</router-link>
      <div class="dropdown-divider"></div>
      <router-link class="nav-item nav-link active" :to="{name:'About'}">About</router-link>
      <a class="nav-item nav-link" href="#">Pricing</a>
      <a class="nav-item nav-link disabled" href="#">Disabled</a>
    </div>
  </div>
</nav>
  <div class="about">
    <router-link :to="{name:'StudentHomePage'}">Student Home</router-link> |
    <router-link :to="{name:'BusinessHomePage'}">Business Home</router-link> |
    About
  </div>-->
  <BusinessNavBar :search=true :Heading="Heading" :header=true />
</template>

<script>
import BusinessNavBar from '../../components/BusinessNavBar.vue'
export default {
  name: 'BusinessAbout',
  components: {
    BusinessNavBar
  },
  data() {
    return {
      Heading: "PROFILE",
    }
  }
}
</script>

<style>
h3 {
    font-family: verdana;
    text-align: center;
}

h1 {
    color: rgba(0, 0, 0, 0.829);
    font-family: verdana;
    font-size: 170%;
    text-align: center;
    padding: 8px
}

nav {
  background-color: "#004A23";
}

</style>