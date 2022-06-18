require('dotenv').config({path: process.cwd() + '/.env'});
const { pool } = require('../../config/db');
const router = require('express').Router();
var jwt = require('jsonwebtoken');

router.get("/users", async(req, res) => {
    let valid = true;
    console.log(req.headers);
    if (req.headers.authorization === undefined) {
        res.status(401).json({ msg: "Unauthorized" });
        return;
    }
    let bearer = req.headers.authorization.split(' ')[1];
    jwt.verify(bearer, process.env['SECRET'], function(err, decoded) {
        if (err) {
            valid = false;
            res.status(401).json({ msg: "Unauthorized" });
            return;
        }
    });
    if (valid === false) return;
    res.json( {msg: "Okay"} );
});

module.exports = router;
