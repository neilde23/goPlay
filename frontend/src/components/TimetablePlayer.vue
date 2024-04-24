<template>
    <div class="timetable">
        <div class="row">
          <div class="col first-col">
          </div>
          <div class="col" v-for="day in weekDays">
            {{ day }}
          </div>
        </div>
        <div class="row" v-for="hour in hours">
          <div class="col">
            {{ hour }}
          </div>
          <div class="col" v-for="day in weekDays">
              <input class="form-check-input position-static" type="checkbox" v-model="selectedTimes[day][hour]">
          </div>
        </div>
        <div id="submit">
          <button class="btn btn-primary" @click="submitSchedule">Submit</button>
        </div>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  const selectedTimes = ref({});

  weekDays.forEach(
    day => {selectedTimes.value[day] = {};
    hours.forEach(hour => {selectedTimes.value[day][hour] = false;});
  });

  function submitSchedule() 
  {
      for (const day in selectedTimes.value) 
      {
          for (const hour in selectedTimes.value[day]) 
          {
            if (selectedTimes.value[day][hour]) 
            {
                console.log(`Checked: ${day} - ${hour}`);
            }
          }
      }
  }

</script>
  
<style scoped>

  * {
    font-size: small;
  }
  .hours {
    display: flex;
    flex-direction: column;
  }

  .hour {
    margin-bottom: 5px;
  }

  .form-check {
    margin-bottom: 5px;
  }

  .col {
    justify-content: center;
    align-items: center;
    display: flex;
    border: black 0.1px solid;
    padding-left: 2px;
    padding-right: 2px;
    height: 40px;

  }

  .timetable {
      padding: 20px 25px;
      background-color: #313840;
      border-radius: 20px;

  }
  .form-check-input:checked {
    background-color: green;
    border: green;
  }

  #submit {
    display: flex;
    justify-content: end;
    margin-top: 20px;
  }

  .btn {
    background-color: green;
    border: green;
    height: 30px;
    font-size: 12px;
  }


</style>
