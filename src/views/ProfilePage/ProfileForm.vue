<template>
    <div @click="check" ref="formWrap" class="form-wrap flex flex-column">
        <form @submit.prevent="submitForm" class="content">
            <div class="personal-details flex flex-column">
                <h4>Personal Details</h4>
                <div class="input flex flex-column">
                    <label for="name">Name</label> 
                    <input required type="text" id="name" v-model="name">
                </div>
                <div class="input flex flex-colum">
                    <label for="faculty">Faculty</label>
                    <input type="text" id="faculty" value="School of Computing" readonly>
                </div>
                <div class="input flex flex-colum">
                    <label for="course">Course</label>
                    <input type="text" id="course" v-model="course">
                </div>
                <div class="input flex flex-colum">
                    <label for="year">Year of Study</label>
                    <input type="text" id="year" v-model="year">
                </div>
                <div class="interest flex">
                    <div class="input flex flex-colum">
                        <label for="interest1">Interest1</label>
                        <input type="text" id="interest1" v-model="interest1" >
                    </div>
                    <div class="input flex flex-colum">
                        <label for="interest2">Interest2</label>
                        <input type="text" id="interest2" v-model="interest2" >
                    </div>
                    <div class="input flex flex-colum">
                        <label for="interest1">Interest3</label>
                        <input type="text" id="interest3" v-model="interest3" >
                    </div>
                </div>
            </div>
            <div class="contact-details flex">
                <h4>Contact Details</h4>
                <div class="input flex flex-colum">
                    <label for="school-email">School Email</label>
                    <input type="text" id="school-email" v-model="school-email">
                </div>
                <div class="input flex flex-colum">
                    <label for="personal-email">Personal Email</label>
                    <input type="text" id="personal-email" v-model="personal-email">
                </div>
                <div class="input flex flex-colum">
                    <label for="contact-no">Contact Number</label>
                    <input type="text" id="contact-no" v-model="contact-no">
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name:'',
            course:'',
            year:'',
            interest1;'',
            interest2:'',
            interest3:'',
            school-email:'',
            personal-email:'',
            contact-no:'',
        }
    }
} 
</script>

<style lang='sass'>
    .invoice-enter-active,
    .invoice-leave-active {
    transition: 0.8s ease all;
    }
    .invoice-enter-from,
    .invoice-leave-to {
    transform: translateX(-700px);
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
    // utility classes
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