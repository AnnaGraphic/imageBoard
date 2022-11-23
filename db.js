const spicedPg = require("spiced-pg");
require("dotenv").config();
//console.log(`user ${process.env.XUSER}`);
const db = spicedPg(
    `postgres:${process.env.XUSER}:${process.env.PASS}@localhost:5432/${process.env.DATABASE}`
);

//imageboard
module.exports.getImage = () => {
    return db.query(`SELECT * FROM images`).then((result) => result.rows);
};

module.exports.addImage = ({ url, title, description, username }) => {
    return db
        .query(
            `INSERT INTO images (url, title, description, username)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
            [url, title, description, username]
        )
        .then((result) => {
            return result.rows[0];
        });
};

/// comments
//select the comments for the images.id
module.exports.getComments = (image_id) => {
    return db
        .query(
            `SELECT * FROM comments
   WHERE image_id = $1`,
            [image_id]
        )
        .then((result) => {
            console.log("result getComments", result.rows);

            return result.rows;
        });
};

//adding into comments for current image
module.exports.addComment = ({ comment, username, imageId }) => {
    return db
        .query(
            `INSERT INTO comments (comment, username, image_id)
        VALUES ($1, $2, $3)
        RETURNING *`,
            [comment, username, imageId]
        )
        .then((result) => {
            // console.log("result addComment", result.rows[0]);
            return result.rows[0];
        });
};
