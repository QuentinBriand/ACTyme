import * as functions from "firebase-functions";
import * as express from "express";
import validateFirebaseIdToken from "./authMiddleware";
// import * as cors from "cors";

import * as admin from "firebase-admin";
admin.initializeApp();

const app = express();
app.use(validateFirebaseIdToken);

app.post("/api/create_table/", validateFirebaseIdToken, async (req, res) => {
    const table = req.body;
    await admin.firestore().collection("tables").add(table).then((docRef) => {
        res.status(200).send(docRef);
        return;
    }).catch((error) => {
        res.status(500).send(error);
        return;
    });
    res.status(201).send();
});

app.put("/api/table/:id/content", validateFirebaseIdToken, async (req, res) => {
    const id = req.params.id;
    if (!req.body) return;
    await admin.firestore().collection("tables")
        .doc(id).set(req.body)
        .catch(
            (error) => {
                res.status(500).send(error);
                return;
            }
        );
    res.status(200).send();
});

app.post("/api/table/:id/invite/",
    validateFirebaseIdToken, async (req:any, res) => {
        const tableId : string = req.params.id;
        const inviterId : string = req.user.user_id;
        if (req.body === undefined) {
            res.status(400).send({error: "No body sent"});
            return;
        }
        const invitedEmail : string|undefined = req.body?.email;
        if (invitedEmail === undefined) {
            res.status(400).send({error: "No body sent"});
            return;
        }
        const uid = await admin.auth().getUserByEmail(invitedEmail);
        // await admin.firestore().collection(`invites/${inviterId}`).add(
        //
        // );
        await admin.firestore().collection().get()
        res.status(404).send();
    });

exports.user = functions.https.onRequest(app);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
