const sql = require("./db.js");

// CREATE TABLE include(
//     idPlayer INT,
//     idTeam INT,
//     PRIMARY KEY(idPlayer, idTeam),
//     FOREIGN KEY(idPlayer) REFERENCES Player(idPlayer),
//     FOREIGN KEY(idTeam) REFERENCES Team(idTeam)
//  );

// constructor
const Include = function(include) {
    this.idPlayer = include.idPlayer;
    this.idTeam = include.idTeam;
}

Include.create = (newInclude, result) => {
    console.log("newInclude: ", newInclude);
    sql.query("INSERT INTO include SET ?", newInclude, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created include: ", { id: res.insertId, ...newInclude });
        result(null, { id: res.insertId, ...newInclude });
    });
}

Include.findPlayersByTeam = (teamId, result) => {
    sql.query(`SELECT idPlayer FROM include WHERE idTeam = ${teamId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found include: ", res);
            result(null, res);
            return;
        }

        // not found Include with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Include;