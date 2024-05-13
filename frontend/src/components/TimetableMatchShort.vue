<template>
    <div class="timetable primary-color">
        <div class="d-flex justify-content-center">
            <ul class="filters">
                <div class="date-picker d-inline-flex">
                    <span @click="prevDay">&lt;</span>
                    <input type="date" v-model="selectedDate">
                    <span @click="nextDay">&gt;</span>
                </div>
            </ul>
        </div>
        <div class="row card-row secondary-color" v-for="row in matchesTest">
            <div class="col-2 text-center">{{ row.dateBegin }}</div>
            <div class="col">
                <div>{{ row.t1name }}</div>
                <div>{{ row.t2name }}</div>
            </div>
            <div class="col">{{ row.eventName }}</div>
        </div>
        <div class="container no-matches" v-if="matchesTest.length === 0">
            <p>There are currently no matches</p>
        </div>
    </div>
</template>
  
<script setup>
    import { ref,  watch } from 'vue';
    import axios from 'axios';

    const selectedDate = ref(getTodayDate());
    const selectedGame = ref('');
    const matchesTest = ref([]);
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
        border-radius: 8px;
        height: 70px;
        align-items: center;
        margin-left: 0px;
        margin-right: 0px;
        
    }

    .col {
        padding: 0px;;
    }

    .timetable {
        padding: 20px 25px;
        border-radius: 10px;
        width: 100%;
        min-height: 40%;
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


    span:hover {
        cursor: default;
    }

    .col-2 {
        padding-left: 5px;
    }

    .no-matches {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50vh;

    }

    
   
</style>
  