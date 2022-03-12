<template>
    <div class="popup">
        <div class="content">
            <p>Are you sure you want to leave? <b>ALL</b> changes will not be saved</p>
            <div class="action">
                <button class="green" @click="$emit('return',this.leave)">Return to Edit Profile</button>
                <button class="red" @click="$emit('return',!this.leave)">Yes, I want to leave</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'PopUp',
    data() {
        return {
            leave:true,
        }
    }
}
</script>

<style scoped>
.popup {
    z-index:100;
    position:fixed;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    width:100%;
}

.content {
    border-radius: 20px;
    padding: 40px 20px;
    background-color: aquamarine;
}

p {
    text-align:center;
}

.red {
    background-color: #ec5757;
}
.green {
    background-color: #33d69f;
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
    img {
            margin-right: 4px;
          }
    }

</style>