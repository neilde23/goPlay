// CREATE TABLE Invite(
//     idTeam INT,
//     idTeam_1 INT,
//     idGame INT,
//     PRIMARY KEY(idTeam, idTeam_1, idGame),
//     FOREIGN KEY(idTeam) REFERENCES Team(idTeam),
//     FOREIGN KEY(idTeam_1) REFERENCES Team(idTeam),
//     FOREIGN KEY(idGame) REFERENCES Game(idGame)
//  );

// constructor
const Invite = function(invite) {
    this.idTeam = invite.idTeam;
    this.idTeam_1 = invite.idTeam_1;
    this.idGame = invite.idGame;
}

Invite.create = (newInvite, result) => {
    sql.query("INSERT INTO Invite SET ?", newInvite, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created invite: ", { id: res.insertId, ...newInvite });
        result(null, { id: res.insertId, ...newInvite });
    });
};

Invite.findByTeam = (teamId, result) => {
    sql.query(`SELECT * FROM Invite WHERE idTeam = ${teamId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found invite: ", res);
            result(null, res);
            return;
        }

        // not found Invite with the id
        result({ kind: "not_found" }, null);
    });
};