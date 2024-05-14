<template>
    <Header />
    <router-view style="min-height:100vh;"/>
    <div class="scroll-to-top" @click="scrollToTop">
        <i class="fas fa-arrow-up"></i>
    </div>
    <Bottom class="bottom"/>
</template>

<script setup>
    import { ref } from 'vue';
    import Header from "@/components/Header.vue"
    import Bottom from "@/components/Bottom.vue"

    const targetElement = ref(null);
    const targetElement2 = ref(null);

    function scrollToTarget1() {
        targetElement.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function scrollToTarget2() {
        targetElement2.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
</script>

<style scoped>

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: white;
        background-size: cover;
        background-position: center;
        height: 100vh; /* Ensure the background covers the entire viewport */
    }

    body {
        margin: 0;
        padding: 0;
    }

    .bottom {
        bottom: 0;
        width: 100%;
        position:relative;
    }

    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #5C6BC0;
        color: white;
        border: none;
        border-radius: 50%;
        padding: 10px;
        cursor: pointer;
        z-index: 1;
    }

    .scroll-to-top i {
        font-size: 20px;
    }

    .scroll-to-top:hover {
        background-color: #3949AB;
    };
</style>
