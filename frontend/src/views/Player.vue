<template>
    <article class="container position-relative">
        <div class="c1">
            <TimetablePlayer/>
        </div>
        <div class="c2">
            <TimetableMatchShort/>
        </div>
    </article>
</template>

<script setup>
    import TimetablePlayer from '@/components/TimetablePlayer.vue'
    import TimetableMatchShort from '@/components/TimetableMatchShort.vue'

</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap : 20px;
    }
    .c1 {
        width: 650px;
        top: 0px;
        right: 0px;
    }

    .c2 {
        left: 0px;
        padding-bottom: 20px;
    }

    article {
        margin : 20px 4000px 0px 100px;
        margin-right: 500px;
    }
</style>