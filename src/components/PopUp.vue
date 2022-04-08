<template>
  <div class="popup">
    <div class="content">
      <p>
        Are you sure you want to leave? <br />
        all changes will <b>NOT</b> be saved
      </p>
      <div class="action">
        <button class="green" @click="$emit('return', this.leave)">
          Return to Edit Profile
        </button>
        <button class="red" @click="$emit('return', !this.leave)">
          Yes, I want to leave
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  data() {
    return {
      leave: true,
    };
  },
};
</script>

<style scoped>
.popup {
  z-index: 1000000;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

.content {
  border-radius: 15px;
  padding: 40px 20px;
  border: 3px solid #ffc875;
  background-color: #ffe9c8;
  box-shadow: 15px 15px 40px rgba(0, 0, 0, 0.2);
}

p {
  text-align: center;
}

.red {
  background-color: #ec5757;
}
.green {
  background-color: #62c27b;
}

button,
.button {
  cursor: pointer;
  padding: 7px 12px;
  height: 35px;
  border-radius: 15px;
  border: none;
  font-size: 14px;
  margin-right: 8px;
  color: #fff;
  img {
    margin-right: 4px;
  }
}
</style>
