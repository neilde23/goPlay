<template>
    <div class="container">
        <h1>Sponsors</h1>
        <p>goPlay is proud to be sponsored by the following companies:</p>
        <ul>
            <li>Company A</li>
            <li>Company B</li>
            <li>Company C</li>
            <li>Company D</li>
        </ul>
    </div>


</template>

<script>

    export default {
        name: 'Sponsors'
    }

</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap : 20px;
        padding-top : 20px;
        padding-bottom: 20px;
    }
</style>