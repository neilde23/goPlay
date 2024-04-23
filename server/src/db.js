const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'goPlay'
});


db.connect(err => {
    if (err) {
        console.error("Connection to DB failed: ", err);
    }
    else
    {
        console.log("Connection to DB successful");
    }
});


module.exports = db.promise();