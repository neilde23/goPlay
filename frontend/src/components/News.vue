<template>
    <div class="news">
        <div class="title-player-dashboard">Latest News</div>
        <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel" data-bs-interval="3000">
            <div class="carousel-inner">
                <div 
                    v-for="(news, index) in newsList" 
                    :key="index" 
                    :class="{ 'carousel-item': true, 'active': index === 0 }">
                    <div class="news-img" :style="{ 'background-image': 'url(' + news.imageLink + ')' }"></div>
                    <div class="carousel-caption">
                        <p>{{ news.title.slice(0, maxLength) }}...</p>
                     </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center"><hr width="70%"></div>
       
    </div>
</template>

<script setup>
    const maxLength = 50;
    const newsList = [
        {
            title: "FURIA defeat bad news kangaroos to stay alive in pro league",
            date: "2024-05-03",
            imageLink: "https://img-cdn.hltv.org/gallerypicture/ouzz5xh1R3Ogd2NvKUQAcj.jpg?auto=compress&fm=avif&ixlib=java-2.1.0&m=%2Fm.png&mw=213&mx=39&my=947&q=75&w=1600&s=2689e2021f93134b960ebc4d4bffc886"
        },
        {
            title: "COMPLEXITY and NAVI book EPL playoff spots",
            date: "2024-05-02",
            imageLink: "https://img-cdn.hltv.org/gallerypicture/aNaidhPxcrsSfXQ6xNOIAZ.jpg?auto=compress&fm=avif&ixlib=java-2.1.0&m=%2Fm.png&mw=213&mx=39&my=947&q=75&w=1600&s=fd5e33f68222c816aa2c42fbfb78e571"
        },
        {
            title: "SAW part ways with nabowow",
            date: "2024-05-02",
            imageLink: "https://img-cdn.hltv.org/gallerypicture/a_WDO4VtWkUf0I-GMWowlh.jpg?auto=compress&fm=avif&ixlib=java-2.1.0&m=%2Fm.png&mw=213&mx=39&my=947&q=75&w=1600&s=84c940361a1f212e31481c0ccbc6453f"
        },
        {
            title: "Top 10 best CS2 players in April 2024",
            date: "2024-05-02",
            imageLink: "https://files.bo3.gg/uploads/news/38748/title_image/960x480-bacd98f45436a442e0e8d3f2d6498039.webp"
        },
        {
            title: "10 Counter-Strike legends who would make great coaches in CS2",
            date: "2024-05-01",
            imageLink: "https://files.bo3.gg/uploads/news/38643/title_image/960x480-26f7c05b00a19bdab0143468138a6063.webp"
        },
        {
            title: "LoL’s free champion rotation: April 16",
            date: "2024-05-03",
            imageLink: "https://dotesports.com/wp-content/uploads/2023/03/League-of-Legends.jpg"
        },
        {
            title: "T1 thrash FlyQuest at MSI 2024 in LoL’s fastest ever international best-of-3",
            date: "2024-05-03",
            imageLink: "https://dotesports.com/wp-content/uploads/2024/05/T1-keria-1.jpg"
        },
        {
            title: "LEGACY CLAIM ACTIVE CONTRACT WITH COLDZERA, ASK TOS TO BAR THE PLAYER",
            date: "2024-04-30",
            imageLink: "https://img-cdn.hltv.org/gallerypicture/G8xjU0sy-5lpaVA2I43IhP.jpg?auto=compress&fm=avif&ixlib=java-2.1.0&m=%2Fm.png&mw=213&mx=39&my=947&q=75&w=1600&s=03afb6932cb08dcd0f6af050c190adec"
        },
        {
            title: "DUST2 REPLACES OVERPASS IN MAP POOL; INFERNO GETS CHANGES IN BIG POST-MAJOR UPDATE",
            date: "2024-04-26",
            imageLink: "https://img-cdn.hltv.org/gallerypicture/tq67hJMBbQBrM4Ji1BXf3O.jpg?auto=compress&fm=avif&ixlib=java-2.1.0&q=75&w=1600&s=bd9c5414a8e0618ac94cf156d6d03054"
        },
        {
            title: "CLOUD9 BENCH PERFECTO, HOBBIT",
            date: "2024-04-22",
            imageLink: "https://img-cdn.hltv.org/gallerypicture/EmnQmdqqC0na7IOkCiHVTF.jpg?auto=compress&fm=avif&ixlib=java-2.1.0&m=%2Fm.png&mw=213&mx=39&my=947&q=75&w=1600&s=0a97dee0a8239c69bda77fdf4d1b1663"
        },
        {
            title: "BEST OVERWATCH PLAYERS – WHO ARE THE TOP OVERWATCH PLAYERS?",
            date: "2024-01-25",
            imageLink: "https://www.esports.net/wp-content/uploads/2021/06/Someone.webp"
        },
        {
            title: "2024 RLCS COPENHAGEN MAJOR PRIMER + ON-SITE GUIDE",
            date: "2024-03-26",
            imageLink: "https://esports.rocketleague.com/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2Fresize%3Dfit%3Aclip%2Cheight%3A1080%2Cwidth%3A1920%2Foutput%3Dformat%3Awebp%2F5qYFtgSmSYKP6ex9EadT&w=3840&q=75"
        }
    ];


</script>

<style scoped>

    .news {
        padding: 20px 15px;
        background-color: rgba(7, 7, 65, 0.6);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        width: 205px;
    }

    .news-img {
        height: 280px;
        width: auto;
        background-size: cover;
        background-position: 50%;
        border-radius: 10px;
        border: 1px solid blue;
        filter: brightness(50%)
    }

    .carousel-caption p{
        color: white;
    }

    .carousel-caption {
        text-align: left;
        padding-bottom: 5px;
        left: 0;
        right: 0;
        padding-left: 10px;
        padding-right: 5px;
    }

    hr {
        margin-top: 40px;
        margin-bottom: 0px;
    }




</style>