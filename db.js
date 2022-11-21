const spicedPg = require("spiced-pg");
require("dotenv").config();
console.log(`user ${process.env.XUSER}`);
const db = spicedPg(
    `postgres:${process.env.XUSER}:${process.env.PASS}@localhost:5432/${process.env.DATABASE}`
);

//function getImages
module.exports.getImage = () => {
    return db.query(`SELECT * FROM images`).then((result) => result.rows);
};
// //exportieren

//addimage
