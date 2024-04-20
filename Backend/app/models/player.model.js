const sql = require("./db.js");
const Event = require("./event.model.js");
const TryToJoin = require("./tryToJoin.model.js");

// CREATE TABLE Player(
// 	pseudo VARCHAR(50) NOT NULL,
// 	email VARCHAR(50) NOT NULL,
// 	password VARCHAR(50) NOT NULL,
// 	PRIMARY KEY(idPlayer)
//  );

class Player {
	// constructor
	constructor(player) {
		this.pseudo = player.pseudo;
		this.email = player.email;
		this.password = player.password;
	};

	// create a new player
	static create(newPlayer, result) {
		sql.query("INSERT INTO Player SET ?", newPlayer, (err, res) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}

			console.log("created player: ", { id: res.insertId, ...newPlayer });
			result(null, { id: res.insertId, ...newPlayer });
		});
	};

	// login a player
	static login(player, result) {
		sql.query(`SELECT * FROM Player WHERE (email = '${player.email}' OR pseudo = '${player.pseudo}') AND password = '${player.password}'`, (err, res) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}
			
			if (res.length) {
				console.log("found player: ", res[0]);
				result(null, res[0]);
				return;
			}

			// not found Player with the id
			result({ kind: "not_found" }, null);
		});
	};

	// create an event
	static createEvent(newEvent, result) {
		Event.create(newEvent, result);
	};

	// create a try to join
	static createTryToJoin(newTryToJoin, result) {
		TryToJoin.create(newTryToJoin, result);
	};

	// find a player by id
	static findById(playerId, result) {
		sql.query(`SELECT * FROM Player WHERE idPlayer = ${playerId}`, (err, res) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}

			if (res.length) {
				console.log("found player: ", res[0]);
				result(null, res[0]);
				return;
			}

			// not found Player with the id
			result({ kind: "not_found" }, null);
		});
	};

	// get all players
	static getAll(result) {
		sql.query("SELECT * FROM Player", (err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}
			// display the players in an array
			console.log("Players are : ");
			for (let i = 0; i < res.length; i++) {
				console.log("player: ", res[i]);
			}
			result(null, res);
		});
	};

	// find teams try to join
	static findTeamsTryToJoin(playerId, result) {
		TryToJoin.findTeamsByPlayer(playerId, result);
	};

	// find teams
	static findTeams(playerId, result) {
		sql.query(`SELECT idTeam FROM Include WHERE idPlayer = ${playerId}`, (err, res) => {
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

			// not found Player with the id
			result({ kind: "not_found" }, null);
		});
	};

	// find games
	static findGames(playerId, result) {
		sql.query(`SELECT idEvent FROM Participate WHERE idTeam IN (SELECT idTeam FROM Include WHERE idPlayer = ${playerId})`, (err, res) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}

			if (res.length) {
				console.log("found events: ", res);
				result(null, res);
				return;
			}

			// not found Player with the id
			result({ kind: "not_found" }, null);
		});
	};

	// find events
	static findEvents(playerId, result) {
		sql.query(`SELECT * FROM Event WHERE idPlayer = ${playerId}`, (err, res) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}

			if (res.length) {
				console.log("found events: ", res);
				result(null, res);
				return;
			}

			// not found Player with the id
			result({ kind: "not_found" }, null);
		});
	};

	// update a player by id
	static updateById(id, player, result) {
		sql.query(
			"UPDATE Player SET pseudo = ?, email = ?, password = ? WHERE idPlayer = ?",
			[player.pseudo, player.email, player.password, id],
			(err, res) => {
				if (err) {
					console.log("error: ", err);
					result(null, err);
					return;
				}

				if (res.affectedRows == 0) {
					// not found Player with the id
					result({ kind: "not_found" }, null);
					return;
				}

				console.log("updated player: ", { id: id, ...player });
				result(null, { id: id, ...player });
			}
		);
	};

	// remove a player by id
	static remove(id, result) {
		sql.query("DELETE FROM Player WHERE idPlayer = ?", id, (err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found Player with the id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("deleted player with id: ", id);
			result(null, res);
		});
	};

	// remove all players
	static removeAll(result) {
		sql.query("DELETE FROM Player", (err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			console.log(`deleted ${res.affectedRows} players`);
			result(null, res);
		});
	};


}

module.exports = Player;