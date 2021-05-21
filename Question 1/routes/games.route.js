const express = require("express");
const router = express.Router();
const {getGameById, getGamesList} = require("../controllers/games.controller")


router.get("/games", getGamesList)
router.get("/games/:_id", getGameById)

module.exports = router;