module.exports = app => {
    const teams = require("../controllers/team.controller.js");
    
    var router = require("express").Router();

    // Create a new Team
    router.post("/", teams.create);

    // Create a new Event
    router.post("/event", teams.createEvent);

    // Create a new Game
    router.post("/game", teams.createGame);

    // Add a Player to a Team
    router.post("/addPlayer", teams.addPlayer);
    
    // Accept a player
    router.post("/acceptPlayer", teams.acceptPlayer);

    // Accept an Invite
    router.post("/acceptGame", teams.acceptGame);

    // Retrieve all Teams
    router.get("/", teams.findAll);

    // Retrieve all Teams of a Manager
    router.get("/manager/:id", teams.findByManager);

    // Retrieve teams with a name
    router.get("/name/:name", teams.findByName);

    // Retrieve a single Team with id
    router.get("/:id", teams.findOne);

    // Retrieve all Players of a Team
    router.get("/players/:id", teams.findPlayers);

    // Retrieve pending Players of a Team
    router.get("/pendingPlayers/:id", teams.findPendingPlayers);

    // Retrieve all Events of a Team
    router.get("/events/:id", teams.getEvents);
    
    // Retrieve all Games of a Team
    router.get("/games/:id", teams.getGames);

    // Retrieve all Trainings of a Team
    router.get("/trainings/:id", teams.findTrainings);

    // Retrieve all Tournaments of a Team
    router.get("/tournaments/:id", teams.findTournaments);

    // Retrieve all Invites of a Team
    router.get("/invites/:id", teams.getInvites);
    
    // Update a Team with id
    router.put("/:id", teams.update);

    // Delete a Team with id
    router.delete("/:id", teams.delete);

    // Create a new Team
    router.delete("/", teams.deleteAll);

    app.use('/api/teams', router);
};