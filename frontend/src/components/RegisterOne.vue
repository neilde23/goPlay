<template>
    <div class="signin">
    <h1>Sign Up</h1>
        <CustomComponent />
        <form @submit.prevent="submitForm" class="form-style">
            <div>
                <label for="pseudo">Pseudo:</label>
                <input type="text" id="pseudo" v-model="player.pseudo" required>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="player.email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="player.password" required>
            </div>
            <button type="submit">Sign Up</button>
            <router-link to="/signin" class="nav-link"> Already have an account? </router-link>
        </form>
    </div>
</template>


<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';

    export default {
        data() {
            return {
                player:{
                    pseudo: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            async submitForm() {
                try {
                    // Effectuer la requête POST avec les données du formulaire
                    const response = await axios.post('http://localhost:3000/api/players/register', {
                        pseudo: this.player.pseudo,
                        email: this.player.email,
                        password: this.player.password
                    }); 

                    console.log(response.data); // Afficher la réponse du serveur

                    // notify the user that the account has been created
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Your account has been created successfully!',
                    });

                    // Redirect to the sign-in page
                    this.$router.push('/signin');
                } catch (error) {
                    console.error('Error creating player:', error);

                    // notify the user that the account creation failed
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'An error occurred while creating your account!',
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
    display: block;
    margin-top: 10px;
}

.nav-link:hover {
    color: #5C6BC0;
}

</style>