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
        <button href="#" class="btn-apply">Apply Now</button>
      </div>
</template>

<script>
export default {
    props:{
        projectTitle: String,
        description: String,
    }
}
</script>

<style>
.card-text {
    width: 100%;
    margin: 15px;
  }

  .card-body {
    background-color: #BBDFCC;
    border-radius: 8px;
    width: 30%;
    height: 200px;
    float: left;
    padding: 20px;
    margin: 10px;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.15);
  }

  .card-title {
    display: inline-block;
  }

  .card-content {
    text-align: left;
    margin-bottom: 10px;
    width:320px;
  }

  .clogo {
    text-align: left;
    font-size: 22px;
  }

  .btn-apply {
    background-color: #0E8044;
    color: white;
    width: 40%;
    border-radius: 8px;
    border-width: 0px;
    height: 30px;
    margin-top: 10px;
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