<template>
    <div id="teamtitle">
        <h2>{{ teamName }} </h2>
    </div>
    <div id="desc">{{ description }}</div>
    <div id="manager" v-for="player in players"> {{ player }}</div>
</template>

<script>
    import axios from 'axios';
    import { ref } from 'vue';
    
    export default {
        data() {
            return {
                teamName: "",
                description: "",
                players: []
            }
        },
        methods: {
            async getTeam() {
                const userCredentials = this.$store.getters.getUserCredentials;
                let address = 'http://localhost:3000/api/teams/players/'
                const response1 = await axios.get('http://localhost:3000/api/teams/manager/' + userCredentials.id).
                then(
                    response => {
                        console.log(response.data[0].name);
                        this.teamName = response.data[0].name;
                        this.description = response.data[0].description;
                        address += response.data[0].id;
                        console.log(address);
                    }
                );
                const response2 = await axios.get(address).
                then(
                    response => {
                        console.log(response.data);
                        this.players = response.data;
                    }
                );
            },
            getplayers(id) { //temporary method for tests, should send request to database and get manager id
                const managers = ["meunier", "adem"];
                return managers[id];
            }
        },
        mounted() {
            this.getTeam();
        }
    }
</script>

<style>

    #teamtitle {
        padding: 1em;
        text-align: center;
        color: #ccc;
        font: 1.2rem "Verdana" bold;
    }

    .teams {
        width: 29%;
        border: 2px solid #ccc;
        border-radius: 5px;
        background-color: transparent;
        padding: 0.5em;
        margin-left: 2%;
    }

    .teams:hover {
        width: 31%;
        border: 5px solid #fff;
        border-radius: 5px;
        background-color: transparent;
        padding: 0.5em;
        margin-left: 1%;
    }

    #name {
        font-size: medium;
    }

    #desc {
        font-size: smaller;
    }

    #manager {
        font-size: small;
    }
</style>