<template>
    <Header />
    <router-view/>
    <Bottom />
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
</style>
