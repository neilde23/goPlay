<template>
    <div class="container">
    <div class="title">
        <h1>Manager</h1>
        <p>Welcome to your dashboard</p>
    </div>
    <div class="top-container">
        <div class="tabs">
            <button :class="{ activeTab: activeTab === 'teams' }" @click="changeTab('teams')">Teams</button>
            <button :class="{ activeTab: activeTab === 'matches' }" @click="changeTab('matches')">Matches</button>
        </div>
        <div class="plus btn-primary" @click="showTeamForm">
            <div class="box-plus">
                <p>Add team</p>
                <i class="fas fa-plus"></i>
            </div>
        </div>
        <SearchBar
            v-if="activeTab === 'teams'"
            msg="Enter a team name to search"
            class="search-bar"
            @search="filterTeams"
        />
        <SearchBar
            v-else-if="activeTab === 'matches'"
            msg="Enter a match title to search"
            class="search-bar"
            @search="filterMatches"
        />
    </div>
    <div class="content">
        <div v-if="activeTab === 'teams'" class="display-list">
            <h2>My teams</h2>
            <div class="scrollable-list">
                <div class="team-box" v-for="(team, index) in displayedTeams" :key="team.id">
                    <div class="team-info">
                        <h2>{{ team.name }}</h2>
                        <h3>Description :</h3>
                        <p>{{ team.description }}</p>
                        <router-link to="/teamDetail" class="linked-btn" @click="setCurrentTeam(team.id)">View team</router-link>
                    </div>
                    <div class="team-image">
                        <img src="../assets/7.jpeg" alt="Team Image">
                    </div>
                </div>
            </div>
            <div v-if="!showLess && teams.length > displayedTeams.length" class="center-btn">
                <button @click="showMoreTeams" class="load-more-btn">Show More</button>
            </div>
            <div v-else-if="showLess && displayedTeams.length > 6" class="center-btn">
                <button @click="showLessTeams" class="load-more-btn">Show Less</button>
            </div>
        </div>
        <div v-else-if="activeTab === 'matches'" class="display-list">
            <h2>My matches</h2>
            <div class="scrollable-list">
                <div class="match-box" v-for="(match, index) in displayedMatches" :key="match.id">
                    <div class="match-info">
                        <h2>{{ match.game}}</h2>
                        <!-- get opponents with id of teams -->
                        <h3>Opponents: {{ getOpponents(match) }}</h3>
                        <p>Date: {{ match.dateBegin }}</p>
                    </div>
                    <div class="match-image">
                        <img src="../assets/8.jpeg" alt="Match Image">
                    </div>
                </div>
            </div>
            <div v-if="!showLess && matches.length > displayedMatches.length" class="center-btn">
                <button @click="showMoreMatches" class="load-more-btn">Show More</button>
            </div>
            <div v-else-if="showLess && displayedMatches.length > 6" class="center-btn">
                <button @click="showLessMatches" class="load-more-btn">Show Less</button>
            </div>
        </div>
    </div>
    <TeamFormPopup :show="showPopup" @create="createTeam" @close="closePopup" style="position: fixed; z-index: 1;"/>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios, { all } from 'axios';
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
        allTeams: [], // Initialisation du tableau pour stocker toutes les équipes
        showPopup: false, // Initialisation de la variable pour afficher ou masquer le popup
        displayedTeams: [], // Tableau pour stocker les équipes affichées
        displayedMatches: [], // Tableau pour stocker les matchs affichés
        showLess: false, // Variable pour contrôler l'affichage du bouton "Show Less"
        matches: [],
        activeTab: 'teams' // Définir l'onglet actif par défaut sur les équipes
    };
    },
    mounted() {
        this.fetchTeams(); // Appel de la méthode de récupération des équipes lorsque le composant est monté
    },
    methods: {
        setCurrentTeam(teamId) {
            this.$store.commit('setCurrentTeam', teamId);
        },
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

            // Récupération de toutes les équipes pour la recherche
            const responseAll = await axios.get('http://localhost:3000/api/teams')
            .then(response => {
                this.allTeams = response.data;
                console.log('All Teams:', this.allTeams);
            })
            .catch(error => {
                console.error('Error fetching all teams: ', error);
            });
            this.fetchMatches();
        },
        async fetchMatches() {
            // Récupération des matchs depuis l'API
            for (let i = 0; i < this.teams.length; i++) {
                try {
                    const response = await axios.get('http://localhost:3000/api/match/' + this.teams[i].id)
                    .then(response => {
                        this.matches = this.matches.concat(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching matches: ', error);
                    });
                } catch (error) {
                    console.error('Error fetching matches: ', error);
                }
            }
            this.displayedMatches = this.matches.slice(0, 6); // Afficher uniquement les six premiers matchs
            console.log('Matches:', this.displayedMatches);
        },
        // Méthode pour obtenir les noms des équipes opposées à partir des IDs dans les matchs
        getOpponents(match) {
            const team1 = this.allTeams.find(team => team.id === match.idTeam1);
            const team2 = this.allTeams.find(team => team.id === match.idTeam2);
            console.log('Opponents:', team1, team2);
            if (team1 && team2) {
                return `${team1.name} vs ${team2.name}`;
            }
            return "Opponents Not Found";
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
        showLessMatches() {
            // Afficher seulement les six premiers matchs lorsque le bouton "Show Less" est cliqué
            this.displayedMatches = this.matches.slice(0, 6);
            this.showLess = false; // Désactiver le bouton "Show Less"
        },
        showMoreMatches() {
            // Afficher six matchs supplémentaires lorsque le bouton "Show More" est cliqué
            const startIndex = this.displayedMatches.length;
            const endIndex = startIndex + 6;
            this.displayedMatches = this.matches.slice(0, endIndex);
            this.showLess = true; // Activer le bouton "Show Less"
        },
        filterTeams(searchText) {
            console.log("Search text:", searchText);
            if (searchText === '') {
                this.displayedTeams = this.teams.slice(0, 6); // Reset displayed teams
                this.showLess = false; // Reset "Show Less" button
                return;
            }
            const filteredTeams = this.teams.filter(team => {
                return team.name.toLowerCase().includes(searchText.toLowerCase());
            });
            this.displayedTeams = filteredTeams.slice(0, 6); // Limit the displayed teams
            this.showLess = false; // Reset the "Show Less" button
        },
        filterMatches(searchText) {
            console.log("Search text:", searchText);
            if (searchText === '') {
                this.displayedMatches = this.matches.slice(0, 6); // Reset displayed matches
                this.showLess = false; // Reset "Show Less" button
                return;
            }
            const filteredMatches = this.matches.filter(match => {
                return match.game.toLowerCase().includes(searchText.toLowerCase());
            });
            this.displayedMatches = filteredMatches.slice(0, 6); // Limit the displayed matches
            this.showLess = false; // Reset the "Show Less" button
        },
        changeTab(tabName) {
            this.activeTab = tabName; // Change the active tab when clicked
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
    width: 100%;
}

.top-container {
    position: relative;
    /* margin-top: 10px; */
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
    background-color: #381284;
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

.tabs {
    display: flex;
    margin-bottom: 20px;
    justify-content: flex-start; /* Modifier pour aligner à gauche */
}

.tabs button {
    background-color: #17ebbd;
    color: black;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    margin-top: 20px;
    margin-right: 10px; /* Ajouter de l'espace entre les boutons */
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.tabs button:hover {
    background-color: #0b6753;
}

.tabs .activeTab {
    background-color: #0b6753;
}

.content {
    display: flex;
    justify-content: space-between;
}

.display-list {
    width: 100%;
}

.display-list h2 {
    font-size: 1.5em;
    font-weight: bold;
    font-style: italic;
}

.team-box,
.match-box {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    background-color: transparent;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
}

.team-box h2,
.match-box h2 {
    font-size: 1.25em;
    font-weight: bold;
    font-style: italic;
    color: #381284;
}

.team-box h3,
.match-box h3 {
    font-size: 1em;
    font-weight: bold;
    margin-top: 10px;
}

.team-box p,
.match-box p {
    font-size: 0.9em;
    font-weight: lighter;
    margin-left: 10px;
}

.team-info,
.match-info {
    flex: 1;
}

.team-image,
.match-image {
    width: 100px; /* Ajustez la taille de l'image selon vos besoins */
    margin-left: 20px; /* Ajoutez de l'espace entre l'image et les informations de l'équipe */
}

.team-image img,
.match-image img {
    width: 100%;
    border-radius: 8px;
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
    background-color: #381284;
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
    background-color: #381284;
}

.center-btn {
    display: flex;
    justify-content: center;
}

</style>
