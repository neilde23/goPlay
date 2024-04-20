const TryToJoin = require("../models/tryToJoin.model.js");

// Create and Save a new TryToJoin
exports.create = (req, res) => {
    // Validate request
    if (!req.body.idPlayer) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a TryToJoin
    const tryToJoin = {
        idPlayer: req.body.idPlayer,
        idTeam: req.body.idTeam
    };

    // Save TryToJoin in the database
    TryToJoin.create(tryToJoin, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the TryToJoin."
            });
        else res.send(data);
    });
};