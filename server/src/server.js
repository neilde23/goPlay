const express = require("express");
const db = require("./db.js");
const Player = require("./Player.js");
const Match = require("./Match.js");


const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Autoriser toutes les origines
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Autoriser les méthodes HTTP
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Autoriser les en-têtes HTTP
    next();
});


app.get("/", (req,res) => {
    
    
});



app.get("/login", (req,res) => {
    
});


app.post("/login", (req,res) => {

});

app.post("/api/getMatches", async (req, res) => {
    const { selectedGame, selectedDate } = req.body;

    try 
    {
        const matches = await Match.getMatch(selectedGame, selectedDate);
        res.json(matches);

    } catch (error) 
    {
        console.error('Error fetching matches:', error);
        res.status(500).json(error); 
    }

});



app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});