const sql = require("./db.js");

// CREATE TABLE Game(
//     idGame INT,
//     dateBegin DATETIME,
//     dateEnd DATETIME,
//     description VARCHAR(50),
//     report VARCHAR(50),
//     isTraining boolean,
//     PRIMARY KEY(idGame)
//  );

// constructor
const Game = function(game) {
    this.dateBegin = game.dateBegin;
    this.dateEnd = game.dateEnd;
    this.description = game.description;
    this.report = game.report;
    this.isTraining = game.isTraining;
}

Game.create = (newGame, result) => {
    sql.query("INSERT INTO Game SET ?", newGame, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created game: ", { id: res.insertId, ...newGame });
        result(null, { id: res.insertId, ...newGame });
    });
}

Game.findById = (gameId, result) => {
    sql.query(`SELECT * FROM Game WHERE idGame = ${gameId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found game: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Game with the id
        result({ kind: "not_found" }, null);
    });
};

Game.getAll = result => {
    sql.query("SELECT * FROM Game", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("game: ", res);
        result(null, res);
    });
}

Game.updateById = (id, game, result) => {
    sql.query(
        "UPDATE Game SET report = ?, isTraining = ? WHERE idGame = ?",
        [game.report, game.isTraining, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Game with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated game: ", { id: id, ...game });
            result(null, { id: id, ...game });
        }
    );
};

Game.remove = (id, result) => {
    sql.query("DELETE FROM Game WHERE idGame = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Game with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted game with id: ", id);
        result(null, res);
    });
};

Game.removeAll = result => {
    sql.query("DELETE FROM Game", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} games`);
        result(null, res);
    });
};

Game.fillReport = (id, report, result) => {
    sql.query(
        "UPDATE Game SET report = ? WHERE idGame = ?",
        [report, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Game with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated game: ", { id: id, report: report });
            result(null, { id: id, report: report });
        }
    );
};

Game.updateReport = (id, report, result) => {
    sql.query(
        "UPDATE Game SET report = ? WHERE idGame = ?",
        [report, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Game with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated game: ", { id: id, report: report });
            result(null, { id: id, report: report });
        }
    );
};

module.exports = Game;