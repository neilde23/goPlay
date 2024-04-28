<template>
    <div class="timetable" :style="{ backgroundColor: color1 }">
        <div>
            <div class="boutton-position">
                <button class="roundButton" @click="changeThemeColor" :style="{ backgroundColor: color1 }"></button>
            </div>
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
        <div class="row first-row rows" :style="{ backgroundColor: color2 }">
            <div class="col-1">Time</div>
            <div class="col text-center">Match</div>
            <div class="col">Event</div>
        </div>
        <div class="rows row card-row" v-for="row in matchesTest" :style="{ backgroundColor: color2 }">
            <div class="col-1">{{ row.dateBegin }}</div>
            <div class="col d-flex justify-content-center">
                <div>{{ row.t1name }}</div>
                <div class="vs" :style="{ backgroundColor: color1 }">vs</div>
                <div>{{ row.t2name }}</div>
            </div>
            <div class="col">{{ row.eventName }}</div>
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
    const color1 = ref('#313840');
    const color2 = ref('#636E7A');
    const maxItems = 10;

    async function fetchMatches() {
        try {
            const filters = {
                game : selectedGame.value,
                date : selectedDate.value
            };
            const response = await axios.post('http://localhost:3000/api/match/', { filters });
            matchesTest.value = response.data.slice(0, maxItems);
        } catch (error) {
            console.error('Error fetching matches:', error);
        }
    }

    watch([selectedGame, selectedDate], () => {
        fetchMatches();
    });

    fetchMatches();


    function changeThemeColor() 
    {

        switch (color1.value) {
            case '#313840':
                color1.value = '#5a0009';
                color2.value = '#763038';
                break;
            case '#5a0009':
                color1.value = '#202225';
                color2.value = '#585a5b';
                break;
            default:
                color1.value = '#313840';
                color2.value = '#636E7A';
                break;
        }
    }


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
        height: 600px;
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

    span {
        user-select: none;
        padding: 0px 4px;
    }

    .container {
        width: 500px !important;
    }

    .roundButton {
        height: 15px;
        background-color: #5a0009;

    }

    .boutton-position {
        display: flex;
        justify-content: right;
    }

    .vs {
        margin-left: 6px;
        margin-right: 6px;
        padding-left: 8px;
        padding-right: 8px;
        border-radius: 6px;
        font-size: small;
        font-style:oblique;
        text-align: center
    }





   
</style>
  