<template>
    <div class="popup-overlay" v-if="show">
        <div class="popup-container">
            <h2>Add a new player</h2>
            <SearchBar
                msg="Enter a player pseudo..."
                class="search-bar"
                @search="filterPlayers"
            />
            <div class="players" v-if="players.length > 0">
                <div
                    :class="{ player: true, selected: player.id === formData.id }"
                    v-for="player in players"
                    :key="player.id"
                    @click="selectPlayer(player)"
                >
                    <div class="player-info">
                        <div class="player-pseudo">{{ player.pseudo }}</div>
                        <p>Email : {{ player.email }}</p>
                    </div>
                    <img src="/rocketLeague.webp" alt="Rocket League" />
                </div>
            </div>
            <div v-else>
                <p>No players found</p>
            </div>
            <div class="popup-buttons">
                <button type="button" @click="closePopup">Cancel</button>
                <button type="button" @click="addPlayer">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
import SearchBar from './SearchBar.vue';
import axios from 'axios';

    export default {
        components: {
            SearchBar
        },
        props: {
            show: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                formData: {
                    id : '',
                },
                players: [],
            };
        },
        created() {
            // Fetch all players when the component is mounted
            this.fetchPlayers();
        },
        methods: {
            async fetchPlayers() {
                // Send a GET request to the API to fetch all players
                const response = await axios.get('http://localhost:3000/api/players/')
                .then(response => {
                    this.players = response.data;
                })
                .catch(error => {
                    console.error('Error fetching player: ', error);
                });
            },
            filterPlayers(search) {
                if (search) {
                    // Filter players by pseudo
                    this.players = this.players.filter(player => player.pseudo.includes(search));
                } else {
                    // Fetch all players
                    this.fetchPlayers();
                }
            },
            closePopup() {
                // Emit 'close' event to close the popup
                this.$emit('close');
            },
            selectPlayer(player) {
                // Set the selected player
                this.formData.id = player.id;
            },
            addPlayer() {
                // Emit 'create' event with the selected player
                this.$emit('create', this.formData);
            }
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

.popup-container .popup-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.popup-container button {
    width: 100px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: white;
    background-color: #5C6BC0;
}

.popup-container button:hover {
    background-color: #3949AB;
}

.search-bar {
    margin-bottom: 20px;
}

.players {
    overflow-y: auto;
    max-height: 10rem;
}

.player {
    display: flex;
    align-items: center;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: transparent;
    transition: background-color 0.3s ease;
}

.player:hover {
    background-color: #5C6BC0;
    cursor: pointer;
}

/* Add a class to style the selected player */
.selected {
    background-color: #381284;
}

.player p {
    font-size: 0.9em;
    font-weight: lighter;
    margin-left: 10px;
}

.player-pseudo {
    font-size: 1.25em;
    font-weight: bold;
    font-style: italic;
    color: #381284;
}

.player-info {
    flex: 1;
}

.player img {
    width: 50px;
    height: 50px;
    margin-left: 20px;
}

</style>