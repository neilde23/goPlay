const sql = require("./db.js");

// CREATE TABLE Event(
//     idEvent INT,
//     dateBegin DATETIME,
//     dateEnd DATETIME,
//     description VARCHAR(50),
//     idTeam INT NOT NULL,
//     idPlayer INT NOT NULL,
//     PRIMARY KEY(idEvent),
//     FOREIGN KEY(idTeam) REFERENCES Team(idTeam),
//     FOREIGN KEY(idPlayer) REFERENCES Player(idPlayer)
//  );

// constructor
const Event = function(event) {
    this.dateBegin = event.dateBegin;
    this.dateEnd = event.dateEnd;
    this.description = event.description;
    this.idTeam = event.idTeam;
    this.idPlayer = event.idPlayer;
}

Event.create = (newEvent, result) => {
    sql.query("INSERT INTO Event SET ?", newEvent, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created event: ", { id: res.insertId, ...newEvent });
        result(null, { id: res.insertId, ...newEvent });
    });
};

Event.findById = (eventId, result) => {
    sql.query(`SELECT * FROM Event WHERE idEvent = ${eventId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found event: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Event with the id
        result({ kind: "not_found" }, null);
    });
};

Event.getAll = result => {
    sql.query("SELECT * FROM Event", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("event: ", res);
        result(null, res);
    });
};

Event.updateById = (id, event, result) => {
    sql.query(
        "UPDATE Event SET dateBegin = ?, dateEnd = ?, description = ?, idTeam = ?, idPlayer = ? WHERE idEvent = ?",
        [event.dateBegin, event.dateEnd, event.description, event.idTeam, event.idPlayer, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Event with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated event: ", { id: id, ...event });
            result(null, { id: id, ...event });
        }
    );
};

Event.remove = (id, result) => {
    sql.query("DELETE FROM Event WHERE idEvent = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Event with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted event with id: ", id);
        result(null, res);
    });
};

Event.removeAll = result => {
    sql.query("DELETE FROM Event", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} event`);
        result(null, res);
    });
};

Event.findByPlayer = (idPlayer, result) => {
    sql.query(`SELECT * FROM Event WHERE idPlayer = ${idPlayer}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("event: ", res);
        result(null, res);
    });
};

Event.findByTeam = (idTeam, result) => {
    sql.query(`SELECT * FROM Event WHERE idTeam = ${idTeam}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("event: ", res);
        result(null, res);
    });
};

module.exports = Event;