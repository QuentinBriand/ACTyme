import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";


admin.initializeApp({
  credential: admin.credential.cert("permissions.json"),
  databaseURL: "https://actyme-d2c12-default-rtdb.europe-west1.firebasedatabase.app",
});

const app = express();
const db = admin.firestore();

app.use(cors({origin: true}));

app.post("/api/create_table", (req, res) => {
  (async () => {
    try {
      const addRes = await db.collection("tables").add(
          req.body.table
      );
      return res.status(200).send( {
        table_id: addRes.id,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  });
});

app.patch("/api/update_table/:id", (req, res) => {
  (async () => {
    try {
      await db.collection("tables").doc(req.params.id).update(
          req.body.table
      );
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  });
});

app.delete("/api/delete_table/:id", (req, res) => {
  (async () => {
    try {
      await db.collection("tables").doc(req.params.id).delete();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  });
});

app.get("/api/get_tables/:id", (req, res) => {
  (async () => {
    try {
      await db.collection("users").doc(req.params.id).get().then((doc) => {
        const data = doc.data();
        if (doc.exists && data != undefined) {
          return res.status(200).send(data.tables);
        } else {
          return res.status(404).send();
        }
      });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  });
});

exports.app = functions.https.onRequest(app);
