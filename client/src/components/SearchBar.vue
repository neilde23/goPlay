<template>
    <nav class="navbar">
        <div class="container-fluid d-flex justify-content-center">
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </nav>
</template>

<script setup>


</script>


<style scoped>

    input[type="search"] {
        background: transparent;
        width: 500px;
        color: black;
        outline: none !important;
    }

    input[type="search"]:focus {
        background-color: transparent;
        
    }

    button[type="submit"]:hover {
        background-color: gray;
    }

    button[type="submit"] {
        color: black;
        border-color: black;
    }

</style>