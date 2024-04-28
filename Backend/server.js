const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const matchRouter = require("./app/routes/match.routes");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to goPlay application." });
});

app.use("/api/match", matchRouter);

require("./app/routes/event.routes")(app);
require("./app/routes/game.routes")(app);
require("./app/routes/player.routes")(app);
require("./app/routes/team.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});