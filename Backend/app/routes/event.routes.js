module.exports = app => {
    const events = require("../controllers/event.controller.js");

    var router = require("express").Router();

    // Retrieve all Events
    router.get("/", events.findAll);

    // Retrieve a single Event with id
    router.get("/:id", events.findOne);

    // Retrieve Events with teamId
    router.get("/team/:teamId", events.findByTeam);

    // Retrieve Events with playerId
    router.get("/player/:playerId", events.findByPlayer);

    // Update a Event with id
    router.put("/:id", events.update);

    // Delete a Event with id
    router.delete("/:id", events.delete);

    // Create a new Event
    router.delete("/", events.deleteAll);

    app.use('/api/events', router);
};