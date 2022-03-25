const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

const PORT = 5000;
const header = '[ACTYME]';

// middleware
app.use(cors());
app.use(express.json());

app.post("/signin", async(req, res) => {
    try {
        console.log(req.body);
        console.log("%s [New USER] =>\t\tEmail:\t\t%s\n\t\t\t\tPassword:\t%s", header, req.body.email, req.body.password);
        const new_user = await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [req.body.email, req.body.password]);
        res.json(new_user);
  } catch (err) {
      console.error(err.message);
  }
  res.end();
});

app.get("/verify", async(req, res) => {
    try {
        console.log(req.body);

    } catch {
        console.error(err.message);
    }
});

app.listen(4666, () => console.log('[ACTYME] Server is launching...'));
