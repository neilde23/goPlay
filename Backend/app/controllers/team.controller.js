const Team = require("../models/team.model.js");
const Participate = require("../models/participate.model.js");
const Invite = require("../models/invite.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.idManager) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Team
    const team = {
        name: req.body.name,
        description: req.body.description,
        idManager: req.body.idManager
    };

    // Save Team in the database
    Team.create(team, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Team."
            });
        else res.send(data);
    });
};

exports.createEvent = (req, res) => {
    if (!req.body.idTeam) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const event = {
        dateBegin: req.body.dateBegin,
        dateEnd: req.body.dateEnd,
        description: req.body.description,
        idTeam: req.body.idTeam
    }

    Team.createEvent(
        event,
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while adding the Event."
                });
            else res.send(data);
        }
    );
};

exports.createGame = (req, res) => {
    if (!req.body.idTeam) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const game = {
        dateBegin: req.body.dateBegin,
        dateEnd: req.body.dateEnd,
        description: req.body.description,
        report: null,
        isTraining: req.body.isTraining
    };

    Team.createGame(
        req.body.idTeam,
        req.body.idPlayer,
        game,
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while adding the Game."
                });
            else {
                res.send(data);
            }
        }
    );
};

exports.addPlayer = (req, res) => {
    if (!req.body.idPlayer) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Team.addPlayer(
        req.body.idTeam,
        req.body.idPlayer,
        (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while adding the Player."
                });
            else res.send(data);
        }
    );
};

exports.acceptPlayer = (req, res) => {
    if (!req.body.idTryToJoin) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Team.acceptPlayer(
        req.params.idTryToJoin,
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while accepting the Player."
                });
            else res.send(data);
        }
    );
};

exports.acceptGame = (req, res) => {
    if (!req.body.inviteId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Team.acceptGame(
        req.params.inviteId,
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while accepting the Game."
                });
            else res.send(data);
        }
    );
};

exports.findAll = (req, res) => {
    Team.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving teams."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Team.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Team with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Team with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.findByName = (req, res) => {
    Team.findByName(req.params.name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Team not found with name ${req.params.teamName}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Team with name " + req.params.teamName
                });
            }
        } else res.send(data);
    });
};

exports.findByManager = (req, res) => {

    Team.findByManager(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Team not found with Manager id ${req.params.idManager}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Team with Manager id " + req.params.idManager
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Team.updateById(
        req.params.teamId,
        new Team(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Team with id ${req.params.teamId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Team with id " + req.params.teamId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Team.remove(req.params.teamId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Team with id ${req.params.teamId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Team with id " + req.params.teamId
                });
            }
        } else res.send({ message: `Team was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Team.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all teams."
            });
        else res.send({ message: `All Teams were deleted successfully!` });
    });
};

exports.removePlayer = (req, res) => {
    Team.removePlayer(
        req.params.teamId,
        req.params.playerId,
        (err, data) => {
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
            }
            else res.send({ message: `Player was deleted successfully!` });
        }
    );
};

exports.findManager = (req, res) => {
    Team.getManager(req.params.teamId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Manager not found for Team with id ${req.params.teamId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Manager for Team with id " + req.params.teamId
                });
            }
        } else res.send(data);
    });
};

exports.findPlayers = (req, res) => {
    Team.getPlayers(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Players not found for Team with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Players for Team with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.findPendingPlayers = (req, res) => {
    Team.getPendingPlayers(req.params.idTeam, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Pending Players not found for Team with id ${req.params.teamId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Pending Players for Team with id " + req.params.teamId
                });
            }
        }
        else res.send(data);
    });
};

exports.getInvites = (req, res) => {
    Team.getInvites(req.params.teamId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Invites not found for Team with id ${req.params.teamId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Invites for Team with id " + req.params.teamId
                });
            }
        }
        else res.send(data);
    });
};

exports.getEvents = (req, res) => {
    Team.getEvents(req.params.teamId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Events not found for Team with id ${req.params.teamId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Events for Team with id " + req.params.teamId
                });
            }
        } else res.send(data);
    });
};

exports.getGames = (req, res) => {
    Team.getGames(req.params.teamId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Games not found for Team with id ${req.params.teamId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Games for Team with id " + req.params.teamId
                });
            }
        } else res.send(data);
    });
};

exports.findTrainings = (req, res) => {
    Team.getTrainings(req.params.teamId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Trainings not found for Team with id ${req.params.teamId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Trainings for Team with id " + req.params.teamId
                });
            }
        } else res.send(data);
    });
};

exports.findTournaments = (req, res) => {
    Team.getTournaments(req.params.teamId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Tournaments not found for Team with id ${req.params.teamId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Tournaments for Team with id " + req.params.teamId
                });
            }
        } else res.send(data);
    });
};
