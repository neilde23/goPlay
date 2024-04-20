const Game = require("../models/game.model.js");

exports.findAll = (req, res) => {
    Game.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving games."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Game.findById(req.params.gameId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Game with id ${req.params.gameId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Game with id " + req.params.gameId
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Game.updateById(
        req.params.gameId,
        new Game(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Game with id ${req.params.gameId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Game with id " + req.params.gameId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Game.remove(req.params.gameId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Game with id ${req.params.gameId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Game with id " + req.params.gameId
                });
            }
        } else res.send({ message: `Game was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Game.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all games."
            });
        else res.send({ message: `All Games were deleted successfully!` });
    });
};

exports.fillReport = (req, res) => {
    // construct a json file with the score and participants
    const report = {
        score: req.body.score,
        participants: req.body.participants
    };

    Game.fillReport(
        req.params.gameId,
        report,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Game with id ${req.params.gameId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Game with id " + req.params.gameId
                    });
                }
            } else res.send(data);
        }
    );
};

// write an interaction with a json string
exports.updateReport = (req, res) => {
    // get the last report and update the score
    const report = Game.findById(req.params.gameId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Game with id ${req.params.gameId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Game with id " + req.params.gameId
                });
            }
        } else {
            data.report.score = req.body.score;
            data.report.participants = req.body.participants;
        }
    });
    Game.updateReport(
        req.params.gameId,
        report,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Game with id ${req.params.gameId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Game with id " + req.params.gameId
                    });
                }
            } else res.send(data);
        }
    );
};