<template>
  <div>
    <div class="mainBody">
      <i class="fa-solid fa-circle-check" id="tickIcon"></i>
      <p>
        Apply for
        <span style="color: #0e8044"
          ><strong> {{ projectTitle }} </strong></span
        >?
      </p>
      <span>
        <div class="applybtns">
          <button type="button" id="yesbtn" @click="applicantbtnYes">
            Yes
          </button>
          <button type="button" id="nobtn" @click="applicantbtnNo">No</button>
        </div>
      </span>
    </div>
    <button
      id="acceptbtn"
      v-show="offered"
      @click="acceptBtn"
      class="btn-apply"
    >
      Accept
    </button>
    <button
      id="declinebtn"
      v-show="offered"
      @click="declineBtn"
      class="btn-apply"
    >
      Decline
    </button>

    <!--
    <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            This is the default tile!
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            This is the default body!
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            This is the default footer!
          </slot>
          <button
            type="button"
            class="btn-green"
            @click="close"
            aria-label="Close modal"
          >
            Close me!
          </button>
        </footer>
      </div>
    </div>
  </transition>
  --></div>
</template>

<script>
export default {
  name: "ApplyConfirm",
  props: ["projectTitle"],
  methods: {
    applicantbtnYes() {
      alert("accept");
      this.$emit("confirmYes", true);
    },
    applicantbtnNo() {
      alert("decline");
      this.$emit("confirmYes", false);
    },
  },
};
</script>

<style scoped>
.mainBody {
  position: fixed;
  /*
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  */
  text-align: center;
  width: 600px;
  height: 80px;
  max-width: 22em;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #fff;
  z-index: 999;
  transform: none;
}

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
  background-color: #f40000;
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
