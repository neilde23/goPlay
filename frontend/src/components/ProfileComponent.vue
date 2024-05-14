<template>
    <div class="container" v-if="this.$store.state.userCredentials">
        <h1 class="title">Hello {{ this.$store.state.userCredentials.pseudo }}</h1>
        <h2>Welcome to your profile page!</h2>
        <!-- Display user account -->
        <div class="user-info">
            <h3>Username :</h3>
            <p> {{ this.$store.state.userCredentials.pseudo }}</p>
            <h3>Email : </h3>
            <p> {{ this.$store.state.userCredentials.email }}</p>
            <h3>Password :</h3>
            <p>
                <span v-if="showPassword">{{ this.$store.state.userCredentials.password }}</span>
                <span v-else>**********</span>
                <button @click="togglePasswordVisibility">{{ showPassword ? 'Hide' : 'Show' }} password</button>
                <button @click="changePassword">Change password</button>
            </p>
            <button @click="logout">Logout</button>
            <ChangePasswordPopup :show="showPopup" @close="showPopup = false" />
        </div>
    </div>
</template>

<script>
    import ChangePasswordPopup from './ChangePasswordPopup.vue';
    export default {
        name: 'ProfileComponent',
        components: {
            ChangePasswordPopup
        },
        data() {
            return {
                showPopup: false,
                showPassword: false
            }
        },
        methods: {
            changePassword() {
                this.showPopup = true;
            },
            logout() {
                // Remove the user credentials from the store
                this.$store.commit('removeUserCredentials');

                // Redirect to the home page
                this.$router.push('/');
            },
            togglePasswordVisibility() {
                this.showPassword = !this.showPassword;
            }
        }
    }
</script>

<style scoped>

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.title {
    margin-top: 20px;
    text-align: center;
    font-size: 2em;
}

h2 {
    text-align: center;
    margin-top: 10px;
    font-size: 1.5em;
}

h3 {
    margin-top: 10px;
    font-size: 1.2em;
}

.user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color : transparent;
    padding: 20px;
    margin-top: 20px;
}

.user-info p {
    margin: 0;
}

button {
    background-color: #5E17EB;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #381284;
}

</style>
