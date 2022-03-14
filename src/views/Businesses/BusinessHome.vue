<template>
    <div class="home">
      <div id="nav">
        <router-link :to="{name:'BusinessLogin'}">Login</router-link>
        <router-link :to="{name:'BusinessSignup'}">Signup</router-link>
        <router-link :to="{name:'Home'}">Home</router-link>
        <h1>Welcome Businesses!</h1>
      </div>
      <router-view></router-view>
    
    </div>
</template>

<script>
import {useRouter} from "vue-router"
const router = useRouter()
export default {
  name: 'BusinessHome',
  
}
</script>


<style scoped>
.home {
  height: 100vh;
}

</style>