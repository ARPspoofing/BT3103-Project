<template>
  <nav class="navbar navbar-expand-lg navbar-custom">
    <img src="../assets/Pathfinders.png" class="d-inline-block align-top" width=250 alt="logo">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <h2 id="title"><b>MY PROJECTS</b></h2>
    <ul class="navbar-nav ms-auto">
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Navigate
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <router-link class="nav-item nav-link active" :to="{name:'StudentHomePage'}" >Home</router-link>
            <div class="dropdown-divider"></div>
            <router-link class="nav-item nav-link active" :to="{name:'About'}">About</router-link>
            <div class="dropdown-divider"></div>
            <router-link class="nav-item nav-link active" :to="{name:'BusinessHomePage'}">Business Home</router-link>
        </div>
        </div>
    </ul>
  </nav>
  <div class="mainBody">
    <router-link class="floating-right-bottom-btn" :to="{name:'BusinessAddProject'}">
      <i class="fa-solid fa-circle-plus icon-4x" id="plusIcon"></i>
    </router-link>
    <h1 id="interest">
      <span>
        <router-link class="optionsOff" :to="{name:'BusinessHomePage'}" ><b>POSTED</b></router-link>
      </span>
      <span>
        <router-link class="optionsOff" :to="{name:'BusinessInProgress'}" ><b>IN PROGRESS</b></router-link>
      </span>
      <span class="options">
        <b>COMPLETED</b>
      </span>
    </h1>
    <hr>
    <div class="dropdown">
  <Multiselect
    v-model="value"
    mode="tags"
    placeholder="Select Interests"
    track-by="name"
    label="name"
    :close-on-select="true"
    :searchable="true"
    :options="[
      { value: 'ArtificialIntelligence', name: 'Artificial Intelligence'},
      { value: 'ScientificComputingApplications', name: 'Scientific Computing Applications' },
      { value: 'DataStructuresAlgorithms', name: 'Data Structures Algorithms' },
      { value: 'ComputerArchitecture', name: 'Computer Architecture' },
      { value: 'ComputerNetworks', name: 'Computer Networks' },
      { value: 'ComputerDatabase', name: 'Computer Database' },
      { value: 'DatabaseMining', name: 'Database Mining' },
      { value: 'DataAnalytics', name: 'Data Analytics' },
      { value: 'ComputerGraphicsVisualisation', name: 'Computer Graphics Visualisation' }, 
      { value: 'ImageSoundProcessing', name: 'Image Sound Processing' },
      { value: 'DistributedComputing', name: 'Distributed Computing' },
      { value: 'HumanComputerInteraction', name: 'Human Computer Interaction' },
      { value: 'SoftwareEngineering', name: 'Software Engineering' },
      { value: 'InformationCodingTheory', name: 'Information Coding Theory' }
    ]"
  >
      <template v-slot:tag="{ option, handleTagRemove, disabled }">
        <div class="multiselect-tag is-user">
          {{ option.name }}
          <span
            v-if="!disabled"
            class="multiselect-tag-remove"
            @select="handleTagRemove(option, $event)"
          >
            <span class="multiselect-tag-remove-icon"></span>
          </span>
        </div>
      </template>
  </Multiselect>
  </div>
</div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
export default {
name: 'BusinessCompleted',
components: {
  Multiselect
},
}
</script>


<style scoped>
.dropdown {
  width: 50%;
}
  .navbar-custom {
    background-color: #004A23;
  }

  #title {
      color: white;
      margin-left:30px;
      margin-right: 30px;
      margin-bottom: 0px;
  }

  .btn {
      margin: 10px;
  }

  .mainBody {
    background-color: #F5F5F5;
    width: 100%;
    height: 100%;
    position: fixed;
  }

  #interest {
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

  .options {
    font-size: 15px;
    padding: 10px 25px;
    margin-left: 15px;
    border-radius: 30px; /* or 50% */
    background-color: #0E8044;
    color: white;
    text-align: center;
  }

  .optionsOff {
    font-size: 15px;
    padding: 10px 25px;
    margin-left: 15px;
    border-radius: 30px; /* or 50% */
    background-color: F5F5F5;
    text-align: center;
    color: #606060;
    text-decoration: none;
  }

  .floating-right-bottom-btn {
    position : fixed;
    right : 40px;
    bottom : 50px;
    background-color: white;
    border-width: 0px;
    height: 70px;
    width: 70px;
    z-index: 110;
    border-radius: 50%;
    padding: 0px;
  }

  #plusIcon {
    height: 70px;
    width: 70px;
    color: #004A23;
  }

  .multiselect-tag.is-user {
    padding: 5px 8px;
    border-radius: 22px;
    background: #BBDFCC;
    margin: 3px 3px 8px;
    width: 350px;
  }
</style>