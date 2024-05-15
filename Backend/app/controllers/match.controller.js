const Match = require("../models/match.model.js");
const Event = require("../models/event.model.js");

exports.getAll = (req, res) => {
    Match.getMatch(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving matchs."
            });
        } else res.send(data);
    });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.idTeam1 || !req.body.idTeam2 || !req.body.dateBegin || !req.body.game) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create an event
    const event = new Event({
        name: req.body.game + " match",
        dateBegin: req.body.dateBegin,
        description: req.body.description,
        duration: 120,
        game: req.body.game,
    });

    // Save Event in the database
    Event.create(event, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Event."
            });
        } else {
            req.body.idEvent = data.id;
            createMatch(req, res);
        }
    });
}

function createMatch(req, res) {
    // Create a Match
    const match = new Match({
        idTeam1: req.body.idTeam1,
        idTeam2: req.body.idTeam2,
        idEvent: req.body.idEvent,
        dateBegin: req.body.dateBegin,
        game: req.body.game
    });

    // Save Match in the database
    Match.createMatch(match, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Match."
            });
        } else res.send(data);
    });
}

exports.getMatchByIdTeam = (req, res) => {
    console.log(req.params.id);
    Match.getMatchByIdTeam(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Match with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Match with id " + req.params.id
                });
            }
        } else res.send(data);
    });
}

