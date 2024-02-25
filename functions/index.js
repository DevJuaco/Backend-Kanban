const {onRequest} = require("firebase-functions/v2/https");
const admin = require('firebase-admin')
const logger = require("firebase-functions/logger");
const express = require('express');


const app = express()
admin.initializeApp({
    credential: admin.credential.cert('./credentials.json')
})
//app.use(cors())
const db = admin.firestore()
app.use('/api/tasks', require('./routes/tasks.routes'))


exports.app = onRequest(app)

