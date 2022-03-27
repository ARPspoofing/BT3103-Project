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
        <div class="flex flex-row">
          <div style="margin-top: 5px;width: 100%;">
            <ul  style="display: grid;grid-template-columns:repeat(2,1fr);">
              <li v-for="(item,index) in interests" style="width: 20%;display: inline" >
                <div class="interest-flex">                            
                  <select class="inputTag" id="interest" v-model="item.value" >   
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Scientific Computing">Scientific Computing</option>
                    <option value="Data Structures">Data Structures</option>
                    <option value="Computer Architecture">Computer Architecture</option>
                    <option value="Computer Networks">Computer Networks</option>
                    <option value="Computer Database">Computer Database</option>
                    <option value="Database Mining">Database Mining</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Computer Graphics">Computer Graphics</option>
                    <option value="Image/Sound Processing">Image/Sound Processing</option>
                    <option value="Distributed Computing">Distributed Computing</option>
                    <option value="Human-Computer Interaction">Human-Computer Interaction</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Information Theory">Information Theory</option>                        
                  </select>
                </div>
                <p class="delete" @click="deleteInterest(item.id)">x</p>
              </li>
            </ul>     
          </div> 

          <div class="addBtn">
          <img @click="add" src="../assets/add.png" alt="add button">                                                                   
          </div>
      </div> 
    </div>
    
</template>

<script>
    import firebaseApp from '../firebase.js';
    import {getFirestore} from 'firebase/firestore';
    import {doc,setDoc,collection,getDocs,deleteDoc} from 'firebase/firestore';
    import {useRouter} from "vue-router"
    import {getAuth,signOut,onAuthStateChanged} from "firebase/auth"
    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';
    import "@vueform/slider/themes/default.css"
    import Slider from '@vueform/slider';
    import { v4 as uuidv4 } from 'uuid';
    import { ref } from 'vue';

    const db = getFirestore(firebaseApp)
    const router = useRouter()

    export default {
      name:'Filter',
      components: { Datepicker, Slider },
      created() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user) {
                this.userEmail = user.email
                const docRef = doc(db,"students",String(user.email))
            }
        })
      },
      data() {
        return {
          userEmail: '',
          date: null,
          rangeSelected: true,
          rangeErrorMsg: 'You have to select the start date and end date of the project',
          value: [0,100],
          format: function (value) {
            return `$${value}`
          },
          interests: [{'id':1,'value':'hello'},{'id':2,'value':'hello'},{'id':3,'value':'hello'}],
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
        },
        deleteInterest(id) {
             if (this.interests.length -1 > 0) {
                 this.interests = this.interests.filter(interest => interest.id != id)
             }
         },
         add() {
             const maxSize = 3
             if (this.interests.length + 1 <= 3) {
                this.interests.push({
                    id:uuidv4(),
                    value: "",
                })
             }
             
         },

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




    .form-wrap {
        top: 0;
        left: 0;
        z-index: 101;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        justify-content: center;
        align-items: center;      
        position: fixed; 
        overflow-y: scroll;
        top: 0; left: 0; right: 0; bottom: 0;
    }

    ::-webkit-scrollbar {
        display: none;
    }

    input,
    select {
        margin-bottom: 20px;
        margin-left:10px;
    }

    p {
        color: blue;
        cursor:pointer;
    }

    .profile-icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .interest-flex {
        width:200px;
        margin-left:10px;
    }

    input,
    select,
    textarea {
        width:100%;
        background-color: #33d69f;
        border: none;
        outline:none;
    }

    textarea {
        margin-bottom: 8px;
    }

    .labelTag,
    .inputTag {
        border-radius:20px;
    }

    .interest {
        gap:5px;
        div {
            flex: 1;
        }
    }

    .content {
      position:relative;
      padding:50px;
      width:80%;
      background-color: #BBDFCC;
      color:black;
      border-radius:5%;
      height:180%;
      margin-top:600px;
    }

    img {
        width:20px;
        height:20px;
    }

    .addBtn {
        margin-left:70%;
        margin-top:-50px;
    }
    
    select{
        padding-left:0.55rem;
    }

    .delete {
        margin-top:-42px;
        margin-right:-15px;
        color:red;
    }

    button,
    .button {
    cursor: pointer;
    padding: 16px 24px;
    border-radius: 30px;
    borer: none;
    font-size: 12px;
    margin-right: 8px;
    color: #fff;
    img {
            margin-right: 4px;
          }
    }

    .save {
        div {
            flex:1;
        }
    }

    .right {
        margin-left:80%;
    }

    .dark-purple {
    background-color: #252945;
    }
    .red {
    background-color: #ec5757;
    }
    .purple {
    background-color: #7c5dfa;
    }
    .green {
    background-color: #33d69f;
    }
    .orange {
    background-color: #ff8f00;
    }
    .flex {
    display: flex;
    }
    .flex-column {
    flex-direction: column;
    }
    .container {
    width: 100%;
    padding: 40px 10px;
    max-width: 850px;
    margin: 0 auto;
    @media (min-width: 900px) {
        padding-top: 72px;
    }
    }
    .nav-link {
    text-decoration: none;
    color: initial;
    }

    li {
        cursor: pointer;
    }

     .errorMsg {
        color: red;
        margin-top:5px;
    }

    .profile-pic {
        border-radius: 50%;
        margin-top:10px;
        width:10%;
        height:10%;
    }

    img {
        width:40px;
        height:40px;
    }

</style>