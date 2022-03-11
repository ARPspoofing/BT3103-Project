<template>
<nav class="navbar navbar-expand-lg navbar-light bg-dark" style="background-color: #567d46;">
  <img src="../assets/Pathfinders.png" class="d-inline-block align-top" width=200 alt="logo">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
    <div class="navbar-nav">
      <router-link class="nav-item nav-link active" :to="{name:'Home'}" >Home</router-link>
      <router-link class="nav-item nav-link active" :to="{name:'About'}">About</router-link>
      <a class="nav-item nav-link" href="#">Pricing</a>
    </div>
  </div>
  <!-- Example single danger button -->
<div class="btn-group">
  <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Action
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Another action</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Something else here</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>
</nav>

</template>

<script>
export default {
  name: 'Home',
  components: {
  },
}
</script>

<style scoped>
  input { border-radius: 50; }
</style>
