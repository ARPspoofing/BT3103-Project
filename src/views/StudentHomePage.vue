<template>
  <!--<nav class="navbar navbar-expand-lg navbar-custom">
    <img src="../assets/Pathfinders.png" class="d-inline-block align-top" width=250 alt="logo">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control-inline mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Navigate
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <router-link class="nav-item nav-link active" :to="{name:'StudentHomePage'}" >Home</router-link>
        <router-link class="nav-item nav-link active" :to="{name:'About'}">About</router-link>
        <router-link class="nav-item nav-link active" :to="{name:'BusinessHomePage'}">Business Home</router-link>
      </div>
    </div>
  </nav>-->
  <NavBar :search=true :header=false />
  <div class="mainBody">
    <h1 id="interest">Projects you may like</h1>
    <hr/>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="card-text">
      <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <button href="#" class="btn-apply">Apply Now</button>
      </div>
      
      <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <button href="#" class="btn-apply">Apply Now</button>
      </div>

      <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <button href="#" class="btn-apply">Apply Now</button>
      </div>
    </div>
    <div class="card-text">
      <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <button href="#" class="btn-apply">Apply Now</button>
      </div>
      
      <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <button href="#" class="btn-apply">Apply Now</button>
      </div>

      <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <button href="#" class="btn-apply">Apply Now</button>
      </div>
    </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/Pathfinders.png" class="d-block w-100" alt="pic">
        </div>
        <div class="carousel-item">
          <img src="../assets/Pathfinders.png" class="d-block w-100" alt="pic">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <br><br><br>
  
    <h1 id="latest">Latest projects</h1>
    <hr/>
    <div class="card-text">
      <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <button href="#" class="btn-apply">Apply Now</button>
      </div>
      
      <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <button href="#" class="btn-apply">Apply Now</button>
      </div>

      <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <button href="#" class="btn-apply">Apply Now</button>
      </div>
    </div>

    <div class="card-text">
      <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <button href="#" class="btn-apply">Apply Now</button>
      </div>
      
      <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <button href="#" class="btn-apply">Apply Now</button>
      </div>

      <div class="card-body">
        <div class = "clogo">
          <img src="../assets/google-logo.png" alt="Logo" class = "logo">
          <span class="card-title">
            Project Title <br>
          </span>
        </div>
        <div class="card-content">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <button href="#" class="btn-apply">Apply Now</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
  name: 'StudentHomePage',
  components: {
    NavBar
  },
  data() {
    return {
      Heading: " ",
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
  }

  .btn {
    margin: 10px;
  }

  .mainBody {
    background-color: #F5F5F5;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow-y: scroll;
    padding-bottom: 550px;
  }

  #interest, #latest {
    text-align: left;
    font-size: 28px;
    margin: 30px 30px 0px 30px;
    color: #606060;
  }

  hr {
    border: 0;
    border-top: 2px solid #606060;
    width: 90%;
    margin: 5px 0px 16px 38px;
  }
  
  .card-text {
    width: 100%;
    margin: 15px;
  }

  .card-body {
    background-color: #F2F5F7;
    border-radius: 8px;
    width: 30%;
    float: left;
    padding: 20px;
    border: 2px solid #0E8044;
    margin: 10px;
    box-shadow: 1px 1px grey;
  }

  .card-title {
    display: inline-block;
  }

  .card-content {
    text-align: left;
    margin-bottom: 10px;
  }

  .clogo {
    text-align: left;
  }

  .btn-apply {
    background-color: #0E8044;
    color: white;
    border-radius: 8px;
    width: 40%
  }

  .logo {
    vertical-align: left;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
  }


</style>
