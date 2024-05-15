<template>
    <div class="C1">
        <h1>About us</h1>
      <p>
        Welcome to GoPlay - where time management is perfect! <br><br>
        At GoPlay, we're passionate about gaming. <br>
        Whether you're a casual player looking to unwind after a long day or a competitive gamer seeking the next challenge, we've got you covered. <br>
        Our mission is simple: to create a vibrant online community where time management for training and competitions is easier.<br>
        The whole team is at your disposal if you have any questions, just write to us below: 
      </p>
    </div>
    <div class="container">
  <h1>Q&A <br> Feel free to ask!</h1>
  <form target="_blank" action="https://formsubmit.co/officialgoplay44@gmail.com" method="POST">
    <div class="form-group">
      <div class="form-row">
        <div class="col">
          <input type="text" name="name" class="form-control" placeholder="Full Name" required>
        </div>
        <div class="col">
          <input type="email" name="email" class="form-control" placeholder="Email Address" required>
        </div>
        <select name="Continent" id="choix" class="form-control">
          <option value="">--Please choose your Area--</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="N-A">North-America</option>
          <option value="Oceania">Oceania</option>
          <option value="S-A">South-America</option>
</select>
        
      </div>
    </div>
    <div class="">
      <textarea placeholder="Your Message" class="form-control" name="message" rows="10" required></textarea>
    </div>
    <button type="submit" class="btn btn-lg btn-dark btn-block">Submit</button>
  </form>
</div>
<div class="presentation">
<h2>The whole team : <br></h2>
<div class="creators">
  <div class="cr1">
    <img src="../assets/Pierre.jpeg" alt="Pierre LECHEVALIER picture">
    <h2>Pierre LECHEVALIER</h2>
  </div>
  <div class="cr1">
    <img src="../assets/Elias.jpeg" alt="Elias DIONYSSOPOULOS picture">
    <h2>Elias DIONYSSOPOULOS</h2>
  </div>
  <div class="cr1">
    <img src="../assets/Neilah.jpeg" alt="Neilah ABDOU IMOROU picture">
    <h2>Neilah ABDOU IMOROU</h2>
  </div>
  <div class="cr1">
    <img src="../assets/tephan.jpeg" alt="Tephan BOGAHAWATTAGE picture">
    <h2>Tephan BOGAHAWATTAGE</h2>
  </div>
  <div class="cr1">
    <img src="../assets/Alan.jpg" alt="Alan DELMES picture">
    <h2>Alan DELMES </h2>
  </div>
</div>
</div>
</template>

<script>
    export default {
        name: 'AboutScript'
    }
</script>

<style scoped>

.presentation{
  margin-top: 25vh;
  background-image: linear-gradient(transparent, black);
}

.cr1{
  margin: 4vh;
}

.creators{
  display: flex;
  align-items: center;
  
  margin-left: 10%;

  

  
}

img{
  width: 20vh;
  height: auto;
  margin:auto;
}

h1 {
  text-align:center;
  margin: 35px 0 20px 0 ;
}

h2{
  font-size: 100%;
  text-align: center;
  margin-top: 2vh;
}

.C1{
    margin-left: 15%;
    margin-right: 15%;
}

.form-control{
  margin: 0.75%;
}
button{
  align-content: center;
}
</style>