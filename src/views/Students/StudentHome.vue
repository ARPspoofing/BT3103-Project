<template>
    <div class="home">
      <div id="nav">
        <router-link :to="{name:'StudentLogin'}">Login</router-link>
        <router-link :to="{name:'StudentSignup'}">Signup</router-link>
        <h1>Welcome Students!</h1>
      </div>
      <router-view></router-view>
    
    </div>
</template>

<script>
import {useRouter} from "vue-router"
const router = useRouter()
export default {
  name: 'StudentHome',
  components: {
  },
}
</script>


<style scoped>
.home {
  height: 100vh;
}

</style>

