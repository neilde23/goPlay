
CREATE DATABASE goPlay;

USE goPlay;

CREATE TABLE IF NOT EXISTS Team (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    idManager INT,
    description TEXT
);

CREATE TABLE IF NOT EXISTS Event (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    dateBegin DATE,
    duration INT,
    game VARCHAR(64),
    description TEXT
);

CREATE TABLE IF NOT EXISTS Matchs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idTeam1 INT,
    idTeam2 INT,
    idEvent INT,
    dateBegin DATETIME,
    game VARCHAR(64),
    FOREIGN KEY (idEvent) REFERENCES Event(id)
);


CREATE TABLE IF NOT EXISTS Player (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pseudo VARCHAR(255),
    idTeam INT,
    FOREIGN KEY (idTeam) REFERENCES Team(id)
);

CREATE TABLE IF NOT EXISTS Manager (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Planning (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idPlayer INT,
    startTime TIME,
    endTime TIME,
    date DATE,
    idMatch INT,
    FOREIGN KEY (idPlayer) REFERENCES Player(id),
    FOREIGN KEY (idMatch) REFERENCES Matchs(id)
);



INSERT INTO Team (name, idManager, description) VALUES 
('Team A', 1, 'Description de la Team A'),
('Team B', 2, 'Description de la Team B'),
('Team C', 3, 'Description de la Team C'),
('Team D', 4, 'Description de la Team D');



INSERT INTO Event (name, dateBegin, duration, game, description) VALUES 
('Evénement 1', '2024-04-25', 120, 'CSGO', 'Description de l\'événement 1'),
('Evénement 2', '2024-05-05', 90, 'Rocket League', 'Description de l\'événement 2'),
('Evénement 3', '2024-05-15', 150, 'LoL', 'Description de l\'événement 3'),
('Evénement 4', '2024-05-25', 180, 'Overwatch', 'Description de l\'événement 4');


INSERT INTO Matchs (idTeam1, idTeam2, dateBegin, game) VALUES 
(1, 2, '2024-04-26 10:00:00', 'CSGO'),
(3, 4, '2024-05-06 14:30:00', 'Rocket League'),
(2, 3, '2024-05-16 15:45:00', 'LoL'),
(4, 1, '2024-05-26 09:15:00', 'Overwatch'),
(1, 3, '2024-04-27 11:30:00', 'CSGO'),
(2, 4, '2024-05-07 16:00:00', 'Rocket League'),
(3, 1, '2024-05-17 18:20:00', 'LoL'),
(4, 2, '2024-05-27 13:00:00', 'Overwatch'),
(1, 4, '2024-04-28 12:45:00', 'CSGO'),
(2, 3, '2024-05-08 10:30:00', 'Rocket League');
