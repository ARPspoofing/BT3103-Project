<template>
        <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            {{projectTitle}} <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">{{description}}</p>
        </div>
        <button v-show=apply href="#" class="btn-apply">Apply Now</button>
      </div>
</template>

<script>
export default {
    props:{
        projectTitle: String,
        description: String,
        apply: Boolean,
    }
}
</script>

<style>
  .card-text {
    width: 100%;
    margin: 15px;
  }

  .card-body {
    background-color: #F2F5F7;
    border-radius: 8px;
    width: 30%;
    float: left;
    padding: 20px;
    border: 2px solid #0E8044;
    margin: 10px;
    box-shadow: 1px 1px grey;
  }

  .card-title {
    display: inline-block;
  }

  .card-content {
    text-align: left;
    margin-bottom: 10px;
  }

  .clogo {
    text-align: left;
  }

  .btn-apply {
    background-color: #0E8044;
    color: white;
    border-radius: 8px;
    width: 40%
  }

  .logo {
    vertical-align: left;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>