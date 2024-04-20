const sql = require("./db.js");

// CREATE TABLE tryToJoin(
//     idPlayer INT,
//     idTeam INT,
//     PRIMARY KEY(idPlayer, idTeam),
//     FOREIGN KEY(idPlayer) REFERENCES Player(idPlayer),
//     FOREIGN KEY(idTeam) REFERENCES Team(idTeam)
//  );

// constructor
const TryToJoin = function(tryToJoin) {
    this.idPlayer = tryToJoin.idPlayer;
    this.idTeam = tryToJoin.idTeam;
}

TryToJoin.create = (newTryToJoin, result) => {
    sql.query("INSERT INTO TryToJoin SET ?", newTryToJoin, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tryToJoin: ", { id: res.insertId, ...newTryToJoin });
        result(null, { id: res.insertId, ...newTryToJoin });
    });
};

TryToJoin.findPlayersByTeam = (teamId, result) => {
    sql.query(`SELECT idPlayer FROM TryToJoin WHERE idTeam = ${teamId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found players: ", res);
            result(null, res);
            return;
        }

        // not found TryToJoin with the id
        result({ kind: "not_found" }, null);
    });
};

TryToJoin.findTeamsByPlayer = (playerId, result) => {
    sql.query(`SELECT idTeam FROM TryToJoin WHERE idPlayer = ${playerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found teams: ", res);
            result(null, res);
            return;
        }

        // not found TryToJoin with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = TryToJoin;