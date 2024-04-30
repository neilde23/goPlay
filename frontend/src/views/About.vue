<template>
    <div>
        <AboutScript/>
        <Sponsors/>
    </div>
</template>

<script>
import AboutScript from "@/components/AboutScript.vue";
import Sponsors from "@/components/Sponsors.vue";
    export default {
        name: 'About',
        components: {
            AboutScript,
            Sponsors
        }
    }
    
</script>

<style scoped>
</style>