<template>
  <div class="card-body" @click.self="clickCard">
    <div class="clogo">
      <img v-bind:src="picture" alt="Logo" class="logo" />
      <span>
        <div class="appDetails">
          {{ applicantName }} <br />
          {{ applicantCourse }}
        </div>
        <div
          id="pendingOffer"
          class="acceptedStat"
          v-show="accepted"
          v-if="status == 'pending'"
        >
          pending
        </div>
        <div
          id="acceptedOffer"
          class="acceptedStat"
          v-show="accepted"
          v-else-if="status == 'accepted'"
        >
          accepted
        </div>
        <div
          id="declinedOffer"
          class="acceptedStat"
          v-show="accepted"
          v-else-if="status == 'declined'"
        >
          declined
        </div>
      </span>
    </div>
    <span v-show="buttons">
      <div class="appButtons">
        <!--<button
          href="#"
          class="accept"
          data-bs-toggle="modal"
          data-bs-target="#accModal"
        >-->
        <button href="#" class="accept" @click="acceptbtn">Accept</button>
        <br />
        <!--<div
          class="modal fade"
          id="accModal"
          tabindex="-1"
          aria-labelledby="accModalLabel"
          aria-hidden="true"
          data-bs-backdrop="false"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <div class="words">
                  <i class="fa-solid fa-circle-check" id="tickIcon"></i>
                  <p>
                    Accept
                    <span style="color: #0e8044"
                      ><strong>{{ applicantName }} </strong></span
                    >?
                  </p>
                </div>
                <span>
                  <div class="applybtns">
                    <button
                      type="button"
                      id="yesbtn"
                      data-bs-dismiss="modal"
                      @click="acceptbtn"
                    >
                      Yes
                    </button>
                    <button type="button" id="nobtn" data-bs-dismiss="modal">
                      No
                    </button>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <button
          href="#"
          class="reject"
          data-bs-toggle="modal"
          data-bs-target="#rejModal"
        >-->
        <button href="#" class="reject" @click="rejectbtn">Reject</button>
        <br />
        <!--<div
          class="modal fade"
          id="rejModal"
          tabindex="-1"
          aria-labelledby="rejModalLabel"
          aria-hidden="true"
          data-bs-backdrop="false"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <div class="words">
                  <i class="fa-solid fa-circle-check" id="tickIcon"></i>
                  <p>
                    Reject
                    <span style="color: #0e8044"
                      ><strong>{{ applicantName }} </strong></span
                    >?
                  </p>
                </div>
                <span>
                  <div class="applybtns">
                    <button
                      type="button"
                      id="yesbtn"
                      data-bs-dismiss="modal"
                      @click="rejectbtn"
                    >
                      Yes
                    </button>
                    <button type="button" id="nobtn" data-bs-dismiss="modal">
                      No
                    </button>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testCollection: [],
      status: "",
    };
  },

  props: {
    buttons: Boolean,
    applicantName: String,
    applicantCourse: String,
    status: String,
    accepted: Boolean,
    picture: String,
  },

  methods: {
    acceptbtn() {
      this.$emit("acceptbtn");
    },

    rejectbtn() {
      this.$emit("rejectbtn");
    },

    clickCard() {
      this.$emit("clickCard");
    },
  },
};
</script>

<style>
.card-text {
  width: 100%;
  margin: 15px;
}

.card-body {
  background-color: #bbdfcc;
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

.acceptedStat {
  font-size: 85%;
  margin-top: 15px;
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
  background-color: #0e8044;
  color: white;
  width: 110%;
  border-radius: 8px;
  border-width: 0px;
  height: 30px;
  margin-right: 10px;
}

.reject {
  background-color: #f40000;
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

#acceptedOffer {
  color: #0e8044;
}

#pendingOffer {
  color: #e99141;
}

#declinedOffer {
  color: #ec5c5c;
}
</style>
