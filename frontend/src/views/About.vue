<template>
    <div>
        <h1>About</h1>
        <p>
        Go play is an online platform for managing ESports teams. <br>
        If you're a gamer, you can now sign up and join a team. <br>
        You will be informed of the different events which will be placed according to your timetable.  <br>

        If you're a manager, everything's been done to make your job easier. <br> Manage your team, create events and make your team the best team ever. <br><br>

        The whole team is at your disposal if you have any questions, just write to us below: 

        Translated with DeepL.com (free version)</p>
    </div>
    <form method="get" action="">
        <label for="prénom">Firstname : </label>
        <input type="text" name="prénom" id="prénom" placeholder="Ex.Michael">
        <label for="nom">Name</label>
        <input type="text" name="nom" id="nom" placeholder="Jackson">
        <label for="Email"> Your Email</label>
        <input type="Email" name="Email" id="Email" placeholder="MJ@Mail.com">

        <label for="ameliorer"> Q&A </label><br>
        <textarea name="ameliorer" id="ameliorer"></textarea>
    </form>
</template>

<script>
    export default {
        name: 'About'
    }
</script>

<style scoped>
</style>