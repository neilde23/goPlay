<template>
  <header id="header" class="d-flex justify-content-center py-3 sticky-top">
    <nav class="nav nav-masthead justify-content-center">
      <a class="nav-link fw-bold py-1 px-0" aria-current="page" href="#">Home</a>
      <a class="nav-link fw-bold py-1 px-0" href="" @click.prevent="scrollToTarget1" >Planning</a>
      <a class="nav-link fw-bold py-1 px-0" href="" @click.prevent="scrollToTarget2">About</a>
    </nav>
  </header>
  <div class="row">
    <div class="col d-flex justify-content-center align-items-center">
      <Carousel/>
    </div>
    <div class="col d-flex align-items-center">
      <div>
        <h1>goPlay</h1>
        <p>ishfiodshjfoidsofjodsijofdsjosjodsjojojoijqsdds hckdjqhkjcdshkjchsdkjhksjhcks<br>
            dsjhdkjshdjkshkdjshkjdhskjhdkjshdkjhskjdhskjh cs,csklcskjckscjks<br>
            dshkdhskjhdjshkdhsjkdhksjhdkjshjksdhsk
        </p>
        <div class="d-flex gap-2 py-5">
          <button class="btn btn-primary d-inline-flex align-items-center" type="button">
            Player Area
            <svg class="bi ms-1" width="20" height="20"><use xlink:href="#arrow-right-short"></use></svg>
          </button>
          <button id="manager-button" class="btn btn-outline-secondary d-inline-flex align-items-center" type="button">
            Manager Area
            <svg class="bi ms-1" width="20" height="20"><use xlink:href="#arrow-right-short"></use></svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="article">
    <div id="search-bar" class="container" ref="targetElement">
      <SearchBar/>
    </div>
    <div class="container">
      <TimetableMatch/>
    </div>
  </div>

  <footer id="footer" ref="targetElement2">
    <h3> About </h3>
  </footer>
   
</template>


<script setup>
  import { ref } from 'vue';
  import SearchBar from "@/components/SearchBar.vue"
  import Carousel from "@/components/Carousel.vue"
  import TimetableMatch from "@/components/TimetableMatch.vue"


  const targetElement = ref(null);
  const targetElement2 = ref(null);

  function scrollToTarget1() 
  {
      targetElement.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function scrollToTarget2() 
  {
      targetElement2.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

</script>


<style scoped>

  * {
    font-size: small;
  }

  #manager-button {
    background-color: #8B0000;
    color: white;
  }

  #manager-button:hover {
    background-color: #751500
  }

  #search-bar
  {
    padding-top: 70px;
  }

  #header {
    background-color: #161719;
    border-bottom: 0.5px solid gray;
    opacity: 0.6;
   
  }

  .nav-masthead .nav-link {
  color: rgba(255, 255, 255, .5);
  border-bottom: .25rem solid transparent;
  }

  .nav-masthead .nav-link:hover,
  .nav-masthead .nav-link:focus {
    border-bottom-color: rgba(255, 255, 255, .25);
  }

  .nav-masthead .nav-link + .nav-link {
    margin-left: 1rem;
  }

  .nav-masthead .active {
    color: #fff;
    border-bottom-color: #fff;
  }

  .row {
    height: 550px;
    background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 100%);
  }
  .article {
    height: 900px;
    background-color: white
  }

  #footer {
    height: 200px;
  }

  .container {
    margin-bottom: 50px;
  }

  #c1 {
    width: 720px;
  }

</style>
