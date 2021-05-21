const express = require("express");
const app = express();
const PORT = 4000;

require("./config/db-config");

const studentRoutes = require("./routes/student.route")
app.use(express.json());
app.use("/api", studentRoutes);

app.listen(PORT, () => {
    console.log(`App started @ ${PORT}`)
})