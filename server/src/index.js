require('dotenv').config({path: process.cwd() + '/.env'});
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
app.use(cors({credentials: true, origin: "http://10.16.242.142:3000"}));
app.use(express.json());
app.use(cookieParser());
global.main = app;

const userLogin = require("./routes/users/userLogin.js");
const testGet = require("./routes/users/users.js");

app.use("/api/auth", userLogin);
app.use("/api/", testGet);

const port = process.env['PORT'];

app.listen(port, () => console.log("%s Server is launching on port %d ...", process.env['HEADER'], port));
