<template>
    <div>
      <div class="test">
    
           
              <i class="fa-solid fa-circle-check" id="tickIcon"></i>
              <p>
                Apply for
                <span style="color: #0e8044"
                  ><strong> {{ projectTitle }} </strong></span
                >?
              </p>
  
            <span>
              <div class="applybtns">
                <button
                  type="button"
                  id="yesbtn"
                  @click="applicantbtn"
                >
                  Yes
                </button>
                <button type="button" id="nobtn">
                  No
                </button>
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
  -->
        </div>
</template>

<script>
    export default {
        name: "ApplyConfirm",
        props: ["projectTitle"],
    }
</script>

<style scoped>

.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
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