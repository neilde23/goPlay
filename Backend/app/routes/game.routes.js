module.exports = app => {
    const games = require("../controllers/game.controller.js");

    var router = require("express").Router();

    // Fill the report of a Game with id
    router.put("/:id/report", games.fillReport);

    // Retrieve all Games
    router.get("/", games.findAll);

    // Retrieve a single Game with id
    router.get("/:id", games.findOne);

    // Update a Game with id
    router.put("/:id", games.update);

    // Delete a Game with id
    router.delete("/:id", games.delete);

    // Create a new Game
    router.delete("/", games.deleteAll);

    app.use('/api/games', router);
};