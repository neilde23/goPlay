<template>
    <div class="popup-overlay" v-if="show">
        <div class="popup-container">
            <h2>Add a new player</h2>
            <form @submit.prevent="handleSubmit">
                <label for="playerPseudo">Pseudo:</label>
                <input type="text" id="playerPseudo" v-model="formData.pseudo" required>

                <label for="playerEmail">Email:</label>
                <input type="email" id="playerEmail" v-model="formData.email" required>
                
                <div class="popup-buttons">
                    <button type="button" @click="closePopup">Cancel</button>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                formData: {
                    pseudo: '',
                    email: '',
                },
            };
        },
        methods: {
            closePopup() {
                this.show = false;
            },
            handleSubmit() {
                // Send a POST request to the API to add a player to the team
                this.$emit('create', this.formData);
            },
        },
    };
</script>

<style>
.popup-overlay {
    position: fixed;
    top: 5%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-container {
    align-items: center ;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: rgb(56, 53, 53);
}

.popup-container h2 {
    padding: 20px;
    text-align: center;
    color: white;
}

.popup-container label {
    display: block;
    margin-bottom: 10px;
    color: white;
}

.popup-container input,
.popup-container textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.popup-container .popup-buttons {
    display: flex;
    justify-content: space-between;
}

.popup-container button {
    width: 25%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: white;
    background-color: #5C6BC0;
}

.popup-container button:hover {
    background-color: #3949AB;
}
</style>