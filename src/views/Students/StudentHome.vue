<template>
    <div class="home">
      <div id="nav">
        <router-link :to="{name:'StudentHome'}">Home</router-link>
        <router-link :to="{name:'StudentLogin'}">Login</router-link>
        <router-link :to="{name:'StudentSignup'}">Signup</router-link>
        <h1>Welcome Students!</h1>
      </div>
      <router-view v-slot="{Component}">  
        <transition enter-active-class="animate__animated animate__fadeInRight"
        leave-active-class="animate__animated animate__fadeOutRight" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    
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

.fade-enter-from,
.fade-leave-to {
  opacity:0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

</style>

