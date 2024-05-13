<template>
    <div class="create-match">
        <div class="title"></div>
        <div class="teams-filter item filter">
            <select v-model="selectedTeam" class="select">
                <option value="">Choose Team</option>
                <option v-for="team in teamList" :value="team">{{ team }}</option>
            </select>
        </div>
        <hr>
        <div class="events-filter item filter">
            <select v-model="selectedEvent" class="select">
                <option value="">Choose Event</option>
                <option v-for="event in EventList" :value="event">{{ event }}</option>
            </select>
        </div>
        <hr>
        <div class="players-filter item">
            <div class="players" v-for="player in PlayerList">
                <img src="/rocketLeague.webp" alt="">
                <div class="player-name" style="text-align: center;">chsjhcs</div>
            </div>
        </div>
        <hr>
        <div class="button-submit filter item">
            <button type="submit">Create Match</button>
        </div>
       
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const teamList = ref([]);
    const EventList = ref([]);
    const PlayerList = ref(["","","", "", "", "", "", "", ""]);

    const selectedTeam = ref('');
    const selectedEvent = ref('');
    const selectedPlayer = ref([]);



</script>

<style scoped>

    .create-match {
        border: 1px solid black;
        border-radius: 10px;
    }
    .filter {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .players-filter {
        display: flex;
        flex-wrap: wrap;
        margin: 10px 40px;
        max-height: 400px;
        overflow: scroll;
    }

    .players {
        margin-right: 10px;
        margin-bottom: 20px;
    }

    .item {
        margin-bottom: 5px;
        min-height: 150px;
    }

    hr {
        margin-left: 60px;
        margin-right: 60px;
    }

    .players img {
        width: 50px;
        height: auto;
    }



</style>