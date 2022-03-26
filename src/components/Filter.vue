<template>
    <ul class="nav-links"> 
        <l1>Hello</l1>
        <l1>Hello</l1>
        <l1>Hello</l1>
        <l1>Hello</l1>
    </ul>
</template>

<script>
    
    const navLinks = document.querySelectorAll('.nav-links li')
    navLinks.forEach((link,index) => {
                if(link.style.animation) {
                    link = '';
                } 
                link.style.animation = `navLinkFade 0.5s ease forwards ${index/7 + 0.5}s`
            })
    
    export default {
        name:'Filter',
    }


</script>

<style scoped>
   .nav-links {
    position:absolute;
    left:0px;
    top:0px;
    height:100vh;
    width: 20vw;
    background-color: black;
  } 

  li {
      color:white;
  }

  .first-enter-active {
    transition: 1s ease all;
  }

  .first-leave-active {
    transition: 1s ease all;
  }

  .first-enter-from {
    transform:translateX(-700px);
  }

  .first-leave-to {
    transform:translateX(-700px);
  }

  .second-enter-active {
    transition: 10000s ease all;
  }

  .second-leave-active {
    transition: 1.1s ease all;
  }

  .second-enter-from {
    transform:translateX(-700px);
  }

  .second-leave-to {
    transform:translateX(-700px);
  }


  .third-enter-active {
    transition: 1.2s ease all;
  }

  .third-leave-active {
    transition: 1.2s ease all;
  }

  .third-enter-from {
    transform:translateX(-700px);
  }

  .third-leave-to {
    transform:translateX(-700px);
  }

  .fourth-enter-active {
    transition: 1.3s ease all;
  }

  .fourth-leave-active {
    transition: 1.3s ease all;
  }

  .fourth-enter-from {
    transform:translateX(-700px);
  }

  .fourth-leave-to {
    transform:translateX(-700px);
  }










</style>