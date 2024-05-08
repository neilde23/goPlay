<template>
    <div id="teamtitle">
        <h2>Currently in {{ datateams.length }} teams</h2>
    </div>
    <div class="teams" v-for="team in datateams">
        <div id="name">{{ team.name }}</div>
        <div id="desc">{{ team.description }}</div>
        <div id="manager">managed by {{ getmanager(team.idmanager) }}</div>
    </div>
</template>

<script>
//jugez pas trop fort svp je sais pas ce que je fais
    import axios from 'axios';
    export default {
        data() {
            return {
                datateams: [
                    {name: "team 1", description: "the strongest", idmanager: 0},
                    {name: "team 2", description: "the weakest", idmanager: 1}
                ]
            }
        },
        methods: {
            async findAll() {
                const response = await axios.get('http://localhost:3000/api/teams/').then(() => { return; });
            },
            getmanager(id) { //temporary method for tests, should send request to database and get manager id
                const managers = ["meunier", "adem"];
                return managers[id];
            }
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