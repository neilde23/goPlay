<template>
    <div class="signin">
        <h1>Sign In</h1>
        <CustomComponent />
        <form @submit.prevent="submitForm">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit">Sign In</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
//import CustomComponent from "@/components/CustomComponent.vue";

let email = ref('');
let password = ref('');

const submitForm = () => {
    // Handle form submission here
    console.log(`Email: ${email.value}, Password: ${password.value}`);
}
</script>

<style scoped>
/* Add your styles here */
</style>