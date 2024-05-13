<template>
    <div class="zone primary-color">
        <News/>
        <div class="d-flex justify-content-center"><hr width="70%"></div>
        <TeamActivity/>
    </div>

</template>

<script setup>
    import News from '@/components/News.vue'
    import TeamActivity from '@/components/TeamActivity.vue'
</script>

<style scoped>
    .zone {
        padding: 20px 15px;
        border-radius: 10px;
        width: 205px;
        height: 100%;
    }

    hr {
        margin: 50px 0px;
    }

</style>

