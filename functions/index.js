/**
 * https://firebase.google.com/docs/functions
 */

const {onCall} = require("firebase-functions/v2/https");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");

const stripe = require('stripe');
const nodemailer = require('nodemailer')

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.newHelpdeskProblem = onDocumentCreated("problems/{docId}", (event) => {

})

exports.sendAlerts = onRequest((request, response) => {

})