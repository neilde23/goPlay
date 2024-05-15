<template>
    <TeamDashboard :teamId=this.$store.getters.getCurrentTeam />
</template>

<script>
    import TeamDashboard from '@/components/TeamDashboard.vue'
    export default {
        name: 'TeamDetail',
        components: {
            TeamDashboard
        }
    }
</script>

<style>
</style>
