const db = require("./db");
const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8000 } = process.env;
const { uploader } = require("./multer");
const fs = require("fs");
const { s3 } = require("./s3");
console.log("s3", s3);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(express.json());

///+++++++++ I M A G E S ++++++++++++++++++
app.get("/images", (req, res) => {
    db.getImage().then((result) => {
        // console.log("getImage", result);
        console.log("req.body", req.body);
        return res.send(result);
    });
});

app.post("/images", uploader.single("file"), (req, res) => {
    //req.file comes via multer. multer saves the pics in /uploads
    console.log("req.file", req.file);
    console.log("req.body", req.body);
    //body comes from the app.js

    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();
    promise
        .then(() => {
            console.log("success");
            // it worked!!!
            res.json({});
        })
        .catch((err) => {
            // uh oh
            console.log(err);
        });
});

//++++++++++ U P L O A D ++++++++++++++

// multer middleware functions
// The call to single indicates that we are only expecting one file.
// The string passed to single is the name of the field in the request.
//Create endpoint in server.js for delivering the images from the DB
// tHE ROUTE THAT GETS TRIGGERED BY THE FORM
app.post("/upload", uploader.single("file"), function (req, res) {
    if (req.file) {
        // EVERYTHING WE NEED ABOUT THE FILE
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
