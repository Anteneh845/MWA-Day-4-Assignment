const express = require("express");
const app = express();
const PORT = 4000;

require("./config/db-config");

const gameRoutes = require("./routes/games.route");
app.use("/api", gameRoutes);


app.listen(PORT, () => {
    console.log("App started at " + PORT)
})