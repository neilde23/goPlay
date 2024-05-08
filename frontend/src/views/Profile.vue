<template>
    <div class="container">
        <ProfileComponent />
    </div>
</template>

<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import ProfileComponent from "@/components/ProfileComponent.vue";

    export default {
        name: 'Profile',
        components: {
            ProfileComponent
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        justify-content: center;
        /* align-items: center; */
        height: 100%;
    }
</style>