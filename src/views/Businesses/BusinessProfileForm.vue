<template>
    
    <PopUp @return="close" v-if="popUp" />
    <div @click="check" ref="formWrap" class="form-wrap flex flex-column">
        <form @submit.prevent="submitForm" class="content">
            <!--Personal Details-->
            <div class="personal-details flex flex-column">
                <h4>Personal Details</h4>
                <div class="input flex flex-column">
                    
                    <input required type="text" id="name" v-model="name">
                </div>

                <h4>Industry</h4>   
                <div class="input flex flex-column">
                    
                    <input required type="text" id="industry" v-model="industry">
                </div>

                <h4>Description</h4> 
                <div>
                  
                    <textarea required name="" id="desc" cols="30" rows="10" v-model="description"></textarea>
                </div>


            </div>     
                 
            
            <div>
                <img class="addBtn" @click="add" src="../../assets/add.png" alt="add button">
            </div>
            <!--Save Exit-->
            <div class="save flex">
                <div class="left">
                  <button type="button" @click="showPopUp" class="red">Cancel</button>
                </div>
                <div class="right flex">
                  <button type="submit" @click="save" class="green">Save</button>                  
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import PopUp from '../../components/PopUp.vue'
import {useRouter} from "vue-router"
const router = useRouter()
export default {
    //Fetch data from Firebase afterwards
    name: 'BusinessProfileForm',
    
    data() {
        return {
            name:'',
            industry:'',
            description:'',
            popUp:false,
            
        }
    },
    //Change to remove from firebase later
    methods: {
         
         try() {
             console.log("testc")
         },
         
         showPopUp() {
             this.popUp = true
         },
         close(leave) {
             if (!leave) {
                 //TBC
                 //Need to add functionality to log out the user first
                 this.$router.push({name:'BusinessLogin'})
                 this.popUp = false
             } else {
                 this.popUp = false
             }
         },
         toggleMenu() {
             this.menu = !this.menu
         },

         //save method would go to the landing page of the business

         
    },
    components: {
        PopUp,
    }
} 
</script>

<style scoped>
    
    .form-wrap {
      position:fixed;
      top:0;
      left:5%;
      background-color: transparent;
      width:100%;
      height:100vh;
      overflow:scroll;
    }

    input,
    select {
        margin-bottom: 20px;
        margin-left:10px;
    }

    .interest-flex {
        width:200px;
        margin-left:10px;
    }

    input,
    select {
        width:100%;
        background-color: #33d69f;
        border: none;
    }

    .labelTag,
    .inputTag {
        border-radius:20px;
    }

    .interest {
        gap:10px;
        div {
            flex: 1;
        }
    }

    .content {
      position:relative;
      padding:50px;
      width:80%;
      background-color: green;
      color:aliceblue;
    }

    img {
        position: absolute;
        width:20px;
        height:20px;
        left:10px;
        right:0px;
        
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

  
</style>