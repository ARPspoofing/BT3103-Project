<template>
    <div class="nav-links"> 
      <!--Duration-->
        <h4>Duration</h4>
        <div :class="{shake:!rangeSelected,'input-error':!rangeSelected,'datepick':true}">
          <Datepicker format="dd-MM-yyyy" v-model="date" :state="rangeSelected" @update:modelValue="checkDate" range></Datepicker>
        </div>
        <p v-if="!rangeSelected">{{rangeErrorMsg}}</p>
        <hr class="divider">
        <!--Interests-->
        <h4>Interests</h4>
        <div class="flex flex-row">
          <div style="margin-top: 5px;width: 100%; height: 83px;">
            <ul  style="display: grid;grid-template-columns:repeat(2,50%);">
              <li v-for="(item,index) in interests" style="width:20%; display: inline" >
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
        </div>
        <div class="addBtn">
        <img @click="add" src="../assets/add.png" alt="add button">                                                                   
        </div>
        <hr class="divider">
        <!--Duration-->
        <!-- <h4>Duration</h4>
        <div :class="{shake:!rangeSelected,'input-error':!rangeSelected,'datepick':true}">
          <Datepicker format="dd-MM-yyyy" v-model="date" :state="rangeSelected" @update:modelValue="checkDate" range></Datepicker>
        </div>
        <p v-if="!rangeSelected">{{rangeErrorMsg}}</p>
        <hr class="divider"> -->
        <!--Slider-->
      <h4>Allowance</h4>
      <div class="slider">
        <Slider v-model="value" :format="format" @change="checkPrice"/>
      </div>
      
      <button class="orange" @click="submitFilter">Enter</button>
    </div>
    
</template>

<script>
    import firebaseApp from '../firebase.js';
    import {getFirestore} from 'firebase/firestore';
    import {doc,setDoc,collection,getDocs,deleteDoc,getDoc} from 'firebase/firestore';
    import {useRouter} from "vue-router"
    import {getAuth,signOut,onAuthStateChanged} from "firebase/auth"
    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';
    import "@vueform/slider/themes/default.css"
    import Slider from '@vueform/slider';
    import {mapState} from "vuex"
    import {mapMutations} from "vuex"
    import {mapGetters} from "vuex"
    import { v4 as uuidv4 } from 'uuid';
    import { ref } from 'vue';

    const db = getFirestore(firebaseApp)
    const router = useRouter()

    export default {
      name:'Filter',
      components: { Datepicker, Slider },
      created() {
        this.searchId = this.searchData
        const userEmail = window.localStorage.getItem('emailForSignIn')
        console.log("testtesttesttest",userEmail)
        var that = this
        var temp = []
        async function fetchInterests() {
          const docRef = doc(db,"students",String(userEmail))
          const docs = await getDoc(docRef)
          for (var i=0;i<docs.data()['interests'].length;i++) {
            temp.push((docs.data()['interests'][i]))  
          }
          that.interests = temp
        }
        fetchInterests();
    
        },
        computed: {
          ...mapState(['filterModal','searchData','highestPriorityIds','secondPriorityIds','thirdPriorityIds']),
          ...mapGetters(['GET_SEARCH_DATA']),
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
          interests: [],
          searchId: [],
        }
      },
      methods: {
        ...mapMutations(['SET_SEARCH_DATA','SET_HIGHEST_PRIORITYIDS','SET_SECOND_PRIORITYIDS','SET_THIRD_PRIORITYIDS','CLEAR_ALL']),
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
             if (this.interests.length> 0) {
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
         includes(tags, searchObj) {
          if(tags.length == 0) {
            return false;
          } else {
            for(let tag of tags) {
              tag = tag.toLowerCase();
              if(searchObj.includes(tag) || tag.includes(searchObj)) {
                return true;
              }
            }
            return false;
          }

        },
        //Method to check if the project date falls in the date array prop
          includesDate(datePropArray, projectDateArray) {
            if([Date.parse(String(datePropArray[0])) >= projectDateArray[0]] && [Date.parse(String(datePropArray[1])) <= projectDateArray[1]]) {
              return true;
            } else {
              return false;
            }
          },
          //Method to check if the project price falls in the price array prop
          includesPrice(pricePropArray,projectPrice) {
            if (projectPrice == '' || (parseInt(projectPrice) >= parseInt(pricePropArray[0]) && parseInt(projectPrice) <= parseInt(pricePropArray[1]))) {
              return true;
            } else {
              return false;
            }
          },

          //Method to check if project tags include prop tags (by using the first includes function)
          includesTags(tagPropArray,projectTagsArray) {
            var true_arr = []
            tagPropArray.forEach((tag) => {        
              if (projectTagsArray.indexOf(tag['value']) !== -1) {
                //alert('yes!')
                true_arr.push(true)
              }
            })
            /*
            var result = true in true_arr
            alert(result)
            */
            return true_arr.includes(true)
          },

         async submitFilter() {
          this.$emit('submitFilter',true)
          console.log("hhhhhhhhhhh",this.interests)
          //this.$router.push({name:'StudentNavBar',params:{dateVal:this.date,priceVal:this.value,tagVal:this.interests}})
          var matchingResultsByTag = []
          //array to store the matching results by price range
          var matchingResultsByPrice = []
          //array to store the matching results by date range
          var matchingResultsByDate = []
          //All match 
          var allMatch = []
          var noneMatch = []
          const projects = await getDocs(collection(db, "Project"))
        
        projects.forEach(doc => {
          const id = doc.id;
          const name = doc.data().Project_Title;
          var testname = name.toLowerCase()
          const projectTags = doc.data().Tags
          const projectStart = doc.data().Project_Start
          const projectEnd = doc.data().Project_End
          const price = doc.data().Allowance
          //For now, fetch the name of the company by taking the email name until the @
          //e.g straw@gmail.com -> straw 
          const company_name = doc.data().poster_id.substr(0, doc.data().poster_id.indexOf('@'))
          //if the below condition is met, we should push it to the highest priority
          console.log("filterprice",this.value,"projectprice",price)
          if (this.date == null || this.includesDate(this.date,[projectStart,projectEnd])) {
            if (this.includesPrice(this.value,price)) {
              if (this.includesTags(this.interests,projectTags)) {
                allMatch.push(id)
                allMatch = allMatch.filter((x, i, a) => a.indexOf(x) === i)
              }
            }
          }
          /* To uncomment 
          if (this.date == null || this.includesDate(this.date,[projectStart,projectEnd])) {
            
            matchingResultsByDate.push(id)
          } 
          if (this.includesPrice(this.value,price)) {
     
            matchingResultsByPrice.push(id)
          } 
          if (this.includesTags(this.interests,projectTags)) {
      
            matchingResultsByTag.push(id)
          }
    
          if (this.searchId.includes(id) != -1 && this.includesDate(this.date,[projectStart,projectEnd]) && this.includesPrice(this.value,price) && this.includesTags(this.interests,projectTags)) {
            allMatch.push(id)
          }
          */


          this.CLEAR_ALL()
          this.SET_HIGHEST_PRIORITYIDS(allMatch)
          
          //Add company search to search bar 
          /*else if (this.companyProp == company_name) {
            matchingResultsByCompany.push(id)
          }*/ 
        })
        /*
        if(this.$route.name == "StudentSearchResult") {
          this.$router.push({name:"StudentSearchResult2",params: {displayFirst:matchingResultsByDate, 
          displaySecond:matchingResultsByPrice, displayThird:matchingResultsByTags}})
          } else if (this.$route.name == "StudentSearchResult2") {
            this.$router.push({name:"StudentSearchResult",params: {displayFirst:matchingResultsByDate, 
          displaySecond:matchingResultsByPrice, displayThird:matchingResultsByTags}})
          } else {
            this.$router.push({name:"StudentSearchResult",params: {displayFirst:matchingResultsByDate, 
          displaySecond:matchingResultsByPrice, displayThird:matchingResultsByTags}})
          }
          */
         
         if(this.$route.name == "StudentSearchResult") {
          this.$router.push({name:"StudentSearchResult2",params: {displayFirst:allMatch, 
          displaySecond:noneMatch, displayThird:noneMatch}})
          } else if (this.$route.name == "StudentSearchResult2") {
            this.$router.push({name:"StudentSearchResult",params: {displayFirst:allMatch, 
          displaySecond:noneMatch, displayThird:noneMatch}})
          } else {
            this.$router.push({name:"StudentSearchResult",params: {displayFirst:allMatch, 
          displaySecond:noneMatch, displayThird:noneMatch}})
          }

         }
      }
    }
</script>

<style scoped>

  .divider {
    width: 85%;
    border-top: 1.5px solid #606060;
    margin-left: auto;
    margin-right: auto;
  }

  h4 {
    color:black;
    margin-top:15px; 
    font-size: 20px;
  }

   .nav-links {
    position:absolute;
    margin-top: 20px;
    left:0px;
    top:0px;
    height:85vh;
    width: 37vw;
    background-color: #FFE9C8;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 5%;
    border-bottom-right-radius:5%;
    box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.15);
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
      --dp-success-color: #959595;
      --dp-success-color-disabled: #a3d9b1;
      --dp-icon-color: #959595;
      --dp-danger-color: #ff6f60;
    }

    .slider {
      width: 60%;
      margin: 0 auto 0 auto;
      margin-top:40px;
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
        color: red;
        cursor:pointer;
    }

    .profile-icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .interest-flex {
        width:140px;

    }

    input,
    select,
    textarea {
        width:100%;
        background-color: #ffab2c;
        border: none;
        outline:none;
    }

    textarea {
        margin-bottom: 8px;
    }

    .labelTag,
    .inputTag {
        border-radius:20px;
        font-size:13px;
        width: 180px;
        height: 25px;
        padding-left: 18px;;
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
        
        margin: 0 auto 0 auto;
    }
    
    select{
        padding-left:0.55rem;
    }

    .delete {
        margin-top:-45px;
        color:red;
        font-weight: bold;
    }

    button,
    .button {
    cursor: pointer;
    position: sticky;
    padding: 8px 44px;
    border-radius: 8px;
    border: none;
    font-size: 16px;
    margin-right: 40px;
    color:white;
    margin-top:30px;
    background-color: #FFAB2C;
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
    background-color: #FFAB2C;
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

    .datepick {
      
      width: 80%;
      margin: 0 auto 0 auto;
    }

    .datetime-picker input[data-v-a46a390c] {
      width: 150px;
      height: 38px;
    }

</style>