const db = require("./db.js");


class Team {
    constructor(id, name, idManager, description) {
        this.id = id;
        this.name = name;
        this.idManager = idManager;
        this.playerList = playerList;
        this.description = description;
    }

    static getAllTeams() {
        
    }

    static async getTeamById(id) {
        const query = "SELECT name FROM Team WHERE id = ?";
        const params = [id];

        try 
        {
            return await db.query(query, params);

        } catch (error) 
        {
            console.error('Error fetching matches:', error);
            return [];
        }


        
        
    }

    static createTeam(teamData) {
        
    }

    static updateTeam(id, newData) {
        
    }

    static deleteTeam(id) {
        
    }

    static addPlayer(player) {
        
    }
}


module.exports = Team;