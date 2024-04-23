<template>
    <div class="timetable">
        <div>
            <ul class="filters">
                <li>
                    <select v-model="selectedGame" class="select">
                        <option value="">All Games</option>
                        <option v-for="game in games" :value="game">{{ game }}</option>
                    </select>
                </li>
                <li>
                    <div class="date-picker d-inline-flex">
                        <span @click="prevDay">&lt;</span>
                        <input type="date" v-model="selectedDate">
                        <span @click="nextDay">&gt;</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="row first-row">
            <div class="col-1">Time</div>
            <div class="col text-center">Match</div>
            <div class="col">Event</div>
        </div>
        <div class="row card-row" v-for="row in matchesTest">
            <div class="col-1">{{ row.dateBegin }}</div>
            <div class="col text-center">{{ row.idTeam1 }} vs {{ row.idTeam2 }}</div>
            <div class="col">{{ row.idEvent }}</div>
        </div>
    </div>

    

</template>
  
<script setup>
    import { ref,  watch } from 'vue';
    import axios from 'axios';

    const games = ref([
        "CSGO", "Rocket League", "LOL"
    ]);

    const selectedDate = ref(getTodayDate());
    const selectedGame = ref('');
    const matchesTest = ref();

    async function fetchMatches() {
        try {
            const response = await axios.post('http://localhost:3000/api/getMatches', { selectedGame: selectedGame.value, selectedDate: '' });
            matchesTest.value = response.data;
        } catch (error) {
            console.error('Error fetching matches:', error);
        }
    }

    watch([selectedGame, selectedDate], () => {
        fetchMatches();
    });

    fetchMatches();


    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function prevDay() {
        const currentDate = new Date(selectedDate.value);
        currentDate.setDate(currentDate.getDate() - 1);
        selectedDate.value = currentDate.toISOString().split('T')[0];
    }

    function nextDay() {
        const currentDate = new Date(selectedDate.value);
        currentDate.setDate(currentDate.getDate() + 1);
        selectedDate.value = currentDate.toISOString().split('T')[0];
    }

    

    
</script>
  
<style scoped>
    * {
        font-family: sans-serif;
        color: #a5afbb;
        font-size: small;
    }

    .row {
        margin-top: 2px;
        border-radius: 5px;
        background-color: #636E7A;
        height: 40px;
        align-items: center;
        margin-left: 0px;
        margin-right: 0px;
        
    }

    .first-row {
        height: 30px;
    }

    .timetable {
        padding: 40px 25px;
        background-color: #313840;
        border-radius: 20px;
    }

    .date-picker {
        background: transparent !important;
        height: 30px;
        align-items: center;
    }

    input[type="date"] {
        background-color: transparent;
        border: 0px;
        text-align: center;
        background: none;
        margin-left: 10px;
        margin-right: 10px;
    }

    .filters {
        display: flex;
        list-style: none;
        padding-left: 0px;
    }

    .filters li {
        margin-right: 20px;
    }

    .select {
        height: 30px;
        width: 150px;
    }

    span:hover {
        cursor: default;
    }

    .container {
        width: 500px !important;
    }
   
</style>
  