<template>
    <div class="home">
      <div id="nav">
        <router-link :to="{name:'Login'}">Login</router-link>
        <router-link :to="{name:'Signup'}">Signup</router-link>
      </div>
      <router-view></router-view>
    
    </div>
</template>

<script>
import {useRouter} from "vue-router"
const router = useRouter()
export default {
  name: 'Home',
  components: {
  },
}
</script>


<style scoped>
.home {
  height: 100vh;
}

</style>

