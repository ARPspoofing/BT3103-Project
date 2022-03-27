<template>
  <nav class="navbar navbar-expand-lg navbar-custom">
    <img src="../assets/Pathfinders.png" class="d-inline-block align-top" width=250 alt="logo">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <h2 v-show =header id="title"><b>{{Heading}}</b></h2>
    <div v-show=search class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <form v-show=search class="form-inline my-2 my-lg-0">
        <input v-show=search class="form-control-inline mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-on:keyup.enter = "searchProjects()" v-model = "userSearch">
        <button v-show=search v-on:click = "searchProjects()" class="btn btn-outline-success my-2 my-sm-0"  type="submit">Search</button>
      </form>
    </div>
    <ul class="navbar-nav ms-auto">
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Navigate
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <router-link class="nav-item nav-link active" :to="{name:'StudentHomePage'}" >Home</router-link>
            <div class="dropdown-divider"></div>
            <router-link class="nav-item nav-link active" :to="{name:'StudentAbout'}">About</router-link>
            <div class="dropdown-divider"></div>
            <router-link class="nav-item nav-link active" :to="{name:'StudentLogin'}"><span @click="logOut">Log Out</span></router-link>
            
        </div>
        </div>
    </ul>
  </nav>
</template>

<script>
import {signOut, getAuth} from "firebase/auth"
import {getDocs,collection, getFirestore} from "firebase/firestore"
import firebaseApp from '../firebase.js'
const db = getFirestore(firebaseApp);

export default {

    props:{
        Heading: String,
        search: Boolean,
        header: Boolean,
        //searchResult: String,
    },

    data() {
      return {
        userSearch: '',
        searchResult: '',
      }
    },
    methods:  {   
    async logOut() {
        const auth = getAuth()
        await signOut(auth) 
        this.$router.push({"name":"StudentLogin"})
      },

    //Method to check if a search matches any tag 
    includes(tags, searchObj) {
      if(tags.length == 0) {
        return false;
      } else {
        for(let tag of tags) {
          console.log("tagaggagagaggaga",tag)
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
      if (projectPrice >= parseInt(pricePropArray[0]) && projectPrice <= parseInt(pricePropArray[1])) {
        return true;
      } else {
        return false;
      }
    },

    //Method to check if project tags include prop tags (by using the first includes function)
    includesTags(tagPropArray,projectTagsArray) {
      true_arr = []
      tagPropArray.forEach((tag) => true_arr.push(this.includes(projectTagsArray,tag)))
      if (true in true_arr) {
        return true;
      } else {
        return false;
      }
    },

    async searchProjects() {

      var currSearch = this.userSearch
      console.log(currSearch)
      //Here, we are storing projects that match both
      var matchingResultsByBoth = []
      //array to store the matching results by title for the entered search
      var matchingResultsByTitle = []
      //array to store the matching results by tags for the entered search
      var matchingResultsByTag = []
      //array to store the matching results by company's name
      var matchingResultsByCompany = []
      //array to store the matching results by price range
      var matchingResultsByPrice = []
      //array to store the matching results by date range
      var matchingResultsByDate = []

      //testing if string is non pure whitespace
      if(/\S/.test(currSearch) && currSearch != '') {
        //strip leading and ending white spaces

        currSearch = currSearch.trim()
        //get all the current existing projects posted by businesses    
        const projects = await getDocs(collection(db, "Project"))
        
        projects.forEach(doc => {
          const id = doc.id;
          const name = doc.data().Project_Title;
          console.log(name)
          var testname = name.toLowerCase()
          var searchObj = currSearch.toLowerCase()
          const projectTags = doc.data().Tags
          const projectStart = doc.data().Project_Start
          const projectEnd = doc.data().Project_End
          const price = doc.data().Allowance
          //For now, fetch the name of the company by taking the email name until the @
          //e.g straw@gmail.com -> straw 
          const company_name = doc.data().poster_id.substr(0, doc.data().poster_id.indexOf('@'))
          console.log(projectTags)
          //if the below condition is met, we should push it to the highest priority
          if((searchObj.includes(testname) || testname.includes(searchObj)) && this.includes(projectTags, searchObj)) {
            matchingResultsByBoth.push(id)
          } else if (searchObj.includes(testname) || testname.includes(searchObj)) {
            matchingResultsByTitle.push(id)
          } else if (this.includes(projectTags,searchObj)) {
            matchingResultsByTag.push(id)
          } else if (this.includesDate(this.dateVal,[projectStart,projectEnd])) {
            matchingResultsByDate.push(id)
          } else if (this.includesPrice(this.priceVal,price)) {
            matchingResultsByPrice.push(id)
          } else if (this.includesTags(this.tagVal,projectTags)) {
            matchingResultsByTag.push(id)
          } else if (this.companyProp == company_name) {
            matchingResultsByCompany.push(id)
          }

          
          
        })
        if(this.$route.name == "StudentSearchResult") {
          this.$router.push({name:"StudentSearchResult2",params: {displayFirst:matchingResultsByBoth,
          displaySecond:matchingResultsByTitle, displayThird:matchingResultsByTag, displayFourth:matchingResultsByDate, 
          displayFifth:matchingResultsByPrice, displaySixth:matchingResultsByCompany, searched:currSearch}})
          } else if (this.$route.name == "StudentSearchResult2") {
            this.$router.push({name:"StudentSearchResult",params: {displayFirst:matchingResultsByBoth,
          displaySecond:matchingResultsByTitle, displayThird:matchingResultsByTag, displayFourth:matchingResultsByDate, 
          displayFifth:matchingResultsByPrice, displaySixth:matchingResultsByCompany, searched:currSearch}})
          } else {
            this.$router.push({name:"StudentSearchResult",params: {displayFirst:matchingResultsByBoth,
          displaySecond:matchingResultsByTitle, displayThird:matchingResultsByTag, displayFourth:matchingResultsByDate, 
          displayFifth:matchingResultsByPrice, displaySixth:matchingResultsByCompany, searched:currSearch}})
          }


      }

    }

    }
}
</script>

<style scoped>
  .navbar-custom {
    background-color: #004A23;
    
  }

  input[type="search"]::placeholder {  
    text-align: center; 
  } 

  input {
    border-radius: 5px;
    border-width: 0px;
    height: 35px;
    width: 350px;
    margin-left:30px;
  }

  .btn {
    margin: 10px;
  }

  #title {
      color: white;
      margin-left:30px;
      margin-right: 30px;
      margin-bottom: 0px;
  }

  .mainBody {
    background-color: #F5F5F5;
    width: 100%;
    height: 100%;
    position: fixed;
  }
</style>