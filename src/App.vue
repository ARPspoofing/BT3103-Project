<template>
  <div class="home">
      <div id="nav" v-if="navigation">
       <router-link id="role" :to="{name:'StudentLogin'}">Student</router-link> 
        <router-link id="role" :to="{name:'BusinessLogin'}">Business</router-link>        
      </div>
      <router-view/>
  </div>
      
</template>

<script>
import Home from './views/Home.vue'

export default {
    components: {
      Home,
    },
    data() {
      return {
        navigation: true,
      }
    },
    created() {
      this.checkRoute()
      console.log(this.$route.name)
    },
    watch: {
      $route() {
        this.checkRoute()
      },
    },
    methods: {
      checkRoute() {
        if (this.$route.name == 'Home') {
          this.navigation = true
          return 
        } 
        this.navigation = false
      },
    },
  }
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,300&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 100%;
  min-height: 100%;
  font-family: 'Poppins', sans-serif;
}
#nav {
  padding: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
 
#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
  font-weight:700px;
}

.home {
  height:80vh;
}

.fade-enter-from,
.fade-leave-to {
  opacity:0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

#role:hover {
  color: #0E8044;
}

</style>
