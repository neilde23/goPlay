<template>
    <article>
        <div class="row separation">
            <div class="col">
                <TimetableMatchShort/>
            </div>
            <div class="col">
                <div class="row separation">
                    <div class="col test">
                        <div class="separation"><EventList/></div>
                        <div><PlayerStats/></div>
                    </div>
                    <div class="col test">
                        <News/>
                        <TeamActivity/>
                    </div>
                </div>
                <div class="row separation">
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

    .separation {
        margin-bottom: 20px;
    }

    article {
        margin : 20px 200px 0px 200px;
        min-height: 500px;
    }

    .test {
        display: flex;
        flex-direction: column;
    }

    .title-test {
        font-family: Marker Felt, fantasy
    }

    .row {
        flex-wrap: nowrap;
        overflow: hidden;
    }

</style>

<style>
    .title-player-dashboard {
        font-family: Marker Felt, fantasy;
        margin-bottom: 5px;
        padding-left: 8px;
    }

</style>