const db = require("./db.js");

class Player {
    constructor(id, pseudo) {
        this.id = id;
        this.pseudo = pseudo;
        this.db = db
    }

    static async getAllPlayers() {
        try {
            const results = await db.query('SELECT * FROM players');
            return results;
        } catch (error) {
            console.error('Error fetching all players:', error);
            return [];
        }
    }

    static async getPlayerById(id) {
        try {
            const results = await db.query('SELECT * FROM players WHERE id = ?', [id]);
            return results[0];
        } catch (error) {
            console.error('Error fetching player by id:', error);
            return null;
        }
    }

    static async createPlayer(playerData) {
        try {
            const result = await db.query('INSERT INTO players (pseudo) VALUES (?)', [playerData.pseudo]);
            return result.insertId;
        } catch (error) {
            console.error('Error creating player:', error);
            return null;
        }
    }

    async deletePlayer(id) {
        try {
            await db.query('DELETE FROM players WHERE id = ?', [id]);
        } catch (error) {
            console.error('Error deleting player:', error);
        }
    }
}

module.exports = Player;
