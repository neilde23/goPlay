<template>
    <div class="container">
        <h1>Manager</h1>
        <p>Welcome to your dashboard</p>
        <div class="container">
            <div class="row">
                <div class="col">
                    <h2>My Teams</h2>
                    <p>Here you can see the teams you are part of</p>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Team 1</h5>
                            <p class="card-text">Team 1 description</p>
                            <a href="#" class="btn btn-primary">Go to team</a>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Team 2</h5>
                            <p class="card-text">Team 2 description</p>
                            <a href="#" class="btn btn-primary">Go to team</a>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <h2>My Matches</h2>
                    <p>Here you can see the matches you are part of</p>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Match 1</h5>
                            <p class="card-text">Match 1 description</p>
                            <a href="#" class="btn btn-primary">Go to match</a>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Match 2</h5>
                            <p class="card-text">Match 2 description</p>
                            <a href="#" class="btn btn-primary">Go to match</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import SearchBar from "@/components/SearchBar.vue"
    import Carousel from "@/components/Carousel.vue"

</script>

<style scoped>
    .container {
        margin-top: 20px;
        align-items: center;
        justify-content: center;
    }
    .card {
        margin-top: 20px;
    }

    .card-body {
        background-color: transparent;
    }

    .card-title {
        font-size: 1.5em;
    }

    .card-text {
        font-size: 1.2em;
    }

    .btn {
        font-size: 1.2em;
    }

    .row {
        margin-top: 20px;
    }
</style>