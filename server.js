const db = require("./db");
const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8000 } = process.env;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//Create endpoint in server.js for delivering the images from the DB
app.get("/images", (req, res) => {
    db.getImage().then((result) => {
        console.log("getImage", result);
        return res.send(result);
    });
});
// * no real routing = typically for onepage apps
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
