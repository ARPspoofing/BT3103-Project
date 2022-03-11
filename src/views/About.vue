<template>
  <div class="about">
    <router-link :to="{name:'Home'}">Home</router-link> |
    About
  </div>
</template>

<script>
export default {
    name:"About" 
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

</style>