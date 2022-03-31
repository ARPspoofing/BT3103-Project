<template>
  <div class="card-body" @click.self="clickCard">
    <div class="clogo">
      <img v-bind:src=picture alt="Logo" class="logo" />
      <span class="card-title"> {{ projectTitle }} <br /> </span>
    </div>
    <div class="card-content">
      <p class="card-text">{{ description }}</p>
    </div>
    <p id="appstatus" class="offered" v-if="stat == 'offered'">Offered</p>
    <p id="appstatus" class="pending" v-else-if="stat == 'pending'">Pending</p>
    <p id="appstatus" class="rejected" v-else-if="stat == 'rejected'">Rejected</p>

    <button id="applybtns" v-show="apply" v-if="appstat == 'applied'" class="btn-applied">Applied</button>
    <button id="applybtns" v-show="apply" v-else="appstat == 'apply'" class="btn-apply" data-bs-toggle="modal" data-bs-target="#applyModal">Apply Now</button>
    <div class="modal fade" id="applyModal" tabindex="-1" aria-labelledby="applyModalLabel" aria-hidden="true" data-bs-backdrop="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="words">
              <i class="fa-solid fa-circle-check" id="tickIcon"></i>
              <p>Apply for<span style="color: #0e8044"><strong>{{ projectTitle }} </strong></span>?</p>
            </div>
            <span>
              <div class="applybtns">
                <button type="button" id="yesbtn" data-bs-dismiss="modal" @click="applicantbtn">Yes</button>
                <button type="button" id="nobtn" data-bs-dismiss="modal">No</button>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <button id="acceptbtn" v-show="offered" @click="acceptBtn" class="btn-apply">Accept</button>
    <button id="declinebtn" v-show="offered" @click="declineBtn" class="btn-apply">Decline</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testCollection: [],
      stat: "",
      appstat: "",
    };
  },

  props: {
    projectTitle: String,
    description: String,
    apply: Boolean,
    stat: String,
    appstat: String,
    offered: Boolean,
    picture: String
    //applicantbtn: Function,
  },
  methods: {
    applicantbtn() {
      this.$emit("applicantbtn");
    },

    clickCard() {
      this.$emit("clickCard");
    },

    acceptBtn() {
      this.$emit("acceptBtn");
    },

    declineBtn() {
      this.$emit("declineBtn");
    },
  },
};
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
  background-color: #bbdfcc;
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
  height: 40px;
  margin: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
  /* display: inline-block; */
}

.card-content {
  text-align: left;
  margin-bottom: 10px;
  width: 300px;
}

.clogo {
  text-align: left;
  font-size: 22px;
}

#applybtns {
  /* background-color: #0E8044; */
  color: white;
  border-radius: 8px;
  border-width: 0px;
  height: 30px;
}

#acceptbtn {
  color: white;
  border-radius: 8px;
  border-width: 0px;
  height: 30px;
}

#declinebtn {
  background-color: #F40000;
  color: white;
  border-radius: 8px;
  border-width: 0px;
  height: 30px;
}

.btn-apply {
  background-color: #0e8044;
  margin-top: 0px;
  width: 40%;
}

.btn-applied {
  background-color: #888888;
  margin-top: 0px;
  width: 40%;
}

.btn-accept {
  background-color: #0e8044;
  color: white;
  display: inline;
  width: 25%;
  /* border-radius: 8px;
    border-width: 0px;
    height: 30px;    */
  margin-left: 205px;
}

.logo {
  vertical-align: left;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 10px;
  margin-right: 10px;
  float: left;
}

#appstatus {
  text-align: left;
  display: inline;
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
}

.offered {
  color: #0e8044;
}

.pending {
  color: #e99141;
}

.rejected {
  color: #ec5c5c;
}
</style>
