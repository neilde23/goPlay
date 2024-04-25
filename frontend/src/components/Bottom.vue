<template>
    <footer>
        <div class="container">
            <p>&copy; 2024 Your Website. All rights reserved.</p>
            <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Planning</a></li>
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">About</a></li>
            </ul>
            </nav>
        </div>
    </footer>
</template>
    
<script>
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

    nav ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    nav ul li {
        display: inline;
        margin-right: 20px;
    }

    nav ul li:last-child {
        margin-right: 0;
    }

    nav ul li a {
        color: #fff;
        text-decoration: none;
    }

    nav ul li a:hover {
        text-decoration: underline;
    }
</style>
