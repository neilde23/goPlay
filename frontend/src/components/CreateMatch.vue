<!-- TeamFormPopup.vue -->
<template>
    <div class="popup-overlay" v-if="show">
        <div class="popup-container">
            <h2>Create a new match</h2>
            <form @submit.prevent="handleSubmit">
                <label for="game">Game:</label>
                <input type="text" id="game" v-model="formData.game" required>

                <label for="team2">Choose a team as an opponent:</label>
                <select id="team2" v-model="formData.team2" required>
                    <option value="">Select a team</option>
                    <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
                </select>

                <label for="date">Date:</label>
                <input type="date" id="date" v-model="formData.date" required>

                <div class="popup-buttons">
                    <button type="button" @click="closePopup">Cancel</button>
                    <button type="submit" @click="handleSubmit">Create</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
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
                game: '',
                team2: '',
                date: ''
            },
            teams: []
        };
    },
    created() {
        // Fetch all teams when the component is mounted
        this.fetchTeams();
    },
    methods: {
        handleSubmit() {
            // Emit 'create' event with form data
            this.$emit('create', this.formData);
        },
        closePopup() {
            // Emit 'close' event to close the popup
            this.$emit('close');
        },
        async fetchTeams() {
            try {
                // Fetch all teams from the API
                const response = await axios.get('http://localhost:3000/api/teams')
                .then(response => {
                    console.log(response.data);
                    // retirer la team actuelle de la liste des teams
                    this.teams = response.data.filter(team => team.id !== this.$store.getters.getCurrentTeam);
                })
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        }
    }
}
</script>

<style scoped>
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

.popup-container select {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
</style>