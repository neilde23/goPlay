<template>
    <div class="container">
        <div class="title">
            <h1>Manager</h1>
            <p>Welcome to your dashboard</p>
        </div>
        <div class="top-container">
            <div class="plus btn-primary" @click="showTeamForm">
                <div class="box-plus">
                    <p>Add team</p>
                    <i class="fas fa-plus"></i>
                </div>
            </div>
            <SearchBar msg="Enter a team or a player name" class="search-bar" @search="filterTeams"/>
        </div>
        <div class="display-team">
            <h2>My teams</h2>
            <div class="team-box" v-for="(team, index) in displayedTeams" :key="team.id">
                <h2>{{ team.name }}</h2>
                <h3>Description :</h3>
                <p>{{ team.description }}</p>
                <router-link to="/team" class="linked-btn">Manage team</router-link>
            </div>
            <div v-if="!showLess && teams.length > displayedTeams.length">
                <button @click="showMoreTeams" class="load-more-btn">Show More</button>
            </div>
            <div v-else-if="showLess && displayedTeams.length > 6">
                <button @click="showLessTeams" class="load-more-btn">Show Less</button>
            </div>
        </div>
        <div class="display-matches">
            <h2>My matches</h2>
            <div class="match-box">
                <h2>Match 1</h2>
                <h3>Opponent: Team 1</h3>
                <p>Date: 01/01/2022</p>
                <router-link to="/match" class="linked-btn">Manage match</router-link>
            </div>
            <div class="match-box">
                <h2>Match 2</h2>
                <h3>Opponent: Team 2</h3>
                <p>Date: 02/01/2022</p>
                <router-link to="/match" class="linked-btn">Manage match</router-link>
            </div>
        </div>
        <TeamFormPopup :show="showPopup" @create="createTeam" @close="closePopup" />
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import SearchBar from "./SearchBar.vue";
import TeamFormPopup from "./TeamFormPopup.vue"; 

export default {
    name: 'ManagerDashboard',
    components: {
        SearchBar,
        TeamFormPopup
    },
    data() {
        return {
            teams: [], // Initialisation du tableau d'équipes
            showPopup: false, // Initialisation de la variable pour afficher ou masquer le popup
            displayedTeams: [], // Tableau pour stocker les équipes affichées
            showLess: false // Variable pour contrôler l'affichage du bouton "Show Less"
        };
    },
    mounted() {
        this.fetchTeams(); // Appel de la méthode de récupération des équipes lorsque le composant est monté
    },
    methods: {
        async fetchTeams() {
            // Recuperation des credentials de l'utilisateur from store
            const userCredentials = this.$store.getters.getUserCredentials;
            console.log('User credentials.id:', userCredentials.id);

            // Récupération des équipes depuis l'API
            const response = await axios.get('http://localhost:3000/api/teams/manager/' + userCredentials.id)
                .then(response => {
                    this.teams = response.data;
                    console.log('Teams:', this.teams);
                    this.displayedTeams = this.teams.slice(0, 6); // Afficher uniquement les six premières équipes
                })
                .catch(error => {
                    console.error('Error fetching teams: ', error);
                });
        },
        showTeamForm() {
            this.showPopup = true; // Show popup when "Add team" button clicked
        },
        closePopup() {
            this.showPopup = false; // Close popup when cancel button clicked
        },
        createTeam(teamData) {
            // Logic to send teamData to backend for creating new team
            console.log('Creating team with data:', teamData);

            const userCredentials = this.$store.getters.getUserCredentials;
            console.log('User credentials.id:', userCredentials.id);

            axios.post('http://localhost:3000/api/teams', {
                name: teamData.name,
                description: teamData.description,
                idManager: userCredentials.id
            })
                .then(response => {
                    console.log('Team created:', response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Team created successfully!',
                    });
                })
                .catch(error => {
                    console.error('Error creating team:', error);
                });
            // After creating team, fetch teams data again to update the list
            this.fetchTeams();
            this.showPopup = false; // Close popup after creating team
        },
        showMoreTeams() {
            // Afficher six équipes supplémentaires lorsque le bouton "Show More" est cliqué
            const startIndex = this.displayedTeams.length;
            const endIndex = startIndex + 6;
            this.displayedTeams = this.teams.slice(0, endIndex);
            this.showLess = true; // Activer le bouton "Show Less"
        },
        showLessTeams() {
            // Afficher seulement les six premières équipes lorsque le bouton "Show Less" est cliqué
            this.displayedTeams = this.teams.slice(0, 6);
            this.showLess = false; // Désactiver le bouton "Show Less"
        },
        filterTeams(searchText) {
            console.log("Search text:", searchText);
            const filteredTeams = this.teams.filter(team => {
                return team.name.toLowerCase().includes(searchText.toLowerCase());
            });
            this.displayedTeams = filteredTeams.slice(0, 6); // Limit the displayed teams
            this.showLess = false; // Reset the "Show Less" button
        }
    }
}
</script>

<style scoped>
.container {
    margin-top: 20px;
    align-items: center;
    justify-content: center;
}

.title {
    margin-top: 20px;
    text-align: center;
    font-style: italic;
}

.top-container {
    position: relative;
    margin-top: 30px;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center; /* Pour centrer verticalement */
}

.plus {
    text-decoration: none;
    position: relative;
    /* change the cursor when hover */
    cursor: pointer;
}

.box-plus {
    background-color: #5E17EB;
    color: black;
    border-radius: 8px;
    padding: 10px 10px;
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease;
}

.box-plus:hover {
    background-color: #4d13c2;
}

.box-plus i {
    margin-left: 10px;
}

.box-plus p {
    margin: 0;
    font-size: 1em;
    font-weight: bold;
    color: black;
    /* disallow cutting */
    white-space: nowrap;
}

.display-team {
    margin-top: 20px;
    width: 45%;
}

.display-team h2 {
    font-size: 1.75em;
    font-weight: bold;
    margin-bottom: 10px;
}

.team-box {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    background-color: transparent;
    transition: background-color 0.3s ease;
}

.team-box h2 {
    font-size: 1.25em;
    font-weight: bold;
    font-style: italic;
    color :#4d13c2;
}

.team-box h3 {
    font-size: 1em;
    font-weight: bold;
    margin-top: 10px;
}

.team-box p {
    font-size: 0.9em;
    font-weight:lighter;
    margin-left: 10px;
}

.linked-btn {
    background-color: #5E17EB;
    color: black;
    border-radius: 8px;
    padding: 10px 20px;
    text-decoration: none;
    display: inline-block;
    margin-top: 10px;
    transition: background-color 0.3s ease;
}

.linked-btn:hover {
    background-color: #4d13c2;
}

.load-more-btn {
    background-color: #5E17EB;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.load-more-btn:hover {
    background-color: #4d13c2;
}

.display-matches {
    margin-top: 20px;
    width: 45%;
}

.display-matches h2 {
    font-size: 1.75em;
    font-weight: bold;
    margin-bottom: 10px;
}

.match-box {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    background-color: transparent;
    transition: background-color 0.3s ease;
}

.match-box h2 {
    font-size: 1.25em;
    font-weight: bold;
    font-style: italic;
    color :#4d13c2;
}

</style>
