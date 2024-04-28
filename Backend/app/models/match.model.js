const sql = require("./db.js").promise();


//CREATE TABLE IF NOT EXISTS Matchs (
//    id INT AUTO_INCREMENT PRIMARY KEY,
//    idTeam1 INT,
//    idTeam2 INT,
//    idEvent INT,
//    dateBegin DATETIME,
//    game VARCHAR(64),
//    FOREIGN KEY (idEvent) REFERENCES Event(id)
//);

class Match {

    constructor() {

    }

    static async getMatch(filters) 
    {
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

        /*if (filters.player) {
            // à remplir
        }*/

        query += ' ORDER BY m.dateBegin DESC';
    
        try 
        {
            return await sql.query(query, params);

        } catch (error) 
        {
            console.error('Error fetching matches:', error);
            return [];
        }
  }
  

    static async createMatch(idEvent, team1, team2, dateBegin, game)
    {
        const query = 'INSERT INTO Matchs (idEvent, idTeam1, idTeam2, dateBegin, game) VALUES (?, ?, ?, ?, ?)';
        const params = [idEvent, team1, team2, dateBegin, game];
        
        try {
            await sql.query(query, params);
            console.log('Match created successfully');
            return true;
        } catch (error) {
            console.error('Error creating match:', error);
            return false;
        }
    }





}

module.exports = Match;