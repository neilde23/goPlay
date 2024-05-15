const express = require("express");
const router = express.Router();
const match = require("../controllers/match.controller.js");


router.get("/", match.getAll);
router.post("/", match.create);
router.get("/:id", match.getMatchByIdTeam);

module.exports = router;
