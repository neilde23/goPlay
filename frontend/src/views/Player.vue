<template>
    <article>
        <div class="row">
            <div class="col">
                <div class="c2">
                    <TimetableMatchShort/>
                </div> 
            </div>
            <div class="col">
                <div class="row">
                    <div class="col">
                        <EventList/>
                        <PlayerStats/>
                    </div>
                    <div class="col">
                        <News/>
                        <TeamActivity/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="c1">
                            <TimetablePlayer/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup>
    import TimetablePlayer from '@/components/TimetablePlayer.vue'
    import TimetableMatchShort from '@/components/TimetableMatchShort.vue'
    import News from '@/components/News.vue'
    import EventList from '@/components/EventList.vue'
    import TeamActivity from '@/components/TeamActivity.vue'
    import PlayerStats from '@/components/PlayerStats.vue'

</script>

<style scoped>
    .c1 {
        width: 650px;
    }

    .row {
        margin-bottom: 10px;
    }

    article {
        margin : 20px 200px 0px 200px;
        min-height: 500px;
    }


</style>