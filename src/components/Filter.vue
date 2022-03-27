<template>
    <div class="nav-links"> 
        Duration
        <div :class="{shake:!rangeSelected,'input-error':!rangeSelected}">
          <Datepicker format="dd-MM-yyyy"  v-model="date" :state="rangeSelected" @update:modelValue="checkDate" range></Datepicker>
        </div>
        <p v-if="!rangeSelected">{{rangeErrorMsg}}</p>
        <div class="slider">
          <Slider v-model="value" :format="format" @change="checkPrice"/>
        </div>
    </div>
    
</template>

<script>
    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';
    import "@vueform/slider/themes/default.css"
    import Slider from '@vueform/slider'
    import { ref } from 'vue';
    export default {
      name:'Filter',
      components: { Datepicker, Slider },
      data() {
        return {
          date: null,
          rangeSelected: true,
          rangeErrorMsg: 'You have to select the start date and end date of the project',
          value: [0,100],
          format: function (value) {
            return `$${value}`
          }
        }
      },
      methods: {
        checkDate() {
          if (this.date[0] == null || this.date[1] == null) {
            this.rangeSelected = false
          } 
          else {
            this.rangeSelected = true
            console.log(this.date[0].toLocaleDateString('en-us',{year: "numeric", month: "short", day: "numeric"}))
            console.log(this.date[1].toLocaleDateString('en-us',{year: "numeric", month: "short", day: "numeric"}))
          }
        },
        checkPrice() {
          console.log(this.value)
        }

      }
    }
</script>

<style scoped>
   .nav-links {
    position:absolute;
    left:0px;
    top:0px;
    height:100vh;
    width: 35vw;
    background-color: black;
  } 

  .shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    }
    @keyframes shake {
    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
    }
    .input-error {
        order: 2px solid red;
    }

    .dp__theme_light {
      --dp-background-color: #ffffff;
      --dp-text-color: #212121;
      --dp-hover-color: #f3f3f3;
      --dp-hover-text-color: #212121;
      --dp-hover-icon-color: #959595;
      --dp-primary-color: #1976d2;
      --dp-primary-text-color: #f8f5f5;
      --dp-secondary-color: #ccc0c4;
      --dp-border-color: #ddd;
      --dp-menu-border-color: rgb(221, 221, 221);
      --dp-border-color-hover: #aaaeb7;
      --dp-disabled-color: #f6f6f6;
      --dp-scroll-bar-background: #f3f3f3;
      --dp-scroll-bar-color: #959595;
      --dp-success-color: #76d275;
      --dp-success-color-disabled: #a3d9b1;
      --dp-icon-color: #959595;
      --dp-danger-color: #ff6f60;
    }

    .slider {
      width: 88%;
      margin-left:18px;
    }

</style>