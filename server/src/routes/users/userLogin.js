require('dotenv').config({path: process.cwd() + '/.env'});
const { pool } = require('../../config/db');
const bcrypt = require('bcrypt');
const router = require('express').Router();
var jwt = require('jsonwebtoken');

router.get("/refresh", async(req, res) => {
    token = jwt.sign({}, process.env['SECRET'], { expiresIn: '10s' });
    res.json( {accessToken: token} );
});

router.post("/login", async(req, res) => {
    let bd = req.body;
    const sqlReq = `SELECT * FROM users WHERE email = '${bd.email}'`;
    pool.query(sqlReq, function (err, reqres, fields) {
        if (err) throw err;
        if (reqres[0] === undefined) {
            res.status(404).json({ msg: "Email is not found" });
            return;
        }
        bcrypt.compare(bd.password, reqres[0].password, function(err, result) {
            if (err) {
                res.status(401).json({ msg: "Internal server error" });
                return;
            }
            if (!result) {
                res.status(401).json({ msg: "Invalid password" });
                return;
            }
            res.status(200).json({ msg: "OK" , token: jwt.sign({}, process.env['SECRET'], { expiresIn: '10s' })});
        });
    });
});

router.post("/register", async(req, res) => {
    let bd = req.body;
    let token = undefined;
    let refreshToken = undefined;
    if (bd.rememberme === false) {
        token = jwt.sign({  email: bd.email }, process.env['SECRET'], { expiresIn: '10s' });
    } else {
        token = jwt.sign({  email: bd.email }, process.env['SECRET'], { expiresIn: '10s' });
        refreshToken = jwt.sign({  email: bd.email }, process.env['SECRET'], { expiresIn: '29d' });
    }
    bcrypt.hash(bd.password, 10, function(err, hash) {
        if (err) {
            console.log(err);
            res.json({ msg: "Internal server error", status: false });
            return;
        }
        const sqlReq = `INSERT INTO users (email, password) VALUES ("${bd.email}", "${hash}")`;
        pool.query(sqlReq, function (err, result) {
            if (err && err.code == "ER_DUP_ENTRY") {
                res.json({ msg: "User already exists", status: false });
                return;
            }
            // if (refreshToken !== undefined)
            //     res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', expires: new Date(Date.now() + 60000 * 60 * 24 * 7) });
            res.json( { msg: "User created", status: true , token: token } );
        });
    });
});

module.exports = router;
