module.exports = app => {
    const players = require("../controllers/player.controller.js");

    var router = require("express").Router();

    // Create a new Player
    router.post("/register", players.create);

    // Login a Player
    router.post("/login", players.login);

    // Create a new Event
    router.post("/event", players.createEvent);

    // Create a new TryToJoin
    router.post("/tryToJoin", players.createTryToJoin);

    // Retrieve all Players
    router.get("/", players.findAll);

    // Retrieve a single Player with id
    router.get("/:id", players.findOne);

    // Retrieve a single Player with pseudo
    router.get("/pseudo/:pseudo", players.findOneByPseudo);

    // Retrieve all tryToJoin of a Player
    router.get("/tryToJoin/:id", players.findTeamsTryToJoin);

    // Retrieve all Teams of a Player
    router.get("/teams/:id", players.findTeams);

    // Retrieve all Games of a Player
    router.get("/games/:id", players.findGames);

    // Retrieve all Events of a Player
    router.get("/events/:id", players.findEvents);

    // Update a Player with id
    router.put("/:id", players.update);

    // Delete a Player with id
    router.delete("/:id", players.delete);

    // Create a new Player
    router.delete("/", players.deleteAll);

    app.use('/api/players', router);
};
