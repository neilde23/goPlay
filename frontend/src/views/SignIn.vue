<template>
    
        <div>
            <Header />
            <RegisterOne />
            <bottom />
        </div>
        <router-view/>
    
</template>

<script>

import RegisterOne from "@/components/RegisterOne.vue";
import Header from "@/components/Header.vue";
import bottom from "@/components/Bottom.vue";

//import CustomComponent from "@/components/CustomComponent.vue";

export default {
    name: 'SignIn',
    components: {
        RegisterOne,
        Header,
        bottom
    }
    
}

</script>

<style scoped>
/* Add your styles here */
</style>