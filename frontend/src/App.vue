<template>
  
  
  <router-view/>
    
</template>


<script setup>
  import { ref } from 'vue';


  import SignIn from './views/SignIn.vue'
  

  const targetElement = ref(null);
  const targetElement2 = ref(null);

  function scrollToTarget1() {
    targetElement.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function scrollToTarget2() {
    targetElement2.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

</script>


<style scoped>



  

</style>
