const Event = require("../models/event.model");

exports.findAll = (req, res) => {
    Event.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving events."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Event.findById(req.params.eventId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Event with id ${req.params.eventId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Event with id " + req.params.eventId
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

    Event.updateById(
        req.params.eventId,
        new Event(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Event with id ${req.params.eventId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Event with id " + req.params.eventId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Event.remove(req.params.eventId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Event with id ${req.params.eventId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Event with id " + req.params.eventId
                });
            }
        } else res.send({ message: `Event was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Event.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all events."
            });
        else res.send({ message: `All Events were deleted successfully!` });
    });
};

exports.findByPlayer = (req, res) => {
    Event.findByPlayer(req.params.playerId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving events."
            });
        else res.send(data);
    });
};

exports.findByTeam = (req, res) => {
    Event.findByTeam(req.params.teamId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving events."
            });
        else res.send(data);
    });
};