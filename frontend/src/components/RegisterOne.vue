<template>
    <div class="signin">

        <h1>Register</h1>
        <CustomComponent />
        <form @submit.prevent="submitForm" class="form-style">
            <div>
                <label for="pseudo">Pseudo:</label>
                <input type="text" id="pseudo" v-model="pseudo" required>
            </div>
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


<script>
import axios from 'axios';

export default {
  data() {
    return {
      pseudo: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submitForm(e) {
      e.preventDefault();

      axios.post('http://localhost:3000/api/players', {
        pseudo: this.pseudo,
        email: this.email,
        password: this.password
      })
      .then(response => {
        console.log("New player created: ", response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
}
</script>

<style scoped>

h1{
    padding : 20px;
}

.form-style {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
}

.form-style label {
    display: block;
    margin-bottom: 10px;
    color : #333;
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
.signin {
    margin-top: 0px;
    text-align: center;
    background: linear-gradient(to bottom, #313131, #f8f8f8);
    height:550px
}
</style>



