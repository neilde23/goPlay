const sql = require("./db.js");

// CREATE TABLE participate(
//     idTeam INT,
//     idGame INT,
//     PRIMARY KEY(idTeam, idGame),
//     FOREIGN KEY(idTeam) REFERENCES Team(idTeam),
//     FOREIGN KEY(idGame) REFERENCES Game(idGame)
//  );

// constructor
const Participate = function(participate) {
    this.idTeam = participate.idTeam;
    this.idGame = participate.idGame;
}

Participate.create = (idTeam, idGame, result) => {
    sql.query("INSERT INTO Participate SET ?", { idTeam: idTeam, idGame: idGame }, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created participate: ", { id: res.insertId, idTeam: idTeam, idGame: idGame });
        result(null, { id: res.insertId, idTeam: idTeam, idGame: idGame });
    });
};

Participate.findGamesByTeam = (teamId, result) => {
    sql.query(`SELECT * FROM Participate WHERE idTeam = ${teamId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found participate: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Participate with the id
        result({ kind: "not_found" }, null);
    });
};

Participate.findTrainingsByTeam = (teamId, result) => {
    sql.query(`SELECT idGame FROM Participate WHERE idTeam = ${teamId} AND idGame IN (SELECT idGame FROM Game WHERE isTraining = true)`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found trainings: ", res);
            result(null, res);
            return;
        }

        // not found Participate with the id
        result({ kind: "not_found" }, null);
    }); 
};

Participate.findTournamentsByTeam = (teamId, result) => {
    sql.query(`SELECT idGame FROM Participate WHERE idTeam = ${teamId} AND idGame IN (SELECT idGame FROM Game WHERE isTraining = false)`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tournaments: ", res);
            result(null, res);
            return;
        }

        // not found Participate with the id
        result({ kind: "not_found" }, null);
    }); 
};

module.exports = Participate;