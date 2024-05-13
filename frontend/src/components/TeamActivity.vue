<template>
    <div class="activity">
        <div class="title-player-dashboard">Latest Activity</div>
        <div class="row secondary-color" v-for="actionDesc in actionDescriptions.slice(0, maxActivity)">
            <div class="d activity-color" :style="{ backgroundColor: actionDesc.action.color }"></div>
            <div class="d">
                <span>{{ actionDesc.action.label }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const maxActivity = ref(9);

    const actionsEnum = {
        CHAT_MANAGER: { color: "#FF0000", label: "Manager" },
        CHAT_TEAM: { color: "#00FF00", label: "Team" },
        MATCH: { color: "#0000FF", label: "Match" },
        EVENT: { color: "#FFFF00", label: "Event" },
        TIMETABLE: { color: "#800080", label: "Timetable" },
        IMPORTANT: { color: "#FFA500", label: "Important" }
    };


    const actionDescriptions = ref([
        { action: actionsEnum.CHAT_MANAGER, description: "This action is related to managing chats." },
        { action: actionsEnum.CHAT_TEAM, description: "This action involves communication within a team." },
        { action: actionsEnum.MATCH, description: "This action is related to a match event." },
        { action: actionsEnum.EVENT, description: "This action is related to an event." },
        { action: actionsEnum.TIMETABLE, description: "This action involves managing a timetable." },
        { action: actionsEnum.IMPORTANT, description: "This action is marked as important." },
        { action: actionsEnum.CHAT_MANAGER, description: "Managing chat is crucial for effective communication." },
        { action: actionsEnum.MATCH, description: "Matches are central to the competition." },
        { action: actionsEnum.EVENT, description: "Events add value and engagement." },
        { action: actionsEnum.IMPORTANT, description: "Prioritizing important actions is key for success." }
    ]);

</script>

<style scoped>

    .row {
        margin-top: 4px;
        border-radius: 4px;
        margin-left: 0px;
        margin-right: 0px;
        flex-wrap: nowrap;
        
    }

    .d {
        padding: 0;
        padding-left: 5px;
        padding-bottom: 4px;
        padding-top: 4px;
    }

    .d span {
        padding-left: 8px;
    }

    .activity-color {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        width: 5px;
    }

    .scrollGradient {
        background: 
            linear-gradient(#78f759 33%, rgba(120,247,89, 0)),
            linear-gradient(rgba(120,247,89, 0), #78f759 66%) 0 100%,
            radial-gradient(farthest-side at 50% 0, rgba(34,34,34, 0.5), rgba(0,0,0,0)),
            radial-gradient(farthest-side at 50% 100%, rgba(34,34,34, 0.5), rgba(0,0,0,0)) 0 100%;
        background-color: #78f759;
        background-repeat: no-repeat;
        background-attachment: local, local, scroll, scroll;
        background-size: 100% 96px, 100% 96px, 100% 32px, 100% 32px;
    }

    .row:hover {
        filter: brightness(130%);
    }


</style>