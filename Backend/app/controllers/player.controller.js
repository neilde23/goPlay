const Player = require("../models/player.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body.pseudo || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Player
    const player = {
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: req.body.password
    };

    // Save Player in the database
    Player.create(player, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Player."
            });
        else res.send(data);
    });
};

exports.login = (req, res) => {
    // Validate request
    if (!req.body.email && !req.body.pseudo || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Retrieve Player with email or pseudo and password
    Player.login(req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Player not found."
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Player."
                });
            }
        } else res.send(data);
    });
};

exports.createEvent = (req, res) => {
    // Validate request
    if (!req.body.idPlayer) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create an event
    const event = {
        dateBegin: req.body.dateBegin,
        dateEnd: req.body.dateEnd,
        description: req.body.description,
        idTeam: req.body.idTeam
    }

    // Save Player in the database
    Player.createEvent(event, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Player."
            });
        else res.send(data);
    });
};

exports.createTryToJoin = (req, res) => {
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

    // Save Player in the database
    Player.createTryToJoin(tryToJoin, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the TryToJoin."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Player.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving players."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Player.findById(req.params.playerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Player with id ${req.params.playerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Player with id " + req.params.playerId
                });
            }
        } else res.send(data);
    });
};

exports.findTeamsTryToJoin = (req, res) => {
    Player.findTeamsTryToJoin(req.params.playerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found TryToJoin with id ${req.params.playerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving TryToJoin with id " + req.params.playerId
                });
            }
        } else res.send(data);
    });
};

exports.findTeams = (req, res) => {
    Player.findTeams(req.params.playerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Player with id ${req.params.playerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Player with id " + req.params.playerId
                });
            }
        } else res.send(data);
    });
};

exports.findGames = (req, res) => {
    Player.findGames(req.params.playerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Player with id ${req.params.playerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Player with id " + req.params.playerId
                });
            }
        } else res.send(data);
    });
};

exports.findEvents = (req, res) => {
    Player.findEvents(req.params.playerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Player with id ${req.params.playerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Player with id " + req.params.playerId
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

    Player.updateById(
        req.params.playerId,
        new Player(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Player with id ${req.params.playerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Player with id " + req.params.playerId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Player.remove(req.params.playerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Player with id ${req.params.playerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Player with id " + req.params.playerId
                });
            }
        } else res.send({ message: `Player was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Player.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all players."
            });
        else res.send({ message: `All Players were deleted successfully!` });
    });
};
