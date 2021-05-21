const {model} = require("mongoose");
const Game = model("Game");

module.exports.getGamesList = (req, res) => {
    const callBackHandler = (err, gameList) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal server error")
        }
        res.status(200).json(gameList);
    }
    if (req.query && req.query.offset && req.query.count) {
        const {offset, count} = [parseInt(req.query.offset), parseInt(req.query.count)];
        Game
            .find()
            .skip(offset)
            .limit(count)
            .exec((err, resp) => callBackHandler(err, resp))
    } else
        Game
            .find()
            .exec((err, resp) => callBackHandler(err, resp))
}

module.exports.getGameById = (req, res) => {
    if (req.params._id) {
        const gameId = req.params._id;
        Game.findById(gameId).exec((err, game) => {
            if (err) {
                console.log(err)
                res.status(500).send("Internal server error");
            }
            res.status(200).json(game);
        })
    } else {
        res.status(400).send("Game id is required")
    }
}
