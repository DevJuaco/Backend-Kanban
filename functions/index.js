const {onRequest} = require("firebase-functions/v2/https");
const admin = require('firebase-admin')
const logger = require("firebase-functions/logger");
const express = require('express');
const { databaseURL } = require("firebase-functions/params");

const app = express()
admin.initializeApp({
    credential: admin.credential.cert('./credentials.json'),
    //databaseURL: ''
})
const db = admin.firestore()

app.get('/hello-world', (req, res) => {
    return res.status(200).json({message: 'hello-world'})
})

app.post('/api/products', async (req, res) => {
    try {
        await db
            .collection('products')
            .doc(`/${req.body.id}/`)
            .create({
                name: req.body.name
            })
        return res.status(204).json();
    } catch (error) {
        return res.status(500).send(error)
    }
})

app.get('/api/products/:product_id', async (req, res) => {
    try {
        const doc = db.collection('products').doc(req.params.product_id)
        const name = await doc.get()
        const response = name.data()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).send(error)
    }
})

app.get('/api/products', async (req, res) => {
    try {
        const query = db.collection('products')
        const querySnapshot = await query.get()

        const response = querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name
        }))

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json()
    }
})

app.delete('/api/products/:product_id', async (req, res) => {
    try {
        const document = db.collection('products').doc(req.params.product_id)
        await document.delete()
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json()
    }
})

app.put('/api/products/:product_id', async (req, res) => {
    try {
        const document = db.collection('products').doc(req.params.product_id)
        await document.update({
            name: req.body.name
        })
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json()
    }
})

exports.app = onRequest(app)

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
