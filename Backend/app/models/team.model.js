const sql = require("./db.js");
const Participate = require("./participate.model.js");
const Include = require("./include.model.js");
const TryToJoin = require("./tryToJoin.model.js");
const Event = require("./event.model.js");
const Invite = require("./invite.model.js");
const Game = require("./game.model.js");

// CREATE TABLE Team(
//     name VARCHAR(50) NOT NULL,
//     description VARCHAR(50),
//     idManager INT NOT NULL,
//     PRIMARY KEY(idTeam),
//     UNIQUE(name),
//     FOREIGN KEY(idPlayer) REFERENCES Player(idPlayer)
//  );

// constructor
const Team = function(team) {
    this.name = team.name;
    this.description = team.description;
    this.idManager = team.idManager;
}

Team.create = (newTeam, result) => {
    sql.query("INSERT INTO Team SET ?", newTeam, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created team: ", { id: res.insertId, ...newTeam });
        result(null, { id: res.insertId, ...newTeam });
    });
}

Team.createEvent = (newEvent, result) => {
    Event.create(newEvent, result);
}

Team.findById = (teamId, result) => {
    sql.query(`SELECT * FROM Team WHERE id = ${teamId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found team: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Team with the id
        result({ kind: "not_found" }, null);
    });
};

Team.findByName = (teamName, result) => {
    sql.query(`SELECT * FROM Team WHERE name = '${teamName}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found team: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Team with the name
        result({ kind: "not_found" }, null);
    });
};

Team.findByManager = (idManager, result) => {
    sql.query(`SELECT * FROM Team WHERE idManager = ${idManager}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found team: ", res);
            result(null, res);
            return;
        }

        // not found Team with the id
        result({ kind: "not_found" }, null);
    });
};

Team.getAll = result => {
    sql.query("SELECT * FROM Team", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("team: ", res);
        result(null, res);
    });
};

Team.updateById = (id, team, result) => {
    sql.query(
        "UPDATE Team SET name = ?, description = ?, idPlayer = ? WHERE idTeam = ?",
        [team.name, team.description, team.idPlayer, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Team with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated team: ", { id: id, ...team });
            result(null, { id: id, ...team });
        }
    );
};

Team.remove = (id, result) => {
    sql.query("DELETE FROM Team WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Team with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted team with id: ", id);
        result(null, res);
    });
};

Team.removeAll = result => {
    sql.query("DELETE FROM Team", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} team`);
        result(null, res);
    });
};

Team.addPlayer = (id, player, result) => {
    const newInclude = new Include({idPlayer: player, idTeam: id});
    Include.create(newInclude, result);
};

Team.acceptPlayer = (idTryToJoin, result) => {
    TryToJoin.findById(idTryToJoin, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        Include.create({idPlayer: res.idPlayer, idTeam: res.idTeam}, result);
    });
    TryToJoin.remove(idTryToJoin, result);
}

Team.removePlayer = (id, player, result) => {
    Include.remove({idPlayer: player, idTeam: id}, result);
}

Team.acceptGame = (idInvite, result) => {
    Invite.findById(idInvite, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        Participate.create({idTeam : res.idTeam_1, idGame: res.idGame}, result);
    });
    Invite.remove(idInvite, result);
}

Team.createGame = (id, idPlayer, newGame, result) => {
    // check if player is manager
    Team.isManager(id, idPlayer, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (!res) {
            result({ kind: "not_manager" }, null);
            return;
        }
    });
    // create game
    Game.create(newGame, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        // create participate
        Participate.create(id, res.id, result);
    });
};

Team.getManager = (id, result) => {
    sql.query(`SELECT idManager FROM Team WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found team: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Team with the id
        result({ kind: "not_found" }, null);
    });
};

Team.isManager = (id, player, result) => {
    Team.getManager(id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, res.idManager == player);
    });
};

Team.getPlayers = (id, result) => {
   Include.findPlayersByTeam(id, result);
};

Team.getPendingPlayers = (id, result) => {
    TryToJoin.findPlayersByTeam(id, result);
};

Team.getInvites = (id, result) => {
    Invite.findByTeam(id, result);
};

Team.getEvents = (id, result) => {
    Event.findByTeam(id, result);
};

Team.getGames = (id, result) => {
    Participate.findGamesByTeam(id, result);
};

Team.findTrainings = (id, result) => {
    Participate.findTrainingsByTeam(id, result);
};

Team.findTournaments = (id, result) => {
    Participate.findTournamentsByTeam(id, result);
};

module.exports = Team;