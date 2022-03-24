<template>
    <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span>
            <div class="appDetails">
                {{applicantName}} <br>
                {{applicantCourse}}
            </div>
          </span>
        </div>
        <span v-show=buttons>
          <div class="appButtons" >
            <button href="#" class="accept" data-bs-toggle="modal" data-bs-target="#accModal">Accept</button> <br>
            <div class="modal fade" id="accModal" tabindex="-1" aria-labelledby="accModalLabel" aria-hidden="true" 
            data-bs-backdrop="false">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="words">
                  <i class="fa-solid fa-circle-check" id="tickIcon"></i>
                  <p>Accept <span style="color: #0E8044"><strong>{{ applicantName }} </strong></span>?</p>
                  </div>
                  <span>
                    <div class = "applybtns">
                      <button type="button" id="yesbtn" data-bs-dismiss="modal" @click="acceptbtn">Yes</button>
                      <button type="button" id="nobtn" data-bs-dismiss="modal">No</button>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
            <button href="#" class="reject" data-bs-toggle="modal" data-bs-target="#rejModal">Reject</button> <br>
            <div class="modal fade" id="rejModal" tabindex="-1" aria-labelledby="rejModalLabel" aria-hidden="true" 
            data-bs-backdrop="false">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="words">
                  <i class="fa-solid fa-circle-check" id="tickIcon"></i>
                  <p>Reject <span style="color: #0E8044"><strong>{{ applicantName }} </strong></span>?</p>
                  </div>
                  <span>
                    <div class = "applybtns">
                      <button type="button" id="yesbtn" data-bs-dismiss="modal" @click="rejectbtn">Yes</button>
                      <button type="button" id="nobtn" data-bs-dismiss="modal">No</button>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
          </div> 
        </span>
    </div>
</template>

<script>
export default {
    data() {
      return {
        testCollection: [],
      }
    },
    
    props:{
        buttons: Boolean,
        applicantName: String,
        applicantCourse: String,
    },

    methods: {
      acceptbtn() {
        this.$emit('acceptbtn')
    }, 
    
    rejectbtn() {
      this.$emit('rejectbtn')
    }
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