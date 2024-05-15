const db = require("./db.js");

class Match {
    // constructor
    constructor(match) {
        this.id = match.id;
        this.idTeam1 = match.idTeam1;
        this.idTeam2 = match.idTeam2;
        this.idEvent = match.idEvent;
        this.dateBegin = match.dateBegin;
        this.game = match.game;
    }

    static getMatch(filters, result) {
        let query = `
            SELECT m.id, m.idTeam1, m.idTeam2, m.idEvent, TIME_FORMAT(m.dateBegin, "%H:%i") AS dateBegin, m.game,
                t1.name AS t1name, t2.name AS t2name, e.name AS eventName
            FROM Matchs m
            LEFT JOIN Team t1 ON m.idTeam1 = t1.id
            LEFT JOIN Team t2 ON m.idTeam2 = t2.id
            LEFT JOIN Event e ON m.idEvent = e.id
            WHERE 1=1`;

        const params = [];

        if (filters.game) {
            query += ' AND m.game = ?';
            params.push(filters.game);
        }

        if (filters.date) {
            query += ' AND DATE(m.dateBegin) = ?';
            params.push(filters.date);
        }

        query += ' ORDER BY m.dateBegin';

        db.query(query, params, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("matchs: ", res);
            result(null, res);
        });
    }

    static createMatch(idEvent, team1, team2, dateBegin, game, result) {
        db.query("INSERT INTO Matchs SET ?", { idEvent, idTeam1: team1, idTeam2: team2, dateBegin, game }, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created match: ", { id: res.insertId, idEvent, idTeam1: team1, idTeam2: team2, dateBegin, game });
            result(null, { id: res.insertId, idEvent, idTeam1: team1, idTeam2: team2, dateBegin, game });
        });
    }

    static getMatchByIdTeam(idTeam, result) {
        db.query(`SELECT * FROM Matchs WHERE idTeam1 = ${idTeam} OR idTeam2 = ${idTeam}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found match: ", res);
                result(null, res);
                return;
            }

            // not found Match with the id
            result({ kind: "not_found" }, null);
        });
    }
}

module.exports = Match;
