<template>
    <div class="signup">
        <h1>Login</h1>
        <form @submit.prevent="submitForm" class="form-style">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="player.email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="player.password" required>
            </div>
            <button type="submit">Sign In</button>
            <router-link to="/signup" class="nav-link">Don't have an account? Sign Up</router-link>
        </form>
    </div>  
</template>

<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';

    export default {
        data() {
            return {
                player: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            async submitForm() {
                try {
                    // Effectuer la requête POST avec les données du formulaire
                    const response = await axios.post('http://localhost:3000/api/players/login', {
                        email: this.player.email,
                        password: this.player.password
                    });

                    console.log(response.data); // Afficher la réponse du serveur

                    // save the user credentials in the store
                    this.$store.dispatch('setUserCredentials', response.data);

                    // notify the user that he is logged in successfully
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'You are logged in successfully!',
                    });

                    // redirect to the player page
                    this.$router.push('/');

                } catch (error) {
                    console.error('Error logging in player:', error);

                    // notify the user that the login failed
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Your email or password is incorrect!',
                    });
                }
            }
        }
    }
</script>

<style scoped>
h1{
    padding : 20px;
    text-align : center;
}

.form-style {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: transparent;
}

.form-style label {
    display: block;
    margin-bottom: 10px;
    color : white;
}

.form-style input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.form-style button {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: white;
    background-color: #5C6BC0;
}

.form-style button:hover {
    background-color: #3949AB;
}

.nav-link {
    color: white;
    text-align: center;
    margin-top: 10px;
}

.nav-link:hover {
    text-decoration: underline;
    color: #5C6BC0;
}

</style>