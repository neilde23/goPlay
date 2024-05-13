<template>
    <div class="event primary-color">
        <div class="title-player-dashboard">Top tournaments</div>
        <div class="row secondary-color" v-for="(event, index) in eventList">
            <div class="event-banner" v-if="index === 0" :style="{ 'background-image': 'url(' + event.bannerPath + ')' }">
            </div>
            <div class="row row-info">
                <div class="col-2 d-flex align-items-center" style="width: 10%;">
                    <div class="event-icon">
                        <img :src="event.iconPath" alt="" width="50%" height="auto">
                    </div>
                </div>
                <div class="col">
                    <div class="event-name">
                        {{ event.name }}
                    </div>
                    <div class="event-info">
                        <ul>
                            <li><span>$ {{ event.cashPrize }}</span></li>
                            <li>-</li>
                            <li><span>{{ event.status }}</span></li>
                        </ul>
                    </div>
                </div>
                <div class="col-2">
                    <div class="team-icon">

                    </div>
                </div>
                <div class="button-list" v-if="index ===0">
                    <hr style="border-top: 2px solid black; margin-bottom: 0px;">
                    <div class="b">
                        <button class="button-color">overview</button>
                        <button class="button-color">matches</button>
                        <button class="button-color">results</button>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="redirect">
            <button class="button-color">All tournaments</button>
        </div>
    </div>

</template>

<script setup>
    import { ref,  watch } from 'vue';
    import axios from 'axios';

    const eventList = ref([]);

    eventList.value = [
    {
        name: "ESL Pro League",
        date: "2024-06-15",
        status: "En cours",
        cashPrize: 1000,
        iconPath: "https://files.bo3.gg/uploads/tournament/2146/image/150x150-b5e42740b2e19dc517eda73ba04a28ec.webp",
        bannerPath: "https://files.bo3.gg/uploads/tournament/2146/banner_image/1000x100-5f0edae6512954206377b920db1c9a19.webp"
    },
    {
        name: "Event 2",
        date: "2024-07-20",
        status: "Terminé",
        cashPrize: 2000,
        iconPath: "https://files.bo3.gg/uploads/tournament/2671/image/150x150-698a7c74c2506ab2dadf58101d7984a3.webp",
        bannerPath: "banners/banner2.png"
    },
    {
        name: "Event 3",
        date: "2024-08-10",
        status: "À venir",
        cashPrize: 1500,
        iconPath: "https://files.bo3.gg/uploads/tournament/1594/image/150x150-ccbe485ffd2125880e95e76f9a5f8fcc.webp",
        bannerPath: "banners/banner3.png"
    }
    ];

</script>

<style scoped>


    .event {
        padding: 20px 15px;
        border-radius: 10px;
        width: 420px;
        padding-bottom: 10px;
    }

    .row {
        margin-bottom: 3px;
        border-radius: 8px;
        margin-left: 0px;
        margin-right: 0px;
        
    }

    
    .event-banner {
        height: 60px;
        background-size: cover;
        background-position: 50%;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .event-icon {
        display: flex;
        justify-content: center;
    }


    .row-info {
        padding-top: 8px;
        padding-bottom: 8px;
    }

    .col-2 {
        padding: 0px;
    }

    .b {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 75%;
        padding-top: 5px;
        padding-bottom: 5px;
        margin: 2px 0px;
    }

    .b button {
        margin-left: 8px;
        margin-right: 8px;
        width: 100%;
        font-size: small;
        border-radius: 5px;
        border: none;
    }

    .redirect {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }

    .redirect button {
        width: 80%;
        font-size: small;
        border-radius: 5px;
        border: none;
    }

    ul {
        padding: 0;
        margin: 0;
    }

    li {
        display: inline;
        margin-right: 10px;
    }

    li > span {
        font-size: 70%;
    }

    button:hover {
        filter: brightness(130%);
    }

</style>