const sql = require("./db.js");

// constructor
const Player = function(player) {
    this.pseudo = player.pseudo;
    this.email = player.email;
    this.password = player.password;
};

Player.create = ( newPlayer, result) => {
	sql.query("INSERT INTO players SET ?", newPlayer, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created player: ", { id: res.insertId, ...newPlayer });
		result(null, { id: res.insertId, ...newPlayer });
	});
};

Player.findById = (playerId, result) => {
	sql.query(`SELECT * FROM players WHERE id = ${playerId}`, (err, res) => {
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

Player.getAll = result => {
	sql.query("SELECT * FROM players", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("players: ", res);
		result(null, res);
	});
};

Player.updateById = (id, player, result) => {
	sql.query(
		"UPDATE players SET email = ?, pseudo = ?, password = ? WHERE id = ?",
		[player.email, player.pseudo, player.password, id],
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

Player.remove = (id, result) => {
	sql.query("DELETE FROM players WHERE id = ?", id, (err, res) => {
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

Player.removeAll = result => {
	sql.query("DELETE FROM players", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log(`deleted ${res.affectedRows} players`);
		result(null, res);
	});
};

module.exports = Player;