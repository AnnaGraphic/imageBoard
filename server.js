const db = require("./db");
const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8000 } = process.env;
const fs = require("fs");
const { s3 } = require("./S3");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(express.json());

//Create endpoint in server.js for delivering the images from the DB
app.get("/images", (req, res) => {
    db.getImage().then((result) => {
        console.log("getImage", result);
        return res.send(result);
    });
});

// multer middleware functions
// The call to single indicates that we are only expecting one file.
// The string passed to single is the name of the field in the request.
app.post("/upload", uploader.single("file"), function (req, res) {
    if (req.file) {
        res.json({
            success: true,
        });
    } else {
        res.json({
            success: false,
        });
    }
});

// * no real routing = typically for onepage apps
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));
