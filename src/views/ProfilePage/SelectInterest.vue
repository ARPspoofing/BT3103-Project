<template>
    <div @click="check" ref="formWrap" class="form-wrap flex flex-column">
        <form @submit.prevent="submitForm" class="content">
            <!--Personal Details-->
            <div class="personal-details flex flex-column">
                <h4>Personal Details</h4>
                <div class="input flex flex-column">
                    <label for="name">Name</label> 
                    <input required type="text" id="name" v-model="name">
                </div>
                <div class="input flex flex-colum">
                    <label for="faculty">Faculty</label>
                    <input disabled type="text" id="faculty" value="School of Computing" readonly>
                </div>
                <div class="input flex flex-colum">
                    <label for="course">Course</label>
                    <select required type="text" id="course" v-model="course" ></select>                      
                      <option value="Business Analytics">Business Analytics</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Security">Information Security</option>
                      <option value="Information Systems">Information Systems</option>
                </div>
                <div class="input flex flex-colum">
                    <label for="year">Year of Study</label>
                    <input required type="text" id="year" v-model="year">
                </div>
                <div class="interest flex">
                    <div class="input flex flex-colum">
                        <label for="interest1">Interest1</label>
                        <input reuired type="text" id="interest1" v-model="interest1" >
                    </div>
                    <div class="input flex flex-colum">
                        <label for="interest2">Interest2</label>
                        <input required type="text" id="interest2" v-model="interest2" >
                    </div>
                    <div class="input flex flex-colum">
                        <label for="interest1">Interest3</label>
                        <input required type="text" id="interest3" v-model="interest3" >
                    </div>
                </div>
            </div>
            <!--Contact Details-->
            <div class="contact-details flex">
                <h4>Contact Details</h4>
                <div class="input flex flex-colum">
                    <label for="schoolEmail">School Email</label>
                    <input required type="text" id="schoolEmail" v-model="schoolEmail">
                </div>
                <div class="input flex flex-colum">
                    <label for="personalEmail">Personal Email</label>
                    <input required type="text" id="personalEmail" v-model="personalEmail">
                </div>
                <div class="input flex flex-colum">
                    <label for="contactNo">Contact Number</label>
                    <input required type="text" id="contactNo" v-model="contactNo">
                </div>
            </div>
            <!--Work Details-->
            <div class="work flex flex-column">
              <div class="input flex flex-column">
                    <label for="resume">Resume</label>
                    <input required type="file" multiple name="files[]" id="resume" accept=".jpeg,.pdf,.docx" v-on:change="changeResume">
                </div>
              <div class="input flex flex-column">
                  <label for="transcript">Personal Email</label>
                  <input required type="file" multiple name="files[]" id="transcript" accept=".jpeg,.pdf,.docx" v-on:change="changeTranscript">
              </div>
              <div @click="addNewFile" class="flex button">
                <img src="blah" alt="add button">
                Add New File
              </div>
            </div>
            <!--Save Exit-->
            <div class="save flex">
                <div class="left">
                  <button @click="closeInvoice" class="red">Cancel</button>
                </div>
                <div class="right flex">
                  <button @click="saveDraft" class="dark-purple">Save Profile</button>
                  <button @click="publishProfile" class="purple">Publish Profile</button>
                  
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    //Fetch data from Firebase afterwards
    data() {
        return {
            name:'',
            course:'',
            year:'',
            interest1:'',
            interest2:'',
            interest3:'',
            schoolEmail:'',
            personalEmail:'',
            contactNo:'',
        }
    }
} 
</script>

<style scoped>
    
    .form-wrap {
      position:fixed;
      top:0;
      left:0;
      background-color: transparent;
      width:100%;
      height:100vh;
      overflow:scroll;
    }

    .content {
      position:relative;
      padding:50px;
      width:100%;
      background-color: green;
      color:aliceblue;
    }



    button,
    .button {
    cursor: pointer;
    padding: 16px 24px;
    border-radius: 30px;
    border: none;
    font-size: 12px;
    margin-right: 8px;
    color: #fff;
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

</style>
