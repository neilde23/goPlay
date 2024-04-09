<template>
    <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel" data-bs-interval="2000">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" class="active" aria-current="true"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item">
                <img src="/rocketLeague.webp" class="img-fluid" alt="...">
            </div>
            <div class="carousel-item active">
                <img src="/cs2.webp" class="img-fluid" alt="...">
            </div>
            <div class="carousel-item">
                <img src="/lol.jpeg" class="img-fluid" alt="...">
            </div>
        </div>
    </div>

</template>

<script setup>

</script>


<style scoped>
    #myCarousel 
    {
        width: 230px;
        height: 330px;
    }

    .carousel-indicators {
        bottom: -50px;
    }

    .carousel-indicators button{
        background-color: white !important;
    }

</style>