<template>
  <div class="welcome-wrap">
    <div class="message">
      <h1>
        A Platform to <br />
        Bridge Businesses <br />
        and Students
      </h1>
      <h4>
        Find and work for projects which you are <br />
        interested in
      </h4>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
const router = useRouter();
export default {
  name: "Home",
  components: {},
};
</script>

<style scoped>
.welcome-wrap {
  display: flex;
  height: 105%;
  width: 100%;
  background: url("../assets/welcome.png") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

h1 {
  font-family: "Poppins", sans-serif;
  font-size: 50px;
  text-align: left;
  margin: 20px 0px 0px 80px;
}
h4 {
  font-family: "Poppins", sans-serif;
  text-align: left;
  margin: 10px 0px 0px 88px;
  line-height: 40px;
}
</style>
