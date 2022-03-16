<template>
    <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span>
            <div class="appDetails">
                Applicant Name <br>
                Course
            </div>
          </span>
        </div>
        <span v-show=buttons>
          <div class="appButtons" >
            <button href="#" class="accept">Accept</button> <br>
            <button href="#" class="reject">Reject</button> <br>
          </div> 
        </span>
    </div>
</template>

<script>
export default {
    props:{
        buttons: Boolean,
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
    height: max-content;
    float: left;
    padding: 20px;
    margin: 10px;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.15);
  }

  .appDetails {
    display: inline-block;
    font-size: 85%;
  }

  .appButtons {
    width: max-content;
    float: right;
  }

  .clogo {
    text-align: left;
    font-size: 22px;
  }

  .accept {
    background-color: #0E8044;
    color: white;
    width: 110%;
    border-radius: 8px;
    border-width: 0px;
    height: 30px;
    margin-right: 10px;
  }

  .reject {
    background-color: #F40000;
    color: white;
    width: 110%;
    border-radius: 8px;
    border-width: 0px;
    height: 30px;
    margin-top: 5px;
    margin-right: 10px;
  }

  .logo {
    vertical-align: left;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
    vertical-align: left;
    float: left;
  }
</style>