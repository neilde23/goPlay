<template>
    <div class="container">
        <div class="team-info">
            <h2>{{ team.name }}</h2>
            <p>{{ team.description }}</p>
        </div>
        <div class="top-controls">
            <button @click="showCreateMatch" class="btn-primary">Create Match</button>
            <button @click="showAddPlayer" class="btn-primary">Add Player</button>
            <SearchBar
                msg="Enter a player name or a match game to search..."
                class="search-bar"
                @search="filterPlayersOrMatches"
            />
        </div>
        <div class="left-column">
            <div class="display-list">
            <h2>My matches</h2>
            <div>
                <div
                class="match-box"
                v-for="(match, index) in displayedMatches"
                :key="match.id"
                >
                <div class="match-info">
                    <h2>{{ match.game }}</h2>
                    <h3> Opponent: {{ getOpponent(match.idTeam1, match.idTeam2) }} </h3>
                    <p>Date: {{ match.dateBegin }}</p>
                </div>
                <div class="match-image">
                    <img src="../assets/8.jpeg" alt="Match Image" />
                </div>
                </div>
            </div>
            <div
                v-if="!showLess && matches.length > displayedMatches.length"
                class="center-btn"
                >
                <button @click="showMoreMatches" class="load-more-btn">
                Show More
                </button>
            </div>
            <div
                v-else-if="showLess && displayedMatches.length > 6"
                class="center-btn"
            >
                <button @click="showLessMatches" class="load-more-btn">
                Show Less
                </button>
            </div>
            </div>
        </div>
        <div class="right-column">
            <div class="display-list">
            <h2>Players</h2>
            <div class="scrollable-list">
                <div
                class="player-box"
                v-for="(player, index) in displayedPlayers"
                :key="player.id"
                >
                <div class="player-info">
                    <h3>{{ player.pseudo }}</h3>
                    <p>Email : {{ player.email }}</p>
                </div>
                <div class="player-image">
                    <img src="/rocketLeague.webp" alt="Player Image" />
                </div>
                </div>
            </div>
            </div>
        </div>
        <CreateMatch v-if="showPopupMatch" @create="createMatch" @close="showPopupMatch = false" :show="showPopupMatch" />
        <AddPlayer v-if="showPopupPlayer" @create="addPlayer" @close="showPopupPlayer = false" :show="showPopupPlayer" />
    </div>
</template>

<script>
import axios from "axios";
import SearchBar from "@/components/SearchBar.vue";
import CreateMatch from "@/components/CreateMatch.vue";
import AddPlayer from "@/components/AddPlayer.vue";

export default {
    components: {
        SearchBar,
        CreateMatch,
        AddPlayer,
    },
    props: {
        teamId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            team: null,
            allTeams: [],
            matches: [],
            displayedMatches: [],
            players: [],
            displayedPlayers: [],
            showLess: false,
            showPopupMatch: false,
            showPopupPlayer: false,
        };
    },
    created() {
        this.fetchTeam();
        this.fetchMatches();
        this.findPlayers();
    },
    methods: {
        async fetchTeam() {
            try {
            const response = await axios.get(
                "http://localhost:3000/api/teams/" + this.teamId
            );
            this.team = response.data;
            console.log("Team:", this.team);
            } catch (error) {
            console.error("Error fetching team: ", error);
            }

            try {
            const response = await axios.get("http://localhost:3000/api/teams");
            this.allTeams = response.data;
            } catch (error) {
            console.error("Error fetching teams: ", error);
            }
        },
        async fetchMatches() {
            try {
            const response = await axios.get(
                "http://localhost:3000/api/match/" + this.teamId
            );
            this.matches = response.data;
            this.displayedMatches = this.matches.slice(0, 6);
            } catch (error) {
            console.error("Error fetching matches: ", error);
            }
        },
        async findPlayers() {
            const response = await axios.get('http://localhost:3000/api/teams/players/' + this.teamId)
            .then(response => {
                this.players = response.data;
                console.log('Players:', this.players);
            })
            .catch(error => {
                console.error('Error fetching players: ', error);
            });
            this.fetchPlayers();
        },
        async fetchPlayers() {
            let playersData = [];
            for (let i = 0; i < this.players.length; i++) {
                const response = await axios.get('http://localhost:3000/api/players/' + this.players[i].idPlayer)
                .then(response => {
                    playersData.push(response.data);
                })
                .catch(error => {
                    console.error('Error fetching player: ', error);
                });
            }
            console.log('Players data:', playersData);
            this.players = playersData;
            this.displayedPlayers = this.players.slice(0, 6);
        },
        filterPlayersOrMatches(search) {
            const searchValue = search.toLowerCase();
            this.displayedPlayers = this.players.filter((player) => {
                return player.pseudo.toLowerCase().includes(searchValue);
            });
            this.displayedMatches = this.matches.filter((match) => {
                return match.game.toLowerCase().includes(searchValue);
            });
        },
        getOpponent(team1Id, team2Id) {
            const team1 = this.allTeams.find((team) => team.id === team1Id);
            const team2 = this.allTeams.find((team) => team.id === team2Id);
            if (team1.name === this.team.name) return team2.name;
            return team1.name;
        },
        showMoreMatches() {
            this.displayedMatches = this.matches;
            this.showLess = true;
        },
        showLessMatches() {
            this.displayedMatches = this.matches.slice(0, 6);
            this.showLess = false;
        },
        showLessPlayers() {
            this.displayedPlayers = this.players.slice(0, 6);
            this.showLess = false;
        },
        showMorePlayers() {
            this.displayedPlayers = this.players;
            this.showLess = true;
        },
        showCreateMatch() {
            this.showPopupMatch = true;
        },
        showAddPlayer() {
            this.showPopupPlayer = true;
        },
        addPlayer(player) {
            console.log('Player:', player);
            axios.post('http://localhost:3000/api/teams/addPlayer', {
                idTeam: this.teamId,
                idPlayer: player.id,
            })
            .then(response => {
                console.log('Player added:', response.data);
                this.findPlayers();
            })
            .catch(error => {
                console.error('Error adding player: ', error);
            });
        },
        async createMatch(match) {
            console.log('Match:', match);
            try {
                const response = await axios.post('http://localhost:3000/api/match', {
                    idTeam1: this.teamId,
                    idTeam2: match.team2,
                    game: match.game,
                    dateBegin: match.date,
                });
                console.log('Match created:', response.data);
                this.fetchMatches();
            } catch (error) {
                console.error('Error creating match: ', error);
            }
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

h2 {
    font-size: 1.5em;
    font-weight: bold;
    font-style: italic;
}

.team-info {
    margin-top: 20px;
    text-align: center;
    font-style: italic;
    width: 100%;
}

.top-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    text-align: center;
    width: 100%;
}

button {
    background-color: #5E17EB;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #381284;
}

.left-column {
    width: 70%;
    overflow: hidden;
}

.right-column {
    width: 30%;
    overflow: hidden;
}

.display-list {
    margin-bottom: 1rem;
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

.player-box,
.match-box {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    background-color: black;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
}

.match-box h2 {
    font-size: 1.25em;
    font-weight: bold;
    font-style: italic;
    color: #381284;
}

.match-box h3 {
    font-size: 1em;
    font-weight: bold;
    margin-top: 10px;
}

.match-box p {
    font-size: 0.9em;
    font-weight: lighter;
    margin-left: 10px;
}

.player-box h3 {
    font-size: 1.25em;
    font-weight: bold;
    font-style: italic;
    color: #381284;
}

.player-box p {
    font-size: 0.9em;
    font-weight: lighter;
    margin-left: 10px;
}

.player-info,
.match-info {
    flex: 1;
}

.match-image {
    margin-left: 20px;
    width: 100px;
}

.player-image {
    margin-left: 20px;
    width: 70px;
}

.match-image img,
.player-image img {
    width: 100%;
}

.load-more-btn {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
}

.linked-btn {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
}

.linked-btn:hover {
    text-decoration: underline;
}

/* .scrollable-list {
  overflow-y: auto;
  max-height: 20rem;
} */

/* Ajoutez d'autres styles au besoin */
</style>
