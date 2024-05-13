<template>
    <div class="zone primary-color">
        <News/>
        <div class="d-flex justify-content-center"><hr width="70%"></div>
        <TeamActivity/>
        <div class="d-flex justify-content-center"><hr width="70%"></div>
        <div class="button-myteam">
            <a href="/team" class="button-color">My Team</a>
        </div>
    </div>

</template>

<script setup>
    import News from '@/components/News.vue'
    import TeamActivity from '@/components/TeamActivity.vue'
</script>

<style scoped>
    .zone {
        padding: 20px 15px;
        border-radius: 10px;
        width: 205px;
        height: 100%;
        padding-bottom: 10px;
        position: relative; /* Position relative pour permettre le positionnement de l'ombre */
        overflow: hidden;
        animation: shadowAnimation 3s infinite alternate;
    }

    hr {
        margin: 50px 0px;
    }

    .button-myteam {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2vh;
    }

    .button-myteam button {
        width: 90%;
        font-size: small;
        border-radius: 5px;
        border: none;
        
    }

    .button-color {
        color: inherit;
        text-decoration: none;
        width: 90%;
        font-size: small;
        border-radius: 5px;
        text-align: center;
        padding-top: 2px;
        padding-bottom: 2px;
    }

    .button-color:hover {
        filter: brightness(130%);
    }

    @keyframes shadowAnimation {
        from {
            box-shadow: none; /* Pas d'ombre au début de l'animation */
        }
        to {
            box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.5); /* Ombre à la fin de l'animation */
        }
    }

</style>

