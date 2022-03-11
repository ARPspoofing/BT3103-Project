<template>
  <nav class="navbar navbar-expand-lg navbar-custom">
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
        <router-link class="nav-item nav-link active" :to="{name:'StudentHomePage'}" ><b>Home</b></router-link>
        <div class="dropdown-divider"></div>
        <router-link class="nav-item nav-link active" :to="{name:'About'}"><b>About</b></router-link>
        <div class="dropdown-divider"></div>
        <router-link class="nav-item nav-link active" :to="{name:'BusinessHomePage'}"><b>Business Home</b></router-link>
      </div>
    </div>
  </nav>
  <div class="mainBody">
    <h1 id="interest">Projects You May Like</h1>
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

    <br><br><br>
  
    <h1 id="latest">Latest projects</h1>
    <hr/>


  </div>
</template>

<script>
export default {
  name: 'StudentHomePage',
  components: {
  },
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
    margin-left:30px;
    border-radius: 10px;
    border-width: 0px;
    height: 35px;
    width: 500px;
  }

  .btn {
    margin: 10px;
    border-radius: 10px;
  }

  .mainBody {
    background-color: #F5F5F5;
    width: 100%;
    height: 100%;
    position: fixed;
  }

  #interest, #latest {
    text-align: left;
    font-size: 28px;
    margin: 30px 30px 0px 30px;
    color: #606060;
    font-weight: bold;
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

  .dropdown-menu nav-item nav-link {
    background-color: #D8D1D1;
  }
</style>
