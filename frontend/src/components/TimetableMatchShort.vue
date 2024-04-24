<template>
    <div class="timetable">
        <div class="d-flex justify-content-center">
            <ul class="filters">
                <div class="date-picker d-inline-flex">
                    <span @click="prevDay">&lt;</span>
                    <input type="date" v-model="selectedDate">
                    <span @click="nextDay">&gt;</span>
                </div>
            </ul>
        </div>
        <div class="row card-row" v-for="row in arrayMatches">
            <div class="col-2 text-center">{{ row.dateBegin }}</div>
            <div class="col">
                <div>{{ row.idTeam1 }}</div>
                <div>{{ row.idTeam2 }}</div>
            </div>
            <div class="col">{{ row.idEvent }}</div>
        </div>
    </div>
</template>
  
<script setup>
    import { ref, computed } from 'vue';
  
    const arrayMatches = ref([
    {
        
        idTeam1: 456,
        idTeam2: 789,
        dateBegin: '10:00',
        idEvent: 123,
        game: 'Dota 2'
    },
    {
        idTeam1: 789,
        idTeam2: 123,
        dateBegin: '12:30',
        idEvent: 456,
        game: 'LoL',
    }
    ]);

    const games = ref([
        "CSGO", "Rocket League", "LOL"
    ]);

    const selectedDate = ref(getTodayDate());

    const matchList = computed(() => {

    });

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
        background-color: #636E7A;
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
        background-color: #313840;
        border-radius: 10px;
        width: 420px;
        height: 500px;
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
   
</style>
  