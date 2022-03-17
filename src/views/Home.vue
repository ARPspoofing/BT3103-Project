<template>
    <div class="welcome-wrap">
      <div class="message">
        <h1>A Platform to <br> Bridge Businesses <br> and Students</h1>
        <h4>Find and work for projects which you are interested in</h4>
      </div>
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
.welcome-wrap {
        display:flex;
        height:100%;
        width:100%;
        background: url("../assets/welcome.png") no-repeat center center fixed; 
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    h1 {
      font-family: 'Poppins', sans-serif;
      font-size: 50px;
    }

</style>

