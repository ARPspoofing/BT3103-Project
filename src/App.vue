<template>
  <div class="home">
      <div id="nav">
        <router-link to='/'>Home</router-link> |
       <router-link to='/student'>Students</router-link> |
        <router-link to='/business'>Businesses</router-link> | 
        <router-link to='/about'>About</router-link>

        

        
      </div>
      <router-view/>
  </div>
      
</template>

<script>
import Home from './views/Home.vue'
//import ProfileForm from './views/Students/StudentProfilePage/StudentProfileForm.vue'
  export default {
    components: {
      Home,
      
    }
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
}

.home {
  height:80vh;
}

</style>
