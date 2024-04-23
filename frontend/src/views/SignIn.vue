<template>
    
        <div>
            <RegisterOne />
        </div>
        <router-view/>
    
</template>

<script setup>

import RegisterOne from "@/components/RegisterOne.vue";

//import CustomComponent from "@/components/CustomComponent.vue";
</script>

<script>
export default {
    name: 'SignIn',
    
}

</script>

<style scoped>
/* Add your styles here */
</style>