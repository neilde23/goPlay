<template>
    <div class="stats primary-color">
        <div class="title-player-dashboard">Ingame Stats</div>
        <div class="card-1">
            <canvas class="my-4 w-100" id="myChart"></canvas>
        </div>
        <div class="card-12 secondary-color">
            <div class="row s1">
                <div class="col">Sats</div>
                <div class="col-2">Value</div>
                <div class="col-2">Avg</div>
            </div>
            <div 
                class="row s1"
                v-for="(value, key, index) in recentPlayerMatches[indexGraph]" 
                :class="{ 'active': index === activeRowIndex }"
                :key="index" @click="updateGraph(key, index)"
            >
                <div class="col">{{ key }}</div>
                <div class="col-2">{{ value }}</div>
                <div class="col-2">{{ avgValue[index] }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    const recentPlayerMatches = [
        {
            score: 7,
            kills: 25,
            deaths: 15,
            headshotPercentage: 40
        },
        {
            score: 8,
            kills: 32,
            deaths: 10,
            headshotPercentage: 35
        },
        {
            score: 6,
            kills: 20,
            deaths: 12,
            headshotPercentage: 45
        },
        {
            score: 9,
            kills: 40,
            deaths: 8,
            headshotPercentage: 50
        },
        {
            score: 5,
            kills: 15,
            deaths: 20,
            headshotPercentage: 30
        },
        {
            score: 6,
            kills: 22,
            deaths: 18,
            headshotPercentage: 38
        },
        {
            score: 8,
            kills: 30,
            deaths: 12,
            headshotPercentage: 42
        },
        {
            score: 7,
            kills: 27,
            deaths: 15,
            headshotPercentage: 36
        },
        {
            score: 8,
            kills: 35,
            deaths: 10,
            headshotPercentage: 48
        },
        {
            score: 6,
            kills: 18,
            deaths: 14,
            headshotPercentage: 32
        }
    ];

    function calculateAverages(matches) {
        const averages = [0, 0, 0, 0];

        matches.forEach(match => {
            averages[0] += match.score;
            averages[1] += match.kills;
            averages[2] += match.deaths;
            averages[3] += match.headshotPercentage;
        });

        averages.forEach((sum, index) => {
            averages[index] = sum / matches.length;
        });

        return averages;
    }

    
    const defaultIndexGraph = recentPlayerMatches.length - 1;
    const indexGraph = ref(defaultIndexGraph);
    const avgValue = ref(calculateAverages(recentPlayerMatches));
    let myChart = null;
    const activeRowIndex = ref(0);


    onMounted(() => {
        const ctx = document.getElementById('myChart');
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [0, 1, 2, 3, 4, 5, 6, 7, 8 ,9],
                datasets: [{
                    data: [
                        1,
                        8,
                        9,
                        6,
                        5,
                        3,
                        5,
                        8,
                        9,
                        8
                    ],
                    lineTension: 0,
                    backgroundColor: 'transparent',
                    borderColor: '#007bff',
                    borderWidth: 4,
                    pointBackgroundColor: '#007bff',
                    hitRadius: 10
                }]
            },
            options: {
                onHover: (event, chartElement) => {
                    if (chartElement.length > 0) {
                        indexGraph.value = chartElement[0].index;
                    }
                    else {
                        indexGraph.value = defaultIndexGraph;
                    }
                },
                scales: {
                    x: {
                        display: false

                    },
                    y: {
                        min: 0,
                        max: 10,
                        ticks: {
                            stepSize: 5
                        },
                        grid: {
                            display: true
                        }
                
                    }

                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    });

    function updateGraph(key, index) {
        const data = [];
        const labels = [];

        recentPlayerMatches.forEach(match => {
            data.push(match[key]);
            labels.push('');
        })

        console.log(data);
        myChart.data.datasets[0].data = data;
        myChart.data.labels = labels;

        myChart.options.scales.y.max = key === 'score' ? 10 : 100;
        myChart.options.scales.y.ticks.stepSize = key === 'score' ? 5 : 50;
        
        activeRowIndex.value = index;
        myChart.update();
        
    }
</script>

<style scoped>
    .stats {
        padding: 20px 15px;
        border-radius: 10px;
        width: 420px;
        padding-bottom: 10px;
        flex-grow: 1;

    }

    .row {
        margin: 0;
    }

    .card-12 {
        border-radius: 8px;
        margin-bottom: 10px;
    }

    .s1 {
        padding: 8px 8px;
    }

    .active {
        border: 2px solid #007bff;
        border-radius: 5px;
    }



</style>