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
    },

    data() {

      return {
        userSearch: '',
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
          tag = tag.toLowerCase();
          if(searchObj.includes(tag) || tag.includes(searchObj)) {
            return true;
          }
        }

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
          console.log(projectTags)
          //if the below condition is met, we should push it to the highest priority
          if((searchObj.includes(testname) || testname.includes(searchObj)) && this.includes(projectTags, searchObj)) {
            matchingResultsByBoth.push(id)
          } else if (searchObj.includes(testname) || testname.includes(searchObj)) {
            matchingResultsByTitle.push(id)
          } else if (this.includes(projectTags,searchObj)) {
            matchingResultsByTag.push(id)
          }

          
          
        })
        if(this.$route.name == "StudentSearchResult") {
          this.$router.push({name:"StudentSearchResult2",params: {displayFirst:matchingResultsByBoth,
          displaySecond:matchingResultsByTitle, displayThird:matchingResultsByTag, searched:currSearch}})
          } else if (this.$route.name == "StudentSearchResult2") {
            this.$router.push({name:"StudentSearchResult",params: {displayFirst:matchingResultsByBoth,
            displaySecond:matchingResultsByTitle, displayThird:matchingResultsByTag, searched:currSearch}})
          } else {
            this.$router.push({name:"StudentSearchResult",params: {displayFirst:matchingResultsByBoth,
            displaySecond:matchingResultsByTitle, displayThird:matchingResultsByTag, searched:currSearch}})
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