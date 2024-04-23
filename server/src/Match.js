const db = require("./db.js");

class Match {
    constructor() {
        
    }

    static async getMatch(game, date) {
        let query = 'SELECT * FROM Matchs';
        const params = [];
        if (game) 
        {
          query += ' WHERE game = ?';
          params.push(game);
        }
        if (date) 
        {
          if (game) 
          {
            query += ' AND';

          } 
          else 
          {
            query += ' WHERE';
          }
          query += ' dateBegin = ?';
          params.push(date);
        }
    
        try 
        {
          return await db.query(query, params);

        } catch (error) 
        {
          console.error('Error fetching matches:', error);
          return [];
        }
    }

    static async createMatch(idEvent, team1, team2, dateBegin, game)
    {
        const query = 'INSERT INTO Match (idEvent, idTeam1, idTeam2, dateBegin, game) VALUES (?, ?, ?, ?, ?)';
        const params = [idEvent, team1, team2, dateBegin, game];
        
        try {
            await db.query(query, params);
            console.log('Match created successfully');
            return true;
        } catch (error) {
            console.error('Error creating match:', error);
            return false;
        }
    }

}

module.exports = Match;