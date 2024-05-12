<template>
    <div class="container">
        <div class="row">
            <div class="col d-flex justify-content-center align-items-center">
            <Carousel/>
            </div>
            <div class="col d-flex align-items-center">
            <div>
                <h1>goPlay</h1>
                <p>Find your next match or create your own!</p>
                <p>Join the community and start playing today!</p>
                <p>Are you a manager? Access the manager area to create and manage your team!</p>
                <p>Are you a player? Access the player area to find and join a team!
                </p>
                <div class="d-flex gap-2 py-5">
                    <router-link to="/player"><button class="btn btn-primary d-inline-flex align-items-center" type="button">
                        Player Area
                        <svg class="bi ms-1" width="20" height="20"><use xlink:href="#arrow-right-short"></use></svg>
                    </button></router-link>
                    <router-link to="/manager"><button id="manager-button" class="btn btn-outline-secondary d-inline-flex align-items-center" type="button">
                        Manager Area
                        <svg class="bi ms-1" width="20" height="20"><use xlink:href="#arrow-right-short"></use></svg>
                    </button></router-link>
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
    </div>
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

    .row {
        height: 550px;
    }
    .article {
        height: 920px;
    }
</style>
