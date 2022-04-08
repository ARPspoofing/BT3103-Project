<template>
  <div class="loader">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: "PathfinderLoading",
};
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-content: center;
}

.loader > span {
  display: inline-block;
  background-color: #004a23;
  width: 0px;
  height: 0px;
  border-radius: 50%;
  margin: 0 8px;
  transform: translate3d(0, 0, 0);
  animation: bounce 0.4s infinite alternate;
}

@keyframes bounce {
  to {
    width: 22px;
    height: 22px;
    transform: translate3d(0, -22px, 0);
  }
}

.loader > span:nth-child(2) {
  background-color: rgb(141, 222, 141);
  animation-delay: 0.1s;
}

.loader > span:nth-child(3) {
  background-color: #004a23;
  animation-delay: 0.2s;
}
</style>
