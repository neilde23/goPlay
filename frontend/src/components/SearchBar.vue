<template>
    <nav class="navbar">
        <div class="container-fluid d-flex justify-content-center">
            <form class="d-flex" role="search" @submit.prevent="filterTeams">
                <!-- use hte prop placeholder -->
                <input class="form-control me-2" type="search" :placeholder="msg" aria-label="Search" v-model="searchText" @input="filterTeams">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'SearchBar',
        props: {
            msg: {
                type: String,
                default: 'Search'
            }
        },
        data() {
            return {
                searchText: ''
            }
        },
        methods: {
            filterTeams() {
                this.$emit('search', this.searchText);
            }
        }
    }

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
        color: white;
    }

    button[type="submit"] {
        background-color: #5E17EB;
        color: black;
        border-color: black;
    }

    button[type="submit"]:hover {
        background-color: #4d13c2;
    }

</style>