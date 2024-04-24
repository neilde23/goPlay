<template>
    <header id="header" class="d-flex justify-content-center py-3 sticky-top">
        <nav class="nav nav-masthead justify-content-center">
            <a class="nav-link fw-bold py-1 px-0" aria-current="page" href="#">Matches</a>
            <a class="nav-link fw-bold py-1 px-0" href="">Event</a>
            <a class="nav-link fw-bold py-1 px-0" href="">Players</a>
            <a class="nav-link fw-bold py-1 px-0" href="">Planning</a>
            <a class="nav-link fw-bold py-1 px-0" href="">News</a>
        </nav>
    </header>
    <article class="container position-relative">
        <div class="position-absolute c1">
            <TimetablePlayer/>
        </div>
        <div class="position-absolute c2">
            <TimetableMatchShort/>
        </div>
    </article>

</template>

<script setup>
    import TimetablePlayer from '@/components/TimetablePlayer.vue'
    import TimetableMatchShort from '@/components/TimetableMatchShort.vue'

</script>

<style scoped>

    * {
        font-size: small;
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

    .c1 {
        width: 650px;
        top: 0px;
        right: 0px;
    }

    .c2 {
        left: 0px;
    }

    article {
        margin : 20px 4000px 0px 100px;
        margin-right: 500px;
    }

</style>