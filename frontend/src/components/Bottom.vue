<template>
    <footer>
        <div class="container">
            <p>&copy; 2024 goPlay. All rights reserved.</p>
            <nav>
                <ul>
                    <router-link class="list" to="/">Home</router-link>
                    <router-link class="list" to="/about">About</router-link>
                </ul>
            </nav>
        </div>
    </footer>
</template>
    
<script>
import router from '@/router';

export default {
    name: 'Footer'
}
</script>
    
<style scoped>
    footer {
        background-color: transparent;
        color: #fff;
        padding: 20px 0;
        justify-content: center;
        align-items: center;
        display: flex;
        border-top: .15rem solid white;
        border-top-color: rgba(255, 255, 255, .25);
    }

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .container p {
        margin: 0;
    }

    nav ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .list {
        color: #fff;
        text-decoration: none;
        margin: 0 10px;
    }

    .list:hover {
        color: #5E17EB;
    }
</style>
