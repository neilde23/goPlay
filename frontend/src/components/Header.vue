<template>
    <header id="header" class="d-flex justify-content-center py-3 sticky-top">
        <nav class="nav nav-masthead justify-content-center">
        <router-link class="nav-link fw-bold py-1 px-0" to="/">Home</router-link>
        <router-link class="nav-link fw-bold py-1 px-0" to="/">Planning</router-link>
        <router-link class="nav-link fw-bold py-1 px-0" to="/">About</router-link>
        <router-link class="nav-link fw-bold py-1 px-0" to="/signin">Register</router-link>
        </nav>
        
    </header>

</template>

<script>

export default {
    name: 'Header'
}
</script>

<style scoped>
  #header {
    background-color: #161719;
    border-bottom: 0.5px solid gray;
    opacity: 0.6;
   
  }


.navbar {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}


</style>