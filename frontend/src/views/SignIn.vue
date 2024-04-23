<template>
    
        <div>
            <Header />
            <RegisterOne />
            <Bottom />
        </div>

        <router-view/>
    
</template>

<script setup>
import Header from "@/components/Header.vue";
import RegisterOne from "@/components/RegisterOne.vue";
import Bottom from "@/components/Bottom.vue";

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