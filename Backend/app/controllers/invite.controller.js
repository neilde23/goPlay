const Invite = require("../models/invite.model.js");

// Create and Save a new Invite
exports.create = (req, res) => {
    // Validate request
    if (!req.body.idPlayer) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Invite
    const invite = {
        idPlayer: req.body.idPlayer,
        idTeam: req.body.idTeam
    };

    // Save Invite in the database
    Invite.create(invite, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Invite."
            });
        else res.send(data);
    });
};

// Retrieve all Invites of one team
exports.findByTeam = (req, res) => {
    Invite.findByTeam(req.params.teamId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving invites."
            });
        else res.send(data);
    });
};