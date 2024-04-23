<template>
    <footer class="footer">
        <div class="container">
            <p class="text-muted">goPlay is supported by</p>
            <img class = "taille_logo" src="../../public/design2bon.png" alt="Design Image">
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Bottom'
}
</script>

<style scoped>
.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
   
    
}
.taille_logo {
    width: 100px;
    height: 100px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
}

.container {
    display: flex;

    align-items: center;
    flex-direction: row;
    padding-top: 20px;
    color : white;
}
</style>