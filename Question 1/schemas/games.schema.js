const {Schema, model} = require("mongoose");

const publisherSchema = new Schema({
    name: String,
    location: {
        type: String,
        coordinates: {type: [Number], index: "2dsphere"}
    },
})

const gameSchema = new Schema({
    title: {type: String, required: true},
    price: Number,
    year: Number,
    rate: {type: Number, min: 1, max: 5, default: 1},
    minPlayer: {type: Number, min: 1, max: 10},
    minPlayers: Number,
    minAge: Number,
    designers: String,
    publisher: publisherSchema

})
model("Game", gameSchema, "games");