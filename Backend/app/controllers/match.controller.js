const Match = require("../models/match.model.js");

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

