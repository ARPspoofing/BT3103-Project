<template>
  <img
    class="loading"
    src="https://cutewallpaper.org/21/loading-gif-transparent-background/CBP-Portal.gif"
  />
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style scoped>
.loading {
  z-index: 999;
  height: 30%;
  width: 30%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 30vw;
  top: 40vh;
}
</style>
