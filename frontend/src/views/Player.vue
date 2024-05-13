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
                        <NewsActivity/>
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
    import EventList from '@/components/EventList.vue'
    import NewsActivity from '@/components/NewsActivity.vue'
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
    /*#302b63*/
    .title-player-dashboard {
        font-family: Marker Felt, fantasy;
        margin-bottom: 5px;
        padding-left: 8px;
    }

    .primary-color {
        background-color: #302b63;
        border: 2px solid #1d1a3e;

    }

    .secondary-color {
        background-color: #28235e;

    }

    .button-color {
        background-color: #453d91;
    }

</style>