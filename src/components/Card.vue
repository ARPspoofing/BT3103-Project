<template>
        <div class="card-body" @click="clickCard">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            {{projectTitle}} <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">{{description}}</p>
        </div>
        <p id="appstatus" class="offered" v-if="stat == 'offered'">Offered</p>
        <p id="appstatus" class="pending" v-else-if="stat == 'pending'">Pending</p>
        <p id="appstatus" class="rejected" v-else-if="stat == 'rejected'">Rejected</p>
        
        <button v-show=apply class="btn-apply" @click="applicantbtn">Apply Now</button>
        <button v-show=offered class="btn-apply">Accept</button>
      </div>
</template>

<script>
export default {
    data() {
      return {
        testCollection: [],
        stat: "", 
      }
    },

    props:{
        projectTitle: String,
        description: String,
        apply: Boolean,
        stat: String, 
        offered: Boolean,
        //applicantbtn: Function,

    },
    methods: {
      applicantbtn() {
        this.$emit('applicantbtn')
    }, 
    
    clickCard() {
      this.$emit('clickCard')
    }
  }
}
</script>

<style>
  .card-text {
    width: 100%;
    height: 45px;
    margin: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
            line-clamp: 2; 
    -webkit-box-orient: vertical;
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
    width: 60%;
    height: 30px;
    margin: 15px;
    overflow: wrap;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
            line-clamp: 1; 
    -webkit-box-orient: vertical;
    display: inline-block;
  }

  .card-content {
    text-align: left;
    margin-bottom: 10px;
    width:300px;
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
    margin-top: 0px;
  }

  .btn-accept {
    background-color: #0E8044;
    color: white;
    display: inline;
    width: 25%;
    border-radius: 8px;
    border-width: 0px;
    height: 30px;   
    margin-left: 205px; 
  }
  
  .logo {
    vertical-align: left;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
  }

  #appstatus { 
    text-align: left;
    display: inline;
    margin-left: 10px;
    font-size: 18px;
    font-weight:bold;
  }

  .offered {
    color: #0E8044;
  }

  .pending {
    color: #E99141;
  }

  .rejected {
    color: #EC5C5C;
  }
</style>